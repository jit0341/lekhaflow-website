import { NextRequest, NextResponse } from "next/server";
import { setDocumentCloudSession, supabaseAuthRequest, supabaseConfig } from "@/lib/document-cloud/supabase-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required." }, { status: 400 });
    }

    const { response: authResponse, data } = await supabaseAuthRequest("token?grant_type=password", { email, password });
    if (!authResponse.ok || !data.access_token || !data.refresh_token) {
      return NextResponse.json({ success: false, error: "Login failed. Check your credentials and verify your email." }, { status: 401 });
    }

    const { url, key } = supabaseConfig();
    const profileResponse = await fetch(`${url}/rest/v1/document_cloud_clients?select=account_status,business_name,is_test_account,storage_used_bytes,storage_quota_bytes&id=eq.${encodeURIComponent(data.user.id)}`, {
      headers: { apikey: key, Authorization: `Bearer ${data.access_token}` },
      cache: "no-store",
    });
    const profiles = await profileResponse.json().catch(() => []);
    const profile = Array.isArray(profiles) ? profiles[0] : null;

    if (!profile) {
      return NextResponse.json({ success: false, error: "Client profile is not ready. Contact LekhaFlow support." }, { status: 403 });
    }
    if (profile.account_status !== "ACTIVE") {
      const message = profile.account_status === "APPROVAL_PENDING"
        ? "Email verified. Your account is awaiting LekhaFlow admin approval."
        : profile.account_status === "SUSPENDED"
          ? "This account is suspended. Contact LekhaFlow support."
          : "Please verify your email and wait for account approval.";
      return NextResponse.json({ success: false, status: profile.account_status, error: message }, { status: 403 });
    }

    const result = NextResponse.json({
      success: true,
      client: {
        businessName: profile.business_name,
        isTestAccount: profile.is_test_account,
        storageUsedBytes: profile.storage_used_bytes,
        storageQuotaBytes: profile.storage_quota_bytes,
      },
    });
    setDocumentCloudSession(result, data.access_token, data.refresh_token, Number(data.expires_in || 3600));
    return result;
  } catch (error) {
    console.error("Document Cloud login error:", error);
    return NextResponse.json({ success: false, error: "Login service is temporarily unavailable." }, { status: 503 });
  }
}
