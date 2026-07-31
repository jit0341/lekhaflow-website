// app/api/webhook/razorpay/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!;
const LICENSE_API_URL = process.env.NEXT_PUBLIC_APP_URL || "https://lekhaflow.in";

// Signature Verification
function verifySignature(body: string, signature: string) {
  const expected = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(body)
    .digest("hex");
  return expected === signature;
}

// Simple email sender using Google Apps Script or any SMTP
async function sendLicenseEmail(email: string, name: string, plan: string, licenseBase64: string) {
  try {
    // Option 1: Google Apps Script
    const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL!;
    if (SCRIPT_URL) {
      await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "SEND_LICENSE_EMAIL",
          to: email,
          name: name,
          plan: plan,
          licenseBase64: licenseBase64,
          subject: `Your LekhaFlow ${plan} License is Ready`,
          body: `Dear ${name},\n\nThank you for purchasing LekhaFlow ${plan}.\n\nYour license.dat file is attached.\n\nInstallation Steps:\n1. Create folder: D:\\lekhaflow_data (or C:\\Users\\[YourName]\\Documents\\lekhaflow_data)\n2. Place the attached license.dat file in this folder\n3. Launch LekhaFlow from your desktop\n4. Software will auto-activate\n\nNeed help? Reply to this email or WhatsApp +91-8770808695\n\nBest regards,\nJitendra Bharti\nFounder, LekhaFlow`
        })
      });
    }

    // Option 2: Resend API (recommended - free tier: 100 emails/day)
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "LekhaFlow <licenses@lekhaflow.in>",
          to: email,
          subject: `Your LekhaFlow ${plan} License - lekhaflow.in`,
          html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0f172a;color:#e2e8f0;">
            <h1 style="color:#14b8a6;">LekhaFlow License Activated</h1>
            <p>Dear ${name},</p>
            <p>Thank you for purchasing <strong>LekhaFlow ${plan}</strong>.</p>
            <div style="background:#1e293b;padding:15px;border-radius:10px;margin:20px 0;">
              <p style="margin:5px 0;"><strong>Plan:</strong> ${plan}</p>
              <p style="margin:5px 0;"><strong>Validity:</strong> 1 Year</p>
            </div>
            <h3 style="color:#14b8a6;">Installation Steps:</h3>
            <ol style="line-height:1.8;">
              <li>Create folder: <code style="background:#334155;padding:2px 6px;border-radius:4px;">D:\\lekhaflow_data</code> (or Documents\\lekhaflow_data)</li>
              <li>Save the attached <strong>license.dat</strong> file in this folder</li>
              <li>Launch LekhaFlow from desktop</li>
              <li>Software auto-activates</li>
            </ol>
            <p style="margin-top:20px;">Need help? <a href="https://wa.me/918770808695" style="color:#14b8a6;">WhatsApp us</a> or reply to this email.</p>
            <p style="margin-top:30px;font-size:12px;color:#64748b;">Jitendra Bharti | Founder, LekhaFlow<br>Nexoriva Systems | Surajpur, Chhattisgarh</p>
          </div>`,
          attachments: [{
            filename: "license.dat",
            content: licenseBase64
          }]
        })
      });
    }
  } catch (err) {
    console.error("Email send failed:", err);
  }
}

// WhatsApp notification via Google Script or CallMeBot (free)
async function sendWhatsAppNotification(mobile: string, name: string, plan: string) {
  try {
    const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
    if (SCRIPT_URL) {
      await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "SEND_WHATSAPP",
          mobile: mobile,
          message: `Hello ${name}, your LekhaFlow ${plan} license has been generated and sent to your email. Check your inbox (and spam folder) for license.dat. Installation guide: Create folder D:\\lekhaflow_data and place license.dat inside. - Jitendra Bharti, LekhaFlow`
        })
      });
    }
  } catch (err) {
    console.error("WhatsApp send failed:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!WEBHOOK_SECRET) {
      console.error("Missing RAZORPAY_WEBHOOK_SECRET");
      return NextResponse.json({ success: false, message: "Server Configuration Error" }, { status: 500 });
    }

    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";

    if (!verifySignature(body, signature)) {
      return NextResponse.json({ success: false, message: "Invalid Signature" }, { status: 401 });
    }

    const event = JSON.parse(body);

    // Only process successful payments
    if (event.event !== "payment.captured") {
      return NextResponse.json({ success: true, message: "Event ignored" });
    }

    const payment = event.payload.payment.entity;

    // Extract data from Razorpay notes (set during checkout)
    const plan = payment.notes?.plan || "STANDARD";
    const customerName = payment.notes?.customerName || "Valued Client";
    const machineId = payment.notes?.machineId || "";
    const email = payment.email || payment.notes?.email || "";
    const mobile = payment.contact || payment.notes?.mobile || "";

    // Validate machine ID
    if (!machineId) {
      console.error("No machine ID provided for payment:", payment.id);
      // Still save payment, but flag for manual license generation
      return NextResponse.json({ 
        success: true, 
        message: "Payment captured but machine ID missing. Manual license generation required." 
      });
    }

    // Call license generation API
    const licenseResponse = await fetch(`${LICENSE_API_URL}/api/generate_license`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        machineId,
        plan: plan.toUpperCase(),
        paymentId: payment.id,
        email,
        mobile
      })
    });

    const licenseData = await licenseResponse.json();

    if (licenseData.success) {
      // Send email with license attachment
      await sendLicenseEmail(email, customerName, plan, licenseData.data.fileBase64);

      // Send WhatsApp notification
      await sendWhatsAppNotification(mobile, customerName, plan);

      console.log(`License generated and sent for payment ${payment.id}`);
    } else {
      console.error("License generation failed:", licenseData.message);
    }

    return NextResponse.json({ success: true, message: "Payment processed and license sent" });

  } catch (err: any) {
    console.error("Webhook Error:", err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}