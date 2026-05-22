"use client";

import Contact from "@/components/contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"gold" | "premium" | "standard" | "lite" | "erp9_premium" | "erp9_standard" | "busy">("gold");
  const [quotationData, setQuotationData] = useState<any | null>(null);
  const [modalType, setModalType] = useState<string | null>(null);

  // 100% Accurate English Parameters aligned with uploaded files
  const productData = {
    gold: {
      id: "gold",
      title: "Lekha Flow Gold",
      tagline: "Most Advanced Automation Suite (Premium Advance Edition)",
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
      tagline: "High Efficiency Splitting & Automated Ledger Processing Engine",
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
      tagline: "Core Ledger Sync & Tally Prime Auto Voucher Entry Framework",
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
      tagline: "Baseline Utility - True Copy Snapshot & Excel Template Mapper",
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
      tagline: "Premium Auto Entry Injection Dedicated for Legacy Architectures",
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
      tagline: "Direct Voucher Generation Matrix for Tally ERP9 Ecosystems",
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
      tagline: "Flawless Automated Voucher Generation Framework for BUSY Systems",
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

  const executeRazorpay = (url: string) => {
    window.open(url, "_blank");
  };

  const launchQuotationLetterhead = (product: any) => {
    setQuotationData({
      refNo: `NS/2026/QUOT/${product.id.toUpperCase()}_0522`,
      date: "May 22, 2026",
      name: product.title,
      limit: product.limit,
      price: product.price,
      scope: product.tagline,
      benefits: product.features
    });
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-950 font-sans tracking-tight text-xs selection:bg-blue-600 selection:text-white antialiased">
      
      {/* INTERACTIVE MODAL INTERFACE 1: DYNAMIC LETTERHEAD GENERATOR */}
      {quotationData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border-4 border-double border-slate-400 max-w-2xl w-full p-8 rounded-xl shadow-2xl space-y-6 text-black font-sans relative my-8">
            
            {/* Nexoriva Systems Official Letterhead Top Block */}
            <div className="text-center border-b-2 border-slate-900 pb-4">
              <h2 className="text-2xl font-black tracking-wider text-slate-950">Nexoriva Systems</h2>
              <p className="text-xs font-bold text-blue-600 tracking-wide">"Automating Accuracy, Empowering Accountants"</p>
              <div className="text-[10px] text-slate-900 font-bold mt-1 space-y-0.5">
                <div>Registered MSME (Udyam): <span className="font-extrabold text-black">UDYAM-CG-27-0013072</span></div>
                <div>Office: Surajpur, Chhattisgarh, India | Email: Nexoriva.systems@gmail.com | Web: lekhaflow.in</div>
              </div>
            </div>

            {/* Quotation Identity Fields */}
            <div className="flex justify-between font-mono text-[10px] text-black bg-slate-100 p-2.5 rounded-lg border border-slate-300">
              <div><span className="font-black text-black">Ref No:</span> {quotationData.refNo}</div>
              <div><span className="font-black text-black">Date:</span> {quotationData.date}</div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-black text-slate-600 uppercase tracking-wider">Subject:</div>
              <div className="text-sm font-black text-slate-950">Official Commercial Quotation for LekhaFlow Enterprise Accounting Automation Suite</div>
            </div>

            {/* Structured Parameters Table Matrix */}
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

            {/* Exclusive Benefits Bullet Lists */}
            <div className="space-y-2">
              <div className="text-xs font-black text-slate-950 uppercase tracking-wider">Exclusive Operational System Benefits:</div>
              <ul className="space-y-1.5 text-[11px] text-black pl-0 list-none font-bold">
                <li className="flex items-start gap-2 text-black">✔ <span>UNLIMITED Bank Statement Automated Entry (Tally/Busy) - <span className="text-blue-600 font-extrabold">Included Free</span></span></li>
                {quotationData.benefits.map((b: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-black">✔ <span>{b}</span></li>
                ))}
              </ul>
            </div>

            {/* Corporate Banking Details */}
            <div className="p-3 bg-slate-100 rounded-xl border border-slate-300 space-y-1 text-[10px] font-mono text-black font-bold">
              <div className="font-black text-slate-700 uppercase tracking-wider text-[9px] mb-1">Corporate Bank Wire Parameters:</div>
              <div className="grid grid-cols-2 gap-1.5">
                <div><span className="font-black">Bank Name:</span> Bank of India</div>
                <div><span className="font-black">Account Number:</span> 946110110001194</div>
                <div><span className="font-black">IFSC Code:</span> BKID0009461</div>
                <div><span className="font-black">UPI ID:</span> 8871097310-2@ybl</div>
              </div>
            </div>

            {/* Terms and Sign-off */}
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

            {/* Close Overlay Controller */}
            <button onClick={() => setQuotationData(null)} className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-black rounded-xl transition text-[11px] uppercase tracking-wider">
              Close Letterhead Sheet
            </button>
          </div>
        </div>
      )}

      {/* INTERACTIVE MODAL INTERFACE 2: GENERAL OVERLAY */}
      {modalType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-300 max-w-sm w-full p-5 rounded-2xl text-center space-y-4 shadow-2xl">
            <h4 className="text-slate-950 text-sm font-black border-b border-slate-200 pb-2 capitalize">{modalType.replace(/_/g, " ")}</h4>
            <p className="text-black font-bold text-[11px] leading-relaxed text-left bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono">
              {modalType === "client_login" && "🔒 Connecting securely to cloud validation grid. Please arrange your License.dat file parameters context."}
              {modalType === "product_video" && "🎬 Processing buffer layout stream configuration fields for structural invoice splitting logic walkthrough video."}
            </p>
            <button onClick={() => setModalType(null)} className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition text-[10px]">
              Dismiss Window
            </button>
          </div>
        </div>
      )}

      {/* Header Configuration */}
      <header className="relative z-50 max-w-6xl mx-auto px-4 py-4 flex justify-between items-center border-b border-slate-200 backdrop-blur-md sticky top-0 bg-white/95 shadow-sm">
        <div>
          <div className="text-xl font-black text-slate-950 tracking-wider">
            Lekha<span className="text-blue-600">Flow</span>
          </div>
          <span className="text-[9px] block text-slate-600 font-mono font-black uppercase tracking-wider -mt-0.5">🛡️ MSME Regd: UDYAM-CG-27-0013072</span>
        </div>
        
        <nav className="hidden lg:flex space-x-6 text-slate-950 font-black tracking-wide text-[11px]">
          <a href="#hero" className="hover:text-blue-600 transition">Core Framework</a>
          <a href="#matrix" className="hover:text-blue-600 transition">7 Product Line</a>
          <a href="#pricing" className="hover:text-blue-600 transition">Complete Grid</a>
          <a href="#contact" className="hover:text-blue-600 transition">Intake Form</a>
        </nav>

        <div className="flex space-x-2">
          <button onClick={() => setModalType("client_login")} className="px-3 py-2 font-black rounded-lg bg-slate-100 border border-slate-300 hover:bg-slate-200 text-slate-950 transition text-[10px]">
            🔑 Client Login
          </button>
          <button onClick={() => window.open("https://wa.me/918770808695?text=Hi,%20I%20want%20LekhaFlow%20demo%20and%20pricing%20details.", "_blank")} className="px-3 py-2 font-black rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition text-[10px]">
            📥 Download Installer / Demo
          </button>
        </div>
      </header>

      {/* Hero Presentation */}
      <section id="hero" className="relative z-10 max-w-6xl mx-auto px-4 pt-16 pb-20 grid lg:grid-cols-12 gap-8 items-center">
        <div className="space-y-4 lg:col-span-7">
          <span className="inline-block bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md border border-blue-300 shadow-sm">
            Automating Accuracy, Empowering Accountants
          </span>
          <h1 className="text-3xl md:text-5xl font-black leading-none text-slate-950 tracking-tight">
            High Precision Invoicing Data <br />
            <span className="text-blue-600">Extractors & Split Logic</span>
          </h1>
          <p className="text-black text-sm font-black leading-relaxed max-w-xl">
            LekhaFlow converts manual, fragmented accounting billing routines into machine-driven automation lines. Built using advanced multi-threading schemas, it maps transaction lines directly into corporate target ERP scopes instantly.
          </p>
          
          <div className="flex flex-wrap gap-2.5 pt-2">
            <button onClick={() => window.open("https://wa.me/918770808695", "_blank")} className="px-4 py-3 rounded-xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white hover:opacity-95 shadow-lg shadow-blue-600/30 transition text-[11px]">
              🚀 Start Free Trial & Watch Product Video
            </button>
            <button onClick={() => setModalType("product_video")} className="px-4 py-3 rounded-xl font-black bg-slate-100 border border-slate-300 text-slate-950 hover:bg-slate-200 transition text-[11px]">
              🎬 Product Demo Video
            </button>
          </div>
        </div>

        {/* Local Processing Core Indicator Diagnostics Box */}
        <div className="lg:col-span-5 bg-slate-100 border-2 border-slate-300 p-5 rounded-2xl shadow-md space-y-4 font-mono text-[11px]">
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-300">
            <span className="text-slate-950 font-black text-[10px]">lekhaflow_gui_dashboard.log</span>
            <span className="text-blue-600 font-bold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-[10px]">● CORE PIPELINE ONLINE</span>
          </div>
          
          <div className="space-y-2 bg-white p-3 rounded-xl border border-slate-300 text-slate-950 font-black">
            <div className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Operational Monitor Flags</div>
            <div className="flex justify-between"><span>Splitting Cap Threshold:</span><span className="text-slate-950 font-black">&lt; ₹50,000 / Invoice</span></div>
            <div className="flex justify-between"><span>Random Items Selector:</span><span className="text-blue-600 font-black">1 to 4 Variable Rows</span></div>
            <div className="flex justify-between"><span>Parallel Thread Latency:</span><span className="text-green-600 font-black">20 Active Threads</span></div>
          </div>
        </div>
      </section>

      {/* 7 Products Layout Controller Tab Matrix */}
      <section id="matrix" className="relative z-20 max-w-6xl mx-auto px-4 py-12 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
          <div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">7 Specialized Functional Modules</h2>
            <p className="text-black text-sm font-black">Select any product tab component to analyze specific execution logic algorithms</p>
          </div>
          <span className="text-[10px] font-mono bg-blue-50 border border-blue-200 text-blue-600 uppercase font-black px-3 py-1 rounded-md shadow-sm">
            Active: {productData[activeTab].title}
          </span>
        </div>

        {/* Tab Controls Navigation Row Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 p-1.5 bg-slate-100 rounded-xl border border-slate-300 mb-4 shadow-inner">
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

        {/* Active Tab Focus Monitor Pane Display Box */}
        <div className="bg-slate-100 border-2 border-slate-300 p-6 rounded-2xl shadow-md relative">
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

          {/* SOLID BLACK HIGH-CONTRAST FEATURE POINTS (100% VISIBLE) */}
          <div className="mt-6 space-y-3">
            <div className="text-slate-600 font-mono text-[9px] uppercase tracking-widest font-bold">Explicit Integration Protocols List:</div>
            <div className="grid sm:grid-cols-2 gap-3">
              {productData[activeTab].features.map((feature, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border-2 border-slate-300 text-black font-black text-[12px] flex items-start gap-3 shadow-sm hover:border-blue-500 transition-colors">
                  <span className="text-blue-600 font-black text-sm">✔</span>
                  <span className="leading-relaxed text-black font-black">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RAZORPAY & LETTERHEAD HOOK BUTTON COUPLINGS */}
          <div className="mt-8 pt-5 border-t border-slate-300 flex flex-col sm:flex-row justify-end gap-3">
            <button onClick={() => launchQuotationLetterhead(productData[activeTab])} className="px-5 py-2.5 rounded-xl bg-white border-2 border-slate-400 hover:bg-slate-50 text-slate-950 font-black text-[11px] shadow-sm transition-all">
              📄 Generate Quotation Letterhead
            </button>
            <button onClick={() => executeRazorpay(productData[activeTab].razorpayUrl)} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-black hover:bg-blue-700 shadow-md shadow-blue-600/10 text-[11px] transition-all">
              💳 Buy Now / Pay with Razorpay
            </button>
          </div>
        </div>
      </section>

      {/* Main Table Matrix Sheet Pricing Layout */}
      <section id="pricing" className="relative z-20 max-w-6xl mx-auto px-4 py-12 border-t border-slate-200">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">Full Product Deployment Grid</h2>
          <p className="text-black text-sm font-black mt-1">All subscription configurations come packaged alongside complementary unrestricted bank statement vouchers compilers.</p>
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
                    <span className="bg-yellow-100 text-yellow-700 border border-yellow-300 px-2 py-0.5 rounded text-[8px] uppercase tracking-wide font-black">Most Advanced</span>
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

              {/* Direct Grid Coupling Razorpay + Quotation Integration Links */}
              <div className="mt-6 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
                <button onClick={() => launchQuotationLetterhead(p)} className="py-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-950 font-black text-[10px] transition-colors">
                  Quotation
                </button>
                <button onClick={() => executeRazorpay(p.razorpayUrl)} className="py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] transition-all">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Google Intake Sheet Lead Infrastructure Form Node */}
      <section id="contact" className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-xl mx-auto px-4 pt-12 text-center space-y-1">
          <span className="text-blue-600 font-mono text-[9px] uppercase tracking-widest font-black block">Secure Intake Node</span>
          <h2 className="text-xl font-bold text-slate-950">Submit Your Workflow Specifications</h2>
          <p className="text-slate-950 text-sm font-extrabold text-black">Fill out the detailed form block architecture below. Our expert cloud pipeline synchronization management handlers will reach out immediately.</p>
        </div>
        <Contact />
      </section>

      {/* Footer System Lines */}
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