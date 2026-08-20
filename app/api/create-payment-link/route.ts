import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// 1. Razorpay instance initialize karein
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { amount, clientName, clientEmail, clientMobile } = await req.json();

    // 2. Razorpay Payment Link create karein
    const paymentLink = await razorpay.paymentLink.create({
      amount: amount * 100, // Razorpay amount hamesha 'paise' (₹1 = 100 paise) mein leta hai
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
      // Payment success hone par user yahan redirect hoga
      callback_url: "https://lekhaflow.in/payment/status", 
      callback_method: "get",
    });

    // 3. Success response bhejein (short_url QR banane ke liye zaroori hai)
    return NextResponse.json({
      success: true,
      short_url: paymentLink.short_url, 
      id: paymentLink.id
    });

  } catch (error: any) {
    console.error("Razorpay Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Payment link creation failed" 
    }, { status: 500 });
  }
}