import { NextRequest, NextResponse } from "next/server";
import { getDocumentCloudUser, supabaseConfig } from "@/lib/document-cloud/supabase-auth";
import { r2SignedUrl } from "@/lib/document-cloud/r2";

export const runtime = "nodejs";

async function ownedReadyDocument(request: NextRequest, id: string) {
  const user = await getDocumentCloudUser(request);
  if (!user) return { error: NextResponse.json({ success: false, error: "Sign in required." }, { status: 401 }) };
  const { url } = supabaseConfig();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");
  const response = await fetch(`${url}/rest/v1/document_cloud_documents?select=id,client_id,original_filename,content_type,size_bytes,storage_key,upload_status,first_downloaded_at,delete_after&id=eq.${encodeURIComponent(id)}&client_id=eq.${encodeURIComponent(user.id)}`, {
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` }, cache: "no-store",
  });
  const rows = await response.json().catch(() => []);
  const doc = Array.isArray(rows) ? rows[0] : null;
  if (!response.ok || !doc || doc.upload_status !== "READY") {
    return { error: NextResponse.json({ success: false, error: "Document not found." }, { status: 404 }) };
  }
  return { user, doc, url, serviceKey };
}

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const result = await ownedReadyDocument(request, id);
    if ("error" in result) return result.error;
    return NextResponse.json({
      success: true,
      url: r2SignedUrl("GET", result.doc.storage_key, 180),
      filename: result.doc.original_filename,
      contentType: result.doc.content_type,
    });
  } catch (error) {
    console.error("Document Cloud download URL error:", error);
    return NextResponse.json({ success: false, error: "Download service is unavailable." }, { status: 503 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const result = await ownedReadyDocument(request, id);
    if ("error" in result) return result.error;
    const removed = await fetch(r2SignedUrl("DELETE", result.doc.storage_key, 120), { method: "DELETE" });
    if (!removed.ok && removed.status !== 404) {
      return NextResponse.json({ success: false, error: "Storage could not delete this file. Please retry." }, { status: 502 });
    }
    const confirmed = await fetch(`${result.url}/rest/v1/rpc/document_cloud_confirm_delete`, {
      method: "POST",
      headers: { apikey: result.serviceKey, Authorization: `Bearer ${result.serviceKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ p_document_id: id }), cache: "no-store",
    });
    if (!confirmed.ok) throw new Error("Could not release document quota after deletion.");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Document Cloud delete error:", error);
    return NextResponse.json({ success: false, error: "Delete could not be completed." }, { status: 502 });
  }
}
