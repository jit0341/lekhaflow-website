"use client";
import React, { useEffect, useState } from "react";
import { Download, ShieldCheck, Zap, Laptop, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DownloadsPage() {
  const [releases, setReleases] = useState<any>(null);

  useEffect(() => {
    async function getLinks() {
      const res = await fetch("/api/github_release");
      const data = await res.json();
      if (data.success) setReleases(data);
    }
    getLinks();
  }, []);

  const products = [
    {
      id: "gold",
      name: "LekhaFlow Gold",
      desc: "Enterprise AI Automation with GSTR-2B Recon & Advanced Mapping.",
      color: "border-amber-500",
      btn: "bg-amber-600 hover:bg-amber-700",
    },
    {
      id: "standard",
      name: "LekhaFlow Standard",
      desc: "Fast Invoice to Tally conversion for small firms and accountants.",
      color: "border-blue-500",
      btn: "bg-blue-600 hover:bg-blue-700",
    },
    {
      id: "demo",
      name: "LekhaFlow Free Trial",
      desc: "7-Day fully functional trial. Machine-locked for security.",
      color: "border-teal-500",
      btn: "bg-teal-600 hover:bg-teal-700",
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 font-sans py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-teal-500 font-bold text-xs uppercase mb-12 hover:gap-4 transition-all">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-6">
            Download <span className="text-teal-500">Center</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm max-w-2xl mx-auto">
            Get the latest digitally signed builds of LekhaFlow. Secure, Fast, and AI-Ready.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((p) => (
            <div key={p.id} className={`bg-slate-900/40 border-2 ${p.color} p-8 rounded-[3rem] shadow-2xl flex flex-col justify-between hover:scale-[1.02] transition-transform`}>
              <div>
                <h2 className="text-2xl font-black text-white uppercase mb-4 tracking-tighter">{p.name}</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-10">{p.desc}</p>
                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-500">
                    <Laptop size={14}/> Windows 10/11 Only
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-500">
                    <ShieldCheck size={14}/> Digitally Signed
                  </div>
                </div>
              </div>

              <div>
                <a
                  href={releases?.[p.id]?.url || "#"}
                  className={`flex items-center justify-between w-full p-5 ${p.btn} text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg`}
                >
                  Download {p.id === 'demo' ? 'Trial' : 'Full'} <Download size={18} />
                </a>
                {releases?.[p.id]?.publishedAt && (
                  <p className="mt-4 text-[9px] text-center text-slate-600 font-bold uppercase">
                    Latest Build: {new Date(releases[p.id].publishedAt).toLocaleDateString("en-GB")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-slate-950 border border-slate-800 rounded-[2.5rem] text-center">
            <h3 className="text-white font-black uppercase tracking-widest mb-4">Need help with installation?</h3>
            <p className="text-slate-500 text-sm mb-8">Contact our direct founder desk for remote setup support via AnyDesk or TeamViewer.</p>
            <a href="https://wa.me/918770808695" className="text-teal-500 font-black uppercase text-xs border-b border-teal-500 pb-1">Chat with Technical Support</a>
        </div>
      </div>
    </div>
  );
}