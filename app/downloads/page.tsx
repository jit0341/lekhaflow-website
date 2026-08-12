"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download, CheckCircle2, Shield, Zap, Award } from "lucide-react";

export default function DownloadsPage() {
  const [downloadLinks, setDownloadLinks] = useState({
    goldFull: "",
    goldTrial: "",
    standardFull: "",
    standardTrial: "",
  });

  useEffect(() => {
    async function fetchLinks() {
      try {
        const res = await fetch("/api/github_release");
        const data = await res.json();
        if (data.success) {
          setDownloadLinks({
            goldFull: data.gold?.url || "",
            goldTrial: data.goldTrial?.url || "",
            standardFull: data.standard?.url || "",
            standardTrial: data.standardTrial?.url || "",
          });
        }
      } catch (err) {
        console.error("Error fetching download links:", err);
      }
    }
    fetchLinks();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter text-center mb-12">
          Download Center
        </h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Gold Full Version */}
          <div className="bg-slate-900 border-2 border-amber-500 p-8 rounded-[3rem]">
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-amber-500" size={28} />
              <h2 className="text-2xl font-black text-white">LekhaFlow Gold</h2>
            </div>
            <p className="text-amber-400 font-bold text-sm mb-4">Full Version</p>
            <ul className="space-y-2 text-slate-300 text-sm mb-6">
              <li className="flex items-center gap-2">✅ Unlimited Invoices/Year</li>
              <li className="flex items-center gap-2">✅ GSTR-2B Reconciliation</li>
              <li className="flex items-center gap-2">✅ Sales Split Automation</li>
              <li className="flex items-center gap-2">✅ Direct WhatsApp Support</li>
            </ul>
            <a
              href={downloadLinks.goldFull || "#"}
              className={`block w-full py-4 text-center rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${
                downloadLinks.goldFull 
                  ? "bg-amber-500 text-black hover:bg-amber-400" 
                  : "bg-slate-700 text-slate-400 cursor-not-allowed"
              }`}
              download
            >
              <Download className="inline mr-2" size={16} />
              Download Full Version
            </a>
          </div>

          {/* Gold Trial Version */}
          <div className="bg-slate-900 border-2 border-teal-500 p-8 rounded-[3rem]">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="text-teal-500" size={28} />
              <h2 className="text-2xl font-black text-white">LekhaFlow Gold</h2>
            </div>
            <p className="text-teal-400 font-bold text-sm mb-4">7-Day Free Trial</p>
            <ul className="space-y-2 text-slate-300 text-sm mb-6">
              <li className="flex items-center gap-2">✅ All Gold Features</li>
              <li className="flex items-center gap-2">✅ 7 Days Full Access</li>
              <li className="flex items-center gap-2">✅ No Credit Card Required</li>
              <li className="flex items-center gap-2">✅ Try Before You Buy</li>
            </ul>
            <a
              href={downloadLinks.goldTrial || "#"}
              className={`block w-full py-4 text-center rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${
                downloadLinks.goldTrial 
                  ? "bg-teal-600 text-white hover:bg-teal-500" 
                  : "bg-slate-700 text-slate-400 cursor-not-allowed"
              }`}
              download
            >
              <Download className="inline mr-2" size={16} />
              Download Free Trial
            </a>
          </div>
        </div>

        <p className="text-center text-slate-500 text-xs mt-8">
          Latest Version: v15.0 | Released: August 2026
        </p>
      </div>
    </div>
  );
}