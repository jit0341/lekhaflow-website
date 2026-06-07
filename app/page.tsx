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

export default function LekhaFlowLanding() {
  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<any>("gold");
  const [quotationData, setQuotationData] = useState<any | null>(null);
  const [showIntakeModal, setShowIntakeModal] = useState<boolean>(false);
  const [intakeTarget, setIntakeTarget] = useState<"demo" | "quotation">("demo");
  const [clientForm, setClientForm] = useState({ clientName: "", companyName: "", mobileNumber: "", clientEmail: "" });

  const [invoices, setInvoices] = useState(500);
  const [staffCost, setStaffCost] = useState(15000);

  // --- 🎯 SEO & Content Dictionary (Hindi/English) ---
  const t = {
    nav: { f: isHindi ? "विशेषताएं" : "Features", p: isHindi ? "प्रक्रिया" : "Process", pr: isHindi ? "कीमत" : "Pricing", req: isHindi ? "डेमो मांगें" : "Request Demo" },
    hero: {
      title: isHindi ? "थका देने वाला एकाउंटिंग काम बंद करें" : "Stop Repetitive Accounting Work",
      sub: isHindi ? "Invoice → XML → Tally स्वचालन" : "GST Accounting Automation: Invoice → XML → Tally",
      desc: isHindi ? "लेखाफ्लो (LekhaFlow): भारत का सबसे तेज Invoice to Tally Software। किसी भी बिल को सेकंडों में 100% सटीकता के साथ प्रोसेस करें।" : "LekhaFlow: India's fastest AI-Powered Invoice to Tally Software for MSMEs. Convert invoices in seconds with 100% accuracy.",
      btn1: isHindi ? "डेमो देखें" : "Watch Demo",
      btn2: isHindi ? "ट्रायल डाउनलोड करें" : "Download Trial"
    },
    trust: {
      title: isHindi ? "हमारी सुरक्षा और विश्वास गारंटी" : "OUR TRUST GUARANTEE",
      tag: isHindi ? "सुरक्षित GST एकाउंटिंग प्लेटफॉर्म" : "A SECURE GST ACCOUNTING PLATFORM FOR MSMEs",
      c1: isHindi ? "डेटा सुरक्षा और गोपनीयता" : "Data Security & Privacy",
      c1_1: isHindi ? "जीरो-डेटा रिटेंशन: हम डेटा स्टोर नहीं करते।" : "Zero-Data Retention Policy: We don't store your files.",
      c2: isHindi ? "तकनीकी सटीकता" : "Technical Accuracy",
      c2_1: isHindi ? "डायनामिक राउंडिंग: 0.01 पैसे का भी सटीक बैलेंस।" : "Dynamic Rounding: Error-free balancing up to 0.01 variance.",
      c3: isHindi ? "उपयोग की शर्तें" : "Usage Highlights",
      c3_1: isHindi ? "टैली एजुकेशनल वर्जन के साथ पूरी तरह संगत।" : "Fully compatible with Tally Educational Version.",
      c4: isHindi ? "ग्राहक सहायता" : "Customer Commitment",
      c4_1: isHindi ? "डायरेक्ट फाउंडर सपोर्ट: इंजीनियरिंग डेस्क से सहायता।" : "Direct Founder Support: Assistance from engineering desk."
    },
    blog: {
        title: isHindi ? "एकाउंटिंग गाइड और लेख" : "Accounting Guides & Articles",
        a1: { t: isHindi ? "एकाउंटिंग में समय बचाने के 5 तरीके" : "5 Ways to Save Time on Accounting", d: isHindi ? "मैन्युअल एंट्री को ऑटोमेशन से बदलकर अपनी उत्पादकता बढ़ाएं।" : "Boost productivity by replacing manual data entry with AI." },
        a2: { t: isHindi ? "मैन्युअल डेटा एंट्री आपके मुनाफे को कैसे कम कर रही है?" : "How Manual Data Entry Kills Your Profits", d: isHindi ? "गलतियों और स्टाफ की निर्भरता को खत्म करने का सही समय।" : "The right time to eliminate errors and staff dependency." },
        a3: { t: isHindi ? "छत्तीसगढ़ में MSMEs के लिए बेस्ट GST सॉफ्टवेयर" : "Best GST Software for MSMEs in Chhattisgarh", d: isHindi ? "स्थानीय व्यापारियों के लिए टैली इम्पोर्ट का सबसे आसान समाधान।" : "The easiest Tally import solution for local businesses." }
    },
    founder: {
      title: isHindi ? "संस्थापक: जितेंद्र भारती" : "Meet The Founder: Jitendra Bharti",
      bio: isHindi ? "LekhaFlow AI Systems के संस्थापक। मिशन: भारतीय व्यवसायों से मैन्युअल डेटा एंट्री को खत्म करना।" : "Founder, LekhaFlow AI Systems. Mission: Helping Indian businesses eliminate manual accounting entry."
    }
  };

  const downloadRoutes: any = {
    gold: "https://www.dropbox.com/scl/fi/tyv7sepqejvkvfn7mjvzq/Lekhaflow_Gold_setup.rar?dl=1",
    standard: "https://www.dropbox.com/scl/fi/8pqk5mvruopj1wzhmfi0d/Lekhaflow_Standard_setup.rar?dl=1"
  };

  const timeSaved = invoices * 3; 
  const moneySaved = Math.round((timeSaved / 60) * (staffCost / 160));
  const annualSavings = moneySaved * 12;

  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

  return (
    <div className="bg-[#020617] text-slate-200 selection:bg-teal-500 selection:text-white overflow-x-hidden">
      
      {/* 1. NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] bg-[#020617]/80 backdrop-blur-md border-b border-slate-800 no-print">
        <div className={`${containerClass} flex justify-between items-center h-20`}>
          <div className="text-2xl font-black tracking-tighter text-white uppercase">LEKHA<span className="text-teal-500">FLOW</span></div>
          <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest">
            <a href="#features" className="hover:text-teal-400">{t.nav.f}</a>
            <a href="#process" className="hover:text-teal-400">{t.nav.p}</a>
            <a href="#pricing" className="hover:text-teal-400">{t.nav.pr}</a>
            <button onClick={() => setIsHindi(!isHindi)} className="text-teal-500 border border-teal-500/30 px-3 py-1 rounded bg-teal-500/5 font-bold uppercase transition-all">
              {isHindi ? "ENGLISH" : "हिंदी"}
            </button>
            <button onClick={() => setShowIntakeModal(true)} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg">{t.nav.req}</button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION (SEO H1) */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/10 via-slate-950 to-slate-950 -z-10"></div>
        <div className={`${containerClass} grid lg:grid-cols-2 gap-16 items-center`}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter uppercase italic">
              {t.hero.title}
            </h1>
            <h2 className="text-2xl font-bold text-teal-500 uppercase tracking-widest">{t.hero.sub}</h2>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">{t.hero.desc}</p>
            <div className="flex gap-4">
              <button onClick={() => setShowIntakeModal(true)} className="bg-white text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-teal-500 transition-all shadow-2xl">{t.hero.btn1}</button>
              <button onClick={() => setShowIntakeModal(true)} className="bg-slate-900 border border-slate-700 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest">{t.hero.btn2}</button>
            </div>
          </motion.div>
          <div className="relative aspect-video bg-slate-900 rounded-[3rem] border border-slate-700 overflow-hidden flex items-center justify-center group cursor-pointer shadow-2xl">
            <img src="/gui_screen_1.png" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" alt="LekhaFlow AI Automatic data entry for Tally" />
            <div className="absolute inset-0 flex items-center justify-center">
                <Play fill="currentColor" size={40} className="text-teal-500 group-hover:scale-125 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE PROCESS SECTION */}
      <section id="process" className="py-24 bg-slate-900/20">
        <div className={`${containerClass}`}>
          <h2 className="text-center text-4xl md:text-6xl font-black text-white mb-20 uppercase tracking-tighter italic">{t.process.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { s: "01", t: t.process.s1.t, d: t.process.s1.d, i: MousePointer2, color: "border-blue-500/20", img: "/gui_screen_1.png" },
              { s: "02", t: t.process.s2.t, d: t.process.s2.d, i: Download, color: "border-teal-500/20", img: "/gui_screen_2.png" },
              { s: "03", t: t.process.s3.t, d: t.process.s3.d, i: Zap, color: "border-amber-500/20", img: "/gui_screen_3.png" },
              { s: "04", t: t.process.s4.t, d: t.process.s4.d, i: FolderOutput, color: "border-purple-500/20", img: "/gui_screen_4.png" },
              { s: "05", t: t.process.s5.t, d: t.process.s5.d, i: FileText, color: "border-emerald-500/20", img: "/gui_screen_5.png" },
              { s: "06", t: t.process.s6.t, d: t.process.s6.d, i: Database, color: "border-blue-400/20", img: "/gui_screen_6.png" }
            ].map((w, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className={`bg-slate-900 border-2 ${w.color} rounded-[2rem] overflow-hidden flex flex-col group transition-all shadow-lg`}>
                <div className="h-40 bg-slate-800 relative overflow-hidden">
                   <img src={w.img} className="w-full h-full object-contain p-2 opacity-80 group-hover:opacity-100 transition-opacity" alt={`LekhaFlow Process Step ${w.s}`} />
                </div>
                <div className="p-4 text-center">
                    <h4 className="text-[10px] font-black text-white uppercase tracking-tighter">{w.t}</h4>
                    <p className="text-[8px] text-slate-500 font-bold uppercase">{w.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 🛡️ OUR TRUST GUARANTEE (NEW) */}
      <section className="py-24 bg-slate-950 border-y border-slate-900">
        <div className={`${containerClass}`}>
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic">{t.trust.title}</h2>
            <p className="mt-4 text-teal-500 font-black uppercase tracking-widest text-[10px]">{t.trust.tag}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { i: ShieldCheck, t: t.trust.c1, d: t.trust.c1_1, c: "text-teal-500" },
              { i: Target, t: t.trust.c2, d: t.trust.c2_1, c: "text-blue-500" },
              { i: Cpu, t: t.trust.c3, d: t.trust.c3_1, c: "text-amber-500" },
              { i: Headphones, t: t.trust.c4, d: t.trust.c4_1, c: "text-pink-500" }
            ].map((item, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:bg-slate-900 transition-all text-center flex flex-col items-center">
                 <item.i className={`${item.c} mb-6`} size={48} />
                 <h3 className="text-white font-black uppercase text-sm mb-4 tracking-wider">{item.t}</h3>
                 <p className="text-slate-400 font-bold text-[11px] leading-relaxed uppercase tracking-tighter italic">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ROI CALCULATOR */}
      <section className="py-24">
        <div className={`${containerClass}`}>
          <div className="bg-slate-900 border-2 border-slate-800 rounded-[4rem] p-10 lg:p-20 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic">{t.roi.title}</h2>
                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">{t.roi.label1}: <span className="text-white text-xl ml-2">{invoices}</span></label>
                    <input type="range" min="100" max="5000" step="100" value={invoices} onChange={(e) => setInvoices(parseInt(e.target.value))} className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">{t.roi.label2}: <span className="text-white text-xl ml-2">₹{staffCost}</span></label>
                    <input type="range" min="8000" max="50000" step="1000" value={staffCost} onChange={(e) => setStaffCost(parseInt(e.target.value))} className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                  </div>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="bg-slate-950 p-10 rounded-3xl border border-slate-800 text-center">
                   <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{t.roi.save1}</p>
                   <p className="text-6xl font-black text-teal-500 tracking-tighter">{Math.round(timeSaved / 60)} Hrs</p>
                </div>
                <div className="bg-teal-500 p-10 rounded-3xl text-center text-black">
                   <p className="text-teal-900 text-[10px] font-black uppercase tracking-widest mb-2">{t.roi.save2}</p>
                   <p className="text-6xl font-black tracking-tighter">₹{annualSavings.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ARTICLES / KNOWLEDGE HUB (SEO Section) */}
      <section className="py-24 bg-slate-900/20 no-print">
        <div className={`${containerClass}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic">{t.blog.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: t.blog.a1.t, d: t.blog.a1.d, img: "/gui_screen_3.png" },
              { t: t.blog.a2.t, d: t.blog.a2.d, img: "/gui_screen_4.png" },
              { t: t.blog.a3.t, d: t.blog.a3.d, img: "/gui_screen_5.png" }
            ].map((art, i) => (
              <article key={i} className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden hover:border-teal-500 transition-all">
                 <div className="h-48 bg-slate-800 overflow-hidden">
                    <img src={art.img} className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700" alt={art.t} />
                 </div>
                 <div className="p-8">
                    <h3 className="text-lg font-black text-white mb-4 uppercase leading-tight tracking-tight">{art.t}</h3>
                    <p className="text-slate-400 font-bold text-xs mb-6 tracking-wide">{art.d}</p>
                    <a href="#contact" className="text-teal-500 font-black text-[10px] uppercase flex items-center gap-2 hover:gap-3 transition-all">
                      Read Guide <ArrowRight size={14} />
                    </a>
                 </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MEET THE FOUNDER */}
      <section className="py-24">
        <div className={`${containerClass} max-w-5xl`}>
          <div className="bg-slate-950 border-2 border-slate-800 rounded-[4rem] p-10 lg:p-20 relative overflow-hidden group shadow-2xl">
            <div className="grid lg:grid-cols-3 gap-16 items-center relative z-10">
              <div className="lg:col-span-1">
                 <div className="w-full aspect-[3/4] bg-slate-800 rounded-[3rem] border-4 border-teal-500/20 shadow-2xl overflow-hidden">
                    <img src="/jitendra.bharti.jpg" alt="Jitendra Bharti - Founder of LekhaFlow AI Accounting Automation" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
                 </div>
              </div>
              <div className="lg:col-span-2 space-y-8">
                 <div className="space-y-2">
                    <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">{t.founder.title}</h2>
                    <p className="text-teal-500 font-black uppercase tracking-[0.3em] text-sm italic">Nexoriva Systems | Surajpur, Chhattisgarh</p>
                 </div>
                 <p className="text-xl text-slate-400 font-medium italic leading-relaxed">"{t.founder.bio}"</p>
                 <div className="bg-[#1e3a8a]/20 p-6 rounded-3xl border border-blue-500/20">
                    <p className="text-white font-bold text-sm uppercase">{t.founder.vision}</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CONTACT */}
      <section id="contact" className="py-24 border-t border-slate-900">
        <div className={`${containerClass} grid lg:grid-cols-2 gap-20`}>
           <div className="space-y-12">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-[1.1]">Request a Custom <br />Automation Demo</h2>
              <div className="space-y-6">
                 <div className="flex items-center gap-6 bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-xl">
                    <Phone className="text-teal-500" />
                    <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Call Our Expert</p><p className="text-white font-black text-xl">+91 87708 08695</p></div>
                 </div>
              </div>
           </div>
           <div className="bg-white rounded-[3rem] p-2 shadow-2xl">
              <div className="bg-slate-950 border border-slate-200/10 rounded-[2.8rem] p-2 overflow-hidden"><Contact isHindi={isHindi} /></div>
           </div>
        </div>
      </section>

      <footer className="py-16 border-t border-slate-900 text-center uppercase">
        <p className="text-slate-500 text-[10px] font-black tracking-[0.5em]">LekhaFlow AI | GST Accounting Automation in Chhattisgarh | Built in India 🇮🇳</p>
      </footer>
      
      <WhatsAppButton />
    </div>
  );
}