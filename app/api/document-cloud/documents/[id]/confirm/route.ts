import { NextRequest, NextResponse } from "next/server";
import { getDocumentCloudUser, supabaseConfig } from "@/lib/document-cloud/supabase-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await getDocumentCloudUser(request);
    if (!user) return NextResponse.json({ success: false, error: "Sign in required." }, { status: 401 });
    const { id } = await context.params;
    if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ success: false, error: "Invalid document ID." }, { status: 400 });

    const { url } = supabaseConfig();
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");
    const base = `${url}/rest/v1/document_cloud_documents`;
    const query = `?select=id,client_id,upload_status,first_downloaded_at&id=eq.${encodeURIComponent(id)}&client_id=eq.${encodeURIComponent(user.id)}`;
    const found = await fetch(base + query, { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` }, cache: "no-store" });
    const rows = await found.json().catch(() => []);
    const doc = Array.isArray(rows) ? rows[0] : null;
    if (!found.ok || !doc || doc.upload_status !== "READY") return NextResponse.json({ success: false, error: "Document not found." }, { status: 404 });
    if (doc.first_downloaded_at) return NextResponse.json({ success: true, deleteAfter: doc.delete_after });

    const now = new Date();
    const deleteAfter = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    const updated = await fetch(base + `?id=eq.${encodeURIComponent(id)}&client_id=eq.${encodeURIComponent(user.id)}&first_downloaded_at=is.null`, {
      method: "PATCH",
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json", Prefer: "return=representation" },
      body: JSON.stringify({ first_downloaded_at: now.toISOString(), delete_after: deleteAfter.toISOString() }),
      cache: "no-store",
    });
    if (!updated.ok) throw new Error("Could not schedule document retention.");
    return NextResponse.json({ success: true, deleteAfter: deleteAfter.toISOString() });
  } catch (error) {
    console.error("Document Cloud download confirmation error:", error);
    return NextResponse.json({ success: false, error: "Could not confirm download." }, { status: 502 });
  }
}
