"use client";
// Line 1 के बाद यह comment add करें
// Test: Webhook auto-deploy working
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { 
  Zap, AlertCircle, ArrowRight, Play, CheckCircle2, 
  Calculator, BarChart3, Users, ShieldCheck, HelpCircle, 
  User, MessageCircle, Phone, Mail, Download, Menu, X, ChevronDown, Monitor, Cpu, Plus, Minus, FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Contact from "@/components/contact";

// --- Types ---
type Variant = "lite" | "standard" | "gold" | "erp9_standard" | "erp9_premium";

export default function LekhaFlowLanding() {
  const [invoices, setInvoices] = useState(500);
  const [staffCost, setStaffCost] = useState(15000);
  const [activeTab, setActiveTab] = useState<Variant>("gold");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ROI Calculation
  const timeSaved = invoices * 3; // 3 mins saved per invoice in minutes
  const moneySaved = Math.round((timeSaved / 60) * (staffCost / 160)); // Avg 160 working hours
  const annualSavings = moneySaved * 12;

  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

  return (
    <div className="bg-slate-950 text-slate-200 selection:bg-teal-500 selection:text-white overflow-x-hidden">
      
      {/* 1. NAVIGATION - UPDATED WITH BLOG LINK */}
      <nav className="fixed top-0 w-full z-[100] bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className={`${containerClass} flex justify-between items-center h-20`}>
          <div className="text-2xl font-black tracking-tighter text-white">
            LEKHA<span className="text-teal-500">FLOW</span>
          </div>
          
          {/* Desktop Navigation - WITH BLOG LINK */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
            <a href="#features" className="hover:text-teal-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-teal-400 transition-colors">Process</a>
            {/* ✅ BLOG LINK ADDED */}
            <Link href="/blog" className="text-amber-500 hover:text-amber-400 transition-colors font-black">
              Insights
            </Link>
            <a href="#pricing" className="hover:text-teal-400 transition-colors text-teal-500">Pricing</a>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-teal-900/20">
              Request Demo
            </button>
          </div>

          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION (WITH SEO H1) */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-950 to-slate-950 -z-10"></div>
        
        <div className={`${containerClass} grid lg:grid-cols-2 gap-16 items-center`}>
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest">
              <Zap size={14} /> The Future of Indian GST Accounting
            </div>
            
            {/* H1 - PRIMARY SEO KEYWORD */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter">
              Stop Repetitive <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Accounting Work</span>
            </h1>
            
            {/* H2 - SECONDARY KEYWORD */}
            <h2 className="text-xl text-slate-400 font-medium max-w-xl">
              LekhaFlow: Invoice to XML to Tally Automation. Convert purchase invoices, sales bills, bank statements and GST data into Tally-Ready XML files in minutes. The fastest GST accounting automation software for MSMEs in India.
            </h2>
            
            <div className="grid grid-cols-2 gap-4 text-sm font-bold">
              {[
                "Save 80% Admin Time", 
                "100% Data Accuracy", 
                "Tally Prime Compatible", 
                "GST Compliant",
                "Local Installation", 
                "Direct Support"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-teal-500" /> {benefit}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-teal-500 transition-all active:scale-95">
                Watch Demo Video
              </button>
              <button className="bg-slate-900 border border-slate-700 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                Download Free Trial
              </button>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }} 
             animate={{ opacity: 1, scale: 1 }}
             className="relative"
          >
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-2 rounded-[2.5rem] shadow-2xl border border-slate-700">
              <div className="bg-slate-950 rounded-[2rem] overflow-hidden aspect-video flex items-center justify-center border border-slate-800">
                 <Monitor size={80} className="text-slate-800" />
                 <div className="absolute inset-0 bg-teal-500/5 hover:bg-transparent transition-colors cursor-pointer flex items-center justify-center group">
                    <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center text-slate-950 shadow-xl group-hover:scale-110 transition-transform">
                      <Play fill="currentColor" size={30} />
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. PAIN POINTS */}
      <section className="py-24 bg-slate-900/30">
        <div className={`${containerClass}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
              GST Accounting Problems Every MSME Faces
            </h2>
            <p className="text-slate-400 font-bold text-lg mt-4">Are you still doing manual data entry for Tally?</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Manual Invoice Entry", desc: "Spending hours typing data from invoices into Tally." },
              { title: "GST Reconciliation Errors", desc: "Small mistakes in accounting leading to major GST notice issues." },
              { title: "Month-End Accounting Stress", desc: "Working late nights to clear the accounting voucher backlog before GST filing." },
              { title: "GSTR-2B Matching Headache", desc: "Struggling to match GSTR-2B data with your purchase ledgers manually." },
              { title: "Bank Entry Manual Work", desc: "Manually posting hundreds of UPI, NEFT and bank reconciliation transactions." },
              { title: "Staff Accounting Dependency", desc: "Your accounting workflow stops when your data entry operator is on leave." }
            ].map((pain, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-red-500/50 transition-colors group">
                <AlertCircle className="text-red-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-xl font-black text-white mb-2">{pain.title}</h3>
                <p className="text-slate-400 font-medium">{pain.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-teal-600 to-blue-600 p-1 rounded-3xl">
            <div className="bg-slate-950 p-8 rounded-[1.4rem] text-center">
              <h3 className="text-2xl font-black text-white">
                ✨ LekhaFlow Automates Your Entire GST Accounting Workflow
              </h3>
              <p className="text-slate-400 mt-2">From Invoice → XML → Tally in just 10 seconds per bill</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" className="py-24">
        <div className={`${containerClass}`}>
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
              THE 5-STEP GST ACCOUNTING AUTOMATION PROCESS
            </h2>
            <p className="text-slate-400 font-medium mt-4">How LekhaFlow converts your invoices to Tally in minutes</p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10"></div>
            {[
              { step: "01", title: "Upload Invoices", desc: "Upload PDF, scanned images or Excel files" },
              { step: "02", title: "AI Reads Data", desc: "LekhaFlow AI extracts invoice data automatically" },
              { step: "03", title: "Generate XML", desc: "XML files created with GST-compliant format" },
              { step: "04", title: "Import to Tally", desc: "XML imported into Tally Prime or ERP9" },
              { step: "05", title: "Vouchers Ready", desc: "Complete accounting vouchers auto-created" }
            ].map((item, i) => (
              <div key={i} className="bg-slate-950 border-2 border-slate-800 p-6 rounded-3xl w-full max-w-[220px] text-center hover:border-teal-500 transition-all group">
                <div className="text-4xl font-black text-teal-500/20 group-hover:text-teal-500 mb-2 transition-colors">{item.step}</div>
                <h4 className="text-lg font-black text-white mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURES */}
      <section id="features" className="py-24 bg-slate-900/20">
        <div className={`${containerClass}`}>
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
               Complete GST Accounting Automation Features
             </h2>
             <p className="text-slate-400 font-medium mt-4">Everything you need for automated Tally entry</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: FileText, title: "Invoice Automation", color: "teal", items: ["Sales Invoice Processing", "Purchase Bill Processing", "Tally XML Generation", "Voucher Automation"] },
              { icon: BarChart3, title: "Bank Statement Reconciliation", color: "blue", items: ["Unlimited Bank Statements", "Automatic Ledger Mapping", "BUSY & Tally Support", "Smart Narration"] },
              { icon: ShieldCheck, title: "GST Intelligence & GSTR Reconciliation", color: "purple", items: ["GSTR-2B Matching", "Vendor Tax ID Matching", "Purchase Invoice Verification", "GST Compliance Reports"] },
              { icon: Cpu, title: "Advanced Voucher Creation", color: "amber", items: ["Rule Based Segmentation", "High Volume Processing", "Large Transaction Handling", "Custom Rules Engine"] },
              { icon: Download, title: "Dynamic Unit Support", color: "emerald", items: ["KGS, PCS, LTR, JAR", "CASE, BOX Support", "100+ Custom Units", "Full Customization"] },
              { icon: Zap, title: "Smart Rounding Engine", color: "pink", items: ["Positive Rounding", "Negative Rounding", "Ledger Auto-Balancing", "XML Validation"] }
            ].map((feature, i) => {
              const Icon = feature.icon;
              const colorMap = {
                teal: "teal",
                blue: "blue",
                purple: "purple",
                amber: "amber",
                emerald: "emerald",
                pink: "pink"
              };
              return (
                <div key={i} className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:bg-slate-900 transition-all">
                  <div className={`w-14 h-14 bg-${colorMap[feature.color as keyof typeof colorMap]}-500/10 rounded-2xl flex items-center justify-center text-${colorMap[feature.color as keyof typeof colorMap]}-500 mb-6`}>
                    <Icon size={30} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">{feature.title}</h3>
                  <ul className="space-y-3 text-slate-400 font-bold text-sm uppercase tracking-wide">
                    {feature.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <CheckCircle2 size={16} className={`text-${colorMap[feature.color as keyof typeof colorMap]}-500`} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. ROI CALCULATOR */}
      <section className="py-24">
        <div className={`${containerClass}`}>
          <div className="bg-slate-900 border-2 border-slate-800 rounded-[3rem] p-8 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
                  Calculate Your Annual Savings
                </h2>
                <p className="text-slate-400 font-bold text-lg uppercase tracking-widest">
                  See exactly how much time and money LekhaFlow accounting automation saves for your accounting firm.
                </p>
                
                <div className="space-y-8 mt-10">
                  <div className="space-y-4">
                    <label htmlFor="invoices-input" className="text-xs font-black text-teal-400 uppercase tracking-[0.2em]">
                      Monthly Invoices: <span className="text-white text-lg ml-2">{invoices}</span>
                    </label>
                    <input 
                      id="invoices-input"
                      type="range" 
                      min="100" 
                      max="5000" 
                      step="100" 
                      value={invoices} 
                      onChange={(e) => setInvoices(parseInt(e.target.value))} 
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                      aria-label="Number of invoices per month"
                    />
                  </div>
                  <div className="space-y-4">
                    <label htmlFor="salary-input" className="text-xs font-black text-teal-400 uppercase tracking-[0.2em]">
                      Monthly Staff Salary: <span className="text-white text-lg ml-2">₹{staffCost}</span>
                    </label>
                    <input 
                      id="salary-input"
                      type="range" 
                      min="8000" 
                      max="50000" 
                      step="1000" 
                      value={staffCost} 
                      onChange={(e) => setStaffCost(parseInt(e.target.value))} 
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                      aria-label="Monthly staff salary for accounting"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 text-center">
                   <div className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Hours Saved Per Month</div>
                   <div className="text-5xl font-black text-teal-500 tracking-tighter">{Math.round(timeSaved / 60)} Hrs</div>
                   <p className="text-slate-500 text-xs mt-2">That's {Math.round((timeSaved / 60) * 12)} hours saved annually!</p>
                </div>
                <div className="bg-teal-500 p-8 rounded-3xl text-center text-slate-950">
                   <div className="text-teal-900 text-xs font-black uppercase tracking-widest mb-2">Estimated Annual Savings</div>
                   <div className="text-5xl font-black tracking-tighter">₹{annualSavings.toLocaleString()}</div>
                   <p className="text-teal-900 text-xs mt-2">Plus reduced errors and compliance risk!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRICING */}
      <section id="pricing" className="py-24 bg-slate-900/30">
        <div className={`${containerClass}`}>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
              LekhaFlow Pricing Plans
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Choose the plan that fits your accounting firm's needs</p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px] grid grid-cols-6 bg-slate-900 border border-slate-800 rounded-3xl p-4">
               <div className="p-4 font-black text-slate-500 uppercase text-[10px]">Features</div>
               <div className="p-4 text-center font-black text-white">Lite Edition</div>
               <div className="p-4 text-center font-black text-white">Standard</div>
               <div className="p-4 text-center font-black text-teal-500">Gold (Popular)</div>
               <div className="p-4 text-center font-black text-white">ERP9 Std</div>
               <div className="p-4 text-center font-black text-white">ERP9 Premium</div>
                 
               <div className="p-4 border-t border-slate-800 text-xs font-bold uppercase">Annual Price</div>
               <div className="p-4 border-t border-slate-800 text-center font-black">₹10,000</div>
               <div className="p-4 border-t border-slate-800 text-center font-black">₹15,000</div>
               <div className="p-4 border-t border-slate-800 text-center font-black text-teal-500">₹18,000</div>
               <div className="p-4 border-t border-slate-800 text-center font-black">₹15,000</div>
               <div className="p-4 border-t border-slate-800 text-center font-black text-teal-500">₹18,000</div>

               <div className="p-4 border-t border-slate-800 text-xs font-bold uppercase">Best For</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px]">Tax Professionals</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px]">Accountants</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px] text-teal-400">Accounting Firms</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px]">ERP9 Legacy Users</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px]">ERP9 Advanced</div>

               <div className="p-4 border-t border-slate-800 text-xs font-bold uppercase">Invoice Limit</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px]">2,000/year</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px]">5,000/year</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px] text-teal-400">10,000/year</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px]">5,000/year</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px] text-teal-400">10,000/year</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHO SHOULD USE */}
      <section className="py-24">
        <div className={`${containerClass}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
              LekhaFlow for Your Business Type
            </h2>
            <p className="text-slate-400 font-medium mt-4">Perfect for Indian businesses using Tally or BUSY</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
             {[
               "Chartered Accountants",
               "Tax Consultants", 
               "Accounting Firms",
               "GST Practitioners",
               "Distributors",
               "Manufacturers",
               "Retail Chains",
               "Tally Prime Users",
               "BUSY ERP9 Users",
               "MSMEs"
             ].map(user => (
               <div key={user} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center hover:bg-teal-600 hover:text-slate-950 transition-all font-black text-xs uppercase tracking-tight">
                  {user}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 9. BEFORE VS AFTER */}
      <section className="py-24 bg-slate-900/40">
        <div className={`${containerClass}`}>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-red-500/5 border border-red-500/20 p-10 rounded-[3rem] space-y-6">
               <h3 className="text-2xl font-black text-red-500 uppercase tracking-widest">Without LekhaFlow</h3>
               <ul className="space-y-4 text-slate-400 font-bold uppercase text-xs tracking-widest">
                  <li>❌ Manual Ledger Posting</li>
                  <li>❌ Human Typing Errors</li>
                  <li>❌ Month-End GST Filing Stress</li>
                  <li>❌ 3+ Minutes per Invoice</li>
                  <li>❌ Staff Dependent Process</li>
                  <li>❌ High Compliance Risk</li>
               </ul>
            </div>
            <div className="bg-teal-500/10 border border-teal-500/30 p-10 rounded-[3rem] space-y-6 shadow-2xl shadow-teal-900/10">
               <h3 className="text-2xl font-black text-teal-500 uppercase tracking-widest">With LekhaFlow</h3>
               <ul className="space-y-4 text-white font-bold uppercase text-xs tracking-widest">
                  <li>✅ 100% Automatic XML Import</li>
                  <li>✅ 100% Accurate Data Entry</li>
                  <li>✅ GST Work Done in Minutes</li>
                  <li>✅ 10 Seconds per Invoice</li>
                  <li>✅ Completely Scalable</li>
                  <li>✅ Maximum Compliance Safety</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CONTACT */}
      <section id="contact" className="py-24 border-t border-slate-900">
        <div className={`${containerClass}`}>
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-8">
               <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
                 Request a GST Automation Demo
               </h2>
               <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
                 See how LekhaFlow can transform your accounting workflow. Get a personalized demo for your firm.
               </p>
               
               <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-teal-500/50 transition-all">
                     <Phone className="text-teal-500" size={28} /> 
                     <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Call Our Expert</div>
                        <div className="text-white font-black text-lg">+91 87708 08695</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all">
                     <Mail className="text-blue-500" size={28} /> 
                     <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Support</div>
                        <div className="text-white font-black">support@lekhaflow.in</div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-2 shadow-2xl">
               <div className="bg-slate-950 border border-slate-200/10 rounded-[2.2rem] p-1">
                   <Contact isHindi={false} />
               </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-900 text-center">
        <div className="space-y-4">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">
            LekhaFlow AI Systems © 2026 | GST Accounting Automation for India
          </p>
          <p className="text-slate-600 text-xs font-medium">
            Built for Chartered Accountants, Tax Professionals & Accounting Firms using Tally Prime & BUSY ERP9
          </p>
        </div>
      </footer>

      {/* STICKY WHATSAPP */}
      <a 
        href="https://wa.me/918770808695" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[200] bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center gap-2"
        aria-label="Chat with LekhaFlow on WhatsApp"
      >
        <MessageCircle size={24} />
        <span className="hidden md:inline font-black uppercase text-xs tracking-widest">WhatsApp</span>
      </a>

    </div>
  );
}
