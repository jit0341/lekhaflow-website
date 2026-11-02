import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";
const LICENSE_SECRET = process.env.LICENSE_SECRET || "";
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "";
const STANDARD_AMOUNT_PAISE = 999900;
const STANDARD_INVOICE_LIMIT = 10000;
const LICENSE_VERSION = "3.0";

function createCompatibleLicense(clientName: string) {
  const validTill = new Date();
  validTill.setDate(validTill.getDate() + 365);
  const date = validTill.toISOString().slice(0, 10);

  // Keep this structure and signature compatible with the desktop app.
  const license: Record<string, string | number> = {
    client_name: clientName,
    valid_till: date,
    invoice_limit: STANDARD_INVOICE_LIMIT,
    used: 0,
    plan: "PRO",
    machine_id: "",
    version: LICENSE_VERSION,
  };

  const raw =
    String(license.client_name) +
    String(license.valid_till) +
    String(license.invoice_limit) +
    String(license.used) +
    String(license.machine_id) +
    LICENSE_SECRET;

  license.signature = crypto.createHash("sha256").update(raw).digest("hex");
  return { license, expiryDate: validTill.toISOString() };
}

async function callLicensingSheet(payload: Record<string, unknown>) {
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.success) {
    throw new Error(result?.error || result?.message || "Licensing sheet could not save the payment.");
  }
  return result;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const paymentId = String(body.paymentId || "").trim();
    const orderId = String(body.orderId || "").trim();

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET || !LICENSE_SECRET || !GOOGLE_SCRIPT_URL) {
      return NextResponse.json(
        { success: false, error: "Payment, license, or licensing-sheet service is not configured." },
        { status: 503 }
      );
    }

    if (!paymentId || !orderId) {
      return NextResponse.json(
        { success: false, error: "Payment ID and order ID are required." },
        { status: 400 }
      );
    }

    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");
    const headers = { Authorization: `Basic ${auth}` };

    const [paymentResponse, orderResponse] = await Promise.all([
      fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`, {
        headers, cache: "no-store",
      }),
      fetch(`https://api.razorpay.com/v1/orders/${encodeURIComponent(orderId)}`, {
        headers, cache: "no-store",
      }),
    ]);

    if (!paymentResponse.ok || !orderResponse.ok) {
      return NextResponse.json(
        { success: false, error: "Payment or order could not be verified with Razorpay." },
        { status: 400 }
      );
    }

    const [payment, order] = await Promise.all([
      paymentResponse.json(),
      orderResponse.json(),
    ]);

    if (
      payment.status !== "captured" ||
      payment.order_id !== orderId ||
      payment.amount !== STANDARD_AMOUNT_PAISE ||
      payment.currency !== "INR" ||
      order.id !== orderId ||
      order.amount !== STANDARD_AMOUNT_PAISE ||
      order.currency !== "INR"
    ) {
      return NextResponse.json(
        { success: false, error: "Captured payment details do not match the LekhaFlow Standard order." },
        { status: 400 }
      );
    }

    const notes = order.notes || payment.notes || {};
    const clientName = String(notes.customerName || notes.name || payment.email || "LekhaFlow Customer").trim();
    const email = String(payment.email || notes.email || "").trim();
    const mobile = String(payment.contact || notes.mobile || "").replace(/\D/g, "");
    const company = String(notes.company || "").trim();

    const { license, expiryDate } = createCompatibleLicense(clientName);
    const generatedContent = JSON.stringify(license, null, 2);
    const safeClient = clientName.replace(/[^a-z0-9_-]/gi, "_").replace(/^\.+|\.+$/g, "") || "client";
    const filename = `license_${safeClient}.dat`;

    // The Apps Script uses a script lock and payment ID to save one canonical
    // license per captured Razorpay payment. Repeated browser visits reuse it.
    const saved = await callLicensingSheet({
      action: "SAVE_LICENSE",
      paymentId,
      orderId,
      customerName: clientName,
      company,
      email,
      mobile,
      plan: "STANDARD",
      amount: STANDARD_AMOUNT_PAISE / 100,
      status: "PAID",
      licenseContent: generatedContent,
      expiryDate,
      timestamp: new Date().toISOString(),
    });

    const licenseContent = String(saved.licenseContent || generatedContent);
    const alreadyIssued = Boolean(saved.alreadyIssued);
    let emailSent = Boolean(saved.emailSent);
    let whatsappSent = Boolean(saved.whatsappSent);

    // Do not send duplicate messages when the same payment status URL is
    // refreshed. A first-time issue is delivered once; delivery state is
    // recorded separately in the licensing sheet.
    if (!alreadyIssued) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.lekhaflow.in";
      const deliveryResponse = await fetch(`${baseUrl}/api/send_license`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-license-delivery-secret": LICENSE_SECRET,
        },
        body: JSON.stringify({
          email,
          mobile,
          name: clientName,
          plan: "PRO",
          licenseContent,
          filename,
          expiryDate,
        }),
        cache: "no-store",
      });

      const delivery = await deliveryResponse.json().catch(() => ({}));
      emailSent = Boolean(delivery.emailSent);
      whatsappSent = Boolean(delivery.whatsappSent);

      await callLicensingSheet({
        action: "MARK_LICENSE_SENT",
        paymentId,
        emailSent,
        whatsappSent,
        deliveryStatus: emailSent || whatsappSent ? "SENT" : "PENDING",
        remarks: Array.isArray(delivery.errors) ? delivery.errors.join(" ") : "",
      });
    }

    return NextResponse.json({
      success: true,
      licenseContent,
      filename: String(saved.filename || filename),
      plan: "PRO",
      expiryDate: String(saved.expiryDate || expiryDate),
      alreadyIssued,
      delivery: { emailSent, whatsappSent },
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { success: false, error: "Payment was verified or license saved unsuccessfully. Please contact LekhaFlow support with your payment ID." },
      { status: 503 }
    );
  }
}
