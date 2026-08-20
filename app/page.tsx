"use client";

import ProblemSection from "@/components/ProblemSection";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Zap, ShieldCheck, Target, Headphones,
  Download, X, Cpu, Database, CheckCircle2, Laptop,
  ArrowRight, FileText, Landmark, Send, MessageCircleQuestion,
  RefreshCcw, Shield, Users, Sparkles, Clock, Lock, FileSearch,
  Split, Building2, BadgeCheck, Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppButton from "@/components/WhatsAppButton";
import PaymentModal from "@/components/PaymentModal";

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

  // Payment modal state
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{key: string; name: string; price: string; url: string} | null>(null);

  // ✅ FIX: openPayment function
  const openPayment = (key: string, plan: any) => {
    setSelectedPlan({
      key: key,
      name: plan.title,
      price: plan.offerPrice,
      url: plan.razorpayUrl
    });
    setPaymentModalOpen(true);
  };

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

  const productData = {
  standard: {
    title: "LekhaFlow Standard",
    originalPrice: "15,000",
    offerPrice: "7,999",
    limit: "10,000 Invoices/Year",
    razorpayUrl: "https://pages.razorpay.com/lekhaflow-standard",
    downloadUrl: "/downloads",
    tagline: isHindi ? "MSME के लिए आवश्यक AI ऑटोमेशन" : "Essential AI Automation for MSMEs",
    features: [
      isHindi ? "बैंक स्टेटमेंट → टैली (असीमित)" : "Bank Statement → Tally (Unlimited)",
      isHindi ? "PDF / इमेज इनवॉइस → टैली" : "PDF / Image Invoice → Tally",
      isHindi ? "एक्सेल ट्रू कॉपी एक्सपोर्ट" : "Excel True Copy Export",
      isHindi ? "ऑटो लेजर और स्टॉक निर्माण" : "Auto Ledger & Stock Creation",
      isHindi ? "₹10,000, ₹30,000 या ₹50,000 से कम सेल्स स्प्लिट" : "Sales Split Below ₹10,000, ₹30,000 or ₹50,000",
      isHindi ? "ईमेल सपोर्ट" : "Email Support"
    ],
    color: "border-blue-500",
    accent: "text-blue-500"
  }
};

  const t = {
    hero: {
      badge: isHindi ? "AI अकाउंटिंग ऑटोमेशन → टैली" : "AI-POWERED ACCOUNTING AUTOMATION → TALLY",
      title: isHindi ? (
        <>टैली के लिए <span className="text-teal-500 italic">AI-पावर्ड अकाउंटिंग ऑटोमेशन</span></>
      ) : (
        <>AI-Powered Accounting Automation <span className="text-teal-500 italic">for Tally</span></>
      ),
      desc: isHindi 
        ? "पर्चेज और सेल्स इनवॉइस, बैंक स्टेटमेंट और अकाउंटिंग डॉक्यूमेंट को AI से प्रोसेस करें, रिजल्ट को रिव्यू करें और Tally में भेजें।" 
        : "Automate Purchase & Sales Invoices, Bank Statements and Accounting Documents — then review the results and send them to Tally.",
      sub: isHindi
        ? "✅ क्लाइंट डेटा आपके सिस्टम पर रहता है। ✅ सेल्स टोटल को ऑटोमैटिकली कई वाउचर में स्प्लिट करें। ✅ कोई क्लाउड स्टोरेज नहीं।"
        : "✅ Client data stays on your system. ✅ Automatically split sales totals into multiple vouchers. ✅ No cloud storage."
    },
    trust: [
        { i: Cpu, t: isHindi ? "AI अकाउंटिंग ऑटोमेशन" : "AI-Powered Automation", d: isHindi ? "इनवॉइस, बैंक स्टेटमेंट और PDF से अकाउंटिंग डेटा तैयार करें।" : "Process invoices, bank statements and accounting documents with AI.", c: "text-purple-500" },
        { i: ShieldCheck, t: isHindi ? "क्लाइंट डेटा कंट्रोल" : "Client-Side Data Control", d: isHindi ? "गोपनीय क्लाइंट डेटा पर आपका नियंत्रण।" : "Designed around client-side processing and data control.", c: "text-teal-500" },
        { i: Target, t: isHindi ? "रिव्यू से टैली तक" : "Review Before Tally", d: isHindi ? "AI तैयार करे, आप रिव्यू करें, फिर Tally में भेजें।" : "AI prepares. You review. Then send the final entries to Tally.", c: "text-blue-500" },
        { i: Zap, t: isHindi ? "यूनिक सेल्स स्प्लिट" : "Sales Split Advantage", d: isHindi ? "सेल्स टोटल को कई वाउचर में ऑटोमैटिकली स्प्लिट करें।" : "Automatically split a sales total into multiple vouchers.", c: "text-amber-500" }
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
    <>
      {/* ============================================================ */}
      {/* NAVIGATION */}
      {/* ============================================================ */}
      <nav className="fixed top-0 w-full z-[100] bg-[#020617]/90 backdrop-blur-xl border-b border-slate-800">
        <div className={containerClass + " flex justify-between items-center h-20"}>
         <Link href="/" className="flex items-center gap-2.5 text-xl font-black text-white tracking-tighter uppercase">
            {/* Logo pehle */}
            <img src="/logo.png" alt="LekhaFlow" className="h-10 w-10 object-contain flex-shrink-0" />
            {/* Brand name baad mein */}
            <span>LEKHA<span className="text-teal-500">FLOW</span></span>
          <Link
            href="/"
            className="flex items-center gap-2.5"
          >
            <img
              src="/logo.png"
              alt="LekhaFlow"
              width={36}
              height={36}
              className="h-9 w-9 rounded-lg object-contain"
            />
            <span className="text-xl font-black text-white tracking-tighter uppercase">
              LEKHA<span className="text-teal-500">FLOW</span>
            </span>
          </Link>
            <Link href="#features" className="hover:text-white transition-colors">{isHindi ? "फीचर्स" : "Features"}</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">{isHindi ? "मूल्य निर्धारण" : "Pricing"}</Link>
            <Link href="/blog" className="text-amber-500 hover:text-amber-400 font-black">{isHindi ? "ब्लॉग" : "Insights"}</Link>
            <Link href="/downloads" className="hover:text-white transition-colors">{isHindi ? "डाउनलोड" : "Download Center"}</Link>
            <Link href="/faq" className="hover:text-white transition-colors">{isHindi ? "सहायता" : "FAQ"}</Link>
            <button onClick={() => setIsHindi(!isHindi)} className="text-teal-500 border border-teal-500/30 px-3 py-1 rounded hover:bg-teal-500/10">{isHindi ? "ENGLISH" : "हिंदी"}</button>
            <Link href="/downloads" className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-xl shadow-lg font-black transition-all">{isHindi ? "ट्रायल लें" : "Get Trial"}</Link>
          </div>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* HERO SECTION — Balanced Font Sizes + All Features */}
      {/* ============================================================ */}
      <section className="pt-36 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.08)_0,transparent_70%)] pointer-events-none" />
        <div className={containerClass + " text-center relative z-10"}>

          {/* Badge — Small */}
          <div className="inline-block mb-6 px-4 py-1.5 bg-teal-500/5 border border-teal-500/20 rounded-full">
            <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.3em]">
              {isHindi ? "AI अकाउंटिंग ऑटोमेशन → टैली" : "AI-POWERED ACCOUNTING AUTOMATION → TALLY"}
            </p>
          </div>

          {/* Headline — Balanced */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] uppercase tracking-tighter mb-4 max-w-4xl mx-auto">
            {isHindi ? (
              <>AI-पावर्ड <span className="text-teal-500 italic">डेस्कटॉप सॉफ्टवेयर</span> टैली वर्कफ्लो के लिए</>
            ) : (
              <>AI-Powered <span className="text-teal-500 italic">Desktop Software</span> for Tally Workflows</>
            )}
          </h1>

          {/* Description — Medium */}
          <p className="text-slate-400 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed mb-4">
            {isHindi 
              ? "पर्चेज और सेल्स इनवॉइस, बैंक स्टेटमेंट और अकाउंटिंग डॉक्यूमेंट को AI से प्रोसेस करें, रिजल्ट को रिव्यू करें और Tally में भेजें।" 
              : "Automate Purchase & Sales Invoices, Bank Statements and Accounting Documents — then review the results and send them to Tally."}
          </p>

          {/* Sub-message with Bullets — Normal Font */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
            <span className="text-slate-300 text-xs md:text-sm font-medium flex items-center gap-2">
              <CheckCircle2 size={14} className="text-teal-500 flex-shrink-0" />
              {isHindi ? "क्लाइंट डेटा आपके सिस्टम पर" : "Client data stays on your system"}
            </span>
            <span className="text-slate-300 text-xs md:text-sm font-medium flex items-center gap-2">
              <CheckCircle2 size={14} className="text-amber-500 flex-shrink-0" />
              {isHindi ? "सेल्स टोटल को कई वाउचर में स्प्लिट" : "Split sales totals into multiple vouchers"}
            </span>
            <span className="text-slate-300 text-xs md:text-sm font-medium flex items-center gap-2">
              <CheckCircle2 size={14} className="text-teal-500 flex-shrink-0" />
              {isHindi ? "कोई क्लाउड स्टोरेज नहीं" : "No cloud storage"}
            </span>
          </div>

          {/* Tags — Small */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              <Cpu size={14} className="text-teal-500" /> {isHindi ? "AI Powered" : "AI Powered"}
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              <ShieldCheck size={14} className="text-teal-500" /> {isHindi ? "क्लाइंट डेटा कंट्रोल" : "Client-Side Data Control"}
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              <Split size={14} className="text-amber-500" /> {isHindi ? "यूनिक सेल्स स्प्लिट" : "Unique Sales Split"}
            </span>
          </div>

          {/* CTA Buttons — Normal Size */}
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            <a 
              href="/downloads" 
              className="group flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-bold rounded-xl uppercase text-xs tracking-widest shadow-lg shadow-teal-600/20 hover:bg-teal-500 hover:-translate-y-0.5 transition-all"
            >
              <Download size={16} /> {isHindi ? "फ्री ट्रायल डाउनलोड करें" : "Download Free Trial"}
            </a>
            
            <button 
              onClick={() => { setIntakeTarget("demo"); setShowIntakeModal(true); }}
              className="px-6 py-3 bg-slate-800 text-white font-bold rounded-xl uppercase text-xs tracking-widest border border-slate-700 hover:bg-slate-700 transition-all"
            >
              {isHindi ? "लाइसेंस लें" : "Get License"}
            </button>
            
            <button 
              onClick={() => window.open("https://wa.me/918770808695", "_blank")}
              className="px-6 py-3 bg-green-600/15 text-green-400 font-bold rounded-xl uppercase text-xs tracking-widest border border-green-500/30 hover:bg-green-600/25 transition-all"
            >
              💬 {isHindi ? "व्हाट्सएप पर पूछें" : "Ask on WhatsApp"}
            </button>
          </div>

          {/* Main Image */}
          <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-2 shadow-2xl">
            <img 
              src="/bank-intelligence.png" 
              alt="LekhaFlow Bank Intelligence Dashboard" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Demo Video — Optional (comment out if video not ready) */}
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <video 
                src="/demo.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full"
                poster="/demo-poster.png"
              />
              <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 rounded-full text-[10px] text-white font-bold tracking-widest">
                ▶ 60 sec demo
              </div>
            </div>
          </div>

          {/* Stats — Small */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 border-t border-slate-800 pt-8">
            {[
              { l: isHindi ? "सटीकता" : "Accuracy", v: "100%", i: Target },
              { l: isHindi ? "गति" : "Efficiency", v: "80x Faster", i: Zap },
              { l: isHindi ? "डेटा प्राइवेसी" : "Data Privacy", v: "100% Local", i: ShieldCheck }
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <m.i className="text-teal-500" size={18} />
                <div className="text-left">
                  <p className="text-white font-black text-base leading-none">{m.v}</p>
                  <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mt-0.5">{m.l}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProblemSection isHindi={isHindi} />

      {/* ============================================================ */}
      {/* SALES SPLIT FEATURE — UNIQUE USP */}
      {/* ============================================================ */}
      <section id="features" className="py-24 bg-gradient-to-b from-slate-950 to-[#020617] border-y border-amber-500/20">
        <div className={containerClass}>
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-5 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full">
              <p className="text-amber-400 text-[10px] font-black uppercase tracking-[0.4em]">
                ⚡ {isHindi ? "यूनिक फीचर — कोई और नहीं देता" : "UNIQUE FEATURE — NOBODY ELSE OFFERS"}
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
              {isHindi ? "सेल्स टोटल → कई वाउचर" : "Sales Total → Multiple Vouchers"}
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs max-w-xl mx-auto">
              {isHindi 
                ? "एक सेल्स इनवॉइस को ₹10,000, ₹30,000 या ₹50,000 से कम वाउचर में ऑटोमैटिकली स्प्लिट करें"
                : "Automatically split a single sales invoice into vouchers below ₹10,000, ₹30,000 or ₹50,000"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-900/40 border border-amber-500/20 p-8 rounded-[2.5rem] hover:border-amber-500/50 transition-all text-center">
              <div className="w-16 h-16 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Split className="text-amber-500" size={28} />
              </div>
              <h3 className="text-white font-black uppercase text-sm mb-3">
                {isHindi ? "ऑटोमैटिक स्प्लिट" : "Automatic Split"}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {isHindi 
                  ? "₹75,000 का इनवॉइस → ₹40,000 + ₹35,000 — बिना मैन्युअल कैलकुलेशन के"
                  : "₹75,000 Invoice → ₹40,000 + ₹35,000 — no manual calculation needed"}
              </p>
            </div>

            <div className="bg-slate-900/40 border border-amber-500/20 p-8 rounded-[2.5rem] hover:border-amber-500/50 transition-all text-center">
              <div className="w-16 h-16 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="text-amber-500" size={28} />
              </div>
              <h3 className="text-white font-black uppercase text-sm mb-3">
                {isHindi ? "घंटों की बचत" : "Save Hours"}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {isHindi 
                  ? "CAs और accountants के लिए सबसे बड़ी टाइम-सेवर — क्लाइंट के GST कंप्लायंस के लिए"
                  : "The biggest time-saver for CAs and accountants — perfect for client GST compliance"}
              </p>
            </div>

            <div className="bg-slate-900/40 border border-amber-500/20 p-8 rounded-[2.5rem] hover:border-amber-500/50 transition-all text-center">
              <div className="w-16 h-16 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
                <BadgeCheck className="text-amber-500" size={28} />
              </div>
              <h3 className="text-white font-black uppercase text-sm mb-3">
                {isHindi ? "100% सटीक" : "100% Accurate"}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {isHindi 
                  ? "हर स्प्लिट एकदम सही — मैन्युअल एरर का कोई चांस नहीं"
                  : "Every split is perfectly calculated — zero chance of manual errors"}
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900 border border-amber-500/30 rounded-2xl">
              <Sparkles size={16} className="text-amber-500" />
              <span className="text-slate-300 text-xs font-bold uppercase tracking-widest">
                {isHindi 
                  ? "🔥 यह फीचर Vouchrit या Vyapar TaxOne में नहीं है — केवल LekhaFlow में"
                  : "🔥 This feature is NOT in Vouchrit or Vyapar TaxOne — only LekhaFlow"}
              </span>
            </div>
          </div>
        </div>
      </section>

          {/* ============================================================ */}
          {/* SwiftAssign™ AI Ledger Assignment */}
          {/* ============================================================ */}
          <section className="py-24 bg-gradient-to-b from-slate-950 to-[#020617] border-y border-slate-900">
            <div className={containerClass}>
              <div className="text-center mb-16">
                <div className="inline-block mb-4 px-5 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
                  <p className="text-purple-400 text-[10px] font-black uppercase tracking-[0.4em]">
                    ⚡ AI-POWERED AUTOMATION
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
                  SwiftAssign™ <span className="text-purple-500">AI Ledger Assignment</span>
                </h2>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs max-w-xl mx-auto">
                  Smart bulk ledger assignment with AI-powered grouping
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-slate-900/40 border border-purple-500/20 p-8 rounded-[2.5rem] hover:border-purple-500/50 transition-all text-center">
                  <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <Users className="text-purple-500" size={28} />
                  </div>
                  <h3 className="text-white font-black uppercase text-sm mb-3">AI Grouping</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Similar transactions are automatically grouped together — UPI, NEFT, IMPS, ATM all get detected
                  </p>
                </div>

                <div className="bg-slate-900/40 border border-purple-500/20 p-8 rounded-[2.5rem] hover:border-purple-500/50 transition-all text-center">
                  <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <Zap className="text-purple-500" size={28} />
                  </div>
                  <h3 className="text-white font-black uppercase text-sm mb-3">Bulk Assignment</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Assign ledgers to all transactions in one click — with 100% accuracy
                  </p>
                </div>

                <div className="bg-slate-900/40 border border-purple-500/20 p-8 rounded-[2.5rem] hover:border-purple-500/50 transition-all text-center">
                  <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <Target className="text-purple-500" size={28} />
                  </div>
                  <h3 className="text-white font-black uppercase text-sm mb-3">Smart Detection</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Detects and suggests repeated party names (e.g. "Pradeep", "Ramanujanagar") automatically
                  </p>
                </div>
              </div>
            </div>
          </section>

      {/* ============================================================ */}
      {/* WHY LEKHAFLOW — Enhanced Trust Section */}
      {/* ============================================================ */}
      <section className="py-24 bg-slate-950 border-y border-slate-900">
        <div className={containerClass}>
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-5 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full">
              <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.4em]">
                {isHindi ? "💪 क्यों चुनें लेखाफ्लो" : "💪 WHY CHOOSE LEKHAFLOW"}
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
              {isHindi ? "लेखाफ्लो क्यों चुनें" : "Why Choose LekhaFlow?"}
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs max-w-xl mx-auto">
              {isHindi 
                ? "AI स्पीड + डेस्कटॉप कंट्रोल + प्राइवेसी"
                : "AI Speed + Desktop Control + Privacy"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] hover:border-teal-500/30 transition-all">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Shield className="text-teal-500" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-black uppercase text-sm mb-2 tracking-widest">
                    {isHindi ? "100% क्लाइंट डेटा प्राइवेसी" : "100% Client Data Privacy"}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {isHindi 
                      ? "आपका डेटा आपके सिस्टम पर रहता है। कोई क्लाउड स्टोरेज नहीं। CAs के लिए बिल्कुल सुरक्षित।"
                      : "Your data stays on your system. No cloud storage. Completely safe for CAs."}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] hover:border-teal-500/30 transition-all">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Split className="text-amber-500" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-black uppercase text-sm mb-2 tracking-widest">
                    {isHindi ? "यूनिक सेल्स स्प्लिट" : "Unique Sales Split"}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {isHindi 
                      ? "एक सेल्स इनवॉइस को कई वाउचर में ऑटोमैटिकली स्प्लिट करें। कोई और नहीं देता।"
                      : "Automatically split one sales invoice into multiple vouchers. Nobody else offers this."}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] hover:border-teal-500/30 transition-all">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Cpu className="text-purple-500" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-black uppercase text-sm mb-2 tracking-widest">
                    {isHindi ? "AI-पावर्ड ऑटोमेशन" : "AI-Powered Automation"}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {isHindi 
                      ? "इनवॉइस, बैंक स्टेटमेंट, PDF — सब AI पढ़ता है। आप सिर्फ रिव्यू करें।"
                      : "Invoices, bank statements, PDFs — AI reads everything. You just review."}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] hover:border-teal-500/30 transition-all">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Zap className="text-blue-500" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-black uppercase text-sm mb-2 tracking-widest">
                    {isHindi ? "80x तेज़" : "80x Faster"}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {isHindi 
                      ? "मैन्युअल एंट्री की तुलना में 80 गुना तेज़। घंटों का काम मिनटों में।"
                      : "80 times faster than manual entry. Hours of work in minutes."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PRIVACY SECTION — Stronger + More Prominent */}
      {/* ============================================================ */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-[#020617] border-y-2 border-teal-500/20">
        <div className={containerClass}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full mb-6">
              <Lock className="text-teal-500" size={16} />
              <span className="text-teal-400 text-[10px] font-black uppercase tracking-[0.3em]">
                {isHindi ? "🔒 प्राइवेसी-फर्स्ट डिज़ाइन" : "🔒 PRIVACY-FIRST DESIGN"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-6">
              {isHindi ? " क्लाइंट का डेटा, क्लाइंट का नियंत्रण" : " Client's Data. Client's own control."}
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8">
              {isHindi
                ? "LekhaFlow उन प्रोफेशनल्स के लिए बनाया गया है जो संवेदनशील अकाउंटिंग डेटा संभालते हैं। हमारा workflow client-side processing और data control को ध्यान में रखकर बनाया गया है।"
                : "LekhaFlow is built for professionals who handle confidential accounting data. The workflow is designed around client-side processing and keeping control of sensitive accounting information with the client environment."}
            </p>
            
            {/* Privacy Bullet Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-start gap-4">
                <Shield className="text-teal-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-white font-black text-xs uppercase tracking-widest">
                    {isHindi ? "कोई क्लाउड स्टोरेज नहीं" : "No Cloud Storage"}
                  </p>
                  <p className="text-slate-500 text-[10px] leading-relaxed">
                    {isHindi ? "डेटा कभी हमारे सर्वर पर नहीं जाता" : "Data never leaves your system"}
                  </p>
                </div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-start gap-4">
                <Eye className="text-teal-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-white font-black text-xs uppercase tracking-widest">
                    {isHindi ? "पूरा नियंत्रण" : "Full Control"}
                  </p>
                  <p className="text-slate-500 text-[10px] leading-relaxed">
                    {isHindi ? "आप तय करें कि कौन देखे" : "You decide who accesses what"}
                  </p>
                </div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-start gap-4">
                <BadgeCheck className="text-teal-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-white font-black text-xs uppercase tracking-widest">
                    {isHindi ? "CAs के लिए बनाया गया" : "Built for CAs"}
                  </p>
                  <p className="text-slate-500 text-[10px] leading-relaxed">
                    {isHindi ? "गोपनीयता पेशेवर ज़िम्मेदारी है" : "Privacy is a professional responsibility"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* USE CASES SECTION — Who Is It For */}
      {/* ============================================================ */}
      <section className="py-24 bg-slate-950 border-y border-slate-900">
        <div className={containerClass}>
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-5 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full">
              <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.4em]">
                {isHindi ? "🎯 किसके लिए है" : "🎯 WHO IS IT FOR"}
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
              {isHindi ? "लेखाफ्लो किसके लिए है" : "Who Is LekhaFlow For?"}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Tally Users */}
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-teal-500/30 transition-all text-center">
              <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Users className="text-blue-500" size={28} />
              </div>
              <h3 className="text-white font-black uppercase text-sm mb-3">
                {isHindi ? "टैली यूज़र्स" : "Tally Users"}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {isHindi 
                  ? "रोज़ाना के वाउचर एंट्री को तेज़ करें। बैंक स्टेटमेंट, इनवॉइस सब एक जगह।"
                  : "Speed up daily voucher entry. Bank statements, invoices, all in one place."}
              </p>
            </div>

            {/* CA Firms */}
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-teal-500/30 transition-all text-center">
              <div className="w-16 h-16 mx-auto bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="text-teal-500" size={28} />
              </div>
              <h3 className="text-white font-black uppercase text-sm mb-3">
                {isHindi ? "CA फर्म्स" : "CA Firms"}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {isHindi 
                  ? "क्लाइंट डेटा की गोपनीयता बनाए रखें। ऑटोमेशन के साथ कंट्रोल भी।"
                  : "Maintain client data confidentiality. Automation with control."}
              </p>
            </div>

            {/* Tax Consultants */}
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-teal-500/30 transition-all text-center">
              <div className="w-16 h-16 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="text-amber-500" size={28} />
              </div>
              <h3 className="text-white font-black uppercase text-sm mb-3">
                {isHindi ? "टैक्स कंसल्टेंट्स" : "Tax Consultants"}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {isHindi 
                  ? "GST रिकंसिलिएशन, इनवॉइस प्रोसेसिंग, सेल्स स्प्लिट — सब एक टूल में।"
                  : "GST reconciliation, invoice processing, sales split — all in one tool."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TRUST BADGES — Service Providers */}
      {/* ============================================================ */}
      <section className="py-12 bg-[#020617] border-y border-slate-900">
        <div className={containerClass}>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] text-center mb-8">
            {isHindi ? "इन प्लेटफॉर्म्स के साथ काम करता है" : "WORKS WITH"}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
            <span className="text-slate-400 font-black text-sm uppercase tracking-widest">Tally</span>
            <span className="text-slate-400 font-black text-sm uppercase tracking-widest">GST</span>
            <span className="text-slate-400 font-black text-sm uppercase tracking-widest">MSME</span>
            <span className="text-slate-400 font-black text-sm uppercase tracking-widest">Windows 10/11</span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SOCIAL PROOF — Recent Activity */}
      {/* ============================================================ */}
      <section className="py-12 bg-[#020617] border-y border-slate-900">
        <div className={containerClass}>
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em] text-center mb-6">
            {isHindi ? "हाल ही में डाउनलोड किया" : "RECENTLY DOWNLOADED"}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              CA Firm, Delhi — 15 mins ago
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Tax Consultant, Mumbai — 1 hour ago
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Tally User, Raipur — 3 hours ago
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* HOW IT WORKS */}
      {/* ============================================================ */}
      <section id="how-it-works" className="py-28 bg-slate-950 border-y border-slate-900">
        <div className={containerClass}>
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-5 py-2 bg-teal-500/5 border border-teal-500/20 rounded-full">
              <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.4em]">
                {isHindi ? "4 सरल चरण" : "4 SIMPLE STEPS"}
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
              {isHindi ? "लेखाफ्लो कैसे काम करता है" : "How LekhaFlow Works"}
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs max-w-xl mx-auto">
              {isHindi 
                ? "इनवॉइस, बैंक स्टेटमेंट और अकाउंटिंग डॉक्यूमेंट से AI ऑटोमेशन — रिव्यू करें और Tally में भेजें।" 
                : "From invoices and bank statements to accounting entries — AI processes the work, you review it, then send it to Tally."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { num: "01", icon: FileText, title: isHindi ? "PDF अपलोड करें" : "Upload Bank Statement", desc: isHindi ? "अपना बैंक स्टेटमेंट PDF चुनें। सॉफ्टवेयर स्वचालित रूप से बैंक का पता लगा लेगा।" : "Select your bank statement PDF. The software auto-detects the bank format." },
              { num: "02", icon: Cpu, title: isHindi ? "AI पढ़ता है" : "AI Reads & Categorizes", desc: isHindi ? "AI प्रत्येक लेन-देन को पढ़ता है, नैरेशन को समझता है, और डेबिट/क्रेडिट को वर्गीकृत करता है।" : "AI reads every transaction, understands narration, and classifies Dr/Cr automatically." },
              { num: "03", icon: Landmark, title: isHindi ? "ग्रिड में समीक्षा करें" : "Review in Smart Grid", desc: isHindi ? "सभी लेन-देन एक साफ ग्रिड में दिखाई देते हैं। ओपनिंग/क्लोजिंग बैलेंस ऑटो-वैलिडेटेड।" : "All transactions appear in a clean grid. Opening/closing balance auto-validated." },
              { num: "04", icon: Send, title: isHindi ? "वन-क्लिक टैली" : "One-Click to Tally", desc: isHindi ? "'Send to Tally' दबाएं। सभी वाउचर सीधे आपके टैली में बन जाते हैं।" : "Hit 'Send to Tally'. All vouchers are created directly in your Tally — no XML import needed." },
            ].map((step, i) => (
              <div key={i} className="group bg-slate-900/40 border border-slate-800 p-10 rounded-[2.5rem] hover:bg-slate-900 hover:border-teal-500/30 transition-all text-center relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-950 border border-slate-800 px-4 py-1 rounded-full">
                  <span className="text-teal-500 font-black text-xs tracking-widest">{step.num}</span>
                </div>
                <div className="w-16 h-16 mx-auto bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-500/20 transition-colors mt-4">
                  <step.icon className="text-teal-500" size={28} />
                </div>
                <h3 className="text-white font-black uppercase text-sm mb-4 tracking-widest">{step.title}</h3>
                <p className="text-slate-500 font-medium text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-6">
              {isHindi 
                ? "यही workflow Purchase Invoices, Sales Invoices, Bank Statements और Sales Split के लिए बनाया गया है।" 
                : "The same workflow extends across Purchase Invoices, Sales Invoices, Bank Statements and Sales Split."}
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900 border border-amber-500/30 rounded-2xl">
              <Sparkles size={16} className="text-amber-500" />
              <span className="text-slate-300 text-xs font-bold uppercase tracking-widest">
                {isHindi ? "🔥 सेल्स स्प्लिट: ₹75,000 का इनवॉइस → 2 वाउचर (₹40K + ₹35K) ऑटोमेटिक" : "🔥 Sales Split: ₹75,000 Invoice → 2 Vouchers (₹40K + ₹35K) Automatic"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DEMO FLOW SECTION */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#020617]">
        <div className={containerClass}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
              {isHindi ? "फ्री डेमो कैसे काम करता है" : "How the Free Demo Works"}
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

      {/* ============================================================ */}
      {/* CORE BENEFITS */}
      {/* ============================================================ */}
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

{/* ============================================================ */}
{/* COMPETITOR COMPARISON — Stronger Differentiation */}
{/* ============================================================ */}
<section className="py-24 bg-slate-950 border-y-2 border-slate-900">
  <div className={containerClass}>
    <div className="text-center mb-12">
      <div className="inline-block mb-4 px-5 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full">
        <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.4em]">
          {isHindi ? "📊 लेखाफ्लो बनाम कंपटीटर्स" : "📊 LEKHAFLOW VS COMPETITORS"}
        </p>
      </div>
      <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
        {isHindi ? "लेखाफ्लो क्यों अलग है" : "Built Differently for Tally Professionals"}
      </h2>
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs max-w-xl mx-auto">
        {isHindi 
          ? "Vouchrit AI-ledger पर फोकस करता है, Vyapar TaxOne practice management पर — LekhaFlow desktop workflow + privacy + sales split पर"
          : "Vouchrit focuses on AI-ledger prediction, Vyapar TaxOne on practice management — LekhaFlow owns desktop workflow + privacy + sales split"}
      </p>
    </div>
    <div className="max-w-4xl mx-auto overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="py-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">Feature</th>
            <th className="py-4 text-teal-500 text-[10px] font-black uppercase tracking-widest text-center">LekhaFlow</th>
            <th className="py-4 text-slate-500 text-[10px] font-black uppercase tracking-widest text-center">Vyapar TaxOne</th>
            <th className="py-4 text-slate-500 text-[10px] font-black uppercase tracking-widest text-center">Vouchrit</th>
          </tr>
        </thead>
        <tbody className="text-xs font-bold text-slate-300">
          <tr className="border-b border-slate-800/50"><td className="py-4">Bank Statement → Tally</td><td className="text-center text-teal-500">✓ Unlimited</td><td className="text-center">✓</td><td className="text-center text-pink-500">✗</td></tr>
          <tr className="border-b border-slate-800/50"><td className="py-4">PDF Invoice → Tally</td><td className="text-center text-teal-500">✓</td><td className="text-center">✓</td><td className="text-center text-pink-500">✗</td></tr>
          <tr className="border-b border-slate-800/50"><td className="py-4">Sales Split Below ₹50K</td><td className="text-center text-amber-500 font-black">✓ Auto</td><td className="text-center text-pink-500">✗</td><td className="text-center text-pink-500">✗</td></tr>
          <tr className="border-b border-slate-800/50"><td className="py-4">Client Data Privacy</td><td className="text-center text-teal-500 font-black">✓ 100% Local</td><td className="text-center">Cloud</td><td className="text-center">Cloud</td></tr>
          <tr><td className="py-4">Yearly Price</td><td className="text-center text-teal-500 font-black">₹7,999</td><td className="text-center">₹10,000+</td><td className="text-center">₹12,000+</td></tr>
        </tbody>
      </table>
    </div>
    <div className="text-center mt-8">
      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
        {isHindi 
          ? "🔥 Vouchrit AI-ledger पर, Vyapar TaxOne practice management पर — LekhaFlow desktop workflow + privacy + unique sales split पर" 
          : "🔥 Vouchrit owns AI-ledger prediction, Vyapar TaxOne owns practice management — LekhaFlow owns desktop workflow + privacy + unique sales split"}
      </p>
    </div>
  </div>
</section>

      {/* ============================================================ */}
      {/* GSTR-2B COMING SOON BANNER */}
      {/* ============================================================ */}
      <section className="py-16 bg-gradient-to-r from-slate-950 to-slate-900 border-y border-blue-500/20">
        <div className={containerClass}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-4">
              <Sparkles className="text-blue-400" size={16} />
              <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">
                {isHindi ? "🔜 अपडेट आ रहा है" : "🔜 COMING SOON"}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter">
              {isHindi ? "GSTR-2B रिकंसिलिएशन" : "GSTR-2B Reconciliation"}
            </h3>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto mt-3">
              {isHindi 
                ? "पर्चेज इनवॉइस को GSTR-2B से ऑटो-मैच करें। मिसमैच को आसानी से पहचानें। अगले अपडेट में आ रहा है।"
                : "Auto-match purchase invoices with GSTR-2B. Identify mismatches easily. Coming in the next update."}
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest border border-slate-800 px-4 py-2 rounded-full">
                {isHindi ? "✅ पर्चेज इनवॉइस" : "✅ Purchase Invoices"}
              </span>
              <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest border border-slate-800 px-4 py-2 rounded-full">
                {isHindi ? "✅ GSTR-2B मैचिंग" : "✅ GSTR-2B Matching"}
              </span>
              <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest border border-slate-800 px-4 py-2 rounded-full">
                {isHindi ? "✅ मिसमैच डिटेक्शन" : "✅ Mismatch Detection"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ROI CALCULATOR */}
      {/* ============================================================ */}
      <section className="py-28">
        <div className={containerClass}>
          <div className="bg-slate-900 border border-slate-800 rounded-[4rem] p-10 lg:p-20 shadow-2xl grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
                  {isHindi ? "ऑटोमेशन का वित्तीय प्रभाव" : "The Financial Impact of"} <span className="text-teal-500">{isHindi ? "ऑटोमेशन" : "Automation"}</span>
                </h2>
                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">
                      {isHindi ? "औसत इनवॉइस / महीना" : "Average Invoices / Month"}: {invoices}
                    </label>
                    <input type="range" min="100" max="5000" step="100" value={invoices} onChange={(e) => setInvoices(parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">
                      {isHindi ? "वर्तमान स्टाफ वेतन" : "Current Staff Salary"}: ₹{staffCost}
                    </label>
                    <input type="range" min="8000" max="50000" step="1000" value={staffCost} onChange={(e) => setStaffCost(parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                  </div>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="bg-slate-950 p-12 rounded-[2.5rem] border border-slate-800 text-center">
                   <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3">
                     {isHindi ? "अपना समय वापस लें" : "Reclaim Your Time"}
                   </p>
                   <p className="text-6xl font-black text-teal-500 tracking-tighter">{Math.round(timeSavedValue / 60)} <span className="text-2xl text-slate-600">Hrs/Mo</span></p>
                </div>
                <div className="bg-teal-500 p-12 rounded-[2.5rem] text-black shadow-xl text-center">
                   <p className="text-teal-900 text-[10px] font-black uppercase tracking-[0.3em] mb-3">
                     {isHindi ? "वार्षिक बचत" : "Annual Operational Savings"}
                   </p>
                   <p className="text-6xl font-black tracking-tighter">₹{annualSavingsValue.toLocaleString()}</p>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FAQ SECTION — Dedicated */}
      {/* ============================================================ */}
      <section className="py-24 bg-slate-950 border-y border-slate-900">
        <div className={containerClass}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
              {isHindi ? "अक्सर पूछे जाने वाले सवाल" : "Frequently Asked Questions"}
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
              {isHindi ? "जवाब जो आपको चाहिए" : "Answers you need"}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: isHindi ? "क्या LekhaFlow क्लाउड-आधारित है?" : "Is LekhaFlow cloud-based?",
                a: isHindi 
                  ? "नहीं। LekhaFlow एक डेस्कटॉप सॉफ्टवेयर है। आपका डेटा आपके कंप्यूटर पर ही रहता है। हमारे सर्वर पर कोई डेटा नहीं जाता।"
                  : "No. LekhaFlow is desktop software. Your data stays on your computer. No data goes to our servers."
              },
              {
                q: isHindi ? "क्या यह ऑफलाइन काम करता है?" : "Does it work offline?",
                a: isHindi 
                  ? "हाँ। डाउनलोड के बाद इंटरनेट की जरूरत नहीं है। आप ऑफलाइन काम कर सकते हैं।"
                  : "Yes. No internet required after download. You can work offline."
              },
              {
                q: isHindi ? "कौन सी Tally versions सपोर्ट करता है?" : "Which Tally versions are supported?",
                a: isHindi 
                  ? "Tally Prime, Tally ERP 9, और सभी हालिया वर्जन सपोर्ट करता है।"
                  : "Supports Tally Prime, Tally ERP 9, and all recent versions."
              },
              {
                q: isHindi ? "GSTR-2B रिकंसिलिएशन कब आएगा?" : "When will GSTR-2B reconciliation come?",
                a: isHindi 
                  ? "GSTR-2B रिकंसिलिएशन अगले अपडेट में आ रहा है। हम इस पर काम कर रहे हैं।"
                  : "GSTR-2B reconciliation is coming in the next update. We're working on it."
              },
              {
                q: isHindi ? "क्या मैं खरीदने से पहले ट्रायल कर सकता हूँ?" : "Can I try before buying?",
                a: isHindi 
                  ? "हाँ। 7-दिन का फ्री ट्रायल डाउनलोड करें और अपने डेटा के साथ टेस्ट करें।"
                  : "Yes. Download the 7-day free trial and test it with your own data."
              },
              {
                q: isHindi ? "LekhaFlow Vouchrit या TaxOne से कैसे अलग है?" : "How is LekhaFlow different from Vouchrit or TaxOne?",
                a: isHindi 
                  ? "LekhaFlow डेस्कटॉप-फर्स्ट, प्राइवेसी-फोकस्ड है, और सेल्स स्प्लिट फीचर देता है — जो दोनों कंपटीटर्स में नहीं है।"
                  : "LekhaFlow is desktop-first, privacy-focused, and offers unique sales split — which neither competitor provides."
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-slate-900/40 border border-slate-800 rounded-2xl transition-all hover:border-teal-500/30">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <span className="text-white font-black text-sm uppercase tracking-widest">{faq.q}</span>
                  <span className="text-teal-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOUNDER VISION */}
      {/* ============================================================ */}
      <section className="py-20">
        <div className={containerClass + " max-w-4xl"}>
          <div className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-10">
              <div className="w-28 h-28 flex-shrink-0 rounded-full border-2 border-teal-500/20 overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <img src="/jitendra.bharti.jpg" alt="Founder" className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                 <h3 className="text-white font-black uppercase tracking-widest text-lg mb-3">
                   {isHindi ? "सटीकता के प्रति प्रतिबद्धता" : "Commitment to Accuracy"}
                 </h3>
                 <p className="text-slate-400 italic text-sm leading-relaxed mb-4">
                   {isHindi 
                     ? "भारतीय लेखा समुदाय को क्लर्कियल बोझ कम करके सशक्त बनाना हमारा मिशन है। हम इनवॉइस की प्रोसेसिंग लागत और 100% डेटा अखंडता को लक्षित कर रहे हैं।" 
                     : "Our mission is to empower the Indian accounting community by reducing the clerical burden. We are targeting a processing cost with 100% data integrity."}
                 </p>
                 <p className="text-teal-500 font-bold text-[10px] uppercase tracking-[0.2em]">
                   {isHindi ? "जितेंद्र भारती — संस्थापक, लेखाफ्लो" : "Jitendra Bharti — Founder, LekhaFlow"}
                 </p>
              </div>
          </div>
        </div>
      </section>

           {/* ============================================================ */}
      {/* PRICING SECTION */}
      {/* ============================================================ */}
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

          <div className="grid grid-cols-1 md:grid-cols-1 gap-10 max-w-3xl mx-auto">
            {Object.entries(productData).filter(([key]) => key === 'standard').map(([key, p]) => (
              <div key={key} className={`bg-slate-900 border-2 ${p.color} p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between group max-w-lg mx-auto w-full`}>
                <div className="absolute top-0 right-0 bg-amber-500 text-black px-6 py-1 text-[9px] font-black uppercase tracking-widest">
                  {isHindi ? "सबसे लोकप्रिय" : "Most Popular"}
                </div>
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
                  <button
                    onClick={() => openPayment(key, p)}
                    className={`block w-full py-5 bg-teal-600 text-white hover:bg-teal-500 rounded-2xl font-black uppercase text-xs text-center tracking-widest transition-all`}
                  >
                    {isHindi ? "खरीदें" : "Buy Now"} — ₹{p.offerPrice}
                  </button>
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
                ? "पहले 50 ग्राहकों को lifetime यही मूल्य मिलेगा। 1 सितंबर से ₹9,999 हो जाएगा।" 
                : "First 50 clients lock this price for life. From 1st Sept, price becomes ₹9,999."}
            </p>
          </div>

          <p className="text-center mt-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            🔒 {isHindi ? "7-दिन का रिफंड गारंटी — अगर पसंद नहीं आया तो पैसे वापस" : "7-Day Money-Back Guarantee — Not satisfied? Full refund"}
          </p>

          <p className="text-center mt-8 text-slate-600 text-[10px] font-bold uppercase tracking-widest">Latest Stable Build: {latestVersion} | Released: {formatDate(publishedAt)}</p>
        </div>
      </section>
      {/* ============================================================ */}
      {/* TESTIMONIALS */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#020617] border-t border-slate-900">
        <div className={containerClass}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
              {isHindi ? "लेखाकार क्या कहते हैं" : "What Accountants Say"}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "CA Rahul Sharma", firm: "Sharma & Associates, Raipur", quote: isHindi ? "बैंक स्टेटमेंट को टैली में डालने में 3 घंटे बचते हैं।" : "Bank statement entry that used to take 3 hours now finishes in 10 minutes." },
              { name: "Priya Gupta", firm: "Gupta Tax Consultants, Bilaspur", quote: isHindi ? "सेल्स स्प्लिट फीचर बहुत शक्तिशाली है। मैन्युअल कैलकुलेशन खत्म।" : "The Sales Split feature is powerful. No more manual calculations for GST compliance." },
              { name: "Rajesh Agrawal", firm: "Agrawal & Co., Ambikapur", quote: isHindi ? "7-दिन के ट्रायल में 500 इनवॉइस प्रोसेस किए। 99% सटीक।" : "Processed 500 invoices during the 7-day trial. 99% accuracy on first try." },
            ].map((t, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem]">
                <p className="text-slate-300 text-sm italic leading-relaxed mb-6">"{t.quote}"</p>
                <p className="text-white font-black text-xs uppercase tracking-widest">{t.name}</p>
                <p className="text-teal-500 text-[10px] font-bold uppercase tracking-widest">{t.firm}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER */}
      {/* ============================================================ */}
      <footer className="py-20 border-t border-slate-900 bg-[#020617] text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <Link href="/privacy" className="text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-teal-500 transition-colors flex items-center gap-2">
              <Shield size={14} /> Privacy Policy
            </Link>
            <Link href="/refund" className="text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-teal-500 transition-colors flex items-center gap-2">
              <RefreshCcw size={14} /> Refund Policy
            </Link>
            <Link href="/faq" className="text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-teal-500 transition-colors flex items-center gap-2">
              <MessageCircleQuestion size={14} /> FAQ
            </Link>
            <Link href="/blog" className="text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-teal-500 transition-colors flex items-center gap-2">
              <ArrowRight size={14} /> Blog
            </Link>
          </div>
          <div className="flex justify-center gap-8 mb-10 opacity-30 grayscale hover:opacity-100 transition-all duration-700">
            <Laptop size={24} /> <Database size={24} /> <Cpu size={24} /> <ShieldCheck size={24} />
          </div>
          <p className="text-slate-500 text-[10px] font-black tracking-[0.5em] uppercase italic">
            {isHindi ? "लेखाफ्लो AI | भारतीय लेखांकन का भविष्य" : "LekhaFlow AI | Engineering the Future of Indian Accounting 🇮🇳"}
          </p>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* INTAKE MODAL */}
      {/* ============================================================ */}
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

      {/* ============================================================ */}
      {/* PAYMENT MODAL */}
      {/* ============================================================ */}
      {selectedPlan && (
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          plan={selectedPlan.key as "standard" | "gold"}
          planName={selectedPlan.name}
          price={selectedPlan.price}
          razorpayUrl={selectedPlan.url}
        />
      )}

      {/* ============================================================ */}
      {/* STICKY TRIAL BAR */}
      {/* ============================================================ */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] hidden md:flex items-center gap-4 bg-slate-900/95 backdrop-blur-xl border border-slate-700 px-6 py-3 rounded-full shadow-2xl">
        <span className="text-white font-black text-xs uppercase tracking-widest">Ready to automate your Tally?</span>
        <a 
          href="/downloads"
          className="bg-teal-600 hover:bg-teal-500 text-white px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all"
        >
          Download Free Trial
        </a>
      </div>
      <WhatsAppButton />
    </>
  );
}