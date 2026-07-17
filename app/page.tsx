"use client";

import ProblemSection from "@/components/ProblemSection";
import ProcessSection from "@/components/ProcessSection";
import React, { useState, useEffect } from "react";
import Link from "next/link"; 
import { 
  Zap, ShieldCheck, Target, Headphones,
  Download, X, ChevronDown, Cpu, FileText, ArrowRight, Database, CheckCircle2, Laptop
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function LekhaFlowLanding() {
  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [showIntakeModal, setShowIntakeModal] = useState<boolean>(false);
  const [intakeTarget, setIntakeTarget] = useState<"demo" | "quotation">("demo");
  const [clientForm, setClientForm] = useState({ clientName: "", companyName: "", mobileNumber: "", clientEmail: "" });
  const [invoices, setInvoices] = useState(500);
  const [staffCost, setStaffCost] = useState(15000);
  const [downloadLinks, setDownloadLinks] = useState({ standard: "", demo: "", gold: "" });
  const [latestVersion, setLatestVersion] = useState("");
  const [publishedAt, setPublishedAt] = useState("");

  useEffect(() => {
    async function loadDownloads() {
      try {
        const response = await fetch("/api/github_release");
        const data = await response.json();
        if (data.success) {
          setDownloadLinks({
            standard: data.standard?.url || "",
            demo: data.demo?.url || "",
            gold: data.gold?.url || ""
          });
          setLatestVersion(data.gold?.version || data.standard?.version || "v15.0");
          setPublishedAt(data.gold?.publishedAt || "");
        }
      } catch (err) { console.error(err); }
    }
    loadDownloads();
  }, []);

  const formatDate = (date: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };
    
  const containerClass = "max-w-7xl mx-auto px-6 lg:px-8";

  // --- 🎯 PROFESSIONAL WORDING DICTIONARY ---
  const t = {
    hero: {
      badge: isHindi ? "एआई-संचालित शून्य-त्रुटि लेखांकन" : "AI-POWERED ZERO-ERROR ACCOUNTING",
      title: isHindi ? (
        <>मैन्युअल डाटा एंट्री बंद करें। <span className="text-teal-500 italic">लेखाफ्लो एआई</span> के साथ स्केल करें।</>
      ) : (
        <>STOP MANUAL DATA ENTRY. SCALE WITH <span className="text-teal-500 italic">LEKHAFLOW AI.</span></>
      ),
      desc: isHindi 
        ? "भारत का सबसे भरोसेमंद इनवॉइस ऑटोमेशन सिस्टम। 3 घंटे के क्लर्कियल काम को 3 मिनट की प्रोफेशनल सटीकता में बदलें।" 
        : "Eliminate repetitive manual entry and human errors. Transform 3 hours of clerical exhaustion into 3 minutes of professional precision with India's most accurate Invoice-to-Tally AI.",
    },
    trust: [
        { i: ShieldCheck, t: isHindi ? "डेटा गोपनीयता" : "Enterprise Security", d: isHindi ? "आपका डेटा आपके सिस्टम पर।" : "Zero-retention local processing.", c: "text-teal-500" },
        { i: Target, t: isHindi ? "शून्य त्रुटि सटीकता" : "Zero-Error Accuracy", d: isHindi ? "99.9% तकनीकी संतुलन।" : "Dynamic balance validation.", c: "text-blue-500" },
        { i: Cpu, t: isHindi ? "स्मार्ट मैपिंग" : "Smart Auto-Mapping", d: isHindi ? "डुप्लीकेट एंट्री से सुरक्षा।" : "Automatic Ledger matching.", c: "text-amber-500" },
        { i: Headphones, t: isHindi ? "प्राथमिकता सहायता" : "Priority Support", d: isHindi ? "सीधे फाउंडर डेस्क से।" : "Direct expert technical desk.", c: "text-pink-500" }
    ]
  };

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowIntakeModal(false);
    window.location.href = "/downloads";
  };

  const timeSavedValue = invoices * 3;
  const annualSavingsValue = Math.round((timeSavedValue / 60) * (staffCost / 160)) * 12;

  return (
    <div className="bg-[#020617] text-slate-200 selection:bg-teal-500 font-sans">
      
      {/* 1. NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] bg-[#020617]/90 backdrop-blur-xl border-b border-slate-800">
        <div className={containerClass + " flex justify-between items-center h-20"}>
          <Link href="/" className="text-xl font-black text-white tracking-tighter uppercase">LEKHA<span className="text-teal-500">FLOW</span></Link>
          <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <Link href="#process" className="hover:text-white transition-colors">Technology</Link>
            <Link href="/blog" className="text-amber-500 hover:text-amber-400 font-black">Insights</Link>
            <Link href="/downloads" className="hover:text-white transition-colors">Download Center</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Enterprise Pricing</Link>
            <button onClick={() => setIsHindi(!isHindi)} className="text-teal-500 border border-teal-500/30 px-3 py-1 rounded hover:bg-teal-500/10">{isHindi ? "ENGLISH" : "हिंदी"}</button>
            <Link href="/downloads" className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-xl shadow-lg font-black transition-all">Get Trial</Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION (Stretched & Professional) */}
      <section className="pt-44 pb-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.08)_0,transparent_70%)] pointer-events-none" />
        <div className={containerClass + " text-center relative z-10"}>
          <div className="inline-block mb-8 px-5 py-2 bg-teal-500/5 border border-teal-500/20 rounded-full">
            <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.4em]">{t.hero.badge}</p>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] uppercase tracking-tighter mb-10 max-w-6xl mx-auto">
            {t.hero.title}
          </h1>

          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-4xl mx-auto leading-relaxed mb-14">
            {t.hero.desc}
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/downloads" className="group flex items-center gap-3 px-10 py-5 bg-teal-600 text-white font-black rounded-2xl uppercase text-xs tracking-widest shadow-2xl shadow-teal-600/20 hover:bg-teal-500 hover:-translate-y-1 transition-all">
              Start Free Trial <Download size={18} className="group-hover:translate-y-1 transition-transform" />
            </Link>
           <button 
              onClick={() => {
                 setIntakeTarget("demo");
                  setShowIntakeModal(true);
              }} 
              className="px-10 py-5 bg-slate-900 text-white font-black rounded-2xl uppercase text-xs tracking-widest border border-slate-800 hover:bg-slate-800 transition-all"
>
              Request Live Demo
          </button>
          
              Request Live Demo
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-24 flex flex-wrap justify-center gap-12 border-t border-slate-900 pt-12">
            {[
                { l: "Accuracy", v: "100%", i: Target },
                { l: "Efficiency", v: "80x Faster", i: Zap },
                { l: "Compliance", v: "GST Ready", i: ShieldCheck }
            ].map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                    <m.i className="text-teal-500" size={20} />
                    <div className="text-left">
                        <p className="text-white font-black text-lg leading-none">{m.v}</p>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">{m.l}</p>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      <ProblemSection isHindi={isHindi} />
      <ProcessSection isHindi={isHindi} />

      {/* 3. CORE BENEFITS (Redesigned Trust Section) */}
      <section className="py-24 bg-slate-950 border-y border-slate-900">
        <div className={containerClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.trust.map((item, i) => (
              <div key={i} className="group bg-slate-900/30 border border-slate-800 p-10 rounded-[3rem] hover:bg-slate-900 hover:border-teal-500/30 transition-all">
                 <item.i className={`${item.c} mb-8 group-hover:scale-110 transition-transform`} size={32} />
                 <h3 className="text-white font-black uppercase text-sm mb-4 tracking-widest">{item.t}</h3>
                 <p className="text-slate-500 font-medium text-xs leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ROI CALCULATOR (Financial Impact) */}
      <section className="py-28">
        <div className={containerClass}>
          <div className="bg-slate-900 border border-slate-800 rounded-[4rem] p-10 lg:p-20 shadow-2xl grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">The Financial Impact of <span className="text-teal-500">Automation</span></h2>
                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">Average Invoices / Month: {invoices}</label>
                    <input type="range" min="100" max="5000" step="100" value={invoices} onChange={(e) => setInvoices(parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">Current Staff Salary: ₹{staffCost}</label>
                    <input type="range" min="8000" max="50000" step="1000" value={staffCost} onChange={(e) => setStaffCost(parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                  </div>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="bg-slate-950 p-12 rounded-[2.5rem] border border-slate-800 text-center">
                   <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Reclaim Your Time</p>
                   <p className="text-6xl font-black text-teal-500 tracking-tighter">{Math.round(timeSavedValue / 60)} <span className="text-2xl text-slate-600">Hrs/Mo</span></p>
                </div>
                <div className="bg-teal-500 p-12 rounded-[2.5rem] text-black shadow-xl text-center">
                   <p className="text-teal-900 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Annual Operational Savings</p>
                   <p className="text-6xl font-black tracking-tighter">₹{annualSavingsValue.toLocaleString()}</p>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* 5. COMPACT FOUNDER VISION */}
      <section className="py-20">
        <div className={containerClass + " max-w-4xl"}>
          <div className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-10">
              <div className="w-28 h-28 flex-shrink-0 rounded-full border-2 border-teal-500/20 overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <img src="/jitendra.bharti.jpg" alt="Founder" className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                 <h3 className="text-white font-black uppercase tracking-widest text-lg mb-3">Commitment to Accuracy</h3>
                 <p className="text-slate-400 italic text-sm leading-relaxed mb-4">
                   "Our mission is to empower the Indian accounting community by reducing the clerical burden. We are targeting a processing cost of ₹0.10 per invoice with 100% data integrity."
                 </p>
                 <p className="text-teal-500 font-bold text-[10px] uppercase tracking-[0.2em]">Jitendra Bharti — Founder, LekhaFlow</p>
              </div>
          </div>
        </div>
      </section>

      {/* 6. ENTERPRISE PRICING */}
      <section id="pricing" className="py-32 bg-slate-950 border-t border-slate-900">
        <div className={containerClass}>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">Professional Licenses</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Unlock full-scale automation capabilities</p>
          </div>
          
          <div className="max-w-md mx-auto">
              <div className="bg-slate-900 border-2 border-teal-500 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-teal-500 text-black px-6 py-1 text-[9px] font-black uppercase tracking-widest">Most Popular</div>
                <div className="space-y-6">
                  <h3 className="text-white font-black text-xs uppercase tracking-[0.3em]">LekhaFlow Standard Full</h3>
                  <div className="py-8 border-y border-slate-800">
                    <p className="text-teal-500 font-black text-6xl tracking-tighter mb-2">₹15,000</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">10,000 Invoices / Year</p>
                  </div>
                  <ul className="space-y-4 py-4">
                    {["License.dat included", "Full AI Engine Access", "Direct Founder Support", "Free Version 15.0 Updates"].map((li, i) => (
                        <li key={i} className="flex items-center gap-3 text-[11px] font-bold text-slate-400">
                            <CheckCircle2 size={14} className="text-teal-500" /> {li}
                        </li>
                    ))}
                  </ul>
                  <div className="pt-6 space-y-4">
                    <a href="https://pages.razorpay.com/pl_SshDcz10pz7Leq/view" target="_blank" className="block w-full py-5 bg-teal-600 text-white rounded-2xl font-black uppercase text-xs text-center tracking-widest hover:bg-teal-500 transition-all shadow-xl shadow-teal-600/10">Buy Commercial License</a>
                    <Link href="/downloads" className="block w-full py-5 bg-slate-950 text-white rounded-2xl font-black uppercase text-[10px] text-center tracking-widest border border-slate-800 hover:border-slate-600 transition-all">Download Full Installer</Link>
                  </div>
                </div>
              </div>
              <p className="text-center mt-10 text-slate-600 text-[10px] font-bold uppercase tracking-widest">Latest Version: {latestVersion} | Released: {formatDate(publishedAt)}</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-slate-900 bg-[#020617] text-center">
        <div className="flex justify-center gap-8 mb-10 opacity-30 grayscale hover:opacity-100 transition-all duration-700">
            <Laptop size={24} /> <Database size={24} /> <Cpu size={24} /> <ShieldCheck size={24} />
        </div>
        <p className="text-slate-500 text-[10px] font-black tracking-[0.5em] uppercase italic">LekhaFlow AI | Engineering the Future of Indian Accounting 🇮🇳</p>
      </footer>
      
      {/* 📥 INTAKE MODAL */}
      <AnimatePresence>
        {showIntakeModal && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
                <motion.div initial={{scale:0.9, y:20}} animate={{scale:1, y:0}} className="bg-slate-900 border-2 border-teal-500 p-10 rounded-[3.5rem] max-w-md w-full relative shadow-2xl">
                    <button onClick={() => setShowIntakeModal(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X size={28}/></button>
                    <form onSubmit={handleIntakeSubmit} className="space-y-6">
                        <div className="text-center mb-10">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Request Access</h3>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2">Get started with LekhaFlow Professional</p>
                        </div>
                        <input required placeholder="YOUR FULL NAME" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, clientName: e.target.value})}/>
                        <input required placeholder="COMPANY NAME" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, companyName: e.target.value})}/>
                        <input required placeholder="WHATSAPP NUMBER" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, mobileNumber: e.target.value})}/>
                        <input required type="email" placeholder="EMAIL ADDRESS" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, clientEmail: e.target.value})}/>
                        <button type="submit" className="w-full py-6 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-black rounded-2xl uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-teal-600/20">ENTER DOWNLOAD CENTER</button>
                    </form>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      <WhatsAppButton />
    </div>
  );
}