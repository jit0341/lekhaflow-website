import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

const EMAIL_USER = process.env.EMAIL_USER || "";
const EMAIL_PASS = process.env.EMAIL_PASS || "";
const LICENSE_SECRET = process.env.LICENSE_SECRET || "";
const WHATSAPP_API_KEY = process.env.WHATSAPP_API_KEY || "";
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || "";
const WHATSAPP_API_VERSION = process.env.WHATSAPP_API_VERSION || "v21.0";

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char] || char);
}

export async function POST(req: NextRequest) {
  try {
    if (!LICENSE_SECRET) {
      return NextResponse.json({ success: false, error: "License delivery is not configured." }, { status: 503 });
    }

    const suppliedSecret = req.headers.get("x-license-delivery-secret") || "";
    if (!suppliedSecret || !safeEqual(suppliedSecret, LICENSE_SECRET)) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const email = String(body.email || "").trim();
    const mobile = String(body.mobile || "").replace(/\D/g, "");
    const name = String(body.name || "Customer").trim();
    const plan = String(body.plan || "PRO").toUpperCase();
    const licenseContent = String(body.licenseContent || "");
    const filename = String(body.filename || "license.dat").replace(/[^a-z0-9_.-]/gi, "_");
    const expiryDate = String(body.expiryDate || "");

    if (!licenseContent || !licenseContent.startsWith("{") || !expiryDate) {
      return NextResponse.json({ success: false, error: "Invalid license payload." }, { status: 400 });
    }
    if (!email && !mobile) {
      return NextResponse.json({ success: false, error: "No customer email or mobile was supplied." }, { status: 400 });
    }

    let emailSent = false;
    let whatsappSent = false;
    const errors: string[] = [];

    if (email && EMAIL_USER && EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: EMAIL_USER, pass: EMAIL_PASS },
        });
        const formattedDate = new Date(expiryDate).toLocaleDateString("en-IN", {
          day: "2-digit", month: "short", year: "numeric",
        });
        await transporter.sendMail({
          from: `"LekhaFlow" <${EMAIL_USER}>`,
          to: email,
          subject: `Your LekhaFlow Standard License`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
              <h1 style="color:#0f766e">LekhaFlow</h1>
              <h2>Thank you for your purchase, ${escapeHtml(name)}!</h2>
              <p>Your LekhaFlow Standard license has been generated.</p>
              <p><strong>Plan:</strong> ${escapeHtml(plan)}<br/>
              <strong>Valid until:</strong> ${escapeHtml(formattedDate)}</p>
              <p>Save the attached file. Before first run, rename it to <strong>license.dat</strong> and place it where the LekhaFlow application expects its license file.</p>
              <p>Support: <a href="https://wa.me/918770808695">+91 87708 08695</a></p>
            </div>
          `,
          attachments: [{ filename, content: licenseContent, contentType: "application/json" }],
        });
        emailSent = true;
      } catch (error) {
        console.error("License email delivery failed:", error);
        errors.push("Email delivery failed.");
      }
    } else if (email) {
      errors.push("Email credentials are not configured.");
    }

    if (mobile && WHATSAPP_API_KEY && WHATSAPP_PHONE_NUMBER_ID) {
      try {
        const form = new FormData();
        form.append("messaging_product", "whatsapp");
        form.append("file", new Blob([licenseContent], { type: "application/json" }), filename);
        const mediaResponse = await fetch(
          `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/media`,
          { method: "POST", headers: { Authorization: `Bearer ${WHATSAPP_API_KEY}` }, body: form }
        );
        const mediaData = await mediaResponse.json();
        if (!mediaResponse.ok || !mediaData.id) {
          throw new Error("WhatsApp media upload failed.");
        }

        const messageResponse = await fetch(
          `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${WHATSAPP_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messaging_product: "whatsapp",
              recipient_type: "individual",
              to: mobile,
              type: "document",
              document: {
                id: mediaData.id,
                filename,
                caption: `Your LekhaFlow Standard license. Valid until ${new Date(expiryDate).toLocaleDateString("en-IN")}.`,
              },
            }),
          }
        );
        if (!messageResponse.ok) throw new Error("WhatsApp document message failed.");
        whatsappSent = true;
      } catch (error) {
        console.error("WhatsApp license delivery failed:", error);
        errors.push("WhatsApp delivery failed.");
      }
    } else if (mobile) {
      errors.push("WhatsApp credentials or phone number ID are not configured.");
    }

    return NextResponse.json({
      success: emailSent || whatsappSent,
      emailSent,
      whatsappSent,
      errors,
    }, { status: emailSent || whatsappSent ? 200 : 503 });
  } catch (error) {
    console.error("Send license error:", error);
    return NextResponse.json({ success: false, error: "Failed to send license." }, { status: 500 });
  }
}
