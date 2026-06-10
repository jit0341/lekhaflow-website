"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link"; 
import { 
  Zap, AlertCircle, Play, CheckCircle2, 
  Calculator, BarChart3, ShieldCheck, Target, Headphones,
  User, MessageCircle, Phone, Mail, Download, Menu, X, ChevronDown, Monitor, Cpu, Info, FileText, Printer, Globe, ArrowRight, MousePointer2, FolderOutput, Database, BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Contact from "@/components/contact";
import WhatsAppButton from "@/components/WhatsAppButton";

type Variant = "lite" | "standard" | "premium" | "gold" | "erp9_standard" | "erp9_premium";

export default function LekhaFlowLanding() {
  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Variant>("gold");
  const [showIntakeModal, setShowIntakeModal] = useState<boolean>(false);
  const [intakeTarget, setIntakeTarget] = useState<"demo" | "quotation">("demo");
  const [clientForm, setClientForm] = useState({ clientName: "", companyName: "", mobileNumber: "", clientEmail: "" });
  const [invoices, setInvoices] = useState(500);
  const [staffCost, setStaffCost] = useState(15000);

  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

  useEffect(() => {
    document.title = isHindi ? "LekhaFlow | 3 घंटे की एंट्री 3 मिनट में" : "LekhaFlow | 3 Hours Entry in 3 Minutes";
  }, [isHindi]);

  const t = {
    nav: { f: isHindi ? "विशेषताएं" : "Features", p: isHindi ? "प्रक्रिया" : "Process", pr: isHindi ? "कीमत" : "Pricing", req: isHindi ? "डेमो" : "Request Demo" },
    hero: {
      title: isHindi ? "3 घंटे की data entry को 3 मिनट में बदलने वाला टूल" : "Turns 3 hours of data entry into 3 minutes",
      desc: isHindi ? "LekhaFlow (लेखाफ्लो) भारत का सबसे तेज Invoice to Tally AI Software है। 100% सटीक प्रोसेस।" : "LekhaFlow: India's fastest AI-Powered Invoice to Tally Software. Process in seconds with 100% accuracy.",
      btn1: isHindi ? "डेमो देखें" : "Watch Demo",
      btn2: isHindi ? "ट्रायल" : "Trial"
    },
    process: {
      title: isHindi ? "प्रक्रिया" : "THE PROCESS",
      steps: [
        { s: "01", t: "01 GUI", d: isHindi ? "यूजर इंटरफेस" : "User Interface", img: "/gui_screen_1.png", i: MousePointer2 },
        { s: "02", t: isHindi ? "02 इनवॉइस अपलोड" : "02 UPLOAD THE INVOICE", d: "PDF / Image", img: "/gui_screen_2.png", i: Download },
        { s: "03", t: isHindi ? "03 जेनरेट" : "03 GENERATE", d: isHindi ? "एआई एक्सट्रैक्शन" : "AI Extraction", img: "/gui_screen_3.png", i: Zap },
        { s: "04", t: isHindi ? "04 आउटपुट" : "04 OUTPUT", d: isHindi ? "XML तैयार" : "XML Ready", img: "/gui_screen_4.png", i: FolderOutput },
        { s: "05", t: isHindi ? "05 इम्पोर्ट" : "05 IMPORT", d: isHindi ? "टैली इम्पोर्ट" : "Tally Import", img: "/gui_screen_5.png", i: FileText },
        { s: "06", t: isHindi ? "06 एंट्री" : "06 THE ENTRY", d: isHindi ? "वाउचर बन गया" : "Voucher Created", img: "/gui_screen_6.png", i: Database }
      ]
    },
    roi: { title: isHindi ? "बचत कैलकुलेटर" : "ROI Calculator", l1: isHindi ? "इनवॉइस/माह" : "Invoices/Month", l2: isHindi ? "स्टाफ वेतन" : "Staff Salary", r1: isHindi ? "बचे हुए घंटे" : "Hours Saved", r2: isHindi ? "सालाना बचत" : "Annual Savings" },
    trust: { title: isHindi ? "विश्वास गारंटी" : "OUR TRUST GUARANTEE", tag: isHindi ? "सुरक्षित GST प्लेटफॉर्म" : "A SECURE GST PLATFORM", c1: isHindi ? "डेटा सुरक्षा" : "Data Security", c1_d: isHindi ? "जीरो-डेटा रिटेंशन।" : "Zero-Data Retention.", c2: isHindi ? "सटीकता" : "Accuracy", c2_d: isHindi ? "0.01 पैसे का बैलेंस।" : "0.01 Penny Balance.", c3: isHindi ? "EDU मोड" : "EDU Mode", c3_d: isHindi ? "एजुकेशनल वर्जन सपोर्ट।" : "Educational Support.", c4: isHindi ? "सहायता" : "Support", c4_d: isHindi ? "फाउंडर डेस्क से मदद।" : "Founder Support Desk." }
  };

  const productData = {
    lite: { title: "Lite Edition", price: "15,000", limit: "2,000", tagline: "Basic Excel Mapper" },
    standard: { title: "Standard Sync", price: "25,000", limit: "5,000", tagline: "Tally Auto Entry" },
    premium: { title: "Premium Suite", price: "25,000", limit: "10,000", tagline: "Premium AI Engine" },
    gold: { title: "Gold Advance", price: "30,000", limit: "Unlimited*", tagline: "Advanced Automation" },
    erp9_standard: { title: "ERP9 Standard", price: "25,000", limit: "5,000", tagline: "Legacy Support" },
    erp9_premium: { title: "ERP9 Premium", price: "35,000", limit: "Unlimited*", tagline: "ERP9 Advance" }
  };

  const timeSavedValue = invoices * 3; 
  const moneySavedValue = Math.round((timeSavedValue / 60) * (staffCost / 160));
  const annualSavingsValue = moneySavedValue * 12;

  return (
    <div className="bg-[#020617] text-slate-200 selection:bg-teal-500 overflow-x-hidden">
      <nav className="fixed top-0 w-full z-[100] bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
        <div className={containerClass + " flex justify-between items-center h-20"}>
          <div className="text-2xl font-black text-white italic uppercase">LEKHA<span className="text-teal-500">FLOW</span></div>
          <div className="hidden lg:flex items-center gap-6 text-[10px] font-black uppercase">
            <Link href="/blog" className="text-amber-500 hover:text-amber-400">Insights / Blog</Link>
            <button onClick={() => setIsHindi(!isHindi)} className="text-teal-500 border border-teal-500/30 px-2 rounded uppercase">{isHindi ? "EN" : "HI"}</button>
            <button onClick={() => setShowIntakeModal(true)} className="bg-teal-600 px-4 py-2 rounded-lg">{t.nav.req}</button>
          </div>
        </div>
      </nav>

      <section className="pt-40 pb-20 lg:pt-56 lg:pb-32">
        <div className={containerClass + " grid lg:grid-cols-2 gap-16 items-center"}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase italic border-l-8 border-teal-500 pl-6">{t.hero.title}</h1>
            <p className="text-lg text-slate-400 font-medium leading-relaxed">{t.hero.desc}</p>
            <div className="flex gap-4">
              <button onClick={() => setShowIntakeModal(true)} className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-xs">{t.hero.btn1}</button>
              <button onClick={() => setShowIntakeModal(true)} className="bg-slate-900 border border-slate-700 px-8 py-4 rounded-2xl font-black uppercase text-xs">{t.hero.btn2}</button>
            </div>
          </motion.div>
          <div className="relative aspect-video bg-slate-900 rounded-[3rem] border border-slate-700 overflow-hidden shadow-2xl">
            <img src="/gui_screen_1.png" className="w-full h-full object-cover opacity-30" alt="Dashboard" />
            <Play fill="currentColor" size={50} className="text-teal-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* --- 🚀 THE PROCESS --- */}
      <section id="process" className="py-24 bg-slate-900/20">
        <div className={containerClass}>
          <h2 className="text-center text-4xl md:text-6xl font-black text-white mb-20 uppercase tracking-tighter italic">{t.process.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {t.process.steps.map((step, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden shadow-lg">
                <div className="h-40 bg-slate-800 relative">
                   <img src={step.img} className="w-full h-full object-contain p-2 opacity-80" alt={step.t} />
                   <span className="absolute top-2 left-4 text-2xl font-black text-white/10">{step.s}</span>
                </div>
                <div className="p-4 text-center">
                    <h4 className="text-[9px] font-black text-white mb-1 uppercase">{step.t}</h4>
                    <p className="text-[7px] text-slate-500 font-bold uppercase">{step.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 🛡️ TRUST --- */}
      <section className="py-24 bg-slate-950 border-y border-slate-900">
        <div className={containerClass}>
          <h2 className="text-3xl font-black text-white text-center mb-16 uppercase italic">{t.trust.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.trust.items.map((item, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col items-center text-center">
                 <item.i className={`${item.c} mb-6`} size={40} />
                 <h3 className="text-white font-black uppercase text-sm mb-4">{item.t}</h3>
                 <p className="text-slate-400 font-bold text-[10px] uppercase italic">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ROI --- */}
      <section className="py-24">
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

      {/* --- FOUNDER --- */}
      <section className="py-24 no-print">
        <div className={containerClass + " max-w-5xl"}>
          <div className="bg-slate-950 border-2 border-slate-800 rounded-[4rem] p-10 lg:p-20 relative overflow-hidden group shadow-2xl grid lg:grid-cols-3 gap-16 items-center">
              <div className="lg:col-span-1">
                 <div className="w-full aspect-[3/4] bg-slate-800 rounded-[3rem] border-4 border-teal-500/20 shadow-2xl overflow-hidden">
                    <img src="/jitendra.bharti.jpg" alt="Founder" className="w-full h-full object-cover grayscale-0" />
                 </div>
              </div>
              <div className="lg:col-span-2 space-y-8 text-center lg:text-left">
                 <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">{t.founder.title}</h2>
                 <p className="text-teal-500 font-black uppercase tracking-widest text-xs italic">Nexoriva Systems | India</p>
                 <p className="text-xl text-slate-400 font-medium italic leading-relaxed">"{t.founder.bio}"</p>
                 <div className="bg-blue-900/20 p-6 rounded-3xl border border-blue-500/20 inline-block text-white font-bold text-sm uppercase">
                    {t.founder.vision}
                 </div>
              </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 border-t border-slate-900 text-center uppercase">
        <p className="text-slate-500 text-[10px] font-black tracking-[0.5em]">LekhaFlow AI | Built in India 🇮🇳</p>
      </footer>
      
      <WhatsAppButton />
    </div>
  );
}