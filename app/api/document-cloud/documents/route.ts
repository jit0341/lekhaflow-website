import { NextRequest, NextResponse } from "next/server";
import { getDocumentCloudUser, supabaseConfig } from "@/lib/document-cloud/supabase-auth";
import { newStorageKey, r2SignedUrl, validFileSignature } from "@/lib/document-cloud/r2";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 25 * 1024 * 1024;
const ALLOWED: Record<string, string> = {
  "application/pdf": "pdf", "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp",
};

async function activeUser(request: NextRequest) {
  const user = await getDocumentCloudUser(request);
  if (!user) return null;
  const { url, key } = supabaseConfig();
  const response = await fetch(`${url}/rest/v1/document_cloud_clients?select=id,account_status,storage_used_bytes,storage_quota_bytes&id=eq.${encodeURIComponent(user.id)}`, {
    headers: { apikey: key, Authorization: `Bearer ${request.cookies.get("lf_dc_access")?.value || ""}` },
    cache: "no-store",
  });
  if (!response.ok) return null;
  const rows = await response.json();
  const profile = Array.isArray(rows) ? rows[0] : null;
  return profile?.account_status === "ACTIVE" ? { user, profile } : null;
}

export async function GET(request: NextRequest) {
  try {
    const session = await activeUser(request);
    if (!session) return NextResponse.json({ success: false, error: "An active client session is required." }, { status: 401 });
    const { url, key } = supabaseConfig();
    const response = await fetch(`${url}/rest/v1/document_cloud_documents?select=id,category,original_filename,content_type,size_bytes,upload_status,uploaded_at,first_downloaded_at,delete_after&client_id=eq.${encodeURIComponent(session.user.id)}&upload_status=eq.READY&order=uploaded_at.desc`, {
      headers: { apikey: key, Authorization: `Bearer ${request.cookies.get("lf_dc_access")?.value || ""}` },
      cache: "no-store",
    });
    if (!response.ok) return NextResponse.json({ success: false, error: "Could not load documents." }, { status: 502 });
    return NextResponse.json({ success: true, documents: await response.json(), storageUsedBytes: session.profile.storage_used_bytes, storageQuotaBytes: session.profile.storage_quota_bytes });
  } catch (error) {
    console.error("Document Cloud list error:", error);
    return NextResponse.json({ success: false, error: "Document service is not configured." }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  let documentId: string | null = null;
  let storageKey: string | null = null;
  try {
    const session = await activeUser(request);
    if (!session) return NextResponse.json({ success: false, error: "An active client session is required." }, { status: 401 });

    const form = await request.formData();
    const file = form.get("file");
    const category = String(form.get("category") || "");
    if (!(file instanceof File)) return NextResponse.json({ success: false, error: "Select a file to upload." }, { status: 400 });
    if (!["PURCHASE", "SALES", "BANK_STATEMENT"].includes(category)) return NextResponse.json({ success: false, error: "Select a valid document category." }, { status: 400 });
    if (file.size < 1 || file.size > MAX_FILE_BYTES) return NextResponse.json({ success: false, error: "Each file must be between 1 byte and 25 MB." }, { status: 413 });
    if (!ALLOWED[file.type]) return NextResponse.json({ success: false, error: "Only PDF, JPG, PNG and WEBP files are allowed." }, { status: 415 });

    const bytes = new Uint8Array(await file.arrayBuffer());
    if (!validFileSignature(bytes, file.type)) return NextResponse.json({ success: false, error: "The file contents do not match the selected file type." }, { status: 415 });

    const accessToken = request.cookies.get("lf_dc_access")?.value || "";
    const { url, key } = supabaseConfig();
    storageKey = newStorageKey(session.user.id, file.name);
    const reservation = await fetch(`${url}/rest/v1/rpc/document_cloud_reserve_upload`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ p_category: category, p_original_filename: file.name.slice(0, 255), p_content_type: file.type, p_size_bytes: file.size, p_storage_key: storageKey }),
      cache: "no-store",
    });
    const reservationData = await reservation.json().catch(() => null);
    if (!reservation.ok || !reservationData) {
      return NextResponse.json({ success: false, error: "Upload could not be reserved. Check account status and available storage." }, { status: 409 });
    }
    documentId = String(reservationData);

    const upload = await fetch(r2SignedUrl("PUT", storageKey, 300), {
      method: "PUT", headers: { "Content-Type": file.type }, body: Buffer.from(bytes),
    });
    if (!upload.ok) throw new Error(`R2 upload failed with status ${upload.status}`);

    const head = await fetch(r2SignedUrl("HEAD", storageKey, 120), { method: "HEAD" });
    const actualSize = Number(head.headers.get("content-length"));
    if (!head.ok || actualSize !== file.size) throw new Error("Uploaded object size verification failed.");

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");
    const finalized = await fetch(`${url}/rest/v1/rpc/document_cloud_finalize_upload`, {
      method: "POST",
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ p_document_id: documentId, p_actual_size_bytes: actualSize }),
      cache: "no-store",
    });
    if (!finalized.ok) throw new Error("Could not finalize document metadata.");
    return NextResponse.json({ success: true, documentId, message: "Document uploaded and verified." });
  } catch (error) {
    console.error("Document Cloud upload error:", error);
    if (storageKey) {
      try { await fetch(r2SignedUrl("DELETE", storageKey, 120), { method: "DELETE" }); } catch {}
    }
    if (documentId) {
      try {
        const accessToken = request.cookies.get("lf_dc_access")?.value || "";
        const { url, key } = supabaseConfig();
        await fetch(`${url}/rest/v1/rpc/document_cloud_cancel_upload`, {
          method: "POST",
          headers: { apikey: key, Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
          body: JSON.stringify({ p_document_id: documentId }), cache: "no-store",
        });
      } catch {}
    }
    return NextResponse.json({ success: false, error: "Upload failed. Any reserved storage has been released where possible." }, { status: 502 });
  }
}
