import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { success: false, error: "Payment service is not configured." },
        { status: 503 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const body = await req.json();
    const { plan } = body;

    // Prices are controlled on the server; never trust a client-submitted amount.
    const planPrices: Record<string, number> = {
      standard: 9999,
    };
    const amount = planPrices[plan];

    if (!amount) {
      return NextResponse.json(
        { success: false, error: "Invalid or unavailable plan" },
        { status: 400 }
      );
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { plan },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      keyId,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
