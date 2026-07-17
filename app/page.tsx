"use client";

import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import ProcessSection from "@/components/ProcessSection";
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

export default function LekhaFlowLanding() {
  // 1. STATES
  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("standard");
  const [showIntakeModal, setShowIntakeModal] = useState<boolean>(false);
  const [intakeTarget, setIntakeTarget] = useState<"demo" | "quotation">("demo");
  const [clientForm, setClientForm] = useState({ clientName: "", companyName: "", mobileNumber: "", clientEmail: "" });

  const [invoices, setInvoices] = useState(500);
  const [staffCost, setStaffCost] = useState(15000);

  const [downloadLinks, setDownloadLinks] = useState({
    standard: "",
    demo: "",
    gold: "",
    gold_demo: "" // Added for future use
  });
  const [latestVersion, setLatestVersion] = useState("");
  const [publishedAt, setPublishedAt] = useState("");

  // 2. FETCH LATEST DOWNLOADS FROM GITHUB API
  useEffect(() => {
    async function loadDownloads() {
      try {
        const response = await fetch("/api/github_release"); // Corrected path
        const data = await response.json();
        if (data.success) {
          setDownloadLinks({
            standard: data.standard?.url || "",
            demo: data.demo?.url || "",
            gold: data.gold?.url || "",
            gold_demo: data.gold?.url || "" // Fallback if specific gold trial tag isn't there
          });
          setLatestVersion(data.standard?.version || data.gold?.version || "v1.0");
          setPublishedAt(data.standard?.publishedAt || data.gold?.publishedAt || "");
        }
      } catch (err) {
        console.error("Failed to load downloads:", err);
      }
    }
    loadDownloads();
  }, []);

  const formatDate = (date: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

  // --- 🎯 TRANSLATION DICTIONARY ---
  const t = {
    nav: { f: isHindi ? "विशेषताएं" : "Features", p: isHindi ? "प्रक्रिया" : "Process", pr: isHindi ? "कीमत" : "Pricing", dl: isHindi ? "डाउनलोड" : "Downloads", req: isHindi ? "डेमो" : "Request Demo" },
    hero: {
      title: isHindi ? "3 घंटे की data entry को 3 मिनट में बदलने वाला स्वचालन टूल" : "An automation tool that turns 3 hours of data entry into 3 minutes",
      sub: "Invoice → XML → Tally",
      desc: isHindi ? "लेखाफ्लो (LekhaFlow) भारत का सबसे तेज AI-Powered Invoice to Tally Software है।" : "LekhaFlow: India's fastest AI-Powered Invoice to Tally Software.",
      btn1: isHindi ? "डेमो देखें" : "Watch Demo",
      btn2: isHindi ? "मुफ्त ट्रायल" : "Free Trial"
    },
    trust: {
        title: isHindi ? "हमारी सुरक्षा और विश्वास गारंटी" : "OUR TRUST GUARANTEE",
        tag: isHindi ? "MSMEs के लिए सुरक्षित GST प्लेटफॉर्म" : "A SECURE GST PLATFORM FOR MSMEs",
        items: [
          { i: ShieldCheck, t: isHindi ? "डेटा सुरक्षा" : "Data Security", d: isHindi ? "जीरो-डेटा रिटेंशन पॉलिसी।" : "Zero-Data Retention Policy.", c: "text-teal-500" },
          { i: Target, t: isHindi ? "तकनीकी सटीकता" : "Accuracy", d: isHindi ? "0.01 पैसे का डायनामिक बैलेंस।" : "0.01 Penny Rounding.", c: "text-blue-500" },
          { i: Cpu, t: isHindi ? "उपयोग की शर्तें" : "Usage Rules", d: isHindi ? "टैली EDU वर्जन के साथ संगत।" : "Tally EDU Compatible.", c: "text-amber-500" },
          { i: Headphones, t: isHindi ? "ग्राहक सहायता" : "Customer Support", d: isHindi ? "डायरेक्ट फाउंडर डेस्क।" : "Direct Founder Desk.", c: "text-pink-500" }
        ]
    },
    roi: {
        title: isHindi ? "बचत कैलकुलेटर" : "ROI Calculator",
        l1: isHindi ? "इनवॉइसेस / माह" : "Invoices / Month",
        l2: isHindi ? "स्टाफ वेतन" : "Staff Salary",
        r1: isHindi ? "बचे हुए घंटे" : "Hours Saved",
        r2: isHindi ? "सालाना बचत" : "Annual Savings"
    }
  };

  const productData = {
    standard: {
      title: "LekhaFlow Standard Full",
      price: "15,000",
      limit: "10,000 Invoices/Year",
      razorpayUrl: "https://pages.razorpay.com/pl_SshDcz10pz7Leq/view",
      downloadUrl: downloadLinks.standard || "https://github.com/jit0341/lekhaflow-website/releases/latest",
      tagline: "Tally Auto Entry - Full Version"
    }
  };

  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowIntakeModal(false);
    if (intakeTarget === "demo") {
        window.location.href = "/downloads"; // Pointing to dedicated download hub
        return;
    }
    // License generation logic...
  };

  const timeSavedValue = invoices * 3;
  const moneySavedValue = Math.round((timeSavedValue / 60) * (staffCost / 160));
  const annualSavingsValue = moneySavedValue * 12;

  return (
    <div className="bg-[#020617] text-slate-200 selection:bg-teal-500 overflow-x-hidden font-sans">
      
      {/* 1. NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] bg-[#020617]/80 backdrop-blur-md border-b border-slate-800 no-print">
        <div className={containerClass + " flex justify-between items-center h-20"}>
          <Link href="/" className="text-2xl font-black text-white italic tracking-tighter uppercase">LEKHA<span className="text-teal-500">FLOW</span></Link>
          <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest">
            <Link href="#process" className="hover:text-teal-400">{t.nav.p}</Link>
            <Link href="/blog" className="text-amber-500 hover:text-amber-400 underline underline-offset-4 font-black">Insights / Blog</Link>
            <Link href="/downloads" className="text-white bg-blue-600/20 px-3 py-1 rounded border border-blue-500/30 hover:bg-blue-600/40 transition-all">
                {t.nav.dl} ⬇️
            </Link>
            <Link href="#pricing" className="hover:text-teal-400">{t.nav.pr}</Link>
            <button onClick={() => setIsHindi(!isHindi)} className="text-teal-500 border border-teal-500/30 px-3 py-1 rounded bg-teal-500/5 font-bold uppercase transition-all">{isHindi ? "ENGLISH" : "हिंदी"}</button>
            <button onClick={() => triggerIntake("demo")} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl shadow-lg uppercase font-black">{t.nav.req}</button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Links to Downloads */}
      <div className="pt-20">
        <Hero isHindi={isHindi} triggerIntake={() => window.location.href = "/downloads"} />
      </div>

      <ProblemSection isHindi={isHindi} />
      <ProcessSection isHindi={isHindi} />

      {/* TRUST GUARANTEE */}
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
                 <h3 className="text-white font-black uppercase text-sm mb-4 tracking-widest">{item.t}</h3>
                 <p className="text-slate-400 font-bold text-[11px] uppercase italic leading-relaxed tracking-tighter">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
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

      {/* MEET THE FOUNDER */}
      <section className="py-24 no-print">
        <div className={containerClass + " max-w-5xl"}>
          <div className="bg-slate-950 border-2 border-slate-800 rounded-[4rem] p-10 lg:p-20 relative overflow-hidden group shadow-2xl grid lg:grid-cols-3 gap-16 items-center">
              <div className="lg:col-span-1">
                 <div className="w-full aspect-[3/4] bg-slate-800 rounded-[3rem] border-4 border-teal-500/20 shadow-2xl overflow-hidden">
                    <img src="/jitendra.bharti.jpg" alt="Founder" className="w-full h-full object-cover" />
                 </div>
              </div>
              <div className="lg:col-span-2 space-y-8 text-center lg:text-left">
                 <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">Meet The Founder</h2>
                 <h3 className="text-teal-500 font-black uppercase tracking-[0.3em] text-sm italic">Jitendra Bharti | <span className="text-slate-500">LekhaFlow AI Systems</span></h3>
                 <p className="text-xl text-slate-400 font-medium italic leading-relaxed">"10+ Years in automation experience. Dedicated to providing 100% accuracy with local support."</p>
              </div>
          </div>
        </div>
      </section>
      
      {/* QUICK DOWNLOAD SECTION */}
      <section className="py-24 bg-teal-950/20 border-y border-teal-500/10 no-print">
        <div className={containerClass + " text-center"}>
            <h2 className="text-4xl font-black text-white uppercase italic mb-8">Ready to automate your Tally?</h2>
            <div className="flex flex-wrap justify-center gap-6">
                <Link href="/downloads" className="px-10 py-5 bg-teal-600 text-white font-black rounded-2xl uppercase tracking-widest shadow-xl hover:bg-teal-500 transition-all active:scale-95">
                    Download Free Trial ⬇️
                </Link>
                <Link href="/downloads" className="px-10 py-5 bg-slate-800 text-white font-black rounded-2xl uppercase tracking-widest shadow-xl hover:bg-slate-700 transition-all active:scale-95">
                    View All Products
                </Link>
            </div>
            <p className="mt-8 text-slate-500 text-xs font-bold uppercase tracking-widest">
                Latest Version: {latestVersion} | Released: {formatDate(publishedAt)}
            </p>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 border-t border-slate-900 no-print">
        <div className={containerClass}>
          <h2 className="text-center text-4xl font-black text-white mb-16 uppercase italic tracking-tighter">Upgrade to Full Version</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {Object.entries(productData).map(([key, p]) => (
              <div key={key} className={`bg-slate-950 border-2 border-teal-500 p-8 rounded-[2.5rem] flex flex-col justify-between shadow-2xl`}>
                <div className="space-y-4">
                  <h3 className="text-white font-black text-[12px] uppercase tracking-widest">{p.title}</h3>
                  <div className="py-6 border-y border-slate-800">
                    <p className="text-teal-500 font-black text-4xl tracking-tighter mb-2">₹{p.price}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{p.limit}</p>
                  </div>
                  <ul className="text-[10px] text-slate-400 space-y-2 mt-4">
                    <li>✅ {p.limit}</li>
                    <li>✅ License.dat included</li>
                    <li>✅ 1 year validity</li>
                    <li>✅ Free updates & support</li>
                  </ul>
                </div>
                <div className="mt-8 space-y-3">
                    <a href={p.razorpayUrl} target="_blank" rel="noreferrer" className="block w-full py-4 bg-teal-500 text-black rounded-xl text-[11px] font-black uppercase text-center hover:bg-teal-400 transition-all">
                        💳 Buy Now (Razorpay)
                    </a>
                    <Link href="/downloads" className="block w-full py-4 bg-blue-600 text-white rounded-xl text-[11px] font-black uppercase text-center hover:bg-blue-500 transition-all">
                        ⬇️ Download Setup
                    </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-16 border-t border-slate-900 text-center uppercase no-print">
        <p className="text-slate-500 text-[10px] font-black tracking-[0.5em]">LekhaFlow AI | Built in India 🇮🇳</p>
      </footer>
      
      {/* INTAKE MODAL */}
      <AnimatePresence>
        {showIntakeModal && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
                <motion.div initial={{scale:0.9, y:20}} animate={{scale:1, y:0}} className="bg-slate-900 border-2 border-teal-500 p-10 rounded-[3.5rem] max-w-md w-full relative shadow-2xl">
                    <button onClick={() => setShowIntakeModal(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X size={28}/></button>
                    <form onSubmit={handleIntakeSubmit} className="space-y-5">
                        <h3 className="text-2xl font-black text-white uppercase text-center mb-10 tracking-widest italic">Request Access</h3>
                        <input required placeholder="YOUR FULL NAME" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, clientName: e.target.value})}/>
                        <input required placeholder="COMPANY NAME" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, companyName: e.target.value})}/>
                        <input required placeholder="WHATSAPP NUMBER" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, mobileNumber: e.target.value})}/>
                        <button type="submit" className="w-full py-5 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-black rounded-2xl uppercase text-xs tracking-widest shadow-xl">CONTINUE TO DOWNLOAD</button>
                    </form>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      <WhatsAppButton />
    </div>
  );
}

function triggerIntake(arg0: string) {
    throw new Error("Function not implemented.");
}