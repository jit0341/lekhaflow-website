import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Payment verification and license delivery are handled by /api/verify_payment.
// This webhook endpoint only validates Razorpay's event signature and safely
// acknowledges events. It deliberately does not create licenses, run Python,
// write to local disk, or send duplicate customer messages from a serverless
// function.

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";

    if (!RAZORPAY_WEBHOOK_SECRET) {
      console.error("Razorpay webhook secret is not configured.");
      return NextResponse.json(
        { success: false, error: "Webhook is not configured." },
        { status: 503 }
      );
    }

    if (!signature) {
      return NextResponse.json(
        { success: false, error: "Missing webhook signature." },
        { status: 400 }
      );
    }

    const expected = crypto
      .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest();
    let supplied: Buffer;
    try {
      supplied = Buffer.from(signature, "hex");
    } catch {
      return NextResponse.json({ success: false, error: "Invalid signature." }, { status: 400 });
    }

    if (supplied.length !== expected.length || !crypto.timingSafeEqual(supplied, expected)) {
      return NextResponse.json(
        { success: false, error: "Invalid signature." },
        { status: 400 }
      );
    }

    const event = JSON.parse(rawBody) as { event?: string };
    console.info("Verified Razorpay webhook event:", event.event || "unknown");

    // No fulfilment here: the customer-facing payment verification endpoint
    // performs the single license-generation and delivery workflow.
    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error("Razorpay webhook processing error:", error);
    return NextResponse.json(
      { success: false, error: "Webhook processing failed." },
      { status: 400 }
    );
  }
}
