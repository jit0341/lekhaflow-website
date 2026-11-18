import { NextRequest, NextResponse } from "next/server";
import { isDocumentCloudSameOrigin, getDocumentCloudUser, supabaseConfig, supabaseServerKey } from "@/lib/document-cloud/supabase-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!isDocumentCloudSameOrigin(request)) {
    return NextResponse.json({ success: false, error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const user = await getDocumentCloudUser(request);
    if (!user) return NextResponse.json({ success: false, error: "Sign in required." }, { status: 401 });
    const { id } = await context.params;
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json({ success: false, error: "Invalid document ID." }, { status: 400 });
    }

    const { url, key } = supabaseConfig();
    const accessToken = request.cookies.get("lf_dc_access")?.value || "";
    const profileResponse = await fetch(`${url}/rest/v1/document_cloud_clients?select=account_status&id=eq.${encodeURIComponent(user.id)}`, {
      headers: { apikey: key, Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });
    const profileRows = await profileResponse.json().catch(() => []);
    if (!profileResponse.ok || !Array.isArray(profileRows) || profileRows[0]?.account_status !== "ACTIVE") {
      return NextResponse.json({ success: false, error: "An active client account is required." }, { status: 403 });
    }

    const serviceKey = supabaseServerKey();
    const found = await fetch(
      `${url}/rest/v1/document_cloud_documents?select=id,client_id,upload_status&id=eq.${encodeURIComponent(id)}&client_id=eq.${encodeURIComponent(user.id)}`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` }, cache: "no-store" },
    );
    const rows = await found.json().catch(() => []);
    const doc = Array.isArray(rows) ? rows[0] : null;
    if (!found.ok || !doc || doc.upload_status !== "READY") {
      return NextResponse.json({ success: false, error: "Document not found." }, { status: 404 });
    }

    const confirmed = await fetch(`${url}/rest/v1/rpc/document_cloud_confirm_first_download`, {
      method: "POST",
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ p_document_id: id }),
      cache: "no-store",
    });
    if (!confirmed.ok) throw new Error("Could not schedule document retention.");
    const deleteAfter = await confirmed.json();
    return NextResponse.json({ success: true, deleteAfter });
  } catch (error) {
    console.error("Document Cloud download confirmation error:", error);
    return NextResponse.json({ success: false, error: "Could not confirm download." }, { status: 502 });
  }
}
