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
  const [showIntakeModal, setShowIntakeModal] = useState<boolean>(false);
  const [intakeTarget, setIntakeTarget] = useState<"demo" | "quotation">("demo");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [clientForm, setClientForm] = useState({ clientName: "", companyName: "", mobileNumber: "", clientEmail: "" });

  useEffect(() => {
    document.title = "LekhaFlow | Premium Tally & BUSY Automation Platform";
  }, []);

  // 2. CONSTANTS & DATA
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
      features: ["Splitting amounts below ₹50,000 safety threshold", "Random distribution of 1 to 4 items per bill", "Proportional balanced asset allocation", "Monthly / Quarterly split management", "Cryptographic machine-lock license node", "Unlimited Bank Statement Entry"]
    },
    standard: {
      id: "standard", title: "LekhaFlow Standard Sync", price: "₹ 15,000 / Year", limit: "5,000 Invoices",
      tagline: isHindi ? "टैली प्राइम ऑटो वाउचर एंट्री" : "Core Ledger Sync Framework",
      razorpayUrl: "https://pages.razorpay.com/pl_SshDcz10pz7Leq/view",
      features: ["Direct automated voucher entry", "Instant Party & Stock Item creation", "Auto GSTIN/PAN/HSN metadata population", "Invoice Summary Excel generation", "Complimentary Bank Entry Module"]
    },
    lite: {
      id: "lite", title: "LekhaFlow Lite Engine", price: "₹ 10,000 / Year", limit: "2,000 Invoices",
      tagline: isHindi ? "एक्सेल डेटा स्नैपशॉट" : "Baseline Excel Mapping Engine",
      razorpayUrl: "https://pages.razorpay.com/pl_StcltseyG0RpGD/view",
      features: ["100% True Copy structural Excel snapshot", "Universal Template Mapper capability", "3 Specialized standalone output formats", "Multi-page PDF parser pipeline"]
    },
    erp9_premium: {
      id: "erp9_premium", title: "Tally ERP9 Premium", price: "₹ 18,000 / Year", limit: "10,000 Invoices",
      tagline: isHindi ? "लेगेसी ऑटो एंट्री इंजेक्शन" : "Premium Entry for Tally ERP9",
      razorpayUrl: "https://pages.razorpay.com/pl_Ssih9ZXhEh6I0z/view",
      features: ["ERP9 Optimized native script injections", "Computational splitting capabilities", "₹50,000 safety tags enforcement", "Encrypted local data serialization"]
    },
    erp9_standard: {
      id: "erp9_standard", title: "Tally ERP9 Standard", price: "₹ 15,000 / Year", limit: "5,000 Invoices",
      tagline: isHindi ? "ERP9 डायरेक्ट जनरेशन मैट्रिक्स" : "Direct Voucher Generation for ERP9",
      razorpayUrl: "https://pages.razorpay.com/pl_SsiZhwlw7ppv7j/view",
      features: ["High fidelity ERP9 process context", "Background creation of Ledgers/Stock", "Zero latency computing script", "Complimentary Bank statement utility"]
    }
  };

  const content = {
    en: {
        heroTitle: "Automate Tally Entries from PDF & Excel in Minutes",
        heroDesc: "Stop manual entries. LekhaFlow converts invoices and bank statements into ready-to-import Tally vouchers with 100% accuracy.",
        guideTitle: "⚙️ System Installation & Machine Locking Guide",
        steps: [
            "Step 1: Download trial and complete intake details to capture setup package.",
            "Step 2: Install locally to capture your unique Machine Hardware ID.",
            "Step 3: Forward Hardware ID to our secure deployment desk for authorization.",
            "Step 4: Receive cryptographically signed secure 'license.dat' key.",
            "Step 5: Drop license.dat into application directory to unlock instantly."
        ]
    },
    hi: {
        heroTitle: "PDF और Excel से Tally एंट्री करें, मिनटों में!",
        heroDesc: "मैन्युअल डेटा एंट्री बंद करें। लेखाफ्लो बिलों और बैंक स्टेटमेंट्स को सीधे टैली में इम्पोर्ट होने वाले वाउचर में बदल देता है।",
        guideTitle: "⚙️ सिस्टम इंस्टॉलेशन और मशीन लॉकिंग गाइड",
        steps: [
            "चरण 1: 'Download Trial' पर क्लिक करें और सेटअप फ़ाइल प्राप्त करें।",
            "चरण 2: कंप्यूटर पर इंस्टॉल करें, यह एक यूनीक Machine Hardware ID जनरेट करेगा।",
            "चरण 3: उस आईडी को एक्टिवेशन के लिए हमारे व्हाट्सएप डेस्क पर भेजें।",
            "चरण 4: व्हाट्सएप/ईमेल पर अपनी 'license.dat' फ़ाइल प्राप्त करें।",
            "चरण 5: फ़ाइल को सॉफ्टवेयर फोल्डर में डालें, सिस्टम हमेशा के लिए सक्रिय हो जाएगा।"
        ]
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

  const handleDropdownSelect = (id: any) => {
    setActiveTab(id);
    setActiveMenu(null);
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const triggerIntake = (type: "demo" | "quotation") => {
    setIntakeTarget(type);
    setShowIntakeModal(true);
  };

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowIntakeModal(false);
    if (intakeTarget === "demo") {
        triggerTxtDownload("Setup_Instructions_Hindi.txt", `LekhaFlow गाइड:\n${content.hi.steps.join("\n")}`);
        triggerTxtDownload("Setup_Instructions_English.txt", `Setup Guide:\n${content.en.steps.join("\n")}`);
        window.open(downloadRoutes[activeTab], "_blank");
    } else {
        const p = productData[activeTab];
        setQuotationData({
            refNo: `NS/2026/QUOT/${p.id.toUpperCase()}_${Math.floor(1000 + Math.random() * 9000)}`,
            date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
            name: p.title, price: p.price, limit: p.limit,
            clientName: clientForm.clientName, companyName: clientForm.companyName, mobileNumber: clientForm.mobileNumber,
            benefits: p.features
        });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950 antialiased font-sans">
      
      {/* 📄 OFFICIAL PRINTABLE QUOTATION MODAL */}
      {quotationData && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border-[12px] border-double border-slate-300 max-w-2xl w-full p-10 rounded-xl shadow-2xl text-black space-y-6 relative my-8" id="quotation-sheet">
            <button onClick={() => setQuotationData(null)} className="absolute top-4 right-4 no-print text-slate-400 hover:text-black"><X/></button>
            <div className="text-center border-b-4 border-slate-900 pb-4">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Nexoriva Systems</h2>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">UDYAM-CG-27-0013072 | Surajpur, CG</p>
            </div>
            <div className="flex justify-between font-mono text-[10px] font-bold uppercase text-slate-500">
                <div>Ref: {quotationData.refNo}</div>
                <div>Date: {quotationData.date}</div>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Formal Proposal For:</p>
                <h3 className="text-xl font-black tracking-tight">{quotationData.clientName}</h3>
                <p className="text-sm font-bold text-slate-700">M/S {quotationData.companyName}</p>
                <p className="text-[10px] text-slate-500 mt-1">Contact: {quotationData.mobileNumber}</p>
            </div>
            <div className="border-2 border-slate-900 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-white font-black uppercase">
                    <tr><th className="p-3">Deployment Spec</th><th className="p-3 text-right">Investment</th></tr>
                  </thead>
                  <tbody className="font-bold">
                    <tr className="bg-blue-50/50"><td className="p-3">{quotationData.name} (Annual License)</td><td className="p-3 text-right text-lg font-black text-blue-700">{quotationData.price}</td></tr>
                  </tbody>
                </table>
            </div>
            <ul className="text-[11px] font-bold space-y-1.5 pl-2">
                {quotationData.benefits.map((b: any, i: number) => <li key={i} className="flex gap-2"><span className="text-emerald-600">✔</span> {b}</li>)}
            </ul>
            <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 font-mono text-[9px] font-bold grid grid-cols-2 gap-2">
                <div>Bank: Bank of Baroda</div>
                <div>A/C: 946110110001194</div>
                <div>IFSC: BARB0SURAJP</div>
                <div className="text-blue-600 uppercase">System Mandate Verified</div>
            </div>
            <div className="flex gap-2 pt-4 no-print">
              <button onClick={() => window.print()} className="flex-1 py-4 bg-blue-600 text-white font-black rounded-xl flex items-center justify-center gap-3 hover:bg-blue-700 transition-all"><Printer size={20}/> SAVE PDF / PRINT</button>
              <button onClick={() => setQuotationData(null)} className="px-8 py-4 bg-slate-900 text-white font-black rounded-xl hover:bg-black">CLOSE</button>
            </div>
          </div>
        </div>
      )}

      {/* 📱 MOBILE DASHBOARD */}
      <div className="md:hidden flex flex-col min-h-screen bg-slate-50 text-slate-900">
        <div className="bg-[#1e3a8a] p-6 text-white rounded-b-[2.5rem] shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-black tracking-tighter">LekhaFlow GO</h1>
            <button onClick={() => setIsHindi(!isHindi)} className="text-[10px] font-black border border-white/20 px-3 py-1 rounded-full bg-white/10">{isHindi ? "English" : "हिंदी"}</button>
          </div>
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold bg-white/5 w-fit px-3 py-1 rounded-full border border-teal-500/20">
            <Activity size={14}/> Cloud Sync Active
          </div>
        </div>
        <div className="p-4 -mt-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center active:scale-95 transition-all"><Camera className="text-teal-600 mb-2"/><span className="font-black text-[10px] uppercase tracking-widest">Scanner</span></div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center active:scale-95 transition-all"><Key className="text-blue-600 mb-2"/><span className="font-black text-[10px] uppercase tracking-widest">Licenses</span></div>
          </div>
          <div className="bg-[#1e3a8a] p-6 rounded-[2rem] text-white flex justify-between items-center shadow-lg">
            <div><p className="text-[9px] font-black text-teal-400 uppercase tracking-widest">Desktop Engine</p><h4 className="text-xs font-black">Download EXE</h4></div>
            <button onClick={() => triggerIntake("demo")} className="bg-teal-500 p-3 rounded-xl shadow-lg"><DownloadCloud /></button>
          </div>
          <div className="space-y-3">
             <h4 className="font-black text-slate-400 text-[10px] uppercase px-2 tracking-widest">Setup Instructions</h4>
             {currentContent.steps.map((s, i) => <div key={i} className="bg-white p-4 rounded-2xl text-[11px] font-bold border border-slate-100 shadow-sm flex gap-3"><span className="text-blue-600">{i+1}</span>{s}</div>)}
          </div>
        </div>
      </div>

      {/* 💻 DESKTOP SITE */}
      <div className="hidden md:block">
        <header className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center border-b border-slate-800 bg-slate-950/95 sticky top-0 z-50">
          <div className="text-xl font-black text-white tracking-wider uppercase">Lekha<span className="text-amber-500">Flow</span></div>
          <nav className="flex space-x-8 text-slate-300 font-black text-[11px] uppercase tracking-widest">
            <Link href="#hero" className="hover:text-amber-400 transition-colors">Home</Link>
            <div className="relative group" onMouseEnter={() => setActiveMenu("variants")} onMouseLeave={() => setActiveMenu(null)}>
                <button className="hover:text-amber-400 flex items-center gap-1 font-black uppercase transition-colors">Software Variants <ChevronDown size={12}/></button>
                <div className="absolute top-full -left-4 w-56 bg-slate-900 border border-slate-800 rounded-xl p-2 hidden group-hover:block shadow-2xl mt-1">
                    {Object.values(productData).map(p => <button key={p.id} onClick={() => handleDropdownSelect(p.id)} className="w-full text-left p-3 hover:bg-slate-800 rounded-lg text-[10px] font-black text-slate-400 hover:text-amber-400 transition-all uppercase tracking-wider border-b border-slate-800/50 last:border-0">{p.title}</button>)}
                </div>
            </div>
            <Link href="#pricing" className="hover:text-amber-400 transition-colors text-amber-500 underline underline-offset-4">Pricing Matrix</Link>
            <Link href="#how-it-works" className="hover:text-amber-400 transition-colors">Setup Guide</Link>
            <button onClick={() => setIsHindi(!isHindi)} className="text-amber-500 border border-amber-500/30 px-2 rounded font-black text-[9px] hover:bg-amber-500/10 transition-colors">{isHindi ? "ENGLISH" : "हिंदी"}</button>
          </nav>
          <button onClick={() => triggerIntake("demo")} className="bg-amber-500 text-slate-950 px-5 py-2 rounded-lg font-black text-[10px] uppercase shadow-lg hover:bg-amber-600 transition-all transform hover:scale-105">Download Installer</button>
        </header>

        <section id="hero" className="max-w-6xl mx-auto px-4 py-28 flex flex-col items-center text-center">
            <div className="bg-amber-500/10 text-amber-400 text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2 rounded-full border border-amber-500/20 mb-8 shadow-sm">⚡ Premium Tally & BUSY Automation Platform</div>
            <h1 className="text-7xl font-black text-white leading-tight tracking-tighter max-w-4xl">
                {currentContent.heroTitle}
            </h1>
            <p className="text-slate-400 mt-8 max-w-2xl text-xl font-medium leading-relaxed italic">"{currentContent.heroDesc}"</p>
            <div className="mt-12 flex gap-6">
                <button onClick={() => triggerIntake("demo")} className="bg-white text-slate-950 px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-amber-500 transition-all shadow-2xl active:scale-95">Start Free Trial</button>
                <Link href="/gallery" className="border-2 border-slate-800 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-slate-900 transition-all flex items-center gap-3">Watch Demo</Link>
            </div>
        </section>

        <section id="pricing" className="max-w-7xl mx-auto px-4 py-24 border-t border-slate-900">
            <div className="text-center mb-16 space-y-3">
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Compare Deployment Matrix</h2>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Licensing parameters & yearly capacity bounds</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {Object.entries(productData).map(([key, item]) => (
                    <div key={key} className={`bg-gradient-to-b from-slate-900 to-slate-950 border p-5 rounded-[2.5rem] flex flex-col justify-between transition-all group ${activeTab === key ? 'border-amber-500 ring-8 ring-amber-500/5 shadow-2xl scale-[1.02]' : 'border-slate-800 hover:border-slate-700 shadow-lg'}`}>
                        <div className="space-y-4">
                            <h3 className="text-white font-black group-hover:text-amber-400 text-xs uppercase tracking-widest transition-colors">{item.title}</h3>
                            <div className="py-4 border-y border-slate-800/60">
                                <p className="text-amber-500 font-black text-xl tracking-tighter">{item.price}</p>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.limit} Limit</span>
                            </div>
                            <ul className="space-y-3 text-slate-400 font-bold text-[10px] min-h-[160px] list-none">
                                {item.features.map((f, i) => <li key={i} className="flex items-start gap-2 leading-tight">▪ {f}</li>)}
                            </ul>
                        </div>
                        <div className="mt-8 space-y-2.5">
                           <button onClick={() => { setActiveTab(key as any); triggerIntake("quotation"); }} className="w-full py-3 bg-slate-950 border border-slate-800 rounded-xl font-black uppercase text-[9px] hover:bg-slate-900 transition-all text-white tracking-[0.2em] shadow-sm">Get Quote</button>
                           <a href={item.razorpayUrl} target="_blank" rel="noreferrer" className="block w-full py-3.5 bg-amber-500 text-slate-950 rounded-xl font-black uppercase text-[9px] text-center tracking-[0.2em] shadow-xl hover:bg-amber-600 active:scale-95 transition-all">Buy Now</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <section id="how-it-works" className="max-w-6xl mx-auto px-4 py-24 border-t border-slate-900">
            <div className="bg-slate-900/50 p-16 rounded-[4rem] border-2 border-slate-800 shadow-inner">
                <h3 className="text-3xl font-black text-white mb-12 flex items-center gap-4 uppercase tracking-tighter"><Info className="text-amber-500"/> {currentContent.guideTitle}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                    {currentContent.steps.map((s, i) => (
                        <div key={i} className="flex gap-6 items-start group">
                            <span className="bg-slate-950 border border-slate-800 text-amber-500 font-black h-10 w-10 flex items-center justify-center rounded-2xl text-lg shrink-0 shadow-lg group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">{i+1}</span>
                            <div className="space-y-1">
                                <p className="text-slate-200 font-black text-xs uppercase tracking-[0.2em]">Operational Protocol</p>
                                <p className="text-slate-400 font-bold text-sm leading-relaxed">{s}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="contact" className="py-32 bg-slate-900/20 border-t border-slate-900">
            <div className="max-w-xl mx-auto text-center mb-16 space-y-2">
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{isHindi ? "सम्पर्क विवरण" : "Custom Workflow Intake"}</h2>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Connect with our engineering desk</p>
            </div>
            <Contact isHindi={isHindi} />
        </section>

        <footer className="py-16 border-t border-slate-900 text-center space-y-4">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">LekhaFlow AI Systems | MSME Registered | Surajpur, Chhattisgarh</p>
            <p className="text-slate-700 text-[8px] font-bold uppercase tracking-[0.2em]">Developed by Jitendra Bharti | Built in India 🇮🇳</p>
        </footer>
      </div>

      {/* MODAL INTAKE */}
      {showIntakeModal && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
            <div className="bg-slate-900 border-2 border-amber-500 p-10 rounded-[3.5rem] max-w-md w-full relative shadow-[0_0_100px_rgba(245,158,11,0.1)]">
                <button onClick={() => setShowIntakeModal(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"><X size={28}/></button>
                <div className="text-center space-y-3 mb-10">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{intakeTarget === "demo" ? "Authorize Setup" : "Official Quote"}</h3>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Enter secure credentials to proceed</p>
                </div>
                <form onSubmit={handleIntakeSubmit} className="space-y-6">
                    <input required placeholder="YOUR FULL NAME" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs tracking-widest focus:border-amber-500 outline-none transition-all" onChange={(e) => setClientForm({...clientForm, clientName: e.target.value})}/>
                    <input required placeholder="COMPANY / FIRM NAME" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs tracking-widest focus:border-amber-500 outline-none transition-all" onChange={(e) => setClientForm({...clientForm, companyName: e.target.value})}/>
                    <input required placeholder="WHATSAPP NUMBER" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs tracking-widest focus:border-amber-500 outline-none transition-all" onChange={(e) => setClientForm({...clientForm, mobileNumber: e.target.value})}/>
                    <button type="submit" className="w-full py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black rounded-2xl uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.02] transition-transform text-xs">
                        {intakeTarget === "demo" ? "DOWNLOAD NOW" : "GENERATE QUOTE"}
                    </button>
                </form>
            </div>
        </div>
      )}

      <WhatsAppButton />
    </div>
  );
}