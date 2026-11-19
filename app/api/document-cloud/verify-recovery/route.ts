import { NextRequest, NextResponse } from "next/server";
import { isDocumentCloudSameOrigin, supabaseAuthRequest } from "@/lib/document-cloud/supabase-auth";
import { serviceRoleRequest } from "@/lib/document-cloud/admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isDocumentCloudSameOrigin(request)) {
    return NextResponse.json({ success: false, error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const tokenHash = String(body.tokenHash || "");
    if (tokenHash.length < 20 || tokenHash.length > 2048 || body.type !== "recovery") {
      return NextResponse.json({ success: false, error: "Recovery link is incomplete or invalid." }, { status: 400 });
    }

    const { response, data } = await supabaseAuthRequest("verify", { token_hash: tokenHash, type: "recovery" });
    if (!response.ok || !data.access_token || !data.user?.id || !data.user?.email_confirmed_at) {
      const code = String(data.code || data.error_code || "");
      return NextResponse.json({
        success: false,
        error: code === "otp_expired"
          ? "This reset link has expired or was already used. Request one fresh email."
          : "This reset link is invalid or expired. Request a fresh email.",
      }, { status: 401 });
    }

    const email = String(data.user.email || "").trim().toLowerCase();
    const admins = new Set((process.env.DOCUMENT_CLOUD_ADMIN_EMAILS || "").split(",").map(v => v.trim().toLowerCase()).filter(Boolean));
    if (admins.has(email)) {
      return NextResponse.json({ success: false, error: "Administrator accounts must use the Document Cloud Admin reset flow." }, { status: 403 });
    }

    const { response: profileResponse, data: profiles } = await serviceRoleRequest(
      `document_cloud_clients?select=id&id=eq.${encodeURIComponent(String(data.user.id))}&limit=1`
    );
    if (!profileResponse.ok || !Array.isArray(profiles) || profiles.length !== 1) {
      return NextResponse.json({ success: false, error: "This recovery link is not associated with a Document Cloud client account." }, { status: 403 });
    }

    return NextResponse.json({ success: true, accessToken: data.access_token });
  } catch (error) {
    console.error("Document Cloud client recovery verification error:", error);
    return NextResponse.json({ success: false, error: "Recovery verification is temporarily unavailable." }, { status: 503 });
  }
}
