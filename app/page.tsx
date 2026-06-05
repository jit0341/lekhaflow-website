"use client";

import React, { useState, useEffect } from "react";

import { 
  Zap, AlertCircle, ArrowRight, Play, CheckCircle2, 
  Calculator, BarChart3, Users, ShieldCheck, HelpCircle, 
  User, MessageCircle, Phone, Mail, Download, Menu, X, ChevronDown, Monitor, Cpu, Plus, Minus
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
      
      {/* 1. NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className={`${containerClass} flex justify-between items-center h-20`}>
          <div className="text-2xl font-black tracking-tighter text-white">
            LEKHA<span className="text-teal-500">FLOW</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
            <a href="#features" className="hover:text-teal-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-teal-400 transition-colors">Process</a>
            <a href="#pricing" className="hover:text-teal-400 transition-colors text-teal-500">Pricing</a>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-teal-900/20">
              Request Consultation
            </button>
          </div>

          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-950 to-slate-950 -z-10"></div>
        
        <div className={`${containerClass} grid lg:grid-cols-2 gap-16 items-center`}>
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest">
              <Zap size={14} /> The Future of Indian Accounting
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter">
              Stop Repetitive <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Accounting Work</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium max-w-xl">
              Invoice → XML → Tally. Convert Purchase, Sales, Bank Statements and GST Data into Tally-Ready files in minutes.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-sm font-bold">
              {["Save Hundreds of Hours", "Reduce Data Entry", "Improve Accuracy", "Tally Compatible XML", "Local Installation", "Peace of Mind"].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-teal-500" /> {benefit}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-teal-500 transition-all active:scale-95">
                Watch Demo
              </button>
              <button className="bg-slate-900 border border-slate-700 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                Download Trial
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
                 {/* Product Screenshot / Video Placeholder */}
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

      {/* 2. PAIN POINTS */}
      <section className="py-24 bg-slate-900/30">
        <div className={`${containerClass}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">Are You Facing These Problems?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Manual Invoice Entry", desc: "Spending hours typing data from paper to screen." },
              { title: "Data Entry Errors", desc: "Small mistakes leading to major GST reconciliation issues." },
              { title: "Month-End Pressure", desc: "Working late nights to clear the voucher backlog." },
              { title: "GST Reconciliation", desc: "Struggling to match GSTR-2B with purchase ledgers." },
              { title: "Bank Entry Workload", desc: "Manually posting hundreds of UPI and bank transactions." },
              { title: "Staff Dependency", desc: "Business stops when your data entry operator is on leave." }
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
              <h3 className="text-2xl font-black text-white">LekhaFlow Automates The Entire Workflow</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section id="how-it-works" className="py-24">
        <div className={`${containerClass}`}>
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">THE SIMPLE 5-STEP FLOW</h2>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10"></div>
            {[
              { step: "01", title: "Upload", desc: "Invoices, PDFs or Excel" },
              { step: "02", title: "Read", desc: "LekhaFlow reads data" },
              { step: "03", title: "Generate", desc: "XML created automatically" },
              { step: "04", title: "Import", desc: "Into Tally Prime / ERP9" },
              { step: "05", title: "Done", desc: "Vouchers Created" }
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

      {/* 5. WHAT LEKHAFLOW CAN DO */}
      <section id="features" className="py-24 bg-slate-900/20">
        <div className={`${containerClass}`}>
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">Comprehensive Automation</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:bg-slate-900 transition-all">
              <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-500 mb-6">
                <FileText size={30} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Invoice Automation</h3>
              <ul className="space-y-3 text-slate-400 font-bold text-sm uppercase tracking-wide">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-teal-500" /> Sales Processing</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-teal-500" /> Purchase Processing</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-teal-500" /> XML Generation</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-teal-500" /> Voucher Automation</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:bg-slate-900 transition-all">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                <BarChart3 size={30} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Bank Statement</h3>
              <ul className="space-y-3 text-slate-400 font-bold text-sm uppercase tracking-wide">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500" /> Unlimited Statements</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500" /> Auto Mapping</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500" /> BUSY & Tally Support</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500" /> Accurate Narration</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:bg-slate-900 transition-all">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 mb-6">
                <ShieldCheck size={30} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">GST Intelligence</h3>
              <ul className="space-y-3 text-slate-400 font-bold text-sm uppercase tracking-wide">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purple-500" /> GSTR-2B Reconciliation</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purple-500" /> Vendor Matching</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purple-500" /> Purchase Verification</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purple-500" /> GST Visibility</li>
              </ul>
            </div>

            {/* Card 4 - Advanced Voucher */}
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:bg-slate-900 transition-all">
              <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6">
                <Cpu size={30} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Advanced Voucher</h3>
              <ul className="space-y-3 text-slate-400 font-bold text-sm uppercase tracking-wide">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500" /> Rule Based Segmentation</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500" /> High Volume Processing</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500" /> Large Transaction Handling</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500" /> Configurable Rules</li>
              </ul>
            </div>

             {/* Card 5 - Units */}
             <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:bg-slate-900 transition-all">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
                <Download size={30} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Dynamic Units</h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {["KGS", "PCS", "LTR", "JAR", "CASE", "BOX"].map(unit => (
                  <span key={unit} className="px-3 py-1 bg-slate-800 rounded-lg text-[10px] font-black text-slate-300 border border-slate-700">{unit}</span>
                ))}
              </div>
              <p className="mt-4 text-slate-500 font-bold text-xs uppercase tracking-widest">+ Custom Unit Support</p>
            </div>

            {/* Card 6 - Rounding */}
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:bg-slate-900 transition-all">
              <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500 mb-6">
                <Zap size={30} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Rounding Engine</h3>
              <ul className="space-y-3 text-slate-400 font-bold text-sm uppercase tracking-wide">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-500" /> Positive Rounding</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-500" /> Negative Rounding</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-500" /> Ledger Balancing</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-pink-500" /> XML Validation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ROI CALCULATOR */}
      <section className="py-24">
        <div className={`${containerClass}`}>
          <div className="bg-slate-900 border-2 border-slate-800 rounded-[3rem] p-8 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">Calculate Your Savings</h2>
                <p className="text-slate-400 font-bold text-lg uppercase tracking-widest">See how much time and money LekhaFlow saves for your firm.</p>
                
                <div className="space-y-8 mt-10">
                  <div className="space-y-4">
                    <label className="text-xs font-black text-teal-400 uppercase tracking-[0.2em]">Invoices Per Month: <span className="text-white text-lg ml-2">{invoices}</span></label>
                    <input type="range" min="100" max="5000" step="100" value={invoices} onChange={(e) => setInvoices(parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-black text-teal-400 uppercase tracking-[0.2em]">Monthly Staff Salary: <span className="text-white text-lg ml-2">₹{staffCost}</span></label>
                    <input type="range" min="8000" max="50000" step="1000" value={staffCost} onChange={(e) => setStaffCost(parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 text-center">
                   <div className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Hours Saved / Month</div>
                   <div className="text-5xl font-black text-teal-500 tracking-tighter">{Math.round(timeSaved / 60)} Hrs</div>
                </div>
                <div className="bg-teal-500 p-8 rounded-3xl text-center text-slate-950">
                   <div className="text-teal-900 text-xs font-black uppercase tracking-widest mb-2">Estimated Annual Savings</div>
                   <div className="text-5xl font-black tracking-tighter">₹{annualSavings.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRODUCT COMPARISON */}
      <section id="pricing" className="py-24 bg-slate-900/30">
        <div className={`${containerClass}`}>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">Product Comparison</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Choose the best fit for your workflow</p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px] grid grid-cols-6 bg-slate-900 border border-slate-800 rounded-3xl p-4">
               {/* Table Header */}
               <div className="p-4 font-black text-slate-500 uppercase text-[10px]">Specifications</div>
               <div className="p-4 text-center font-black text-white">Lite</div>
               <div className="p-4 text-center font-black text-white">Standard</div>
               <div className="p-4 text-center font-black text-teal-500">Gold</div>
               <div className="p-4 text-center font-black text-white">ERP9 Std</div>
               <div className="p-4 text-center font-black text-white">ERP9 Prem</div>

               {/* Rows */}
               <div className="p-4 border-t border-slate-800 text-xs font-bold uppercase">Annual Price</div>
               <div className="p-4 border-t border-slate-800 text-center font-black">₹10,000</div>
               <div className="p-4 border-t border-slate-800 text-center font-black">₹15,000</div>
               <div className="p-4 border-t border-slate-800 text-center font-black text-teal-500">₹18,000</div>
               <div className="p-4 border-t border-slate-800 text-center font-black">₹15,000</div>
               <div className="p-4 border-t border-slate-800 text-center font-black text-teal-500">₹18,000</div>

               <div className="p-4 border-t border-slate-800 text-xs font-bold uppercase">Target User</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px]">Tax Pros</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px]">Accountants</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px] text-teal-400">Large Firms</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px]">ERP9 Legacy</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px]">ERP9 Premium</div>

               <div className="p-4 border-t border-slate-800 text-xs font-bold uppercase">Invoice Limit</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px]">2,000/yr</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px]">5,000/yr</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px] text-teal-400">10,000/yr</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px]">5,000/yr</div>
               <div className="p-4 border-t border-slate-800 text-center text-[10px] text-teal-400">10,000/yr</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHO SHOULD USE */}
      <section className="py-24">
        <div className={`${containerClass}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">Who is it for?</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
             {["Chartered Accountants", "Tax Consultants", "Accounting Firms", "Distributors", "Manufacturers", "Retail Chains", "GST Practitioners", "Tally Users", "BUSY Users"].map(user => (
               <div key={user} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center hover:bg-teal-600 hover:text-slate-950 transition-all font-black text-xs uppercase tracking-widest">
                  {user}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 10. BEFORE VS AFTER */}
      <section className="py-24 bg-slate-900/40">
        <div className={`${containerClass}`}>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-red-500/5 border border-red-500/20 p-10 rounded-[3rem] space-y-6">
               <h3 className="text-2xl font-black text-red-500 uppercase tracking-widest">Before LekhaFlow</h3>
               <ul className="space-y-4 text-slate-400 font-bold uppercase text-xs tracking-widest">
                  <li>❌ Manual Ledger Posting</li>
                  <li>❌ Human Typing Errors</li>
                  <li>❌ Month-End Stress</li>
                  <li>❌ 3 Minutes per Invoice</li>
                  <li>❌ Staff Dependent</li>
               </ul>
            </div>
            <div className="bg-teal-500/10 border border-teal-500/30 p-10 rounded-[3rem] space-y-6 shadow-2xl shadow-teal-900/10">
               <h3 className="text-2xl font-black text-teal-500 uppercase tracking-widest">After LekhaFlow</h3>
               <ul className="space-y-4 text-white font-bold uppercase text-xs tracking-widest">
                  <li>✅ XML Automatic Import</li>
                  <li>✅ 100% Accurate Data</li>
                  <li>✅ Work Done in Minutes</li>
                  <li>✅ 10 Seconds per Invoice</li>
                  <li>✅ Scalable Process</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="py-24">
        <div className={`${containerClass} max-w-4xl`}>
          <h2 className="text-3xl font-black text-white text-center mb-12 uppercase tracking-tighter">Common Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Does it work with Tally Prime?", a: "Yes, fully optimized for all Tally Prime releases including 4.0 and 5.0." },
              { q: "Is internet required?", a: "Internet is required only during the AI processing phase. Importing XML into Tally is offline." },
              { q: "How is licensing done?", a: "We provide machine-locked licenses for maximum security of your accounting data." },
              { q: "What file formats are supported?", a: "PDF, Scanned Images (JPG/PNG), and Client Excel files." }
            ].map((faq, i) => (
              <details key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 group open:border-teal-500 transition-all">
                <summary className="font-black text-white uppercase tracking-widest cursor-pointer flex justify-between items-center list-none">
                  {faq.q} <ChevronDown className="group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-slate-400 font-medium leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 13. ABOUT FOUNDER */}
      <section className="py-24 bg-slate-900/30">
        <div className={`${containerClass} max-w-5xl`}>
          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 lg:p-20 overflow-hidden relative">
            <div className="grid lg:grid-cols-3 gap-12 items-center relative z-10">
              <div className="lg:col-span-1">
                <div className="w-full aspect-square bg-slate-800 rounded-3xl border-4 border-teal-500/20 flex items-center justify-center overflow-hidden">
                   <User size={100} className="text-slate-700" />
                </div>
              </div>
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-1">
                   <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Jitendra Bharti</h2>
                   <p className="text-teal-500 font-black uppercase tracking-[0.2em] text-sm">Founder, LekhaFlow AI Systems</p>
                </div>
                <p className="text-slate-400 text-lg font-medium italic">
                  "Our mission is simple: Helping Indian businesses eliminate repetitive accounting data entry once and for all."
                </p>
                <div className="pt-4 flex gap-4">
                   <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <div className="text-teal-400 font-black uppercase text-[10px] mb-1">Our Vision</div>
                      <div className="text-white font-bold text-sm">100% Paperless Tally Entry</div>
                   </div>
                   <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <div className="text-teal-400 font-black uppercase text-[10px] mb-1">Support</div>
                      <div className="text-white font-bold text-sm">Made with ❤️ in India</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. CONTACT */}
      <section id="contact" className="py-24 border-t border-slate-900">
        <div className={`${containerClass}`}>
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-8">
               <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">Connect with our <br />Engineering Desk</h2>
               <p className="text-slate-500 font-bold uppercase tracking-widest">Need a custom template or direct BUSY integration? Fill the form.</p>
               
               <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
                     <Phone className="text-teal-500" /> 
                     <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Call Directly</div>
                        <div className="text-white font-black">+91 87708 08695</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
                     <Mail className="text-blue-500" /> 
                     <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Support</div>
                        <div className="text-white font-black">support@lekhaflow.in</div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-2">
               <div className="bg-slate-950 border border-slate-200/10 rounded-[2.2rem] p-1">
                   <Contact isHindi={false} />
               </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-900 text-center">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Nexoriva Systems © 2026 | Built for Tax Professionals</p>
      </footer>

      {/* STICKY WHATSAPP */}
      <a 
        href="https://wa.me/918770808695" 
        target="_blank" 
        className="fixed bottom-8 right-8 z-[200] bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center gap-2"
      >
        <MessageCircle size={24} />
        <span className="hidden md:inline font-black uppercase text-xs tracking-widest">WhatsApp Support</span>
      </a>

    </div>
  );
}
