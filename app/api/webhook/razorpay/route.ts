import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();

    console.log("==================================");
    console.log("RAZORPAY WEBHOOK RECEIVED");
    console.log(body);
    console.log("==================================");

    return NextResponse.json({
      success: true,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Webhook Error" },
      { status: 500 }
    );
  }
}