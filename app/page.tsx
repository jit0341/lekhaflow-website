"use client";

import ProblemSection from "@/components/ProblemSection";
import ProcessSection from "@/components/ProcessSection";
import React, { useState, useEffect } from "react";
import Link from "next/link"; 
import { 
  Zap, ShieldCheck, Target, Headphones,
  Download, X, Cpu, ArrowRight, Database, CheckCircle2, Laptop
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

  // ✅ UPDATED: Product Tiers with Launch Offer Pricing
  const productData = {
    standard: {
      title: "LekhaFlow Standard",
      originalPrice: "15,000",
      offerPrice: "7,999",
      limit: "10,000 Invoices/Year",
      razorpayUrl: "https://rzp.io/rzp/SkJTqlgi",
      downloadUrl: "/downloads",
      tagline: "Essential AI Automation for MSMEs",
      features: [
        "Bank Statement → Tally (Unlimited)",
        "PDF / Image Invoice to Tally",
        "Excel True Copy Export",
        "Auto Ledger & Stock Creation",
        "Email Support"
      ],
      color: "border-blue-500",
      accent: "text-blue-500"
    },
    gold: {
      title: "LekhaFlow Gold",
      originalPrice: "25,000",
      offerPrice: "7,999",
      limit: "Unlimited Invoices/Year",
      razorpayUrl: "https://rzp.io/rzp/sQg7LGy",
      downloadUrl: "/downloads",
      tagline: "Enterprise Grade Automation with Recon & Sales Split",
      features: [
        "Everything in Standard",
        "GSTR-2B Reconciliation",
        "Sales Split Below ₹50,000",
        "Multi-Company Support",
        "Direct WhatsApp Support from Founder"
      ],
      color: "border-amber-500",
      accent: "text-amber-500"
    }
  };

  const t = {
    hero: {
      badge: isHindi ? "बैंक स्टेटमेंट → टैली ऑटोमेशन" : "BANK STATEMENT → TALLY AUTOMATION",
      title: isHindi ? (
        <>बैंक स्टेटमेंट को टैली में <span className="text-teal-500 italic">3 मिनट</span> में डालें</>
      ) : (
        <>Push Bank Statements to Tally in <span className="text-teal-500 italic">3 Minutes</span>. Not 3 Hours.</>
      ),
      desc: isHindi 
        ? "कोई अन्य tools से बेहतर। बैंक स्टेटमेंट के साथ-साथ इनवॉइस, सेल्स स्प्लिट और GSTR-2B रिकंसिलिएशन भी।" 
        : "Better than any other tools. Bank statements + PDF Invoices + Sales Split + GSTR-2B Reconciliation — all in one tool.",
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

      {/* 2. HERO SECTION — Bank Intelligence First */}
      <section className="pt-36 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.08)_0,transparent_70%)] pointer-events-none" />
        <div className={containerClass + " text-center relative z-10"}>
          
          <div className="inline-block mb-8 px-5 py-2 bg-teal-500/5 border border-teal-500/20 rounded-full">
            <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.4em]">{t.hero.badge}</p>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] uppercase tracking-tighter mb-8 max-w-6xl mx-auto">
            {t.hero.title}
          </h1>

          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed mb-6">
            {t.hero.desc}
          </p>

          {/* Trust Bar */}
          <div className="flex flex-wrap justify-center gap-6 mb-14 text-nowrap">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="text-teal-500" size={16} /> 100% Accurate
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
              <Zap className="text-teal-500" size={16} /> Unlimited Bank Entries FREE
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
              <Target className="text-teal-500" size={16} /> Sales Split Below ₹50K
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-5 mb-20">
            <button 
              onClick={() => { setIntakeTarget("demo"); setShowIntakeModal(true); }}
              className="group flex items-center gap-3 px-10 py-5 bg-teal-600 text-white font-black rounded-2xl uppercase text-xs tracking-widest shadow-2xl shadow-teal-600/20 hover:bg-teal-500 hover:-translate-y-1 transition-all"
            >
              <Download size={18} /> {isHindi ? "7-दिन का फ्री ट्रायल डाउनलोड करें" : "Download 7-Day Free Trial"}
            </button>
            <button 
              onClick={() => window.open("https://wa.me/918770808695", "_blank")}
              className="px-10 py-5 bg-slate-900 text-white font-black rounded-2xl uppercase text-xs tracking-widest border border-slate-800 hover:bg-slate-800 transition-all"
            >
              {isHindi ? "व्हाट्सएप पर संपर्क करें" : "Talk to Founder on WhatsApp"}
            </button>
          </div>

          <img src="/bank-intelligence.png" alt="Bank Intelligence Dashboard" className="w-full h-full object-cover" />
          <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-2 shadow-2xl">
            <div className="bg-slate-950 rounded-2xl overflow-hidden aspect-[16/9] flex items-center justify-center border border-slate-800/50">
              <p className="text-slate-600 text-sm font-bold uppercase tracking-widest text-center px-4">
                [Replace with Bank Intelligence Dashboard Screenshot]<br/>
                <span className="text-slate-700 text-[10px] normal-case">Upload screenshot to /public/bank-intelligence.png and update img src below</span>
              </p>
            </div>
          </div>

          {/* Mini Stats */}
          <div className="mt-16 flex flex-wrap justify-center gap-12 border-t border-slate-900 pt-12 text-nowrap">
            {[
                { l: isHindi ? "सटीकता" : "Accuracy", v: "100%", i: Target },
                { l: isHindi ? "गति" : "Efficiency", v: "80x Faster", i: Zap },
                { l: isHindi ? "GST तैयार" : "GST Ready", v: "GST Ready", i: ShieldCheck }
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

      {/* 3. HOW THE DEMO WORKS SECTION */}
      <section className="py-24 bg-slate-950 border-y border-slate-900">
        <div className={containerClass}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
              {isHindi ? "डेमो कैसे काम करता है" : "How the Free Demo Works"}
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
              {isHindi ? "कोई पेमेंट नहीं। कोई क्रेडिट कार्ड नहीं।" : "No payment. No credit card required."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { num: "01", title: isHindi ? "डाउनलोड करें" : "Download", desc: isHindi ? "7-दिन का ट्रायल सेटअप डाउनलोड करें।" : "Download the 7-day trial setup file (Windows 10/11)." },
              { num: "02", title: isHindi ? "इंस्टॉल करें" : "Install", desc: isHindi ? "सॉफ्टवेयर इंस्टॉल करें। मशीन आईडी कॉपी करें।" : "Install the software. Copy the Machine Hardware ID displayed." },
              { num: "03", title: isHindi ? "हमसे संपर्क करें" : "Contact Us", desc: isHindi ? "व्हाट्सएप पर आईडी भेजें। हम 2 घंटे में लाइसेंस भेज देंगे।" : "Send the ID on WhatsApp. We send your trial license within 2 hours." },
              { num: "04", title: isHindi ? "टैली में देखें" : "See It in Tally", desc: isHindi ? "अपने बैंक स्टेटमेंट और इनवॉइस को टैली में देखें।" : "Watch your bank statements and invoices flow into Tally automatically." },
            ].map((step, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] text-center hover:border-teal-500/30 transition-all">
                <div className="text-4xl font-black text-teal-500/20 mb-4">{step.num}</div>
                <h3 className="text-white font-black uppercase text-sm mb-3 tracking-widest">{step.title}</h3>
                <p className="text-slate-500 font-medium text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
              {isHindi 
                ? "संदेह है? व्हाट्सएप पर 'डेमो' लिखें और हम आपको स्क्रीन शेयर पर दिखाएंगे।" 
                : "Not sure? WhatsApp 'DEMO' and we'll show you live via screen share."}
            </p>
          </div>
        </div>
      </section>

      {/* 4. CORE BENEFITS */}
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

      {/* 5. ROI CALCULATOR */}
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

      {/* 6. COMPACT FOUNDER VISION */}
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

      {/* 7. PRICING SECTION — August Launch Offer */}
      <section id="pricing" className="py-32 bg-slate-950 border-t border-slate-900">
        <div className={containerClass}>
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full">
              <p className="text-amber-400 text-[10px] font-black uppercase tracking-[0.3em]">
                {isHindi ? "स्वतंत्रता दिवस लॉन्च ऑफर" : "Independence Day Launch Offer"}
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
              {isHindi ? "प्रोफेशनल लाइसेंस" : "Professional Licenses"}
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-2">
              {isHindi ? "पहले 50 ग्राहकों के लिए विशेष मूल्य" : "Special pricing for first 50 clients only"}
            </p>
            <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">
              {isHindi ? "31 अगस्त 2026 तक वैध" : "Valid till 31st August 2026"}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {Object.entries(productData).map(([key, p]) => (
              <div key={key} className={`bg-slate-900 border-2 ${p.color} p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between group`}>
                {key === 'gold' && <div className="absolute top-0 right-0 bg-amber-500 text-black px-6 py-1 text-[9px] font-black uppercase tracking-widest">{isHindi ? "सबसे लोकप्रिय" : "Most Popular"}</div>}
                <div className="space-y-6">
                  <h3 className="text-white font-black text-xs uppercase tracking-[0.3em]">{p.title}</h3>
                  <div className="py-8 border-y border-slate-800">
                    <p className={`text-slate-500 font-black text-2xl tracking-tighter mb-1 line-through`}>₹{p.originalPrice}</p>
                    <p className={`${p.accent} font-black text-6xl tracking-tighter mb-2`}>₹{p.offerPrice}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{p.limit}</p>
                  </div>
                  <p className="text-[11px] font-bold text-slate-400 italic leading-snug">{p.tagline}</p>
                  <ul className="space-y-4 py-4">
                    {p.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-[11px] font-bold text-slate-300">
                            <CheckCircle2 size={14} className="text-teal-500" /> {feature}
                        </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 space-y-4">
                  <a href={p.razorpayUrl} target="_blank" className={`block w-full py-5 ${key === 'gold' ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-teal-600 text-white hover:bg-teal-500'} rounded-2xl font-black uppercase text-xs text-center tracking-widest transition-all`}>
                    {isHindi ? "खरीदें" : "Buy Now"} — ₹{p.offerPrice}
                  </a>
                  <Link href="/downloads" className="block w-full py-5 bg-slate-950 text-white rounded-2xl font-black uppercase text-[10px] text-center tracking-widest border border-slate-800 hover:border-slate-600 transition-all">
                    {isHindi ? "सेटअप डाउनलोड करें" : "Download Setup"}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 max-w-2xl mx-auto">
            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              {isHindi 
                ? "पहले 50 ग्राहकों को lifetime यही मूल्य मिलेगा। 1 सितंबर से Gold ₹14,999 और Standard ₹9,999 हो जाएगा।" 
                : "First 50 clients lock this price for life. From 1st Sept, Gold becomes ₹14,999 and Standard ₹9,999."}
            </p>
          </div>

          <p className="text-center mt-8 text-slate-600 text-[10px] font-bold uppercase tracking-widest">Latest Stable Build: {latestVersion} | Released: {formatDate(publishedAt)}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-slate-900 bg-[#020617] text-center">
        <div className="flex justify-center gap-8 mb-10 opacity-30 grayscale hover:opacity-100 transition-all duration-700">
            <Laptop size={24} /> <Database size={24} /> <Cpu size={24} /> <ShieldCheck size={24} />
        </div>
        <p className="text-slate-500 text-[10px] font-black tracking-[0.5em] uppercase italic">LekhaFlow AI | Engineering the Future of Indian Accounting 🇮🇳</p>
      </footer>
      
      {/* INTAKE MODAL */}
      <AnimatePresence>
        {showIntakeModal && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
                <motion.div initial={{scale:0.9, y:20}} animate={{scale:1, y:0}} className="bg-slate-900 border-2 border-teal-500 p-10 rounded-[3.5rem] max-w-md w-full relative shadow-2xl">
                    <button onClick={() => setShowIntakeModal(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X size={28}/></button>
                    <form onSubmit={handleIntakeSubmit} className="space-y-6">
                        <div className="text-center mb-10">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Access Portal</h3>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2">Get started with LekhaFlow Professional</p>
                        </div>
                        <input required placeholder="YOUR FULL NAME" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, clientName: e.target.value})}/>
                        <input required placeholder="COMPANY NAME" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, companyName: e.target.value})}/>
                        <input required placeholder="WHATSAPP NUMBER" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, mobileNumber: e.target.value})}/>
                        <input required type="email" placeholder="EMAIL ADDRESS" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, clientEmail: e.target.value})}/>
                        <button type="submit" className="w-full py-6 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-black rounded-2xl uppercase text-[10px] tracking-[0.2em] shadow-xl">CONTINUE TO DOWNLOAD CENTER</button>
                    </form>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      <WhatsAppButton />
    </div>
  );
}