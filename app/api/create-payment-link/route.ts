import { NextResponse } from "next/server";

// This legacy endpoint accepted arbitrary client-supplied payment amounts and
// used a callback flow that is not compatible with the verified checkout.
// Keep it disabled until an authenticated sales payment-link workflow exists.
export async function POST() {
  return NextResponse.json(
    { success: false, error: "Payment links are temporarily unavailable. Please use the official LekhaFlow Standard checkout." },
    { status: 410 }
  );
}
