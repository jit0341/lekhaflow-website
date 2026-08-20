"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download, ShieldCheck, Zap, CheckCircle2, Sparkles, Clock } from "lucide-react";

export default function DownloadsPage() {
  const [isHindi, setIsHindi] = useState(false);

  // ✅ Correct Download Links
  const downloadLinks = {
    standard: {
      full: "https://github.com/jit0341/lekhaflow-website/releases/download/v2.0/Lekhaflow_standard_setup.exe",
      trial: "https://github.com/jit0341/lekhaflow-website/releases/download/v1.0/standard_trial_setup.exe"
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic">
            Download Center
          </h1>
          <p className="text-slate-500 text-sm mt-4">
            {isHindi ? "लेखाफ्लो का नवीनतम संस्करण डाउनलोड करें" : "Download the latest version of LekhaFlow"}
          </p>
        </div>

        {/* Download Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Full Version */}
          <div className="bg-slate-900 border-2 border-amber-500 p-8 rounded-[3rem] shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-amber-500" size={24} />
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">LekhaFlow Gold</h2>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1 inline-block mb-4">
              <span className="text-amber-400 text-[10px] font-black uppercase tracking-widest">Full Version</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 size={16} className="text-teal-500" /> Unlimited Invoices/Year
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 size={16} className="text-teal-500" /> GSTR-2B Reconciliation
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 size={16} className="text-teal-500" /> Sales Split Automation
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 size={16} className="text-teal-500" /> Direct WhatsApp Support
              </li>
            </ul>
            <a
              href={downloadLinks.standard.full}
              download
              className="flex items-center justify-center gap-3 w-full py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black rounded-2xl uppercase text-xs tracking-widest hover:shadow-lg hover:shadow-amber-500/20 transition-all"
            >
              <Download size={18} /> Download Full Version
            </a>
          </div>

          {/* Trial Version */}
          <div className="bg-slate-900 border-2 border-teal-500 p-8 rounded-[3rem] shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-teal-500" size={24} />
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">LekhaFlow Standard</h2>
            </div>
            <div className="bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-1 inline-block mb-4">
              <span className="text-teal-400 text-[10px] font-black uppercase tracking-widest">7-Day Free Trial</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 size={16} className="text-teal-500" /> All Standard Features
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 size={16} className="text-teal-500" /> 7 Days Full Access
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 size={16} className="text-teal-500" /> No Credit Card Required
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 size={16} className="text-teal-500" /> Try Before You Buy
              </li>
            </ul>
            <a
              href={downloadLinks.standard.trial}
              download
              className="flex items-center justify-center gap-3 w-full py-5 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-black rounded-2xl uppercase text-xs tracking-widest hover:shadow-lg hover:shadow-teal-500/20 transition-all"
            >
              <Download size={18} /> Download Free Trial
            </a>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
          Latest Version: v15.0 | Released: August 2026
        </p>
      </div>
    </div>
  );
}