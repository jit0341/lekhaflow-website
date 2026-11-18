import { NextRequest, NextResponse } from "next/server";
import { requireDocumentCloudAdmin } from "@/lib/document-cloud/admin";
import { filebaseCheckBucket } from "@/lib/document-cloud/filebase";
import { supabaseConfig, supabaseServerKey } from "@/lib/document-cloud/supabase-auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const auth = await requireDocumentCloudAdmin(request);
  if (auth.error) return auth.error;

  const checks: Record<string, { ok: boolean; detail?: string }> = {
    supabase: { ok: false },
    filebase: { ok: false },
  };

  try {
    const { url } = supabaseConfig();
    const secret = supabaseServerKey();
    const response = await fetch(`${url}/rest/v1/document_cloud_clients?select=id&limit=1`, {
      headers: { apikey: secret, Authorization: `Bearer ${secret}` },
      cache: "no-store",
    });
    checks.supabase = response.ok
      ? { ok: true, detail: "Dedicated Supabase project reachable; client table accessible." }
      : { ok: false, detail: `Supabase returned HTTP ${response.status}.` };
  } catch (error) {
    checks.supabase = { ok: false, detail: error instanceof Error ? error.message : "Supabase configuration failed." };
  }

  try {
    const bucket = await filebaseCheckBucket();
    checks.filebase = { ok: true, detail: `Private bucket access confirmed: ${bucket.bucket}; endpoint ${bucket.endpoint}; region ${bucket.region}.` };
  } catch (error) {
    checks.filebase = { ok: false, detail: error instanceof Error ? error.message : "Filebase configuration failed." };
  }

  const success = checks.supabase.ok && checks.filebase.ok;
  return NextResponse.json({ success, checks }, { status: success ? 200 : 503 });
}
