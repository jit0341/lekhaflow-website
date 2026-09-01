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
import WhatsAppButton from '@/components/WhatsAppButton';
import TimedLeadPopup from '@/components/TimedLeadPopup';
import PaymentModal from "@/components/PaymentModal";

export default function LekhaFlowLanding() {
const [isHindi, setIsHindi] = useState<boolean>(false);

useEffect(() => {
const saved = window.localStorage.getItem("lekhaflow-language");

if (saved === "hi") {
setIsHindi(false);
}

const handleLanguageChange = (event: Event) => {
const customEvent = event as CustomEvent<boolean>;
setIsHindi(false);
};

window.addEventListener(
"lekhaflow-language-change",
handleLanguageChange
);

return () => {
window.removeEventListener(
"lekhaflow-language-change",
handleLanguageChange
);
};
}, []);
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

// FIX: openPayment function
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
tagline: false ? "MSME AI " : "Essential AI Automation for MSMEs",
features: [
false ? " -> ()" : "Bank Statement -> Tally (Unlimited)",
false ? "PDF / -> " : "PDF / Image Invoice -> Tally",
false ? " " : "Excel True Copy Export",
false ? " " : "Auto Ledger & Stock Creation",
false ? "10,000, 30,000 50,000 " : "Sales Split Below 10,000, 30,000 or 50,000",
false ? " " : "Email Support"
],
color: "border-teal-500",
accent: "text-teal-600"
}
};

