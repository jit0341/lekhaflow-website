import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const LICENSE_SECRET = process.env.LICENSE_SECRET || "LekhaFlow_Secret_Key_2026";

function generateLicenseHash(machineId: string, plan: string, expiryDate: string): string {
  const data = `${machineId}:${plan}:${expiryDate}:${LICENSE_SECRET}`;
  return crypto.createHash("sha256").update(data).digest("hex").substring(0, 16).toUpperCase();
}

function generateLicenseFile(machineId: string, plan: string, expiryDays: number): string {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + expiryDays);
  const expiryStr = expiryDate.toISOString().split("T")[0]; // YYYY-MM-DD

  const signature = generateLicenseHash(machineId, plan, expiryStr);

  // Format matches desktop app expectation
  const licenseContent = [
    "=== LEKHAFLOW LICENSE FILE ===",
    `MACHINE_ID=${machineId}`,
    `PLAN=${plan.toUpperCase()}`,
    `EXPIRY=${expiryStr}`,
    `ISSUED=${new Date().toISOString()}`,
    `SIGNATURE=${signature}`,
    "=== END LICENSE ==="
  ].join("\n");

  return licenseContent;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { machineId, plan, paymentId, customerEmail, customerMobile } = body;

    if (!machineId || !plan || !paymentId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: machineId, plan, paymentId" },
        { status: 400 }
      );
    }

    // Validate plan
    const validPlans = ["standard", "gold", "trial"];
    if (!validPlans.includes(plan.toLowerCase())) {
      return NextResponse.json(
        { success: false, error: "Invalid plan. Must be standard, gold, or trial" },
        { status: 400 }
      );
    }

    // Determine expiry
    const expiryDays = plan.toLowerCase() === "trial" ? 7 : 365;

    // Generate license content
    const licenseContent = generateLicenseFile(machineId, plan, expiryDays);

    // Log to console (in production, send to Google Sheet or DB)
    console.log("[LICENSE GENERATED]", {
      paymentId,
      machineId,
      plan,
      expiryDays,
      timestamp: new Date().toISOString(),
    });

    // Send to Google Apps Script for record keeping
    try {
      const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
      if (googleScriptUrl) {
        await fetch(googleScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "MARK_LICENSE_ISSUED",
            paymentId,
            machineId,
            licenseContent: licenseContent.replace(/\n/g, " | "),
            issuedAt: new Date().toISOString(),
          }),
        });
      }
    } catch (err) {
      console.error("Google Script update failed:", err);
      // Non-blocking — license is still generated
    }

    return NextResponse.json({
      success: true,
      licenseContent,
      filename: `license_${machineId.substring(0, 8)}.dat`,
      expiryDays,
    });

  } catch (error) {
    console.error("License generation error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}