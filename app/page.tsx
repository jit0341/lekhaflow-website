"use client";

import Contact from "@/components/contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"gold" | "standard" | "lite" | "erp9_premium" | "erp9_standard">("gold");
  const [quotationData, setQuotationData] = useState<any | null>(null);
  
  // Modal & Navigation Dropdown States
  const [showIntakeModal, setShowIntakeModal] = useState<boolean>(false);
  const [intakeTarget, setIntakeTarget] = useState<"demo" | "quotation">("demo");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  
  // Client Profile Intake State
  const [clientForm, setClientForm] = useState({
    clientName: "",
    companyName: "",
    mobileNumber: "",
    clientEmail: ""
  });

  useEffect(() => {
    document.title = "LekhaFlow | Premium Tally & BUSY Accounting Automation Platform";
  }, []);

  // 🚀 Absolute WhatsApp Business Endpoint Route Target
  const WHATSAPP_LINK = "https://wa.me/918770808695";

  // 🚀 DROPBOX DIRECT DOWNLOAD STORAGE ROUTER (dl=1 Forced)
  const downloadRoutes = {
    gold: "https://www.dropbox.com/scl/fi/tyv7sepqejvkvfn7mjvzq/Lekhaflow_Gold_setup.rar?rlkey=w0cows2xjd6ln0xq8gdkx7p13&st=xgrsgy1d&dl=1",
    standard: "https://www.dropbox.com/scl/fi/8pqk5mvruopj1wzhmfi0d/Lekhaflow_Standard_setup.rar?rlkey=9vdr69llvgodt4022vsx38e88&st=ts7yxvi2&dl=1",
    lite: "https://www.dropbox.com/scl/fi/i49mnsm6z2x97n3vivvs7/LekhaFlow_LITE_setup.rar?rlkey=o3gnsq6mhfmf68xc95ni1s1rn&st=3kwqqh5z&dl=1",
    erp9_premium: "https://www.dropbox.com/scl/fi/3uby3jvlhd2gcqjwkbpo2/Lekhaflow_ERP9_Premium_setup.rar?rlkey=39i3f5mwt146tzitow7klnyna&st=z4nw4nbm&dl=1",
    erp9_standard: "https://www.dropbox.com/scl/fi/kmd3tbus1feicyt9zr5lb/LekhaFlow_ERP9_Standard_setup.rar?rlkey=79r07zew1hjftwqogwptp9drr&st=tdyb0j07&dl=1"
  };

  const productData = {
    gold: {
      id: "gold",
      title: "LekhaFlow Gold Suite",
      tagline: isHindi ? "सबसे उन्नत स्वचालन सुइट (Tally Prime एडवांस एडिशन)" : "Most Advanced Automation Suite (Tally Prime Advance Edition)",
      price: "₹ 18,000 / Year",
      limit: "10,000 Invoices / Year", 
      compatibility: "Tally Prime Environment",
      razorpayUrl: "https://pages.razorpay.com/pl_SsiWsxVHOSCM9D/view",
      features: [
        "Random splitting of sales invoice amounts strictly below ₹50,000 safety threshold automatically",
        "Random distribution of items per bill (dynamically assigns 1 to 4 item rows to completely eliminate manual footprint)",
        "Proportional balanced asset allocation across transaction values and inventory lines safely",
        "Dedicated Monthly / Quarterly split management configurations accessible right from the main UI pipeline",
        "Advanced tamper prevention technology with cryptographic machine-lock license node security framework",
        "Complimentary inclusion of Unlimited Tally & BUSY Bank Statement auto-entry utility handler modules"
      ]
    },
    standard: {
      id: "standard",
      title: "LekhaFlow Standard Sync",
      tagline: isHindi ? "टैली प्राइम ऑटो वाउचर एंट्री और कोर लेज़र सिंक फ्रेमवर्क" : "Core Ledger Sync & Tally Prime Auto Voucher Entry Framework",
      price: "₹ 15,000 / Year",
      limit: "10,000 Invoices / Year",
      compatibility: "Tally Prime Environment",
      razorpayUrl: "https://pages.razorpay.com/pl_SshDcz10pz7Leq/view",
      features: [
        "Direct automated entry handler for Sales and Purchase vouchers into Tally Prime runtime environment",
        "Instant background generation of required client Masters, Party Ledgers, and Stock Items instantly",
        "Automated form population logic fields: State, Country, GSTIN metadata, PAN cards, HSN codes, and GST rates",
        "Produces a highly organized structural independent Invoice Summary Excel dataset snapshot sheet instantly",
        "Advanced tracking integration layer engineered to completely eliminate missing accounting reference codes",
        "Complimentary inclusion of Unlimited Tally & BUSY Bank Statement auto-entry utility handler modules"
      ]
    },
    lite: {
      id: "lite",
      title: "LekhaFlow Lite Engine",
      tagline: isHindi ? "ट्रू कॉपी एक्सेल डेटा स्नैपशॉट और टेम्पलेट मैपर यूटिलिटी" : "Baseline Utility - True Copy Snapshot & Excel Template Mapper",
      price: "₹ 10,000 / Year",
      limit: "10,000 Invoices / Year", 
      compatibility: "Excel Formatting & Mapping Engine",
      razorpayUrl: "https://pages.razorpay.com/pl_StcltseyG0RpGD/view",
      features: [
        "Generates a flawless 100% True Copy structural Excel data snapshot from raw target client documents",
        "Universal Template Mapper capability for immediate auto-fill data injections into custom client formats",
        "Dynamic automated compilation sequence tracking operational Invoice Summary metrics data sheet safely",
        "Produces exactly 3 specialized standalone output Excel format formats sheets per transaction batch loop",
        "Built-in multi-page isolated PDF parser pipeline framework routing automation system components seamlessly",
        "Complimentary inclusion of Unlimited Tally & BUSY Bank Statement auto-entry utility handler modules"
      ]
    },
    erp9_premium: {
      id: "erp9_premium",
      title: "Tally ERP9 Premium Edition",
      tagline: isHindi ? "लेगेसी इन्फ्रास्ट्रक्चर के लिए समर्पित प्रीमियम ऑटो एंट्री इंजेक्शन" : "Premium Auto Entry Injection Dedicated for Legacy Architectures",
      price: "₹ 18,000 / Year",
      limit: "10,000 Invoices / Year", 
      compatibility: "Tally ERP9 Infrastructure Only",
      razorpayUrl: "https://pages.razorpay.com/pl_Ssih9ZXhEh6I0z/view",
      features: [
        "Equipped with same robust computational split capabilities as the Tally Prime Premium version pipeline",
        "Exclusively optimized for seamless native script parsing injections within Tally ERP9 desktop process contexts",
        "Standalone legacy system adapter environment block separate from standard Prime codebase framework lines",
        "Sales transaction amount processing logic configured safely underneath standard ₹50,000 security tags",
        "Encrypted local data serialization framework bypass handlers enabled for reliable background injections",
        "Complimentary inclusion of Unlimited Tally & BUSY Bank Statement auto-entry utility handler modules"
      ]
    },
    erp9_standard: {
      id: "erp9_standard",
      title: "Tally ERP9 Standard Edition",
      tagline: isHindi ? "टैली ERP9 इकोसिस्टम के लिए डायरेक्ट वाउचर जनरेशन मैट्रिक्स" : "Direct Voucher Generation Matrix for Tally ERP9 Ecosystems",
      price: "₹ 15,000 / Year",
      limit: "10,000 Invoices / Year",
      compatibility: "Tally ERP9 Infrastructure Only",
      razorpayUrl: "https://pages.razorpay.com/pl_SsiZhwlw7ppv7j/view",
      features: [
        "Mirror feature performance parity parameters matching standard Tally Prime auto-entry models seamlessly",
        "High fidelity integration pipeline tracking targeting native ERP9 desktop process context scopes flawlessly",
        "Automated background creation pathways configured for Ledgers, Stock entities, and metadata tax arrays",
        "Instant validation compilation of corresponding standalone Invoice Summary documentation data sheets",
        "Sleek low footprint computing script running locally with zero latency or network communication delays",
        "Complimentary inclusion of Unlimited Tally & BUSY Bank Statement auto-entry utility handler modules"
      ]
    }
  };

  const content = {
    en: {
      navLinks: { howItWorks: "How It Works", modules: "Software Variants", pricing: "Pricing Matrix", contact: "Book Consultation" },
      heroBadge: "⚡ AI-Powered Tally & BUSY Automation Suite for Tax Professionals",
      heroTitle: "Automate Tally Entries from PDF & Excel in Minutes",
      heroDesc: "Stop entering invoices manually. LekhaFlow automatically converts purchase/sales PDFs, raw bank statements, and complex client Excel files into clean, ready-to-import Tally vouchers with 100% accuracy.",
      trialBtn: "🚀 Start 7-Days Free Trial",
      videoBtn: "🎬 Watch Product Video",
      secTitle: "Select Your Target Accounting Software Variant",
      secDesc: "Choose your environment setup below to analyze the specialized functional execution logic and capabilities.",
      activeText: "Selected Profile",
      featureTitle: "Included Production Automation Features:",
      unlimitedBank: "UNLIMITED Bank Statement Auto-Entry Utilities Included Natively (Tally/Busy Ready)",
      quoteBtn: "📄 Generate Quotation Letterhead",
      buyBtn: "💳 Buy Now / Pay with Razorpay",
      gridTitle: "Compare Premium Deployment Matrix",
      gridDesc: "Granular breakdown of subscription rates, licensing parameters, and yearly invoice capacity bounds.",
      mostAdvanced: "Premium Advance",
      gridQuote: "Get Quote",
      gridBuy: "Buy Now",
      guideTitle: "⚙️ LekhaFlow Automation Suite - User Setup Guide",
      guideDesc: "Thank you for choosing LekhaFlow. Please execute these steps carefully to activate the software loop on your local computer:",
      steps: [
        "Step 1: Software Installation & Folder Structure\n• When you install and run the software for the first time, it will automatically create a root folder named 'LekhaFlow data' on your system.\n• Folder Location Priority:\n  - If your PC has D: Drive -> D:\\LekhaFlow data\n  - If D: Drive is missing -> C:\\Users\\<Username>\\Documents\\LekhaFlow data",
        "Step 2: License File Activation (Mandatory)\n• Copy the automatically downloaded 'license.dat' file from your web browser.\n• Directly paste/save this file inside the newly created 'LekhaFlow data' folder.\n  [Note: The file name must be exactly 'license.dat'. No other name will be detected by the system]",
        "Step 3: Invoice Processing (Processing Engine)\n• Run the desktop core application and process your raw client invoices.\n• Upon completion, a new 'output' directory will appear inside your core 'LekhaFlow data' folder containing:\n  - 'invoice_summary.xlsx' (Independent formatted master dataset summary report)\n  - 'batch_folder' (Contains two main files: master.xml and transaction.xml)",
        "Step 4: Importing Data Directly into Tally Prime\n• Open your Tally Prime environment and select the targeted working client company.\n• Go to Import Menu -> Select 'Masters'. Map the path to 'output/batch_folder/master.xml' to instantly create Ledgers, States, GSTIN, and Stock Items with HSN/GST configurations.\n• Go back to Import Menu -> Select 'Transactions'. Route the path to 'output/batch_folder/transaction.xml' to instantly inject entries."
      ],
      contactTitle: "Submit Your Custom Workflow Specifications",
      contactDesc: "Need a custom template mapper or bespoke ERP routing logic? Complete the secure inbound form below. Our engineering desk will contact you promptly.",
      systemMandate: "All production bundles enforce local runtime cryptographic Machine Hardware ID locks to secure accounting files.",
      footerCredits: "Engineered & Architected by Jitendra Bharti | Developed in India"
    },
    hi: {
      navLinks: { howItWorks: "यह कैसे काम करता है", modules: "सॉफ़्टवेयर वेरिएंट", pricing: "प्राइसिंग ग्रिड", contact: "लाइव डेमो बुक करें" },
      heroBadge: "⚡ CAs, अकाउंटेंट्स और टैक्स प्रोफेशनल्स के लिए नंबर #1 एआई स्वचालन सुइट",
      heroTitle: "PDF और Excel इनवॉइस से सीधे Tally में एंट्री करें, मिनटों में!",
      heroDesc: "घंटों की थका देने वाली मैन्युअल डेटा एंट्री को कहें अलविदा। लेखाफ्लो आपके सेल्स/परचेज बिल, पीडीएफ इनवॉइस, और कच्चे बैंक स्टेटमेंट्स को बिना किसी मानवीय गलती के शत-प्रतिशत सटीकता के साथ सीधे टैली में इम्पोर्ट करने योग्य वाउचर में बदल देता है।",
      trialBtn: "🚀 7-दिनों का फ्री ट्रायल शुरू करें",
      videoBtn: "🎬 लाइव प्रोडक्ट वीडियो देखें",
      secTitle: "अपने एकाउंटिंग सॉफ्टवेयर वेरिएंट का चयन करें",
      secDesc: "नीचे दिए गए टैब से अपने वर्किंग एनवायरनमेंट को चुनें और उसकी परिचालन क्षमता और एआई लॉजिक की जांच करें।",
      activeText: "सक्रिय वेरिएंट",
      featureTitle: "सॉफ़्टवेयर फीचर्स और ऑटोमेशन प्रोटोकॉल:",
      unlimitedBank: "असीमित बैंक स्टेटमेंट ऑटोमैटिक एंट्री मॉड्यूल (Tally/Busy) - पूरी तरह मुफ्त शामिल",
      quoteBtn: "📄 ऑफिशियल कोटेशन लेटरहेड जनरेट करें",
      buyBtn: "💳 अभी खरीदें / रेज़रपे सुरक्षित भुगतान",
      gridTitle: "उत्पाद परिनियोजन मैट्रिक्स ग्रिड",
      gridDesc: "सारे वेरिएंट्स की कीमतों, परिचालन सीमाओं और वार्षिक इनवॉइस क्षमता का संपूर्ण विवरण।",
      mostAdvanced: "एडवांस गोल्ड",
      gridQuote: "कोटेशन",
      gridBuy: "अभी खरीदें",
      guideTitle: "⚙️ LekhaFlow Automation Suite - User Setup Guide",
      guideDesc: "LekhaFlow को चुनने के लिए धन्यवाद। सॉफ़्टवेयर को चालू करने के लिए कृपया नीचे दिए गए स्टेप्स को ध्यान से फॉलो करें:",
      steps: [
        "चरण 1: सॉफ़्टवेयर इंस्टॉलेशन और फ़ोल्डर स्ट्रक्चर\n• जैसे ही आप सॉफ़्टवेयर इंस्टॉल करके पहली बार रन करेंगे, यह आपके सिस्टम पर ऑटोमैटिकली 'LekhaFlow data' नाम से एक रूट फ़ोल्डर बनाएगा।\n• फ़ोल्डर लोकेशन प्राथमिकता:\n  - यदि आपके कंप्यूटर में D: Drive है -> D:\\LekhaFlow data\n  - यदि D: Drive नहीं है -> C:\\Users\\<Username>\\Documents\\LekhaFlow data",
        "चरण 2: लाइसेंस फ़ाइल एक्टिवेशन (Mandatory)\n• वेबसाइट से डाउनलोड की गई 'license.dat' फ़ाइल को कॉपी करें।\n• इस फ़ाइल को ऊपर बनाए गए 'LekhaFlow data' फ़ोल्डर के अंदर सीधे पेस्ट (Save) कर दें।\n  [नोट: फ़ाइल का नाम केवल 'license.dat' ही होना चाहिए, कोई अन्य नाम सॉफ़्टवेयर डिटेक्ट नहीं करेगा]",
        "चरण 3: इनवॉइस प्रोसेसिंग (Processing Engine)\n• अपने इनवॉइस को सिस्टम में प्रोसेस करें।\n• प्रोसेसिंग पूरी होते ही 'LekhaFlow data' फ़ोल्डर के अंदर एक नया 'output' फ़ोल्डर बन जाएगा जिसमें आपको निम्न फ़ाइलें मिलेंगी:\n  - 'invoice_summary.xlsx' (सभी इनवॉइस की एक्सेल समरी रिपोर्ट)\n  - 'batch_folder' (इसके अंदर दो मुख्य फ़ाइलें होंगी: master.xml और transaction.xml)",
        "चरण 4: Tally Prime में डेटा इम्पोर्ट करने की विधि\n• अपना Tally Prime ओपन करें और संबंधित कंपनी को सेलेक्ट करें।\n• Import menu पर जाएं -> Masters को सेलेक्ट करें और 'output/batch_folder/master.xml' को इम्पोर्ट करें (इससे आपके सभी Ledgers, States, GSTIN और Stock Items HSN/GST डिटेल्स के साथ ऑटोमैटिक बन जाएंगे)।\n• इसके बाद दोबारा Import menu पर जाएं -> Transactions पर जाकर 'output/batch_folder/transaction.xml' फ़ाइल इम्पोर्ट करें।"
      ],
      restrictedBanner: "🔒 एडवांस्ड तकनीकी डेटा लॉग्स और पूर्ण क्लाउड फीचर्स को एक्टिवेट करने के लिए कृपया साइन इन करें।",
      contactTitle: "अपनी वर्कफ़्लो आवश्यकताएँ सबमिट करें",
      contactDesc: "नीचे दिए गए फ़ॉर्म को पूरा भरें। हमारी टीम आपके सिस्टम सेटअप और कस्टम टेम्पलेट मैपिंग के लिए तुरंत आपसे संपर्क करेगी।",
      systemMandate: "सभी डेस्कटॉप बंडल रनटाइम क्रिप्टोग्राफिक मशीन हार्डवेयर आईडी锁 सत्यापन अनिवार्य रूप से लागू करते हैं।",
      footerCredits: "जितेंद्र भारती द्वारा इंजीनियर और आर्किटेक्ट किया गया | भारत में विकसित"
    }
  };

  const currentContent = isHindi ? content.hi : content.en;

  const handleDropdownSelect = (variantId: "gold" | "standard" | "lite" | "erp9_premium" | "erp9_standard") => {
    setActiveTab(variantId);
    setActiveMenu(null);
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const triggerIntake = (type: "demo" | "quotation", product?: any) => {
    setIntakeTarget(type);
    if (product) setActiveTab(product.id);
    setShowIntakeModal(true);
  };

  // 🚀 HELPER FUNCTION: Utility triggers file downloads dynamically
  const triggerTxtDownload = (filename: string, text: string) => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowIntakeModal(false);

    if (intakeTarget === "demo") {
      try {
        // 1. बैकएंड एपीआई से license.dat जेनरेट और डाउनलोड करवाएं
        const response = await fetch("/api/generate-license", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientName: clientForm.clientName,
            companyName: clientForm.companyName,
            licenseType: "DEMO", 
            planType: activeTab.toUpperCase() 
          }),
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "license.dat"; 
          document.body.appendChild(a);
          a.click();
          a.remove();
        }

        // 2. ⚡ NEW IMPLEMENTATION: Download User Guides automatically in TXT formats
        const textGuides = {
          hindi: `===============================================================================\n               LekhaFlow Automation Suite - User Setup Guide\n===============================================================================\n\nLekhaFlow को चुनने के लिए धन्यवाद। यह सॉफ़्टवेयर आपके इनवॉइस (PDF/Excel) को \nपूरी तरह से Tally-Compatible फॉर्मेट में ऑटोमैटिकली कन्वर्ट कर देता है।\n\nसॉफ़्टवेयर को चालू करने के लिए कृपया नीचे दिए गए स्टेप्स को ध्यान से फॉलो करें:\n\nचरण 1: सॉफ़्टवेयर इंस्टॉलेशन और फ़ोल्डर स्ट्रक्चर\n--------------------------------------------------\n1. जैसे ही आप सॉफ़्टवेयर इंस्टॉल करके पहली बार रन करेंगे, यह आपके सिस्टम पर \n   ऑटोमैटिकली "LekhaFlow data" नाम से एक रूट फ़ोल्डर बनाएगा.\n2. फ़ोल्डर लोकेशन प्राथमिकता:\n   - यदि आपके कंप्यूटर में D: Drive है -> D:\\LekhaFlow data\n   - यदि D: Drive नहीं है -> C:\\Users\\<Username>\\Documents\\LekhaFlow data\n\nचरण 2: लाइसेंस फ़ाइल एक्टिवेशन (Mandatory)\n--------------------------------------------------\n1. वेबसाइट से डाउनलोड की गई "license.dat" फ़ाइल को कॉपी करें.\n2. इस फ़ाइल को ऊपर बनाए गए "LekhaFlow data" फ़ोल्डर के अंदर सीधे पेस्ट (Save) कर दें.\n   [नोट: फ़ाइल का नाम केवल 'license.dat' ही होना चाहिए, कोई अन्य नाम सॉफ़्टवेयर डिटेक्ट नहीं करेगा]\n\nचरण 3: इनवॉइस प्रोसेसिंग (Processing Engine)\n--------------------------------------------------\n1. अपने इनवॉइस को सिस्टम में प्रोसेस करें.\n2. प्रोसेसिंग पूरी होते ही "LekhaFlow data" फ़ोल्डर के अंदर एक नया "output" फ़ोल्डर बन जाएगा.\n3. इस output फ़ोल्डर के अंदर आपको निम्नलिखित फ़ाइलें मिलेंगी:\n   - "invoice_summary.xlsx" (सभी इनवॉइस की एक्सेल समरी रिपोर्ट)\n   - "batch_folder" (इसके अंदर दो मुख्य फ़ाइलें होंगी: master.xml और transaction.xml)\n\nचरण 4: Tally Prime में डेटा इम्पोर्ट करने की विधि\n--------------------------------------------------\n1. अपना Tally Prime ओपन करें और संबंधित कंपनी को सेलेक्ट करें.\n2. Import menu पर जाएं -> Masters को सेलेक्ट करें.\n3. फ़ाइल पाथ में "output/batch_folder/master.xml" को सेलेक्ट करके इम्पोर्ट करें. \n   (इससे आपके सभी Ledgers, States, GSTIN और Stock Items HSN/GST डिटेल्स के साथ ऑटोमैटिक बन जाएंगे).\n4. इसके बाद दोबारा Import menu पर जाएं -> Transactions को सेलेक्ट करें.\n5. इस बार "output/batch_folder/transaction.xml" फ़ाइल को सेलेक्ट करके इम्पोर्ट करें.\n\nबधाई हो! आपकी सभी एंट्रीज टैली में आ चुकी हैं। आप Daybook या Ledger Alteration में जाकर अपनी सटीक एंट्रीज और स्टॉक डिटेल्स चेक कर सकते हैं।\n\n----------------------------------------------------------------===============\nसपोर्ट या सहायता के लिए वेबसाइट पर दिए गए "Connect on WhatsApp" बटन पर क्लिक करें.\nLekhaFlow Support Team | Nexoriva Systems © 2026\n===============================================================================`,
          english: `===============================================================================\n               LekhaFlow Automation Suite - User Setup Guide\n===============================================================================\n\nThank you for choosing LekhaFlow. This software automatically converts your invoices (PDF/Excel) \ninto a fully Tally-Compatible format without manual errors.\n\nPlease carefully follow the steps below to activate the system loops:\n\nStep 1: Software Installation & Folder Structure\n--------------------------------------------------\n1. As soon as you install and run the software for the first time, it will automatically \n   create a root directory named "LekhaFlow data" on your system.\n2. Directory Location Priority:\n   - If your PC has D: Drive -> D:\\LekhaFlow data\n   - If D: Drive is missing -> C:\\Users\\<Username>\\Documents\\LekhaFlow data\n\nStep 2: License File Activation (Mandatory)\n--------------------------------------------------\n1. Copy the automatically downloaded "license.dat" file from your browser setup folder.\n2. Paste/Save this file directly inside the "LekhaFlow data" folder generated above.\n   [Note: The file name must be exactly "license.dat". No other string format is detected by the application]\n\nStep 3: Invoice Parsing (Processing Engine)\n--------------------------------------------------\n1. Execute the core desktop application and process your targeted invoices.\n2. Upon successful compilation, an "output" directory will automatically appear inside "LekhaFlow data".\n3. Inside this output folder, you will find the following computational outputs:\n   - "invoice_summary.xlsx" (Formatted structured main summary dataset sheet)\n   - "batch_folder" (Contains two core files: master.xml and transaction.xml)\n\nStep 4: Data Import Methods within Tally Prime\n--------------------------------------------------\n1. Boot your Tally Prime workspace and select your targeted active accounting company.\n2. Navigate to Import Menu -> Select "Masters".\n3. Map the directory file path to "output/batch_folder/master.xml" and hit import. \n   (This will automatically construct Ledgers, State structures, GSTIN validation arrays, and Stock Items with HSN/GST metrics).\n4. Return to the Import Menu -> Select "Transactions".\n5. Route the path directly to "output/batch_folder/transaction.xml" to synchronize entries instantly.\n\nCongratulations! Your automated data stack is fully synchronized inside Tally environment loops.\n\n----------------------------------------------------------------===============\nFor instant tech desk support, click the "Connect on WhatsApp" asset node on our main landing grid.\nLekhaFlow Support Team | Nexoriva Systems © 2026\n===============================================================================`
        };

        triggerTxtDownload("How_to_use_Hindi.txt", textGuides.hindi);
        triggerTxtDownload("How_to_use_English.txt", textGuides.english);

        // 3. इसके बाद आपकी असली सॉफ़्टवेयर ज़िप फ़ाइल (ड्रॉपबॉक्स लिंक) को डाउनलोड पर लगा दें
        const dynamicDownloadUrl = downloadRoutes[activeTab] || downloadRoutes.gold;
        window.open(dynamicDownloadUrl, "_blank");

      } catch (err) {
        console.error("Download pipeline broke down:", err);
      }
    } else {
      const currentSelected = productData[activeTab];
      setQuotationData({
        refNo: `NS/2026/QUOT/${currentSelected.id.toUpperCase()}_${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        name: currentSelected.title,
        limit: currentSelected.limit,
        price: currentSelected.price,
        scope: currentSelected.tagline,
        benefits: currentSelected.features,
        clientName: clientForm.clientName,
        companyName: clientForm.companyName,
        mobileNumber: clientForm.mobileNumber,
        clientEmail: clientForm.clientEmail
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans tracking-tight text-xs selection:bg-amber-500 selection:text-slate-950 antialiased">
      
      {/* 📄 CUSTOMIZED PRINTABLE OFFICIAL QUOTATION MODAL */}
      {quotationData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border-4 border-double border-slate-400 max-w-2xl w-full p-8 rounded-xl shadow-2xl space-y-6 text-black font-sans relative my-8" id="quotation-sheet">
            <div className="text-center border-b-2 border-slate-900 pb-4">
              <h2 className="text-2xl font-black tracking-wider text-slate-950">Nexoriva Systems</h2>
              <p className="text-xs font-bold text-blue-600 tracking-wide">\"Automating Accuracy, Empowering Accountants\"</p>
              <div className="text-[10px] text-slate-900 font-bold mt-1 space-y-0.5">
                <div>Registered MSME (Udyam): <span className="font-extrabold text-black">UDYAM-CG-27-0013072</span></div>
                <div>Office: Surajpur, Chhattisgarh, India | Email: Nexoriva.systems@gmail.com | Web: lekhaflow.in</div>
              </div>
            </div>

            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-1 text-xs">
              <div className="font-black text-blue-800 uppercase tracking-wider text-[9px]">Prepared Exclusively For:</div>
              <div className="font-black text-slate-950 text-sm">{quotationData.clientName}</div>
              <div className="font-bold text-slate-800"><span className="font-black">M/S:</span> {quotationData.companyName}</div>
              <div className="text-slate-600 font-medium">Contact: {quotationData.mobileNumber} | Email: {quotationData.clientEmail}</div>
            </div>

            <div className="flex justify-between font-mono text-[10px] text-black bg-slate-100 p-2.5 rounded-lg border border-slate-300">
              <div><span className="font-black text-black">Ref No:</span> {quotationData.refNo}</div>
              <div><span className="font-black text-black">Date:</span> {quotationData.date}</div>
            </div>

            <div className="overflow-x-auto border border-slate-300 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-200 border-b border-slate-300 text-slate-950 font-black">
                    <th className="p-3">Specification Target</th>
                    <th className="p-3">Deployment Parameters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300 font-bold text-black">
                  <tr>
                    <td className="p-3 text-black font-black bg-slate-50">Software Module Target</td>
                    <td className="p-3 text-blue-600 font-extrabold">{quotationData.name}</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-black font-black bg-slate-50">Processing Bounds</td>
                    <td className="p-3 text-black">{quotationData.limit}</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="p-3 text-black font-black">Subscription Rate Framework</td>
                    <td className="p-3 text-sm font-extrabold text-blue-700">{quotationData.price}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-2">
              <ul className="space-y-1.5 text-[11px] text-black pl-0 list-none font-bold">
                <li className="flex items-start gap-2 text-black">✔ <span>{currentContent.unlimitedBank}</span></li>
                {quotationData.benefits.map((b: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-black">✔ <span>{b}</span></li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-slate-100 rounded-xl border border-slate-300 space-y-1 text-[10px] font-mono text-black font-bold">
              <div className="font-black text-slate-700 uppercase tracking-wider text-[9px] mb-1">Corporate Bank Wire Parameters:</div>
              <div className="grid grid-cols-2 gap-1.5">
                <div><span className="font-black">Bank Name:</span> Bank of Baroda</div>
                <div><span className="font-black">Account Number:</span> 946110110001194</div>
                <div><span className="font-black">IFSC Code:</span> BARB0SURAJP</div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 no-print">
              <button onClick={() => window.print()} className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition text-[11px] uppercase tracking-wider shadow-md">
                🖨️ Download as PDF / Print
              </button>
              <button onClick={() => setQuotationData(null)} className="py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl transition text-[11px] uppercase tracking-wider">
                Close Layout Sheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 PREMIUM HEADER */}
      <header className="relative z-50 max-w-6xl mx-auto px-4 py-4 flex justify-between items-center border-b border-slate-800 bg-slate-950/95 sticky top-0 shadow-lg no-print">
        <div className="flex items-center space-x-6">
          <Link href="/">
            <div className="text-xl font-black text-white tracking-wider cursor-pointer">
              Lekha<span className="text-amber-500">Flow</span>
            </div>
          </Link>
          <button onClick={() => setIsHindi(!isHindi)} className="px-2 py-0.5 text-[10px] font-black rounded border border-amber-500/30 bg-amber-500/5 text-amber-400">
            🌐 {isHindi ? "English" : "हिंदी"}
          </button>
        </div>
        
        <nav className="hidden lg:flex space-x-8 text-slate-300 font-black tracking-wide text-[11px] relative">
          <div className="relative" onMouseEnter={() => setActiveMenu("products")} onMouseLeave={() => setActiveMenu(null)}>
            <button className="hover:text-amber-400 transition-colors flex items-center gap-1 font-black cursor-pointer">
              Software Variants <span className="text-[8px]">▼</span>
            </button>
            {activeMenu === "products" && (
              <div className="absolute top-full left-0 w-48 bg-slate-900 border border-slate-800 rounded-xl p-2 shadow-2xl space-y-1 mt-1">
                <button onClick={() => handleDropdownSelect("gold")} className="w-full text-left p-2 hover:bg-slate-800 rounded text-slate-300 font-bold hover:text-amber-400 cursor-pointer">LekhaFlow Gold Suite</button>
                <button onClick={() => handleDropdownSelect("standard")} className="w-full text-left p-2 hover:bg-slate-800 rounded text-slate-300 font-bold hover:text-amber-400 cursor-pointer">LekhaFlow Standard Sync</button>
                <button onClick={() => handleDropdownSelect("lite")} className="w-full text-left p-2 hover:bg-slate-800 rounded text-slate-300 font-bold hover:text-amber-400 cursor-pointer">LekhaFlow Lite Engine</button>
              </div>
            )}
          </div>

          <div className="relative" onMouseEnter={() => setActiveMenu("legacy")} onMouseLeave={() => setActiveMenu(null)}>
            <button className="hover:text-amber-400 transition-colors flex items-center gap-1 font-black cursor-pointer">
              Legacy Infrastructure <span className="text-[8px]">▼</span>
            </button>
            {activeMenu === "legacy" && (
              <div className="absolute top-full left-0 w-48 bg-slate-900 border border-slate-800 rounded-xl p-2 shadow-2xl space-y-1 mt-1">
                <button onClick={() => handleDropdownSelect("erp9_premium")} className="w-full text-left p-2 hover:bg-slate-800 rounded text-slate-300 font-bold hover:text-amber-400 cursor-pointer">Tally ERP9 Premium</button>
                <button onClick={() => handleDropdownSelect("erp9_standard")} className="w-full text-left p-2 hover:bg-slate-800 rounded text-slate-300 font-bold hover:text-amber-400 cursor-pointer">Tally ERP9 Standard</button>
              </div>
            )}
          </div>

          <Link href="/gallery">
            <span className="hover:text-amber-400 transition-colors cursor-pointer text-amber-400 flex items-center gap-1 font-black">
              🖼️ Software Dashboard Gallery
            </span>
          </Link>
        </nav>

        <div className="flex space-x-2">
          <button onClick={() => triggerIntake("demo")} className="px-3 py-2 font-black rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-lg transition text-[10px]">
            📥 Download Installer
          </button>
        </div>
      </header>

      {/* 🚀 HERO SECTION */}
      <section id="hero" className="relative z-10 max-w-6xl mx-auto px-4 pt-16 pb-24 grid lg:grid-cols-12 gap-12 items-center no-print">
        <div className="space-y-5 lg:col-span-7">
          <span className="inline-block bg-amber-500/10 text-amber-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded border border-amber-500/20">
            {currentContent.heroBadge}
          </span>
          <h1 className="text-4xl md:text-5xl font-black leading-tight text-white tracking-tight">
            {currentContent.heroTitle}
          </h1>
          <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-xl">
            {currentContent.heroDesc}
          </p>
          
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 max-w-md grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300 font-bold text-[11px]">
            <div className="flex items-center gap-2"><span className="text-emerald-500 font-black">✔</span><span>7-Day Free Trial</span></div>
            <div className="flex items-center gap-2"><span className="text-emerald-500 font-black">✔</span><span>No Card Required</span></div>
            <div className="flex items-center gap-2"><span className="text-emerald-500 font-black">✔</span><span>WhatsApp Support</span></div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button onClick={() => triggerIntake("demo")} className="px-5 py-3 rounded-xl font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-xl text-[11px] uppercase tracking-wider">
              {currentContent.trialBtn}
            </button>
            <Link href="/gallery">
              <span className="px-5 py-3 rounded-xl font-black bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 transition text-[11px] uppercase tracking-wider inline-flex items-center cursor-pointer">
                🔍 View App Screen Gallery
              </span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-slate-800 p-6 rounded-3xl shadow-2xl text-center space-y-4">
          <div className="border border-slate-800 bg-slate-950/60 p-4 rounded-2xl text-left">
            <div className="text-amber-400 font-black text-sm uppercase tracking-wide">Stop Manual Ledger Posting</div>
            <p className="text-slate-400 text-[11px] mt-1 font-sans leading-relaxed">
              LekhaFlow reads purchase, sales, and banking data with flawless accuracy and transforms them directly into native Tally runtime structures seamlessly.
            </p>
          </div>
          <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center justify-between text-left">
            <div>
              <div className="text-white font-black text-xs">Need a Live Walkthrough?</div>
              <div className="text-slate-400 text-[10px] mt-0.5">Talk directly with our product experts.</div>
            </div>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-[10px] uppercase tracking-wider inline-flex items-center">
              📞 Chat WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 📊 CORE RUNTIME MODULE MATRICES */}
      <section id="matrix" className="relative z-20 max-w-6xl mx-auto px-4 py-12 border-t border-slate-900 no-print">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">{currentContent.secTitle}</h2>
            <p className="text-slate-400 text-sm font-medium mt-1">{currentContent.secDesc}</p>
          </div>
          <span className="text-[10px] font-mono bg-amber-500/5 border border-amber-500/20 text-amber-400 uppercase font-black px-3 py-1.5 rounded-md shadow-md">
            {currentContent.activeText}: {productData[activeTab]?.title}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 p-2 bg-slate-900 rounded-2xl border border-slate-800 mb-6 shadow-2xl">
          {Object.values(productData).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`px-2 py-3 rounded-xl font-black transition-all text-center text-[10px] cursor-pointer tracking-wide ${
                activeTab === item.id 
                  ? "bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/10" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800/40"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-slate-800 p-6 md:p-8 rounded-3xl shadow-2xl relative">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-6 border-b border-slate-800 gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white tracking-wide">{productData[activeTab]?.title}</h3>
              <p className="text-amber-400 font-bold text-[12px]">{productData[activeTab]?.tagline}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 min-w-[240px] shadow-inner flex justify-between items-center">
              <div>
                <span className="text-slate-500 font-mono text-[9px] block uppercase tracking-wider font-bold">Annual Capacity</span>
                <div className="text-base font-black text-white tracking-tight mt-0.5">{productData[activeTab]?.limit}</div>
              </div>
              <div className="text-right">
                <span className="text-slate-500 font-mono text-[9px] block uppercase tracking-wider font-bold">Subscription Cost</span>
                <div className="text-base font-black text-amber-400 tracking-tight mt-0.5">{productData[activeTab]?.price}</div>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="text-slate-400 font-mono text-[9px] uppercase tracking-widest font-black">{currentContent.featureTitle}</div>
            <div className="grid sm:grid-cols-2 gap-3.5">
              {productData[activeTab]?.features.map((feature, i) => (
                <div key={i} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-slate-200 font-medium text-[12px] flex items-start gap-3.5 hover:border-amber-500/30 transition-all group">
                  <span className="text-amber-400 font-black text-sm group-hover:scale-110 transition-transform">✔</span>
                  <span className="leading-relaxed font-sans font-bold text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-end gap-3.5">
            <button onClick={() => triggerIntake("quotation", productData[activeTab])} className="px-6 py-3 rounded-xl bg-slate-950 border border-slate-700 hover:bg-slate-900 text-white font-black text-[11px] uppercase tracking-wider transition-all">
              {currentContent.quoteBtn}
            </button>
            <a 
              href={productData[activeTab]?.razorpayUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[11px] text-center uppercase tracking-wider shadow-lg shadow-amber-500/10 transition-all cursor-pointer"
            >
              {currentContent.buyBtn}
            </a>
          </div>
        </div>
      </section>

      {/* 📈 COMPARISON TRUST MATRIX */}
      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-slate-900 no-print">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl font-black text-white tracking-tight">Why Choose LekhaFlow Automation Architecture?</h2>
          <p className="text-slate-400 text-sm font-medium mt-1">Comparing manual slow data entries against our high-speed deterministic AI parsing loops.</p>
        </div>
        
        <div className="overflow-x-auto border border-slate-800 rounded-2xl shadow-2xl bg-slate-900/20">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 font-black text-white">
                <th className="p-4 text-sm">Operational Parameters</th>
                <th className="p-4 text-sm text-red-400">Manual Clerical Entries</th>
                <th className="p-4 text-sm text-amber-400 bg-amber-500/5">LekhaFlow AI Engine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-bold text-slate-300 font-sans">
              <tr>
                <td className="p-4 font-black text-white font-sans">Processing Time Bound per Invoice</td>
                <td className="p-4">~ 3 Minutes (Slow & Human Dependent)</td>
                <td className="p-4 text-amber-400 font-black bg-amber-500/5 font-sans">⏳ Under 10 Seconds (Rocket Speed)</td>
              </tr>
              <tr>
                <td className="p-4 font-black text-white font-sans">Human Error & Compliance Risk</td>
                <td className="p-4 text-red-400">Extremely High Risk Allocation</td>
                <td className="p-4 text-emerald-400 font-black bg-amber-500/5 font-sans">🔒 0% Risk (Strict Deterministic Loops)</td>
              </tr>
              <tr>
                <td className="p-4 font-black text-white font-sans">Bulk Batch Processing Capability</td>
                <td className="p-4">Impossible / Creates Server Hang Issues</td>
                <td className="p-4 text-amber-400 font-black bg-amber-500/5 font-sans">🚀 20+ Parallel Threads Execution</td>
              </tr>
              <tr>
                <td className="p-4 font-black text-white font-sans">Accounting Staff Overhead</td>
                <td className="p-4">Requires Continuous Clerical Workforce</td>
                <td className="p-4 text-emerald-400 font-black bg-amber-500/5 font-sans">📈 Over 70% Overhead Cost Reduction</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 📋 PRICING GRID DEPLOYMENT SECTION */}
      <section id="pricing" className="relative z-20 max-w-6xl mx-auto px-4 py-16 border-t border-slate-900 no-print">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl font-black text-white tracking-tight">{currentContent.gridTitle}</h2>
          <p className="text-slate-400 text-sm font-medium mt-1">{currentContent.gridDesc}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {Object.values(productData).map((p) => (
            <div key={p.id} className={`bg-gradient-to-b from-slate-900 to-slate-950 border rounded-2xl p-4 flex flex-col justify-between transition-all group ${
              activeTab === p.id ? "border-amber-500 ring-4 ring-amber-500/10 shadow-2xl" : "border-slate-800 hover:border-slate-700 shadow-lg"
            }`}>
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-1">
                  <div>
                    <h3 className="text-white font-black group-hover:text-amber-400 text-[11px] tracking-tight transition-colors">{p.title}</h3>
                    <span className="text-[9px] text-slate-500 font-mono font-bold block mt-0.5">{p.compatibility}</span>
                  </div>
                  {p.id === "gold" && (
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wide font-black shrink-0">{currentContent.mostAdvanced}</span>
                  )}
                </div>

                <div className="py-2.5 border-y border-slate-800/80 my-1">
                  <div className="text-[13px] font-black text-amber-400 tracking-tight">{p.price}</div>
                  <span className="text-slate-400 text-[9px] font-mono font-bold block mt-0.5">{p.limit}</span>
                </div>

                <ul className="space-y-2 pl-0 text-slate-300 text-[10px] list-none font-medium font-sans">
                  {p.features.slice(0, 3).map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-snug font-sans text-slate-300 font-bold">
                      <span className="text-amber-500 font-black">▪</span>
                      <span className="line-clamp-3 text-slate-300 font-sans">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2">
                <button onClick={() => triggerIntake("quotation", p)} className="py-2.5 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-800 text-white font-black text-[10px] transition-colors uppercase tracking-wider">
                  {currentContent.gridQuote}
                </button>
                <a 
                  href={p.razorpayUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[10px] text-center transition-all uppercase tracking-wider cursor-pointer"
                >
                  {currentContent.gridBuy}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ⚙️ 4-STEP MASTER SETUP CONFIGURATION GUIDE */}
      <section id="how-it-works" className="relative z-20 max-w-6xl mx-auto px-4 py-16 border-t border-slate-900 bg-slate-900/20 rounded-3xl mb-16 my-6 border-2 border-slate-800/60 no-print">
        <div className="space-y-2 mb-8">
          <h3 className="text-lg font-black text-white tracking-wide">{currentContent.guideTitle}</h3>
          <p className="text-slate-400 text-xs font-medium">{currentContent.guideDesc}</p>
        </div>
        <div className="grid md:grid-cols-1 gap-4">
          {currentContent.steps.map((step, idx) => (
            <div key={idx} className="bg-slate-950/40 border border-slate-800 p-4 rounded-xl flex items-start gap-4 shadow-sm hover:border-slate-700 transition-colors">
              <span className="bg-amber-500 text-slate-950 font-mono font-black rounded-full h-6 w-6 flex items-center justify-center text-xs shrink-0">{idx + 1}</span>
              <pre className="text-slate-300 font-bold text-[12px] leading-relaxed font-sans whitespace-pre-line">{step}</pre>
            </div>
          ))}
        </div>
      </section>

      {/* 🔒 INBOUND SPECIFICATIONS NODE */}
      <section id="contact" className="border-t border-slate-900 bg-slate-900/10 no-print">
        <div className="max-w-xl mx-auto px-4 pt-16 text-center space-y-1">
          <span className="text-amber-400 font-mono text-[9px] uppercase tracking-widest font-black block">Secure Intake Node</span>
          <h2 className="text-xl font-black text-white tracking-wide">{currentContent.contactTitle}</h2>
          <p className="text-slate-400 text-xs font-medium leading-relaxed">{currentContent.contactDesc}</p>
        </div>
        <Contact isHindi={isHindi} />
      </section>

      {/* 🛡️ REVENUE SECURE FOOTER */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900 font-mono text-[10px] text-slate-400 text-center space-y-4 no-print">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 text-left gap-8 pb-8 border-b border-slate-800 font-sans text-slate-400">
          <div>
            <h5 className="text-white font-black text-xs font-sans mb-2 tracking-wide">Corporate HQ</h5>
            <p className="text-xs leading-relaxed text-slate-400 font-medium">Surajpur, Ambikapur Region,<br />Chhattisgarh, India - 497229</p>
          </div>
          <div>
            <h5 className="text-white font-black text-xs font-sans mb-2 tracking-wide">Inquiries Hub</h5>
            <p className="text-xs leading-relaxed text-slate-400 font-medium">Email: Nexoriva.systems@gmail.com<br />Direct Phone: +91-8770808695</p>
          </div>
          <div>
            <h5 className="text-white font-black text-xs font-sans mb-2 tracking-wide">System Mandate</h5>
            <p className="text-xs leading-relaxed text-slate-400 font-medium">{currentContent.systemMandate}</p>
          </div>
        </div>
        <p className="font-black text-slate-200 font-sans text-xs tracking-wide">Nexoriva Systems © 2026</p>
        <p className="tracking-wide text-slate-500 font-sans text-xs font-medium">{currentContent.footerCredits}</p>
      </footer>

      {/* STICKY WHATSAPP */}
      <div className="fixed bottom-6 right-6 z-[90] no-print">
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl transition-all transform hover:scale-110 cursor-pointer">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.66.986 3.292 1.493 4.913 1.494 5.429 0 9.849-4.42 9.852-9.855.002-2.633-1.02-5.107-2.882-6.97C16.66 1.86 14.19 .836 11.565.836c-5.43 0-9.852 4.42-9.855 9.856-.001 1.693.473 3.344 1.372 4.815L2.01 19.981l4.637-1.227z" />
          </svg>
        </a>
      </div>

    </div>
  );
}