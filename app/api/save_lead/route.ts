import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const company = String(body.company || "").trim();
    const email = String(body.email || "").trim();
    const mobile = String(body.mobile || "").trim();
    const source = String(body.source || "website");
    const help = String(body.help || "").trim();
    const message = String(body.message || "").trim();
    const isContactLead = source === "contact_page";

    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "A valid name and email address are required." },
        { status: 400 }
      );
    }
    if (!isContactLead && (!mobile || !body.plan)) {
      return NextResponse.json(
        { success: false, error: "Mobile number and plan are required." },
        { status: 400 }
      );
    }

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!googleScriptUrl) {
      return NextResponse.json(
        { success: false, error: "Enquiry service is temporarily unavailable. Please use WhatsApp or email." },
        { status: 503 }
      );
    }

    const leadId = `LEAD_${crypto.randomUUID()}`;
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "SAVE_PAYMENT",
        paymentId: leadId,
        orderId: leadId,
        customerName: name,
        company,
        email,
        mobile,
        plan: isContactLead ? "CONTACT" : String(body.plan).toUpperCase(),
        amount: "0",
        status: "LEAD",
        machineId: String(body.machineId || ""),
        source,
        help,
        message,
        timestamp: new Date().toISOString(),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Google Apps Script lead save failed:", response.status);
      return NextResponse.json(
        { success: false, error: "We could not save your enquiry. Please use WhatsApp or email." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, message: "Enquiry received." });
  } catch (error) {
    console.error("Save lead error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save enquiry." },
      { status: 500 }
    );
  }
}
