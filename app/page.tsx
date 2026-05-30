"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Camera, Key, Activity, DownloadCloud, Zap, Crown, 
  Building2, CheckCircle2, ChevronDown, Printer, X, MessageCircle, Info 
} from "lucide-react";
import Contact from "@/components/contact";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  // 1. STATES
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

  // 2. CONSTANTS & DATA
  const WHATSAPP_LINK = "https://wa.me/918770808695";

  // 🚀 DROPBOX DIRECT DOWNLOAD STORAGE ROUTER (dl=1 Forced)
  const downloadRoutes = {
    gold: "https://www.dropbox.com/scl/fi/tyv7sepqejvkvfn7mjvzq/Lekhaflow_Gold_setup.rar?dl=1",
    standard: "https://www.dropbox.com/scl/fi/8pqk5mvruopj1wzhmfi0d/Lekhaflow_Standard_setup.rar?dl=1",
    lite: "https://www.dropbox.com/scl/fi/i49mnsm6z2x97n3vivvs7/LekhaFlow_LITE_setup.rar?dl=1",
    erp9_premium: "https://www.dropbox.com/scl/fi/3uby3jvlhd2gcqjwkbpo2/Lekhaflow_ERP9_Premium_setup.rar?dl=1",
    erp9_standard: "https://www.dropbox.com/scl/fi/kmd3tbus1feicyt9zr5lb/LekhaFlow_ERP9_Standard_setup.rar?dl=1"
  };

  // 🚀 100% RECOVERY: ENTERPRISE PRODUCT DICTIONARY WITH DETAILED FEATURES
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

  // 🌍 100% RECOVERY: MASTER TRANSLATION DICTIONARY
  const content = {
    en: {
      heroBadge: "⚡ AI-Powered Tally & BUSY Automation Suite for Tax Professionals",
      heroTitle: "Automate Tally Entries from PDF & Excel in Minutes",
      heroDesc: "Stop entering invoices manually. LekhaFlow automatically converts purchase/sales PDFs, raw bank statements, and complex client Excel files into clean, ready-to-import Tally vouchers with 100% accuracy.",
      trialBtn: "🚀 Start 7-Days Free Trial",
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
      guideTitle: "⚙️ Secure 5-Step System Installation & Machine Locking Guide",
      guideDesc: "Please follow this sequence locally to activate your cryptographic enterprise license file.",
      steps: [
        "Step 1: Click 'Download Trial' and complete your intake details to capture your unified desktop software setup package.",
        "Step 2: Install and run the package locally on your workstation. The runtime framework captures a unique Machine Hardware ID.",
        "Step 3: Copy that Hardware ID string from your dashboard and forward it to our secure deployment desk for authorization.",
        "Step 4: Our automated vault logs the token and instantly issues a cryptographically signed secure 'license.dat' validation key.",
        "Step 5: Drop the 'license.dat' file directly into the application installation directory. The system unlocks instantly for use."
      ],
      systemMandate: "All production bundles enforce local runtime cryptographic Machine Hardware ID locks to secure accounting files.",
      footerCredits: "Engineered & Architected by Jitendra Bharti | Developed in India"
    },
    hi: {
      heroBadge: "⚡ CAs, अकाउंटेंट्स और टैक्स प्रोफेशनल्स के लिए नंबर #1 एआई स्वचालन सुइट",
      heroTitle: "PDF और Excel इनवॉइस से सीधे Tally में एंट्री करें, मिनटों में!",
      heroDesc: "घंटों की थका देने वाली मैन्युअल डेटा एंट्री को कहें अलविदा। लेखाफ्लो आपके सेल्स/परचेज बिल, पीडीएफ इनवॉइस, और कच्चे बैंक स्टेटमेंट्स को बिना किसी मानवीय गलती के शत-प्रतिशत सटीकता के साथ सीधे टैली में इम्पोर्ट करने योग्य वाउचर में बदल देता है।",
      trialBtn: "🚀 7-दिनों का फ्री ट्रायल शुरू करें",
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
      guideTitle: "⚙️ 5-चरणों का सिस्टम इंस्टॉलेशन और मशीन लॉकिंग गाइड",
      guideDesc: "अपने स्थानीय कंप्यूटर पर लेखाफ्लो को पूरी तरह सुरक्षित सक्रिय करने के लिए इन चरणों का पालन करें।",
      steps: [
        "चरण 1: 'Download Trial' पर क्लिक करके फॉर्म भरें और अपनी सेटअप फ़ाइल तुरंत डाउनलोड करें।",
        "चरण 2: पैकेज को अपने कंप्यूटर पर इंस्टॉल करें। पहली बार रन होने पर यह एक यूनीक Machine Hardware ID जनरेट करेगा।",
        "चरण 3: उस हार्डवेयर आईडी को कॉपी करें और एक्टिवेशन के लिए हमारे व्हाट्सएप डेस्क या ईमेल पर फॉरवर्ड करें।",
        "चरण 4: हमारा ऑटोमेटेड क्लाउड वॉल्ट इसे सत्यापित करेगा और सीधे आपके व्हाट्सएप/ईमेल पर 'license.dat' फ़ाइल जारी करेगा।",
        "चरण 5: 'license.dat' फ़ाइल को सॉफ्टवेयर के फोल्डर में पेस्ट करें। आपका सिस्टम तुरंत हमेशा के लिए अनलॉक हो जाएगा।"
      ],
      systemMandate: "सभी डेस्कटॉप बंडल रनटाइम क्रिप्टोग्राफिक मशीन हार्डवेयर आईडी सत्यापन अनिवार्य रूप से लागू करते हैं।",
      footerCredits: "जितेंद्र भारती द्वारा इंजीनियर और आर्किटेक्ट किया गया | भारत में विकसित"
    }
  };

  const currentContent = isHindi ? content.hi : content.en;

  // 3. LOGIC FUNCTIONS
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

  const handleDropdownSelect = (variantId: "gold" | "standard" | "lite" | "erp9_premium" | "erp9_standard") => {
    setActiveTab(variantId);
    setActiveMenu(null);
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const triggerIntake = (type: "demo" | "quotation", product?: any) => {
    setIntakeTarget(type);
    if (product) setActiveTab(product.id);
    setShowIntakeModal(true);
  };

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowIntakeModal(false);

    if (intakeTarget === "demo") {
      triggerTxtDownload("Setup_Instructions_Hindi.txt", `LekhaFlow गाइड:\n${content.hi.steps.join("\n")}`);
      triggerTxtDownload("Setup_Instructions_English.txt", `Setup Guide:\n${content.en.steps.join("\n")}`);
      window.open(downloadRoutes[activeTab] || downloadRoutes.gold, "_blank");
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
            <button onClick={() => setQuotationData(null)} className="absolute top-4 right-4 no-print text-slate-400 hover:text-black"><X/></button>
            
            <div className="text-center border-b-2 border-slate-900 pb-4">
              <h2 className="text-2xl font-black tracking-wider text-slate-950">Nexoriva Systems</h2>
              <p className="text-xs font-bold text-blue-600 tracking-wide">"Automating Accuracy, Empowering Accountants"</p>
              <div className="text-[10px] text-slate-900 font-bold mt-1 space-y-0.5">
                <div>Registered MSME (Udyam): <span className="font-extrabold text-black">UDYAM-CG-27-0013072</span></div>
                <div>Office: Surajpur, Chhattisgarh, India | Email: Nexoriva.systems@gmail.com | Web: lekhaflow.in</div>
              </div>
            </div>

            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-1 text-xs">
              <div className="font-black text-blue-800 uppercase tracking-wider text-[9px]">Prepared Exclusively For:</div>
              <div className="font-black text-slate-950 text-sm">{quotationData.clientName}</div>
              <div className="font-bold text-slate-800"><span className="font-black">M/S:</span> {quotationData.companyName}</div>
              <div className="text-slate-600 font-medium">Contact: {quotationData.mobileNumber} {quotationData.clientEmail && `| Email: ${quotationData.clientEmail}`}</div>
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
                    <th className="p-3 text-right">Investment Parameters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300 font-bold text-black">
                  <tr>
                    <td className="p-3 text-black font-black bg-slate-50">Software Module Target</td>
                    <td className="p-3 text-blue-600 font-extrabold text-right">{quotationData.name}</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-black font-black bg-slate-50">Processing Bounds</td>
                    <td className="p-3 text-black text-right">{quotationData.limit}</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="p-3 text-black font-black">Subscription Rate Framework (Annual)</td>
                    <td className="p-3 text-sm font-extrabold text-blue-700 text-right">{quotationData.price}</td>
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
                <div className="text-blue-600 uppercase">System Mandate Verified</div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 no-print">
              <button onClick={() => window.print()} className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl flex items-center justify-center gap-2 transition text-[11px] uppercase tracking-wider shadow-md">
                <Printer size={16}/> Download as PDF / Print
              </button>
              <button onClick={() => setQuotationData(null)} className="py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl transition text-[11px] uppercase tracking-wider">
                Close Layout Sheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📱 UNIQUE MOBILE DASHBOARD VIEW (🎯 ACTIVE ON MOBILE ONLY) */}
      <div className="md:hidden flex flex-col min-h-screen bg-slate-50 text-slate-900">
        <div className="bg-[#1e3a8a] p-6 text-white rounded-b-[2.5rem] shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-black tracking-tighter">LekhaFlow GO</h1>
            <button onClick={() => setIsHindi(!isHindi)} className="text-[10px] font-black border border-white/20 px-3 py-1 rounded-full bg-white/10">
              🌐 {isHindi ? "English" : "हिंदी"}
            </button>
          </div>
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold bg-white/5 w-fit px-3 py-1 rounded-full border border-teal-500/20">
            <Activity size={14}/> Cloud Sync Active
          </div>
        </div>
        
        <div className="p-4 -mt-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center active:scale-95 transition-all">
              <Camera className="text-teal-600 mb-2"/>
              <span className="font-black text-[10px] uppercase tracking-widest">Scanner</span>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center active:scale-95 transition-all">
              <Key className="text-blue-600 mb-2"/>
              <span className="font-black text-[10px] uppercase tracking-widest">Licenses</span>
            </div>
          </div>
          
          <div className="bg-[#1e3a8a] p-6 rounded-[2rem] text-white flex justify-between items-center shadow-lg">
            <div>
              <p className="text-[9px] font-black text-teal-400 uppercase tracking-widest">Desktop Engine</p>
              <h4 className="text-xs font-black">Download EXE Package</h4>
            </div>
            <button onClick={() => triggerIntake("demo")} className="bg-teal-500 text-slate-950 p-3 rounded-xl shadow-lg">
              <DownloadCloud size={20} />
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-black text-slate-500 text-[10px] uppercase">Fast Tab Switching</span>
              <span className="text-[9px] bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded font-bold uppercase">{activeTab}</span>
            </div>
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value as any)}
              className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl font-bold text-xs outline-none"
            >
              {Object.values(productData).map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
            <div className="pt-2 grid grid-cols-2 gap-2">
              <button onClick={() => triggerIntake("quotation")} className="py-2.5 bg-slate-900 text-white font-black rounded-xl text-[10px] uppercase tracking-wider text-center">
                Get Quote
              </button>
              <a href={productData[activeTab].razorpayUrl} target="_blank" rel="noopener noreferrer" className="py-2.5 bg-amber-500 text-slate-950 font-black rounded-xl text-[10px] uppercase tracking-wider text-center block">
                Buy Now
              </a>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-black text-slate-400 text-[10px] uppercase px-2 tracking-widest">Setup Instructions</h4>
            {currentContent.steps.map((s, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl text-[11px] font-bold border border-slate-100 shadow-sm flex gap-3">
                <span className="text-blue-600 font-black">{i+1}</span>
                <span className="text-slate-700">{s}</span>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <Contact isHindi={isHindi} />
          </div>
        </div>

        <footer className="py-8 text-center bg-slate-100 border-t border-slate-200 space-y-2 mt-auto">
          <p className="text-slate-500 text-[9px] font-black uppercase tracking-wider">LekhaFlow AI Systems | Surajpur, CG</p>
          <p className="text-slate-400 text-[8px] font-bold uppercase">Developed by Jitendra Bharti</p>
        </footer>
      </div>

      {/* 💻 PREMIUM DESKTOP VIEW SYSTEM (🎯 ACTIVE ON TABLET/DESKTOP ONLY) */}
      <div className="hidden md:block">
        
        {/* 🌟 STICKY HEADER MATRIX */}
        <header className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center border-b border-slate-800 bg-slate-950/95 sticky top-0 z-50 no-print">
          <div className="text-xl font-black text-white tracking-wider uppercase">
            Lekha<span className="text-amber-500">Flow</span>
          </div>
          
          <nav className="flex space-x-8 text-slate-300 font-black text-[11px] uppercase tracking-widest relative items-center">
            <Link href="#hero" className="hover:text-amber-400 transition-colors">Home</Link>
            
            <div className="relative group">
              <button className="hover:text-amber-400 flex items-center gap-1 font-black uppercase transition-colors">
                Software Variants <ChevronDown size={12}/>
              </button>
              <div className="absolute top-full -left-4 w-56 bg-slate-900 border border-slate-800 rounded-xl p-2 hidden group-hover:block shadow-2xl mt-1">
                {Object.values(productData).map((p) => (
                  <button 
                    key={p.id} 
                    onClick={() => handleDropdownSelect(p.id as any)} 
                    className="w-full text-left p-3 hover:bg-slate-800 rounded-lg text-[10px] font-black text-slate-400 hover:text-amber-400 transition-all uppercase tracking-wider border-b border-slate-800/50 last:border-0"
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>

            <Link href="#pricing" className="hover:text-amber-400 transition-colors text-amber-500 underline underline-offset-4">Pricing Matrix</Link>
            <Link href="#how-it-works" className="hover:text-amber-400 transition-colors">Setup Guide</Link>
            <Link href="/gallery" className="hover:text-amber-400 transition-colors text-teal-400 font-black">🖼️ Dashboard Gallery</Link>
            
            <button onClick={() => setIsHindi(!isHindi)} className="text-amber-500 border border-amber-500/30 px-2 py-0.5 rounded font-black text-[9px] hover:bg-amber-500/10 transition-colors">
              {isHindi ? "ENGLISH" : "हिंदी"}
            </button>
          </nav>

          <button onClick={() => triggerIntake("demo")} className="bg-amber-500 text-slate-950 px-5 py-2 rounded-lg font-black text-[10px] uppercase shadow-lg hover:bg-amber-600 transition-all transform hover:scale-105">
            Download Installer
          </button>
        </header>

        {/* 🚀 BUYER-CENTRIC HERO SECTION */}
        <section id="hero" className="max-w-6xl mx-auto px-4 py-28 flex flex-col items-center text-center no-print">
          <div className="bg-amber-500/10 text-amber-400 text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2 rounded-full border border-amber-500/20 mb-8 shadow-sm">
            {currentContent.heroBadge}
          </div>
          <h1 className="text-6xl font-black text-white leading-tight tracking-tighter max-w-4xl">
            {currentContent.heroTitle}
          </h1>
          <p className="text-slate-400 mt-8 max-w-2xl text-lg font-medium leading-relaxed italic">
            "{currentContent.heroDesc}"
          </p>
          
          <div className="mt-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 max-w-xl grid grid-cols-3 gap-4 text-slate-300 font-bold text-[11px]">
            <div className="flex items-center justify-center gap-2"><span className="text-emerald-500 font-black">✔</span><span>7-Day Free Trial</span></div>
            <div className="flex items-center justify-center gap-2"><span className="text-emerald-500 font-black">✔</span><span>No Card Required</span></div>
            <div className="flex items-center justify-center gap-2"><span className="text-emerald-500 font-black">✔</span><span>WhatsApp Support</span></div>
          </div>

          <div className="mt-12 flex gap-6">
            <button onClick={() => triggerIntake("demo")} className="bg-white text-slate-950 px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-amber-500 transition-all shadow-2xl active:scale-95 text-xs">
              {currentContent.trialBtn}
            </button>
            <Link href="/gallery" className="border-2 border-slate-800 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-slate-900 transition-all flex items-center gap-3 text-xs">
              🔍 View App Screen Gallery
            </Link>
          </div>
        </section>

        {/* 📊 CORE INTERACTIVE RUNTIME MODULE MATRICES */}
        <section id="matrix" className="max-w-6xl mx-auto px-4 py-12 border-t border-slate-900 no-print">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{currentContent.secTitle}</h2>
              <p className="text-slate-400 text-xs font-medium mt-1">{currentContent.secDesc}</p>
            </div>
            <span className="text-[10px] font-mono bg-amber-500/5 border border-amber-500/20 text-amber-400 uppercase font-black px-3 py-1.5 rounded-md">
              {currentContent.activeText}: {productData[activeTab]?.title}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 p-2 bg-slate-900 rounded-2xl border border-slate-800 mb-6">
            {Object.values(productData).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`px-2 py-3 rounded-xl font-black transition-all text-center text-[10px] tracking-wide uppercase ${
                  activeTab === item.id 
                    ? "bg-amber-500 text-slate-950 shadow-lg" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-slate-800 p-8 rounded-3xl shadow-2xl">
            <div className="flex justify-between items-center pb-6 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-wide">{productData[activeTab]?.title}</h3>
                <p className="text-amber-400 font-bold text-xs mt-1">{productData[activeTab]?.tagline}</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 min-w-[260px] flex justify-between items-center">
                <div>
                  <span className="text-slate-500 font-mono text-[9px] block uppercase tracking-wider font-bold">Annual Capacity</span>
                  <div className="text-sm font-black text-white mt-0.5">{productData[activeTab]?.limit}</div>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 font-mono text-[9px] block uppercase tracking-wider font-bold">Subscription Cost</span>
                  <div className="text-sm font-black text-amber-400 mt-0.5">{productData[activeTab]?.price}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="text-slate-400 font-mono text-[9px] uppercase tracking-widest font-black">{currentContent.featureTitle}</div>
              <div className="grid grid-cols-2 gap-4">
                {productData[activeTab]?.features.map((feature, i) => (
                  <div key={i} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-slate-200 font-medium text-xs flex items-start gap-3 hover:border-amber-500/30 transition-all">
                    <span className="text-amber-400 font-black">✔</span>
                    <span className="leading-relaxed font-bold text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end gap-4">
              <button onClick={() => triggerIntake("quotation", productData[activeTab])} className="px-6 py-3 rounded-xl bg-slate-950 border border-slate-700 hover:bg-slate-900 text-white font-black text-[10px] uppercase tracking-wider transition-all">
                {currentContent.quoteBtn}
              </button>
              <a href={productData[activeTab]?.razorpayUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-lg transition-all">
                {currentContent.buyBtn}
              </a>
            </div>
          </div>
        </section>

        {/* 📈 OPERATIONAL COMPARISON MATRIX */}
        <section className="max-w-6xl mx-auto px-4 py-16 border-t border-slate-900 no-print">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Why Choose LekhaFlow Automation Architecture?</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Comparing manual slow entries against our high-speed deterministic AI loops.</p>
          </div>
          
          <div className="overflow-x-auto border border-slate-800 rounded-2xl shadow-2xl bg-slate-900/20">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 font-black text-white">
                  <th className="p-4">Operational Parameters</th>
                  <th className="p-4 text-red-400">Manual Clerical Entries</th>
                  <th className="p-4 text-amber-400 bg-amber-500/5">LekhaFlow AI Engine</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-bold text-slate-300">
                <tr>
                  <td className="p-4 font-black text-white">Processing Time Bound per Invoice</td>
                  <td className="p-4">~ 3 Minutes (Slow & Human Dependent)</td>
                  <td className="p-4 text-amber-400 font-black bg-amber-500/5">⏳ Under 10 Seconds (Rocket Speed)</td>
                </tr>
                <tr>
                  <td className="p-4 font-black text-white">Human Error & Compliance Risk</td>
                  <td className="p-4 text-red-400">Extremely High Risk Allocation</td>
                  <td className="p-4 text-emerald-400 font-black bg-amber-500/5">🔒 0% Risk (Strict Deterministic Loops)</td>
                </tr>
                <tr>
                  <td className="p-4 font-black text-white">Bulk Batch Processing Capability</td>
                  <td className="p-4">Impossible / Creates Server Hang Issues</td>
                  <td className="p-4 text-amber-400 font-black bg-amber-500/5">🚀 20+ Parallel Threads Execution</td>
                </tr>
                <tr>
                  <td className="p-4 font-black text-white">Accounting Staff Overhead</td>
                  <td className="p-4">Requires Continuous Clerical Workforce</td>
                  <td className="p-4 text-emerald-400 font-black bg-amber-500/5">📈 Over 70% Overhead Cost Reduction</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 📋 PRICING GRID DEPLOYMENT SECTION */}
        <section id="pricing" className="max-w-7xl mx-auto px-4 py-24 border-t border-slate-900 no-print">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{currentContent.gridTitle}</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">{currentContent.gridDesc}</p>
          </div>
          
          <div className="grid grid-cols-5 gap-4">
            {Object.entries(productData).map(([key, item]) => (
              <div key={key} className={`bg-gradient-to-b from-slate-900 to-slate-950 border p-5 rounded-[2.5rem] flex flex-col justify-between transition-all group ${
                activeTab === key ? 'border-amber-500 ring-8 ring-amber-500/5 shadow-2xl scale-[1.02]' : 'border-slate-800 hover:border-slate-700 shadow-lg'
              }`}>
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-1">
                    <div>
                      <h3 className="text-white font-black group-hover:text-amber-400 text-[11px] uppercase tracking-wider transition-colors">{item.title}</h3>
                      <span className="text-[9px] text-slate-500 font-bold block mt-0.5">{item.compatibility}</span>
                    </div>
                    {item.id === "gold" && (
                      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded text-[8px] uppercase font-black shrink-0">{currentContent.mostAdvanced}</span>
                    )}
                  </div>
                  
                  <div className="py-4 border-y border-slate-800/60">
                    <p className="text-amber-500 font-black text-xl tracking-tighter">{item.price}</p>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.limit}</span>
                  </div>
                  
                  <ul className="space-y-3 text-slate-400 font-bold text-[10px] min-h-[160px] list-none pl-0">
                    {item.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 leading-tight">▪ {f}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8 space-y-2">
                  <button onClick={() => { setActiveTab(key as any); triggerIntake("quotation"); }} className="w-full py-3 bg-slate-950 border border-slate-800 rounded-xl font-black uppercase text-[9px] hover:bg-slate-900 transition-all text-white tracking-widest shadow-sm">
                    {currentContent.gridQuote}
                  </button>
                  <a href={item.razorpayUrl} target="_blank" rel="noreferrer" className="block w-full py-3.5 bg-amber-500 text-slate-950 rounded-xl font-black uppercase text-[9px] text-center tracking-widest shadow-xl hover:bg-amber-600 active:scale-95 transition-all">
                    {currentContent.gridBuy}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ⚙️ SYSTEM INSTALLATION CHRONOLOGY GUIDE */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-4 py-24 border-t border-slate-900 no-print">
          <div className="bg-slate-900/50 p-16 rounded-[4rem] border-2 border-slate-800 shadow-inner">
            <h3 className="text-3xl font-black text-white mb-12 flex items-center gap-4 uppercase tracking-tighter">
              <Info className="text-amber-500"/> {currentContent.guideTitle}
            </h3>
            <div className="grid grid-cols-2 gap-x-16 gap-y-12">
              {currentContent.steps.map((s, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <span className="bg-slate-950 border border-slate-800 text-amber-500 font-black h-10 w-10 flex items-center justify-center rounded-2xl text-lg shrink-0 shadow-lg group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">{i+1}</span>
                  <div className="space-y-1">
                    <p className="text-slate-200 font-black text-xs uppercase tracking-widest">Operational Protocol</p>
                    <p className="text-slate-400 font-bold text-sm leading-relaxed">{s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 🔒 INBOUND SPECIFICATIONS NODE */}
        <section id="contact" className="py-32 bg-slate-900/20 border-t border-slate-900 no-print">
          <div className="max-w-xl mx-auto text-center mb-16 space-y-2">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
              {isHindi ? "सम्पर्क विवरण" : "Custom Workflow Intake"}
            </h2>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Connect with our engineering desk</p>
          </div>
          <Contact isHindi={isHindi} />
        </section>

        {/* 🛡️ SYSTEM FOOTER CREDITS */}
        <footer className="py-16 border-t border-slate-900 text-center space-y-4 bg-slate-950 text-slate-400 no-print">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-3 text-left gap-8 pb-8 border-b border-slate-800 font-sans text-slate-400">
            <div>
              <h5 className="text-white font-black text-xs mb-2 tracking-wide uppercase">Corporate HQ</h5>
              <p className="text-xs leading-relaxed font-medium">Surajpur, Ambikapur Region,<br />Chhattisgarh, India - 497229</p>
            </div>
            <div>
              <h5 className="text-white font-black text-xs mb-2 tracking-wide uppercase">Inquiries Hub</h5>
              <p className="text-xs leading-relaxed font-medium">Email: Nexoriva.systems@gmail.com<br />Direct Phone: +91-8770808695</p>
            </div>
            <div>
              <h5 className="text-white font-black text-xs mb-2 tracking-wide uppercase">System Mandate</h5>
              <p className="text-xs leading-relaxed font-medium">{currentContent.systemMandate}</p>
            </div>
          </div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] pt-4">LekhaFlow AI Systems | Registered MSME | Surajpur, Chhattisgarh</p>
          <p className="text-slate-600 text-[8px] font-bold uppercase tracking-[0.2em]">{currentContent.footerCredits}</p>
        </footer>
      </div>

      {/* 📥 GLOBAL INTAKE MODAL FRAMEWORK */}
      {showIntakeModal && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
          <div className="bg-slate-900 border-2 border-amber-500 p-10 rounded-[3.5rem] max-w-md w-full relative shadow-[0_0_100px_rgba(245,158,11,0.1)] text-slate-100">
            <button onClick={() => setShowIntakeModal(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
              <X size={24}/>
            </button>
            
            <div className="text-center space-y-3 mb-10">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                {intakeTarget === "demo" ? "Authorize Setup" : "Official Quote"}
              </h3>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Enter secure credentials to proceed</p>
            </div>
            
            <form onSubmit={handleIntakeSubmit} className="space-y-4">
              <input 
                required 
                type="text"
                placeholder="YOUR FULL NAME" 
                value={clientForm.clientName}
                onChange={(e) => setClientForm({...clientForm, clientName: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs tracking-widest focus:border-amber-500 outline-none transition-all" 
              />
              <input 
                required 
                type="text"
                placeholder="COMPANY / FIRM NAME" 
                value={clientForm.companyName}
                onChange={(e) => setClientForm({...clientForm, companyName: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs tracking-widest focus:border-amber-500 outline-none transition-all" 
              />
              <input 
                required 
                type="tel"
                pattern="[0-9]{10}"
                placeholder="10-DIGIT WHATSAPP NUMBER" 
                value={clientForm.mobileNumber}
                onChange={(e) => setClientForm({...clientForm, mobileNumber: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs tracking-widest focus:border-amber-500 outline-none transition-all" 
              />
              <input 
                type="email"
                placeholder="CORPORATE EMAIL (OPTIONAL)" 
                value={clientForm.clientEmail}
                onChange={(e) => setClientForm({...clientForm, clientEmail: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs tracking-widest focus:border-amber-500 outline-none transition-all" 
              />
              
              <button type="submit" className="w-full py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black rounded-2xl uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-transform text-xs mt-2">
                {intakeTarget === "demo" ? "DOWNLOAD NOW" : "GENERATE QUOTE"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* STICKY FLOATING WHATSAPP REVENUE BUTTON */}
      <WhatsAppButton />
    </div>
  );
}