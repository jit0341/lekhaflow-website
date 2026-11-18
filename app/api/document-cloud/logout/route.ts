import { NextResponse } from "next/server";
import { clearDocumentCloudSession } from "@/lib/document-cloud/supabase-auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  clearDocumentCloudSession(response);
  return response;
}
