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

// --- Types ---
type Variant = "standard";

export default function LekhaFlowLanding() {
  // 1. STATES
  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Variant>("standard");
  const [quotationData, setQuotationData] = useState<any | null>(null);
  const [showIntakeModal, setShowIntakeModal] = useState<boolean>(false);
  const [intakeTarget, setIntakeTarget] = useState<"demo" | "quotation">("demo");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clientForm, setClientForm] = useState({ clientName: "", companyName: "", mobileNumber: "", clientEmail: "" });

  const [invoices, setInvoices] = useState(500);
  const [staffCost, setStaffCost] = useState(15000);

  // Constants
  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
  const WHATSAPP_LINK = "https://wa.me/918770808695";

  useEffect(() => {
    document.title = isHindi ? "LekhaFlow | 3 घंटे की एंट्री 3 मिनट में" : "LekhaFlow | 3 Hours Entry in 3 Minutes";
  }, [isHindi]);

  // --- 🎯 FULL TRANSLATION DICTIONARY ---
  const t = {
    nav: { f: isHindi ? "विशेषताएं" : "Features", p: isHindi ? "प्रक्रिया" : "Process", pr: isHindi ? "कीमत" : "Pricing", req: isHindi ? "डेमो" : "Request Demo" },
    hero: {
      title: isHindi ? "3 घंटे की data entry को 3 मिनट में बदलने वाला स्वचालन टूल" : "An automation tool that turns 3 hours of data entry into 3 minutes",
      sub: "Invoice → XML → Tally",
      desc: isHindi ? "लेखाफ्लो (LekhaFlow) भारत का सबसे तेज AI-Powered Invoice to Tally Software है। सेकंडों में 100% सटीक प्रोसेस।" : "LekhaFlow: India's fastest AI-Powered Invoice to Tally Software. Process bills in seconds with 100% accuracy.",
      btn1: isHindi ? "डेमो देखें" : "Watch Demo",
      btn2: isHindi ? "ट्रायल" : "Trial"
    },
    process: {
      title: isHindi ? "स्वचालन प्रक्रिया" : "THE PROCESS",
      steps: [
        { s: "01", t: "01 GUI", d: isHindi ? "यूजर इंटरफेस" : "User Interface", img: "/gui_screen_1.png", i: MousePointer2, c: "border-blue-500/20" },
        { s: "02", t: isHindi ? "02 इनवॉइस अपलोड" : "02 UPLOAD THE INVOICE", d: "PDF / Image / Excel", img: "/gui_screen_2.png", i: Download, c: "border-teal-500/20" },
        { s: "03", t: isHindi ? "03 जेनरेट" : "03 GENERATE", d: isHindi ? "एआई डेटा एक्सट्रैक्शन" : "AI Data Extraction", img: "/gui_screen_3.png", i: Zap, c: "border-amber-500/20" },
        { s: "04", t: isHindi ? "04 आउटपुट" : "04 OUTPUT", d: isHindi ? "XML फाइलें तैयार" : "XML Files Ready", img: "/gui_screen_4.png", i: FolderOutput, c: "border-purple-500/20" },
        { s: "05", t: isHindi ? "05 इम्पोर्ट" : "05 IMPORT", d: isHindi ? "वन-क्लिक टैली इम्पोर्ट" : "One-Click Tally Import", img: "/gui_screen_5.png", i: FileText, c: "border-emerald-500/20" },
        { s: "06", t: isHindi ? "06 एंट्री हो गई" : "06 THE ENTRY", d: isHindi ? "वाउचर बन गया" : "Voucher Created", img: "/gui_screen_6.png", i: Database, c: "border-blue-400/20" }
      ]
    },
    trust: {
      title: isHindi ? "हमारी सुरक्षा और विश्वास गारंटी" : "OUR TRUST GUARANTEE",
      tag: isHindi ? "CAs के लिए सुरक्षित GST प्लेटफॉर्म" : "A SECURE GST PLATFORM FOR MSMEs",
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
    },
    blog: {
        title: isHindi ? "नॉलेज हब और लेख" : "KNOWLEDGE HUB & ARTICLES",
        posts: [
          { t: "PDF to Tally Guide", d: "Ultimate 2026 conversion manual.", img: "/gui_screen_1.png" },
          { t: "MSME Automation", d: "Save 80% on administrative costs.", img: "/gui_screen_2.png" },
          { t: "Tally Bulk Import", d: "One-click data entry mastering.", img: "/gui_screen_3.png" },
          { t: "Zero Error Entry", d: "Eliminating clerical human errors.", img: "/gui_screen_4.png" },
          { t: "The AI Accountant", d: "Role of AI in Indian taxation.", img: "/gui_screen_5.png" },
          { t: "GSTR-2B Recon", d: "Automate purchase verification.", img: "/gui_screen_6.png" }
        ]
    },
    founder: {
      title: isHindi ? "संस्थापक" : "Meet The Founder",
      bio: isHindi ? "स्वचालन के क्षेत्र में 10+ वर्षों का अनुभव।" : "10+ Years in automation experience.",
      vision: isHindi ? "लोकल सपोर्ट के साथ 100% सटीकता" : "100% Accuracy with Local Founder Support"
    }
  };

  // ✅ UPDATED: Only Demo and Standard Full Version
  const productData = {
    standard: { 
      title: "LekhaFlow Standard Full", 
      price: "15,000", 
      limit: "10,000 Invoices/Year", 
      razorpayUrl: "https://pages.razorpay.com/pl_SshDcz10pz7Leq/view",
      downloadUrl: "https://www.dropbox.com/scl/fi/r2pngajegwqj3wludvk0y/Lekhaflow_standard_setup.rar?rlkey=m8c6o5kmut4aagbvpny6jtu9t&st=lkyqs9kl&dl=0",
      tagline: "Tally Auto Entry - Full Version with License" 
    }
  };

  const triggerIntake = (type: "demo" | "quotation") => {
    setIntakeTarget(type);
    setShowIntakeModal(true);
  };

 const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setShowIntakeModal(false);

    window.open(
      "https://github.com/jit0341/lekhaflow-website/releases/download/v1.0/lekhaflow_standard_trial_v1.0_setup.exe",
      "_blank"
    );
};

