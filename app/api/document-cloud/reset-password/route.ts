import { NextRequest, NextResponse } from "next/server";
import { isDocumentCloudSameOrigin, supabaseConfig } from "@/lib/document-cloud/supabase-auth";
import { serviceRoleRequest } from "@/lib/document-cloud/admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isDocumentCloudSameOrigin(request)) {
    return NextResponse.json({ success: false, error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const accessToken = String(body.accessToken || "");
    const password = String(body.password || "");
    if (accessToken.length < 20 || password.length < 10 || password.length > 128) {
      return NextResponse.json({ success: false, error: "Use the verified reset link and a password of 10–128 characters." }, { status: 400 });
    }

    const { url, key } = supabaseConfig();
    const userResponse = await fetch(`${url}/auth/v1/user`, {
      headers: { apikey: key, Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });
    const user = await userResponse.json().catch(() => ({}));
    if (!userResponse.ok || !user.id || !user.email_confirmed_at) {
      return NextResponse.json({ success: false, error: "This reset link is invalid or expired. Request a fresh email." }, { status: 401 });
    }

    const email = String(user.email || "").trim().toLowerCase();
    const admins = new Set((process.env.DOCUMENT_CLOUD_ADMIN_EMAILS || "").split(",").map(v => v.trim().toLowerCase()).filter(Boolean));
    if (admins.has(email)) {
      return NextResponse.json({ success: false, error: "Administrator accounts must use the Document Cloud Admin reset flow." }, { status: 403 });
    }

    const { response: profileResponse, data: profiles } = await serviceRoleRequest(
      `document_cloud_clients?select=id&id=eq.${encodeURIComponent(String(user.id))}&limit=1`
    );
    if (!profileResponse.ok || !Array.isArray(profiles) || profiles.length !== 1) {
      return NextResponse.json({ success: false, error: "This account is not registered for Document Cloud." }, { status: 403 });
    }

    const updateResponse = await fetch(`${url}/auth/v1/user`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", apikey: key, Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ password }),
      cache: "no-store",
    });
    const result = await updateResponse.json().catch(() => ({}));
    if (!updateResponse.ok) {
      return NextResponse.json({ success: false, error: String(result.msg || result.message || result.error_description || "Could not update the password.") }, { status: updateResponse.status });
    }

    return NextResponse.json({ success: true, message: "Password updated successfully. Return to Client Login and sign in with your new password." });
  } catch (error) {
    console.error("Document Cloud client password update error:", error);
    return NextResponse.json({ success: false, error: "Password update is temporarily unavailable." }, { status: 503 });
  }
}
