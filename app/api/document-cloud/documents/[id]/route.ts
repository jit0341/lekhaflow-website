import { NextRequest, NextResponse } from "next/server";
import { isDocumentCloudSameOrigin, getDocumentCloudUser, supabaseConfig, supabaseServerKey } from "@/lib/document-cloud/supabase-auth";
import { filebaseDeleteObject, filebasePresignedDownload } from "@/lib/document-cloud/filebase";

export const runtime = "nodejs";

async function ownedReadyDocument(request: NextRequest, id: string) {
  const user = await getDocumentCloudUser(request);
  if (!user) return { error: NextResponse.json({ success: false, error: "Sign in required." }, { status: 401 }) };

  const { url, key } = supabaseConfig();
  const accessToken = request.cookies.get("lf_dc_access")?.value || "";
  const profileResponse = await fetch(`${url}/rest/v1/document_cloud_clients?select=account_status&id=eq.${encodeURIComponent(user.id)}`, {
    headers: { apikey: key, Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  const profileRows = await profileResponse.json().catch(() => []);
  if (!profileResponse.ok || !Array.isArray(profileRows) || profileRows[0]?.account_status !== "ACTIVE") {
    return { error: NextResponse.json({ success: false, error: "An active client account is required." }, { status: 403 }) };
  }

  const serviceKey = supabaseServerKey();
  const response = await fetch(
    `${url}/rest/v1/document_cloud_documents?select=id,client_id,original_filename,content_type,size_bytes,storage_key,upload_status,first_downloaded_at,delete_after&id=eq.${encodeURIComponent(id)}&client_id=eq.${encodeURIComponent(user.id)}`,
    { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` }, cache: "no-store" },
  );
  const rows = await response.json().catch(() => []);
  const doc = Array.isArray(rows) ? rows[0] : null;
  if (!response.ok || !doc || doc.upload_status !== "READY" || (doc.delete_after && new Date(doc.delete_after).getTime() <= Date.now())) {
    return { error: NextResponse.json({ success: false, error: "Document not found." }, { status: 404 }) };
  }
  return { user, doc, url, serviceKey };
}

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!isDocumentCloudSameOrigin(request)) {
    return NextResponse.json({ success: false, error: "Invalid request origin." }, { status: 403 });
  }
  try {
    const { id } = await context.params;
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json({ success: false, error: "Invalid document ID." }, { status: 400 });
    }
    const result = await ownedReadyDocument(request, id);
    if ("error" in result) return result.error;
    const disposition = request.nextUrl.searchParams.get("mode") === "preview" ? "inline" : "attachment";
    return NextResponse.json({
      success: true,
      url: await filebasePresignedDownload(result.doc.storage_key, disposition),
      filename: result.doc.original_filename,
      contentType: result.doc.content_type,
    });
  } catch (error) {
    console.error("Document Cloud download URL error:", error);
    return NextResponse.json({ success: false, error: "Download service is unavailable." }, { status: 503 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!isDocumentCloudSameOrigin(request)) {
    return NextResponse.json({ success: false, error: "Invalid request origin." }, { status: 403 });
  }
  try {
    const { id } = await context.params;
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json({ success: false, error: "Invalid document ID." }, { status: 400 });
    }
    const result = await ownedReadyDocument(request, id);
    if ("error" in result) return result.error;

    try {
      await filebaseDeleteObject(result.doc.storage_key);
    } catch (error) {
      const status = (error as { $metadata?: { httpStatusCode?: number } })?.$metadata?.httpStatusCode;
      if (status !== 404) {
        return NextResponse.json({ success: false, error: "Storage could not delete this file. Please retry." }, { status: 502 });
      }
    }

    const confirmed = await fetch(`${result.url}/rest/v1/rpc/document_cloud_confirm_delete`, {
      method: "POST",
      headers: { apikey: result.serviceKey, Authorization: `Bearer ${result.serviceKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ p_document_id: id }),
      cache: "no-store",
    });
    if (!confirmed.ok) throw new Error("Could not release document quota after deletion.");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Document Cloud delete error:", error);
    return NextResponse.json({ success: false, error: "Delete could not be completed." }, { status: 502 });
  }
}
