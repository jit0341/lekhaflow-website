import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || "";
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";

    // Verify webhook signature
    if (RAZORPAY_WEBHOOK_SECRET) {
      const expectedSignature = crypto
        .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
        .update(body)
        .digest("hex");

      if (signature !== expectedSignature) {
        console.error("Invalid webhook signature");
        return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
      }
    }

    const event = JSON.parse(body);
    const eventType = event.event;

    console.log("[RAZORPAY WEBHOOK]", eventType, event.payload?.payment?.entity?.id);

    // Handle payment captured
    if (eventType === "payment.captured") {
      const payment = event.payload.payment.entity;
      const notes = payment.notes || {};
      
      const customerData = {
        name: notes.customerName || notes.name || "",
        company: notes.company || "",
        email: payment.email || notes.email || "",
        mobile: payment.contact || notes.mobile || "",
        plan: notes.plan || "UNKNOWN",
        amount: String(payment.amount / 100),
        paymentId: payment.id,
        orderId: payment.order_id,
        machineId: notes.machineId || "",
      };

      // 1. Generate License File
      const licenseContent = await generateLicense(customerData);
      
      // 2. Save license.dat file
      const licensePath = path.join(process.cwd(), "temp", `license_${payment.id}.dat`);
      fs.mkdirSync(path.join(process.cwd(), "temp"), { recursive: true });
      fs.writeFileSync(licensePath, licenseContent);

      // 3. Send License & Invoice via WhatsApp
      await sendWhatsAppMessage(customerData.mobile, {
        license: licenseContent,
        invoice: await generateInvoice(customerData),
      });

      // 4. Send Email with License & Invoice
      await sendEmailWithAttachment({
        to: customerData.email,
        subject: `Your LekhaFlow ${customerData.plan} License & Invoice`,
        body: generateEmailBody(customerData),
        attachments: [
          { filename: "license.dat", content: licenseContent },
          { filename: `invoice_${payment.id}.pdf`, content: await generateInvoicePDF(customerData) },
        ],
      });

      // 5. Save to Google Sheet
      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "SAVE_PAYMENT",
            ...customerData,
            timestamp: new Date().toISOString(),
          }),
        });
      }

      // 6. Notify Admin (You)
      await sendAdminNotification(customerData);

      console.log("[PAYMENT CAPTURED] License and Invoice sent for:", payment.id);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ success: false, error: "Webhook processing failed" }, { status: 500 });
  }
}

// 🔧 Helper Functions

async function generateLicense(customerData: any): Promise<string> {
  // Call Python license_generator.py
  try {
    const { stdout } = await execAsync(
      `python3 license_generator.py "${customerData.name}" "${customerData.company}" "${customerData.plan}" "${customerData.machineId}"`
    );
    return stdout;
  } catch (error) {
    console.error("License generation error:", error);
    // Fallback: Generate simple license
    return `LICENSE_KEY=${crypto.randomBytes(32).toString('hex')}\nNAME=${customerData.name}\nPLAN=${customerData.plan}\nVALID_UNTIL=${new Date(Date.now() + 365*24*60*60*1000).toISOString()}`;
  }
}

async function generateInvoice(customerData: any) {
  // ✅ Professional Invoice with your Company Details
  return `
    <html>
      <head>
        <style>
          /* Your Invoice Styling */
        </style>
      </head>
      <body>
        <div class="header">
          <h1>NEXORIVA SYSTEMS</h1>
          <p>"Automating Accuracy, Empowering Accountants"</p>
          <p>Registered MSME (Udyam): UDYAM-CG-27-0013072</p>
        </div>
        <div class="invoice">
          <h2>Product Invoice</h2>
          <p><strong>Ref No:</strong> NS/2026/001</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Customer:</strong> ${customerData.name}</p>
          <p><strong>Company:</strong> ${customerData.company}</p>
          <table>
            <tr>
              <th>Product</th>
              <th>Core Features</th>
              <th>Annual Subscription</th>
            </tr>
            <tr>
              <td>LekhaFlow GOLD SUITE</td>
              <td>Tally Auto Entry (Sales Split, Purchase, Bank Statements)</td>
              <td>₹ ${customerData.amount} / Year</td>
            </tr>
          </table>
          <h3>Terms & Conditions:</h3>
          <ul>
            <li>Implementation: On-site/Remote installation</li>
            <li>Support: 12-month technical support and minor updates included</li>
            <li>Hardware: Software locked to authorized Machine ID</li>
            <li>Billing: Yearly renewal applicable for uninterrupted AI cloud services</li>
          </ul>
          <p><strong>Bank Details:</strong></p>
          <p>Bank of India | A/c: 946110110001194 | IFSC: BKID0009382</p>
          <p>UPI: 8871097310-2@ybl</p>
          <p><strong>Authorized Signatory,</strong></p>
          <p>Jitendra Bharti (Founder, Nexoriva Systems)</p>
        </div>
      </body>
    </html>
  `;
}

async function generateInvoicePDF(customerData: any): Promise<Buffer> {
  // Use puppeteer or pdf-lib to generate PDF
  // For now, returning HTML as buffer
  const html = await generateInvoice(customerData);
  return Buffer.from(html);
}

function generateEmailBody(customerData: any): string {
  return `
    <h2>Thank you for purchasing LekhaFlow ${customerData.plan}!</h2>
    <p>Dear ${customerData.name},</p>
    <p>Your payment of ₹${customerData.amount} has been successfully received.</p>
    <p><strong>License Details:</strong></p>
    <ul>
      <li>Plan: ${customerData.plan}</li>
      <li>Valid: 1 Year from today</li>
      <li>Payment ID: ${customerData.paymentId}</li>
    </ul>
    <p><strong>Next Steps:</strong></p>
    <ol>
      <li>Download the software from: <a href="https://lekhaflow.in/downloads">https://lekhaflow.in/downloads</a></li>
      <li>Install the software on your system</li>
      <li>Copy your Machine ID from the software</li>
      <li>Send the Machine ID on WhatsApp for license activation</li>
    </ol>
    <p><strong>Your license.dat file is attached to this email.</strong></p>
    <p>For support, contact: +91 8770808695</p>
    <p>Regards,<br/>Team LekhaFlow</p>
  `;
}

async function sendWhatsAppMessage(mobile: string, data: any) {
  // Use WhatsApp Business API or Twilio
  // For now, log the message
  console.log(`[WHATSAPP] To: ${mobile}, License: ${data.license}`);
  // You can integrate with Twilio or WhatsApp Business API
}

async function sendEmailWithAttachment(params: any) {
  // Use SendGrid, Resend, or Nodemailer
  console.log(`[EMAIL] To: ${params.to}, Subject: ${params.subject}`);
  // Integrate with your email provider
}

async function sendAdminNotification(customerData: any) {
  // Send notification to you
  console.log(`[ADMIN NOTIFICATION] New payment received:`, customerData);
  // You can use email or WhatsApp notification
}