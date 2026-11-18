import { NextRequest, NextResponse } from "next/server";
import { getDocumentCloudUser, supabaseConfig, supabaseServerKey } from "@/lib/document-cloud/supabase-auth";
import { filebaseDeleteObject, filebaseHeadObject, filebaseReadObject, validFileSignature } from "@/lib/document-cloud/filebase";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
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
    const rows = await lookup.json().catch(() => []);
    const doc = Array.isArray(rows) ? rows[0] : null;
    if (!lookup.ok || !doc || doc.upload_status !== "PENDING") {
      return NextResponse.json({ success: false, error: "Pending upload not found." }, { status: 404 });
    }
    storageKey = doc.storage_key;

    const head = await filebaseHeadObject(storageKey);
    if (Number(head.ContentLength) !== Number(doc.size_bytes)) {
      await filebaseDeleteObject(storageKey).catch(() => null);
      const accessToken = request.cookies.get("lf_dc_access")?.value || "";
      await fetch(`${url}/rest/v1/rpc/document_cloud_cancel_upload`, {
        method: "POST", headers: { apikey: key, Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ p_document_id: documentId }), cache: "no-store",
      }).catch(() => null);
      return NextResponse.json({ success: false, error: "Uploaded file size does not match the reserved size." }, { status: 413 });
    }
    const bytes = await filebaseReadObject(storageKey);
    if (bytes.byteLength !== Number(doc.size_bytes) || !validFileSignature(bytes, doc.content_type)) {
      await filebaseDeleteObject(storageKey).catch(() => null);
      const accessToken = request.cookies.get("lf_dc_access")?.value || "";
      await fetch(`${url}/rest/v1/rpc/document_cloud_cancel_upload`, {
        method: "POST",
        headers: { apikey: key, Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ p_document_id: documentId }), cache: "no-store",
      }).catch(() => null);
      return NextResponse.json({ success: false, error: "Uploaded file failed size or file-signature verification." }, { status: 415 });
    }

    const finalize = await fetch(`${url}/rest/v1/rpc/document_cloud_finalize_upload`, {
      method: "POST",
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ p_document_id: documentId, p_actual_size_bytes: bytes.byteLength }),
      cache: "no-store",
    });
    if (!finalize.ok) throw new Error("Could not finalize document metadata.");
    return NextResponse.json({ success: true, message: "Document uploaded and verified." });
  } catch (error) {
    console.error("Document Cloud finalize error:", error);
    if (storageKey) await filebaseDeleteObject(storageKey).catch(() => null);
    return NextResponse.json({ success: false, error: "Upload verification failed. Please retry." }, { status: 502 });
  }
}
