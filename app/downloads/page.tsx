"use client";
import React, { useEffect, useState } from "react";
import { Download, ShieldCheck, Zap, Laptop, ArrowLeft, Trophy, Star } from "lucide-react";
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

  const downloadCategories = [
    {
      title: "Full Commercial Versions",
      subtitle: "Requires a valid License.dat (After Purchase)",
      items: [
        {
          id: "gold",
          name: "LekhaFlow Gold Full",
          desc: "Enterprise version with GSTR-2B Recon and Advanced Mapping.",
          color: "border-amber-500",
          btn: "bg-amber-600 hover:bg-amber-700",
          icon: <Trophy className="text-amber-500" size={32} />
        },
        {
          id: "standard",
          name: "LekhaFlow Standard Full",
          desc: "Professional AI extraction for high-speed data entry.",
          color: "border-blue-500",
          btn: "bg-blue-600 hover:bg-blue-700",
          icon: <Star className="text-blue-500" size={32} />
        }
      ]
    },
    {
      title: "Free Evaluation Trials",
      subtitle: "Machine-locked for 7 days (Testing Purpose)",
      items: [
        {
          id: "gold_trial", // Ensure your API returns this or map to gold demo
          name: "LekhaFlow Gold Trial",
          desc: "Test advanced reconciliation and multi-company features.",
          color: "border-teal-500",
          btn: "bg-teal-600 hover:bg-teal-700",
          icon: <Zap className="text-teal-500" size={32} />
        },
        {
          id: "demo",
          name: "LekhaFlow Standard Trial",
          desc: "Try the core AI engine and XML generation for free.",
          color: "border-slate-500",
          btn: "bg-slate-700 hover:bg-slate-800",
          icon: <Zap className="text-slate-400" size={32} />
        }
      ]
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
            LekhaFlow <span className="text-teal-500">Hub</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Download the latest digitally signed builds</p>
        </div>

        {downloadCategories.map((cat, idx) => (
          <div key={idx} className="mb-20">
            <div className="mb-8 border-l-4 border-teal-500 pl-6">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{cat.title}</h2>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">{cat.subtitle}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {cat.items.map((p) => (
                <div key={p.id} className={`bg-slate-900/40 border-2 ${p.color} p-8 rounded-[3rem] shadow-2xl flex flex-col justify-between hover:scale-[1.01] transition-all`}>
                  <div>
                    <div className="mb-6">{p.icon}</div>
                    <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tighter">{p.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-10">{p.desc}</p>
                    <div className="space-y-3 mb-10 text-[10px] font-black uppercase text-slate-600">
                      <div className="flex items-center gap-2"><Laptop size={14}/> Windows 10/11</div>
                      <div className="flex items-center gap-2"><ShieldCheck size={14}/> Digitally Signed</div>
                    </div>
                  </div>

                  <div>
                    <a
                      href={releases?.[p.id]?.url || releases?.demo?.url || "#"}
                      className={`flex items-center justify-between w-full p-5 ${p.btn} text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all`}
                    >
                      Download Now <Download size={18} />
                    </a>
                    {releases?.[p.id]?.publishedAt && (
                      <p className="mt-4 text-[9px] text-center text-slate-600 font-bold uppercase tracking-widest">
                        Last Update: {new Date(releases[p.id].publishedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}