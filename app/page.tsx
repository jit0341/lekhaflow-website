"use client";

import React, { useState, useEffect } from "react";
import { 
  Zap, AlertCircle, Play, CheckCircle2, 
  Calculator, BarChart3, ShieldCheck, 
  User, MessageCircle, Phone, Mail, Download, Menu, X, ChevronDown, Monitor, Cpu, Info, FileText, Printer, Globe, ArrowRight, MousePointer2, FolderOutput, Database
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // ✅ FIXED: Missing import
import Contact from "@/components/contact";
import WhatsAppButton from "@/components/WhatsAppButton";

// --- Types ---
type Variant = "lite" | "standard" | "premium" | "gold" | "erp9_standard" | "erp9_premium";

export default function LekhaFlowLanding() {
  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Variant>("gold");
  const [quotationData, setQuotationData] = useState<any | null>(null);
  const [showIntakeModal, setShowIntakeModal] = useState<boolean>(false);
  const [intakeTarget, setIntakeTarget] = useState<"demo" | "quotation">("demo");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clientForm, setClientForm] = useState({ clientName: "", companyName: "", mobileNumber: "", clientEmail: "" });

  const [invoices, setInvoices] = useState(500);
  const [staffCost, setStaffCost] = useState(15000);

  useEffect(() => {
    document.title = "LekhaFlow | Premium Tally & BUSY Automation Platform";
  }, []);

  const WHATSAPP_LINK = "https://wa.me/918770808695";

  const downloadRoutes = {
    gold: "https://www.dropbox.com/scl/fi/tyv7sepqejvkvfn7mjvzq/Lekhaflow_Gold_setup.rar?dl=1",
    standard: "https://www.dropbox.com/scl/fi/8pqk5mvruopj1wzhmfi0d/Lekhaflow_Standard_setup.rar?dl=1",
    premium: "https://www.dropbox.com/scl/fi/i49mnsm6z2x97n3vivvs7/LekhaFlow_Premium_setup.rar?dl=1",
    lite: "https://www.dropbox.com/scl/fi/i49mnsm6z2x97n3vivvs7/LekhaFlow_LITE_setup.rar?dl=1",
    erp9_premium: "https://www.dropbox.com/scl/fi/3uby3jvlhd2gcqjwkbpo2/Lekhaflow_ERP9_Premium_setup.rar?dl=1",
    erp9_standard: "https://www.dropbox.com/scl/fi/kmd3tbus1feicyt9zr5lb/LekhaFlow_ERP9_Standard_setup.rar?dl=1"
  };

  const productData = {
    lite: { id: "lite", title: "Lite Edition", price: "15,000", limit: "2,000", tagline: isHindi ? "बेसिक एक्सेल मैपर" : "Basic Excel Mapper", razorpayUrl: "https://rzp.io/rzp/SkJTqlgi" },
    standard: { id: "standard", title: "Standard Sync", price: "25,000", limit: "5,000", tagline: isHindi ? "टैली प्राइम ऑटो एंट्री" : "Tally Prime Auto Entry", razorpayUrl: "https://rzp.io/rzp/oVwLNxHT" },
    premium: { id: "premium", title: "Premium Suite", price: "25,000", limit: "10,000", tagline: isHindi ? "प्रीमियम एआई इंजन" : "Premium AI Engine", razorpayUrl: "https://rzp.io/rzp/9HGERapH" },
    gold: { id: "gold", title: "Gold Advance", price: "30,000", limit: "Unlimited*", tagline: isHindi ? "सबसे उन्नत स्वचालन" : "Most Advanced Automation", razorpayUrl: "https://rzp.io/rzp/sQg7LGy" },
    erp9_standard: { id: "erp9_standard", title: "ERP9 Standard", price: "25,000", limit: "5,000", tagline: isHindi ? "लेगेसी सपोर्ट" : "Legacy Support", razorpayUrl: "https://rzp.io/rzp/AZMi622y" },
    erp9_premium: { id: "erp9_premium", title: "ERP9 Premium", price: "35,000", limit: "Unlimited*", tagline: isHindi ? "ERP9 एडवांस" : "ERP9 Advance", razorpayUrl: "https://rzp.io/rzp/BLZgsWB" }
  };

  const timeSaved = invoices * 3; 
  const moneySaved = Math.round((timeSaved / 60) * (staffCost / 160));
  const annualSavings = moneySaved * 12;

  const triggerIntake = (type: "demo" | "quotation") => {
    setIntakeTarget(type);
    setShowIntakeModal(true);
  };

  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowIntakeModal(false);
    window.open(downloadRoutes[activeTab], "_blank");
  };

  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

  return (
    <div className="bg-[#020617] text-slate-200 selection:bg-teal-500 selection:text-white overflow-x-hidden">
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] bg-[#020617]/80 backdrop-blur-md border-b border-slate-800 no-print">
        <div className={`${containerClass} flex justify-between items-center h-20`}>
          <div className="text-2xl font-black tracking-tighter text-white">LEKHA<span className="text-teal-500">FLOW</span></div>
          <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest">
            <a href="#features" className="hover:text-teal-400">Features</a>
            <a href="#process" className="hover:text-teal-400">Process</a>
            <a href="#pricing" className="hover:text-teal-400">Pricing</a>
            <button onClick={() => setIsHindi(!isHindi)} className="text-teal-500 border border-teal-500/30 px-2 py-1 rounded">
              {isHindi ? "ENGLISH" : "हिंदी"}
            </button>
            <button onClick={() => triggerIntake("demo")} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg">Request Demo</button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className={`${containerClass} grid lg:grid-cols-2 gap-16 items-center`}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
              Stop Repetitive <br />
              <span className="text-teal-500">Accounting Work</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium">Invoice → XML → Tally. Process any bill in seconds with 100% accuracy.</p>
            <div className="flex gap-4">
              <button onClick={() => triggerIntake("demo")} className="bg-white text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-teal-500 transition-all">Watch Demo</button>
              <button onClick={() => triggerIntake("demo")} className="bg-slate-900 border border-slate-700 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest">Download Trial</button>
            </div>
          </motion.div>
          <div className="relative aspect-video bg-slate-900 rounded-[3rem] border border-slate-700 overflow-hidden flex items-center justify-center group cursor-pointer">
            <Play fill="currentColor" size={40} className="text-teal-500 group-hover:scale-125 transition-transform" />
          </div>
        </div>
      </section>

      {/* ✅ NEW THE PROCESS SECTION (RENAMED PER REQUEST) */}
      <section id="process" className="py-24 bg-slate-900/20">
        <div className={`${containerClass}`}>
          <h2 className="text-center text-4xl md:text-6xl font-black text-white mb-20 uppercase tracking-tighter italic">THE PROCESS</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { s: "01", t: "GUI", d: "User-Friendly Interface", i: MousePointer2, color: "border-blue-500/20" },
              { s: "02", t: "UPLOAD THE INVOICE", d: "PDF / Image / Excel", i: Download, color: "border-teal-500/20" },
              { s: "03", t: "GENERATE", d: "AI Data Extraction", i: Zap, color: "border-amber-500/20" },
              { s: "04", t: "OUTPUT", d: "XML Files Ready", i: FolderOutput, color: "border-purple-500/20" },
              { s: "05", t: "IMPORT", d: "One-Click Tally Import", i: FileText, color: "border-emerald-500/20" },
              { s: "06", t: "THE ENTRY", d: "Voucher Created", i: Database, color: "border-blue-400/20" }
            ].map((w, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className={`bg-slate-900 border-2 ${w.color} p-6 rounded-[2rem] text-center flex flex-col items-center group transition-all`}
              >
                <div className="text-4xl font-black text-white/5 mb-4 group-hover:text-white/10">{w.s}</div>
                <w.i className="mb-4 text-teal-500" size={32} />
                <h4 className="text-xs font-black text-white mb-2 uppercase tracking-tighter">{w.t}</h4>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{w.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section className="py-24">
        <div className={`${containerClass}`}>
          <div className="bg-slate-900 border-2 border-slate-800 rounded-[4rem] p-10 lg:p-20">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic">ROI Calculator</h2>
                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">Invoices Per Month: <span className="text-white text-xl ml-2">{invoices}</span></label>
                    <input type="range" min="100" max="5000" step="100" value={invoices} onChange={(e) => setInvoices(parseInt(e.target.value))} className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">Monthly Staff Salary: <span className="text-white text-xl ml-2">₹{staffCost}</span></label>
                    <input type="range" min="8000" max="50000" step="1000" value={staffCost} onChange={(e) => setStaffCost(parseInt(e.target.value))} className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                  </div>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="bg-slate-950 p-10 rounded-3xl border border-slate-800 text-center">
                   <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Hours Saved / Month</p>
                   <p className="text-6xl font-black text-teal-500 tracking-tighter">{Math.round(timeSaved / 60)} Hrs</p>
                </div>
                <div className="bg-teal-500 p-10 rounded-3xl text-center text-black">
                   <p className="text-teal-900 text-[10px] font-black uppercase tracking-widest mb-2">Estimated Annual Savings</p>
                   <p className="text-6xl font-black tracking-tighter">₹{annualSavings.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ MEET THE FOUNDER SECTION (UPDATED WITH PHOTO) */}
      <section className="py-24 bg-slate-900/30">
        <div className={`${containerClass} max-w-5xl`}>
          <div className="bg-slate-950 border-2 border-slate-800 rounded-[4rem] p-10 lg:p-20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 blur-3xl -z-10 group-hover:bg-teal-500/10 transition-all"></div>
            <div className="grid lg:grid-cols-3 gap-16 items-center relative z-10">
              <div className="lg:col-span-1">
                 <div className="w-full aspect-[3/4] bg-slate-800 rounded-[3rem] border-4 border-teal-500/20 flex items-center justify-center shadow-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                    {/* ✅ Jitendra Bharti Photo Integration */}
                    <img 
                      src="/jitendra-bharti.jpg" 
                      alt="Jitendra Bharti - Founder LekhaFlow" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/400x500?text=Jitendra+Bharti";
                      }}
                    />
                 </div>
              </div>
              <div className="lg:col-span-2 space-y-8">
                 <div className="space-y-2">
                    <h2 className="text-5xl font-black text-white uppercase tracking-tighter">Meet The Founder</h2>
                    <h3 className="text-teal-500 font-black uppercase tracking-[0.3em] text-sm">Jitendra Bharti | <span className="text-slate-500">LekhaFlow AI Systems</span></h3>
                 </div>
                 <p className="text-xl text-slate-400 font-medium italic leading-relaxed">"10+ Years in automation experience. Helping Indian businesses eliminate repetitive accounting entry once and for all."</p>
                 <div className="bg-[#1e3a8a]/20 p-6 rounded-3xl border border-blue-500/20">
                    <p className="text-blue-400 font-black uppercase text-[10px] mb-2 tracking-widest">Our Vision</p>
                    <p className="text-white font-bold text-sm">100% Accuracy with Local Founder Support</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 border-t border-slate-900">
        <div className={`${containerClass}`}>
          <h2 className="text-center text-4xl font-black text-white mb-16 uppercase tracking-tighter italic">Select Your Edition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {Object.entries(productData).map(([key, p]) => (
              <div key={key} className={`bg-slate-950 border p-6 rounded-[2.5rem] flex flex-col justify-between transition-all group ${activeTab === key ? 'border-teal-500 ring-4 ring-teal-500/10 shadow-2xl' : 'border-slate-800'}`}>
                <div className="space-y-4">
                  <h3 className="text-white font-black text-xs uppercase tracking-widest">{p.title}</h3>
                  <div className="py-4 border-y border-slate-800">
                    <p className="text-teal-500 font-black text-2xl tracking-tighter">₹{p.price}</p>
                    <p className="text-[9px] text-slate-500 font-bold uppercase">{p.limit} Invoices/yr</p>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 italic">{p.tagline}</p>
                </div>
                <div className="mt-8 space-y-2">
                  <button onClick={() => triggerIntake("demo")} className="w-full py-3 bg-slate-900 border border-slate-800 rounded-xl text-[9px] font-black uppercase tracking-widest">Quotation</button>
                  <a href={p.razorpayUrl} target="_blank" className="block w-full py-3 bg-teal-500 text-black rounded-xl text-[9px] font-black uppercase tracking-widest text-center">Buy Now</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 border-t border-slate-900">
        <div className={`${containerClass} grid lg:grid-cols-2 gap-20`}>
           <div className="space-y-12">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[1.1]">Connect with our <br />Engineering Desk</h2>
              <div className="space-y-6">
                 <div className="flex items-center gap-6 bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-xl">
                    <Phone className="text-teal-500" />
                    <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Call Directly</p><p className="text-white font-black text-xl">+91 87708 08695</p></div>
                 </div>
              </div>
           </div>
           <div className="bg-white rounded-[3rem] p-2 shadow-2xl">
              <div className="bg-slate-950 border border-slate-200/10 rounded-[2.8rem] p-2 overflow-hidden"><Contact isHindi={isHindi} /></div>
           </div>
        </div>
      </section>

      <footer className="py-16 border-t border-slate-900 text-center uppercase">
        <p className="text-slate-500 text-[10px] font-black tracking-[0.5em]">Nexoriva Systems © 2026 | Built in India 🇮🇳</p>
      </footer>
      
      <WhatsAppButton />
    </div>
  );
}