const timeSavedValue = invoices * 3;
const moneySavedValue = Math.round((timeSavedValue / 60) * (staffCost / 160));
const annualSavingsValue = moneySavedValue * 12;

  return (
    <div className="bg-[#020617] text-slate-200 selection:bg-teal-500 overflow-x-hidden font-sans">
      
      {/* 1. NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] bg-[#020617]/80 backdrop-blur-md border-b border-slate-800 no-print">
        <div className={containerClass + " flex justify-between items-center h-20"}>
          <div className="text-2xl font-black text-white italic tracking-tighter uppercase">LEKHA<span className="text-teal-500">FLOW</span></div>
          <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest">
            <Link href="#process" className="hover:text-teal-400">Process</Link>
            <Link href="/blog" className="text-amber-500 hover:text-amber-400 underline underline-offset-4 font-black">Insights / Blog</Link>
            <Link href="#pricing" className="hover:text-teal-400">Pricing</Link>
            <button onClick={() => setIsHindi(!isHindi)} className="text-teal-500 border border-teal-500/30 px-3 py-1 rounded bg-teal-500/5 font-bold uppercase transition-all">{isHindi ? "ENGLISH" : "हिंदी"}</button>
            <button onClick={() => triggerIntake("demo")} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl shadow-lg uppercase font-black">{t.nav.req}</button>
          </div>
        </div>
      </nav>

      <Hero
  isHindi={isHindi}
  triggerIntake={triggerIntake}
/>

<ProblemSection
  isHindi={isHindi}
/>
<ProcessSection
  isHindi={isHindi}
/>



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
                 <h3 className="text-white font-black uppercase text-sm mb-4 tracking-widest">{item.t}</h3>
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

      {/* 6. KNOWLEDGE HUB */}
      <section className="py-24 bg-slate-900/20 no-print">
        <div className={containerClass}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic">{t.blog.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.blog.posts.map((post, i) => (
              <article key={i} className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-teal-500 transition-all shadow-xl group">
                 <div className="h-48 bg-slate-800 overflow-hidden relative">
                    <img src={post.img} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt={post.t} />
                 </div>
                 <div className="p-8">
                    <h3 className="text-lg font-black text-white mb-4 uppercase leading-tight group-hover:text-teal-400 transition-colors">{post.t}</h3>
                    <p className="text-slate-400 font-bold text-xs mb-6 tracking-wide uppercase leading-relaxed">{post.d}</p>
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
                    <img src="/jitendra.bharti.jpg" alt="Founder" className="w-full h-full object-cover grayscale-0" />
                 </div>
              </div>
              <div className="lg:col-span-2 space-y-8 text-center lg:text-left">
                 <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">{t.founder.title}</h2>
                 <h3 className="text-teal-500 font-black uppercase tracking-[0.3em] text-sm italic">Jitendra Bharti | <span className="text-slate-500">LekhaFlow AI Systems</span></h3>
                 <p className="text-xl text-slate-400 font-medium italic leading-relaxed">"{t.founder.bio}"</p>
                 <div className="bg-blue-900/20 p-6 rounded-3xl border border-blue-500/20 inline-block text-white font-bold text-sm uppercase tracking-widest">
                    {t.founder.vision}
                 </div>
              </div>
          </div>
        </div>
      </section>
      
      {/* 📥 FREE DEMO SECTION - BEFORE PRICING */}
      <section className="py-24 bg-gradient-to-br from-teal-950/30 via-slate-900 to-slate-950 border-t border-teal-500/30 no-print">
        <div className={containerClass}>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-block mb-6 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full">
                <p className="text-teal-400 text-[11px] font-black uppercase tracking-widest">🎁 Free Trial</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
                Try LekhaFlow Free for 7 Days
              </h2>
              <p className="text-xl text-slate-400 font-semibold">
                No credit card needed. All features included. Machine-locked for security.
              </p>
            </div>

            {/* Demo Features Grid */}
            <div className="grid md:grid-cols-4 gap-4 mb-12">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center">
                <div className="text-3xl font-black text-teal-500 mb-2">7</div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Days Validity</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center">
                <div className="text-3xl font-black text-blue-500 mb-2">60</div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Invoices Limit</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center">
                <div className="text-3xl font-black text-emerald-500 mb-2">✓</div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">All Features</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center">
                <div className="text-3xl font-black text-amber-500 mb-2">🔐</div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Machine Locked</p>
              </div>
            </div>

            {/* What You Get */}
            <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] p-10 mb-12">
              <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tighter">What's Included</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="text-teal-500 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-black text-white text-sm mb-1">Invoice to Tally Conversion</p>
                    <p className="text-slate-400 text-xs">Process PDF/Image invoices in seconds</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="text-teal-500 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-black text-white text-sm mb-1">GST Auto-Detection</p>
                    <p className="text-slate-400 text-xs">CGST/SGST/IGST handling</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="text-teal-500 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-black text-white text-sm mb-1">XML Generation</p>
                    <p className="text-slate-400 text-xs">Ready for Tally import</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="text-teal-500 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-black text-white text-sm mb-1">Zero Data Retention</p>
                    <p className="text-slate-400 text-xs">Your data stays on your machine</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-blue-950/20 border border-blue-500/20 rounded-[2.5rem] p-10 mb-12">
              <h3 className="text-xl font-black text-blue-400 mb-6 uppercase tracking-tighter flex items-center gap-3">
                <ShieldCheck size={24} />
                Enterprise-Grade Security
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="font-black text-white mb-2">🔐 Machine Lock</p>
                  <p className="text-slate-400 text-xs">Demo locked to your computer. Works on one device only.</p>
                </div>
                <div>
                  <p className="font-black text-white mb-2">⏰ Clock Tampering Detection</p>
                  <p className="text-slate-400 text-xs">System won't reset if you change system date.</p>
                </div>
                <div>
                  <p className="font-black text-white mb-2">📊 Usage Tracking</p>
                  <p className="text-slate-400 text-xs">Transparent limits. 7 days or 60 invoices, whichever comes first.</p>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-[2.5rem] p-12 text-center shadow-2xl">
              <p className="text-white/80 text-[11px] font-black uppercase tracking-widest mb-4">Step 1: Download</p>
              <h3 className="text-3xl font-black text-white mb-8 uppercase tracking-tighter leading-none">
                Get Your Free Demo
              </h3>
              <a 
                 href="https://github.com/jit0341/lekhaflow-website/releases/download/v1.0/lekhaflow_standard_trial_v1.0_setup.exe"
 	        target="_blank"
  	        rel="noreferrer"
                className="inline-block px-10 py-5 bg-black text-teal-400 font-black text-sm uppercase tracking-[0.2em] rounded-xl hover:bg-slate-900 transition-all shadow-lg active:scale-95 mb-6"
              >
                ⬇️ Download Setup (Windows)
              </a>
              
              <div className="border-t border-white/20 pt-6">
                <p className="text-white/70 text-xs font-semibold">
                  Step 2: Install on your computer<br />
                  Step 3: Auto machine-locked for your device<br />
                  Step 4: Start testing immediately
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-16">
              <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tighter text-center">Demo FAQ</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
                  <p className="font-black text-white mb-3 text-sm">❓ Can I use demo on multiple devices?</p>
                  <p className="text-slate-400 text-xs">No. Demo is machine-locked to your first computer for security.</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
                  <p className="font-black text-white mb-3 text-sm">❓ What happens after 7 days?</p>
                  <p className="text-slate-400 text-xs">Upgrade to LekhaFlow Standard Full. Then you get 5000 invoices/year forever.</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
                  <p className="font-black text-white mb-3 text-sm">❓ Can I extend demo?</p>
                  <p className="text-slate-400 text-xs">No. Demo expires after 7 days. But upgrade anytime from our pricing below.</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
                  <p className="font-black text-white mb-3 text-sm">❓ Is it really free?</p>
                  <p className="text-slate-400 text-xs">Yes! 100% free. No credit card required. No hidden charges.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRICING */}
      <section id="pricing" className="py-24 border-t border-slate-900 no-print">
        <div className={containerClass}>
          <h2 className="text-center text-4xl font-black text-white mb-16 uppercase italic tracking-tighter">Upgrade to Full Version</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {Object.entries(productData).map(([key, p]) => (
              <div key={key} className={`bg-slate-950 border-2 p-8 rounded-[2.5rem] flex flex-col justify-between transition-all group ${activeTab === key ? 'border-teal-500 ring-4 ring-teal-500/10 shadow-2xl' : 'border-slate-800 hover:border-slate-700'}`}>
                <div className="space-y-4">
                  <h3 className="text-white font-black text-[12px] uppercase tracking-widest">{p.title}</h3>
                  <div className="py-6 border-y border-slate-800">
                    <p className="text-teal-500 font-black text-4xl tracking-tighter mb-2">₹{p.price}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{p.limit}</p>
                  </div>
                  <p className="text-[11px] font-bold text-slate-400 italic leading-snug">{p.tagline}</p>
                  <ul className="text-[10px] text-slate-400 space-y-2 mt-4">
                    <li>✅ 10,000 invoices per year</li>
                    <li>✅ License.dat included</li>
                    <li>✅ 1 year validity</li>
                    <li>✅ Free updates & support</li>
                  </ul>
                </div>
                <div className="mt-8 space-y-2">
                  <a 
                    href={p.razorpayUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="block w-full py-3 bg-teal-500 text-black rounded-xl text-[10px] font-black uppercase text-center shadow-lg active:scale-95 transition-transform hover:bg-teal-600"
                  >
                    💳 Buy Now (Razorpay)
                  </a>
                  <a 
                    href={p.downloadUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="block w-full py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase text-center shadow-lg active:scale-95 transition-transform hover:bg-blue-700"
                  >
                    ⬇️ Download Full Version
                  </a>
                  <button 
                    onClick={() => triggerIntake("quotation")} 
                    className="w-full py-3 bg-slate-900 border border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm hover:bg-slate-800 transition-all"
                  >
                    📧 Get License.dat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-16 border-t border-slate-900 text-center uppercase no-print">
        <p className="text-slate-500 text-[10px] font-black tracking-[0.5em]">LekhaFlow AI | Built in India 🇮🇳</p>
      </footer>
      
      {/* 📥 INTAKE MODAL */}
      {showIntakeModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
            <div className="bg-slate-900 border-2 border-teal-500 p-10 rounded-[3.5rem] max-w-md w-full relative shadow-2xl">
                <button onClick={() => setShowIntakeModal(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X size={28}/></button>
                <form onSubmit={handleIntakeSubmit} className="space-y-5">
                    <h3 className="text-2xl font-black text-white uppercase text-center mb-10 tracking-widest italic">Get Demo</h3>
                    <input required placeholder="YOUR FULL NAME" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, clientName: e.target.value})}/>
                    <input required placeholder="COMPANY NAME" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, companyName: e.target.value})}/>
                    <input required placeholder="WHATSAPP NUMBER" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, mobileNumber: e.target.value})}/>
                    <button type="submit" className="w-full py-5 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-black rounded-2xl uppercase text-xs tracking-widest shadow-xl">DOWNLOAD DEMO</button>
                </form>
            </div>
        </div>
      )}

      <WhatsAppButton />
    </div>
  );
}
