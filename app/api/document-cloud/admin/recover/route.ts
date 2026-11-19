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
    if (!/^[^\s@]+@[^\s@]+[.][^\s@]+$/.test(email) || !allowedAdmin(email)) {
      return NextResponse.json({ success: false, error: "Enter the verified administrator email listed in the Vercel allowlist." }, { status: 400 });
    }

    const redirectTo = new URL("/document-cloud/reset-password?audience=admin", request.nextUrl.origin).toString();
    const { response, data } = await supabaseAuthRequest(`recover?redirect_to=${encodeURIComponent(redirectTo)}`, { email });

    if (!response.ok) {
      const code = String(data.code || data.error_code || "");
      const rawMessage = String(data.msg || data.message || data.error_description || data.error || "");
      const limited = response.status === 429 || code === "over_email_send_rate_limit" || /email rate limit exceeded/i.test(rawMessage);
      return NextResponse.json({
        success: false,
        error: limited
          ? "Supabase email sending limit has been reached. Do not keep retrying. Configure custom SMTP in Supabase Authentication > SMTP Settings to raise the email quota, then try again after the current limit window resets."
          : rawMessage || "Could not send the recovery email.",
      }, { status: limited ? 429 : response.status });
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
