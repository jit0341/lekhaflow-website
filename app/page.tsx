"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Camera, Key, Activity, DownloadCloud, Zap, Crown, 
  Building2, CheckCircle2, ChevronDown, Printer, X, MessageCircle 
} from "lucide-react";
import Contact from "@/components/contact";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  // 1. ALL STATES
  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"gold" | "standard" | "lite" | "erp9_premium" | "erp9_standard">("gold");
  const [quotationData, setQuotationData] = useState<any | null>(null);
  const [showIntakeModal, setShowIntakeModal] = useState<boolean>(false);
  const [intakeTarget, setIntakeTarget] = useState<"demo" | "quotation">("demo");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [clientForm, setClientForm] = useState({ clientName: "", companyName: "", mobileNumber: "", clientEmail: "" });

  useEffect(() => {
    document.title = "LekhaFlow | Premium Tally & BUSY Automation Platform";
  }, []);

  // 2. CONSTANTS
  const WHATSAPP_LINK = "https://wa.me/918770808695";

  const downloadRoutes = {
    gold: "https://www.dropbox.com/scl/fi/tyv7sepqejvkvfn7mjvzq/Lekhaflow_Gold_setup.rar?dl=1",
    standard: "https://www.dropbox.com/scl/fi/8pqk5mvruopj1wzhmfi0d/Lekhaflow_Standard_setup.rar?dl=1",
    lite: "https://www.dropbox.com/scl/fi/i49mnsm6z2x97n3vivvs7/LekhaFlow_LITE_setup.rar?dl=1",
    erp9_premium: "https://www.dropbox.com/scl/fi/3uby3jvlhd2gcqjwkbpo2/Lekhaflow_ERP9_Premium_setup.rar?dl=1",
    erp9_standard: "https://www.dropbox.com/scl/fi/kmd3tbus1feicyt9zr5lb/LekhaFlow_ERP9_Standard_setup.rar?dl=1"
  };

  const productData = {
    gold: {
      id: "gold", title: "LekhaFlow Gold Suite", price: "₹ 18,000 / Year", limit: "10,000 Invoices",
      tagline: isHindi ? "सबसे उन्नत स्वचालन सुइट" : "Most Advanced Automation Suite",
      razorpayUrl: "https://pages.razorpay.com/pl_SsiWsxVHOSCM9D/view",
      features: ["Auto Splitting < ₹50k", "Random Item Distribution", "Proportional Asset Allocation", "Machine-lock Security", "Unlimited Bank Entry"]
    },
    standard: {
      id: "standard", title: "LekhaFlow Standard Sync", price: "₹ 15,000 / Year", limit: "5,000 Invoices",
      tagline: isHindi ? "टैली प्राइम ऑटो वाउचर एंट्री" : "Core Ledger Sync Framework",
      razorpayUrl: "https://pages.razorpay.com/pl_SshDcz10pz7Leq/view",
      features: ["Direct Voucher Entry", "Auto Master Creation", "GSTIN/HSN Metadata", "Invoice Summary Excel", "Bank Statement Parser"]
    },
    lite: {
      id: "lite", title: "LekhaFlow Lite Engine", price: "₹ 10,000 / Year", limit: "2,000 Invoices",
      tagline: isHindi ? "Baseline एक्सेल डेटा स्नैपशॉट" : "Excel Template Mapper Utility",
      razorpayUrl: "https://pages.razorpay.com/pl_StcltseyG0RpGD/view",
      features: ["100% True Copy Excel", "Universal Template Mapper", "Invoice Summary Sheets", "Multi-page PDF Parser"]
    },
    erp9_premium: {
      id: "erp9_premium", title: "Tally ERP9 Premium", price: "₹ 18,000 / Year", limit: "10,000 Invoices",
      tagline: isHindi ? "लेगेसी ऑटो एंट्री इंजेक्शन" : "Premium Entry for Tally ERP9",
      razorpayUrl: "https://pages.razorpay.com/pl_Ssih9ZXhEh6I0z/view",
      features: ["ERP9 Optimized Pipeline", "Voucher Computational Splits", "Local Data Encryption", "₹50k Safety Threshold"]
    },
    erp9_standard: {
      id: "erp9_standard", title: "Tally ERP9 Standard", price: "₹ 15,000 / Year", limit: "5,000 Invoices",
      tagline: isHindi ? "ERP9 डायरेक्ट जनरेशन मैट्रिक्स" : "Direct Voucher Generation for ERP9",
      razorpayUrl: "https://pages.razorpay.com/pl_SsiZhwlw7ppv7j/view",
      features: ["Mirror ERP9 Context", "Background Stock Entities", "Low Footprint Script", "Summary Documentation"]
    }
  };

  const content = {
    en: {
        heroTitle: "Automate Tally Entries from PDF & Excel in Minutes",
        heroDesc: "Stop manual entries. LekhaFlow converts invoices and bank statements into ready-to-import Tally vouchers with 100% accuracy.",
        guideTitle: "⚙️ User Setup Guide",
        steps: [
            "Step 1: Install Software & Folder Structure (D: Drive or Documents).",
            "Step 2: Activate License (Paste license.dat in LekhaFlow data folder).",
            "Step 3: Run Processing Engine (Generate XML files).",
            "Step 4: Import Masters & Transactions into Tally."
        ],
        buyBtn: "💳 Buy Now",
        quoteBtn: "📄 Quotation"
    },
    hi: {
        heroTitle: "PDF और Excel से Tally एंट्री करें, मिनटों में!",
        heroDesc: "मैन्युअल डेटा एंट्री बंद करें। लेखाफ्लो आपके बिलों और बैंक स्टेटमेंट्स को सीधे टैली में इम्पोर्ट होने वाले वाउचर में बदल देता है।",
        guideTitle: "⚙️ यूज़र सेटअप गाइड",
        steps: [
            "चरण 1: सॉफ़्टवेयर इंस्टॉल करें (D: Drive या Documents फ़ोल्डर में)।",
            "चरण 2: लाइसेंस फ़ाइल डालें (license.dat को डेटा फ़ोल्डर में पेस्ट करें)।",
            "चरण 3: इनवॉइस प्रोसेस करें (XML फ़ाइलें जनरेट करें)।",
            "चरण 4: Tally में मास्टर और ट्रांजेक्शन इम्पोर्ट करें।"
        ],
        buyBtn: "💳 अभी खरीदें",
        quoteBtn: "📄 कोटेशन"
    }
  };

  const currentContent = isHindi ? content.hi : content.en;

  // 3. CORE FUNCTIONS (Fixed placement for Scope)
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

  const triggerIntake = (type: "demo" | "quotation") => {
    setIntakeTarget(type);
    setShowIntakeModal(true);
  };

  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowIntakeModal(false);
    if (intakeTarget === "demo") {
        const textGuides = {
            hindi: `सेटअप स्टेप्स:\n${content.hi.steps.join("\n")}`,
            english: `Setup Steps:\n${content.en.steps.join("\n")}`
        };
        triggerTxtDownload("Guide_Hindi.txt", textGuides.hindi);
        triggerTxtDownload("Guide_English.txt", textGuides.english);
        window.open(downloadRoutes[activeTab], "_blank");
    } else {
      const p = productData[activeTab];
      setQuotationData({
        refNo: `NS/2026/QUOT/${p.id.toUpperCase()}`,
        date: new Date().toLocaleDateString(),
        name: p.title,
        price: p.price,
        clientName: clientForm.clientName,
        companyName: clientForm.companyName,
        mobileNumber: clientForm.mobileNumber,
        benefits: p.features
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-amber-500 selection:text-slate-950 antialiased">
      
      {/* 📱 1. MOBILE APP DASHBOARD (Visible only on Mobile) */}
      <div className="md:hidden flex flex-col min-h-screen bg-slate-50 text-slate-900">
        <div className="bg-[#1e3a8a] p-6 text-white rounded-b-[2.5rem] shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-black tracking-tighter">LekhaFlow GO</h1>
            <button onClick={() => setIsHindi(!isHindi)} className="text-[10px] font-bold border border-white/20 px-3 py-1 rounded-full bg-white/10 uppercase">
              {isHindi ? "English" : "हिंदी"}
            </button>
          </div>
          <p className="text-teal-400 text-sm font-bold italic">Cloud AI Sync: Active</p>
        </div>

        <div className="p-4 -mt-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center active:scale-95 transition-all cursor-pointer">
              <Camera className="text-teal-600 mb-3" />
              <span className="font-bold text-slate-800 text-xs uppercase tracking-widest">Scan</span>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center active:scale-95 transition-all cursor-pointer">
              <Key className="text-blue-600 mb-3" />
              <span className="font-bold text-slate-800 text-xs uppercase tracking-widest">License</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-md border border-blue-100">
            <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2 uppercase text-[10px] tracking-widest text-slate-500">Analytics</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-bold">
                <span>Free Trial Progress</span>
                <span>Active</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[60%]" />
              </div>
            </div>
          </div>

          <div className="bg-[#1e3a8a] p-6 rounded-[2rem] text-white flex justify-between items-center shadow-lg">
            <div>
              <p className="text-[9px] font-black text-teal-400 uppercase tracking-widest mb-1">Get Desktop Version</p>
              <h4 className="text-xs font-black">Download EXE Installer</h4>
            </div>
            <button onClick={() => triggerIntake("demo")} className="bg-teal-500 p-3 rounded-xl shadow-lg hover:scale-105 transition-transform"><DownloadCloud /></button>
          </div>

          <div className="space-y-3">
             <h4 className="font-black text-slate-400 text-[10px] uppercase px-2">Setup Guide</h4>
             {currentContent.steps.map((s, i) => (
                 <div key={i} className="bg-white p-4 rounded-2xl text-[11px] font-bold border border-slate-100 shadow-sm">{s}</div>
             ))}
          </div>
        </div>
      </div>

      {/* 💻 2. FULL DESKTOP MARKETING SITE (Visible only on Desktop) */}
      <div className="hidden md:block">
        <header className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center border-b border-slate-800 bg-slate-950/95 sticky top-0 z-50">
          <div className="text-xl font-black text-white tracking-wider uppercase">Lekha<span className="text-amber-500">Flow</span></div>
          <nav className="flex space-x-8 text-slate-300 font-black text-[11px] uppercase tracking-widest">
            <Link href="#hero" className="hover:text-amber-400">Home</Link>
            <div className="relative group cursor-pointer">
                <button className="hover:text-amber-400 flex items-center gap-1 font-black uppercase">Variants <ChevronDown size={12}/></button>
                <div className="absolute top-full -left-4 w-48 bg-slate-900 border border-slate-800 rounded-xl p-2 hidden group-hover:block shadow-2xl">
                    {Object.values(productData).map(p => <button key={p.id} onClick={() => setActiveTab(p.id as any)} className="w-full text-left p-2 hover:bg-slate-800 rounded text-xs font-bold text-slate-300 hover:text-amber-400">{p.title}</button>)}
                </div>
            </div>
            <Link href="#pricing" className="hover:text-amber-400">Pricing Matrix</Link>
            <Link href="#how-it-works" className="hover:text-amber-400">Setup Guide</Link>
            <button onClick={() => setIsHindi(!isHindi)} className="text-amber-500 border border-amber-500/30 px-2 rounded font-black text-[9px] uppercase">{isHindi ? "English" : "हिंदी"}</button>
          </nav>
          <button onClick={() => triggerIntake("demo")} className="bg-amber-500 text-slate-950 px-4 py-2 rounded-lg font-black text-[10px] uppercase shadow-lg hover:bg-amber-600 transition-all">Download Installer</button>
        </header>

        {/* HERO SECTION */}
        <section id="hero" className="max-w-6xl mx-auto px-4 py-24 flex flex-col items-center text-center">
            <div className="bg-amber-500/10 text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-amber-500/20 mb-8">
                ⚡ Premium Tally & BUSY Automation
            </div>
            <h1 className="text-7xl font-black text-white leading-tight tracking-tighter max-w-4xl">
                {currentContent.heroTitle}
            </h1>
            <p className="text-slate-400 mt-8 max-w-2xl text-xl font-medium leading-relaxed">
                {currentContent.heroDesc}
            </p>
            <div className="mt-12 flex gap-6">
                <button onClick={() => triggerIntake("demo")} className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-amber-500 transition-all shadow-xl">Start Free Trial</button>
                <Link href="/gallery" className="border-2 border-slate-800 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center gap-2">Watch Dashboard</Link>
            </div>
        </section>

        {/* PRICING MATRIX */}
        <section id="pricing" className="max-w-6xl mx-auto px-4 py-24 border-t border-slate-900">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Compare Deployment Matrix</h2>
                <p className="text-slate-500 font-bold">Select the edition optimized for your environment.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {Object.entries(productData).map(([key, item]) => (
                    <div key={key} className={`bg-gradient-to-b from-slate-900 to-slate-950 border p-5 rounded-[2rem] flex flex-col justify-between transition-all group ${activeTab === key ? 'border-amber-500 ring-4 ring-amber-500/5 shadow-2xl' : 'border-slate-800 hover:border-slate-700 shadow-lg'}`}>
                        <div className="space-y-4">
                            <h3 className="text-white font-black group-hover:text-amber-400 text-sm tracking-tight transition-colors">{item.title}</h3>
                            <div className="py-3 border-y border-slate-800/60">
                                <p className="text-amber-500 font-black text-xl tracking-tighter">{item.price}</p>
                                <span className="text-[10px] text-slate-500 font-bold uppercase">{item.limit}</span>
                            </div>
                            <ul className="space-y-3 text-slate-400 font-bold text-[10px] min-h-[140px]">
                                {item.features.slice(0,4).map((f, i) => <li key={i} className="flex items-start gap-2 leading-snug tracking-tighter">▪ {f}</li>)}
                            </ul>
                        </div>
                        <div className="mt-6 space-y-2">
                           <button onClick={() => { setActiveTab(key as any); triggerIntake("quotation"); }} className="w-full py-3 bg-slate-950 border border-slate-800 rounded-xl font-black uppercase text-[9px] hover:bg-slate-900 transition-all text-white tracking-widest">{currentContent.quoteBtn}</button>
                           <a href={item.razorpayUrl} target="_blank" rel="noreferrer" className="block w-full py-3 bg-amber-500 text-slate-950 rounded-xl font-black uppercase text-[9px] text-center tracking-widest shadow-md hover:bg-amber-600">{currentContent.buyBtn}</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="max-w-6xl mx-auto px-4 py-24 border-t border-slate-900">
            <h2 className="text-2xl font-black text-white text-center mb-12 uppercase tracking-widest">Manual Clerical Entries vs. LekhaFlow AI</h2>
            <div className="overflow-hidden border border-slate-800 rounded-3xl bg-slate-900/20">
                <table className="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr className="bg-slate-900 border-b border-slate-800 font-black text-white uppercase tracking-widest">
                            <th className="p-5">Performance Metric</th>
                            <th className="p-5 text-red-500">Clerical Staff</th>
                            <th className="p-5 text-emerald-400">LekhaFlow Suite</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-bold text-slate-300">
                        <tr><td className="p-5 text-white">Entry Speed</td><td className="p-5">3 Mins / Invoice</td><td className="p-5 text-amber-400">⚡ 10 Seconds / Invoice</td></tr>
                        <tr><td className="p-5 text-white">Compliance Risk</td><td className="p-5">High (Human Error)</td><td className="p-5 text-emerald-400">🔒 0% (Strict AI Rules)</td></tr>
                        <tr><td className="p-5 text-white">Bulk Batches</td><td className="p-5">Manual Selection</td><td className="p-5 text-teal-400">🚀 Unlimited Parallel Processing</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        {/* SETUP GUIDE */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-4 py-24 border-t border-slate-900">
            <div className="bg-slate-900/50 p-12 rounded-[3.5rem] border-2 border-slate-800">
                <h3 className="text-3xl font-black text-white mb-10 flex items-center gap-4">{currentContent.guideTitle}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {currentContent.steps.map((s, i) => (
                        <div key={i} className="flex gap-5 items-start">
                            <span className="bg-amber-500 text-slate-950 font-black h-8 w-8 flex items-center justify-center rounded-xl text-sm shrink-0">{i+1}</span>
                            <div className="space-y-1">
                                <p className="text-slate-200 font-black text-sm uppercase tracking-wide">Protocol Step</p>
                                <p className="text-slate-400 font-bold text-sm leading-relaxed">{s}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 bg-slate-900/20 border-t border-slate-900">
            <div className="max-w-xl mx-auto text-center mb-16">
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{isHindi ? "सम्पर्क विवरण सबमिट करें" : "Submit Specifications"}</h2>
                <p className="text-slate-500 mt-4 font-bold">Our engineering desk will contact you within 24 hours.</p>
            </div>
            <Contact isHindi={isHindi} />
        </section>

        <footer className="py-16 border-t border-slate-900 text-center">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Nexoriva Systems © 2026 | Developed by Jitendra Bharti</p>
        </footer>
      </div>

      {/* 📥 DYNAMIC INTAKE MODAL */}
      {showIntakeModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
            <div className="bg-slate-900 border-2 border-slate-800 p-10 rounded-[3rem] max-w-md w-full relative shadow-2xl">
                <button onClick={() => setShowIntakeModal(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"><X size={24}/></button>
                <div className="text-center space-y-2 mb-8">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                        {intakeTarget === "demo" ? "Authorize Setup" : "Official Quote"}
                    </h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Enter Credentials to proceed</p>
                </div>
                <form onSubmit={handleIntakeSubmit} className="space-y-5">
                    <input required placeholder="Contact Person Name" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white font-bold text-sm focus:border-amber-500 outline-none transition-all" onChange={(e) => setClientForm({...clientForm, clientName: e.target.value})}/>
                    <input required placeholder="Firm / Company Name" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white font-bold text-sm focus:border-amber-500 outline-none transition-all" onChange={(e) => setClientForm({...clientForm, companyName: e.target.value})}/>
                    <input required placeholder="WhatsApp Contact Number" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white font-bold text-sm focus:border-amber-500 outline-none transition-all" onChange={(e) => setClientForm({...clientForm, mobileNumber: e.target.value})}/>
                    <button type="submit" className="w-full py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black rounded-2xl uppercase tracking-[0.2em] shadow-lg hover:scale-[1.02] transition-transform">
                        {intakeTarget === "demo" ? "Download Setup" : "Get Quotation"}
                    </button>
                </form>
            </div>
        </div>
      )}

      {/* 📄 PRINTABLE QUOTATION LAYOUT */}
      {quotationData && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border-[10px] border-double border-slate-300 max-w-2xl w-full p-12 rounded-xl shadow-2xl space-y-8 text-black relative my-8" id="quotation-sheet">
            <button onClick={() => setQuotationData(null)} className="absolute top-4 right-4 no-print text-slate-400 hover:text-black"><X/></button>
            
            <div className="flex justify-between items-start border-b-4 border-slate-950 pb-6">
               <div>
                  <h2 className="text-3xl font-black tracking-tighter text-slate-950 uppercase">Nexoriva Systems</h2>
                  <p className="text-[10px] font-black text-blue-700 tracking-[0.2em] uppercase">MSME: UDYAM-CG-27-0013072</p>
               </div>
               <div className="text-right font-mono text-[10px] font-bold uppercase">
                  <div>Ref: {quotationData.refNo}</div>
                  <div>Date: {quotationData.date}</div>
               </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-100 p-5 rounded-2xl border border-slate-200">
                <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Prepared For:</p>
                <h3 className="text-xl font-black text-slate-950 uppercase tracking-tighter">{quotationData.clientName}</h3>
                <p className="text-sm font-bold text-slate-700">M/S {quotationData.companyName}</p>
                <p className="text-[10px] font-bold text-slate-500 mt-1">Contact: {quotationData.mobileNumber}</p>
              </div>

              <div className="overflow-hidden border-2 border-slate-950 rounded-2xl">
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-white font-black uppercase tracking-widest">
                      <th className="p-4 border-r border-slate-800">Deployment Logic</th>
                      <th className="p-4 text-right">Investment Amount</th>
                    </tr>
                  </thead>
                  <tbody className="font-bold text-slate-900">
                    <tr className="border-b-2 border-slate-100">
                      <td className="p-4 border-r border-slate-100">{quotationData.name} (Annual License)</td>
                      <td className="p-4 text-right text-lg font-black text-blue-700">{quotationData.price}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-3">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-sans">Included Professional Modules:</h4>
               <ul className="grid grid-cols-1 gap-2">
                  {quotationData.benefits.map((b: any, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-[11px] font-bold">
                        <span className="text-emerald-600 font-black">✔</span> {b}
                    </li>
                  ))}
               </ul>
            </div>

            <div className="pt-10 border-t border-slate-200 flex justify-between items-end">
                <div className="text-[9px] font-bold text-slate-400 uppercase leading-tight font-sans">
                    Digitally Authorized Document<br/>System Mandate ID Verified
                </div>
                <div className="text-center font-sans">
                    <div className="w-32 h-1 bg-slate-950 mb-2 mx-auto"></div>
                    <p className="text-[10px] font-black uppercase tracking-widest">Authorised Official</p>
                    <p className="text-[8px] font-bold text-slate-500">Nexoriva AI Systems Desk</p>
                </div>
            </div>

            <div className="flex gap-4 pt-6 no-print">
              <button onClick={() => window.print()} className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                <Printer size={20}/> Save as PDF / Print
              </button>
              <button onClick={() => setQuotationData(null)} className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all uppercase text-[10px] tracking-widest">Close Layout</button>
            </div>
          </div>
        </div>
      )}

      <WhatsAppButton />
    </div>
  );
}