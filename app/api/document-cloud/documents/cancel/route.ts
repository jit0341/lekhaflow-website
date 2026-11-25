import { NextRequest, NextResponse } from "next/server";
import { isDocumentCloudSameOrigin, getDocumentCloudUser, supabaseConfig } from "@/lib/document-cloud/supabase-auth";
import { filebaseDeleteObject } from "@/lib/document-cloud/filebase";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isDocumentCloudSameOrigin(request)) {
    return NextResponse.json({ success: false, error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const user = await getDocumentCloudUser(request);
    if (!user) return NextResponse.json({ success: false, error: "Sign in required." }, { status: 401 });
    const body = await request.json();
    const id = String(body.documentId || "");
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json({ success: false, error: "Invalid document ID." }, { status: 400 });
    }

    const { url, key } = supabaseConfig();
    const accessToken = request.cookies.get("lf_dc_access")?.value || "";
    // RLS ensures the reservation lookup is restricted to the signed-in owner.
    const lookup = await fetch(
      `${url}/rest/v1/document_cloud_documents?select=id,client_id,storage_key,upload_status&id=eq.${encodeURIComponent(id)}&client_id=eq.${encodeURIComponent(user.id)}`,
      { headers: { apikey: key, Authorization: `Bearer ${accessToken}` }, cache: "no-store" },
    );
    const rows = await lookup.json().catch(() => []);
    const doc = Array.isArray(rows) ? rows[0] : null;
    if (!lookup.ok || !doc) return NextResponse.json({ success: false, error: "Upload reservation not found." }, { status: 404 });
    if (doc.upload_status !== "PENDING") return NextResponse.json({ success: true, cancelled: false });

    await filebaseDeleteObject(doc.storage_key);
    const cancelled = await fetch(`${url}/rest/v1/rpc/document_cloud_cancel_upload`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ p_document_id: id }),
      cache: "no-store",
    });
    if (!cancelled.ok) throw new Error("Could not release the upload reservation.");
    return NextResponse.json({ success: true, cancelled: true });
  } catch (error) {
    console.error("Document Cloud upload cancellation error:", error);
    return NextResponse.json({ success: false, error: "Could not cancel this upload. The reservation will expire automatically." }, { status: 502 });
  }
}
