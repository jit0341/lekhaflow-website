import { NextRequest, NextResponse } from "next/server";
import { isDocumentCloudSameOrigin, supabaseAuthRequest } from "@/lib/document-cloud/supabase-auth";

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
    const email = String(body.email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !allowedAdmin(email)) {
      return NextResponse.json({ success: false, error: "Enter the verified administrator email listed in the Vercel allowlist." }, { status: 400 });
    }

    const redirectTo = new URL("/document-cloud/reset-password", request.nextUrl.origin).toString();
    const path = `recover?redirect_to=${encodeURIComponent(redirectTo)}`;
    const { response, data } = await supabaseAuthRequest(path, { email });

    if (!response.ok) {
      const message = String(data.msg || data.message || data.error_description || data.error || "Could not send the recovery email.");
      return NextResponse.json({ success: false, error: message }, { status: response.status });
    }

    return NextResponse.json({
      success: true,
      message: "If this administrator email is eligible, a password recovery link has been sent. Open the newest email only; older links may expire.",
    });
  } catch (error) {
    console.error("Document Cloud admin recovery error:", error);
    return NextResponse.json({ success: false, error: "Password recovery is temporarily unavailable." }, { status: 503 });
  }
}
