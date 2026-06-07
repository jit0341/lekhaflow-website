"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Strict import
import { 
  Zap, AlertCircle, Play, CheckCircle2, 
  Calculator, BarChart3, ShieldCheck, 
  User, MessageCircle, Phone, Mail, Download, Menu, X, ChevronDown, Monitor, Cpu, Info, FileText, Printer, Globe
} from "lucide-react";
import Contact from "@/components/contact";
import WhatsAppButton from "@/components/WhatsAppButton";

// --- Types ---
type Variant = "lite" | "standard" | "premium" | "gold" | "erp9_standard" | "erp9_premium";

export default function LekhaFlowLanding() {
  // 1. ALL STATES
  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Variant>("gold");
  const [quotationData, setQuotationData] = useState<any | null>(null);
  const [showIntakeModal, setShowIntakeModal] = useState<boolean>(false);
  const [intakeTarget, setIntakeTarget] = useState<"demo" | "quotation">("demo");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [clientForm, setClientForm] = useState({ clientName: "", companyName: "", mobileNumber: "", clientEmail: "" });

  // ROI Calculator States
  const [invoices, setInvoices] = useState(500);
  const [staffCost, setStaffCost] = useState(15000);

  useEffect(() => {
    document.title = "LekhaFlow | Premium Tally & BUSY Automation Platform";
  }, []);

  // 2. CONSTANTS & DATA
  const WHATSAPP_LINK = "https://wa.me/918770808695";

  const downloadRoutes = {
    gold: "https://www.dropbox.com/scl/fi/tyv7sepqejvkvfn7mjvzq/Lekhaflow_Gold_setup.rar?dl=1",
    standard: "https://www.dropbox.com/scl/fi/8pqk5mvruopj1wzhmfi0d/Lekhaflow_Standard_setup.rar?dl=1",
    premium: "https://www.dropbox.com/scl/fi/i49mnsm6z2x97n3vivvs7/LekhaFlow_Premium_setup.rar?dl=1",
    lite: "https://www.dropbox.com/scl/fi/i49mnsm6z2x97n3vivvs7/LekhaFlow_LITE_setup.rar?dl=1",
    erp9_premium: "https://www.dropbox.com/scl/fi/3uby3jvlhd2gcqjwkbpo2/Lekhaflow_ERP9_Premium_setup.rar?dl=1",
    erp9_standard: "https://www.dropbox.com/scl/fi/kmd3tbus1feicyt9zr5lb/LekhaFlow_ERP9_Standard_setup.rar?dl=1"
  };

  const productData = {
    lite: { id: "lite", title: "Lite Edition", price: "₹ 15,000", limit: "2,000 Invoices", tagline: isHindi ? "बेसिक एक्सेल मैपर" : "Basic Excel Mapper", razorpayUrl: "https://rzp.io/rzp/SkJTqlgi", features: ["100% True Copy Excel", "Universal Template Mapper", "Invoice Summary Sheets"] },
    standard: { id: "standard", title: "Standard Sync", price: "₹ 25,000", limit: "5,000 Invoices", tagline: isHindi ? "टैली प्राइम ऑटो एंट्री" : "Tally Prime Auto Entry", razorpayUrl: "https://rzp.io/rzp/oVwLNxHT", features: ["Direct Tally Voucher Entry", "Auto Master Creation", "GSTIN/PAN Metadata"] },
    premium: { id: "premium", title: "Premium Suite", price: "₹ 25,000", limit: "10,000 Invoices", tagline: isHindi ? "प्रीमियम एआई इंजन" : "Premium AI Engine", razorpayUrl: "https://rzp.io/rzp/9HGERapH", features: ["Full AI Hybrid Model", "Unlimited Bank Entry", "GSTR-2B Reconciliation"] },
    gold: { id: "gold", title: "Gold Advance", price: "₹ 30,000", limit: "Unlimited*", tagline: isHindi ? "सबसे उन्नत स्वचालन" : "Most Advanced Automation", razorpayUrl: "https://rzp.io/rzp/sQg7LGy", features: ["Auto Splitting < ₹50k", "Random Item Distribution", "Cryptographic machine-lock"] },
    erp9_standard: { id: "erp9_standard", title: "ERP9 Standard", price: "₹ 25,000", limit: "5,000 Invoices", tagline: isHindi ? "लेगेसी सपोर्ट" : "Legacy Support", razorpayUrl: "https://rzp.io/rzp/AZMi622y", features: ["ERP9 Native Injection", "Voucher Automation", "Purchase Verification"] },
    erp9_premium: { id: "erp9_premium", title: "ERP9 Premium", price: "₹ 35,000", limit: "Unlimited*", tagline: isHindi ? "ERP9 एडवांस" : "ERP9 Advance", razorpayUrl: "https://rzp.io/rzp/BLZgsWB", features: ["ERP9 Splits & Sorting", "Encrypted Data Security", "Premium Support"] }
  };

  const content = {
    en: {
        heroTitle: "Stop Repetitive Accounting Work",
        heroSub: "Invoice → XML → Tally",
        heroDesc: "Convert Purchase, Sales, Bank Statements and GST Data into Tally-Ready files in minutes.",
        guideTitle: "⚙️ System Installation Guide",
        steps: ["Download Trial & Install Package", "Capture Unique Machine Hardware ID", "Forward ID to our Activation Desk", "Receive secure license.dat file", "Drop file in directory to unlock"]
    },
    hi: {
        heroTitle: "थका देने वाला एकाउंटिंग काम बंद करें",
        heroSub: "इनवॉइस → XML → टैली",
        heroDesc: "परचेज, सेल्स, बैंक स्टेटमेंट और जीएसटी डेटा को मिनटों में टैली-रेडी फाइलों में बदलें।",
        guideTitle: "⚙️ सिस्टम इंस्टॉलेशन गाइड",
        steps: ["ट्रायल डाउनलोड और इंस्टॉल करें", "अपना यूनीक मशीन हार्डवेयर आईडी निकालें", "आईडी हमारे एक्टिवेशन डेस्क को भेजें", "अपनी सुरक्षित license.dat फ़ाइल प्राप्त करें", "सॉफ्टवेयर फोल्डर में पेस्ट करें और शुरू करें"]
    }
  };

  const currentContent = isHindi ? content.hi : content.en;

  // 3. LOGIC FUNCTIONS
  const timeCalc = invoices * 3; 
  const moneyCalc = Math.round((timeCalc / 60) * (staffCost / 160));
  const annualSave = moneyCalc * 12;

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
        triggerTxtDownload("LekhaFlow_Guide_HI.txt", `स्टेप्स:\n${content.hi.steps.join("\n")}`);
        triggerTxtDownload("LekhaFlow_Guide_EN.txt", `Steps:\n${content.en.steps.join("\n")}`);
        window.open(downloadRoutes[activeTab], "_blank");
    } else {
        const p = productData[activeTab];
        setQuotationData({
            refNo: `NS/2026/QUOT/${p.id.toUpperCase()}`,
            date: new Date().toLocaleDateString('en-IN'),
            name: p.title, price: p.price,
            clientName: clientForm.clientName, companyName: clientForm.companyName, mobileNumber: clientForm.mobileNumber
        });
    }
  };

  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

  return (
    <div className="bg-slate-950 text-slate-200 selection:bg-teal-500 selection:text-white overflow-x-hidden">
      
      {/* 1. NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] bg-slate-950/80 backdrop-blur-md border-b border-slate-800 no-print">
        <div className={`${containerClass} flex justify-between items-center h-20`}>
          <div className="text-2xl font-black tracking-tighter text-white uppercase">LEKHA<span className="text-teal-500">FLOW</span></div>
          <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest">
            <a href="#features" className="hover:text-teal-400 transition-colors">Features</a>
            <a href="#process" className="hover:text-teal-400 transition-colors">Process</a>
            <a href="#pricing" className="hover:text-teal-400 transition-colors">Pricing</a>
            <button onClick={() => setIsHindi(!isHindi)} className="flex items-center gap-1 text-teal-500 border border-teal-500/30 px-2 py-1 rounded"><Globe size={12}/> {isHindi ? "ENGLISH" : "हिंदी"}</button>
            <button onClick={() => triggerIntake("demo")} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg">Request Demo</button>
          </div>
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 no-print">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/10 via-slate-950 to-slate-950 -z-10"></div>
        <div className={`${containerClass} grid lg:grid-cols-2 gap-16 items-center`}>
          <div className="space-y-8">
            <span className="px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2"><Zap size={12}/> {isHindi ? "भारतीय एकाउंटिंग का भविष्य" : "THE FUTURE OF INDIAN ACCOUNTING"}</span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">{currentContent.heroTitle}</h1>
            <h2 className="text-2xl font-bold text-teal-500 uppercase tracking-widest">{currentContent.heroSub}</h2>
            <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-xl">{currentContent.heroDesc}</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => triggerIntake("demo")} className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-teal-500 transition-all shadow-2xl">Watch Live Demo</button>
              <button onClick={() => triggerIntake("demo")} className="bg-slate-900 border border-slate-700 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Download Trial</button>
            </div>
          </div>
          <div className="relative group">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-2 rounded-[3rem] shadow-[0_0_50px_rgba(20,184,166,0.1)] border border-slate-700">
               <div className="bg-slate-950 rounded-[2.8rem] overflow-hidden aspect-video flex items-center justify-center relative border border-slate-800">
                  <Monitor size={100} className="text-slate-900 opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center bg-teal-500/5 group-hover:bg-transparent transition-all cursor-pointer">
                      <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center text-slate-950 shadow-2xl transform group-hover:scale-110 transition-transform"><Play fill="currentColor" size={36}/></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PAIN POINTS */}
      <section className="py-24 bg-slate-900/30 no-print">
        <div className={`${containerClass}`}>
          <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-16 uppercase tracking-tighter">{isHindi ? "क्या आप इन समस्याओं का सामना कर रहे हैं?" : "Are You Facing These Problems?"}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "Manual Invoice Entry", d: "Hours spent typing data from paper to screen." },
              { t: "Data Entry Errors", d: "Mistakes leading to GST reconciliation issues." },
              { t: "Month-End Pressure", d: "Working late to clear voucher backlogs." },
              { t: "GST Workload", d: "Matching GSTR-2B with purchase ledgers." },
              { t: "Bank Entry", d: "Posting hundreds of UPI/Bank transactions." },
              { t: "Staff Dependency", d: "Business stops when operators are on leave." }
            ].map((p, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 p-10 rounded-[2.5rem] hover:border-red-500/50 transition-all group">
                <AlertCircle className="text-red-500 mb-6 group-hover:rotate-12 transition-transform" size={40} />
                <h3 className="text-xl font-black text-white mb-2">{p.t}</h3>
                <p className="text-slate-400 font-bold text-sm leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (With Images) */}
      <section id="process" className="py-24 no-print">
        <div className={`${containerClass}`}>
          <h2 className="text-center text-4xl md:text-6xl font-black text-white mb-20 uppercase tracking-tighter">The Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
             {[
               { s: "01", t: "Upload", d: "PDF / Image / Excel", img: "/gui_screen_1.png" },
               { s: "02", t: "Read", d: "AI Extraction", img: "/gui_screen_2.png" },
               { s: "03", t: "Generate", d: "XML Created", img: "/gui_screen_3.png" },
               { s: "04", t: "Import", d: "Into Tally/BUSY", img: "/gui_screen_4.png" },
               { s: "05", t: "Done", d: "Vouchers Created", img: "/gui_screen_5.png" }
             ].map((w, i) => (
               <motion.div key={i} whileHover={{y:-10}} className="bg-slate-900 border-2 border-slate-800 rounded-[2.5rem] overflow-hidden flex flex-col h-full shadow-2xl">
                  <div className="p-8 pb-4">
                    <div className="text-4xl font-black text-teal-500/20 mb-4">{w.s}</div>
                    <h4 className="text-xl font-black text-white mb-1 uppercase">{w.t}</h4>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{w.d}</p>
                  </div>
                  <div className="mt-auto p-4">
                    <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-inner group">
                      <img src={w.img} alt={w.t} className="w-full h-32 object-cover object-top opacity-70 group-hover:opacity-100 transition-opacity" onError={(e) => { e.currentTarget.src = "https://placehold.co/400x300/1e293b/64748b?text=LekhaFlow+UI"; }}/>
                    </div>
                  </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 5. ROI CALCULATOR */}
      <section className="py-24 no-print">
        <div className={`${containerClass}`}>
          <div className="bg-slate-900 border-2 border-slate-800 rounded-[4rem] p-10 lg:p-20 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-5xl font-black text-white tracking-tighter uppercase">Calculate Savings</h2>
                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">Invoices / Month: <span className="text-white text-xl ml-2">{invoices}</span></label>
                    <input type="range" min="100" max="5000" step="100" value={invoices} onChange={(e) => setInvoices(parseInt(e.target.value))} className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">Staff Salary: <span className="text-white text-xl ml-2">₹{staffCost}</span></label>
                    <input type="range" min="8000" max="50000" step="1000" value={staffCost} onChange={(e) => setStaffCost(parseInt(e.target.value))} className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                  </div>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="bg-slate-950 p-10 rounded-3xl border border-slate-800 text-center">
                   <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Hours Saved</p>
                   <p className="text-6xl font-black text-teal-500 tracking-tighter">{Math.round(timeCalc / 60)} Hrs</p>
                </div>
                <div className="bg-teal-500 p-10 rounded-3xl text-center text-slate-950 shadow-2xl">
                   <p className="text-teal-900 text-[10px] font-black uppercase tracking-widest mb-2">Annual Savings</p>
                   <p className="text-6xl font-black tracking-tighter">₹{annualSave.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPARISON TABLE */}
      <section className="max-w-6xl mx-auto px-4 py-24 border-t border-slate-900 no-print">
         <h2 className="text-2xl font-black text-white text-center mb-12 uppercase tracking-widest">Efficiency Matrix</h2>
         <div className="overflow-hidden border border-slate-800 rounded-3xl bg-slate-900/20">
            <table className="w-full text-left border-collapse text-xs">
               <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 font-black text-white uppercase tracking-widest">
                     <th className="p-5">Feature</th>
                     <th className="p-5 text-slate-500 uppercase">Lite</th>
                     <th className="p-5 text-slate-500 uppercase">Standard</th>
                     <th className="p-5 text-teal-400 uppercase">Gold</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-800 font-bold text-slate-300 uppercase">
                  <tr><td className="p-5 text-white">Invoice Automation</td><td className="p-5">✔</td><td className="p-5">✔</td><td className="p-5 text-teal-400">✔</td></tr>
                  <tr><td className="p-5 text-white">Bank Statement Parser</td><td className="p-5">✖</td><td className="p-5">✔</td><td className="p-5 text-teal-400">✔</td></tr>
                  <tr><td className="p-5 text-white">GSTR-2B Reconciliation</td><td className="p-5">✖</td><td className="p-5">✖</td><td className="p-5 text-teal-400">✔</td></tr>
                  <tr><td className="p-5 text-white">Advanced Splits & Shuffling</td><td className="p-5">✖</td><td className="p-5">✖</td><td className="p-5 text-teal-400">✔</td></tr>
               </tbody>
            </table>
         </div>
      </section>

      {/* 7. PRICING */}
      <section id="pricing" className="py-24 bg-slate-900/30 no-print">
         <div className={`${containerClass}`}>
            <h2 className="text-center text-4xl font-black text-white mb-16 uppercase tracking-tighter">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
               {Object.entries(productData).map(([key, p]) => (
                 <div key={key} className={`bg-slate-950 border p-6 rounded-[2.5rem] flex flex-col justify-between transition-all group ${activeTab === key ? 'border-teal-500 ring-4 ring-teal-500/10' : 'border-slate-800 hover:border-slate-700'}`}>
                    <div className="space-y-4">
                       <h3 className="text-white font-black text-[10px] uppercase tracking-widest">{p.title}</h3>
                       <div className="py-4 border-y border-slate-800">
                          <p className="text-teal-500 font-black text-2xl tracking-tighter">{p.price}</p>
                          <p className="text-[9px] text-slate-500 font-bold uppercase">{p.limit}</p>
                       </div>
                    </div>
                    <div className="mt-8 space-y-2">
                       <button onClick={() => { setActiveTab(key as any); triggerIntake("quotation"); }} className="w-full py-3 bg-slate-900 border border-slate-800 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all text-white">Quotation</button>
                       <a href={p.razorpayUrl} target="_blank" className="block w-full py-3 bg-teal-500 text-slate-950 rounded-xl text-[9px] font-black uppercase tracking-widest text-center shadow-lg hover:bg-teal-400 transition-all">Buy Now</a>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 8. FOUNDER STORY */}
      <section className="py-24 no-print">
         <div className={`${containerClass} max-w-5xl`}>
            <div className="bg-slate-900 border-2 border-slate-800 rounded-[4rem] p-10 lg:p-20 relative overflow-hidden">
               <div className="grid lg:grid-cols-3 gap-16 items-center relative z-10">
                  <div className="lg:col-span-1">
                     <div className="w-full aspect-square bg-slate-800 rounded-[3rem] border-4 border-teal-500/20 flex items-center justify-center shadow-2xl">
                        <User size={120} className="text-slate-700" />
                     </div>
                  </div>
                  <div className="lg:col-span-2 space-y-8">
                     <h2 className="text-5xl font-black text-white uppercase tracking-tighter">Meet The Founder</h2>
                     <h3 className="text-2xl font-bold text-teal-500">Jitendra Bharti <span className="text-slate-500 font-medium text-lg ml-2">| LekhaFlow AI Systems</span></h3>
                     <p className="text-xl text-slate-400 font-medium italic leading-relaxed">"10+ Years in automation experience. Helping Indian businesses eliminate repetitive accounting entry once and for all."</p>
                     <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
                        <p className="text-teal-400 font-black uppercase text-[10px] mb-2 tracking-widest">Our Vision</p>
                        <p className="text-white font-bold text-sm">100% Accuracy with Local Founder Support</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 9. CONTACT */}
      <section id="contact" className="py-24 border-t border-slate-900 no-print">
         <div className={`${containerClass}`}>
            <div className="grid lg:grid-cols-2 gap-20">
               <div className="space-y-12">
                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[1.1]">Connect with our <br />Engineering Desk</h2>
                  <div className="space-y-6">
                     <div className="flex items-center gap-6 bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 hover:border-teal-500/50 transition-all group shadow-xl">
                        <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-500"><Phone /></div>
                        <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Call Directly</p><p className="text-white font-black text-xl">+91 87708 08695</p></div>
                     </div>
                     <div className="flex items-center gap-6 bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 hover:border-blue-500/50 transition-all group shadow-xl">
                        <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500"><Mail /></div>
                        <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Support Email</p><p className="text-white font-black text-xl">support@lekhaflow.in</p></div>
                     </div>
                  </div>
               </div>
               <div className="bg-white rounded-[3rem] p-3 shadow-2xl">
                  <div className="bg-slate-950 border border-slate-200/10 rounded-[2.8rem] p-2 overflow-hidden"><Contact isHindi={isHindi} /></div>
               </div>
            </div>
         </div>
      </section>

      {/* 📥 INTAKE MODAL */}
      {showIntakeModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
            <div className="bg-slate-900 border-2 border-teal-500 p-10 rounded-[3.5rem] max-w-md w-full relative shadow-2xl">
                <button onClick={() => setShowIntakeModal(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"><X size={28}/></button>
                <div className="text-center space-y-3 mb-10">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{intakeTarget === "demo" ? "Authorize Setup" : "Official Quote"}</h3>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Enter secure credentials to proceed</p>
                </div>
                <form onSubmit={handleIntakeSubmit} className="space-y-5">
                    <input required placeholder="YOUR FULL NAME" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs tracking-widest focus:border-teal-500 outline-none transition-all" onChange={(e) => setClientForm({...clientForm, clientName: e.target.value})}/>
                    <input required placeholder="COMPANY / FIRM NAME" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs tracking-widest focus:border-teal-500 outline-none transition-all" onChange={(e) => setClientForm({...clientForm, companyName: e.target.value})}/>
                    <input required placeholder="WHATSAPP NUMBER" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs tracking-widest focus:border-teal-500 outline-none transition-all" onChange={(e) => setClientForm({...clientForm, mobileNumber: e.target.value})}/>
                    <button type="submit" className="w-full py-5 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-black rounded-2xl uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.02] transition-transform text-xs uppercase">
                        {intakeTarget === "demo" ? "DOWNLOAD NOW" : "GENERATE QUOTE"}
                    </button>
                </form>
            </div>
        </div>
      )}

      {/* 📄 PRINTABLE QUOTATION */}
      {quotationData && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 overflow-y-auto">
          <div className="bg-white border-[10px] border-double border-slate-300 max-w-2xl w-full p-12 rounded-xl shadow-2xl text-black relative my-8" id="quotation-sheet">
            <button onClick={() => setQuotationData(null)} className="absolute top-4 right-4 no-print text-slate-400 hover:text-black"><X/></button>
            <div className="flex justify-between items-start border-b-4 border-slate-950 pb-6">
               <div><h2 className="text-3xl font-black uppercase tracking-tighter">Nexoriva Systems</h2><p className="text-[10px] font-black text-blue-700 tracking-[0.2em] uppercase">UDYAM-CG-27-0013072 | Surajpur, CG</p></div>
               <div className="text-right font-mono text-[10px] font-bold uppercase"><div>Ref: {quotationData.refNo}</div><div>Date: {quotationData.date}</div></div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Prepared For:</p>
                <h3 className="text-2xl font-black uppercase tracking-tighter">{quotationData.clientName}</h3>
                <p className="text-sm font-bold text-slate-700">M/S {quotationData.companyName}</p>
            </div>
            <div className="border-2 border-slate-950 rounded-2xl overflow-hidden mt-6">
                <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-950 text-white font-black uppercase"><tr><th className="p-4 border-r border-slate-100">Spec</th><th className="p-4 text-right">Amount</th></tr></thead>
                    <tbody className="font-bold"><tr><td className="p-4 border-r border-slate-100">{quotationData.name} (Annual License)</td><td className="p-4 text-right text-xl font-black text-blue-700">{quotationData.price}</td></tr></tbody>
                </table>
            </div>
            <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 font-mono text-[9px] font-bold grid grid-cols-2 gap-2 mt-6">
                <div>Bank: Bank of Baroda</div><div>A/C: 946110110001194</div><div>IFSC: BARB0SURAJP</div><div className="text-blue-600 uppercase">System Mandate Verified</div>
            </div>
            <div className="flex gap-4 pt-10 no-print">
              <button onClick={() => window.print()} className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-widest text-xs"><Printer size={20}/> Save as PDF / Print</button>
              <button onClick={() => setQuotationData(null)} className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl uppercase text-[10px]">Close</button>
            </div>
          </div>
        </div>
      )}

      <footer className="py-16 border-t border-slate-900 text-center no-print uppercase">
        <p className="text-slate-500 text-[10px] font-black tracking-[0.5em]">Nexoriva Systems © 2026 | Developed by Jitendra Bharti | Built in India 🇮🇳</p>
      </footer>
      <WhatsAppButton />
    </div>
  );
}