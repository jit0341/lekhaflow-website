// app/api/generate_license/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";

// TODO: Replace this with your actual license generation logic from license_generator.py
// Paste your Python file content and I will convert it to TypeScript exactly.

function generateLicenseDat(machineId: string, plan: string, expiryDays: number): Buffer {
  // ============================================================
  // PLACEHOLDER: This is where your license_generator.py logic goes
  // ============================================================
  // Current placeholder creates a signed JSON file.
  // Replace with your actual encryption/signing algorithm.

  const licenseData = {
    machine_id: machineId,
    plan: plan,
    issued_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000).toISOString(),
    version: "15.0",
    signature: ""
  };

  // Create a simple HMAC signature (replace with your actual logic)
  const secret = process.env.LICENSE_SECRET || "lekhaflow-secret-key-2026";
  const payload = JSON.stringify(licenseData);
  licenseData.signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");

  // Return as buffer (your software may expect binary format)
  return Buffer.from(JSON.stringify(licenseData, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { machineId, plan, paymentId, email, mobile } = body;

    // Validation
    if (!machineId || !plan || !paymentId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: machineId, plan, paymentId" },
        { status: 400 }
      );
    }

    // Validate plan
    const validPlans = ["STANDARD", "GOLD", "TRIAL"];
    if (!validPlans.includes(plan.toUpperCase())) {
      return NextResponse.json(
        { success: false, message: "Invalid plan. Must be STANDARD, GOLD, or TRIAL" },
        { status: 400 }
      );
    }

    // Determine expiry based on plan
    const expiryDays = plan.toUpperCase() === "TRIAL" ? 7 : 365;

    // Generate license.dat file
    const licenseBuffer = generateLicenseDat(machineId, plan.toUpperCase(), expiryDays);

    // Save to temp location (optional - for record keeping)
    const tempDir = path.join(process.cwd(), "temp_licenses");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
    const fileName = `license_${machineId}_${Date.now()}.dat`;
    const filePath = path.join(tempDir, fileName);
    fs.writeFileSync(filePath, licenseBuffer);

    // Return license data as base64 for email attachment
    const base64License = licenseBuffer.toString("base64");

    return NextResponse.json({
      success: true,
      message: "License generated successfully",
      data: {
        paymentId,
        machineId,
        plan: plan.toUpperCase(),
        fileName: "license.dat",
        fileBase64: base64License,
        expiresInDays: expiryDays
      }
    });

  } catch (err: any) {
    console.error("License Generation Error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}