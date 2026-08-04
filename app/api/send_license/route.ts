import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER || "";
const EMAIL_PASS = process.env.EMAIL_PASS || "";
const WHATSAPP_API_KEY = process.env.WHATSAPP_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, mobile, name, plan, licenseContent, filename, expiryDate } = body;

    // Send email
    if (email && EMAIL_USER && EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
          },
        });

        const formattedDate = new Date(expiryDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        await transporter.sendMail({
          from: `"LekhaFlow" <${EMAIL_USER}>`,
          to: email,
          subject: `Your LekhaFlow ${plan.toUpperCase()} License`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #14b8a6;">LekhaFlow</h1>
              <h2>Thank you for your purchase, ${name || "Customer"}!</h2>
              <p>Your ${plan.toUpperCase()} license has been generated and is attached to this email.</p>
              <h3>License Details:</h3>
              <ul>
                <li><strong>Plan:</strong> ${plan.toUpperCase()}</li>
                <li><strong>Expiry:</strong> ${formattedDate}</li>
                <li><strong>License File:</strong> ${filename}</li>
              </ul>
              <h3>How to activate:</h3>
              <ol>
                <li>Download and install LekhaFlow from <a href="https://lekhaflow.in/downloads">lekhaflow.in/downloads</a></li>
                <li>Place the attached <strong>${filename}</strong> in the installation folder</li>
                <li>Launch LekhaFlow and start using</li>
              </ol>
              <p style="color: #64748b; font-size: 12px;">
                For support, contact us on WhatsApp: <a href="https://wa.me/918770808695">+91 87708 08695</a>
              </p>
              <p style="color: #94a3b8; font-size: 12px;">© 2026 LekhaFlow. All rights reserved.</p>
            </div>
          `,
          attachments: [
            {
              filename: filename,
              content: licenseContent,
              contentType: "text/plain",
            },
          ],
        });

        console.log(`License email sent to ${email}`);
      } catch (err) {
        console.error("Email send failed:", err);
      }
    }

    // Send WhatsApp
    if (mobile && WHATSAPP_API_KEY) {
      try {
        // Using WhatsApp Business API or Twilio
        const whatsappUrl = "https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages";
        
        await fetch(whatsappUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${WHATSAPP_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: mobile.startsWith("+") ? mobile : `+${mobile}`,
            type: "text",
            text: {
              body: `🎉 Thank you for purchasing LekhaFlow ${plan.toUpperCase()}!

Your license file has been sent to your email. 

📥 Download: https://lekhaflow.in/downloads
💬 Support: wa.me/918770808695

License expires: ${new Date(expiryDate).toLocaleDateString()}`,
            },
          }),
        });

        console.log(`WhatsApp message sent to ${mobile}`);
      } catch (err) {
        console.error("WhatsApp send failed:", err);
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Send license error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send license" },
      { status: 500 }
    );
  }
}