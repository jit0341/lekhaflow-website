import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";
const LICENSE_SECRET = process.env.LICENSE_SECRET || "";
const STANDARD_INVOICE_LIMIT = 10000;
const LICENSE_VERSION = "3.0";

function createCompatibleLicense(clientName: string, validDays: number) {
  const validTill = new Date();
  validTill.setDate(validTill.getDate() + validDays);
  const date = validTill.toISOString().slice(0, 10);

  // This structure and signature input order must remain compatible with
  // the desktop license_generator.py / main.py validation logic.
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const paymentId = String(body.paymentId || "");
    const orderId = String(body.orderId || "");

    if (!RAZORPAY_KEY_SECRET || !LICENSE_SECRET) {
      return NextResponse.json(
        { success: false, error: "Payment or license service is not configured." },
        { status: 503 }
      );
    }

    if (!paymentId || !orderId) {
      return NextResponse.json(
        { success: false, error: "Payment ID and order ID are required." },
        { status: 400 }
      );
    }

    const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID || ""}:${RAZORPAY_KEY_SECRET}`).toString("base64");
    const verifyResponse = await fetch(
      `https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`,
      { headers: { Authorization: `Basic ${auth}` }, cache: "no-store" }
    );

    if (!verifyResponse.ok) {
      return NextResponse.json(
        { success: false, error: "Payment could not be verified with Razorpay." },
        { status: 400 }
      );
    }

    const payment = await verifyResponse.json();
    if (
      payment.status !== "captured" ||
      payment.order_id !== orderId ||
      payment.amount !== 999900 ||
      payment.currency !== "INR"
    ) {
      return NextResponse.json(
        { success: false, error: "Captured payment details do not match the Standard order." },
        { status: 400 }
      );
    }

    const clientName = String(payment.notes?.customerName || payment.notes?.name || payment.email || "LekhaFlow Customer").trim();
    const { license, expiryDate } = createCompatibleLicense(clientName, 365);
    const licenseContent = JSON.stringify(license, null, 2);
    const safeClient = clientName.replace(/[^a-z0-9_-]/gi, "_").replace(/^\.+|\.+$/g, "") || "client";
    const filename = `license_${safeClient}.dat`;

    // Save the issued license record if the configured Google Apps Script is available.
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (googleScriptUrl) {
      try {
        const saveResponse = await fetch(googleScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "SAVE_LICENSE",
            paymentId,
            orderId,
            licenseContent,
            expiryDate,
            timestamp: new Date().toISOString(),
          }),
        });
        if (!saveResponse.ok) console.error("License record save failed:", saveResponse.status);
      } catch (error) {
        console.error("License record save failed:", error);
      }
    }

    // Delivery is server-to-server and authenticated. The license is still
    // returned to the verified customer for immediate download.
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.lekhaflow.in";
    const deliveryResponse = await fetch(`${baseUrl}/api/send_license`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-license-delivery-secret": LICENSE_SECRET,
      },
      body: JSON.stringify({
        email: payment.email || payment.notes?.email || "",
        mobile: payment.contact || payment.notes?.mobile || "",
        name: clientName,
        plan: "PRO",
        licenseContent,
        filename,
        expiryDate,
      }),
    });

    const delivery = await deliveryResponse.json().catch(() => ({}));
    if (!deliveryResponse.ok) {
      console.error("License delivery endpoint returned:", deliveryResponse.status);
    }

    return NextResponse.json({
      success: true,
      licenseContent,
      filename,
      plan: "PRO",
      expiryDate,
      delivery: {
        emailSent: Boolean(delivery.emailSent),
        whatsappSent: Boolean(delivery.whatsappSent),
      },
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during payment verification." },
      { status: 500 }
    );
  }
}
