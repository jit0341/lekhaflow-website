// app/api/webhook/razorpay/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!;
const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL!;

// Signature Verification Function
function verifySignature(body: string, signature: string) {
    const expected = crypto
        .createHmac("sha256", WEBHOOK_SECRET)
        .update(body)
        .digest("hex");
    return expected === signature;
}

export async function POST(req: NextRequest) {
    try {
        // Check Environment Variables
        if (!WEBHOOK_SECRET || !SCRIPT_URL) {
            console.error("Missing Env Variables");
            return NextResponse.json({ success: false, message: "Server Configuration Error" }, { status: 500 });
        }

        const body = await req.text();
        const signature = req.headers.get("x-razorpay-signature") || "";

        // Verify Signature
        if (!verifySignature(body, signature)) {
            return NextResponse.json({ success: false, message: "Invalid Signature" }, { status: 401 });
        }

        const event = JSON.parse(body);
        if (event.event !== "payment.captured") {
            return NextResponse.json({ success: true, message: "Ignored" });
        }

        const payment = event.payload.payment.entity;

        // Get Details from Razorpay Notes
        const plan = payment.notes?.plan || "STANDARD";
        const customerName = payment.notes?.customerName || "Valued Client";

        // Forward to Google Apps Script
        const gsResponse = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "SAVE_PAYMENT",
                paymentId: payment.id,
                orderId: payment.order_id || "",
                customerName: customerName,
                email: payment.email,
                mobile: payment.contact,
                plan: plan.toUpperCase(),
                amount: payment.amount / 100
            })
        });

        return NextResponse.json({ success: true, message: "Webhook Processed" });

    } catch (err: any) {
        console.error("Webhook Error:", err.message);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}