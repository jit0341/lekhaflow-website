import { NextResponse } from "next/server";

// License files must only be issued after a successful Razorpay payment
// has been verified by /api/verify_payment.
export async function POST() {
  return NextResponse.json(
    { success: false, error: "Direct license generation is disabled. Complete and verify payment through the official checkout." },
    { status: 410 }
  );
}
