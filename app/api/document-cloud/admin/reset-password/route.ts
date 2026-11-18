import { NextRequest, NextResponse } from "next/server";
import { isDocumentCloudSameOrigin, supabaseConfig } from "@/lib/document-cloud/supabase-auth";

export const runtime = "nodejs";

function allowedAdmin(email: string) {
  return new Set((process.env.DOCUMENT_CLOUD_ADMIN_EMAILS || "")
    .split(",").map(value => value.trim().toLowerCase()).filter(Boolean))
    .has(email.toLowerCase());
}

export async function POST(request: NextRequest) {
  if (!isDocumentCloudSameOrigin(request)) {
    return NextResponse.json({ success: false, error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const accessToken = String(body.accessToken || "");
    const password = String(body.password || "");

    if (accessToken.length < 20 || password.length < 10 || password.length > 128) {
      return NextResponse.json({ success: false, error: "Use the latest recovery link and a password of 10–128 characters." }, { status: 400 });
    }

    const { url, key } = supabaseConfig();
    const userResponse = await fetch(`${url}/auth/v1/user`, {
      headers: { apikey: key, Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });
    if (!userResponse.ok) {
      return NextResponse.json({ success: false, error: "This recovery link is invalid or expired. Request a new password reset email." }, { status: 401 });
    }
    const recoveredUser = await userResponse.json().catch(() => ({}));
    const recoveredEmail = String(recoveredUser.email || "").trim().toLowerCase();
    if (!recoveredEmail || !allowedAdmin(recoveredEmail)) {
      return NextResponse.json({ success: false, error: "This recovery link does not belong to an authorized Document Cloud administrator." }, { status: 403 });
    }

    const updateResponse = await fetch(`${url}/auth/v1/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ password }),
      cache: "no-store",
    });
    const data = await updateResponse.json().catch(() => ({}));
    if (!updateResponse.ok) {
      return NextResponse.json({ success: false, error: String(data.msg || data.message || data.error_description || "Could not update the password.") }, { status: updateResponse.status });
    }

    return NextResponse.json({ success: true, message: "Password updated. Return to Document Cloud Admin and sign in with your new password." });
  } catch (error) {
    console.error("Document Cloud password update error:", error);
    return NextResponse.json({ success: false, error: "Password update is temporarily unavailable." }, { status: 503 });
  }
}
