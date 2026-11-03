import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

export const runtime = "nodejs";

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

/**
 * Developer-only email delivery smoke test.
 * - Disabled unless DEVELOPER_TEST_MODE=true.
 * - Requires a separate high-entropy DEVELOPER_TEST_SECRET.
 * - Always sends to EMAIL_USER; caller cannot choose a recipient.
 * - Attachment is deliberately unsigned and cannot activate the desktop app.
 * - Does not call Razorpay or write to the production licensing sheet.
 */
export async function POST(req: NextRequest) {
  try {
    if (process.env.DEVELOPER_TEST_MODE !== "true") {
      return NextResponse.json(
        { success: false, error: "Developer test mode is disabled." },
        { status: 404 }
      );
    }

    const expectedSecret = process.env.DEVELOPER_TEST_SECRET || "";
    const suppliedSecret = req.headers.get("x-developer-test-secret") || "";

    if (expectedSecret.length < 32 || !suppliedSecret || !safeEqual(suppliedSecret, expectedSecret)) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const emailUser = process.env.EMAIL_USER || "";
    const emailPass = process.env.EMAIL_PASS || "";

    if (!emailUser || !emailPass) {
      return NextResponse.json(
        { success: false, error: "EMAIL_USER or EMAIL_PASS is not configured." },
        { status: 503 }
      );
    }

    // Ignore all caller-supplied fields. This endpoint can only mail the
    // configured sender's own inbox, never a customer-supplied address.
    const testLicense = {
      client_name: "LekhaFlow Developer Test",
      valid_till: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      invoice_limit: 10000,
      used: 0,
      plan: "TEST_ONLY",
      machine_id: "",
      version: "3.0",
      test_only: true,
      signature: "INVALID-TEST-ONLY-NOT-FOR-ACTIVATION",
    };

    const licenseContent = JSON.stringify(testLicense, null, 2);
    const filename = "LekhaFlow_DEVELOPER_TEST_ONLY.dat";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: emailUser, pass: emailPass },
    });

    await transporter.sendMail({
      from: `"LekhaFlow Developer Test" <${emailUser}>`,
      to: emailUser,
      subject: "[TEST ONLY] LekhaFlow license email delivery check",
      text: [
        "This is a developer-mode email delivery test.",
        "The attached .dat file is deliberately unsigned and cannot activate LekhaFlow.",
        "No Razorpay payment was created or verified.",
        "No customer record or production licensing-sheet row was created.",
      ].join("\n\n"),
      attachments: [
        {
          filename,
          content: licenseContent,
          contentType: "text/plain",
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Developer test email sent to the configured EMAIL_USER inbox.",
      recipient: emailUser,
      filename,
      testOnly: true,
      productionLicense: false,
    });
  } catch (error) {
    console.error("Developer test email failed:", error);
    return NextResponse.json(
      { success: false, error: "Developer test email could not be sent. Check server logs and Gmail configuration." },
      { status: 500 }
    );
  }
}
