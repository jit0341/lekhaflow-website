import { NextRequest, NextResponse } from "next/server";
import { isDocumentCloudSameOrigin } from "@/lib/document-cloud/supabase-auth";
import { getDocumentCloudUser, supabaseConfig } from "@/lib/document-cloud/supabase-auth";
import { newStorageKey, filebasePresignedUpload } from "@/lib/document-cloud/filebase";

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
  if (!isDocumentCloudSameOrigin(request)) {
    return NextResponse.json({ success: false, error: "Invalid request origin." }, { status: 403 });
  }
  try {
    const session = await activeUser(request);
    if (!session) return NextResponse.json({ success: false, error: "An active client session is required." }, { status: 401 });

    const body = await request.json();
    const fileName = String(body.fileName || "").trim();
    const contentType = String(body.contentType || "");
    const sizeBytes = Number(body.sizeBytes);
    const category = String(body.category || "");
    if (fileName.length < 1 || fileName.length > 255 || /[\\/\\\\]/.test(fileName)) {
      return NextResponse.json({ success: false, error: "Invalid file name." }, { status: 400 });
    }
    if (!["PURCHASE", "SALES", "BANK_STATEMENT"].includes(category)) {
      return NextResponse.json({ success: false, error: "Select a valid document category." }, { status: 400 });
    }
    if (!Number.isSafeInteger(sizeBytes) || sizeBytes < 1 || sizeBytes > MAX_FILE_BYTES) {
      return NextResponse.json({ success: false, error: "Each file must be between 1 byte and 25 MB." }, { status: 413 });
    }
    if (!ALLOWED[contentType]) {
      return NextResponse.json({ success: false, error: "Only PDF, JPG, PNG and WEBP files are allowed." }, { status: 415 });
    }

    const accessToken = request.cookies.get("lf_dc_access")?.value || "";
    const { url, key } = supabaseConfig();
    const storageKey = newStorageKey(session.user.id, fileName);
    const reservation = await fetch(`${url}/rest/v1/rpc/document_cloud_reserve_upload`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ p_category: category, p_original_filename: fileName, p_content_type: contentType, p_size_bytes: sizeBytes, p_storage_key: storageKey }),
      cache: "no-store",
    });
    const documentId = await reservation.json().catch(() => null);
    if (!reservation.ok || typeof documentId !== "string") {
      return NextResponse.json({ success: false, error: "Upload could not be reserved. Check account status and available storage." }, { status: 409 });
    }
    return NextResponse.json({
      success: true,
      documentId,
      uploadUrl: await filebasePresignedUpload(storageKey, contentType),
      uploadHeaders: { "Content-Type": contentType },
    });
  } catch (error) {
    console.error("Document Cloud upload reservation error:", error);
    return NextResponse.json({ success: false, error: "Upload service is not configured." }, { status: 503 });
  }
}
