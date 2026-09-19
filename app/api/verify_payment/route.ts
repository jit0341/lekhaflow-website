import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";
const LICENSE_SECRET = process.env.LICENSE_SECRET || "LekhaFlow_Secret_Key_2026";

function generateLicenseHash(machineId: string, plan: string, expiryDate: string): string {
  const data = `${machineId}:${plan}:${expiryDate}:${LICENSE_SECRET}`;
  return crypto.createHash("sha256").update(data).digest("hex").substring(0, 16).toUpperCase();
}

function generateLicenseFile(machineId: string, plan: string, expiryDays: number): string {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + expiryDays);
  const expiryStr = expiryDate.toISOString().split("T")[0];

  const signature = generateLicenseHash(machineId, plan, expiryStr);

  return [
    "=== LEKHAFLOW LICENSE FILE ===",
    `MACHINE_ID=${machineId}`,
    `PLAN=${plan.toUpperCase()}`,
    `EXPIRY=${expiryStr}`,
    `ISSUED=${new Date().toISOString()}`,
    `SIGNATURE=${signature}`,
    "=== END LICENSE ==="
  ].join("\n");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paymentId, orderId, plan } = body;

    if (!paymentId) {
      return NextResponse.json(
        { success: false, error: "Payment ID required" },
        { status: 400 }
      );
    }

    // Verify payment with Razorpay
    const auth = Buffer.from(`${RAZORPAY_KEY_SECRET}:`).toString("base64");
    
    const verifyResponse = await fetch(
      `https://api.razorpay.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    if (!verifyResponse.ok) {
      return NextResponse.json(
        { success: false, error: "Payment verification failed" },
        { status: 400 }
      );
    }

    const payment = await verifyResponse.json();

    // Check if payment is captured
    if (payment.status !== "captured") {
      return NextResponse.json(
        { success: false, error: `Payment status: ${payment.status}` },
        { status: 400 }
      );
    }

    // Get machine ID from notes or generate one
    const machineId = payment.notes?.machineId || `PAID_${paymentId.substring(0, 8)}`;
    const planType = payment.notes?.plan || plan || "standard";
    const expiryDays = planType === "trial" ? 7 : 365;

    // Generate license
    const licenseContent = generateLicenseFile(machineId, planType, expiryDays);
    const filename = `license_${machineId.substring(0, 8)}.dat`;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiryDays);

    // Store in Google Sheet
    try {
      const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
      if (googleScriptUrl) {
        await fetch(googleScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "SAVE_LICENSE",
            paymentId,
            machineId,
            plan: planType,
            licenseContent: licenseContent.replace(/\n/g, " | "),
            expiryDate: expiryDate.toISOString(),
            timestamp: new Date().toISOString(),
          }),
        });
      }
    } catch (err) {
      console.error("Failed to save to Google Sheet:", err);
    }

    // Send license via email and WhatsApp
    try {
      const email = payment.email || payment.notes?.email || "";
      const mobile = payment.contact || payment.notes?.mobile || "";

      if (email || mobile) {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "https://lekhaflow.in"}/api/send-license`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            mobile,
            name: payment.notes?.customerName || payment.notes?.name || "",
            plan: planType,
            licenseContent,
            filename,
            expiryDate: expiryDate.toISOString(),
          }),
        });
      }
    } catch (err) {
      console.error("Failed to send license notification:", err);
      // Non-blocking - user can still download from page
    }

    return NextResponse.json({
      success: true,
      licenseContent,
      filename,
      machineId,
      plan: planType,
      expiryDate: expiryDate.toISOString(),
    });

  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}