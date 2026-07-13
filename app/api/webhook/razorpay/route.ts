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

        console.log("Webhook Verified");

        return NextResponse.json({
            success: true
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
