"use client";

import Contact from "@/components/contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState } from "react";

export default function Home() {
  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"gold" | "premium" | "standard" | "lite" | "erp9_premium" | "erp9_standard" | "busy">("gold");
  const [quotationData, setQuotationData] = useState<any | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [showTrialModal, setShowTrialModal] = useState<boolean>(false);

  // 100% Comprehensive English & Hindi Content Matrix for Accurate Localization
  const content = {
    en: {
      navLinks: { howItWorks: "How It Works", modules: "Our Modules", pricing: "Pricing Plans", contact: "Request Demo" },
      heroBadge: "Automating Accuracy, Empowering Accountants",
      heroTitle: "High Precision Invoicing Data Extractors & Automated Split Logic",
      heroDesc: "LekhaFlow converts manual, fragmented accounting workflows into high-speed digital pipelines. Powered by Gemini AI parsing architectures and deterministic splitting schemas, it safely matches invoice row variables directly into target ERP environments smoothly.",
      trialBtn: "🚀 Try 7-Days Free Trial",
      videoBtn: "🎬 Watch Product Video",
      secTitle: "7 Specialized Functional Modules",
      secDesc: "Select any product tab component to analyze specific execution logic algorithms",
      activeText: "Active Selection",
      featureTitle: "Explicit Integration Protocols List:",
      unlimitedBank: "UNLIMITED Bank Statement Automated Entry (Tally/Busy) - Included Free",
      quoteBtn: "📄 Generate Quotation Letterhead",
      buyBtn: "💳 Buy Now / Pay with Razorpay",
      gridTitle: "Full Product Deployment Grid",
      gridDesc: "Comprehensive list grid summary showcasing operating parameters bounds",
      mostAdvanced: "Most Advanced",
      gridQuote: "Quotation",
      gridBuy: "Buy Now",
      guideTitle: "⚙️ System Installation & Machine Locking Guide",
      guideDesc: "Please follow these steps sequentially to activate LekhaFlow on your local operating environment.",
      steps: [
        "Step 1: Download the unified desktop software package by clicking 'Download Trial' or via your secure client link.",
        "Step 2: Install and run the package locally. The software will generate and display a unique 'Machine Hardware ID' based on your local system specs.",
        "Step 3: Copy that Hardware ID and paste it into your LekhaFlow Client Dashboard or forward it to our deployment desk.",
        "Step 4: Our automated vault will process it and issue a cryptographically signed 'license.dat' file directly to your Email/WhatsApp.",
        "Step 5: Drop the 'license.dat' file directly into the software installation directory. The system will unlock instantly and guide your output to Excel/Tally automatically."
      ],
      restrictedBanner: "🔒 Sign In to unlock advanced technical telemetry and granular system feature structures."
    },
    hi: {
      navLinks: { howItWorks: "काम कैसे करता है", modules: "हमारे 7 सॉफ़्टवेयर वेरिएंट", pricing: "सब्स्क्रिप्शन रेट्स", contact: "संपर्क / डेमो अनुरोध" },
      heroBadge: "सटीकता का स्वचालन, लेखाकारों का सशक्तिकरण",
      heroTitle: "उच्च-सटीक इनवॉइस डेटा एक्सट्रैक्टर्स और ऑटोमैटिक स्प्लिट लॉजिक",
      heroDesc: "लेखाफ्लो आपके मैन्युअल और बिखरे हुए अकाउंटिंग बिलिंग रूटीन को हाई-स्पीड डिजिटल ऑटोमेशन लाइनों में बदल देता है। एडवांस्ड एआई पार्सिंग आर्किटेक्चर और स्प्लिटिंग स्कीमा द्वारा संचालित, यह इनवॉइस रो वेरिएबल्स को सीधे आपके एकाउंटिंग सॉफ्टवेयर में सिंक करता है।",
      trialBtn: "🚀 7-दिनों का फ्री ख्याल आज़माएं",
      videoBtn: "🎬 सॉफ़्टवेयर डेमो वीडियो देखें",
      secTitle: "7 विशेषीकृत फंक्शनल मॉड्यूल्स",
      secDesc: "विशिष्ट निष्पादन लॉजिक एल्गोरिदम का विश्लेषण करने के लिए किसी भी उत्पाद टैब पर क्लिक करें",
      activeText: "सक्रिय चयन",
      featureTitle: "सॉफ़्टवेयर एकीकरण प्रोटोकॉल की सूची:",
      unlimitedBank: "असीमित बैंक स्टेटमेंट ऑटोमैटिक एंट्री (Tally/Busy) - पूरी तरह से मुफ्त शामिल",
      quoteBtn: "📄 ऑफिशियल कोटेशन लेटरहेड जनरेट करें",
      buyBtn: "💳 अभी खरीदें / रेज़रपे से सुरक्षित भुगतान",
      gridTitle: "पूर्ण उत्पाद परिनियोजन मैट्रिक्स ग्रिड",
      gridDesc: "सारे सॉफ़्टवेयर वेरिएंट्स की कीमतों और परिचालन सीमाओं का संक्षिप्त विवरण",
      mostAdvanced: "सबसे उन्नत",
      gridQuote: "कोटेशन",
      gridBuy: "अभी खरीदें",
      guideTitle: "⚙️ सिस्टम इंस्टॉलेशन और मशीन लॉकिंग गाइड",
      guideDesc: "अपने स्थानीय ऑपरेटिंग एनवायरनमेंट पर लेखाफ्लो को सक्रिय करने के लिए कृपया इन चरणों का क्रमिक रूप से पालन करें।",
      steps: [
        "चरण 1: 'Download Trial' पर क्लिक करके या अपने सुरक्षित क्लाइंट लिंक के माध्यम से एकीकृत डेस्कटॉप सॉफ़्टवेयर पैकेज डाउनलोड करें।",
        "चरण 2: पैकेज को अपने सिस्टम पर इंस्टॉल करें और चलाएं। सॉफ़्टवेयर आपके सिस्टम के हार्डवेयर के आधार पर एक अद्वितीय 'Machine Hardware ID' जनरेट करेगा।",
        "चरण 3: उस हार्डवेयर आईडी को कॉपी करें और अपने लेखाफ्लो क्लाइंट डैशबोर्ड में पेस्ट करें या हमारे परिनियोजन डेस्क को फॉरवर्ड करें।",
        "चरण 4: हमारा ऑटोमेटेड सिस्टम इसे प्रोसेस करेगा और सीधे आपके ईमेल/व्हाट्सएप पर एक क्रिप्टोग्राफिक रूप से हस्ताक्षरित 'license.dat' फ़ाइल जारी करेगा।",
        "चरण 5: 'license.dat' फ़ाइल को सीधे सॉफ़्टवेयर के इंस्टॉलेशन फ़ोल्डर में डालें। सिस्टम तुरंत अनलॉक हो जाएगा और आउटपुट सीधे एक्सेल/टैली में जनरेट होने लगेगा।"
      ],
      restrictedBanner: "🔒 एडवांस्ड तकनीकी टेलीमेट्री और पूर्ण सिस्टम फीचर्स को अनलॉक करने के लिए कृपया साइन इन करें।"
    }
  };

  const currentContent = isHindi ? content.hi : content.en;

  // 100% Accurate Product Parameters with assigned official Razorpay URLs
  const productData = {
    gold: {
      id: "gold",
      title: "Lekha Flow Gold",
      tagline: isHindi ? "सबसे उन्नत ऑटोमेशन सुइट (प्रीमियम एडवांस एडिशन)" : "Most Advanced Automation Suite (Premium Advance Edition)",
      price: "₹ 35,000 / Year",
      limit: "10,000 Invoices / Year",
      compatibility: "Tally Prime Environment",
      razorpayUrl: "https://rzp.io/l/lekhaflow_gold",
      features: [
        "Random splitting of sales invoice amounts strictly below ₹50,000 threshold",
        "Random distribution of items per bill (dynamically assigns 1, 2, 3, 4 rows or custom item list)",
        "Proportional balanced asset allocation across transaction values and inventory lines automatically",
        "Dedicated Monthly / Quarterly split management configurations available natively right on the GUI dashboard",
        "Advanced tamper prevention technology with auto-fail hardware lock license protection",
        "Complimentary inclusion of Unlimited Tally/Busy Bank Statement automated entry handler utilities"
      ]
    },
    premium: {
      id: "premium",
      title: "Lekha Flow Premium",
      tagline: isHindi ? "उच्च दक्षता स्प्लिटिंग और ऑटोमेटेड लेज़र प्रोसेसिंग इंजन" : "High Efficiency Splitting & Automated Ledger Processing Engine",
      price: "₹ 18,000 / Year",
      limit: "5,000 Invoices / Year",
      compatibility: "Tally Prime Environment",
      razorpayUrl: "https://rzp.io/l/lekhaflow_premium",
      features: [
        "Matches exact high-speed operational backend computational matrix of Lekha Flow Gold variant",
        "Automated sales split processing routines configured strictly below standard ₹50,000 protocols",
        "Dynamic random distribution patterns active across transaction values and line item arrays",
        "Note: Monthly / Quarterly custom operational split toggles are absent on the physical GUI layout",
        "Direct desktop distribution server package deployment executable configuration",
        "Complimentary inclusion of Unlimited Tally/Busy Bank Statement automated entry handler utilities"
      ]
    },
    standard: {
      id: "standard",
      title: "Lekha Flow Standard",
      tagline: isHindi ? "कोर लेज़र सिंक और टैली प्राइम ऑटो वाउचर एंट्री फ्रेमवर्क" : "Core Ledger Sync & Tally Prime Auto Voucher Entry Framework",
      price: "₹ 15,000 / Year",
      limit: "5,000 Invoices / Year (10K limit @ ₹25,000)",
      compatibility: "Tally Prime Environment",
      razorpayUrl: "https://rzp.io/l/lekhaflow_standard",
      features: [
        "Direct automatic entry handler for Sales and Purchase vouchers into Tally Prime runtime environment",
        "Instant background automation generation of necessary client Masters, Party Ledgers, and Stock Items",
        "Automated form population logic fields: State, Country, GSTIN metadata, PAN cards, HSN codes, and GST rates",
        "Produces a highly organized structural independent Invoice Summary Excel dataset sheet automatically",
        "Advanced tracking integration layer designed to completely eliminate missing accounting reference codes",
        "Complimentary inclusion of Unlimited Tally/Busy Bank Statement automated entry handler utilities"
      ]
    },
    lite: {
      id: "lite",
      title: "Lekha Flow Lite",
      tagline: isHindi ? "बेसलाइन यूटिलिटी - ट्रू कॉपी स्नैपशॉट और एक्सेल टेम्पलेट मैपर" : "Baseline Utility - True Copy Snapshot & Excel Template Mapper",
      price: "₹ 8,000 / Year",
      limit: "5,000 Invoices / Year (10K limit @ ₹15,000)",
      compatibility: "Excel Formatting & Mapping Engine",
      razorpayUrl: "https://rzp.io/l/lekhaflow_lite",
      features: [
        "Generates a flawless 100% True Copy structural Excel data snapshot from raw target documents",
        "Universal Template Mapper capability for immediate auto-fill data injections into custom client formats",
        "Dynamic automated compilation sequence tracking operational Invoice Summary metrics data sheet",
        "Produces exactly 3 specialized standalone output Excel files per active transaction workspace batch",
        "Built-in multi-page isolated PDF parser pipeline framework routing automation components",
        "Complimentary inclusion of Unlimited Tally/Busy Bank Statement automated entry handler utilities"
      ]
    },
    erp9_premium: {
      id: "erp9_premium",
      title: "Tally ERP9 Premium Edition",
      tagline: isHindi ? "लेगेसी आर्किटेक्चर के लिए समर्पित प्रीमियम ऑटो एंट्री इंजेक्शन" : "Premium Auto Entry Injection Dedicated for Legacy Architectures",
      price: "₹ 18,000 / Year",
      limit: "5,000 Invoices / Year",
      compatibility: "Tally ERP9 Infrastructure Only",
      razorpayUrl: "https://rzp.io/l/tally_erp9_premium",
      features: [
        "Equipped with same robust computational split capabilities as the Tally Prime Premium version pipeline",
        "Exclusively optimized for seamless native script parsing injections within Tally ERP9 runtime window contexts",
        "Standalone legacy system adapter environment block separate from standard Prime codebase framework lines",
        "Sales transaction amount processing logic configured safely underneath standard ₹50,000 security tags",
        "Encrypted local data serialization framework bypass handlers enabled for reliable background injections",
        "Complimentary inclusion of Unlimited Tally/Busy Bank Statement automated entry handler utilities"
      ]
    },
    erp9_standard: {
      id: "erp9_standard",
      title: "Tally ERP9 Standard Edition",
      tagline: isHindi ? "टैली ERP9 इकोसिस्टम के लिए डायरेक्ट वाउचर जनरेशन मैट्रिक्स" : "Direct Voucher Generation Matrix for Tally ERP9 Ecosystems",
      price: "₹ 15,000 / Year",
      limit: "5,000 Invoices / Year",
      compatibility: "Tally ERP9 Infrastructure Only",
      razorpayUrl: "https://rzp.io/l/tally_erp9_standard",
      features: [
        "Mirror feature performance parity parameters matching standard Tally Prime auto-entry models",
        "High fidelity integration pipeline tracking targeting native ERP9 desktop process context scopes",
        "Automated background creation pathways configured for Ledgers, Stock entities, and metadata tax arrays",
        "Instant validation compilation of corresponding standalone Invoice Summary documentation sheets",
        "Sleek low footprint computing script running locally with zero latency or network communication delays",
        "Complimentary inclusion of Unlimited Tally/Busy Bank Statement automated entry handler utilities"
      ]
    },
    busy: {
      id: "busy",
      title: "Lekha Flow Busy Edition",
      tagline: isHindi ? "BUSY सिस्टम के लिए दोषरहित स्वचालित वाउचर जनरेशन फ्रेमवर्क" : "Flawless Automated Voucher Generation Framework for BUSY Systems",
      price: "₹ 15,000 / Year",
      limit: "5,000 Invoices / Year (10K limit @ ₹25,000)",
      compatibility: "BUSY ERP Accounting Software",
      razorpayUrl: "https://rzp.io/l/lekhaflow_busy",
      features: [
        "Engineered specifically for complete error-free transaction voucher injections inside active BUSY setups",
        "Produces streamlined single-sheet split database configurations to completely eliminate desktop system hang problems",
        "Strict operational data ingestion order mapping sequence: Accounts → Items → Vouchers",
        "Explicit structural spreadsheet field mapping protocol targeting columns A, B, C through K",
        "Automated master ledger lookup validation checks executed locally prior to voucher data stream injection",
        "Complimentary inclusion of Unlimited Tally/Busy Bank Statement automated entry handler utilities"
      ]
    }
  };

  // FIXED: Added missing executeRazorpay function handler line mapping context
  const executeRazorpay = (url: string) => {
    window.open(url, "_blank");
  };

  const launchQuotationLetterhead = (product: any) => {
    setQuotationData({
      refNo: `NS/2026/QUOT/${product.id.toUpperCase()}_0523`,
      date: "May 23, 2026",
      name: product.title,
      limit: product.limit,
      price: product.price,
      scope: product.tagline,
      benefits: product.features
    });
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-950 font-sans tracking-tight text-xs selection:bg-blue-600 selection:text-white antialiased">
      
      {/* 1. DYNAMIC COMMERCIAL LETTERHEAD MODAL OVERLAY */}
      {quotationData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border-4 border-double border-slate-400 max-w-2xl w-full p-8 rounded-xl shadow-2xl space-y-6 text-black font-sans relative my-8">
            <div className="text-center border-b-2 border-slate-900 pb-4">
              <h2 className="text-2xl font-black tracking-wider text-slate-950">Nexoriva Systems</h2>
              <p className="text-xs font-bold text-blue-600 tracking-wide">"Automating Accuracy, Empowering Accountants"</p>
              <div className="text-[10px] text-slate-900 font-bold mt-1 space-y-0.5">
                <div>Registered MSME (Udyam): <span className="font-extrabold text-black">UDYAM-CG-27-0013072</span></div>
                <div>Office: Surajpur, Chhattisgarh, India | Email: Nexoriva.systems@gmail.com | Web: lekhaflow.in</div>
              </div>
            </div>
            <div className="flex justify-between font-mono text-[10px] text-black bg-slate-100 p-2.5 rounded-lg border border-slate-300">
              <div><span className="font-black text-black">Ref No:</span> {quotationData.refNo}</div>
              <div><span className="font-black text-black">Date:</span> {quotationData.date}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-black text-slate-600 uppercase tracking-wider">Subject:</div>
              <div className="text-sm font-black text-slate-950">Official Commercial Quotation for LekhaFlow Enterprise Accounting Automation Suite</div>
            </div>
            <div className="overflow-x-auto border border-slate-300 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-200 border-b border-slate-300 text-slate-950 font-black">
                    <th className="p-3">Specification Target</th>
                    <th className="p-3">Deployment Coverage parameters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300 font-bold text-black">
                  <tr>
                    <td className="p-3 font-black bg-slate-50">Software Module Target</td>
                    <td className="p-3 text-blue-600 font-extrabold">{quotationData.name}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black bg-slate-50">Processing Bounds</td>
                    <td className="p-3 text-black">{quotationData.limit}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black bg-slate-50">Core System Scope</td>
                    <td className="p-3 text-black">{quotationData.scope}</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="p-3 font-black text-black">Annual Subscription Fee</td>
                    <td className="p-3 text-sm font-extrabold text-black">{quotationData.price}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-black text-slate-950 uppercase tracking-wider">Exclusive Operational System Benefits:</div>
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
                <div><span className="font-black">Bank Name:</span> Bank of India</div>
                <div><span className="font-black">Account Number:</span> 946110110001194</div>
                <div><span className="font-black">IFSC Code:</span> BKID0009461</div>
                <div><span className="font-black">UPI ID:</span> 8871097310-2@ybl</div>
              </div>
            </div>
            <div className="flex justify-between items-end pt-4 border-t border-slate-300 text-[10px] text-slate-800 font-bold">
              <div className="space-y-0.5">
                <div>• Software locked securely via local Machine Hardware ID code protocols.</div>
                <div>• Technical assistance desk remains active across a standard 12-Month pipeline.</div>
              </div>
              <div className="text-center text-slate-950 font-black">
                <div className="text-[9px] text-slate-500 mb-6 font-mono">For, Nexoriva Systems</div>
                <div className="underline border-t border-slate-400 pt-1">Authorized Signatory</div>
              </div>
            </div>
            <button onClick={() => setQuotationData(null)} className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-black rounded-xl transition text-[11px] uppercase tracking-wider">
              Close Letterhead Sheet
            </button>
          </div>
        </div>
      )}

      {/* 2. SECURITY GATEWAY: CLIENT INTERACTIVE AUTH SIGN IN / SIGN UP MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white border-2 border-blue-600 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl text-black">
            <div className="text-center">
              <h3 className="text-lg font-black text-slate-950 tracking-wide">
                {authMode === "signin" ? "Sign In to Dashboard" : "Create Professional Account"}
              </h3>
              <p className="text-zinc-500 text-[10px] mt-0.5 font-medium">LekhaFlow Cloud Execution Gateway Platform</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); setShowAuthModal(false); }} className="space-y-3 font-medium">
              {authMode === "signup" && (
                <>
                  <input type="text" required placeholder="Full Operational Name" className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-bold focus:outline-blue-500" />
                  <input type="text" required placeholder="Firm / Company Name" className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-bold focus:outline-blue-500" />
                </>
              )}
              <input type="email" required placeholder="Registered Corporate Email" className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-bold focus:outline-blue-500" />
              <input type="password" required placeholder="Secure Access Password" className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-bold focus:outline-blue-500" />
              <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition text-[11px] uppercase tracking-wider shadow-md shadow-blue-600/10">
                {authMode === "signin" ? "Authenticate Credentials" : "Register and Open Systems"}
              </button>
            </form>
            <div className="text-center pt-2 text-[11px] font-bold text-slate-600">
              {authMode === "signin" ? (
                <p>New to LekhaFlow? <span onClick={() => setAuthMode("signup")} className="text-blue-600 underline cursor-pointer">Create Account here</span></p>
              ) : (
                <p>Already registered? <span onClick={() => setAuthMode("signin")} className="text-blue-600 underline cursor-pointer">Sign In here</span></p>
              )}
            </div>
            <button onClick={() => setShowAuthModal(false)} className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg transition text-[10px]">Cancel</button>
          </div>
        </div>
      )}

      {/* 3. TRIAL SUITE NODE INGESTION GATEWAY FORM */}
      {showTrialModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white border-2 border-yellow-500 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl text-black">
            <div className="text-center">
              <h3 className="text-base font-black text-slate-950">Unlock 7-Days Functional Trial</h3>
              <p className="text-blue-600 font-bold text-[10px] mt-0.5">Target: LekhaFlow Standard Edition Suite Setup.exe</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowTrialModal(false); alert("Telemetry authorization complete. Initializing download sequence for: Lekha_Flow_Standard_Trial.exe (Target environment initialized matches Tally Prime Core)"); }} className="space-y-3 font-medium">
              <input type="text" required placeholder="Accountant / Business Owner Name" className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-bold focus:outline-blue-500" />
              <input type="text" required placeholder="Mobile Number (WhatsApp linked)" className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-bold focus:outline-blue-500" />
              <input type="email" required placeholder="Corporate Email Address" className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-bold focus:outline-blue-500" />
              <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-black rounded-xl transition text-[11px] uppercase tracking-wider shadow-md">
                Authorize Profile & Download Setup
              </button>
            </form>
            <button onClick={() => setShowTrialModal(false)} className="w-full py-1.5 bg-slate-100 text-slate-800 font-bold rounded-lg text-[10px]">Close</button>
          </div>
        </div>
      )}

      {/* Professional Localized Navbar Header Layout */}
      <header className="relative z-50 max-w-6xl mx-auto px-4 py-4 flex justify-between items-center border-b border-slate-200 backdrop-blur-md sticky top-0 bg-white/95 shadow-sm">
        <div className="flex items-center space-x-6">
          <div>
            <div className="text-xl font-black text-slate-950 tracking-wider">
              Lekha<span className="text-blue-600">Flow</span>
            </div>
            <span className="text-[9px] block text-slate-500 font-mono font-bold uppercase tracking-wider -mt-0.5">🛡️ MSME Regd: UDYAM-CG-27-0013072</span>
          </div>

          {/* DUAL LANGUAGE HIGH VISIBILITY TOGGLE INTEGRATION */}
          <button 
            onClick={() => setIsHindi(!isHindi)} 
            className="px-2.5 py-1 text-[10px] font-black rounded-md border-2 border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
          >
            🌐 {isHindi ? "English" : "हिंदी"}
          </button>
        </div>
        
        <nav className="hidden lg:flex space-x-6 text-slate-950 font-black tracking-wide text-[11px]">
          <a href="#hero" className="hover:text-blue-600 transition">{currentContent.navLinks.howItWorks}</a>
          <a href="#matrix" className="hover:text-blue-600 transition">{currentContent.navLinks.modules}</a>
          <a href="#pricing" className="hover:text-blue-600 transition">{currentContent.navLinks.pricing}</a>
          <a href="#contact" className="hover:text-blue-600 transition">{currentContent.navLinks.contact}</a>
        </nav>

        {/* INTERACTIVE CLIENT AUTH CONNECTIONS CONTROLLER */}
        <div className="flex space-x-2">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <span className="bg-green-100 text-green-700 font-mono text-[9px] font-black px-2 py-1 rounded border border-green-300 uppercase animate-pulse">● Pro Dashboard</span>
              <button onClick={() => setIsLoggedIn(false)} className="px-2.5 py-1.5 font-bold rounded-lg bg-red-50 text-red-600 text-[10px] border border-red-200 hover:bg-red-100 transition">Log Out</button>
            </div>
          ) : (
            <button onClick={() => { setAuthMode("signin"); setShowAuthModal(true); }} className="px-3 py-2 font-black rounded-lg bg-slate-50 border border-slate-300 hover:bg-slate-100 text-slate-950 transition text-[10px]">
              🔑 Client Login
            </button>
          )}
          <button onClick={() => setShowTrialModal(true)} className="px-3 py-2 font-black rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition text-[10px]">
            📥 Download Installer / Demo
          </button>
        </div>
      </header>

      {/* Hero Presentation Layout */}
      <section id="hero" className="relative z-10 max-w-6xl mx-auto px-4 pt-16 pb-20 grid lg:grid-cols-12 gap-8 items-center">
        <div className="space-y-4 lg:col-span-7">
          <span className="inline-block bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md border border-blue-300 shadow-sm">
            {currentContent.heroBadge}
          </span>
          <h1 className="text-3xl md:text-5xl font-black leading-none text-slate-950 tracking-tight">
            {currentContent.heroTitle}
          </h1>
          <p className="text-black text-sm font-black leading-relaxed max-w-xl">
            {currentContent.heroDesc}
          </p>
          
          <div className="flex flex-wrap gap-2.5 pt-2">
            <button onClick={() => setShowTrialModal(true)} className="px-4 py-3 rounded-xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white hover:opacity-95 shadow-lg shadow-blue-600/30 transition text-[11px]">
              {currentContent.trialBtn}
            </button>
            <button onClick={() => alert("Streaming localized functional walk-through tutorial configuration video file data module...")} className="px-4 py-3 rounded-xl font-black bg-slate-100 border border-slate-300 text-slate-950 hover:bg-slate-200 transition text-[11px]">
              {currentContent.videoBtn}
            </button>
          </div>
        </div>

        {/* Local Processing Core Diagnostics Monitor Console Visual Component */}
        <div className="lg:col-span-5 bg-slate-50 border-2 border-slate-200 p-5 rounded-2xl shadow-md space-y-4 font-mono text-[11px]">
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
            <span className="text-slate-950 font-black text-[10px]">lekhaflow_gui_dashboard.log</span>
            <span className="text-blue-600 font-bold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-[10px]">● CORE PIPELINE ONLINE</span>
          </div>
          
          <div className="space-y-2 bg-white p-3 rounded-xl border border-slate-200 text-slate-950 font-black">
            <div className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Operational Monitor Flags</div>
            <div className="flex justify-between"><span>Splitting Cap Threshold:</span><span className="text-slate-950 font-black">&lt; ₹50,000 / Invoice</span></div>
            <div className="flex justify-between"><span>Random Items Selector:</span><span className="text-blue-600 font-black">1 to 4 Variable Rows</span></div>
            <div className="flex justify-between"><span>Parallel Thread Latency:</span><span className="text-green-600 font-black">20 Active Threads</span></div>
          </div>
        </div>
      </section>

      {/* 7 Specialized System Modules Tab Selection Block */}
      <section id="matrix" className="relative z-20 max-w-6xl mx-auto px-4 py-12 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
          <div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">{currentContent.secTitle}</h2>
            <p className="text-black text-sm font-black">{currentContent.secDesc}</p>
          </div>
          <span className="text-[10px] font-mono bg-blue-50 border border-blue-200 text-blue-600 uppercase font-black px-3 py-1 rounded-md shadow-sm">
            {currentContent.activeText}: {productData[activeTab].title}
          </span>
        </div>

        {/* Tab Selection Row Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 p-1.5 bg-slate-200 rounded-xl border border-slate-300 mb-4 shadow-inner">
          {Object.values(productData).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`px-1 py-2.5 rounded-lg font-black transition-all text-center text-[10px] cursor-pointer ${
                activeTab === item.id 
                  ? "bg-blue-600 text-white font-black shadow-md" 
                  : "text-slate-950 hover:text-blue-600 hover:bg-white"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Focus Information Card Frame block */}
        <div className="bg-slate-50 border-2 border-slate-200 p-6 rounded-2xl shadow-md relative">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-5 border-b border-slate-200 gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-950 tracking-wide">{productData[activeTab].title}</h3>
              <p className="text-blue-600 font-black text-[11px]">{productData[activeTab].tagline}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 min-w-[200px] shadow-sm">
              <span className="text-slate-500 font-mono text-[9px] block uppercase tracking-wider font-bold">Annual Rate Profile</span>
              <div className="text-2xl font-black text-slate-950 tracking-tight">{productData[activeTab].price}</div>
              <span className="text-black text-[10px] font-mono font-black block mt-0.5">{productData[activeTab].limit}</span>
            </div>
          </div>

          {/* DYNAMIC ACCESS LOCK GATING PATTERN LAYER FOR SAAS SYSTEM */}
          {!isLoggedIn && (activeTab === "gold" || activeTab === "premium") && (
            <div className="my-3 p-3 bg-yellow-50 border-2 border-dashed border-yellow-400 rounded-xl text-yellow-900 font-black text-center text-[11px]">
              {currentContent.restrictedBanner}
            </div>
          )}

          {/* SOLID HIGH-CONTRAST LEGIBLE PARAMETER SPECIFICATION BULLETS */}
          <div className="mt-6 space-y-3">
            <div className="text-slate-600 font-mono text-[9px] uppercase tracking-widest font-black">{currentContent.featureTitle}</div>
            <div className="grid sm:grid-cols-2 gap-3">
              {productData[activeTab].features.map((feature, i) => {
                // Feature encryption flag visibility control
                const isRestricted = !isLoggedIn && (activeTab === "gold" || activeTab === "premium") && i > 2;
                return (
                  <div key={i} className={`bg-white p-4 rounded-xl border-2 border-slate-300 text-black font-black text-[12px] flex items-start gap-3 shadow-sm hover:border-blue-500 transition-colors ${isRestricted ? "opacity-30 blur-[1px]" : ""}`}>
                    <span className="text-blue-600 font-black text-sm">✔</span>
                    <span className="leading-relaxed text-black font-black">
                      {isRestricted ? "Encrypted core enterprise module parameters data path trace" : feature}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-slate-300 flex flex-col sm:flex-row justify-end gap-3">
            <button onClick={() => launchQuotationLetterhead(productData[activeTab])} className="px-5 py-2.5 rounded-xl bg-white border-2 border-slate-400 hover:bg-slate-50 text-slate-950 font-black text-[11px] shadow-sm transition-all">
              {currentContent.quoteBtn}
            </button>
            <button onClick={() => executeRazorpay(productData[activeTab].razorpayUrl)} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-black hover:bg-blue-700 shadow-md shadow-blue-600/10 text-[11px] transition-all">
              {currentContent.buyBtn}
            </button>
          </div>
        </div>
      </section>

      {/* Main Side-by-Side Unified Table Matrix Grid Component */}
      <section id="pricing" className="relative z-20 max-w-6xl mx-auto px-4 py-12 border-t border-slate-200">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">{currentContent.gridTitle}</h2>
          <p className="text-black text-sm font-black mt-1">{currentContent.gridDesc}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Object.values(productData).map((p) => (
            <div key={p.id} className={`bg-white border-2 rounded-2xl p-4 flex flex-col justify-between transition-all group ${
              activeTab === p.id ? "border-blue-600 ring-4 ring-blue-100 shadow-xl bg-slate-50/50" : "border-slate-300 hover:border-slate-400 shadow-sm"
            }`}>
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-1">
                  <div>
                    <h3 className="text-slate-950 font-black group-hover:text-blue-600 text-xs transition-colors">{p.title}</h3>
                    <span className="text-[9px] text-slate-400 font-mono font-bold">{p.compatibility}</span>
                  </div>
                  {p.id === "gold" && (
                    <span className="bg-yellow-100 text-yellow-700 border border-yellow-300 px-2 py-0.5 rounded text-[8px] uppercase tracking-wide font-black">{currentContent.mostAdvanced}</span>
                  )}
                </div>

                <div className="py-2 border-y border-slate-200 my-1">
                  <div className="text-lg font-black text-slate-950 tracking-tight">{p.price}</div>
                  <span className="text-slate-600 text-[9px] font-mono font-black block mt-0.5">{p.limit}</span>
                </div>

                <ul className="space-y-1.5 pl-0 text-black text-[11px] list-none font-black">
                  {p.features.slice(0, 3).map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-black font-black leading-snug">
                      <span className="text-blue-500 font-black">▪</span>
                      <span className="line-clamp-2 text-black font-black">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
                <button onClick={() => launchQuotationLetterhead(p)} className="py-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-950 font-black text-[10px] transition-colors">
                  {currentContent.gridQuote}
                </button>
                <button onClick={() => executeRazorpay(p.razorpayUrl)} className="py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] transition-all">
                  {currentContent.gridBuy}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SOLID JET BLACK HIGH-CONTRAST INSTRUCTION SYSTEM MANUAL BLOCK */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 py-12 border-t border-slate-200 bg-slate-50 rounded-2xl mb-12 my-6 border-2">
        <div className="space-y-2 mb-6">
          <h3 className="text-lg font-black text-slate-950 tracking-wide">{currentContent.guideTitle}</h3>
          <p className="text-black text-xs font-black">{currentContent.guideDesc}</p>
        </div>
        <div className="grid md:grid-cols-1 gap-3.5">
          {currentContent.steps.map((step, idx) => (
            <div key={idx} className="bg-white border border-slate-300 p-4 rounded-xl flex items-start gap-4 shadow-sm">
              <span className="bg-blue-600 text-white font-mono font-black rounded-full h-6 w-6 flex items-center justify-center text-xs shrink-0">{idx + 1}</span>
              <p className="text-slate-950 font-black text-[12px] leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Google Intake Sheet Lead Ingestion Center Form */}
      <section id="contact" className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-xl mx-auto px-4 pt-12 text-center space-y-1">
          <span className="text-blue-600 font-mono text-[9px] uppercase tracking-widest font-black block">Secure Intake Node</span>
          <h2 className="text-xl font-bold text-slate-950">{isHindi ? "Submit your workflow requirements" : "Submit Your Workflow Specifications"}</h2>
          <p className="text-black text-xs font-black">
            {isHindi ? "Complete the form below. Our experts will contact you promptly." : "Forward structural configuration fields matrix directly to Nexoriva consultation systems."}
          </p>
        </div>
        <Contact />
      </section>

      {/* Technical Landscapes Footer Configuration */}
      <footer className="bg-slate-950 py-8 border-t border-slate-900 font-mono text-[10px] text-slate-400 text-center space-y-3">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 text-left gap-6 pb-6 border-b border-zinc-800/40 font-sans text-zinc-400">
          <div>
            <h5 className="text-white font-bold text-xs font-sans mb-1">Corporate HQ</h5>
            <p className="text-xs leading-relaxed text-zinc-400">Surajpur, Ambikapur Region,<br />Chhattisgarh, India - 497229</p>
          </div>
          <div>
            <h5 className="text-white font-bold text-xs font-sans mb-1">Inquiries Hub</h5>
            <p className="text-xs leading-relaxed text-zinc-400">Email: Nexoriva.systems@gmail.com<br />Direct Phone: +91-8770808695</p>
          </div>
          <div>
            <h5 className="text-white font-bold text-xs font-sans mb-1">System Mandate</h5>
            <p className="text-xs leading-relaxed text-zinc-400">All desktop setup bundles enforce runtime cryptographic Machine Hardware ID locks verification.</p>
          </div>
        </div>
        <p className="font-bold text-zinc-300 font-sans text-xs">Nexoriva Systems © 2026</p>
        <p className="tracking-wide text-zinc-600">Engineered & Architected by Jitendra Bharti | Developed in India</p>
      </footer>

      <WhatsAppButton />
    </div>
  );
}