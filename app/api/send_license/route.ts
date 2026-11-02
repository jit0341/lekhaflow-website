import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char] || char);
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.INTERNAL_API_SECRET || "";
    const supplied = req.headers.get("x-internal-api-secret") || "";
    if (!secret || !supplied || !safeEqual(secret, supplied)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { email, name, plan, licenseContent, filename, expiryDate } = body;

    if (
      typeof licenseContent !== "string" ||
      !licenseContent.startsWith("=== LEKHAFLOW LICENSE FILE ===") ||
      typeof filename !== "string" ||
      !/^[a-zA-Z0-9_.-]+\.dat$/.test(filename) ||
      plan !== "standard" ||
      !expiryDate
    ) {
      return NextResponse.json({ success: false, error: "Invalid license delivery data." }, { status: 400 });
    }

    const emailUser = process.env.EMAIL_USER || "";
    const emailPass = process.env.EMAIL_PASS || "";
    if (!email || !emailUser || !emailPass) {
      return NextResponse.json({ success: false, emailSent: false, error: "Email delivery is not configured or customer email is missing." }, { status: 503 });
    }

    const formattedDate = new Date(expiryDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const safeName = escapeHtml(typeof name === "string" ? name : "Customer");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: emailUser, pass: emailPass },
    });

    await transporter.sendMail({
      from: `"LekhaFlow" <${emailUser}>`,
      to: email,
      subject: "Your LekhaFlow Standard License",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h1 style="color:#14b8a6">LekhaFlow</h1>
          <h2>Thank you for your purchase, ${safeName}!</h2>
          <p>Your LekhaFlow Standard license is attached.</p>
          <p><strong>Plan:</strong> Standard<br/><strong>Expiry:</strong> ${formattedDate}</p>
          <p>Download the installer from <a href="https://lekhaflow.in/downloads">LekhaFlow Download Center</a>.</p>
          <p>For activation support, contact <a href="https://wa.me/918770808695">LekhaFlow Support</a>.</p>
        </div>
      `,
      attachments: [{
        filename,
        content: licenseContent,
        contentType: "text/plain",
      }],
    });

    return NextResponse.json({ success: true, emailSent: true, whatsappSent: false });
  } catch (error) {
    console.error("Send license error:", error);
    return NextResponse.json({ success: false, error: "Failed to send license email." }, { status: 500 });
  }
}
