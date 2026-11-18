import { NextRequest, NextResponse } from "next/server";
import { isDocumentCloudSameOrigin, setDocumentCloudSession, supabaseAuthRequest, clearDocumentCloudSession } from "@/lib/document-cloud/supabase-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isDocumentCloudSameOrigin(request)) {
    return NextResponse.json({ success: false, error: "Invalid request origin." }, { status: 403 });
  }

  const refreshToken = request.cookies.get("lf_dc_refresh")?.value;
  if (!refreshToken) {
    const response = NextResponse.json({ success: false, error: "Session expired. Please sign in again." }, { status: 401 });
    clearDocumentCloudSession(response);
    return response;
  }

  try {
    const { response: authResponse, data } = await supabaseAuthRequest("token?grant_type=refresh_token", {
      refresh_token: refreshToken,
    });
    if (!authResponse.ok || !data.access_token || !data.refresh_token) {
      const response = NextResponse.json({ success: false, error: "Session expired. Please sign in again." }, { status: 401 });
      clearDocumentCloudSession(response);
      return response;
    }

    const response = NextResponse.json({ success: true });
    setDocumentCloudSession(response, data.access_token, data.refresh_token, Number(data.expires_in || 3600));
    return response;
  } catch (error) {
    console.error("Document Cloud session refresh error:", error);
    return NextResponse.json({ success: false, error: "Could not refresh session." }, { status: 503 });
  }
}
