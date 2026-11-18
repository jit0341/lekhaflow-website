import { NextRequest, NextResponse } from "next/server";
import { clearDocumentCloudSession, isDocumentCloudSameOrigin, supabaseConfig } from "@/lib/document-cloud/supabase-auth";

export async function POST(request: NextRequest) {
  if (!isDocumentCloudSameOrigin(request)) {
    return NextResponse.json({ success: false, error: "Invalid request origin." }, { status: 403 });
  }
  const accessToken = request.cookies.get("lf_dc_access")?.value;
  if (accessToken) {
    try {
      const { url, key } = supabaseConfig();
      await fetch(`${url}/auth/v1/logout`, {
        method: "POST",
        headers: { apikey: key, Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      });
    } catch (error) {
      console.error("Document Cloud logout revoke failed:", error);
    }
  }
  const response = NextResponse.json({ success: true });
  clearDocumentCloudSession(response);
  return response;
}
