import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
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

    const { amount, clientName, clientEmail, clientMobile } = await req.json();

    const paymentLink = await razorpay.paymentLink.create({
      amount: amount * 100,
      currency: "INR",
      description: `Payment from ${clientName} for LekhaFlow`,
      customer: {
        name: clientName,
        email: clientEmail,
        contact: clientMobile,
      },
      notify: {
        email: true,
        sms: true,
      },
      callback_url: "https://lekhaflow.in/payment/status",
      callback_method: "get",
    });

    return NextResponse.json({
      success: true,
      short_url: paymentLink.short_url,
      id: paymentLink.id,
    });
  } catch (error: any) {
    console.error("Razorpay Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Payment link creation failed",
      },
      { status: 500 }
    );
  }
}
