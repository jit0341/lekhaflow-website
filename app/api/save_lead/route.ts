import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, mobile, machineId, plan, price, source } = body;

    // Validate required fields
    if (!name || !email || !mobile || !plan) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send to Google Apps Script
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (googleScriptUrl) {
      await fetch(googleScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "SAVE_PAYMENT",
          paymentId: `LEAD_${Date.now()}`,
          orderId: `LEAD_${Date.now()}`,
          customerName: name,
          company: company || "",
          email,
          mobile,
          plan: plan.toUpperCase(),
          amount: price || "0",
          status: "LEAD",
          machineId: machineId || "",
          source: source || "website",
          timestamp: new Date().toISOString(),
        }),
      });
    }

    // Also log to console for Vercel logs
    console.log("[LEAD CAPTURED]", {
      name,
      company,
      email,
      mobile,
      plan,
      source,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: "Lead saved" });

  } catch (error) {
    console.error("Save lead error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save lead" },
      { status: 500 }
    );
  }
}