const t = {
hero: {
badge: false ? "AI -> " : "AI-POWERED ACCOUNTING AUTOMATION -> TALLY",
title: false ? (
<> <span className="text-teal-500 italic">AI- </span></>
) : (
<>AI-Powered Accounting Automation <span className="text-teal-500 italic">for Tally</span></>
),
desc: isHindi
? " , AI , Tally "
: "Automate Purchase & Sales Invoices, Bank Statements and Accounting Documents - then review the results and send them to Tally.",
sub: isHindi
? " "
: " Client data stays on your system. Automatically split sales totals into multiple vouchers. No cloud storage."
},
trust: [
{ i: Cpu, t: false ? "AI " : "AI-Powered Automation", d: false ? ", PDF " : "Process invoices, bank statements and accounting documents with AI.", c: "text-purple-500" },
{ i: ShieldCheck, t: false ? " " : "Client-Side Data Control", d: false ? " " : "Designed around client-side processing and data control.", c: "text-teal-500" },
{ i: Target, t: false ? " " : "Review Before Tally", d: false ? "AI , , Tally " : "AI prepares. You review. Then send the final entries to Tally.", c: "text-blue-500" },
{ i: Zap, t: false ? " " : "Sales Split Advantage", d: false ? " " : "Automatically split a sales total into multiple vouchers.", c: "text-amber-500" }
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
{/* HERO SECTION - Balanced Font Sizes + All Features */}
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
{/* SALES SPLIT FEATURE - UNIQUE USP */}
{/* ============================================================ */}
<SalesSplitSection
isHindi={isHindi}
containerClass={containerClass}
/>

{/* ============================================================ */}
{/* SwiftAssign AI Ledger Assignment */}
{/* ============================================================ */}
<section className="py-24 bg-slate-50 border-y border-slate-200">
<div className={containerClass}>
<div className="text-center mb-16">
<div className="inline-block mb-4 px-5 py-2 bg-purple-100 border border-purple-300 rounded-full">
<p className="text-purple-700 text-[10px] font-black uppercase tracking-[0.4em]">
AI-POWERED AUTOMATION
</p>
</div>
<h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
SwiftAssign <span className="text-purple-600">AI Ledger Assignment</span>
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
Similar transactions are automatically grouped together - UPI, NEFT, IMPS, ATM all get detected
</p>
</div>

<div className="bg-white border border-purple-500/20 p-8 rounded-[2.5rem] hover:border-purple-500/50 transition-all text-center">
<div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
<Zap className="text-purple-500" size={28} />
</div>
<h3 className="text-slate-900 font-black uppercase text-sm mb-3">Bulk Assignment</h3>
<p className="text-slate-900 text-xs leading-relaxed">
Assign ledgers to all transactions in one click - with 100% accuracy
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
{/* WHY LEKHAFLOW - Enhanced Trust Section */}
{/* ============================================================ */}
<WhyLekhaFlowSection
isHindi={isHindi}
containerClass={containerClass}
/>

{/* ============================================================ */}
{/* PRIVACY SECTION - Stronger + More Prominent */}
{/* ============================================================ */}
<section className="py-20 bg-slate-50 border-y-2 border-teal-500/20">
<div className={containerClass}>
<div className="max-w-4xl mx-auto text-center">
<div className="inline-flex items-center gap-2 px-5 py-2 bg-teal-100 border border-teal-300 rounded-full mb-6">
<Lock className="text-teal-500" size={16} />
<span className="text-teal-700 text-[10px] font-black uppercase tracking-[0.3em]">
{false ? " - " : " PRIVACY-FIRST DESIGN"}
</span>
</div>
<h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-6">
{false ? " , " : " Client's Data. Client's own control."}
</h2>
<p className="text-slate-900 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8">
{isHindi
? "LekhaFlow workflow client-side processing data control "
: "LekhaFlow is built for professionals who handle confidential accounting data. The workflow is designed around client-side processing and keeping control of sensitive accounting information with the client environment."}
</p>

{/* Privacy Bullet Points */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
<div className="bg-white/50 border border-slate-200 p-6 rounded-2xl flex items-start gap-4">
<Shield className="text-teal-500 flex-shrink-0 mt-1" size={20} />
<div>
<p className="text-slate-900 font-black text-xs uppercase tracking-widest">
{false ? " " : "No Cloud Storage"}
</p>
<p className="text-slate-900 text-[10px] leading-relaxed">
{false ? " " : "Data never leaves your system"}
</p>
</div>
</div>
<div className="bg-white/50 border border-slate-200 p-6 rounded-2xl flex items-start gap-4">
<Eye className="text-teal-500 flex-shrink-0 mt-1" size={20} />
<div>
<p className="text-slate-900 font-black text-xs uppercase tracking-widest">
{false ? " " : "Full Control"}
</p>
<p className="text-slate-900 text-[10px] leading-relaxed">
{false ? " " : "You decide who accesses what"}
</p>
</div>
</div>
<div className="bg-white/50 border border-slate-200 p-6 rounded-2xl flex items-start gap-4">
<BadgeCheck className="text-teal-500 flex-shrink-0 mt-1" size={20} />
<div>
<p className="text-slate-900 font-black text-xs uppercase tracking-widest">
{false ? "CAs " : "Built for CAs"}
</p>
<p className="text-slate-900 text-[10px] leading-relaxed">
{false ? " " : "Privacy is a professional responsibility"}
</p>
</div>
</div>
</div>
</div>
</div>
</section>

{/* ============================================================ */}
{/* USE CASES SECTION - Who Is It For */}
{/* ============================================================ */}
<section className="py-24 bg-slate-50 border-y border-slate-200">
<div className={containerClass}>
<div className="text-center mb-16">
<div className="inline-block mb-4 px-5 py-2 bg-teal-100 border border-teal-300 rounded-full">
<p className="text-teal-700 text-[10px] font-black uppercase tracking-[0.4em]">
{false ? " " : " WHO IS IT FOR"}
</p>
</div>
<h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
{false ? " " : "Who Is LekhaFlow For?"}
</h2>
</div>

<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
{/* Tally Users */}
<div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] hover:border-teal-500/30 transition-all text-center">
<div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
<Users className="text-blue-500" size={28} />
</div>
<h3 className="text-slate-900 font-black uppercase text-sm mb-3">
{false ? " " : "Tally Users"}
</h3>
<p className="text-slate-900 text-xs leading-relaxed">
{isHindi
? " , "
: "Speed up daily voucher entry. Bank statements, invoices, all in one place."}
</p>
</div>

{/* CA Firms */}
<div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] hover:border-teal-500/30 transition-all text-center">
<div className="w-16 h-16 mx-auto bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6">
<Building2 className="text-teal-500" size={28} />
</div>
<h3 className="text-slate-900 font-black uppercase text-sm mb-3">
{false ? "CA " : "CA Firms"}
</h3>
<p className="text-slate-900 text-xs leading-relaxed">
{isHindi
? " "
: "Maintain client data confidentiality. Automation with control."}
</p>
</div>

{/* Tax Consultants */}
<div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] hover:border-teal-500/30 transition-all text-center">
<div className="w-16 h-16 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
<FileText className="text-amber-500" size={28} />
</div>
<h3 className="text-slate-900 font-black uppercase text-sm mb-3">
{false ? " " : "Tax Consultants"}
</h3>
<p className="text-slate-900 text-xs leading-relaxed">
{isHindi
? "GST , , - "
: "GST reconciliation, invoice processing, sales split - all in one tool."}
</p>
</div>
</div>
</div>
</section>

