import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// 🔐 आपकी वही सुपर सीक्रेट की जो पाइथन कोड में है
const SECRET = "LekhaFlow_Super_Secret_Key_2026";

// 🚀 पाइथन वाले SHA256 डिजिटल सिग्नेचर को हूबहू जनरेट करने वाला लॉजिक
function generateSignature(data: any): string {
  const raw = `${data.client_name}${data.valid_till}${data.invoice_limit}${data.used}${data.machine_id}${SECRET}`;
  return crypto.createHash("sha256").update(raw, "utf8").digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    // 1. फ्रंटएंड फॉर्म से क्लाइंट का डेटा और मोड गेट करें
    const body = await req.json();
    const { clientName, companyName, licenseType, planType } = body;

    if (!clientName) {
      return NextResponse.json({ error: "Client name is required" }, { status: 400 });
    }

    // 2. आपके नियमानुसार डिफॉल्ट्स और वेरिएबल्स सेट करें
    let daysValid = 7;
    let invoiceLimit = 50;
    let selectedPlan = planType || "GOLD"; // GOLD, STANDARD, LITE आदि

    // यदि मोड FULL है (यह भुगतान के बाद ट्रिगर होगा)
    if (licenseType === "FULL") {
      daysValid = 365;
      invoiceLimit = 10000;
    }

    // 3. एक्सपायरी डेट कैलकुलेट करें (YYYY-MM-DD फॉर्मेट)
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + daysValid);
    const validTill = expiry.toISOString().split("T")[0];

    // 4. आपकी पाइथन फाइल के अनुसार 100% सटीक डेटा ऑब्जेक्ट
    const licenseData: any = {
      client_name: clientName,
      valid_till: validTill,
      invoice_limit: invoiceLimit,
      used: 0,
      plan: selectedPlan,
      machine_id: "", // पहली बार रन होने पर क्लाइंट की .exe खुद भरेगी
      version: "3.0",
    };

    // हैकिंग से बचाने के लिए वही सिग्नेचर लॉक लगाएं
    licenseData.signature = generateSignature(licenseData);

    // 5. डेटा को बफ़र में बदलकर सीधे 'license.dat' फ़ाइल के रूप में डाउनलोड रिस्पॉन्स भेजें
    const fileContent = JSON.stringify(licenseData, null, 2);
    const buffer = Buffer.from(fileContent, "utf-8");

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": 'attachment; filename="license.dat"',
        "Cache-Control": "no-store, max-age=0",
      },
    });

  } catch (error) {
    console.error("License generation blunder:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}