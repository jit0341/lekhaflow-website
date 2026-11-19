import { NextRequest, NextResponse } from "next/server";
import { isDocumentCloudSameOrigin, supabaseAuthRequest } from "@/lib/document-cloud/supabase-auth";

export const runtime = "nodejs";

function allowedAdmin(email: string) {
  return new Set((process.env.DOCUMENT_CLOUD_ADMIN_EMAILS || "")
    .split(",").map(value => value.trim().toLowerCase()).filter(Boolean))
    .has(email.toLowerCase());
}

// Verify only after the user opens our reset page. This avoids email security
// scanners consuming Supabase's single-use recovery link before the user clicks it.
export async function POST(request: NextRequest) {
  if (!isDocumentCloudSameOrigin(request)) {
    return NextResponse.json({ success: false, error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const tokenHash = String(body.tokenHash || "");
    const type = String(body.type || "");
    if (tokenHash.length < 20 || tokenHash.length > 2048 || type !== "recovery") {
      return NextResponse.json({ success: false, error: "Recovery link is incomplete or invalid." }, { status: 400 });
    }

    const { response, data } = await supabaseAuthRequest("verify", {
      token_hash: tokenHash,
      type: "recovery",
    });

    if (!response.ok || !data.access_token || !data.user?.email) {
      const code = String(data.code || data.error_code || "");
      const message = code === "otp_expired"
        ? "This recovery link has expired or was already used. Request one fresh email and open its link."
        : "This recovery link is invalid or expired. Request a fresh email.";
      return NextResponse.json({ success: false, error: message }, { status: 401 });
    }

    const email = String(data.user.email).trim().toLowerCase();
    if (!allowedAdmin(email) || !data.user.email_confirmed_at) {
      return NextResponse.json({ success: false, error: "This recovery link is not for a verified Document Cloud administrator." }, { status: 403 });
    }

    return NextResponse.json({ success: true, accessToken: data.access_token });
  } catch (error) {
    console.error("Document Cloud recovery verification error:", error);
    return NextResponse.json({ success: false, error: "Recovery verification is temporarily unavailable." }, { status: 503 });
  }
}
