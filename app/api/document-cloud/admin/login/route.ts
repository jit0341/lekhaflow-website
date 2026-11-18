import { NextRequest, NextResponse } from "next/server";
import { isDocumentCloudSameOrigin } from "@/lib/document-cloud/supabase-auth";
import { setDocumentCloudSession, supabaseAuthRequest } from "@/lib/document-cloud/supabase-auth";

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
    const password = String(body.password || "");
    if (!email || !password || !allowedAdmin(email)) {
      return NextResponse.json({ success: false, error: "Invalid administrator credentials." }, { status: 401 });
    }

    const { response: authResponse, data } = await supabaseAuthRequest("token?grant_type=password", { email, password });
    if (!authResponse.ok || !data.access_token || !data.refresh_token ||
        !data.user?.email_confirmed_at || !allowedAdmin(String(data.user.email || email))) {
      return NextResponse.json({ success: false, error: "Sign-in failed. Confirm the admin email and password." }, { status: 401 });
    }

    const result = NextResponse.json({ success: true });
    setDocumentCloudSession(result, data.access_token, data.refresh_token, Number(data.expires_in || 3600));
    return result;
  } catch (error) {
    console.error("Document Cloud admin login error:", error);
    return NextResponse.json({ success: false, error: "Administrator sign-in is temporarily unavailable." }, { status: 503 });
  }
}
