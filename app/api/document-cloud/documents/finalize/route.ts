import { NextRequest, NextResponse } from "next/server";
import { isDocumentCloudSameOrigin } from "@/lib/document-cloud/supabase-auth";
import { getDocumentCloudUser, supabaseConfig, supabaseServerKey } from "@/lib/document-cloud/supabase-auth";
import { filebaseDeleteObject, filebaseHeadObject, filebaseReadObjectRange, validFileSignature } from "@/lib/document-cloud/filebase";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isDocumentCloudSameOrigin(request)) {
    return NextResponse.json({ success: false, error: "Invalid request origin." }, { status: 403 });
  }
  let storageKey = "";
  try {
    const user = await getDocumentCloudUser(request);
    if (!user) return NextResponse.json({ success: false, error: "Sign in required." }, { status: 401 });
    const { documentId } = await request.json();
    if (typeof documentId !== "string" || !/^[0-9a-f-]{36}$/i.test(documentId)) {
      return NextResponse.json({ success: false, error: "Invalid document ID." }, { status: 400 });
    }

    const { url, key } = supabaseConfig();
    const accessToken = request.cookies.get("lf_dc_access")?.value || "";
    const profileResponse = await fetch(`${url}/rest/v1/document_cloud_clients?select=account_status&id=eq.${encodeURIComponent(user.id)}`, {
      headers: { apikey: key, Authorization: `Bearer ${accessToken}` }, cache: "no-store",
    });
    const profileRows = await profileResponse.json().catch(() => []);
    if (!profileResponse.ok || !Array.isArray(profileRows) || profileRows[0]?.account_status !== "ACTIVE") {
      return NextResponse.json({ success: false, error: "An active client account is required." }, { status: 403 });
    }
    const serviceKey = supabaseServerKey();
    const lookup = await fetch(`${url}/rest/v1/document_cloud_documents?select=id,client_id,content_type,size_bytes,storage_key,upload_status&id=eq.${encodeURIComponent(documentId)}&client_id=eq.${encodeURIComponent(user.id)}`, {
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` }, cache: "no-store",
    });
    const lookupBody = await lookup.text();
    if (!lookup.ok) {
      console.error("Document Cloud pending lookup failed:", lookup.status, lookupBody.slice(0, 500));
      return NextResponse.json({ success: false, error: "Could not verify the upload reservation. Please contact support with the time of this attempt." }, { status: 502 });
    }
    let rows: unknown;
    try { rows = JSON.parse(lookupBody); } catch { rows = []; }
    const doc = Array.isArray(rows) ? rows[0] as { upload_status?: string; storage_key?: string; content_type?: string; size_bytes?: number } | undefined : undefined;
    if (!doc || doc.upload_status !== "PENDING") {
      return NextResponse.json({ success: false, error: "This upload reservation is no longer pending. Refresh the document list before retrying." }, { status: 404 });
    }
    if (
      typeof doc.storage_key !== "string" || doc.storage_key.length < 10 ||
      typeof doc.content_type !== "string" ||
      typeof doc.size_bytes !== "number" || !Number.isSafeInteger(doc.size_bytes) || doc.size_bytes <= 0
    ) {
      console.error("Document Cloud reservation has incomplete metadata:", documentId);
      return NextResponse.json({ success: false, error: "Upload reservation metadata is incomplete. Please cancel this upload and retry." }, { status: 409 });
    }
    storageKey = doc.storage_key;

    const head = await filebaseHeadObject(storageKey);
    if (Number(head.ContentLength) !== Number(doc.size_bytes)) {
      await filebaseDeleteObject(storageKey);
      const accessToken = request.cookies.get("lf_dc_access")?.value || "";
      await fetch(`${url}/rest/v1/rpc/document_cloud_cancel_upload`, {
        method: "POST", headers: { apikey: key, Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ p_document_id: documentId }), cache: "no-store",
      }).catch(() => null);
      return NextResponse.json({ success: false, error: "Uploaded file size does not match the reserved size." }, { status: 413 });
    }
    // Validate the signature using a small byte range instead of downloading
    // the entire object a second time. The HEAD response already verifies size.
    const signatureBytes = await filebaseReadObjectRange(storageKey, "bytes=0-15");
    if (!validFileSignature(signatureBytes, doc.content_type)) {
      await filebaseDeleteObject(storageKey);
      const accessToken = request.cookies.get("lf_dc_access")?.value || "";
      await fetch(`${url}/rest/v1/rpc/document_cloud_cancel_upload`, {
        method: "POST",
        headers: { apikey: key, Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ p_document_id: documentId }), cache: "no-store",
      }).catch(() => null);
      return NextResponse.json({ success: false, error: "Uploaded file failed file-signature verification." }, { status: 415 });
    }

    const finalize = await fetch(`${url}/rest/v1/rpc/document_cloud_finalize_upload`, {
      method: "POST",
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ p_document_id: documentId, p_actual_size_bytes: Number(head.ContentLength) }),
      cache: "no-store",
    });
    const finalizeResult = await finalize.json().catch(() => null);
    if (!finalize.ok || finalizeResult !== true) {
      console.error("Document Cloud finalize RPC did not confirm READY state:", {
        status: finalize.status,
        result: finalizeResult,
        documentId,
      });
      return NextResponse.json(
        { success: false, error: "The file reached secure storage, but the document record was not confirmed as READY. Refresh the list before retrying; do not upload the same file repeatedly." },
        { status: 502 },
      );
    }
    return NextResponse.json({ success: true, message: "Document uploaded and verified." });
  } catch (error) {
    console.error("Document Cloud finalize error:", error);
    // Leave the reservation PENDING on ambiguous failures. The scheduled cleanup
    // job will delete the object and release quota without risking READY metadata.
    return NextResponse.json({ success: false, error: "Upload verification failed. Please retry." }, { status: 502 });
  }
}
