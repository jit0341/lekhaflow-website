"use client";

import Contact from "@/components/contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState, useEffect } from "react";

export default function Home() {
  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"gold" | "premium" | "standard" | "lite" | "erp9_premium" | "erp9_standard" | "busy">("gold");
  const [quotationData, setQuotationData] = useState<any | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [showTrialModal, setShowTrialModal] = useState<boolean>(false);

  // Forceful runtime metadata title to destroy "Create Next App" legacy label
  useEffect(() => {
    document.title = "LekhaFlow | High Precision Invoicing Data Extractors & Automated Split Suite";
  }, []);

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
      restrictedBanner: "🔒 Sign In to unlock advanced technical telemetry and granular system feature structures.",
      contactTitle: "Submit Your Workflow Specifications",
      contactDesc: "Complete the form below. Our team will contact you promptly to set up your workflow pipeline.",
      systemMandate: "All desktop setup bundles enforce runtime cryptographic Machine Hardware ID locks verification.",
      footerCredits: "Engineered & Architected by Jitendra Bharti | Developed in India"
    },
    hi: {
      navLinks: { howItWorks: "काम कैसे करता है", modules: "हमारे 7 सॉफ़्टवेयर वेरिएंट", pricing: "सब्स्क्रिप्शन रेट्स", contact: "संपर्क / डेमो अनुरोध" },
      heroBadge: "सटीकता का स्वचालन, लेखाकारों का सशक्तिकरण",
      heroTitle: "उच्च-सटीक इनवॉइस डेटा एक्सट्रैक्टर्स और ऑटोमैटिक स्प्लिट लॉजिक",
      heroDesc: "लेखाफ्लो आपके मैन्युअल & बिखरे हुए अकाउंटिंग बिलिंग रूटीन को हाई-स्पीड डिजिटल ऑटोमेशन लाइनों में बदल देता है। एडवांस्ड एआई पार्सिंग आर्किटेक्चर और स्प्लिटिंग स्कीमा द्वारा संचालित, यह इनवॉइस रो वेरिएबल्स को सीधे आपके एकाउंटिंग सॉफ्टवेयर में सिंक करता है।",
      trialBtn: "🚀 7-दिनों का फ्री ट्रायल आज़माएं",
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
        "चरण 4: हमारा ऑटोमेटेड सिस्टम इसे प्रोसेस करेगा और सीधे आपके ईमेल/व्हाट्सएप पर एक क्रिप्टोग्राफिक रूप से हस्ताक्षित 'license.dat' फ़ाइल जारी करेगा।",
        "चरण 5: 'license.dat' फ़ाइल को सीधे सॉफ़्टवेयर के इंस्टॉलेशन फ़ोल्डर में डालें। सिस्टम तुरंत अनलॉक हो जाएगा और आउटपुट सीधे एक्सेल/टैली में जनरेट होने लगेगा।"
      ],
      restrictedBanner: "🔒 एडवांस्ड तकनीकी टेलीमेट्री और पूर्ण सिस्टम फीचर्स को अनलॉक करने के लिए कृपया साइन इन करें।",
      contactTitle: "अपनी वर्कफ़्लो आवश्यकताएँ सबमिट करें",
      contactDesc: "नीचे दिए गए फ़ॉर्म को पूरा भरें। हमारे एक्सपर्ट तुरंत आपके सिस्टम सेटअप के लिए आपसे संपर्क करेंगे।",
      systemMandate: "सभी डेस्कटॉप सेटअप बंडल रनटाइम क्रिप्टोग्राफिक मशीन हार्डवेयर आईडी लॉक सत्यापन लागू करते हैं।",
      footerCredits: "जितेंद्र भारती द्वारा इंजीनियर और आर्किटेक्ट किया गया | भारत में विकसित"
    }
  };

  const currentContent = isHindi ? content.hi : content.en;

  // 100% PROVEN PRODUCTION GATEWAY MAP
  const productData = {
    gold: {
      id: "gold",
      title: "Lekha Flow Gold",
      tagline: isHindi ? "सबसे उन्नत ऑटोमेशन सुइट (प्रीमियम एडवांस एडिशन)" : "Most Advanced Automation Suite (Premium Advance Edition)",
      price: "₹ 35,000 / Year",
      limit: "Unlimited Invoices / Year",
      compatibility: "Tally Prime Environment",
      razorpayUrl: "https://rzp.io/rzp/sQg7LGy",
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
      price: "₹ 35,000 / Year",
      limit: "25,000 Invoices / Year",
      compatibility: "Tally Prime Environment",
      razorpayUrl: "https://rzp.io/rzp/9HGERapH",
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
      title: "Lekha Flow Lite Standard",
      tagline: isHindi ? "CORE लेज़र सिंक और टैली प्राइम ऑटो वाउचर एंट्री फ्रेमवर्क" : "Core Ledger Sync & Tally Prime Auto Voucher Entry Framework",
      price: "₹ 15,000 / Year",
      limit: "10,000 Invoices / Year",
      compatibility: "Tally Prime Environment",
      razorpayUrl: "https://rzp.io/rzp/SkJTqlgi",
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
      title: "Lekha Flow Lite Premium",
      tagline: isHindi ? "बेसलाइन यूटिलिटी - TRUE COPY स्नैपशॉट और एक्सेल टेम्पलेट मैपर" : "Baseline Utility - True Copy Snapshot & Excel Template Mapper",
      price: "₹ 25,000 / Year",
      limit: "5,000 Invoices / Year",
      compatibility: "Excel Formatting & Mapping Engine",
      razorpayUrl: "https://rzp.io/rzp/oVwLNxHT",
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
      price: "₹ 35,000 / Year",
      limit: "25,000 Invoices / Year",
      compatibility: "Tally ERP9 Infrastructure Only",
      razorpayUrl: "https://rzp.io/rzp/BLZgsWB",
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
      price: "₹ 25,000 / Year",
      limit: "10,000 Invoices / Year",
      compatibility: "Tally ERP9 Infrastructure Only",
      razorpayUrl: "https://rzp.io/rzp/AZMi622y",
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
      price: "₹ 25,000 / Year",
      limit: "10,000 Invoices / Year",
      compatibility: "BUSY ERP Accounting Software",
      razorpayUrl: "https://rzp.io/rzp/AEKdBeqc",
      features: [
        "Engineered specifically for complete error-free transaction voucher injections inside active BUSY setups",
        "Produces streamlined single-sheet split database configurations to completely eliminate desktop system hang problems",
        "Strict operational data ingestion order mapping sequence: Accounts → Items → Vouchers",
        "Explicit structural spreadsheet field mapping protocol tracking columns A, B, C through K",
        "Automated master ledger lookup validation checks executed locally prior to voucher data stream injection",
        "Complimentary inclusion of Unlimited Tally/Busy Bank Statement automated entry handler utilities"
      ]
    }
  };

  const executeRazorpay = (targetUrl: string) => {
    if (targetUrl && typeof window !== "undefined") {
      window.location.href = targetUrl.trim();
    }
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
                  <tr className="bg-blue-50">
                    <td className="p-3 font-black text-black">Annual Subscription Fee</td>
                    <td className="p-3 text-sm font-extrabold text-black">{quotationData.price}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button onClick={() => setQuotationData(null)} className="w-full py-2.5 bg-slate-950 text-white font-black rounded-xl text-[11px] uppercase">
              Close Letterhead Sheet
            </button>
          </div>
        </div>
      )}

      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white border-2 border-blue-600 p-6 rounded-2xl max-w-sm w-full space-y-4 text-black">
            <h3 className="text-center text-lg font-black">Sign In to Dashboard</h3>
            <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); setShowAuthModal(false); }} className="space-y-3">
              <input type="email" required placeholder="Email" className="w-full p-2.5 border rounded-xl" />
              <input type="password" required placeholder="Password" className="w-full p-2.5 border rounded-xl" />
              <button type="submit" className="w-full py-2.5 bg-blue-600 text-white font-black rounded-xl">Authenticate</button>
            </form>
            <button onClick={() => setShowAuthModal(false)} className="w-full py-1.5 bg-slate-100 text-slate-800 rounded-lg text-[10px]">Cancel</button>
          </div>
        </div>
      )}

      {showTrialModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white border-2 border-yellow-500 p-6 rounded-2xl max-w-sm w-full space-y-4 text-black">
            <h3 className="text-base font-black text-center">Unlock 7-Days Functional Trial</h3>
            <form onSubmit={(e) => { e.preventDefault(); setShowTrialModal(false); window.open("https://rzp.io/rzp/SkJTqlgi", "_blank"); }} className="space-y-3">
              <input type="text" required placeholder="Name" className="w-full p-2.5 border rounded-xl" />
              <input type="email" required placeholder="Email" className="w-full p-2.5 border rounded-xl" />
              <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-black rounded-xl">Go to Download Portal</button>
            </form>
            <button onClick={() => setShowTrialModal(false)} className="w-full py-1.5 bg-slate-100 text-slate-800 rounded-lg text-[10px]">Close</button>
          </div>
        </div>
      )}

      <header className="relative z-50 max-w-6xl mx-auto px-4 py-4 flex justify-between items-center border-b border-slate-200 sticky top-0 bg-white/95 shadow-sm">
        <div>
          <div className="text-xl font-black text-slate-950 tracking-wider">Lekha<span className="text-blue-600">Flow</span></div>
          <span className="text-[9px] block text-slate-500 font-mono font-bold uppercase tracking-wider -mt-0.5">🛡️ MSME Regd: UDYAM-CG-27-0013072</span>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => setIsHindi(!isHindi)} className="px-2.5 py-1 text-[10px] font-black rounded-md border-2 border-blue-600 bg-blue-50 text-blue-600">🌐 {isHindi ? "English" : "हिंदी"}</button>
          <button onClick={() => { setAuthMode("signin"); setShowAuthModal(true); }} className="px-3 py-2 font-black rounded-lg bg-slate-50 border text-[10px]">🔑 Client Login</button>
          <button onClick={() => setShowTrialModal(true)} className="px-3 py-2 font-black rounded-lg bg-blue-600 text-white text-[10px]">📥 Download Installer / Demo</button>
        </div>
      </header>

      <section id="hero" className="max-w-6xl mx-auto px-4 pt-16 pb-20 grid lg:grid-cols-12 gap-8 items-center">
        <div className="space-y-4 lg:col-span-7">
          <span className="inline-block bg-blue-50 text-blue-700 text-[10px] font-black uppercase px-3 py-1 rounded-md border border-blue-300">{currentContent.heroBadge}</span>
          <h1 className="text-3xl md:text-5xl font-black leading-none text-slate-950 tracking-tight">{currentContent.heroTitle}</h1>
          <p className="text-black text-sm font-black leading-relaxed max-w-xl">{currentContent.heroDesc}</p>
          <div className="flex gap-2.5 pt-2">
            <button onClick={() => setShowTrialModal(true)} className="px-4 py-3 rounded-xl font-black bg-blue-600 text-white text-[11px]">{currentContent.trialBtn}</button>
            <button onClick={() => window.open("https://rzp.io/rzp/SkJTqlgi", "_blank")} className="px-4 py-3 rounded-xl font-black bg-slate-100 border text-[11px]">{currentContent.videoBtn}</button>
          </div>
        </div>
      </section>

      <section id="matrix" className="max-w-6xl mx-auto px-4 py-12 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
          <div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">{currentContent.secTitle}</h2>
            <p className="text-black text-sm font-black">{currentContent.secDesc}</p>
          </div>
          <span className="text-[10px] font-mono bg-blue-50 border border-blue-200 text-blue-600 uppercase font-black px-3 py-1 rounded-md shadow-sm">
            {currentContent.activeText}: {productData[activeTab].title}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 p-1.5 bg-slate-200 rounded-xl mb-4">
          {Object.values(productData).map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`px-1 py-2.5 rounded-lg font-black text-center text-[10px] cursor-pointer ${activeTab === item.id ? "bg-blue-600 text-white shadow-md" : "text-slate-950 hover:bg-white"}`}>{item.title}</button>
          ))}
        </div>

        <div className="bg-slate-50 border-2 border-slate-200 p-6 rounded-2xl relative shadow-md">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-5 border-b border-slate-200 gap-4">
            <div>
              <h3 className="text-lg font-black text-slate-950">{productData[activeTab].title}</h3>
              <p className="text-blue-600 font-black text-[11px]">{productData[activeTab].tagline}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border min-w-[200px] shadow-sm">
              <span className="text-slate-400 font-mono text-[9px] block uppercase font-bold">Annual Rate Profile</span>
              <div className="text-2xl font-black text-slate-950">{productData[activeTab].price}</div>
              <span className="text-black text-[10px] font-mono font-black block mt-0.5">{productData[activeTab].limit}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              {productData[activeTab].features.map((feature, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border-2 text-black font-black text-[12px] flex items-start gap-3 shadow-sm">
                  <span className="text-blue-600 font-black">✔</span><span className="leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-slate-300 flex justify-end gap-3">
            <button onClick={() => launchQuotationLetterhead(productData[activeTab])} className="px-5 py-2.5 rounded-xl bg-white border font-black text-[11px] shadow-sm">
              {currentContent.quoteBtn}
            </button>
            <button onClick={() => executeRazorpay(productData[activeTab].razorpayUrl)} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-black text-[11px] shadow-sm">
              {currentContent.buyBtn}
            </button>
          </div>
        </div>
      </section>

      <section id="pricing" className="max-w-6xl mx-auto px-4 py-12 border-t border-slate-200">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl font-black text-slate-950">{currentContent.gridTitle}</h2>
          <p className="text-black text-sm font-black mt-1">{currentContent.gridDesc}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Object.values(productData).map((p) => (
            <div key={p.id} className={`bg-white border-2 rounded-2xl p-4 flex flex-col justify-between transition-all ${activeTab === p.id ? "border-blue-600 ring-4 ring-blue-100 bg-slate-50/50" : "border-slate-300"}`}>
              <div className="space-y-3">
                <h3 className="text-slate-950 font-black text-xs">{p.title}</h3>
                <div className="py-2 border-y border-slate-200">
                  <div className="text-lg font-black text-slate-950">{p.price}</div>
                  <span className="text-slate-600 text-[9px] font-mono font-black block mt-0.5">{p.limit}</span>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
                <button onClick={() => launchQuotationLetterhead(p)} className="py-2 rounded-lg bg-slate-100 text-slate-950 font-black text-[10px]">{currentContent.gridQuote}</button>
                <button onClick={() => executeRazorpay(p.razorpayUrl)} className="py-2 rounded-lg bg-blue-600 text-white font-black text-[10px]">{currentContent.gridBuy}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-slate-950 py-8 text-center text-slate-400 font-mono text-[10px]">
        <p className="font-bold text-zinc-300 font-sans text-xs">Nexoriva Systems © 2026</p>
        <p className="tracking-wide text-zinc-500 font-sans text-xs">{currentContent.footerCredits}</p>
      </footer>
      <WhatsAppButton />
    </div>
  );
}
