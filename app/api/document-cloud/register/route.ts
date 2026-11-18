import { NextRequest, NextResponse } from "next/server";
import { supabaseAuthRequest } from "@/lib/document-cloud/supabase-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const businessName = String(body.businessName || "").trim();
    const contactName = String(body.contactName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (businessName.length < 2 || businessName.length > 160 ||
        contactName.length < 2 || contactName.length > 120 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        password.length < 10 || password.length > 128) {
      return NextResponse.json({ success: false, error: "Please provide valid details. Password must be at least 10 characters." }, { status: 400 });
    }

    const { response, data } = await supabaseAuthRequest("signup", {
      email,
      password,
      data: { business_name: businessName, contact_name: contactName },
    });

    if (!response.ok) {
      const message = String(data.msg || data.message || data.error_description || data.error || "Registration failed.");
      return NextResponse.json({ success: false, error: message }, { status: response.status });
    }

    return NextResponse.json({
      success: true,
      message: "Registration received. Check your email to verify the address. Portal access remains pending until LekhaFlow admin approval.",
      emailVerificationRequired: true,
    });
  } catch (error) {
    console.error("Document Cloud registration error:", error);
    return NextResponse.json({ success: false, error: "Registration service is not configured or temporarily unavailable." }, { status: 503 });
  }
}
