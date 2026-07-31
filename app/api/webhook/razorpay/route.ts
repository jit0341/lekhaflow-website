import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || "";
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";

    // Verify webhook signature
    if (RAZORPAY_WEBHOOK_SECRET) {
      const expectedSignature = crypto
        .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
        .update(body)
        .digest("hex");

      if (signature !== expectedSignature) {
        console.error("Invalid webhook signature");
        return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
      }
    }

    const event = JSON.parse(body);
    const eventType = event.event;

    console.log("[RAZORPAY WEBHOOK]", eventType, event.payload?.payment?.entity?.id);

    // Handle payment captured
    if (eventType === "payment.captured") {
      const payment = event.payload.payment.entity;

      const paymentData = {
        action: "SAVE_PAYMENT",
        paymentId: payment.id,
        orderId: payment.order_id,
        customerName: payment.notes?.customerName || payment.notes?.name || "",
        company: payment.notes?.company || "",
        email: payment.email || "",
        mobile: payment.contact || "",
        plan: payment.notes?.plan || "UNKNOWN",
        amount: String(payment.amount / 100), // Razorpay sends amount in paise
        status: "PAID",
        method: payment.method,
        timestamp: new Date().toISOString(),
      };

      // Send to Google Sheet
      if (GOOGLE_SCRIPT_URL) {
        try {
          await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentData),
          });
        } catch (err) {
          console.error("Google Script save failed:", err);
        }
      }

      // TODO: Trigger email with license.dat
      // You can integrate Resend, SendGrid, or Nodemailer here
      console.log("[PAYMENT CAPTURED] License should be generated and emailed for:", payment.id);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ success: false, error: "Webhook processing failed" }, { status: 500 });
  }
}