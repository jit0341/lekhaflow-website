"use client";

import Contact from "@/components/contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState, useEffect } from "react";

export default function Home() {
  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"gold" | "standard" | "lite" | "erp9_premium" | "erp9_standard">("gold");
  const [quotationData, setQuotationData] = useState<any | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  
  // Unified Intake Modal States
  const [showIntakeModal, setShowIntakeModal] = useState<boolean>(false);
  const [intakeTarget, setIntakeTarget] = useState<"demo" | "quotation">("demo");
  
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

  // 🚀 DROPBOX DIRECT DOWNLOAD STORAGE ROUTER (dl=1 Forced)
  const downloadRoutes = {
    gold: "https://www.dropbox.com/scl/fi/tyv7sepqejvkvfn7mjvzq/Lekhaflow_Gold_setup.rar?rlkey=w0cows2xjd6ln0xq8gdkx7p13&st=xgrsgy1d&dl=1",
    standard: "https://www.dropbox.com/scl/fi/8pqk5mvruopj1wzhmfi0d/Lekhaflow_Standard_setup.rar?rlkey=9vdr69llvgodt4022vsx38e88&st=ts7yxvi2&dl=1",
    lite: "https://www.dropbox.com/scl/fi/i49mnsm6z2x97n3vivvs7/LekhaFlow_LITE_setup.rar?rlkey=o3gnsq6mhfmf68xc95ni1s1rn&st=3kwqqh5z&dl=1",
    erp9_premium: "https://www.dropbox.com/scl/fi/3uby3jvlhd2gcqjwkbpo2/Lekhaflow_ERP9_Premium_setup.rar?rlkey=39i3f5mwt146tzitow7klnyna&st=z4nw4nbm&dl=1",
    erp9_standard: "https://www.dropbox.com/scl/fi/kmd3tbus1feicyt9zr5lb/LekhaFlow_ERP9_Standard_setup.rar?rlkey=79r07zew1hjftwqogwptp9drr&st=tdyb0j07&dl=1"
  };

  // 🚀 100% CORRECTED HIGHER-CONVERSION ENTERPRISE DICTIONARY (Blunders 1, 2, and 3 Completely Resolved)
  const productData = {
    gold: {
      id: "gold",
      title: "LekhaFlow Gold Suite",
      tagline: isHindi ? "सबसे उन्नत स्वचालन सुइट (Tally Prime एडवांस एडिशन)" : "Most Advanced Automation Suite (Tally Prime Advance Edition)",
      price: "₹ 18,000 / Year",
      limit: "10,000 Invoices / Year", // 🎯 FIXED: 10,000 Instead of Unlimited
      compatibility: "Tally Prime Environment",
      razorpayUrl: "https://pages.razorpay.com/pl_SsiWsxVHOSCM9D/view",
      features: [
        "Random splitting of sales invoice amounts strictly below ₹50,000 safety threshold automatically [cite: 256]",
        "Random distribution of items per bill (dynamically assigns 1 to 4 item rows to completely eliminate manual footprint) [cite: 258]",
        "Proportional balanced asset allocation across transaction values and inventory lines safely [cite: 260]",
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
      limit: "10,000 Invoices / Year", [cite: 299]
      compatibility: "Tally Prime Environment", [cite: 297]
      razorpayUrl: "https://pages.razorpay.com/pl_SshDcz10pz7Leq/view",
      features: [
        "Direct automated entry handler for Sales and Purchase vouchers into Tally Prime runtime environment [cite: 301]",
        "Instant background generation of required client Masters, Party Ledgers, and Stock Items instantly [cite: 303]",
        "Automated form population logic fields: State, Country, GSTIN metadata, PAN cards, HSN codes, and GST rates [cite: 305]",
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
      limit: "10,000 Invoices / Year", // 🎯 FIXED: 10,000 Instead of 5,000
      compatibility: "Excel Formatting & Mapping Engine", [cite: 309]
      razorpayUrl: "https://pages.razorpay.com/pl_StcltseyG0RpGD/view",
      features: [
        "Generates a flawless 100% True Copy structural Excel data snapshot from raw target client documents [cite: 313]",
        "Universal Template Mapper capability for immediate auto-fill data injections into custom client formats [cite: 315]",
        "Dynamic automated compilation sequence tracking operational Invoice Summary metrics data sheet safely [cite: 317]",
        "Produces exactly 3 specialized standalone output Excel format sheets per active transaction batch loop",
        "Built-in multi-page isolated PDF parser pipeline framework routing automation system components seamlessly",
        "Complimentary inclusion of Unlimited Tally & BUSY Bank Statement auto-entry utility handler modules"
      ]
    },
    erp9_premium: {
      id: "erp9_premium",
      title: "Tally ERP9 Premium Edition",
      tagline: isHindi ? "लेगेसी इन्फ्रास्ट्रक्चर के लिए समर्पित प्रीमियम ऑटो एंट्री इंजेक्शन" : "Premium Auto Entry Injection Dedicated for Legacy Architectures", [cite: 320]
      price: "₹ 18,000 / Year",
      limit: "10,000 Invoices / Year", // 🎯 FIXED: 10,000 Instead of 25,000
      compatibility: "Tally ERP9 Infrastructure Only", [cite: 321]
      razorpayUrl: "https://pages.razorpay.com/pl_Ssih9ZXhEh6I0z/view",
      features: [
        "Equipped with same robust computational split capabilities as the Tally Prime Premium version pipeline [cite: 325]",
        "Exclusively optimized for seamless native script parsing injections within Tally ERP9 desktop process contexts [cite: 327]",
        "Standalone legacy system adapter environment block separate from standard Prime codebase framework lines [cite: 329]",
        "Sales transaction amount processing logic configured safely underneath standard ₹50,000 security tags",
        "Encrypted local data serialization framework bypass handlers enabled for reliable background injections",
        "Complimentary inclusion of Unlimited Tally & BUSY Bank Statement auto-entry utility handler modules"
      ]
    },
    erp9_standard: {
      id: "erp9_standard",
      title: "Tally ERP9 Standard Edition",
      tagline: isHindi ? "टैली ERP9 इकोसिस्टम के लिए डायरेक्ट वाउचर जनरेशन मैट्रिक्स" : "Direct Voucher Generation Matrix for Tally ERP9 Ecosystems", [cite: 332]
      price: "₹ 15,000 / Year",
      limit: "10,000 Invoices / Year", [cite: 335]
      compatibility: "Tally ERP9 Infrastructure Only", [cite: 333]
      razorpayUrl: "https://pages.razorpay.com/pl_SsiZhwlw7ppv7j/view",
      features: [
        "Mirror feature performance parity parameters matching standard Tally Prime auto-entry models seamlessly [cite: 337]",
        "High fidelity integration pipeline tracking targeting native ERP9 desktop process context scopes flawlessly [cite: 339]",
        "Automated background creation pathways configured for Ledgers, Stock entities, and metadata tax arrays [cite: 341]",
        "Instant validation compilation of corresponding standalone Invoice Summary documentation data sheets",
        "Sleek low footprint computing script running locally with zero latency or network communication delays",
        "Complimentary inclusion of Unlimited Tally & BUSY Bank Statement auto-entry utility handler modules"
      ]
    }
  };

  const triggerIntake = (type: "demo" | "quotation", product?: any) => {
    setIntakeTarget(type);
    if (product) {
      setActiveTab(product.id);
    }
    setShowIntakeModal(true);
  };

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowIntakeModal(false);

    if (intakeTarget === "demo") {
      const dynamicDownloadUrl = downloadRoutes[activeTab] || downloadRoutes.gold;
      window.open(dynamicDownloadUrl, "_blank");
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
              <h2 className="text-2xl font-black tracking-wider text-slate-950">Nexoriva Systems [cite: 372]</h2>
              <p className="text-xs font-bold text-blue-600 tracking-wide">\"Automating Accuracy, Empowering Accountants\" [cite: 223]</p>
              <div className="text-[10px] text-slate-900 font-bold mt-1 space-y-0.5">
                <div>Registered MSME (Udyam): <span className="font-extrabold text-black">UDYAM-CG-27-0013072</span> [cite: 219]</div>
                <div>Office: Surajpur, Chhattisgarh, India | Email: Nexoriva.systems@gmail.com | Web: lekhaflow.in [cite: 383, 385]</div>
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

            <div className="space-y-1">
              <div className="text-xs font-black text-slate-600 uppercase tracking-wider">Subject:</div>
              <div className="text-sm font-black text-slate-950">Official Commercial Quotation for LekhaFlow Enterprise Accounting Automation Suite</div>
            </div>

            <div className="overflow-x-auto border border-slate-300 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-200 border-b border-slate-300 text-slate-950 font-black">
                    <th className="p-3">Specification Target</th>
                    <th className="p-3">Deployment Coverage Parameters</th>
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
                  <tr>
                    <td className="p-3 text-black font-black bg-slate-50">Core System Scope</td>
                    <td className="p-3 text-black">{quotationData.scope}</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="p-3 text-black font-black">Subscription Rate Framework</td>
                    <td className="p-3 text-sm font-extrabold text-blue-700">{quotationData.price}</td>
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
                <div><span className="font-black">Bank Name:</span> Bank of Baroda</div>
                <div><span className="font-black">Account Number:</span> 946110110001194</div>
                <div><span className="font-black">IFSC Code:</span> BARB0SURAJP</div>
                <div><span className="font-black">UPI ID:</span> nexoriva@baroda</div>
              </div>
            </div>

            <div className="flex justify-between items-end pt-4 border-t border-slate-300 text-[10px] text-slate-800 font-bold no-print">
              <div className="space-y-0.5">
                <div>• Software locked securely via local Machine Hardware ID code protocols. [cite: 388]</div>
                <div>• Technical assistance desk remains active across a standard 12-Month pipeline.</div>
              </div>
              <div className="text-center text-slate-950 font-black">
                <div className="text-[9px] text-slate-500 mb-6 font-mono">For, Nexoriva Systems</div>
                <div className="underline border-t border-slate-400 pt-1">Authorized Signatory</div>
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

      {/* 📥 UNIFIED CLIENT INTAKE MODAL FRAMEWORK */}
      {showIntakeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border-2 border-amber-500 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl text-slate-100">
            <div className="text-center">
              <span className="bg-amber-500/10 text-amber-400 font-mono text-[9px] font-black px-2.5 py-1 rounded-md uppercase border border-amber-500/20">
                {intakeTarget === "demo" ? "Secure Installer Node" : "Quotation Engine Pipeline"}
              </span>
              <h3 className="text-base font-black text-white mt-2.5">
                {intakeTarget === "demo" ? "Download LekhaFlow Installer" : `Generate Quotation for ${productData[activeTab].title}`}
              </h3>
              <p className="text-slate-400 text-[10px] mt-0.5 font-medium">Please authorize your credentials to initialize secure pipeline loop token link</p>
            </div>
            
            <form onSubmit={handleIntakeSubmit} className="space-y-3 font-medium">
              <div>
                <label className="text-[9px] font-black text-slate-300 uppercase block mb-1">Your Full Name</label>
                <input type="text" required placeholder="e.g., Jitendra Bharti" value={clientForm.clientName} onChange={(e) => setClientForm({...clientForm, clientName: e.target.value})} className="w-full p-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-bold focus:outline-amber-500" />
              </div>
              <div>
                <label className="text-[9px] font-black text-slate-300 uppercase block mb-1">Firm / Company Name</label>
                <input type="text" required placeholder="e.g., Nexoriva Systems" value={clientForm.companyName} onChange={(e) => setClientForm({...clientForm, companyName: e.target.value})} className="w-full p-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-bold focus:outline-amber-500" />
              </div>
              <div>
                <label className="text-[9px] font-black text-slate-300 uppercase block mb-1">WhatsApp Mobile Number</label>
                <input type="tel" required pattern="[0-9]{10}" placeholder="10-Digit Mobile Number" value={clientForm.mobileNumber} onChange={(e) => setClientForm({...clientForm, mobileNumber: e.target.value})} className="w-full p-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-bold focus:outline-amber-500" />
              </div>
              <div>
                <label className="text-[9px] font-black text-slate-300 uppercase block mb-1">Corporate Email Address</label>
                <input type="email" required placeholder="name@company.com" value={clientForm.clientEmail} onChange={(e) => setClientForm({...clientForm, clientEmail: e.target.value})} className="w-full p-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-bold focus:outline-amber-500" />
              </div>
              
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-xl transition text-[11px] uppercase tracking-wider shadow-md mt-2">
                {intakeTarget === "demo" ? "🚀 Open Secure Download Portal" : "📄 Initialize Customized Letterhead"}
              </button>
            </form>
            <button onClick={() => setShowIntakeModal(false)} className="w-full py-1.5 bg-slate-800 text-slate-400 hover:text-white font-bold rounded-lg text-[10px] transition-colors">Cancel Process</button>
          </div>
        </div>
      )}

      {/* 🔑 CLIENT SECURITY AUTHENTICATION MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border-2 border-amber-500 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl text-slate-100">
            <div className="text-center">
              <h3 className="text-lg font-black text-white tracking-wide">
                {authMode === "signin" ? "Sign In to Dashboard" : "Create Professional Account"}
              </h3>
              <p className="text-slate-400 text-[10px] mt-0.5 font-medium">LekhaFlow Cloud Execution Gateway Platform</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); setShowAuthModal(false); }} className="space-y-3 font-medium">
              {authMode === "signup" && (
                <>
                  <input type="text" required placeholder="Full Name" className="w-full p-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-bold focus:outline-amber-500" />
                  <input type="text" required placeholder="Firm / Company Name" className="w-full p-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-bold focus:outline-amber-500" />
                </>
              )}
              <input type="email" required placeholder="Registered Email Address" className="w-full p-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-bold focus:outline-amber-500" />
              <input type="password" required placeholder="Secure Access Password" className="w-full p-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-bold focus:outline-amber-500" />
              <button type="submit" className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl transition text-[11px] uppercase tracking-wider shadow-md">
                {authMode === "signin" ? "Authenticate Credentials" : "Register and Open Systems"}
              </button>
            </form>
            <div className="text-center pt-2 text-[11px] font-bold text-slate-400">
              {authMode === "signin" ? (
                <p>New to LekhaFlow? <span onClick={() => setAuthMode("signup")} className="text-amber-400 underline cursor-pointer">Create Account here</span></p>
              ) : (
                <p>Already registered? <span onClick={() => setAuthMode("signin")} className="text-amber-400 underline cursor-pointer">Sign In here</span></p>
              )}
            </div>
            <button onClick={() => setShowAuthModal(false)} className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg transition text-[10px]">Cancel</button>
          </div>
        </div>
      )}

      {/* 🌟 PREMIUM DARK SITE HEADER */}
      <header className="relative z-50 max-w-6xl mx-auto px-4 py-4 flex justify-between items-center border-b border-slate-800 backdrop-blur-md sticky top-0 bg-slate-950/95 shadow-lg no-print">
        <div className="flex items-center space-x-6">
          <div>
            <div className="text-xl font-black text-white tracking-wider">
              Lekha<span className="text-amber-500">Flow</span> [cite: 173]
            </div>
            <span className="text-[9px] block text-amber-500/80 font-mono font-bold uppercase tracking-wider -mt-0.5">🛡️ MSME Regd: UDYAM-CG-27-0013072 [cite: 219]</span>
          </div>

          <button onClick={() => setIsHindi(!isHindi)} className="px-2.5 py-1 text-[10px] font-black rounded-md border-2 border-amber-500 bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all shadow-sm">
            🌐 {isHindi ? "English" : "हिंदी"} [cite: 220]
          </button>
        </div>
        
        <nav className="hidden lg:flex space-x-6 text-slate-300 font-black tracking-wide text-[11px]">
          <a href="#hero" className="hover:text-amber-400 transition-colors">{currentContent.navLinks.howItWorks}</a>
          <a href="#matrix" className="hover:text-amber-400 transition-colors">{currentContent.navLinks.modules}</a>
          <a href="#pricing" className="hover:text-amber-400 transition-colors">{currentContent.navLinks.pricing}</a>
          <a href="#contact" className="hover:text-amber-400 transition-colors">{currentContent.navLinks.contact}</a>
        </nav>

        <div className="flex space-x-2">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <span className="bg-green-500/10 text-green-400 font-mono text-[9px] font-black px-2 py-1 rounded border border-green-500/20 uppercase animate-pulse">● Pro Dashboard</span>
              <button onClick={() => setIsLoggedIn(false)} className="px-2.5 py-1.5 font-bold rounded-lg bg-red-500/10 text-red-400 text-[10px] border border-red-500/20 hover:bg-red-500/20 transition">Log Out</button>
            </div>
          ) : (
            <button onClick={() => { setAuthMode("signin"); setShowAuthModal(true); }} className="px-3 py-2 font-black rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white transition text-[10px]">
              🔑 Client Login [cite: 221]
            </button>
          )}
          <button onClick={() => triggerIntake("demo")} className="px-3 py-2 font-black rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 transition text-[10px]">
            📥 Download Installer / Demo [cite: 222]
          </button>
        </div>
      </header>

      {/* 🚀 HERO PIPELINE SECTION */}
      <section id="hero" className="relative z-10 max-w-6xl mx-auto px-4 pt-20 pb-24 grid lg:grid-cols-12 gap-12 items-center no-print">
        <div className="space-y-5 lg:col-span-7">
          <span className="inline-block bg-amber-500/10 text-amber-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md border border-amber-500/20 shadow-sm">
            {currentContent.heroBadge}
          </span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight text-white tracking-tight">
            {currentContent.heroTitle} [cite: 85, 604]
          </h1>
          <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-xl">
            {currentContent.heroDesc} [cite: 225, 226]
          </p>
          
          {/* 🌟 RISK-FREE FREE TRIAL CLEARITY BLOCK */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 max-w-md grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300 font-bold text-[11px]">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 font-black">✔</span>
              <span>7-Day Free Trial [cite: 166, 608]</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 font-black">✔</span>
              <span>No Card Required [cite: 167, 608]</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 font-black">✔</span>
              <span>WhatsApp Support [cite: 168, 608]</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button onClick={() => triggerIntake("demo")} className="px-5 py-3 rounded-xl font-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-xl shadow-amber-500/20 transition text-[11px] uppercase tracking-wider">
              {currentContent.trialBtn} [cite: 227]
            </button>
            <button onClick={() => triggerIntake("demo")} className="px-5 py-3 rounded-xl font-black bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 transition text-[11px] uppercase tracking-wider">
              {currentContent.videoBtn} [cite: 228]
            </button>
          </div>
        </div>

        {/* INTERACTIVE PREVIEW CARD */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-slate-800 p-6 rounded-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-all"></div>
          <div className="flex justify-between items-center pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            </div>
            <span className="text-emerald-400 font-mono font-bold bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-0.5 rounded text-[10px] tracking-wide animate-pulse">● CORE AI PIPELINE ONLINE [cite: 230]</span>
          </div>
          
          <div className="mt-4 space-y-4 font-mono text-[11px]">
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-slate-300 font-medium">
              <div className="text-amber-400 text-[9px] font-black uppercase tracking-wider mb-2">Automated Split Logic Active [cite: 224]</div>
              <div className="flex justify-between py-1 border-b border-slate-900"><span>Splitting Cap Max Boundary:</span><span className="text-white font-bold">&lt; ₹50,000 / Voucher [cite: 232, 233]</span></div>
              <div className="flex justify-between py-1 border-b border-slate-900"><span>Dynamic Row Allocator:</span><span className="text-white font-bold">1 to 4 Item Rows [cite: 234, 235]</span></div>
              <div className="flex justify-between py-1"><span>Data Target Environment:</span><span className="text-amber-400 font-bold">Tally Prime & ERP9 [cite: 226]</span></div>
            </div>

            <div className="p-3.5 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-white font-black">Free Live Demo on WhatsApp [cite: 137, 592]</div>
                <div className="text-slate-400 text-[10px] font-sans mt-0.5 font-medium">Our product experts are just one click away. [cite: 428]</div>
              </div>
              <a href="https://wa.me/918770808695" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-sans font-black shadow-md transition-all uppercase tracking-wider text-[10px] inline-flex items-center">
                Book Demo [cite: 137, 592]
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 📊 SYSTEM MODULES EXECUTOR */}
      <section id="matrix" className="relative z-20 max-w-6xl mx-auto px-4 py-16 border-t border-slate-900 no-print">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">{currentContent.secTitle} [cite: 269]</h2>
            <p className="text-slate-400 text-sm font-medium mt-1">{currentContent.secDesc} [cite: 239, 270]</p>
          </div>
          <span className="text-[10px] font-mono bg-amber-500/5 border border-amber-500/20 text-amber-400 uppercase font-black px-3 py-1.5 rounded-md shadow-md">
            {currentContent.activeText}: {productData[activeTab]?.title}
          </span>
        </div>

        {/* Unified App Variant Tabs Selector */}
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

        {/* Tab Detail Blueprint View */}
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
            <div className="text-slate-400 font-mono text-[9px] uppercase tracking-widest font-black">{currentContent.featureTitle} [cite: 254]</div>
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
              {currentContent.quoteBtn} [cite: 267]
            </button>
            <a 
              href={productData[activeTab]?.razorpayUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[11px] text-center uppercase tracking-wider shadow-lg shadow-amber-500/10 transition-all cursor-pointer"
            >
              {currentContent.buyBtn} [cite: 268]
            </a>
          </div>
        </div>
      </section>

      {/* 📈 COMPARED CONVERSION AUDIT MATRIX */}
      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-slate-900 no-print">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl font-black text-white tracking-tight">Why Choose LekhaFlow Automation Architecture? [cite: 155, 595]</h2>
          <p className="text-slate-400 text-sm font-medium mt-1">Comparing manual slow data entries against our high-speed deterministic AI parsing loops. [cite: 155, 595]</p>
        </div>
        
        <div className="overflow-x-auto border border-slate-800 rounded-2xl shadow-2xl bg-slate-900/20">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 font-black text-white">
                <th className="p-4 text-sm">Operational Parameters [cite: 158]</th>
                <th className="p-4 text-sm text-red-400">Manual Clerical Entries [cite: 158]</th>
                <th className="p-4 text-sm text-amber-400 bg-amber-500/5">LekhaFlow AI Engine [cite: 158]</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-bold text-slate-300 font-sans">
              <tr>
                <td className="p-4 font-black text-white font-sans">Processing Time Bound per Invoice [cite: 159]</td>
                <td className="p-4">~ 3 Minutes (Slow & Human Dependent) [cite: 159, 597]</td>
                <td className="p-4 text-amber-400 font-black bg-amber-500/5 font-sans">⏳ Under 10 Seconds (Rocket Speed) [cite: 159, 598]</td>
              </tr>
              <tr>
                <td className="p-4 font-black text-white font-sans">Human Error & Compliance Risk [cite: 160]</td>
                <td className="p-4 text-red-400">Extremely High Risk Allocation [cite: 160, 597]</td>
                <td className="p-4 text-emerald-400 font-black bg-amber-500/5 font-sans">🔒 0% Risk (Strict Deterministic Loops) [cite: 160, 598]</td>
              </tr>
              <tr>
                <td className="p-4 font-black text-white font-sans">Bulk Batch Processing Capability [cite: 161]</td>
                <td className="p-4">Impossible / Creates Server Hang Issues [cite: 161]</td>
                <td className="p-4 text-amber-400 font-black bg-amber-500/5 font-sans">🚀 20+ Parallel Threads Execution [cite: 161]</td>
              </tr>
              <tr>
                <td className="p-4 font-black text-white font-sans">Accounting Staff Overhead [cite: 60]</td>
                <td className="p-4">Requires Continuous Clerical Workforce [cite: 60]</td>
                <td className="p-4 text-emerald-400 font-black bg-amber-500/5 font-sans">📈 Over 70% Overhead Cost Reduction [cite: 99]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 📋 PRODUCTION GRID MATRIX SUMMARY */}
      <section id="pricing" className="relative z-20 max-w-6xl mx-auto px-4 py-16 border-t border-slate-900 no-print">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl font-black text-white tracking-tight">{currentContent.gridTitle} [cite: 269]</h2>
          <p className="text-slate-400 text-sm font-medium mt-1">{currentContent.gridDesc} [cite: 270]</p>
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
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wide font-black shrink-0">{currentContent.mostAdvanced} [cite: 273]</span>
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
                  {currentContent.gridQuote} [cite: 282]
                </button>
                <a 
                  href={p.razorpayUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[10px] text-center transition-all uppercase tracking-wider cursor-pointer"
                >
                  Buy Now [cite: 283]
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ⚙️ SYSTEM INSTALLATION GUIDE CHRONOLOGY */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 py-16 border-t border-slate-900 bg-slate-900/20 rounded-3xl mb-16 my-6 border-2 border-slate-800/60 no-print">
        <div className="space-y-2 mb-8">
          <h3 className="text-lg font-black text-white tracking-wide">{currentContent.guideTitle} [cite: 356]</h3>
          <p className="text-slate-400 text-xs font-medium">{currentContent.guideDesc} [cite: 357]</p>
        </div>
        <div className="grid md:grid-cols-1 gap-4">
          {currentContent.steps.map((step, idx) => (
            <div key={idx} className="bg-slate-950/40 border border-slate-800 p-4 rounded-xl flex items-start gap-4 shadow-sm hover:border-slate-700 transition-colors">
              <span className="bg-amber-500 text-slate-950 font-mono font-black rounded-full h-6 w-6 flex items-center justify-center text-xs shrink-0">{idx + 1}</span>
              <p className="text-slate-300 font-bold text-[12px] leading-relaxed font-sans">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔒 INBOUND SPECIFICATIONS SECURE NODE */}
      <section id="contact" className="border-t border-slate-900 bg-slate-900/10 no-print">
        <div className="max-w-xl mx-auto px-4 pt-16 text-center space-y-1">
          <span className="text-amber-400 font-mono text-[9px] uppercase tracking-widest font-black block">Secure Intake Node [cite: 369]</span>
          <h2 className="text-xl font-black text-white tracking-wide">{currentContent.contactTitle} [cite: 373, 374]</h2>
          <p className="text-slate-400 text-xs font-medium leading-relaxed">{currentContent.contactDesc} [cite: 370, 375]</p>
        </div>
        <Contact isHindi={isHindi} />
      </section>

      {/* 🛡️ REVENUE BLOCK SYSTEM FOOTER */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900 font-mono text-[10px] text-slate-400 text-center space-y-4 no-print">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 text-left gap-8 pb-8 border-b border-slate-800 font-sans text-slate-400">
          <div>
            <h5 className="text-white font-black text-xs font-sans mb-2 tracking-wide">Corporate HQ [cite: 381]</h5>
            <p className="text-xs leading-relaxed text-slate-400 font-medium">Surajpur, Ambikapur Region,<br />Chhattisgarh, India - 497229 [cite: 382, 383]</p>
          </div>
          <div>
            <h5 className="text-white font-black text-xs font-sans mb-2 tracking-wide">Inquiries Hub [cite: 384]</h5>
            <p className="text-xs leading-relaxed text-slate-400 font-medium">Email: Nexoriva.systems@gmail.com<br />Direct Phone: +91-8770808695 [cite: 385, 386]</p>
          </div>
          <div>
            <h5 className="text-white font-black text-xs font-sans mb-2 tracking-wide">System Mandate [cite: 387]</h5>
            <p className="text-xs leading-relaxed text-slate-400 font-medium">{currentContent.systemMandate} [cite: 388]</p>
          </div>
        </div>
        <p className="font-black text-slate-200 font-sans text-xs tracking-wide">Nexoriva Systems © 2026 [cite: 389]</p>
        <p className="tracking-wide text-slate-500 font-sans text-xs font-medium">{currentContent.footerCredits} [cite: 390]</p>
      </footer>

      <WhatsAppButton />

      {/* 🖨️ CSS PRINTING ENGINE OVERRIDES FOR DYNAMIC PRINT TRACE */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #quotation-sheet, #quotation-sheet * {
            visibility: visible;
            color: #000000 !important;
          }
          #quotation-sheet {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            background: #ffffff !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
