import { NextRequest, NextResponse } from "next/server";
import { supabaseConfig } from "@/lib/document-cloud/supabase-auth";
import { r2SignedUrl } from "@/lib/document-cloud/r2";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const secret = process.env.DOCUMENT_CLOUD_CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { url } = supabaseConfig();
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");
    const now = new Date();
    const cutoff = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const pendingCutoff = new Date(now.getTime() - 30 * 60 * 1000);
    const query = `document_cloud_documents?select=id,client_id,storage_key,upload_status,uploaded_at,delete_after,created_at&or=(and(upload_status.in.(READY,DELETE_PENDING,EXPIRED),delete_after.lte.${encodeURIComponent(now.toISOString())}),and(upload_status.eq.READY,delete_after.is.null,uploaded_at.lte.${encodeURIComponent(cutoff.toISOString())}),and(upload_status.eq.PENDING,created_at.lte.${encodeURIComponent(pendingCutoff.toISOString())}))&limit=100`;
    const list = await fetch(`${url}/rest/v1/${query}`, {
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` }, cache: "no-store",
    });
    const docs = await list.json().catch(() => []);
    if (!list.ok || !Array.isArray(docs)) throw new Error("Could not list expired documents.");

    let deleted = 0;
    const failures: string[] = [];
    for (const doc of docs) {
      try {
        const removed = await fetch(r2SignedUrl("DELETE", doc.storage_key, 120), { method: "DELETE" });
        if (!removed.ok && removed.status !== 404) throw new Error(`R2 delete returned ${removed.status}`);
        const rpc = doc.upload_status === "PENDING" ? "document_cloud_expire_pending" : "document_cloud_confirm_delete";
        const payload = doc.upload_status === "PENDING" ? { p_document_id: doc.id } : { p_document_id: doc.id };
        const confirmed = await fetch(`${url}/rest/v1/rpc/${rpc}`, {
          method: "POST",
          headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json" },
          body: JSON.stringify(payload), cache: "no-store",
        });
        if (!confirmed.ok) throw new Error("Database quota release failed");
        deleted++;
      } catch (error) {
        failures.push(String(doc.id));
        console.error("Retention cleanup failed for document", doc.id, error);
      }
    }
    return NextResponse.json({ success: true, checked: docs.length, deleted, failedDocumentIds: failures });
  } catch (error) {
    console.error("Document Cloud retention job error:", error);
    return NextResponse.json({ success: false, error: "Retention job failed." }, { status: 500 });
  }
}
