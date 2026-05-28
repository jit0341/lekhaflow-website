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
      id: "gold", title: "Gold Suite", price: "₹ 18,000", limit: "10,000 Invoices",
      tagline: isHindi ? "सबसे उन्नत स्वचालन सुइट" : "Most Advanced Automation Suite",
      razorpayUrl: "https://pages.razorpay.com/pl_SsiWsxVHOSCM9D/view",
      features: ["Auto Splitting < ₹50k", "Random Item Distribution", "Proportional Asset Allocation", "Machine-lock Security"]
    },
    standard: {
      id: "standard", title: "Standard Sync", price: "₹ 15,000", limit: "5,000 Invoices",
      tagline: isHindi ? "टैली प्राइम कोर सिंक" : "Core Ledger Sync Framework",
      razorpayUrl: "https://pages.razorpay.com/pl_SshDcz10pz7Leq/view",
      features: ["Direct Voucher Entry", "Auto Master Creation", "GSTIN/HSN Metadata", "Invoice Summary Excel"]
    },
    lite: {
      id: "lite", title: "Lite Engine", price: "₹ 10,000", limit: "2,000 Invoices",
      tagline: isHindi ? "एक्सेल डेटा स्नैपशॉट" : "Baseline Excel Mapping Engine",
      razorpayUrl: "https://pages.razorpay.com/pl_StcltseyG0RpGD/view",
      features: ["100% True Copy Excel", "Universal Template Mapper", "Multi-page PDF Parser", "Unlimited Bank Entry"]
    },
    erp9_premium: {
      id: "erp9_premium", title: "ERP9 Premium", price: "₹ 18,000", limit: "10,000 Invoices",
      tagline: isHindi ? "लेगेसी ऑटो एंट्री" : "Premium Entry for Legacy ERP9",
      razorpayUrl: "https://pages.razorpay.com/pl_Ssih9ZXhEh6I0z/view",
      features: ["ERP9 Optimized", "Computational Splits", "Local Data Encryption", "₹50k Security Tags"]
    },
    erp9_standard: {
        id: "erp9_standard", title: "ERP9 Standard", price: "₹ 15,000", limit: "5,000 Invoices",
        tagline: isHindi ? "ERP9 डायरेक्ट जनरेशन" : "Direct Voucher Generation Matrix",
        razorpayUrl: "https://pages.razorpay.com/pl_SsiZhwlw7ppv7j/view",
        features: ["Native ERP9 Scopes", "Background Stock Entities", "Zero Latency Script", "Complimentary Bank Module"]
    }
  };

  const currentContent = {
    heroTitle: isHindi ? "मिनटों में PDF से Tally एंट्री करें" : "Automate Tally Entries in Minutes",
    heroDesc: isHindi ? "मैन्युअल डेटा एंट्री बंद करें। 100% सटीकता के साथ बिल सीधे टैली में डालें।" : "Stop manual data entry. LekhaFlow transforms PDFs into ready-to-import Tally vouchers.",
    guideTitle: isHindi ? "⚙️ सेटअप गाइड" : "⚙️ User Setup Guide",
    steps: [
        isHindi ? "चरण 1: सॉफ़्टवेयर इंस्टॉल करें (D: Drive या Documents में)." : "Step 1: Install software in D: Drive or Documents.",
        isHindi ? "चरण 2: license.dat फ़ाइल को डेटा फ़ोल्डर में डालें।" : "Step 2: Place license.dat in the data folder.",
        isHindi ? "चरण 3: इनवॉइस प्रोसेस करें और आउटपुट फ़ोल्डर चेक करें।" : "Step 3: Process invoices and check the output folder.",
        isHindi ? "चरण 4: Tally में XML फ़ाइलें इम्पोर्ट करें।" : "Step 4: Import XML files into Tally."
    ]
  };

  const triggerIntake = (type: "demo" | "quotation") => {
    setIntakeTarget(type);
    setShowIntakeModal(true);
  };

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowIntakeModal(false);
    if (intakeTarget === "demo") {
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
            benefits: p.features
        });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-amber-500 selection:text-slate-950 antialiased">
      
      {/* 📄 PRINTABLE QUOTATION MODAL */}
      {quotationData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white max-w-2xl w-full p-8 rounded-xl shadow-2xl text-black space-y-6 relative" id="quotation-sheet">
            <button onClick={() => setQuotationData(null)} className="absolute top-4 right-4 no-print text-slate-400 hover:text-black"><X/></button>
            <div className="text-center border-b-2 border-slate-900 pb-4">
              <h2 className="text-2xl font-black">Nexoriva Systems</h2>
              <p className="text-xs font-bold text-blue-600 italic">"Automating Accuracy"</p>
            </div>
            <div className="grid grid-cols-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <div>Ref: {quotationData.refNo}</div>
                <div className="text-right">Date: {quotationData.date}</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-500 font-bold mb-1">PROPOSAL FOR:</p>
                <h3 className="text-lg font-black">{quotationData.clientName}</h3>
                <p className="text-sm font-bold text-slate-700">{quotationData.companyName}</p>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-900 text-white p-3 text-xs font-bold flex justify-between">
                    <span>PRODUCT SPECIFICATION</span>
                    <span>INVESTMENT</span>
                </div>
                <div className="p-4 flex justify-between items-center border-b">
                    <span className="font-bold">{quotationData.name} (Annual License)</span>
                    <span className="text-lg font-black text-blue-600">{quotationData.price}</span>
                </div>
            </div>
            <ul className="text-xs font-medium space-y-2">
                {quotationData.benefits.map((b: any, i: number) => <li key={i}>• {b}</li>)}
            </ul>
            <div className="flex gap-2 no-print">
              <button onClick={() => window.print()} className="flex-1 py-3 bg-blue-600 text-white font-black rounded-xl flex items-center justify-center gap-2"><Printer size={18}/> PRINT QUOTATION</button>
            </div>
          </div>
        </div>
      )}

      {/* 📱 1. MOBILE DASHBOARD VIEW (md:hidden) */}
      <div className="md:hidden flex flex-col min-h-screen bg-slate-50 text-slate-900">
        <div className="bg-[#1e3a8a] p-6 text-white rounded-b-[2.5rem] shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-black tracking-tighter">LekhaFlow GO</h1>
            <button onClick={() => setIsHindi(!isHindi)} className="text-[10px] font-bold border border-white/30 px-3 py-1 rounded-full bg-white/10">
              {isHindi ? "English" : "हिंदी"}
            </button>
          </div>
          <p className="text-teal-400 text-sm font-bold italic">Scanner & Cloud Sync Active</p>
        </div>

        <div className="p-4 -mt-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center active:scale-95 transition-all">
              <div className="bg-teal-50 p-4 rounded-full mb-3 text-teal-600"><Camera /></div>
              <span className="font-bold text-slate-800 text-xs">Scan Invoice</span>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center active:scale-95 transition-all">
              <div className="bg-blue-50 p-4 rounded-full mb-3 text-blue-600"><Key /></div>
              <span className="font-bold text-slate-800 text-xs">License Key</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-md border border-blue-100">
            <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2"><Activity size={18}/> Usage Analytics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1 uppercase text-slate-500">
                  <span>Free Trial Progress</span>
                  <span>Day 3/7</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[40%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1e3a8a] p-6 rounded-[2rem] text-white flex justify-between items-center shadow-lg">
            <div>
              <p className="text-[10px] font-bold text-teal-400 uppercase">Desktop Version</p>
              <h4 className="text-sm font-black">Download EXE Setup</h4>
            </div>
            <Link href={downloadRoutes[activeTab]} className="bg-teal-500 p-3 rounded-xl shadow-lg"><DownloadCloud /></Link>
          </div>

          {/* Quick Setup for Mobile Users */}
          <div className="space-y-3">
             <h4 className="font-black text-slate-400 text-[10px] uppercase px-2">Setup Guide</h4>
             {currentContent.steps.map((s, i) => (
                 <div key={i} className="bg-white p-4 rounded-2xl text-[11px] font-bold border border-slate-100">{s}</div>
             ))}
          </div>
        </div>
      </div>

      {/* 💻 2. FULL DESKTOP MARKETING VIEW (hidden md:block) */}
      <div className="hidden md:block">
        <header className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center border-b border-slate-800 bg-slate-950/95 sticky top-0 z-50">
            <div className="text-xl font-black text-white tracking-wider">LEKHA<span className="text-amber-500">FLOW</span></div>
            <nav className="flex space-x-8 text-slate-300 font-black text-[11px] uppercase tracking-widest">
                <Link href="#hero" className="hover:text-amber-400">Home</Link>
                <Link href="#pricing" className="hover:text-amber-400">Software Variants</Link>
                <Link href="#how-it-works" className="hover:text-amber-400">Setup Guide</Link>
                <Link href="#contact" className="hover:text-amber-400">Contact</Link>
                <button onClick={() => setIsHindi(!isHindi)} className="text-amber-500 border border-amber-500/30 px-2 rounded">{isHindi ? "EN" : "HI"}</button>
            </nav>
            <button onClick={() => triggerIntake("demo")} className="bg-amber-500 text-slate-950 px-4 py-2 rounded-lg font-black text-[10px] uppercase">Download Installer</button>
        </header>

        {/* HERO */}
        <section id="hero" className="max-w-6xl mx-auto px-4 py-32 text-center">
            <h1 className="text-7xl font-black text-white leading-tight tracking-tighter">
                {currentContent.heroTitle.split(' ').map((word, i) => i === 3 ? <span key={i} className="text-amber-500">{word} </span> : word + ' ')}
            </h1>
            <p className="text-slate-400 mt-8 max-w-2xl mx-auto text-xl font-medium">
                {currentContent.heroDesc}
            </p>
            <div className="mt-12 flex justify-center gap-6">
                <button onClick={() => triggerIntake("demo")} className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-amber-500 transition-all">Start Free Trial</button>
                <Link href="/gallery" className="border-2 border-slate-800 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center gap-2">Watch Demo</Link>
            </div>
        </section>

        {/* MATRIX / PRICING */}
        <section id="pricing" className="max-w-6xl mx-auto px-4 py-24 border-t border-slate-900">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-black text-white uppercase">{isHindi ? "सॉफ़्टवेयर वेरिएंट चुनें" : "Select Your Edition"}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(productData).slice(0,3).map(([key, item]) => (
                    <div key={key} className={`bg-slate-900/40 border p-8 rounded-[2.5rem] transition-all group ${activeTab === key ? 'border-amber-500 ring-4 ring-amber-500/10' : 'border-slate-800'}`}>
                        <h3 className="text-2xl font-black mb-2">{item.title}</h3>
                        <p className="text-amber-400 font-bold text-xs mb-4 uppercase tracking-widest">{item.tagline}</p>
                        <p className="text-white font-black text-3xl mb-6">{item.price}</p>
                        <ul className="space-y-4 text-slate-400 font-bold text-sm mb-8 min-h-[150px]">
                            {item.features.map((f, i) => <li key={i} className="flex items-start gap-2"><CheckCircle2 className="text-teal-400 shrink-0" size={16}/> {f}</li>)}
                        </ul>
                        <div className="grid grid-cols-2 gap-2">
                           <button onClick={() => triggerIntake("quotation")} className="py-3 bg-slate-800 rounded-xl font-black uppercase text-[10px] hover:bg-slate-700 transition-all">Get Quote</button>
                           <a href={item.razorpayUrl} target="_blank" className="py-3 bg-amber-500 text-slate-950 rounded-xl font-black uppercase text-[10px] text-center">Buy Now</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* SETUP GUIDE */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-4 py-24 border-t border-slate-900">
            <div className="bg-slate-900/50 p-12 rounded-[3rem] border border-slate-800">
                <h3 className="text-3xl font-black text-white mb-10">{currentContent.guideTitle}</h3>
                <div className="grid grid-cols-2 gap-8">
                    {currentContent.steps.map((s, i) => (
                        <div key={i} className="flex gap-4 items-start">
                            <span className="bg-amber-500 text-slate-950 font-black px-3 py-1 rounded-lg text-sm">{i+1}</span>
                            <p className="text-slate-300 font-bold text-sm leading-relaxed">{s}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-32 bg-slate-900/20 border-t border-slate-900">
            <div className="max-w-xl mx-auto text-center mb-16">
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{isHindi ? "संपर्क करें" : "Submit Requirements"}</h2>
                <p className="text-slate-500 mt-4 font-bold">Our engineering desk will contact you shortly.</p>
            </div>
            <Contact isHindi={isHindi} />
        </section>

        <footer className="py-16 border-t border-slate-900 text-center">
            <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em]">Nexoriva Systems © 2026 | Developed by Jitendra Bharti</p>
        </footer>
      </div>

      {/* 📥 INTAKE MODAL (Common for Demo/Quote) */}
      {showIntakeModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md w-full relative">
                <button onClick={() => setShowIntakeModal(false)} className="absolute top-4 right-4 text-slate-500"><X/></button>
                <h3 className="text-xl font-black text-white mb-6 uppercase tracking-widest text-center">
                    {intakeTarget === "demo" ? "Request Trial Setup" : "Generate Official Quote"}
                </h3>
                <form onSubmit={handleIntakeSubmit} className="space-y-4">
                    <input required placeholder="Your Name" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white font-bold" onChange={(e) => setClientForm({...clientForm, clientName: e.target.value})}/>
                    <input required placeholder="Company Name" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white font-bold" onChange={(e) => setClientForm({...clientForm, companyName: e.target.value})}/>
                    <input required placeholder="WhatsApp Number" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white font-bold" onChange={(e) => setClientForm({...clientForm, mobileNumber: e.target.value})}/>
                    <button type="submit" className="w-full py-4 bg-amber-500 text-slate-950 font-black rounded-xl uppercase tracking-widest">
                        {intakeTarget === "demo" ? "Download Now" : "Create Quotation"}
                    </button>
                </form>
            </div>
        </div>
      )}

      <WhatsAppButton />
    </div>
  );
}