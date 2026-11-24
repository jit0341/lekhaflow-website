import { NextRequest, NextResponse } from "next/server";
import {
  isDocumentCloudSameOrigin,
  getDocumentCloudUser,
  supabaseConfig,
  supabaseServerKey,
} from "@/lib/document-cloud/supabase-auth";
import { filebaseDeleteObject } from "@/lib/document-cloud/filebase";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isDocumentCloudSameOrigin(request)) {
    return NextResponse.json({ success: false, error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const user = await getDocumentCloudUser(request);
    if (!user) return NextResponse.json({ success: false, error: "Sign in required." }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const id = String(body.documentId || "");
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json({ success: false, error: "Invalid document ID." }, { status: 400 });
    }

    const { url } = supabaseConfig();
    const serviceKey = supabaseServerKey();
    const headers = {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
    };

    // Only the owner can cancel their own still-pending reservation.
    const lookup = await fetch(
      `${url}/rest/v1/document_cloud_documents?select=id,client_id,storage_key,upload_status&id=eq.${encodeURIComponent(id)}&client_id=eq.${encodeURIComponent(user.id)}`,
      { headers, cache: "no-store" },
    );
    const rows = await lookup.json().catch(() => []);
    const doc = Array.isArray(rows) ? rows[0] : null;
    if (!lookup.ok || !doc) {
      return NextResponse.json({ success: false, error: "Upload reservation not found." }, { status: 404 });
    }
    if (doc.upload_status !== "PENDING") {
      return NextResponse.json({ success: true, cancelled: false, message: "This upload is no longer pending." });
    }

    // Mark it for immediate cleanup first. This prevents finalize from racing
    // and making a cancelled upload READY. The retention job retries failures.
    const mark = await fetch(
      `${url}/rest/v1/document_cloud_documents?id=eq.${encodeURIComponent(id)}&client_id=eq.${encodeURIComponent(user.id)}&upload_status=eq.PENDING`,
      {
        method: "PATCH",
        headers: { ...headers, Prefer: "return=representation" },
        body: JSON.stringify({ upload_status: "DELETE_PENDING", delete_after: new Date().toISOString() }),
        cache: "no-store",
      },
    );
    const markedRows = await mark.json().catch(() => []);
    if (!mark.ok) throw new Error("Could not queue the upload for cancellation.");
    if (!Array.isArray(markedRows) || markedRows.length === 0) {
      return NextResponse.json({ success: true, cancelled: false, message: "Upload was already finalized or cancelled." });
    }

    try {
      await filebaseDeleteObject(doc.storage_key);
      const released = await fetch(`${url}/rest/v1/rpc/document_cloud_confirm_delete`, {
        method: "POST",
        headers,
        body: JSON.stringify({ p_document_id: id }),
        cache: "no-store",
      });
      if (!released.ok) throw new Error("File was deleted but quota release needs retry.");
      return NextResponse.json({ success: true, cancelled: true, quotaReleased: true });
    } catch (cleanupError) {
      // Keep DELETE_PENDING + delete_after=now. The authenticated scheduled
      // retention job retries object deletion and releases quota exactly once.
      console.error("Document Cloud cancellation cleanup queued:", id, cleanupError);
      return NextResponse.json({
        success: true,
        cancelled: true,
        cleanupPending: true,
        message: "Upload cancelled. Storage cleanup is queued and will retry automatically.",
      }, { status: 202 });
    }
  } catch (error) {
    console.error("Document Cloud upload cancellation error:", error);
    return NextResponse.json({ success: false, error: "Could not cancel this upload. Its reservation remains queued for automatic cleanup." }, { status: 502 });
  }
}
