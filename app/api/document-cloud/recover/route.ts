import { NextRequest, NextResponse } from "next/server";
import { isDocumentCloudSameOrigin, supabaseAuthRequest } from "@/lib/document-cloud/supabase-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isDocumentCloudSameOrigin(request)) {
    return NextResponse.json({ success: false, error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: "Enter a valid email address." }, { status: 400 });
    }

    // Always use the same public response to avoid disclosing whether an account exists.
    const redirectTo = new URL("/document-cloud/reset-password?audience=client", request.nextUrl.origin).toString();
    const { response, data } = await supabaseAuthRequest(
      `recover?redirect_to=${encodeURIComponent(redirectTo)}`,
      { email }
    );

    if (!response.ok) {
      const code = String(data.code || data.error_code || "");
      const rawMessage = String(data.msg || data.message || data.error_description || "");
      const limited = response.status === 429 || code === "over_email_send_rate_limit" || /email rate limit exceeded/i.test(rawMessage);
      return NextResponse.json({
        success: false,
        error: limited
          ? "Password reset emails are temporarily rate-limited. Please wait before requesting another email."
          : "We could not send the reset email right now. Check the address and try again later.",
      }, { status: limited ? 429 : 503 });
    }

    return NextResponse.json({
      success: true,
      message: "If an eligible client account exists for this email, a password reset link has been sent. Open the newest email only.",
    });
  } catch (error) {
    console.error("Document Cloud client recovery error:", error);
    return NextResponse.json({ success: false, error: "Password recovery is temporarily unavailable." }, { status: 503 });
  }
}
