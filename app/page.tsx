"use client";

import React, { useState, useEffect } from "react";
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
  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Variant>("gold");
  const [quotationData, setQuotationData] = useState<any | null>(null);
  const [showIntakeModal, setShowIntakeModal] = useState<boolean>(false);
  const [intakeTarget, setIntakeTarget] = useState<"demo" | "quotation">("demo");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clientForm, setClientForm] = useState({ clientName: "", companyName: "", mobileNumber: "", clientEmail: "" });

  const [invoices, setInvoices] = useState(500);
  const [staffCost, setStaffCost] = useState(15000);

  useEffect(() => {
    document.title = "LekhaFlow | AI Accounting Automation for Tally & BUSY";
  }, []);

  const WHATSAPP_LINK = "https://wa.me/918770808695";

  // --- 🎯 FULL TRANSLATION DICTIONARY (SEO OPTIMIZED) ---
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
      title: isHindi ? "प्रक्रिया" : "THE PROCESS",
      s1: { t: "01 GUI", d: isHindi ? "यूजर इंटरफेस" : "User Interface" },
      s2: { t: "02 UPLOAD THE INVOICE", d: isHindi ? "PDF / इमेज / एक्सेल" : "PDF / Image / Excel" },
      s3: { t: "03 GENERATE", d: isHindi ? "एआई एक्सट्रैक्शन" : "AI Extraction" },
      s4: { t: "04 OUTPUT", d: isHindi ? "XML फाइलें तैयार" : "XML Files Ready" },
      s5: { t: "05 IMPORT", d: isHindi ? "टैली में इम्पोर्ट" : "Tally Import" },
      s6: { t: "06 THE ENTRY", d: isHindi ? "वाउचर बन गया" : "Voucher Created" }
    },
    trust: {
      title: isHindi ? "हमारी सुरक्षा और विश्वास गारंटी" : "OUR TRUST GUARANTEE",
      tag: isHindi ? "सुरक्षित GST एकाउंटिंग प्लेटफॉर्म" : "A SECURE GST ACCOUNTING PLATFORM FOR MSMEs",
      c1: isHindi ? "डेटा सुरक्षा" : "Data Security",
      c1_d: isHindi ? "जीरो-डेटा रिटेंशन: हम डेटा स्टोर नहीं करते।" : "Zero-Data Retention Policy.",
      c2: isHindi ? "तकनीकी सटीकता" : "Technical Accuracy",
      c2_d: isHindi ? "डायनामिक राउंडिंग: 0.01 पैसे का बैलेंस।" : "Dynamic Rounding: Error-free.",
      c3: isHindi ? "उपयोग की शर्तें" : "Usage Rules",
      c3_d: isHindi ? "टैली EDU वर्जन के साथ संगत।" : "Tally EDU Version Compatible.",
      c4: isHindi ? "ग्राहक सहायता" : "Customer Support",
      c4_d: isHindi ? "इंजीनियरिंग डेस्क से सीधी मदद।" : "Direct Founder Support Desk."
    },
    blog: {
        title: isHindi ? "एकाउंटिंग गाइड और लेख" : "Accounting Guides & Knowledge Hub",
        a1: { t: isHindi ? "एकाउंटिंग में समय बचाने के 5 तरीके" : "5 Ways to Save Time on Accounting", d: isHindi ? "मैन्युअल एंट्री को ऑटोमेशन से बदलकर अपनी उत्पादकता बढ़ाएं।" : "Boost productivity by replacing manual data entry with AI." },
        a2: { t: isHindi ? "मैन्युअल डेटा एंट्री आपके मुनाफे को कैसे कम कर रही है?" : "How Manual Data Entry Kills Your Profits", d: isHindi ? "गलतियों और स्टाफ की निर्भरता को खत्म करने का सही समय।" : "The right time to eliminate errors and staff dependency." },
        a3: { t: isHindi ? "छत्तीसगढ़ में MSMEs के लिए बेस्ट GST सॉफ्टवेयर" : "Best GST Software for MSMEs in Chhattisgarh", d: isHindi ? "स्थानीय व्यापारियों के लिए टैली इम्पोर्ट का सबसे आसान समाधान।" : "The easiest Tally import solution for local businesses." }
    },
    founder: {
      title: isHindi ? "संस्थापक से मिलें" : "Meet The Founder",
      bio: isHindi ? "स्वचालन (automation) के क्षेत्र में 10+ वर्षों का अनुभव। भारतीय व्यवसायों को थका देने वाली डेटा एंट्री से मुक्त करना।" : "10+ Years in automation experience. Helping Indian businesses eliminate manual accounting entry.",
      vision: isHindi ? "100% सटीकता के साथ लोकल फाउंडर सपोर्ट" : "100% Accuracy with Local Founder Support"
    },
    roi: {
      title: isHindi ? "बचत कैलकुलेटर" : "ROI Calculator",
      l1: isHindi ? "इनवॉइसेस / माह" : "Invoices / Month",
      l2: isHindi ? "स्टाफ वेतन (प्रति माह)" : "Monthly Staff Salary",
      r1: isHindi ? "बचे हुए घंटे" : "Hours Saved",
      r2: isHindi ? "सालाना बचत" : "Annual Savings"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div className="text-2xl font-black tracking-tighter text-white uppercase italic">LEKHA<span className="text-teal-500">FLOW</span></div>
          <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest">
            <a href="#features" className="hover:text-teal-400">{t.nav.f}</a>
            <a href="#process" className="hover:text-teal-400">{t.nav.p}</a>
            <a href="#pricing" className="hover:text-teal-400">{t.nav.pr}</a>
            <button onClick={() => setIsHindi(!isHindi)} className="text-teal-500 border border-teal-500/30 px-3 py-1 rounded bg-teal-500/5 font-bold uppercase transition-all">
              {isHindi ? "ENGLISH" : "हिंदी"}
            </button>
            <button onClick={() => triggerIntake("demo")} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl shadow-lg uppercase">{t.nav.req}</button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION (H1) */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter uppercase italic">{t.hero.title}</h1>
            <h2 className="text-2xl font-bold text-teal-500 uppercase tracking-widest">{t.hero.sub}</h2>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">{t.hero.desc}</p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button onClick={() => triggerIntake("demo")} className="bg-white text-black px-10 py-5 rounded-2xl font-black uppercase hover:bg-teal-500 transition-all shadow-2xl">{t.hero.btn1}</button>
              <button onClick={() => triggerIntake("demo")} className="bg-slate-900 border border-slate-700 text-white px-10 py-5 rounded-2xl font-black uppercase">{t.hero.btn2}</button>
            </div>
          </motion.div>
          <div className="relative aspect-video bg-slate-900 rounded-[3rem] border border-slate-700 overflow-hidden flex items-center justify-center shadow-2xl group cursor-pointer">
            <img src="/gui_screen_1.png" className="w-full h-full object-cover opacity-30" alt="LekhaFlow: Automatic data entry for Tally" />
            <Play fill="currentColor" size={50} className="text-teal-500 group-hover:scale-125 transition-transform absolute" />
          </div>
        </div>
      </section>

      {/* 3. THE PROCESS */}
      <section id="process" className="py-24 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl md:text-6xl font-black text-white mb-20 uppercase tracking-tighter italic">{t.process.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { s: "01", t: t.process.s1.t, d: t.process.s1.d, i: MousePointer2, c: "border-blue-500/20", img: "/gui_screen_1.png" },
              { s: "02", t: t.process.s2.t, d: t.process.s2.d, i: Download, c: "border-teal-500/20", img: "/gui_screen_2.png" },
              { s: "03", t: t.process.s3.t, d: t.process.s3.d, i: Zap, c: "border-amber-500/20", img: "/gui_screen_3.png" },
              { s: "04", t: t.process.s4.t, d: t.process.s4.d, i: FolderOutput, c: "border-purple-500/20", img: "/gui_screen_4.png" },
              { s: "05", t: t.process.s5.t, d: t.process.s5.d, i: FileText, c: "border-emerald-500/20", img: "/gui_screen_5.png" },
              { s: "06", t: t.process.s6.t, d: t.process.s6.d, i: Database, c: "border-blue-400/20", img: "/gui_screen_6.png" }
            ].map((step, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className={`bg-slate-900 border-2 ${step.c} rounded-[2rem] overflow-hidden group transition-all`}>
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

      {/* 4. 🛡️ TRUST GUARANTEE (RECTIFIED) */}
      <section className="py-24 bg-slate-950 border-y border-slate-900 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic">{t.trust.title}</h2>
            <p className="mt-4 text-teal-500 font-black uppercase text-[10px] tracking-widest">{t.trust.tag}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { i: ShieldCheck, t: t.trust.c1, d: t.trust.c1_d, c: "text-teal-500" },
              { i: Target, t: t.trust.c2, d: t.trust.c2_d, c: "text-blue-500" },
              { i: Cpu, t: t.trust.c3, d: t.trust.c3_d, c: "text-amber-500" },
              { i: Headphones, t: t.trust.c4, d: t.trust.c4_d, c: "text-pink-500" }
            ].map((item, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col items-center hover:bg-slate-900 transition-all">
                 <item.i className={`${item.c} mb-6`} size={40} />
                 <h3 className="text-white font-black uppercase text-sm mb-4">{item.t}</h3>
                 <p className="text-slate-400 font-bold text-[11px] uppercase italic tracking-tighter leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ROI CALCULATOR */}
      <section className="py-24 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 border-2 border-slate-800 rounded-[4rem] p-10 lg:p-20 shadow-2xl grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic">{t.roi.title}</h2>
                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">{t.roi.l1}: <span className="text-white text-xl ml-2">{invoices}</span></label>
                    <input type="range" min="100" max="5000" step="100" value={invoices} onChange={(e) => setInvoices(parseInt(e.target.value))} className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">{t.roi.l2}: <span className="text-white text-xl ml-2">₹{staffCost}</span></label>
                    <input type="range" min="8000" max="50000" step="1000" value={staffCost} onChange={(e) => setStaffCost(parseInt(e.target.value))} className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                  </div>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="bg-slate-950 p-10 rounded-3xl border border-slate-800 text-center">
                   <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{t.roi.r1} / Month</p>
                   <p className="text-6xl font-black text-teal-500 tracking-tighter">{Math.round(timeSavedValue / 60)} Hrs</p>
                </div>
                <div className="bg-teal-500 p-10 rounded-3xl text-center text-black">
                   <p className="text-teal-900 text-[10px] font-black uppercase tracking-widest mb-2">{t.roi.r2}</p>
                   <p className="text-6xl font-black tracking-tighter">₹{annualSavingsValue.toLocaleString()}</p>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* 6. KNOWLEDGE HUB (SEO Articles) */}
      <section className="py-24 bg-slate-900/20 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic">{t.blog.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: t.blog.a1.t, d: t.blog.a1.d, img: "/gui_screen_3.png" },
              { t: t.blog.a2.t, d: t.blog.a2.d, img: "/gui_screen_4.png" },
              { t: t.blog.a3.t, d: t.blog.a3.d, img: "/gui_screen_5.png" }
            ].map((art, i) => (
              <article key={i} className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden hover:border-teal-500 transition-all shadow-xl">
                 <div className="h-48 bg-slate-800">
                    <img src={art.img} className="w-full h-full object-cover opacity-60 grayscale-0" alt={art.t} />
                 </div>
                 <div className="p-8">
                    <h3 className="text-lg font-black text-white mb-4 uppercase leading-tight tracking-tight">{art.t}</h3>
                    <p className="text-slate-400 font-bold text-xs mb-6 tracking-wide uppercase">{art.d}</p>
                    <a href="#contact" className="text-teal-500 font-black text-[10px] uppercase flex items-center gap-2 hover:gap-3 transition-all">Read Guide <ArrowRight size={14} /></a>
                 </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MEET THE FOUNDER (COLOR PHOTO) */}
      <section className="py-24 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-slate-950 border-2 border-slate-800 rounded-[4rem] p-10 lg:p-20 relative overflow-hidden group shadow-2xl grid lg:grid-cols-3 gap-16 items-center">
              <div className="lg:col-span-1">
                 <div className="w-full aspect-[3/4] bg-slate-800 rounded-[3rem] border-4 border-teal-500/20 shadow-2xl overflow-hidden">
                    <img src="/jitendra.bharti.jpg" alt="Jitendra Bharti - LekhaFlow Founder" className="w-full h-full object-cover" />
                 </div>
              </div>
              <div className="lg:col-span-2 space-y-8 text-center lg:text-left">
                 <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">{t.founder.title}</h2>
                 <h3 className="text-teal-500 font-black uppercase tracking-[0.3em] text-sm italic">Jitendra Bharti | <span className="text-slate-500">LekhaFlow AI Systems</span></h3>
                 <p className="text-xl text-slate-400 font-medium italic leading-relaxed">"{t.founder.bio}"</p>
                 <div className="bg-blue-900/20 p-6 rounded-3xl border border-blue-500/20 inline-block text-white font-bold text-sm uppercase tracking-widest shadow-md">
                    {t.founder.vision}
                 </div>
              </div>
          </div>
        </div>
      </section>

      {/* 8. PRICING GRID */}
      <section id="pricing" className="py-24 border-t border-slate-900 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-black text-white mb-16 uppercase italic">Select Your Edition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {Object.entries(productData).map(([key, p]) => (
              <div key={key} className={`bg-slate-950 border p-6 rounded-[2.5rem] flex flex-col justify-between transition-all group ${activeTab === key ? 'border-teal-500 ring-4 ring-teal-500/10 shadow-2xl scale-[1.02]' : 'border-slate-800 hover:border-slate-700'}`}>
                <div className="space-y-4">
                  <h3 className="text-white font-black text-[10px] uppercase tracking-widest leading-tight">{p.title}</h3>
                  <div className="py-4 border-y border-slate-800">
                    <p className="text-teal-500 font-black text-2xl tracking-tighter">₹{p.price}</p>
                    <p className="text-[9px] text-slate-500 font-bold uppercase">{p.limit} Limit</p>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 italic leading-snug">{p.tagline}</p>
                </div>
                <div className="mt-8 space-y-2">
                  <button onClick={() => triggerIntake("demo")} className="w-full py-3 bg-slate-900 border border-slate-800 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-800">Quotation</button>
                  <a href={p.razorpayUrl} target="_blank" className="block w-full py-3 bg-teal-500 text-black rounded-xl text-[9px] font-black uppercase tracking-widest text-center shadow-lg transition-transform active:scale-95">Buy Now</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CONTACT */}
      <section id="contact" className="py-24 border-t border-slate-900 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-20">
           <div className="space-y-12">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-[1.1]">Request a Custom <br />GST Automation Demo</h2>
              <div className="flex items-center gap-6 bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-xl hover:border-teal-500/30 transition-all">
                 <Phone className="text-teal-500" />
                 <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Call Our Expert</p><p className="text-white font-black text-xl">+91 87708 08695</p></div>
              </div>
           </div>
           <div className="bg-white rounded-[3rem] p-2 shadow-2xl">
              <div className="bg-slate-950 border border-slate-200/10 rounded-[2.8rem] p-2 overflow-hidden"><Contact isHindi={isHindi} /></div>
           </div>
        </div>
      </section>

      <footer className="py-16 border-t border-slate-900 text-center uppercase no-print">
        <p className="text-slate-500 text-[10px] font-black tracking-[0.5em]">LekhaFlow AI | GST Accounting Automation in Chhattisgarh | Built in India 🇮🇳</p>
      </footer>
      
      <WhatsAppButton />
    </div>
  );
}