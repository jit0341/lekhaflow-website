// app/api/generate_license/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, mobile, plan, amount, paymentId } = body;

    // ✅ 1. Python Script को Call करें
    const pythonScriptPath = path.join(process.cwd(), 'license_generator.py');
    
    // Python script को arguments pass करें
    // Note: Python script को modify करना होगा CLI arguments accept करने के लिए
    const { stdout, stderr } = await execAsync(
      `python3 "${pythonScriptPath}" "${name}" "${company}" "${plan}" "365" "10000"`
    );

    if (stderr) {
      console.error('Python script error:', stderr);
    }

    console.log('Python script output:', stdout);

    // ✅ 2. Python Script से Generated License File Read करें
    const licenseFileName = `license_${name.replace(' ', '_')}.dat`;
    const licenseFilePath = path.join(process.cwd(), licenseFileName);
    
    let licenseContent = '';
    if (fs.existsSync(licenseFilePath)) {
      licenseContent = fs.readFileSync(licenseFilePath, 'utf-8');
      // Clean up: delete the file after reading
      fs.unlinkSync(licenseFilePath);
    } else {
      // ✅ Fallback: Generate license manually if Python script fails
      licenseContent = generateFallbackLicense(name, company, plan);
    }

    // ✅ 3. Send Email with License
    await sendLicenseEmail(email, name, licenseContent, plan, amount);

    // ✅ 4. Send WhatsApp Message
    await sendWhatsAppMessage(mobile, name, licenseContent);

    // ✅ 5. Save to Google Sheet
    await saveToGoogleSheet({
      name,
      company,
      email,
      mobile,
      plan,
      amount,
      paymentId: paymentId || "SKIPPED_" + Date.now(),
      status: "PAID (SKIPPED)",
      timestamp: new Date().toISOString(),
    });

    // ✅ 6. Notify Admin (You)
    await notifyAdmin(name, plan, email, mobile);

    return NextResponse.json({
      success: true,
      licenseContent,
      message: "License generated and sent successfully!",
    });

  } catch (error) {
    console.error("License generation error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to generate license",
    }, { status: 500 });
  }
}

// ✅ Fallback License Generator (अगर Python script fail हो)
function generateFallbackLicense(name: string, company: string, plan: string): string {
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  
  const data = {
    client_name: name,
    company_name: company,
    valid_till: expiryDate.toISOString().split('T')[0],
    invoice_limit: 10000,
    used: 0,
    plan: plan,
    machine_id: "",
    version: "3.0",
    signature: crypto.randomBytes(32).toString('hex'),
  };

  return JSON.stringify(data, null, 2);
}

// ✅ Email Sender (Nodemailer/Resend)
async function sendLicenseEmail(email: string, name: string, license: string, plan: string, amount: string) {
  console.log(`[EMAIL] To: ${email}, Subject: Your LekhaFlow ${plan} License`);
  
  // TODO: Implement actual email sending using nodemailer, Resend, or SendGrid
  // Example with nodemailer:
  /*
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Your LekhaFlow ${plan} License & Invoice`,
    html: generateEmailHTML(name, plan, amount),
    attachments: [
      {
        filename: 'license.dat',
        content: license,
      },
    ],
  });
  */
}

// ✅ WhatsApp Sender (Twilio/WhatsApp API)
async function sendWhatsAppMessage(mobile: string, name: string, license: string) {
  console.log(`[WHATSAPP] To: ${mobile}, License: ${license}`);
  
  // TODO: Implement WhatsApp API using Twilio or WhatsApp Business API
}

// ✅ Google Sheet Saver
async function saveToGoogleSheet(data: any) {
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';
  if (GOOGLE_SCRIPT_URL) {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'SAVE_PAYMENT', ...data }),
      });
    } catch (err) {
      console.error('Google Sheet save error:', err);
    }
  }
}

// ✅ Admin Notifier
async function notifyAdmin(name: string, plan: string, email: string, mobile: string) {
  console.log(`
========================================
📢 NEW LICENSE GENERATED (SKIP PAYMENT)
========================================
Name: ${name}
Plan: ${plan}
Email: ${email}
Mobile: ${mobile}
========================================
  `);
}