{/* ============================================================ */}
{/* TRUST BADGES - Service Providers */}
{/* ============================================================ */}
<section className="py-12 bg-white border-y border-slate-200">
<div className={containerClass}>
<p className="text-slate-900 text-[10px] font-black uppercase tracking-[0.5em] text-center mb-8">
{false ? " " : "WORKS WITH"}
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
{/* SOCIAL PROOF - Recent Activity */}
{/* ============================================================ */}
<section className="py-12 bg-white border-y border-slate-200">
<div className={containerClass}>
<p className="text-slate-900 text-[10px] font-black uppercase tracking-[0.5em] text-center mb-6">
{false ? " " : "RECENTLY DOWNLOADED"}
</p>
<div className="flex flex-wrap justify-center gap-6 text-slate-900 text-[10px] font-bold uppercase tracking-widest">
<span className="flex items-center gap-2">
<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
CA Firm, Delhi - 15 mins ago
</span>
<span className="flex items-center gap-2">
<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
Tax Consultant, Mumbai - 1 hour ago
</span>
<span className="flex items-center gap-2">
<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
Tally User, Raipur - 3 hours ago
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
{false ? "4 " : "4 SIMPLE STEPS"}
</p>
</div>
<h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
{false ? " " : "How LekhaFlow Works"}
</h2>
<p className="text-slate-900 font-bold uppercase tracking-widest text-xs max-w-xl mx-auto">
{isHindi
? ", AI - Tally "
: "From invoices and bank statements to accounting entries - AI processes the work, you review it, then send it to Tally."}
</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
{[
{ num: "01", icon: FileText, title: false ? "PDF " : "Upload Bank Statement", desc: false ? " PDF " : "Select your bank statement PDF. The software auto-detects the bank format." },
{ num: "02", icon: Cpu, title: false ? "AI " : "AI Reads & Categorizes", desc: false ? "AI - , , / " : "AI reads every transaction, understands narration, and classifies Dr/Cr automatically." },
{ num: "03", icon: Landmark, title: false ? " " : "Review in Smart Grid", desc: false ? " - / -" : "All transactions appear in a clean grid. Opening/closing balance auto-validated." },
{ num: "04", icon: Send, title: false ? "- " : "One-Click to Tally", desc: false ? "'Send to Tally' " : "Hit 'Send to Tally'. All vouchers are created directly in your Tally - no XML import needed." },
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
? " workflow Purchase Invoices, Sales Invoices, Bank Statements Sales Split "
: "The same workflow extends across Purchase Invoices, Sales Invoices, Bank Statements and Sales Split."}
</p>
<div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-amber-500/30 rounded-2xl">
<Sparkles size={16} className="text-amber-500" />
<span className="text-slate-900 text-xs font-bold uppercase tracking-widest">
{false ? " : 75,000 -> 2 (40K + 35K) " : " Sales Split: 75,000 Invoice -> 2 Vouchers (40K + 35K) Automatic"}
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
{false ? " " : "How the Free Demo Works"}
</h2>
<p className="text-slate-900 font-bold uppercase tracking-widest text-xs">
{false ? " " : "No payment. No credit card required."}
</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
{[
{ num: "01", title: false ? " " : "Download", desc: false ? "7- " : "Download the 7-day trial setup file (Windows 10/11)." },
{ num: "02", title: false ? " " : "Install", desc: false ? " " : "Install the software. Copy the Machine Hardware ID displayed." },
{ num: "03", title: false ? " " : "Contact Us", desc: false ? " 2 " : "Send the ID on WhatsApp. We send your trial license within 2 hours." },
{ num: "04", title: false ? " " : "See It in Tally", desc: false ? " " : "Watch your bank statements and invoices flow into Tally automatically." },
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
? " ? '' "
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
{/* GSTR-2B COMING SOON BANNER */}
{/* ============================================================ */}
<section className="py-16 bg-blue-50 border-y border-blue-500/20">
<div className={containerClass}>
<div className="max-w-4xl mx-auto text-center">
<div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-100 border border-blue-300 rounded-full mb-4">
<Sparkles className="text-blue-400" size={16} />
<span className="text-blue-700 text-[10px] font-black uppercase tracking-[0.3em]">
{false ? " " : " COMING SOON"}
</span>
</div>
<h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-tighter">
{false ? "GSTR-2B " : "GSTR-2B Reconciliation"}
</h3>
<p className="text-slate-900 text-sm max-w-2xl mx-auto mt-3">
{isHindi
? " GSTR-2B - "
: "Auto-match purchase invoices with GSTR-2B. Identify mismatches easily. Coming in the next update."}
</p>
<div className="mt-4 flex justify-center gap-4">
<span className="text-slate-900 text-[10px] font-bold uppercase tracking-widest border border-slate-200 px-4 py-2 rounded-full">
{false ? " " : " Purchase Invoices"}
</span>
<span className="text-slate-900 text-[10px] font-bold uppercase tracking-widest border border-slate-200 px-4 py-2 rounded-full">
{false ? " GSTR-2B " : " GSTR-2B Matching"}
</span>
<span className="text-slate-900 text-[10px] font-bold uppercase tracking-widest border border-slate-200 px-4 py-2 rounded-full">
{false ? " " : " Mismatch Detection"}
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
{false ? " " : "The Financial Impact of"} <span className="text-teal-500">{false ? "" : "Automation"}</span>
</h2>
<div className="space-y-10">
<div className="space-y-4">
<label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">
{false ? " / " : "Average Invoices / Month"}: {invoices}
</label>
<input type="range" min="100" max="5000" step="100" value={invoices} onChange={(e) => setInvoices(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500" />
</div>
<div className="space-y-4">
<label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">
{false ? " " : "Current Staff Salary"}: {staffCost}
</label>
<input type="range" min="8000" max="50000" step="1000" value={staffCost} onChange={(e) => setStaffCost(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500" />
</div>
</div>
</div>
<div className="grid gap-6">
<div className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-200 text-center">
<p className="text-slate-900 text-[10px] font-black uppercase tracking-[0.3em] mb-3">
{false ? " " : "Reclaim Your Time"}
</p>
<p className="text-6xl font-black text-teal-500 tracking-tighter">{Math.round(timeSavedValue / 60)} <span className="text-2xl text-slate-900">Hrs/Mo</span></p>
</div>
<div className="bg-teal-500 p-12 rounded-[2.5rem] text-black shadow-xl text-center">
<p className="text-teal-900 text-[10px] font-black uppercase tracking-[0.3em] mb-3">
{false ? " " : "Annual Operational Savings"}
</p>
<p className="text-6xl font-black tracking-tighter">{annualSavingsValue.toLocaleString()}</p>
</div>
</div>
</div>
</div>
</section>

{/* ============================================================ */}
{/* FAQ SECTION - Dedicated */}
{/* ============================================================ */}
<section className="py-24 bg-slate-50 border-y border-slate-200">
<div className={containerClass}>
<div className="text-center mb-16">
<h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
{false ? " " : "Frequently Asked Questions"}
</h2>
<p className="text-slate-900 font-bold uppercase tracking-widest text-xs">
{false ? " " : "Answers you need"}
</p>
</div>

<div className="max-w-3xl mx-auto space-y-4">
{[
{
q: false ? " LekhaFlow - ?" : "Is LekhaFlow cloud-based?",
a: isHindi
? " LekhaFlow "
: "No. LekhaFlow is desktop software. Your data stays on your computer. No data goes to our servers."
},
{
q: false ? " ?" : "Does it work offline?",
a: isHindi
? " "
: "Yes. No internet required after download. You can work offline."
},
{
q: false ? " Tally versions ?" : "Which Tally versions are supported?",
a: isHindi
? "Tally Prime, Tally ERP 9, "
: "Supports Tally Prime, Tally ERP 9, and all recent versions."
},
{
q: false ? "GSTR-2B ?" : "When will GSTR-2B reconciliation come?",
a: isHindi
? "GSTR-2B "
: "GSTR-2B reconciliation is coming in the next update. We're working on it."
},
{
q: false ? " ?" : "Can I try before buying?",
a: isHindi
? " 7- "
: "Yes. Download the 7-day free trial and test it with your own data."
},
].map((faq, i) => (
<details key={i} className="group bg-white border border-slate-200 rounded-2xl transition-all hover:border-teal-500/30">
<summary className="flex justify-between items-center p-6 cursor-pointer">
<span className="text-slate-900 font-black text-sm uppercase tracking-widest">{faq.q}</span>
<span className="text-teal-500 group-open:rotate-180 transition-transform"></span>
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
{false ? " " : "Commitment to Accuracy"}
</h3>
<p className="text-slate-900 italic text-sm leading-relaxed mb-4">
{isHindi
? " 100% "
: "Our mission is to empower the Indian accounting community by reducing the clerical burden. We are targeting a processing cost with 100% data integrity."}
</p>
<p className="text-teal-500 font-bold text-[10px] uppercase tracking-[0.2em]">
{false ? " - , " : "Jitendra Bharti - Founder, LekhaFlow"}
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
{false ? " " : "Independence Day Launch Offer"}
</p>
</div>
<h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
{false ? " " : "Professional Licenses"}
</h2>
<p className="text-slate-900 font-bold uppercase tracking-widest text-xs mb-2">
{false ? " 50 " : "Special pricing for first 50 clients only"}
</p>
<p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">
{false ? "31 2026 " : "Valid till 31st August 2026"}
</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-1 gap-10 max-w-3xl mx-auto">
{Object.entries(productData).filter(([key]) => key === 'standard').map(([key, p]) => (
<div key={key} className={`bg-white border-2 ${p.color} p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between group max-w-lg mx-auto w-full`}>
<div className="absolute top-0 right-0 bg-amber-500 text-black px-6 py-1 text-[9px] font-black uppercase tracking-widest">
{false ? " " : "Most Popular"}
</div>
<div className="space-y-6">
<h3 className="text-slate-900 font-black text-xs uppercase tracking-[0.3em]">{p.title}</h3>
<div className="py-8 border-y border-slate-200">
<p className={`text-slate-900 font-black text-2xl tracking-tighter mb-1 line-through`}>{p.originalPrice}</p>
<p className={`${p.accent} font-black text-6xl tracking-tighter mb-2`}>{p.offerPrice}</p>
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
{false ? "" : "Buy Now"} - {p.offerPrice}
</button>
<Link href="/downloads" className="block w-full py-5 bg-slate-100 text-slate-900 rounded-2xl font-black uppercase text-[10px] text-center tracking-widest border border-slate-200 hover:border-slate-600 transition-all">
{false ? " " : "Download Setup"}
</Link>
</div>
</div>
))}
</div>

<div className="text-center mt-12 max-w-2xl mx-auto">
<p className="text-slate-900 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
{isHindi
? " 50 lifetime 1 11999 "
: "First 50 clients lock this price for life. From 1st Sept, price becomes 11,999."}
</p>
</div>

<p className="text-center mt-6 text-slate-900 text-[10px] font-bold uppercase tracking-widest">
{false ? "7- - " : "7-Day Money-Back Guarantee - Not satisfied? Full refund"}
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
{false ? " " : "What Accountants Say"}
</h2>
</div>
<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
{[
{ name: "CA Rahul Sharma", firm: "Sharma & Associates, Raipur", quote: false ? " 3 " : "Bank statement entry that used to take 3 hours now finishes in 10 minutes." },
{ name: "Priya Gupta", firm: "Gupta Tax Consultants, Bilaspur", quote: false ? " " : "The Sales Split feature is powerful. No more manual calculations for GST compliance." },
{ name: "Rajesh Agrawal", firm: "Agrawal & Co., Ambikapur", quote: false ? "7- 500 99% " : "Processed 500 invoices during the 7-day trial. 99% accuracy on first try." },
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
{false ? " AI | " : "LekhaFlow AI | Engineering the Future of Indian Accounting "}
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

