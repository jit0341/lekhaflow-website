"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link"; // ✅ FIXED: Added Link import
import { 
  Zap, AlertCircle, Play, CheckCircle2, 
  Calculator, BarChart3, ShieldCheck, Target, Headphones,
  User, MessageCircle, Phone, Mail, Download, Menu, X, ChevronDown, Monitor, Cpu, Info, FileText, Printer, Globe, ArrowRight, MousePointer2, FolderOutput, Database, BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Contact from "@/components/contact";
import WhatsAppButton from "@/components/WhatsAppButton";

// --- Types ---
type Variant = "lite" | "standard" | "premium" | "gold" | "erp9_standard" | "erp9_premium";

export default function LekhaFlowLanding() {
  // 1. STATES
  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Variant>("gold");
  const [quotationData, setQuotationData] = useState<any | null>(null);
  const [showIntakeModal, setShowIntakeModal] = useState<boolean>(false);
  const [intakeTarget, setIntakeTarget] = useState<"demo" | "quotation">("demo");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clientForm, setClientForm] = useState({ clientName: "", companyName: "", mobileNumber: "", clientEmail: "" });

  const [invoices, setInvoices] = useState(500);
  const [staffCost, setStaffCost] = useState(15000);

  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

  useEffect(() => {
    document.title = isHindi ? "LekhaFlow | भारत का सबसे तेज इनवॉइस टू टैली सॉफ्टवेयर" : "LekhaFlow | India's Fastest Invoice to Tally AI Software";
  }, [isHindi]);

  const WHATSAPP_LINK = "https://wa.me/918770808695";

  // --- 🎯 FULL TRANSLATION DICTIONARY (FULLY RECTIFIED) ---
  const t = {
    nav: { f: isHindi ? "विशेषताएं" : "Features", p: isHindi ? "प्रक्रिया" : "Process", pr: isHindi ? "कीमत" : "Pricing", req: isHindi ? "डेमो मांगें" : "Request Demo" },
    hero: {
      title: isHindi ? "थका देने वाला एकाउंटिंग काम बंद करें" : "Stop Repetitive Accounting Work",
      sub: isHindi ? "Invoice → XML → टैली स्वचालन" : "GST Accounting Automation: Invoice → XML → Tally",
      desc: isHindi ? "लेखाफ्लो (LekhaFlow): भारत का सबसे तेज Invoice to Tally Software। MSMEs के लिए AI-संचालित सटीक समाधान।" : "LekhaFlow: India's fastest AI-Powered Invoice to Tally Software for MSMEs. 100% accuracy in seconds.",
      btn1: isHindi ? "डेमो देखें" : "Watch Demo",
      btn2: isHindi ? "ट्रायल डाउनलोड करें" : "Download Trial"
    },
    process: {
      title: isHindi ? "स्वचालन प्रक्रिया" : "THE AUTOMATION PROCESS",
      steps: [
        { s: "01", t: "01 GUI", d: isHindi ? "यूजर इंटरफेस" : "User Interface", img: "/gui_screen_1.png", i: MousePointer2 },
        { s: "02", t: isHindi ? "02 इनवॉइस अपलोड" : "02 UPLOAD THE INVOICE", d: "PDF / Image / Excel", img: "/gui_screen_2.png", i: Download },
        { s: "03", t: isHindi ? "03 जेनरेट" : "03 GENERATE", d: isHindi ? "एआई डेटा एक्सट्रैक्शन" : "AI Data Extraction", img: "/gui_screen_3.png", i: Zap },
        { s: "04", t: isHindi ? "04 आउटपुट" : "04 OUTPUT", d: isHindi ? "XML फाइलें तैयार" : "XML Files Ready", img: "/gui_screen_4.png", i: FolderOutput },
        { s: "05", t: isHindi ? "05 इम्पोर्ट" : "05 IMPORT", d: isHindi ? "वन-क्लिक टैली इम्पोर्ट" : "One-Click Tally Import", img: "/gui_screen_5.png", i: FileText },
        { s: "06", t: isHindi ? "06 एंट्री हो गई" : "06 THE ENTRY", d: isHindi ? "वाउचर बन गया" : "Voucher Created", img: "/gui_screen_6.png", i: Database }
      ]
    },
    trust: {
      title: isHindi ? "हमारी सुरक्षा और विश्वास गारंटी" : "OUR TRUST GUARANTEE",
      tag: isHindi ? "CAs के लिए सुरक्षित GST प्लेटफॉर्म" : "A SECURE GST PLATFORM FOR TAX PROFESSIONALS",
      items: [
        { i: ShieldCheck, t: isHindi ? "डेटा सुरक्षा" : "Data Security", d: isHindi ? "जीरो-डेटा रिटेंशन: हम डेटा स्टोर नहीं करते।" : "Zero-Data Retention Policy.", c: "text-teal-500" },
        { i: Target, t: isHindi ? "तकनीकी सटीकता" : "Technical Accuracy", d: isHindi ? "डायनामिक राउंडिंग: 0.01 पैसे का बैलेंस।" : "Dynamic Rounding: Error-free.", c: "text-blue-500" },
        { i: Cpu, t: isHindi ? "उपयोग की शर्तें" : "Usage Highlights", d: isHindi ? "टैली EDU वर्जन के साथ पूर्ण संगत।" : "Tally EDU Version Compatible.", c: "text-amber-500" },
        { i: Headphones, t: isHindi ? "ग्राहक सहायता" : "Customer Support", d: isHindi ? "इंजीनियरिंग डेस्क से सीधी मदद।" : "Direct Founder Support Desk.", c: "text-pink-500" }
      ]
    },
    roi: { title: isHindi ? "बचत कैलकुलेटर" : "ROI Calculator", l1: isHindi ? "इनवॉइसेस / माह" : "Invoices / Month", l2: isHindi ? "स्टाफ वेतन" : "Monthly Staff Salary", r1: isHindi ? "बचे हुए घंटे" : "Hours Saved", r2: isHindi ? "सालाना बचत" : "Annual Savings" },
    blog: {
        title: isHindi ? "एकाउंटिंग गाइड और लेख" : "Knowledge Hub & Articles",
        a1: { t: isHindi ? "समय बचाने के 5 तरीके" : "5 Ways to Save Time", d: isHindi ? "ऑटोमेशन के फायदे।" : "Benefits of Automation." },
        a2: { t: isHindi ? "मैन्युअल डेटा एंट्री के नुकसान" : "Losses of Manual Entry", d: isHindi ? "गलतियों को कैसे रोकें।" : "How to avoid errors." },
        a3: { t: isHindi ? "छत्तीसगढ़ के लिए बेस्ट GST सॉफ्टवेयर" : "Best GST Software for CG", d: isHindi ? "स्थानीय व्यापारियों के लिए समाधान।" : "Local Business Solution." }
    },
    founder: {
      title: isHindi ? "संस्थापक से मिलें" : "Meet The Founder",
      bio: isHindi ? "स्वचालन (automation) के क्षेत्र में 10+ वर्षों का अनुभव। भारतीय व्यवसायों को थका देने वाली डेटा एंट्री से मुक्त करना।" : "10+ Years in automation experience. Helping Indian businesses eliminate manual accounting entry once and for all.",
      vision: isHindi ? "100% सटीकता के साथ लोकल फाउंडर सपोर्ट" : "100% Accuracy with Local Founder Support"
    }
  };

  const productData = {
    lite: { title: "Lite Edition", price: "15,000", limit: "2,000", razorpayUrl: "https://rzp.io/rzp/SkJTqlgi", tagline: isHindi ? "बेसिक एक्सेल मैपर" : "Basic Excel Mapper" },
    standard: { title: "Standard Sync", price: "25,000", limit: "5,000", razorpayUrl: "https://rzp.io/rzp/oVwLNxHT", tagline: isHindi ? "टैली ऑटो एंट्री" : "Tally Auto Entry" },
    premium: { title: "Premium Suite", price: "25,000", limit: "10,000", razorpayUrl: "https://rzp.io/rzp/9HGERapH", tagline: isHindi ? "प्रीमियम एआई इंजन" : "Premium AI Engine" },
    gold: { title: "Gold Advance", price: "30,000", limit: "Unlimited*", razorpayUrl: "https://rzp.io/rzp/sQg7LGy", tagline: isHindi ? "सबसे उन्नत स्वचालन" : "Advanced Automation" },
    erp9_standard: { title: "ERP9 Standard", price: "25,000", limit: "5,000", razorpayUrl: "https://rzp.io/rzp/AZMi622y", tagline: isHindi ? "लेगेसी सपोर्ट" : "Legacy Support" },
    erp9_premium: { title: "ERP9 Premium", price: "35,000", limit: "Unlimited*", razorpayUrl: "https://rzp.io/rzp/BLZgsWB", tagline: isHindi ? "ERP9 एडवांस" : "ERP9 Advance" }
  };

  const timeSavedValue = invoices * 3; 
  const moneySavedValue = Math.round((timeSavedValue / 60) * (staffCost / 160));
  const annualSavingsValue = moneySavedValue * 12;

  const triggerIntake = (type: "demo" | "quotation") => {
    setIntakeTarget(type);
    setShowIntakeModal(true);
  };

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowIntakeModal(false);
    window.open("https://www.dropbox.com/scl/fi/tyv7sepqejvkvfn7mjvzq/Lekhaflow_Gold_setup.rar?dl=1", "_blank");
  };

  return (
    <div className="bg-[#020617] text-slate-200 selection:bg-teal-500 selection:text-white overflow-x-hidden">
      
      {/* 1. NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] bg-[#020617]/80 backdrop-blur-md border-b border-slate-800 no-print">
        <div className={containerClass + " flex justify-between items-center h-20"}>
          <div className="text-2xl font-black tracking-tighter text-white uppercase italic">LEKHA<span className="text-teal-500">FLOW</span></div>
          <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest">
            <a href="#features" className="hover:text-teal-400 transition-colors">{t.nav.f}</a>
            <a href="#process" className="hover:text-teal-400 transition-colors">{t.nav.p}</a>
            <a href="#pricing" className="hover:text-teal-400 transition-colors">{t.nav.pr}</a>
            <button onClick={() => setIsHindi(!isHindi)} className="text-teal-500 border border-teal-500/30 px-3 py-1 rounded bg-teal-500/5 font-bold uppercase transition-all">
              {isHindi ? "ENGLISH" : "हिंदी"}
            </button>
            <button onClick={() => triggerIntake("demo")} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl shadow-lg uppercase">{t.nav.req}</button>
          </div>
        </div>
      </nav>

      {/* 2. HERO */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 no-print">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/10 via-slate-950 to-slate-950 -z-10"></div>
        <div className={containerClass + " grid lg:grid-cols-2 gap-16 items-center"}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter uppercase italic">{t.hero.title}</h1>
            <h2 className="text-2xl font-bold text-teal-500 uppercase tracking-widest">{t.hero.sub}</h2>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">{t.hero.desc}</p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button onClick={() => triggerIntake("demo")} className="bg-white text-black px-10 py-5 rounded-2xl font-black uppercase hover:bg-teal-500 transition-all shadow-2xl">{t.hero.btn1}</button>
              <button onClick={() => triggerIntake("demo")} className="bg-slate-900 border border-slate-700 text-white px-10 py-5 rounded-2xl font-black uppercase">{t.hero.btn2}</button>
            </div>
          </motion.div>
          <div className="relative aspect-video bg-slate-900 rounded-[3rem] border border-slate-700 overflow-hidden shadow-2xl group cursor-pointer">
            <img src="/gui_screen_1.png" className="w-full h-full object-cover opacity-30" alt="Dashboard" />
            <Play fill="currentColor" size={50} className="text-teal-500 group-hover:scale-125 transition-transform absolute" />
          </div>
        </div>
      </section>

      {/* 3. THE PROCESS */}
      <section id="process" className="py-24 bg-slate-900/20 no-print">
        <div className={containerClass}>
          <h2 className="text-center text-4xl md:text-6xl font-black text-white mb-20 uppercase tracking-tighter italic">{t.process.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {t.process.steps.map((step, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden group transition-all shadow-lg">
                <div className="h-40 bg-slate-800 relative">
                   <img src={step.img} className="w-full h-full object-contain p-2 opacity-80" alt={step.t} />
                   <span className="absolute top-2 left-4 text-2xl font-black text-white/10">{step.s}</span>
                </div>
                <div className="p-4 text-center">
                    <step.i className="mx-auto mb-2 text-teal-500" size={20} />
                    <h4 className="text-[10px] font-black text-white mb-1 uppercase leading-tight tracking-tighter">{step.t}</h4>
                    <p className="text-[8px] text-slate-500 font-bold uppercase">{step.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TRUST GUARANTEE */}
      <section className="py-24 bg-slate-950 border-y border-slate-900 no-print">
        <div className={containerClass}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic">{t.trust.title}</h2>
            <p className="mt-4 text-teal-500 font-black uppercase text-[10px] tracking-widest">{t.trust.tag}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.trust.items.map((item, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col items-center hover:bg-slate-900 transition-all text-center">
                 <item.i className={`${item.c} mb-6`} size={40} />
                 <h3 className="text-white font-black uppercase text-sm mb-4">{item.t}</h3>
                 <p className="text-slate-400 font-bold text-[11px] uppercase italic leading-relaxed tracking-tighter">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ROI CALCULATOR */}
      <section className="py-24 no-print">
        <div className={containerClass}>
          <div className="bg-slate-900 border-2 border-slate-800 rounded-[4rem] p-10 lg:p-20 shadow-2xl grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic">{t.roi.title}</h2>
                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">{t.roi.l1}: {invoices}</label>
                    <input type="range" min="100" max="5000" step="100" value={invoices} onChange={(e) => setInvoices(parseInt(e.target.value))} className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">{t.roi.l2}: ₹{staffCost}</label>
                    <input type="range" min="8000" max="50000" step="1000" value={staffCost} onChange={(e) => setStaffCost(parseInt(e.target.value))} className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                  </div>
                </div>
              </div>
              <div className="grid gap-6 text-center">
                <div className="bg-slate-950 p-10 rounded-3xl border border-slate-800">
                   <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{t.roi.r1}</p>
                   <p className="text-6xl font-black text-teal-500 tracking-tighter">{Math.round(timeSavedValue / 60)} Hrs</p>
                </div>
                <div className="bg-teal-500 p-10 rounded-3xl text-black shadow-xl">
                   <p className="text-teal-900 text-[10px] font-black uppercase tracking-widest mb-2">{t.roi.r2}</p>
                   <p className="text-6xl font-black tracking-tighter">₹{annualSavingsValue.toLocaleString()}</p>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* 6. BLOG / KNOWLEDGE HUB */}
      <section className="py-24 bg-slate-900/20 no-print">
        <div className={containerClass}>
          <h2 className="text-center text-3xl md:text-5xl font-black text-white mb-20 uppercase italic tracking-tighter">{t.blog.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: t.blog.a1.t, d: t.blog.a1.d, img: "/gui_screen_3.png" },
              { t: t.blog.a2.t, d: t.blog.a2.d, img: "/gui_screen_4.png" },
              { t: t.blog.a3.t, d: t.blog.a3.d, img: "/gui_screen_5.png" }
            ].map((art, i) => (
              <article key={i} className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden hover:border-teal-500 transition-all shadow-xl">
                 <div className="h-48 bg-slate-800"><img src={art.img} className="w-full h-full object-cover opacity-60" alt={art.t} /></div>
                 <div className="p-8">
                    <h3 className="text-lg font-black text-white mb-4 uppercase leading-tight">{art.t}</h3>
                    <p className="text-slate-400 font-bold text-xs mb-6 tracking-wide uppercase leading-relaxed">{art.d}</p>
                    <Link href="/blog" className="text-teal-500 font-black text-[10px] uppercase flex items-center gap-2 hover:gap-3 transition-all">Read Guide <ArrowRight size={14} /></Link>
                 </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MEET THE FOUNDER */}
      <section className="py-24 no-print">
        <div className={containerClass + " max-w-5xl"}>
          <div className="bg-slate-950 border-2 border-slate-800 rounded-[4rem] p-10 lg:p-20 relative overflow-hidden group shadow-2xl grid lg:grid-cols-3 gap-16 items-center">
              <div className="lg:col-span-1">
                 <div className="w-full aspect-[3/4] bg-slate-800 rounded-[3rem] border-4 border-teal-500/20 shadow-2xl overflow-hidden">
                    <img src="/jitendra.bharti.jpg" alt="Founder" className="w-full h-full object-cover" />
                 </div>
              </div>
              <div className="lg:col-span-2 space-y-8 text-center lg:text-left">
                 <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">{t.founder.title}</h2>
                 <h3 className="text-teal-500 font-black uppercase tracking-[0.3em] text-sm italic">Jitendra Bharti | LekhaFlow</h3>
                 <p className="text-xl text-slate-400 font-medium italic leading-relaxed">"{t.founder.bio}"</p>
                 <div className="bg-blue-900/20 p-6 rounded-3xl border border-blue-500/20 inline-block text-white font-bold text-sm uppercase tracking-widest shadow-md">
                    {t.founder.vision}
                 </div>
              </div>
          </div>
        </div>
      </section>

      {/* 8. PRICING */}
      <section id="pricing" className="py-24 border-t border-slate-900 no-print">
        <div className={containerClass}>
          <h2 className="text-center text-4xl font-black text-white mb-16 uppercase italic">Select Your Edition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {Object.entries(productData).map(([key, p]) => (
              <div key={key} className={`bg-slate-950 border p-6 rounded-[2.5rem] flex flex-col justify-between transition-all group ${activeTab === key ? 'border-teal-500 ring-4 ring-teal-500/10 shadow-2xl scale-[1.02]' : 'border-slate-800 hover:border-slate-700'}`}>
                <div className="space-y-4 text-center lg:text-left">
                  <h3 className="text-white font-black text-[10px] uppercase tracking-widest leading-tight">{p.title}</h3>
                  <div className="py-4 border-y border-slate-800">
                    <p className="text-teal-500 font-black text-2xl tracking-tighter">₹{p.price}</p>
                    <p className="text-[9px] text-slate-500 font-bold uppercase">{p.limit} Limit</p>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 italic leading-snug">{p.tagline}</p>
                </div>
                <div className="mt-8 space-y-2">
                  <button onClick={() => triggerIntake("demo")} className="w-full py-3 bg-slate-900 border border-slate-800 rounded-xl text-[9px] font-black uppercase tracking-widest">Quotation</button>
                  <a href={p.razorpayUrl} target="_blank" className="block w-full py-3 bg-teal-500 text-black rounded-xl text-[9px] font-black uppercase tracking-widest text-center shadow-lg active:scale-95 transition-transform">Buy Now</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CONTACT */}
      <section id="contact" className="py-24 border-t border-slate-900 no-print">
        <div className={containerClass + " grid lg:grid-cols-2 gap-20"}>
           <div className="space-y-12">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-[1.1]">Engineering Desk</h2>
              <div className="flex items-center gap-6 bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-xl">
                 <Phone className="text-teal-500" />
                 <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Hotline</p><p className="text-white font-black text-xl">+91 87708 08695</p></div>
              </div>
           </div>
           <div className="bg-white rounded-[3rem] p-2">
              <div className="bg-slate-950 border border-slate-200/10 rounded-[2.8rem] p-2 overflow-hidden"><Contact isHindi={isHindi} /></div>
           </div>
        </div>
      </section>

      <footer className="py-16 border-t border-slate-900 text-center uppercase no-print">
        <p className="text-slate-500 text-[10px] font-black tracking-[0.5em]">Nexoriva Systems © 2026 | Developed by Jitendra Bharti | Built in India 🇮🇳</p>
      </footer>
      
      {/* 📥 INTAKE MODAL */}
      {showIntakeModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
            <div className="bg-slate-900 border-2 border-teal-500 p-10 rounded-[3.5rem] max-w-md w-full relative shadow-2xl">
                <button onClick={() => setShowIntakeModal(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X size={28}/></button>
                <form onSubmit={handleIntakeSubmit} className="space-y-5">
                    <h3 className="text-2xl font-black text-white uppercase text-center mb-10 tracking-widest italic">Verification</h3>
                    <input required placeholder="YOUR FULL NAME" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, clientName: e.target.value})}/>
                    <input required placeholder="COMPANY NAME" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, companyName: e.target.value})}/>
                    <input required placeholder="WHATSAPP NUMBER" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, mobileNumber: e.target.value})}/>
                    <button type="submit" className="w-full py-5 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-black rounded-2xl uppercase text-xs tracking-widest shadow-xl">DOWNLOAD NOW</button>
                </form>
            </div>
        </div>
      )}

      <WhatsAppButton />
    </div>
  );
}