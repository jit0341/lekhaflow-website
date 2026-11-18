import { NextRequest, NextResponse } from "next/server";
import { requireDocumentCloudAdmin, requireSameOrigin, serviceRoleRequest } from "@/lib/document-cloud/admin";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const auth = await requireDocumentCloudAdmin(request);
  if (auth.error) return auth.error;

  try {
    const { response, data } = await serviceRoleRequest(
      "document_cloud_clients?select=id,business_name,contact_name,email,account_status,is_test_account,storage_quota_bytes,storage_used_bytes,approval_note,approved_at,created_at,updated_at&order=created_at.desc"
    );
    if (!response.ok) {
      return NextResponse.json({ success: false, error: "Could not load client accounts." }, { status: 502 });
    }
    return NextResponse.json({ success: true, clients: data || [] });
  } catch (error) {
    console.error("Document Cloud admin list error:", error);
    return NextResponse.json({ success: false, error: "Admin service is not configured." }, { status: 503 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!requireSameOrigin(request)) {
    return NextResponse.json({ success: false, error: "Invalid request origin." }, { status: 403 });
  }
  const auth = await requireDocumentCloudAdmin(request);
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const id = String(body.id || "");
    const status = String(body.accountStatus || "");
    const approvalNote = body.approvalNote == null ? null : String(body.approvalNote).trim().slice(0, 1000);
    const allowed = ["APPROVAL_PENDING", "ACTIVE", "SUSPENDED", "REJECTED"];
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id) || !allowed.includes(status)) {
      return NextResponse.json({ success: false, error: "A valid client ID and account status are required." }, { status: 400 });
    }

    if (status === "ACTIVE") {
      const { url } = await import("@/lib/document-cloud/supabase-auth").then(m => m.supabaseConfig());
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");
      const authUserResponse = await fetch(`${url}/auth/v1/admin/users/${encodeURIComponent(id)}`, {
        headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
        cache: "no-store",
      });
      const authUser = await authUserResponse.json().catch(() => ({}));
      if (!authUserResponse.ok || !authUser.email_confirmed_at) {
        return NextResponse.json({ success: false, error: "Verify the client's email before activating this account." }, { status: 409 });
      }
    }

    const update: Record<string, unknown> = {
      account_status: status,
      approval_note: approvalNote,
      approved_at: status === "ACTIVE" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };
    if (typeof body.isTestAccount === "boolean") update.is_test_account = body.isTestAccount;

    const { response, data } = await serviceRoleRequest(
      `document_cloud_clients?id=eq.${encodeURIComponent(id)}&select=id,business_name,email,account_status,is_test_account,approval_note,approved_at,storage_used_bytes,storage_quota_bytes`,
      { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify(update) }
    );
    if (!response.ok) {
      console.error("Document Cloud admin update rejected:", data);
      return NextResponse.json({ success: false, error: "Could not update this account." }, { status: 502 });
    }
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ success: false, error: "Client account not found." }, { status: 404 });
    }
    await serviceRoleRequest("document_cloud_audit_events", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ client_id: id, actor_user_id: auth.user.id, event_type: "ACCOUNT_STATUS_CHANGED", details: { account_status: status, is_test_account: update.is_test_account ?? null } }),
    }).catch((auditError) => console.error("Document Cloud admin audit write failed:", auditError));
    return NextResponse.json({ success: true, client: data[0] });
  } catch (error) {
    console.error("Document Cloud admin update error:", error);
    return NextResponse.json({ success: false, error: "Admin service is not configured." }, { status: 503 });
  }
}
