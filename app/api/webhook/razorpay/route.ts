// app/api/webhook/razorpay/route.ts
// ... (imports)

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const signature = req.headers.get("x-razorpay-signature") || "";

        if (!verifySignature(body, signature)) {
            return NextResponse.json({ success: false, message: "Invalid Signature" }, { status: 401 });
        }

        const event = JSON.parse(body);
        if (event.event !== "payment.captured") {
            return NextResponse.json({ success: true, message: "Ignored" });
        }

        const payment = event.payload.payment.entity;

        // ✅ IMPORTANT: Get plan and customer details from notes
        const plan = payment.notes?.plan || "STANDARD";
        const customerName = payment.notes?.customerName || "Valued Client";

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

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}