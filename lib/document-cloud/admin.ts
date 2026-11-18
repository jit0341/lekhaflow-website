import { NextRequest, NextResponse } from "next/server";
import { getDocumentCloudUser, supabaseConfig, supabaseServerKey } from "@/lib/document-cloud/supabase-auth";

type AuthUser = { id: string; email?: string };

function adminEmails(): Set<string> {
  return new Set(
    (process.env.DOCUMENT_CLOUD_ADMIN_EMAILS || "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean)
  );
}

export async function requireDocumentCloudAdmin(request: NextRequest): Promise<{ user: AuthUser; error?: never } | { user?: never; error: NextResponse }> {
  let user: AuthUser | null = null;
  try {
    user = await getDocumentCloudUser(request);
  } catch {
    return { error: NextResponse.json({ success: false, error: "Authentication service unavailable." }, { status: 503 }) };
  }

  if (!user?.email || !user.email_confirmed_at || !adminEmails().has(user.email.toLowerCase())) {
    return { error: NextResponse.json({ success: false, error: "Administrator access required." }, { status: 403 }) };
  }

  return { user };
}

export function requireSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function serviceRoleRequest(path: string, init: RequestInit = {}) {
  const { url } = supabaseConfig();
  const serviceKey = supabaseServerKey();

  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  const text = await response.text();
  const data = text ? (() => { try { return JSON.parse(text); } catch { return text; } })() : null;
  return { response, data };
}
