import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";

    if (!WEBHOOK_SECRET || !signature) {
      return NextResponse.json(
        { success: false, error: "Webhook signature verification is not configured." },
        { status: 503 }
      );
    }

    const expected = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");
    const suppliedBuffer = Buffer.from(signature, "utf8");
    const expectedBuffer = Buffer.from(expected, "utf8");

    if (
      suppliedBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(suppliedBuffer, expectedBuffer)
    ) {
      return NextResponse.json({ success: false, error: "Invalid webhook signature." }, { status: 400 });
    }

    const event = JSON.parse(rawBody);
    if (typeof event.event !== "string") {
      return NextResponse.json({ success: false, error: "Invalid webhook event." }, { status: 400 });
    }

    // Payment verification and license issuance are handled by the dedicated
    // verify_payment endpoint. Do not issue a second license from this webhook.
    console.info("[RAZORPAY WEBHOOK]", event.event);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Razorpay webhook error:", error);
    return NextResponse.json({ success: false, error: "Webhook processing failed." }, { status: 400 });
  }
}
