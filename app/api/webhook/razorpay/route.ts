import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!;
const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL!;
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
        if (!WEBHOOK_SECRET) {
            throw new Error("RAZORPAY_WEBHOOK_SECRET missing");
        }

        if (!SCRIPT_URL) {
            throw new Error("GOOGLE_SCRIPT_URL missing");
        }
        
        const body = await req.text();

        const signature =
            req.headers.get("x-razorpay-signature") || "";

        if (!verifySignature(body, signature)) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid Signature"
                },
                {
                    status: 401
                }
            );

        }

        const event = JSON.parse(body);
        // Ignore all other events
if (event.event !== "payment.captured") {
    return NextResponse.json({
        success: true,
        message: "Ignored"
    });
}

const payment = event.payload.payment.entity;

const gsResponse = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        action: "SAVE_PAYMENT",
        paymentId: payment.id,
        orderId: payment.order_id || "",
        customerName:
            payment.customer_details?.name || "",
        company: "",
        email:
            payment.email ||
            payment.customer_details?.email ||
            "",
        mobile:
            payment.contact ||
            payment.customer_details?.contact ||
            "",
        plan: "STANDARD",
        amount: payment.amount / 100
    })
});

let gsResult = {};

try {
    gsResult = await gsResponse.json();
} catch (e) {
    console.error("Apps Script Response Error", e);
}

console.log(gsResult);


        console.log("Webhook Verified");

        return NextResponse.json({
    success: true,
    google: gsResult
});


    }

    catch (err) {

        console.error(err);

        return NextResponse.json(
            {
                success: false
            },
            {
                status: 500
            }
        );

    }

}
