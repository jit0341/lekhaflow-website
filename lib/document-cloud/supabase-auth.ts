import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export function supabaseConfig() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Supabase URL or publishable key is not configured.");
  }
  return { url: SUPABASE_URL, key: SUPABASE_KEY };
}

export async function supabaseAuthRequest(path: string, body: unknown) {
  const { url, key } = supabaseConfig();
  const response = await fetch(`${url}/auth/v1/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));
  return { response, data };
}

export function setDocumentCloudSession(
  response: NextResponse,
  accessToken: string,
  refreshToken: string,
  expiresIn: number
) {
  const secure = process.env.NODE_ENV === "production";
  response.cookies.set("lf_dc_access", accessToken, {
    httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: Math.max(60, expiresIn),
  });
  response.cookies.set("lf_dc_refresh", refreshToken, {
    httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30,
  });
}

export function clearDocumentCloudSession(response: NextResponse) {
  response.cookies.set("lf_dc_access", "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
  response.cookies.set("lf_dc_refresh", "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
}

export async function getDocumentCloudUser(request: NextRequest) {
  const accessToken = request.cookies.get("lf_dc_access")?.value;
  if (!accessToken) return null;

  const { url, key } = supabaseConfig();
  const response = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: key, Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!response.ok) return null;
  return response.json() as Promise<{ id: string; email?: string; email_confirmed_at?: string }>;
}
