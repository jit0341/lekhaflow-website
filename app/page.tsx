"use client";

import ProblemSection from "@/components/ProblemSection";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Zap, ShieldCheck, Target, Headphones,
  Download, X, Cpu, Database, CheckCircle2, Laptop,
  ArrowRight, FileText, Landmark, Send, MessageCircleQuestion,
  RefreshCcw, Shield, Users
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
      razorpayUrl: "https://pages.razorpay.com/lekhaflow-gold",
      downloadUrl: "/downloads",
      tagline: isHindi ? "MSME के लिए आवश्यक AI ऑटोमेशन" : "Essential AI Automation for MSMEs",
      features: [
        isHindi ? "बैंक स्टेटमेंट → टैली (असीमित)" : "Bank Statement → Tally (Unlimited)",
        isHindi ? "PDF / इमेज इनवॉइस → टैली" : "PDF / Image Invoice → Tally",
        isHindi ? "एक्सेल ट्रू कॉपी एक्सपोर्ट" : "Excel True Copy Export",
        isHindi ? "ऑटो लेजर और स्टॉक निर्माण" : "Auto Ledger & Stock Creation",
        isHindi ? "ईमेल सपोर्ट" : "Email Support"
      ],
      color: "border-blue-500",
      accent: "text-blue-500"
    },
    gold: {
      title: "LekhaFlow Gold",
      originalPrice: "25,000",
      offerPrice: "7,999",
      limit: "Unlimited Invoices/Year",
      razorpayUrl: "https://pages.razorpay.com/lekhaflow-gold",
      downloadUrl: "/downloads",
      tagline: isHindi ? "सेल्स स्प्लिट के साथ एंटरप्राइज ऑटोमेशन" : "Enterprise Grade Automation with Sales Split",
      features: [
        isHindi ? "स्टैंडर्ड में सब कुछ" : "Everything in Standard",
        isHindi ? "₹10,000, ₹30,000, ₹50,000 से कम सेल्स स्प्लिट" : "Sales Split Below ₹10,000, ₹30,000 or ₹50,000",
        isHindi ? "मल्टी-कंपनी सपोर्ट" : "Multi-Company Support",
        isHindi ? "फाउंडर से सीधा व्हाट्सएप सपोर्ट" : "Direct WhatsApp Support from Founder"
      ],
      color: "border-amber-500",
      accent: "text-amber-500"
    }
  };

  const t = {
    hero: {
      badge: isHindi ? "पर्चेज इनवॉइस → टैली ऑटोमेशन" : "PURCHASE INVOICES → TALLY AUTOMATION",
      title: isHindi ? (
        <>पर्चेज इनवॉइस को टैली में <span className="text-teal-500 italic">3 मिनट</span> में डालें</>
      ) : (
        <>Push Purchase Invoices to Tally in <span className="text-teal-500 italic">3 Minutes</span>. Not 3 Hours.</>
      ),
      desc: isHindi 
        ? "सब से बेहतर। पर्चेज इनवॉइस, सेल्स स्प्लिट और बैंक स्टेटमेंट — सब एक टूल में।" 
        : "Better than Any other tools. Purchase Invoices + Sales Split + Bank Statements — all in one tool.",
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
    <>
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] bg-[#020617]/90 backdrop-blur-xl border-b border-slate-800">
        <div className={containerClass + " flex justify-between items-center h-20"}>
          <Link href="/" className="text-xl font-black text-white tracking-tighter uppercase">LEKHA<span className="text-teal-500">FLOW</span></Link>
          <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <Link href="#how-it-works" className="hover:text-white transition-colors">{isHindi ? "काम कैसे करता है" : "How It Works"}</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">{isHindi ? "मूल्य निर्धारण" : "Pricing"}</Link>
            <Link href="/blog" className="text-amber-500 hover:text-amber-400 font-black">{isHindi ? "ब्लॉग" : "Insights"}</Link>
            <Link href="/downloads" className="hover:text-white transition-colors">{isHindi ? "डाउनलोड" : "Download Center"}</Link>
            <Link href="/faq" className="hover:text-white transition-colors">{isHindi ? "सहायता" : "FAQ"}</Link>
            <button onClick={() => setIsHindi(!isHindi)} className="text-teal-500 border border-teal-500/30 px-3 py-1 rounded hover:bg-teal-500/10">{isHindi ? "ENGLISH" : "हिंदी"}</button>
            <Link href="/downloads" className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-xl shadow-lg font-black transition-all">{isHindi ? "ट्रायल लें" : "Get Trial"}</Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
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

          <div className="flex flex-wrap justify-center gap-6 mb-14 text-nowrap">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="text-teal-500" size={16} /> {isHindi ? "100% सटीक" : "100% Accurate"}
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
              <Zap className="text-teal-500" size={16} /> {isHindi ? "असीमित एंट्री मुफ्त" : "Unlimited Entries FREE"}
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
              <Target className="text-teal-500" size={16} /> {isHindi ? "₹50K से कम सेल्स स्प्लिट" : "Sales Split Below ₹50K"}
            </div>
          </div>

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

          <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-2 shadow-2xl">
            <img 
              src="/bank-intelligence.png" 
              alt="LekhaFlow Bank Intelligence Dashboard" 
              className="w-full h-full object-cover" 
            />
          </div>

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

      {/* SWIFTASSIGN™ FEATURE SECTION */}
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
                Similar transactions को automatically group करता है — UPI, NEFT, IMPS, ATM सब detect हो जाते हैं
              </p>
            </div>

            <div className="bg-slate-900/40 border border-purple-500/20 p-8 rounded-[2.5rem] hover:border-purple-500/50 transition-all text-center">
              <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="text-purple-500" size={28} />
              </div>
              <h3 className="text-white font-black uppercase text-sm mb-3">Bulk Assignment</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                एक click में सभी transactions को ledger assign करें — 100% सटीकता के साथ
              </p>
            </div>

            <div className="bg-slate-900/40 border border-purple-500/20 p-8 rounded-[2.5rem] hover:border-purple-500/50 transition-all text-center">
              <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="text-purple-500" size={28} />
              </div>
              <h3 className="text-white font-black uppercase text-sm mb-3">Smart Detection</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Repeated party names (जैसे "Pradeep", "Ramanujanagar") को detect करके suggest करता है
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGE SECTION - ✅ FIXED */}
      <section className="py-12 bg-slate-950/50 border-y border-slate-900">
        <div className={containerClass}>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <div className="text-center">
              <p className="text-4xl font-black text-teal-500">10,000+</p>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">CAs & Firms Trust Us</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-teal-500">minimum</p>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Per Invoice Processing</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-teal-500">99.9%</p>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Accuracy Guaranteed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-teal-500">3 Min</p>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Processing Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-28 bg-slate-950 border-y border-slate-900">
        <div className={containerClass}>
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-5 py-2 bg-teal-500/5 border border-teal-500/20 rounded-full">
              <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.4em]">
                {isHindi ? "4 सरल चरण" : "4 SIMPLE STEPS"}
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
              {isHindi ? "बैंक इंटेलिजेंस कैसे काम करता है" : "How Bank Intelligence Works"}
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs max-w-xl mx-auto">
              {isHindi 
                ? "कोई मैन्युअल टाइपिंग नहीं। बस PDF अपलोड करें और टैली में देखें।" 
                : "No manual typing. Just upload your PDF and watch it appear in Tally."}
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
                ? "यही प्रक्रिया पर्चेज इनवॉइस और सेल्स स्प्लिट के लिए भी काम करती है।" 
                : "The same process works for Purchase Invoices and Sales Split too."}
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl">
              <Zap size={16} className="text-amber-500" />
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                {isHindi ? "सेल्स स्प्लिट: ₹75,000 का इनवॉइस → 2 वाउचर (₹40K + ₹35K) ऑटोमेटिक" : "Sales Split: ₹75,000 Invoice → 2 Vouchers (₹40K + ₹35K) Automatic"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO FLOW SECTION */}
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

      {/* CORE BENEFITS */}
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

      {/* ROI CALCULATOR */}
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

      {/* FOUNDER VISION */}
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

      {/* COMPETITOR COMPARISON */}
      <section className="py-24 bg-slate-950 border-y border-slate-900">
        <div className={containerClass}>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-12 text-center">
            {isHindi ? "तुलना" : "Why LekhaFlow Wins"}
          </h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="py-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">Feature</th>
                  <th className="py-4 text-teal-500 text-[10px] font-black uppercase tracking-widest text-center">LekhaFlow</th>
                  <th className="py-4 text-slate-500 text-[10px] font-black uppercase tracking-widest text-center">Vyapar TaxOne</th>
                  <th className="py-4 text-slate-500 text-[10px] font-black uppercase tracking-widest text-center">VoucherIt</th>
                </tr>
              </thead>
              <tbody className="text-xs font-bold text-slate-300">
                <tr className="border-b border-slate-800/50"><td className="py-4">Bank Statement → Tally</td><td className="text-center text-teal-500">✓ Unlimited</td><td className="text-center">✓</td><td className="text-center text-pink-500">✗</td></tr>
                <tr className="border-b border-slate-800/50"><td className="py-4">PDF Invoice → Tally</td><td className="text-center text-teal-500">✓</td><td className="text-center">✓</td><td className="text-center text-pink-500">✗</td></tr>
                <tr className="border-b border-slate-800/50"><td className="py-4">Sales Split Below ₹50K</td><td className="text-center text-teal-500">✓ Auto</td><td className="text-center text-pink-500">✗</td><td className="text-center text-pink-500">✗</td></tr>
                <tr className="border-b border-slate-800/50"><td className="py-4">Local Data Processing</td><td className="text-center text-teal-500">✓ 100% Local</td><td className="text-center">Cloud</td><td className="text-center">Cloud</td></tr>
                <tr><td className="py-4">Yearly Price</td><td className="text-center text-teal-500 font-black">₹7,999</td><td className="text-center">₹10,000</td><td className="text-center">₹12,000+</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
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
                  <button
                    onClick={() => openPayment(key, p)}
                    className={`block w-full py-5 ${key === 'gold' ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-teal-600 text-white hover:bg-teal-500'} rounded-2xl font-black uppercase text-xs text-center tracking-widest transition-all`}
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
                ? "पहले 50 ग्राहकों को lifetime यही मूल्य मिलेगा। 1 सितंबर से Gold ₹14,999 और Standard ₹9,999 हो जाएगा।" 
                : "First 50 clients lock this price for life. From 1st Sept, Gold becomes ₹14,999 and Standard ₹9,999."}
            </p>
          </div>

          <p className="text-center mt-8 text-slate-600 text-[10px] font-bold uppercase tracking-widest">Latest Stable Build: {latestVersion} | Released: {formatDate(publishedAt)}</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
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

      {/* FOOTER */}
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

      {/* PAYMENT MODAL */}
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

      {/* STICKY TRIAL BAR */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] hidden md:flex items-center gap-4 bg-slate-900/95 backdrop-blur-xl border border-slate-700 px-6 py-3 rounded-full shadow-2xl">
        <span className="text-white font-black text-xs uppercase tracking-widest">Ready to automate your Tally?</span>
        <button 
          onClick={() => { setIntakeTarget("demo"); setShowIntakeModal(true); }}
          className="bg-teal-600 hover:bg-teal-500 text-white px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all"
        >
          Download Free Trial
        </button>
      </div>
      <WhatsAppButton />
    </>
  );
}