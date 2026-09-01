"use client";
import dynamic from 'next/dynamic';
import WhyLekhaFlowSection from "@/components/home/WhyLekhaFlowSection";
import SalesSplitSection from "@/components/home/SalesSplitSection";
import HeroSection from "@/components/home/HeroSection";
const PartnerForm = dynamic(() => import('@/components/PartnerForm'), { ssr: false });
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

  // âœ… FIX: openPayment function
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
        const response = await fetch("/api/github-release", { cache: "no-store" });
        const data = await response.json();
        if (data.success) {
          setDownloadLinks({
            standard: data.standard?.url || "",
            demo: data.standardTrial?.url || "",
            gold: data.gold?.url || ""
          });
          setLatestVersion(data.latestVersion || ""); 
          setPublishedAt(data.publishedAt || "");
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
    offerPrice: "9,999",
    limit: "10,000 Invoices/Year",
    razorpayUrl: "https://pages.razorpay.com/lekhaflow-standard",
    downloadUrl: "/downloads",
    tagline: isHindi ? "MSME à¤•à¥‡ à¤²à¤¿à¤ à¤†à¤µà¤¶à¥à¤¯à¤• AI à¤‘à¤Ÿà¥‹à¤®à¥‡à¤¶à¤¨" : "Essential AI Automation for MSMEs",
    features: [
      isHindi ? "à¤¬à¥ˆà¤‚à¤• à¤¸à¥à¤Ÿà¥‡à¤Ÿà¤®à¥‡à¤‚à¤Ÿ â†’ à¤Ÿà¥ˆà¤²à¥€ (à¤…à¤¸à¥€à¤®à¤¿à¤¤)" : "Bank Statement â†’ Tally (Unlimited)",
      isHindi ? "PDF / à¤‡à¤®à¥‡à¤œ à¤‡à¤¨à¤µà¥‰à¤‡à¤¸ â†’ à¤Ÿà¥ˆà¤²à¥€" : "PDF / Image Invoice â†’ Tally",
      isHindi ? "à¤à¤•à¥à¤¸à¥‡à¤² à¤Ÿà¥à¤°à¥‚ à¤•à¥‰à¤ªà¥€ à¤à¤•à¥à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ" : "Excel True Copy Export",
      isHindi ? "à¤‘à¤Ÿà¥‹ à¤²à¥‡à¤œà¤° à¤”à¤° à¤¸à¥à¤Ÿà¥‰à¤• à¤¨à¤¿à¤°à¥à¤®à¤¾à¤£" : "Auto Ledger & Stock Creation",
      isHindi ? "â‚¹10,000, â‚¹30,000 à¤¯à¤¾ â‚¹50,000 à¤¸à¥‡ à¤•à¤® à¤¸à¥‡à¤²à¥à¤¸ à¤¸à¥à¤ªà¥à¤²à¤¿à¤Ÿ" : "Sales Split Below â‚¹10,000, â‚¹30,000 or â‚¹50,000",
      isHindi ? "à¤ˆà¤®à¥‡à¤² à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ" : "Email Support"
    ],
    color: "border-teal-500",
    accent: "text-teal-600"
  }
};

  const t = {
    hero: {
      badge: isHindi ? "AI à¤…à¤•à¤¾à¤‰à¤‚à¤Ÿà¤¿à¤‚à¤— à¤‘à¤Ÿà¥‹à¤®à¥‡à¤¶à¤¨ â†’ à¤Ÿà¥ˆà¤²à¥€" : "AI-POWERED ACCOUNTING AUTOMATION â†’ TALLY",
      title: isHindi ? (
        <>à¤Ÿà¥ˆà¤²à¥€ à¤•à¥‡ à¤²à¤¿à¤ <span className="text-teal-500 italic">AI-à¤ªà¤¾à¤µà¤°à¥à¤¡ à¤…à¤•à¤¾à¤‰à¤‚à¤Ÿà¤¿à¤‚à¤— à¤‘à¤Ÿà¥‹à¤®à¥‡à¤¶à¤¨</span></>
      ) : (
        <>AI-Powered Accounting Automation <span className="text-teal-500 italic">for Tally</span></>
      ),
      desc: isHindi 
        ? "à¤ªà¤°à¥à¤šà¥‡à¤œ à¤”à¤° à¤¸à¥‡à¤²à¥à¤¸ à¤‡à¤¨à¤µà¥‰à¤‡à¤¸, à¤¬à¥ˆà¤‚à¤• à¤¸à¥à¤Ÿà¥‡à¤Ÿà¤®à¥‡à¤‚à¤Ÿ à¤”à¤° à¤…à¤•à¤¾à¤‰à¤‚à¤Ÿà¤¿à¤‚à¤— à¤¡à¥‰à¤•à¥à¤¯à¥‚à¤®à¥‡à¤‚à¤Ÿ à¤•à¥‹ AI à¤¸à¥‡ à¤ªà¥à¤°à¥‹à¤¸à¥‡à¤¸ à¤•à¤°à¥‡à¤‚, à¤°à¤¿à¤œà¤²à¥à¤Ÿ à¤•à¥‹ à¤°à¤¿à¤µà¥à¤¯à¥‚ à¤•à¤°à¥‡à¤‚ à¤”à¤° Tally à¤®à¥‡à¤‚ à¤­à¥‡à¤œà¥‡à¤‚à¥¤" 
        : "Automate Purchase & Sales Invoices, Bank Statements and Accounting Documents â€” then review the results and send them to Tally.",
      sub: isHindi
        ? "âœ… à¤•à¥à¤²à¤¾à¤‡à¤‚à¤Ÿ à¤¡à¥‡à¤Ÿà¤¾ à¤†à¤ªà¤•à¥‡ à¤¸à¤¿à¤¸à¥à¤Ÿà¤® à¤ªà¤° à¤°à¤¹à¤¤à¤¾ à¤¹à¥ˆà¥¤ âœ… à¤¸à¥‡à¤²à¥à¤¸ à¤Ÿà¥‹à¤Ÿà¤² à¤•à¥‹ à¤‘à¤Ÿà¥‹à¤®à¥ˆà¤Ÿà¤¿à¤•à¤²à¥€ à¤•à¤ˆ à¤µà¤¾à¤‰à¤šà¤° à¤®à¥‡à¤‚ à¤¸à¥à¤ªà¥à¤²à¤¿à¤Ÿ à¤•à¤°à¥‡à¤‚à¥¤ âœ… à¤•à¥‹à¤ˆ à¤•à¥à¤²à¤¾à¤‰à¤¡ à¤¸à¥à¤Ÿà¥‹à¤°à¥‡à¤œ à¤¨à¤¹à¥€à¤‚à¥¤"
        : "âœ… Client data stays on your system. âœ… Automatically split sales totals into multiple vouchers. âœ… No cloud storage."
    },
    trust: [
        { i: Cpu, t: isHindi ? "AI à¤…à¤•à¤¾à¤‰à¤‚à¤Ÿà¤¿à¤‚à¤— à¤‘à¤Ÿà¥‹à¤®à¥‡à¤¶à¤¨" : "AI-Powered Automation", d: isHindi ? "à¤‡à¤¨à¤µà¥‰à¤‡à¤¸, à¤¬à¥ˆà¤‚à¤• à¤¸à¥à¤Ÿà¥‡à¤Ÿà¤®à¥‡à¤‚à¤Ÿ à¤”à¤° PDF à¤¸à¥‡ à¤…à¤•à¤¾à¤‰à¤‚à¤Ÿà¤¿à¤‚à¤— à¤¡à¥‡à¤Ÿà¤¾ à¤¤à¥ˆà¤¯à¤¾à¤° à¤•à¤°à¥‡à¤‚à¥¤" : "Process invoices, bank statements and accounting documents with AI.", c: "text-purple-500" },
        { i: ShieldCheck, t: isHindi ? "à¤•à¥à¤²à¤¾à¤‡à¤‚à¤Ÿ à¤¡à¥‡à¤Ÿà¤¾ à¤•à¤‚à¤Ÿà¥à¤°à¥‹à¤²" : "Client-Side Data Control", d: isHindi ? "à¤—à¥‹à¤ªà¤¨à¥€à¤¯ à¤•à¥à¤²à¤¾à¤‡à¤‚à¤Ÿ à¤¡à¥‡à¤Ÿà¤¾ à¤ªà¤° à¤†à¤ªà¤•à¤¾ à¤¨à¤¿à¤¯à¤‚à¤¤à¥à¤°à¤£à¥¤" : "Designed around client-side processing and data control.", c: "text-teal-500" },
        { i: Target, t: isHindi ? "à¤°à¤¿à¤µà¥à¤¯à¥‚ à¤¸à¥‡ à¤Ÿà¥ˆà¤²à¥€ à¤¤à¤•" : "Review Before Tally", d: isHindi ? "AI à¤¤à¥ˆà¤¯à¤¾à¤° à¤•à¤°à¥‡, à¤†à¤ª à¤°à¤¿à¤µà¥à¤¯à¥‚ à¤•à¤°à¥‡à¤‚, à¤«à¤¿à¤° Tally à¤®à¥‡à¤‚ à¤­à¥‡à¤œà¥‡à¤‚à¥¤" : "AI prepares. You review. Then send the final entries to Tally.", c: "text-blue-500" },
        { i: Zap, t: isHindi ? "à¤¯à¥‚à¤¨à¤¿à¤• à¤¸à¥‡à¤²à¥à¤¸ à¤¸à¥à¤ªà¥à¤²à¤¿à¤Ÿ" : "Sales Split Advantage", d: isHindi ? "à¤¸à¥‡à¤²à¥à¤¸ à¤Ÿà¥‹à¤Ÿà¤² à¤•à¥‹ à¤•à¤ˆ à¤µà¤¾à¤‰à¤šà¤° à¤®à¥‡à¤‚ à¤‘à¤Ÿà¥‹à¤®à¥ˆà¤Ÿà¤¿à¤•à¤²à¥€ à¤¸à¥à¤ªà¥à¤²à¤¿à¤Ÿ à¤•à¤°à¥‡à¤‚à¥¤" : "Automatically split a sales total into multiple vouchers.", c: "text-amber-500" }
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
      {/* ============================================================ */}
      {/* HERO SECTION â€” Balanced Font Sizes + All Features */}
      {/* ============================================================ */}
      <HeroSection
        isHindi={isHindi}
        containerClass={containerClass}
        setIntakeTarget={setIntakeTarget}
        setShowIntakeModal={setShowIntakeModal}
      />
      <PartnerForm isHindi={isHindi} />
      <ProblemSection isHindi={isHindi} />

      {/* ============================================================ */}
      {/* SALES SPLIT FEATURE â€” UNIQUE USP */}
      {/* ============================================================ */}
      <SalesSplitSection
        isHindi={isHindi}
        containerClass={containerClass}
      />

          {/* ============================================================ */}
          {/* SwiftAssignâ„¢ AI Ledger Assignment */}
          {/* ============================================================ */}
          <section className="py-24 bg-slate-50 border-y border-slate-200">
            <div className={containerClass}>
              <div className="text-center mb-16">
                <div className="inline-block mb-4 px-5 py-2 bg-purple-100 border border-purple-300 rounded-full">
                  <p className="text-purple-700 text-[10px] font-black uppercase tracking-[0.4em]">
                    âš¡ AI-POWERED AUTOMATION
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
                  SwiftAssignâ„¢ <span className="text-purple-600">AI Ledger Assignment</span>
                </h2>
                <p className="text-slate-900 font-bold uppercase tracking-widest text-xs max-w-xl mx-auto">
                  Smart bulk ledger assignment with AI-powered grouping
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white border border-purple-500/20 p-8 rounded-[2.5rem] hover:border-purple-500/50 transition-all text-center">
                  <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <Users className="text-purple-500" size={28} />
                  </div>
                  <h3 className="text-slate-900 font-black uppercase text-sm mb-3">AI Grouping</h3>
                  <p className="text-slate-900 text-xs leading-relaxed">
                    Similar transactions are automatically grouped together â€” UPI, NEFT, IMPS, ATM all get detected
                  </p>
                </div>

                <div className="bg-white border border-purple-500/20 p-8 rounded-[2.5rem] hover:border-purple-500/50 transition-all text-center">
                  <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <Zap className="text-purple-500" size={28} />
                  </div>
                  <h3 className="text-slate-900 font-black uppercase text-sm mb-3">Bulk Assignment</h3>
                  <p className="text-slate-900 text-xs leading-relaxed">
                    Assign ledgers to all transactions in one click â€” with 100% accuracy
                  </p>
                </div>

                <div className="bg-white border border-purple-500/20 p-8 rounded-[2.5rem] hover:border-purple-500/50 transition-all text-center">
                  <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <Target className="text-purple-500" size={28} />
                  </div>
                  <h3 className="text-slate-900 font-black uppercase text-sm mb-3">Smart Detection</h3>
                  <p className="text-slate-900 text-xs leading-relaxed">
                    Detects and suggests repeated party names (e.g. "Pradeep", "Ramanujanagar") automatically
                  </p>
                </div>
              </div>
            </div>
          </section>

      {/* ============================================================ */}
      {/* WHY LEKHAFLOW â€” Enhanced Trust Section */}
      {/* ============================================================ */}
      <WhyLekhaFlowSection
        isHindi={isHindi}
        containerClass={containerClass}
      />

      {/* ============================================================ */}
      {/* PRIVACY SECTION â€” Stronger + More Prominent */}
      {/* ============================================================ */}
      <section className="py-20 bg-slate-50 border-y-2 border-teal-500/20">
        <div className={containerClass}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-teal-100 border border-teal-300 rounded-full mb-6">
              <Lock className="text-teal-500" size={16} />
              <span className="text-teal-700 text-[10px] font-black uppercase tracking-[0.3em]">
                {isHindi ? "ðŸ”’ à¤ªà¥à¤°à¤¾à¤‡à¤µà¥‡à¤¸à¥€-à¤«à¤°à¥à¤¸à¥à¤Ÿ à¤¡à¤¿à¤œà¤¼à¤¾à¤‡à¤¨" : "ðŸ”’ PRIVACY-FIRST DESIGN"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-6">
              {isHindi ? " à¤•à¥à¤²à¤¾à¤‡à¤‚à¤Ÿ à¤•à¤¾ à¤¡à¥‡à¤Ÿà¤¾, à¤•à¥à¤²à¤¾à¤‡à¤‚à¤Ÿ à¤•à¤¾ à¤¨à¤¿à¤¯à¤‚à¤¤à¥à¤°à¤£" : " Client's Data. Client's own control."}
            </h2>
            <p className="text-slate-900 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8">
              {isHindi
                ? "LekhaFlow à¤‰à¤¨ à¤ªà¥à¤°à¥‹à¤«à¥‡à¤¶à¤¨à¤²à¥à¤¸ à¤•à¥‡ à¤²à¤¿à¤ à¤¬à¤¨à¤¾à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¹à¥ˆ à¤œà¥‹ à¤¸à¤‚à¤µà¥‡à¤¦à¤¨à¤¶à¥€à¤² à¤…à¤•à¤¾à¤‰à¤‚à¤Ÿà¤¿à¤‚à¤— à¤¡à¥‡à¤Ÿà¤¾ à¤¸à¤‚à¤­à¤¾à¤²à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤ à¤¹à¤®à¤¾à¤°à¤¾ workflow client-side processing à¤”à¤° data control à¤•à¥‹ à¤§à¥à¤¯à¤¾à¤¨ à¤®à¥‡à¤‚ à¤°à¤–à¤•à¤° à¤¬à¤¨à¤¾à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤"
                : "LekhaFlow is built for professionals who handle confidential accounting data. The workflow is designed around client-side processing and keeping control of sensitive accounting information with the client environment."}
            </p>
            
            {/* Privacy Bullet Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
              <div className="bg-white/50 border border-slate-200 p-6 rounded-2xl flex items-start gap-4">
                <Shield className="text-teal-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-slate-900 font-black text-xs uppercase tracking-widest">
                    {isHindi ? "à¤•à¥‹à¤ˆ à¤•à¥à¤²à¤¾à¤‰à¤¡ à¤¸à¥à¤Ÿà¥‹à¤°à¥‡à¤œ à¤¨à¤¹à¥€à¤‚" : "No Cloud Storage"}
                  </p>
                  <p className="text-slate-900 text-[10px] leading-relaxed">
                    {isHindi ? "à¤¡à¥‡à¤Ÿà¤¾ à¤•à¤­à¥€ à¤¹à¤®à¤¾à¤°à¥‡ à¤¸à¤°à¥à¤µà¤° à¤ªà¤° à¤¨à¤¹à¥€à¤‚ à¤œà¤¾à¤¤à¤¾" : "Data never leaves your system"}
                  </p>
                </div>
              </div>
              <div className="bg-white/50 border border-slate-200 p-6 rounded-2xl flex items-start gap-4">
                <Eye className="text-teal-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-slate-900 font-black text-xs uppercase tracking-widest">
                    {isHindi ? "à¤ªà¥‚à¤°à¤¾ à¤¨à¤¿à¤¯à¤‚à¤¤à¥à¤°à¤£" : "Full Control"}
                  </p>
                  <p className="text-slate-900 text-[10px] leading-relaxed">
                    {isHindi ? "à¤†à¤ª à¤¤à¤¯ à¤•à¤°à¥‡à¤‚ à¤•à¤¿ à¤•à¥Œà¤¨ à¤¦à¥‡à¤–à¥‡" : "You decide who accesses what"}
                  </p>
                </div>
              </div>
              <div className="bg-white/50 border border-slate-200 p-6 rounded-2xl flex items-start gap-4">
                <BadgeCheck className="text-teal-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-slate-900 font-black text-xs uppercase tracking-widest">
                    {isHindi ? "CAs à¤•à¥‡ à¤²à¤¿à¤ à¤¬à¤¨à¤¾à¤¯à¤¾ à¤—à¤¯à¤¾" : "Built for CAs"}
                  </p>
                  <p className="text-slate-900 text-[10px] leading-relaxed">
                    {isHindi ? "à¤—à¥‹à¤ªà¤¨à¥€à¤¯à¤¤à¤¾ à¤ªà¥‡à¤¶à¥‡à¤µà¤° à¤œà¤¼à¤¿à¤®à¥à¤®à¥‡à¤¦à¤¾à¤°à¥€ à¤¹à¥ˆ" : "Privacy is a professional responsibility"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* USE CASES SECTION â€” Who Is It For */}
      {/* ============================================================ */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className={containerClass}>
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-5 py-2 bg-teal-100 border border-teal-300 rounded-full">
              <p className="text-teal-700 text-[10px] font-black uppercase tracking-[0.4em]">
                {isHindi ? "ðŸŽ¯ à¤•à¤¿à¤¸à¤•à¥‡ à¤²à¤¿à¤ à¤¹à¥ˆ" : "ðŸŽ¯ WHO IS IT FOR"}
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
              {isHindi ? "à¤²à¥‡à¤–à¤¾à¤«à¥à¤²à¥‹ à¤•à¤¿à¤¸à¤•à¥‡ à¤²à¤¿à¤ à¤¹à¥ˆ" : "Who Is LekhaFlow For?"}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Tally Users */}
            <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] hover:border-teal-500/30 transition-all text-center">
              <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Users className="text-blue-500" size={28} />
              </div>
              <h3 className="text-slate-900 font-black uppercase text-sm mb-3">
                {isHindi ? "à¤Ÿà¥ˆà¤²à¥€ à¤¯à¥‚à¤œà¤¼à¤°à¥à¤¸" : "Tally Users"}
              </h3>
              <p className="text-slate-900 text-xs leading-relaxed">
                {isHindi 
                  ? "à¤°à¥‹à¤œà¤¼à¤¾à¤¨à¤¾ à¤•à¥‡ à¤µà¤¾à¤‰à¤šà¤° à¤à¤‚à¤Ÿà¥à¤°à¥€ à¤•à¥‹ à¤¤à¥‡à¤œà¤¼ à¤•à¤°à¥‡à¤‚à¥¤ à¤¬à¥ˆà¤‚à¤• à¤¸à¥à¤Ÿà¥‡à¤Ÿà¤®à¥‡à¤‚à¤Ÿ, à¤‡à¤¨à¤µà¥‰à¤‡à¤¸ à¤¸à¤¬ à¤à¤• à¤œà¤—à¤¹à¥¤"
                  : "Speed up daily voucher entry. Bank statements, invoices, all in one place."}
              </p>
            </div>

            {/* CA Firms */}
            <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] hover:border-teal-500/30 transition-all text-center">
              <div className="w-16 h-16 mx-auto bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="text-teal-500" size={28} />
              </div>
              <h3 className="text-slate-900 font-black uppercase text-sm mb-3">
                {isHindi ? "CA à¤«à¤°à¥à¤®à¥à¤¸" : "CA Firms"}
              </h3>
              <p className="text-slate-900 text-xs leading-relaxed">
                {isHindi 
                  ? "à¤•à¥à¤²à¤¾à¤‡à¤‚à¤Ÿ à¤¡à¥‡à¤Ÿà¤¾ à¤•à¥€ à¤—à¥‹à¤ªà¤¨à¥€à¤¯à¤¤à¤¾ à¤¬à¤¨à¤¾à¤ à¤°à¤–à¥‡à¤‚à¥¤ à¤‘à¤Ÿà¥‹à¤®à¥‡à¤¶à¤¨ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤•à¤‚à¤Ÿà¥à¤°à¥‹à¤² à¤­à¥€à¥¤"
                  : "Maintain client data confidentiality. Automation with control."}
              </p>
            </div>

            {/* Tax Consultants */}
            <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] hover:border-teal-500/30 transition-all text-center">
              <div className="w-16 h-16 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="text-amber-500" size={28} />
              </div>
              <h3 className="text-slate-900 font-black uppercase text-sm mb-3">
                {isHindi ? "à¤Ÿà¥ˆà¤•à¥à¤¸ à¤•à¤‚à¤¸à¤²à¥à¤Ÿà¥‡à¤‚à¤Ÿà¥à¤¸" : "Tax Consultants"}
              </h3>
              <p className="text-slate-900 text-xs leading-relaxed">
                {isHindi 
                  ? "GST à¤°à¤¿à¤•à¤‚à¤¸à¤¿à¤²à¤¿à¤à¤¶à¤¨, à¤‡à¤¨à¤µà¥‰à¤‡à¤¸ à¤ªà¥à¤°à¥‹à¤¸à¥‡à¤¸à¤¿à¤‚à¤—, à¤¸à¥‡à¤²à¥à¤¸ à¤¸à¥à¤ªà¥à¤²à¤¿à¤Ÿ â€” à¤¸à¤¬ à¤à¤• à¤Ÿà¥‚à¤² à¤®à¥‡à¤‚à¥¤"
                  : "GST reconciliation, invoice processing, sales split â€” all in one tool."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TRUST BADGES â€” Service Providers */}
      {/* ============================================================ */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className={containerClass}>
          <p className="text-slate-900 text-[10px] font-black uppercase tracking-[0.5em] text-center mb-8">
            {isHindi ? "à¤‡à¤¨ à¤ªà¥à¤²à¥‡à¤Ÿà¤«à¥‰à¤°à¥à¤®à¥à¤¸ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤•à¤¾à¤® à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ" : "WORKS WITH"}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
            <span className="text-slate-900 font-black text-sm uppercase tracking-widest">Tally</span>
            <span className="text-slate-900 font-black text-sm uppercase tracking-widest">GST</span>
            <span className="text-slate-900 font-black text-sm uppercase tracking-widest">MSME</span>
            <span className="text-slate-900 font-black text-sm uppercase tracking-widest">Windows 10/11</span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SOCIAL PROOF â€” Recent Activity */}
      {/* ============================================================ */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className={containerClass}>
          <p className="text-slate-900 text-[10px] font-black uppercase tracking-[0.5em] text-center mb-6">
            {isHindi ? "à¤¹à¤¾à¤² à¤¹à¥€ à¤®à¥‡à¤‚ à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ à¤•à¤¿à¤¯à¤¾" : "RECENTLY DOWNLOADED"}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-slate-900 text-[10px] font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              CA Firm, Delhi â€” 15 mins ago
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Tax Consultant, Mumbai â€” 1 hour ago
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Tally User, Raipur â€” 3 hours ago
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* HOW IT WORKS */}
      {/* ============================================================ */}
      <section id="how-it-works" className="py-28 bg-slate-50 border-y border-slate-200">
        <div className={containerClass}>
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-5 py-2 bg-teal-50 border border-teal-200 rounded-full">
              <p className="text-teal-700 text-[10px] font-black uppercase tracking-[0.4em]">
                {isHindi ? "4 à¤¸à¤°à¤² à¤šà¤°à¤£" : "4 SIMPLE STEPS"}
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
              {isHindi ? "à¤²à¥‡à¤–à¤¾à¤«à¥à¤²à¥‹ à¤•à¥ˆà¤¸à¥‡ à¤•à¤¾à¤® à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ" : "How LekhaFlow Works"}
            </h2>
            <p className="text-slate-900 font-bold uppercase tracking-widest text-xs max-w-xl mx-auto">
              {isHindi 
                ? "à¤‡à¤¨à¤µà¥‰à¤‡à¤¸, à¤¬à¥ˆà¤‚à¤• à¤¸à¥à¤Ÿà¥‡à¤Ÿà¤®à¥‡à¤‚à¤Ÿ à¤”à¤° à¤…à¤•à¤¾à¤‰à¤‚à¤Ÿà¤¿à¤‚à¤— à¤¡à¥‰à¤•à¥à¤¯à¥‚à¤®à¥‡à¤‚à¤Ÿ à¤¸à¥‡ AI à¤‘à¤Ÿà¥‹à¤®à¥‡à¤¶à¤¨ â€” à¤°à¤¿à¤µà¥à¤¯à¥‚ à¤•à¤°à¥‡à¤‚ à¤”à¤° Tally à¤®à¥‡à¤‚ à¤­à¥‡à¤œà¥‡à¤‚à¥¤" 
                : "From invoices and bank statements to accounting entries â€” AI processes the work, you review it, then send it to Tally."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { num: "01", icon: FileText, title: isHindi ? "PDF à¤…à¤ªà¤²à¥‹à¤¡ à¤•à¤°à¥‡à¤‚" : "Upload Bank Statement", desc: isHindi ? "à¤…à¤ªà¤¨à¤¾ à¤¬à¥ˆà¤‚à¤• à¤¸à¥à¤Ÿà¥‡à¤Ÿà¤®à¥‡à¤‚à¤Ÿ PDF à¤šà¥à¤¨à¥‡à¤‚à¥¤ à¤¸à¥‰à¤«à¥à¤Ÿà¤µà¥‡à¤¯à¤° à¤¸à¥à¤µà¤šà¤¾à¤²à¤¿à¤¤ à¤°à¥‚à¤ª à¤¸à¥‡ à¤¬à¥ˆà¤‚à¤• à¤•à¤¾ à¤ªà¤¤à¤¾ à¤²à¤—à¤¾ à¤²à¥‡à¤—à¤¾à¥¤" : "Select your bank statement PDF. The software auto-detects the bank format." },
              { num: "02", icon: Cpu, title: isHindi ? "AI à¤ªà¤¢à¤¼à¤¤à¤¾ à¤¹à¥ˆ" : "AI Reads & Categorizes", desc: isHindi ? "AI à¤ªà¥à¤°à¤¤à¥à¤¯à¥‡à¤• à¤²à¥‡à¤¨-à¤¦à¥‡à¤¨ à¤•à¥‹ à¤ªà¤¢à¤¼à¤¤à¤¾ à¤¹à¥ˆ, à¤¨à¥ˆà¤°à¥‡à¤¶à¤¨ à¤•à¥‹ à¤¸à¤®à¤à¤¤à¤¾ à¤¹à¥ˆ, à¤”à¤° à¤¡à¥‡à¤¬à¤¿à¤Ÿ/à¤•à¥à¤°à¥‡à¤¡à¤¿à¤Ÿ à¤•à¥‹ à¤µà¤°à¥à¤—à¥€à¤•à¥ƒà¤¤ à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆà¥¤" : "AI reads every transaction, understands narration, and classifies Dr/Cr automatically." },
              { num: "03", icon: Landmark, title: isHindi ? "à¤—à¥à¤°à¤¿à¤¡ à¤®à¥‡à¤‚ à¤¸à¤®à¥€à¤•à¥à¤·à¤¾ à¤•à¤°à¥‡à¤‚" : "Review in Smart Grid", desc: isHindi ? "à¤¸à¤­à¥€ à¤²à¥‡à¤¨-à¤¦à¥‡à¤¨ à¤à¤• à¤¸à¤¾à¤« à¤—à¥à¤°à¤¿à¤¡ à¤®à¥‡à¤‚ à¤¦à¤¿à¤–à¤¾à¤ˆ à¤¦à¥‡à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤ à¤“à¤ªà¤¨à¤¿à¤‚à¤—/à¤•à¥à¤²à¥‹à¤œà¤¿à¤‚à¤— à¤¬à¥ˆà¤²à¥‡à¤‚à¤¸ à¤‘à¤Ÿà¥‹-à¤µà¥ˆà¤²à¤¿à¤¡à¥‡à¤Ÿà¥‡à¤¡à¥¤" : "All transactions appear in a clean grid. Opening/closing balance auto-validated." },
              { num: "04", icon: Send, title: isHindi ? "à¤µà¤¨-à¤•à¥à¤²à¤¿à¤• à¤Ÿà¥ˆà¤²à¥€" : "One-Click to Tally", desc: isHindi ? "'Send to Tally' à¤¦à¤¬à¤¾à¤à¤‚à¥¤ à¤¸à¤­à¥€ à¤µà¤¾à¤‰à¤šà¤° à¤¸à¥€à¤§à¥‡ à¤†à¤ªà¤•à¥‡ à¤Ÿà¥ˆà¤²à¥€ à¤®à¥‡à¤‚ à¤¬à¤¨ à¤œà¤¾à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤" : "Hit 'Send to Tally'. All vouchers are created directly in your Tally â€” no XML import needed." },
            ].map((step, i) => (
              <div key={i} className="group bg-white border border-slate-200 p-10 rounded-[2.5rem] hover:bg-white hover:border-teal-500/30 transition-all text-center relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-50 border border-slate-200 px-4 py-1 rounded-full">
                  <span className="text-teal-500 font-black text-xs tracking-widest">{step.num}</span>
                </div>
                <div className="w-16 h-16 mx-auto bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-500/20 transition-colors mt-4">
                  <step.icon className="text-teal-500" size={28} />
                </div>
                <h3 className="text-slate-900 font-black uppercase text-sm mb-4 tracking-widest">{step.title}</h3>
                <p className="text-slate-900 font-medium text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-900 text-[10px] font-bold uppercase tracking-widest mb-6">
              {isHindi 
                ? "à¤¯à¤¹à¥€ workflow Purchase Invoices, Sales Invoices, Bank Statements à¤”à¤° Sales Split à¤•à¥‡ à¤²à¤¿à¤ à¤¬à¤¨à¤¾à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤" 
                : "The same workflow extends across Purchase Invoices, Sales Invoices, Bank Statements and Sales Split."}
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-amber-500/30 rounded-2xl">
              <Sparkles size={16} className="text-amber-500" />
              <span className="text-slate-900 text-xs font-bold uppercase tracking-widest">
                {isHindi ? "ðŸ”¥ à¤¸à¥‡à¤²à¥à¤¸ à¤¸à¥à¤ªà¥à¤²à¤¿à¤Ÿ: â‚¹75,000 à¤•à¤¾ à¤‡à¤¨à¤µà¥‰à¤‡à¤¸ â†’ 2 à¤µà¤¾à¤‰à¤šà¤° (â‚¹40K + â‚¹35K) à¤‘à¤Ÿà¥‹à¤®à¥‡à¤Ÿà¤¿à¤•" : "ðŸ”¥ Sales Split: â‚¹75,000 Invoice â†’ 2 Vouchers (â‚¹40K + â‚¹35K) Automatic"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DEMO FLOW SECTION */}
      {/* ============================================================ */}
      <section className="py-24 bg-white">
        <div className={containerClass}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
              {isHindi ? "à¤«à¥à¤°à¥€ à¤¡à¥‡à¤®à¥‹ à¤•à¥ˆà¤¸à¥‡ à¤•à¤¾à¤® à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ" : "How the Free Demo Works"}
            </h2>
            <p className="text-slate-900 font-bold uppercase tracking-widest text-xs">
              {isHindi ? "à¤•à¥‹à¤ˆ à¤ªà¥‡à¤®à¥‡à¤‚à¤Ÿ à¤¨à¤¹à¥€à¤‚à¥¤ à¤•à¥‹à¤ˆ à¤•à¥à¤°à¥‡à¤¡à¤¿à¤Ÿ à¤•à¤¾à¤°à¥à¤¡ à¤¨à¤¹à¥€à¤‚à¥¤" : "No payment. No credit card required."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { num: "01", title: isHindi ? "à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ à¤•à¤°à¥‡à¤‚" : "Download", desc: isHindi ? "7-à¤¦à¤¿à¤¨ à¤•à¤¾ à¤Ÿà¥à¤°à¤¾à¤¯à¤² à¤¸à¥‡à¤Ÿà¤…à¤ª à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ à¤•à¤°à¥‡à¤‚à¥¤" : "Download the 7-day trial setup file (Windows 10/11)." },
              { num: "02", title: isHindi ? "à¤‡à¤‚à¤¸à¥à¤Ÿà¥‰à¤² à¤•à¤°à¥‡à¤‚" : "Install", desc: isHindi ? "à¤¸à¥‰à¤«à¥à¤Ÿà¤µà¥‡à¤¯à¤° à¤‡à¤‚à¤¸à¥à¤Ÿà¥‰à¤² à¤•à¤°à¥‡à¤‚à¥¤ à¤®à¤¶à¥€à¤¨ à¤†à¤ˆà¤¡à¥€ à¤•à¥‰à¤ªà¥€ à¤•à¤°à¥‡à¤‚à¥¤" : "Install the software. Copy the Machine Hardware ID displayed." },
              { num: "03", title: isHindi ? "à¤¹à¤®à¤¸à¥‡ à¤¸à¤‚à¤ªà¤°à¥à¤• à¤•à¤°à¥‡à¤‚" : "Contact Us", desc: isHindi ? "à¤µà¥à¤¹à¤¾à¤Ÿà¥à¤¸à¤à¤ª à¤ªà¤° à¤†à¤ˆà¤¡à¥€ à¤­à¥‡à¤œà¥‡à¤‚à¥¤ à¤¹à¤® 2 à¤˜à¤‚à¤Ÿà¥‡ à¤®à¥‡à¤‚ à¤²à¤¾à¤‡à¤¸à¥‡à¤‚à¤¸ à¤­à¥‡à¤œ à¤¦à¥‡à¤‚à¤—à¥‡à¥¤" : "Send the ID on WhatsApp. We send your trial license within 2 hours." },
              { num: "04", title: isHindi ? "à¤Ÿà¥ˆà¤²à¥€ à¤®à¥‡à¤‚ à¤¦à¥‡à¤–à¥‡à¤‚" : "See It in Tally", desc: isHindi ? "à¤…à¤ªà¤¨à¥‡ à¤¬à¥ˆà¤‚à¤• à¤¸à¥à¤Ÿà¥‡à¤Ÿà¤®à¥‡à¤‚à¤Ÿ à¤”à¤° à¤‡à¤¨à¤µà¥‰à¤‡à¤¸ à¤•à¥‹ à¤Ÿà¥ˆà¤²à¥€ à¤®à¥‡à¤‚ à¤¦à¥‡à¤–à¥‡à¤‚à¥¤" : "Watch your bank statements and invoices flow into Tally automatically." },
            ].map((step, i) => (
              <div key={i} className="bg-white border border-slate-200 p-8 rounded-[2rem] text-center hover:border-teal-500/30 transition-all">
                <div className="text-4xl font-black text-teal-500/20 mb-4">{step.num}</div>
                <h3 className="text-slate-900 font-black uppercase text-sm mb-3 tracking-widest">{step.title}</h3>
                <p className="text-slate-900 font-medium text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-900 text-[10px] font-bold uppercase tracking-widest">
              {isHindi 
                ? "à¤¸à¤‚à¤¦à¥‡à¤¹ à¤¹à¥ˆ? à¤µà¥à¤¹à¤¾à¤Ÿà¥à¤¸à¤à¤ª à¤ªà¤° 'à¤¡à¥‡à¤®à¥‹' à¤²à¤¿à¤–à¥‡à¤‚ à¤”à¤° à¤¹à¤® à¤†à¤ªà¤•à¥‹ à¤¸à¥à¤•à¥à¤°à¥€à¤¨ à¤¶à¥‡à¤¯à¤° à¤ªà¤° à¤¦à¤¿à¤–à¤¾à¤à¤‚à¤—à¥‡à¥¤" 
                : "Not sure? WhatsApp 'DEMO' and we'll show you live via screen share."}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CORE BENEFITS */}
      {/* ============================================================ */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className={containerClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.trust.map((item, i) => (
              <div key={i} className="group bg-white/30 border border-slate-200 p-10 rounded-[3rem] hover:bg-white hover:border-teal-500/30 transition-all">
                 <item.i className={`${item.c} mb-8 group-hover:scale-110 transition-transform`} size={32} />
                 <h3 className="text-slate-900 font-black uppercase text-sm mb-4 tracking-widest">{item.t}</h3>
                 <p className="text-slate-900 font-medium text-xs leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* ============================================================ */}
{/* COMPETITOR COMPARISON â€” Stronger Differentiation */}
{/* ============================================================ */}
<section className="py-24 bg-slate-50 border-y-2 border-slate-200">
  <div className={containerClass}>
    <div className="text-center mb-12">
      <div className="inline-block mb-4 px-5 py-2 bg-teal-100 border border-teal-300 rounded-full">
        <p className="text-teal-700 text-[10px] font-black uppercase tracking-[0.4em]">
          {isHindi ? "ðŸ“Š à¤²à¥‡à¤–à¤¾à¤«à¥à¤²à¥‹ à¤¬à¤¨à¤¾à¤® à¤•à¤‚à¤ªà¤Ÿà¥€à¤Ÿà¤°à¥à¤¸" : "ðŸ“Š LEKHAFLOW VS COMPETITORS"}
        </p>
      </div>
      <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
        {isHindi ? "à¤²à¥‡à¤–à¤¾à¤«à¥à¤²à¥‹ à¤•à¥à¤¯à¥‹à¤‚ à¤…à¤²à¤— à¤¹à¥ˆ" : "Built Differently for Tally Professionals"}
      </h2>
      <p className="text-slate-900 font-bold uppercase tracking-widest text-xs max-w-xl mx-auto">
        {isHindi 
          ? "Vouchrit AI-ledger à¤ªà¤° à¤«à¥‹à¤•à¤¸ à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ, Vyapar TaxOne practice management à¤ªà¤° â€” LekhaFlow desktop workflow + privacy + sales split à¤ªà¤°"
          : "Vouchrit focuses on AI-ledger prediction, Vyapar TaxOne on practice management â€” LekhaFlow owns desktop workflow + privacy + sales split"}
      </p>
    </div>
    <div className="max-w-4xl mx-auto overflow-x-auto">
      <table className="w-full text-left bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="py-4 text-slate-900 text-[10px] font-black uppercase tracking-widest px-4">Feature</th>
              <th className="py-4 text-teal-600 text-[10px] font-black uppercase tracking-widest text-center">LekhaFlow</th>
              <th className="py-4 text-slate-600 text-[10px] font-black uppercase tracking-widest text-center">Vyapar TaxOne</th>
              <th className="py-4 text-slate-600 text-[10px] font-black uppercase tracking-widest text-center">Vouchrit</th>
            </tr>
          </thead>
          <tbody className="text-xs font-bold text-slate-800"> {/* ðŸ‘ˆ Text ko dark kiya */}
          <tr className="border-b border-slate-200/50"><td className="py-4">Bank Statement â†’ Tally</td><td className="text-center text-teal-500">âœ“ Unlimited</td><td className="text-center">âœ“</td><td className="text-center text-pink-500">âœ—</td></tr>
          <tr className="border-b border-slate-200/50"><td className="py-4">PDF Invoice â†’ Tally</td><td className="text-center text-teal-500">âœ“</td><td className="text-center">âœ“</td><td className="text-center text-pink-500">âœ—</td></tr>
          <tr className="border-b border-slate-200/50"><td className="py-4">Sales Split Below â‚¹50K</td><td className="text-center text-amber-500 font-black">âœ“ Auto</td><td className="text-center text-pink-500">âœ—</td><td className="text-center text-pink-500">âœ—</td></tr>
          <tr className="border-b border-slate-200/50"><td className="py-4">Client Data Privacy</td><td className="text-center text-teal-500 font-black">âœ“ 100% Local</td><td className="text-center">Cloud</td><td className="text-center">Cloud</td></tr>
          <tr><td className="py-4">Yearly Price</td><td className="text-center text-teal-500 font-black">â‚¹7,999</td><td className="text-center">â‚¹10,000+</td><td className="text-center">â‚¹12,000+</td></tr>
        </tbody>
      </table>
    </div>
    <div className="text-center mt-8">
      <p className="text-slate-900 text-[10px] font-bold uppercase tracking-widest">
        {isHindi 
          ? "ðŸ”¥ Vouchrit AI-ledger à¤ªà¤°, Vyapar TaxOne practice management à¤ªà¤° â€” LekhaFlow desktop workflow + privacy + unique sales split à¤ªà¤°" 
          : "ðŸ”¥ Vouchrit owns AI-ledger prediction, Vyapar TaxOne owns practice management â€” LekhaFlow owns desktop workflow + privacy + unique sales split"}
      </p>
    </div>
  </div>
</section>

      {/* ============================================================ */}
      {/* GSTR-2B COMING SOON BANNER */}
      {/* ============================================================ */}
      <section className="py-16 bg-blue-50 border-y border-blue-500/20">
        <div className={containerClass}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-100 border border-blue-300 rounded-full mb-4">
              <Sparkles className="text-blue-400" size={16} />
              <span className="text-blue-700 text-[10px] font-black uppercase tracking-[0.3em]">
                {isHindi ? "ðŸ”œ à¤…à¤ªà¤¡à¥‡à¤Ÿ à¤† à¤°à¤¹à¤¾ à¤¹à¥ˆ" : "ðŸ”œ COMING SOON"}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-tighter">
              {isHindi ? "GSTR-2B à¤°à¤¿à¤•à¤‚à¤¸à¤¿à¤²à¤¿à¤à¤¶à¤¨" : "GSTR-2B Reconciliation"}
            </h3>
            <p className="text-slate-900 text-sm max-w-2xl mx-auto mt-3">
              {isHindi 
                ? "à¤ªà¤°à¥à¤šà¥‡à¤œ à¤‡à¤¨à¤µà¥‰à¤‡à¤¸ à¤•à¥‹ GSTR-2B à¤¸à¥‡ à¤‘à¤Ÿà¥‹-à¤®à¥ˆà¤š à¤•à¤°à¥‡à¤‚à¥¤ à¤®à¤¿à¤¸à¤®à¥ˆà¤š à¤•à¥‹ à¤†à¤¸à¤¾à¤¨à¥€ à¤¸à¥‡ à¤ªà¤¹à¤šà¤¾à¤¨à¥‡à¤‚à¥¤ à¤…à¤—à¤²à¥‡ à¤…à¤ªà¤¡à¥‡à¤Ÿ à¤®à¥‡à¤‚ à¤† à¤°à¤¹à¤¾ à¤¹à¥ˆà¥¤"
                : "Auto-match purchase invoices with GSTR-2B. Identify mismatches easily. Coming in the next update."}
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <span className="text-slate-900 text-[10px] font-bold uppercase tracking-widest border border-slate-200 px-4 py-2 rounded-full">
                {isHindi ? "âœ… à¤ªà¤°à¥à¤šà¥‡à¤œ à¤‡à¤¨à¤µà¥‰à¤‡à¤¸" : "âœ… Purchase Invoices"}
              </span>
              <span className="text-slate-900 text-[10px] font-bold uppercase tracking-widest border border-slate-200 px-4 py-2 rounded-full">
                {isHindi ? "âœ… GSTR-2B à¤®à¥ˆà¤šà¤¿à¤‚à¤—" : "âœ… GSTR-2B Matching"}
              </span>
              <span className="text-slate-900 text-[10px] font-bold uppercase tracking-widest border border-slate-200 px-4 py-2 rounded-full">
                {isHindi ? "âœ… à¤®à¤¿à¤¸à¤®à¥ˆà¤š à¤¡à¤¿à¤Ÿà¥‡à¤•à¥à¤¶à¤¨" : "âœ… Mismatch Detection"}
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
          <div className="bg-white border border-slate-200 rounded-[4rem] p-10 lg:p-20 shadow-2xl grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                  {isHindi ? "à¤‘à¤Ÿà¥‹à¤®à¥‡à¤¶à¤¨ à¤•à¤¾ à¤µà¤¿à¤¤à¥à¤¤à¥€à¤¯ à¤ªà¥à¤°à¤­à¤¾à¤µ" : "The Financial Impact of"} <span className="text-teal-500">{isHindi ? "à¤‘à¤Ÿà¥‹à¤®à¥‡à¤¶à¤¨" : "Automation"}</span>
                </h2>
                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">
                      {isHindi ? "à¤”à¤¸à¤¤ à¤‡à¤¨à¤µà¥‰à¤‡à¤¸ / à¤®à¤¹à¥€à¤¨à¤¾" : "Average Invoices / Month"}: {invoices}
                    </label>
                    <input type="range" min="100" max="5000" step="100" value={invoices} onChange={(e) => setInvoices(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">
                      {isHindi ? "à¤µà¤°à¥à¤¤à¤®à¤¾à¤¨ à¤¸à¥à¤Ÿà¤¾à¤« à¤µà¥‡à¤¤à¤¨" : "Current Staff Salary"}: â‚¹{staffCost}
                    </label>
                    <input type="range" min="8000" max="50000" step="1000" value={staffCost} onChange={(e) => setStaffCost(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                  </div>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-200 text-center">
                   <p className="text-slate-900 text-[10px] font-black uppercase tracking-[0.3em] mb-3">
                     {isHindi ? "à¤…à¤ªà¤¨à¤¾ à¤¸à¤®à¤¯ à¤µà¤¾à¤ªà¤¸ à¤²à¥‡à¤‚" : "Reclaim Your Time"}
                   </p>
                   <p className="text-6xl font-black text-teal-500 tracking-tighter">{Math.round(timeSavedValue / 60)} <span className="text-2xl text-slate-900">Hrs/Mo</span></p>
                </div>
                <div className="bg-teal-500 p-12 rounded-[2.5rem] text-black shadow-xl text-center">
                   <p className="text-teal-900 text-[10px] font-black uppercase tracking-[0.3em] mb-3">
                     {isHindi ? "à¤µà¤¾à¤°à¥à¤·à¤¿à¤• à¤¬à¤šà¤¤" : "Annual Operational Savings"}
                   </p>
                   <p className="text-6xl font-black tracking-tighter">â‚¹{annualSavingsValue.toLocaleString()}</p>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FAQ SECTION â€” Dedicated */}
      {/* ============================================================ */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className={containerClass}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
              {isHindi ? "à¤…à¤•à¥à¤¸à¤° à¤ªà¥‚à¤›à¥‡ à¤œà¤¾à¤¨à¥‡ à¤µà¤¾à¤²à¥‡ à¤¸à¤µà¤¾à¤²" : "Frequently Asked Questions"}
            </h2>
            <p className="text-slate-900 font-bold uppercase tracking-widest text-xs">
              {isHindi ? "à¤œà¤µà¤¾à¤¬ à¤œà¥‹ à¤†à¤ªà¤•à¥‹ à¤šà¤¾à¤¹à¤¿à¤" : "Answers you need"}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: isHindi ? "à¤•à¥à¤¯à¤¾ LekhaFlow à¤•à¥à¤²à¤¾à¤‰à¤¡-à¤†à¤§à¤¾à¤°à¤¿à¤¤ à¤¹à¥ˆ?" : "Is LekhaFlow cloud-based?",
                a: isHindi 
                  ? "à¤¨à¤¹à¥€à¤‚à¥¤ LekhaFlow à¤à¤• à¤¡à¥‡à¤¸à¥à¤•à¤Ÿà¥‰à¤ª à¤¸à¥‰à¤«à¥à¤Ÿà¤µà¥‡à¤¯à¤° à¤¹à¥ˆà¥¤ à¤†à¤ªà¤•à¤¾ à¤¡à¥‡à¤Ÿà¤¾ à¤†à¤ªà¤•à¥‡ à¤•à¤‚à¤ªà¥à¤¯à¥‚à¤Ÿà¤° à¤ªà¤° à¤¹à¥€ à¤°à¤¹à¤¤à¤¾ à¤¹à¥ˆà¥¤ à¤¹à¤®à¤¾à¤°à¥‡ à¤¸à¤°à¥à¤µà¤° à¤ªà¤° à¤•à¥‹à¤ˆ à¤¡à¥‡à¤Ÿà¤¾ à¤¨à¤¹à¥€à¤‚ à¤œà¤¾à¤¤à¤¾à¥¤"
                  : "No. LekhaFlow is desktop software. Your data stays on your computer. No data goes to our servers."
              },
              {
                q: isHindi ? "à¤•à¥à¤¯à¤¾ à¤¯à¤¹ à¤‘à¤«à¤²à¤¾à¤‡à¤¨ à¤•à¤¾à¤® à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ?" : "Does it work offline?",
                a: isHindi 
                  ? "à¤¹à¤¾à¤à¥¤ à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ à¤•à¥‡ à¤¬à¤¾à¤¦ à¤‡à¤‚à¤Ÿà¤°à¤¨à¥‡à¤Ÿ à¤•à¥€ à¤œà¤°à¥‚à¤°à¤¤ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤ à¤†à¤ª à¤‘à¤«à¤²à¤¾à¤‡à¤¨ à¤•à¤¾à¤® à¤•à¤° à¤¸à¤•à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤"
                  : "Yes. No internet required after download. You can work offline."
              },
              {
                q: isHindi ? "à¤•à¥Œà¤¨ à¤¸à¥€ Tally versions à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ?" : "Which Tally versions are supported?",
                a: isHindi 
                  ? "Tally Prime, Tally ERP 9, à¤”à¤° à¤¸à¤­à¥€ à¤¹à¤¾à¤²à¤¿à¤¯à¤¾ à¤µà¤°à¥à¤œà¤¨ à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆà¥¤"
                  : "Supports Tally Prime, Tally ERP 9, and all recent versions."
              },
              {
                q: isHindi ? "GSTR-2B à¤°à¤¿à¤•à¤‚à¤¸à¤¿à¤²à¤¿à¤à¤¶à¤¨ à¤•à¤¬ à¤†à¤à¤—à¤¾?" : "When will GSTR-2B reconciliation come?",
                a: isHindi 
                  ? "GSTR-2B à¤°à¤¿à¤•à¤‚à¤¸à¤¿à¤²à¤¿à¤à¤¶à¤¨ à¤…à¤—à¤²à¥‡ à¤…à¤ªà¤¡à¥‡à¤Ÿ à¤®à¥‡à¤‚ à¤† à¤°à¤¹à¤¾ à¤¹à¥ˆà¥¤ à¤¹à¤® à¤‡à¤¸ à¤ªà¤° à¤•à¤¾à¤® à¤•à¤° à¤°à¤¹à¥‡ à¤¹à¥ˆà¤‚à¥¤"
                  : "GSTR-2B reconciliation is coming in the next update. We're working on it."
              },
              {
                q: isHindi ? "à¤•à¥à¤¯à¤¾ à¤®à¥ˆà¤‚ à¤–à¤°à¥€à¤¦à¤¨à¥‡ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤Ÿà¥à¤°à¤¾à¤¯à¤² à¤•à¤° à¤¸à¤•à¤¤à¤¾ à¤¹à¥‚à¤?" : "Can I try before buying?",
                a: isHindi 
                  ? "à¤¹à¤¾à¤à¥¤ 7-à¤¦à¤¿à¤¨ à¤•à¤¾ à¤«à¥à¤°à¥€ à¤Ÿà¥à¤°à¤¾à¤¯à¤² à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤…à¤ªà¤¨à¥‡ à¤¡à¥‡à¤Ÿà¤¾ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤Ÿà¥‡à¤¸à¥à¤Ÿ à¤•à¤°à¥‡à¤‚à¥¤"
                  : "Yes. Download the 7-day free trial and test it with your own data."
              },
              {
                q: isHindi ? "LekhaFlow Vouchrit à¤¯à¤¾ TaxOne à¤¸à¥‡ à¤•à¥ˆà¤¸à¥‡ à¤…à¤²à¤— à¤¹à¥ˆ?" : "How is LekhaFlow different from Vouchrit or TaxOne?",
                a: isHindi 
                  ? "LekhaFlow à¤¡à¥‡à¤¸à¥à¤•à¤Ÿà¥‰à¤ª-à¤«à¤°à¥à¤¸à¥à¤Ÿ, à¤ªà¥à¤°à¤¾à¤‡à¤µà¥‡à¤¸à¥€-à¤«à¥‹à¤•à¤¸à¥à¤¡ à¤¹à¥ˆ, à¤”à¤° à¤¸à¥‡à¤²à¥à¤¸ à¤¸à¥à¤ªà¥à¤²à¤¿à¤Ÿ à¤«à¥€à¤šà¤° à¤¦à¥‡à¤¤à¤¾ à¤¹à¥ˆ â€” à¤œà¥‹ à¤¦à¥‹à¤¨à¥‹à¤‚ à¤•à¤‚à¤ªà¤Ÿà¥€à¤Ÿà¤°à¥à¤¸ à¤®à¥‡à¤‚ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤"
                  : "LekhaFlow is desktop-first, privacy-focused, and offers unique sales split â€” which neither competitor provides."
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-white border border-slate-200 rounded-2xl transition-all hover:border-teal-500/30">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <span className="text-slate-900 font-black text-sm uppercase tracking-widest">{faq.q}</span>
                  <span className="text-teal-500 group-open:rotate-180 transition-transform">â–¼</span>
                </summary>
                <div className="px-6 pb-6 text-slate-900 text-sm leading-relaxed border-t border-slate-200 pt-4">
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
          <div className="bg-white border border-slate-200 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-10">
              <div className="w-28 h-28 flex-shrink-0 rounded-full border-2 border-teal-500/20 overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <img src="/jitendra.bharti.jpg" alt="Founder" className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                 <h3 className="text-slate-900 font-black uppercase tracking-widest text-lg mb-3">
                   {isHindi ? "à¤¸à¤Ÿà¥€à¤•à¤¤à¤¾ à¤•à¥‡ à¤ªà¥à¤°à¤¤à¤¿ à¤ªà¥à¤°à¤¤à¤¿à¤¬à¤¦à¥à¤§à¤¤à¤¾" : "Commitment to Accuracy"}
                 </h3>
                 <p className="text-slate-900 italic text-sm leading-relaxed mb-4">
                   {isHindi 
                     ? "à¤­à¤¾à¤°à¤¤à¥€à¤¯ à¤²à¥‡à¤–à¤¾ à¤¸à¤®à¥à¤¦à¤¾à¤¯ à¤•à¥‹ à¤•à¥à¤²à¤°à¥à¤•à¤¿à¤¯à¤² à¤¬à¥‹à¤ à¤•à¤® à¤•à¤°à¤•à¥‡ à¤¸à¤¶à¤•à¥à¤¤ à¤¬à¤¨à¤¾à¤¨à¤¾ à¤¹à¤®à¤¾à¤°à¤¾ à¤®à¤¿à¤¶à¤¨ à¤¹à¥ˆà¥¤ à¤¹à¤® à¤‡à¤¨à¤µà¥‰à¤‡à¤¸ à¤•à¥€ à¤ªà¥à¤°à¥‹à¤¸à¥‡à¤¸à¤¿à¤‚à¤— à¤²à¤¾à¤—à¤¤ à¤”à¤° 100% à¤¡à¥‡à¤Ÿà¤¾ à¤…à¤–à¤‚à¤¡à¤¤à¤¾ à¤•à¥‹ à¤²à¤•à¥à¤·à¤¿à¤¤ à¤•à¤° à¤°à¤¹à¥‡ à¤¹à¥ˆà¤‚à¥¤" 
                     : "Our mission is to empower the Indian accounting community by reducing the clerical burden. We are targeting a processing cost with 100% data integrity."}
                 </p>
                 <p className="text-teal-500 font-bold text-[10px] uppercase tracking-[0.2em]">
                   {isHindi ? "à¤œà¤¿à¤¤à¥‡à¤‚à¤¦à¥à¤° à¤­à¤¾à¤°à¤¤à¥€ â€” à¤¸à¤‚à¤¸à¥à¤¥à¤¾à¤ªà¤•, à¤²à¥‡à¤–à¤¾à¤«à¥à¤²à¥‹" : "Jitendra Bharti â€” Founder, LekhaFlow"}
                 </p>
              </div>
          </div>
        </div>
      </section>

           {/* ============================================================ */}
      {/* PRICING SECTION */}
      {/* ============================================================ */}
      <section id="pricing" className="py-32 bg-slate-50 border-t border-slate-200">
        <div className={containerClass}>
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-1.5 bg-amber-100 border border-amber-300 rounded-full">
              <p className="text-amber-700 text-[10px] font-black uppercase tracking-[0.3em]">
                {isHindi ? "à¤¸à¥à¤µà¤¤à¤‚à¤¤à¥à¤°à¤¤à¤¾ à¤¦à¤¿à¤µà¤¸ à¤²à¥‰à¤¨à¥à¤š à¤‘à¤«à¤°" : "Independence Day Launch Offer"}
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
              {isHindi ? "à¤ªà¥à¤°à¥‹à¤«à¥‡à¤¶à¤¨à¤² à¤²à¤¾à¤‡à¤¸à¥‡à¤‚à¤¸" : "Professional Licenses"}
            </h2>
            <p className="text-slate-900 font-bold uppercase tracking-widest text-xs mb-2">
              {isHindi ? "à¤ªà¤¹à¤²à¥‡ 50 à¤—à¥à¤°à¤¾à¤¹à¤•à¥‹à¤‚ à¤•à¥‡ à¤²à¤¿à¤ à¤µà¤¿à¤¶à¥‡à¤· à¤®à¥‚à¤²à¥à¤¯" : "Special pricing for first 50 clients only"}
            </p>
            <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">
              {isHindi ? "31 à¤…à¤—à¤¸à¥à¤¤ 2026 à¤¤à¤• à¤µà¥ˆà¤§" : "Valid till 31st August 2026"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-10 max-w-3xl mx-auto">
            {Object.entries(productData).filter(([key]) => key === 'standard').map(([key, p]) => (
              <div key={key} className={`bg-white border-2 ${p.color} p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between group max-w-lg mx-auto w-full`}>
                <div className="absolute top-0 right-0 bg-amber-500 text-black px-6 py-1 text-[9px] font-black uppercase tracking-widest">
                  {isHindi ? "à¤¸à¤¬à¤¸à¥‡ à¤²à¥‹à¤•à¤ªà¥à¤°à¤¿à¤¯" : "Most Popular"}
                </div>
                <div className="space-y-6">
                  <h3 className="text-slate-900 font-black text-xs uppercase tracking-[0.3em]">{p.title}</h3>
                  <div className="py-8 border-y border-slate-200">
                    <p className={`text-slate-900 font-black text-2xl tracking-tighter mb-1 line-through`}>â‚¹{p.originalPrice}</p>
                    <p className={`${p.accent} font-black text-6xl tracking-tighter mb-2`}>â‚¹{p.offerPrice}</p>
                    <p className="text-[10px] text-slate-900 font-bold uppercase tracking-widest">{p.limit}</p>
                  </div>
                  <p className="text-[11px] font-bold text-slate-900 italic leading-snug">{p.tagline}</p>
                  <ul className="space-y-4 py-4">
                    {p.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-[11px] font-bold text-slate-900">
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
                    {isHindi ? "à¤–à¤°à¥€à¤¦à¥‡à¤‚" : "Buy Now"} â€” â‚¹{p.offerPrice}
                  </button>
                  <Link href="/downloads" className="block w-full py-5 bg-slate-100 text-slate-900 rounded-2xl font-black uppercase text-[10px] text-center tracking-widest border border-slate-200 hover:border-slate-600 transition-all">
                    {isHindi ? "à¤¸à¥‡à¤Ÿà¤…à¤ª à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ à¤•à¤°à¥‡à¤‚" : "Download Setup"}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 max-w-2xl mx-auto">
            <p className="text-slate-900 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              {isHindi 
                ? "à¤ªà¤¹à¤²à¥‡ 50 à¤—à¥à¤°à¤¾à¤¹à¤•à¥‹à¤‚ à¤•à¥‹ lifetime à¤¯à¤¹à¥€ à¤®à¥‚à¤²à¥à¤¯ à¤®à¤¿à¤²à¥‡à¤—à¤¾à¥¤ 1 à¤¸à¤¿à¤¤à¤‚à¤¬à¤° à¤¸à¥‡ â‚¹11999 à¤¹à¥‹ à¤œà¤¾à¤à¤—à¤¾à¥¤" 
                : "First 50 clients lock this price for life. From 1st Sept, price becomes â‚¹11,999."}
            </p>
          </div>

          <p className="text-center mt-6 text-slate-900 text-[10px] font-bold uppercase tracking-widest">
            ðŸ”’ {isHindi ? "7-à¤¦à¤¿à¤¨ à¤•à¤¾ à¤°à¤¿à¤«à¤‚à¤¡ à¤—à¤¾à¤°à¤‚à¤Ÿà¥€ â€” à¤…à¤—à¤° à¤ªà¤¸à¤‚à¤¦ à¤¨à¤¹à¥€à¤‚ à¤†à¤¯à¤¾ à¤¤à¥‹ à¤ªà¥ˆà¤¸à¥‡ à¤µà¤¾à¤ªà¤¸" : "7-Day Money-Back Guarantee â€” Not satisfied? Full refund"}
          </p>

          <p className="text-center mt-8 text-slate-900 text-[10px] font-bold uppercase tracking-widest">Latest Stable Build: {latestVersion} | Released: {formatDate(publishedAt)}</p>
        </div>
      </section>
      {/* ============================================================ */}
      {/* TESTIMONIALS */}
      {/* ============================================================ */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className={containerClass}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
              {isHindi ? "à¤²à¥‡à¤–à¤¾à¤•à¤¾à¤° à¤•à¥à¤¯à¤¾ à¤•à¤¹à¤¤à¥‡ à¤¹à¥ˆà¤‚" : "What Accountants Say"}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "CA Rahul Sharma", firm: "Sharma & Associates, Raipur", quote: isHindi ? "à¤¬à¥ˆà¤‚à¤• à¤¸à¥à¤Ÿà¥‡à¤Ÿà¤®à¥‡à¤‚à¤Ÿ à¤•à¥‹ à¤Ÿà¥ˆà¤²à¥€ à¤®à¥‡à¤‚ à¤¡à¤¾à¤²à¤¨à¥‡ à¤®à¥‡à¤‚ 3 à¤˜à¤‚à¤Ÿà¥‡ à¤¬à¤šà¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤" : "Bank statement entry that used to take 3 hours now finishes in 10 minutes." },
              { name: "Priya Gupta", firm: "Gupta Tax Consultants, Bilaspur", quote: isHindi ? "à¤¸à¥‡à¤²à¥à¤¸ à¤¸à¥à¤ªà¥à¤²à¤¿à¤Ÿ à¤«à¥€à¤šà¤° à¤¬à¤¹à¥à¤¤ à¤¶à¤•à¥à¤¤à¤¿à¤¶à¤¾à¤²à¥€ à¤¹à¥ˆà¥¤ à¤®à¥ˆà¤¨à¥à¤¯à¥à¤…à¤² à¤•à¥ˆà¤²à¤•à¥à¤²à¥‡à¤¶à¤¨ à¤–à¤¤à¥à¤®à¥¤" : "The Sales Split feature is powerful. No more manual calculations for GST compliance." },
              { name: "Rajesh Agrawal", firm: "Agrawal & Co., Ambikapur", quote: isHindi ? "7-à¤¦à¤¿à¤¨ à¤•à¥‡ à¤Ÿà¥à¤°à¤¾à¤¯à¤² à¤®à¥‡à¤‚ 500 à¤‡à¤¨à¤µà¥‰à¤‡à¤¸ à¤ªà¥à¤°à¥‹à¤¸à¥‡à¤¸ à¤•à¤¿à¤à¥¤ 99% à¤¸à¤Ÿà¥€à¤•à¥¤" : "Processed 500 invoices during the 7-day trial. 99% accuracy on first try." },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-slate-200 p-8 rounded-[2.5rem]">
                <p className="text-slate-900 text-sm italic leading-relaxed mb-6">"{t.quote}"</p>
                <p className="text-slate-900 font-black text-xs uppercase tracking-widest">{t.name}</p>
                <p className="text-teal-500 text-[10px] font-bold uppercase tracking-widest">{t.firm}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER */}
      {/* ============================================================ */}
      <footer className="py-20 border-t border-slate-200 bg-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <Link href="/privacy" className="text-slate-700 text-[10px] font-bold uppercase tracking-widest hover:text-teal-600 transition-colors flex items-center gap-2">
              <Shield size={14} /> Privacy Policy
            </Link>
            <Link href="/refund" className="text-slate-900 text-[10px] font-bold uppercase tracking-widest hover:text-teal-500 transition-colors flex items-center gap-2">
              <RefreshCcw size={14} /> Refund Policy
            </Link>
            <Link href="/faq" className="text-slate-900 text-[10px] font-bold uppercase tracking-widest hover:text-teal-500 transition-colors flex items-center gap-2">
              <MessageCircleQuestion size={14} /> FAQ
            </Link>
            <Link href="/blog" className="text-slate-900 text-[10px] font-bold uppercase tracking-widest hover:text-teal-500 transition-colors flex items-center gap-2">
              <ArrowRight size={14} /> Blog
            </Link>
          </div>
              <div className="flex justify-center gap-8 mb-10 opacity-40 grayscale hover:opacity-100 transition-all duration-700">
                <Laptop size={24} /> <Database size={24} /> <Cpu size={24} /> <ShieldCheck size={24} />
              </div>
              <p className="text-slate-600 text-[10px] font-black tracking-[0.5em] uppercase italic">
                {isHindi ? "à¤²à¥‡à¤–à¤¾à¤«à¥à¤²à¥‹ AI | à¤­à¤¾à¤°à¤¤à¥€à¤¯ à¤²à¥‡à¤–à¤¾à¤‚à¤•à¤¨ à¤•à¤¾ à¤­à¤µà¤¿à¤·à¥à¤¯" : "LekhaFlow AI | Engineering the Future of Indian Accounting ðŸ‡®ðŸ‡³"}
              </p>
            </div>
          </footer>

      {/* ============================================================ */}
      {/* INTAKE MODAL */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showIntakeModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
            <motion.div initial={{scale:0.9, y:20}} animate={{scale:1, y:0}} className="bg-white border-2 border-teal-500 p-10 rounded-[3.5rem] max-w-md w-full relative shadow-2xl">
              <button onClick={() => setShowIntakeModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900"><X size={28}/></button>
              <form onSubmit={handleIntakeSubmit} className="space-y-6">
                <div className="text-center mb-10">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Access Portal</h3>
                  <p className="text-slate-900 text-[10px] font-bold uppercase tracking-widest mt-2">Get started with LekhaFlow Professional</p>
                </div>
                <input required placeholder="YOUR FULL NAME" className="w-full bg-slate-50 border border-slate-200 p-5 rounded-2xl text-slate-900 font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, clientName: e.target.value})}/>
                <input required placeholder="COMPANY NAME" className="w-full bg-slate-50 border border-slate-200 p-5 rounded-2xl text-slate-900 font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, companyName: e.target.value})}/>
                <input required placeholder="WHATSAPP NUMBER" className="w-full bg-slate-50 border border-slate-200 p-5 rounded-2xl text-slate-900 font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, mobileNumber: e.target.value})}/>
                <input required type="email" placeholder="EMAIL ADDRESS" className="w-full bg-slate-50 border border-slate-200 p-5 rounded-2xl text-slate-900 font-black text-xs outline-none focus:border-teal-500 transition-all uppercase tracking-widest" onChange={(e) => setClientForm({...clientForm, clientEmail: e.target.value})}/>
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
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] hidden md:flex items-center gap-4 bg-white/95 backdrop-blur-xl border border-slate-200 px-6 py-3 rounded-full shadow-2xl">
        <span className="text-slate-900 font-black text-xs uppercase tracking-widest">Ready to automate your Tally?</span>
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

