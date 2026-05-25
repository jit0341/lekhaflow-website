"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GalleryPage() {
  useEffect(() => {
    document.title = "LekhaFlow | Interactive Software Dashboard Interface Gallery";
  }, []);

  const screens = [
    { title: "LekhaFlow Gold Suite Dashboard", desc: "Premium advance edition featuring interactive multi-split configuration triggers.", src: "/1.png" },
    { title: "LekhaFlow Standard Interface", desc: "Core Tally Prime voucher injection tracking console viewport setup.", src: "/2.png" },
    { title: "Tally Prime Runtime Pipeline", desc: "Active transaction synchronizer node waiting for folder metadata ingestion.", src: "/3.png" },
    { title: "LekhaFlow Lite Formatting Engine", desc: "Flawless Excel mapping snap execution window built for custom templates.", src: "/4.png" },
    { title: "Tally ERP9 Premium Infrastructure", desc: "Optimized native parsing injection workspace targeting legacy accounting windows.", src: "/5.png" },
    { title: "Tally ERP9 Standard Gateway", desc: "Background ledger and stock entity generation sequence layout monitor.", src: "/6.png" },
    { title: "LekhaFlow BUSY Automation Setup", desc: "Single-sheet split database builder engineered to safely prevent desktop system lag.", src: "/8.png" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans tracking-tight antialiased p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back Link to Home Navigation */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-black text-white tracking-wider">Lekha<span className="text-amber-500">Flow</span> Application Canvas</h1>
            <p className="text-slate-400 text-xs mt-1">Real-time working operational GUI interface snapshot catalog.</p>
          </div>
          <Link href="/">
            <span className="px-4 py-2.5 bg-slate-900 border border-slate-800 text-amber-400 font-black rounded-xl text-xs uppercase tracking-wide cursor-pointer transition-all hover:bg-slate-800">
              🔙 Return to Home Desk
            </span>
          </Link>
        </div>

        {/* PREMIUM VISUAL SCREENSHOTS GRID */}
        <div className="grid md:grid-cols-2 gap-8 pt-4">
          {screens.map((screen, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-amber-500/40 transition-all">
              <div className="p-4 border-b border-slate-800 bg-slate-950/40">
                <h3 className="text-sm font-black text-white tracking-wide group-hover:text-amber-400 transition-colors">{screen.title}</h3>
                <p className="text-slate-400 text-[11px] mt-0.5 font-medium">{screen.desc}</p>
              </div>
              <div className="bg-black/50 p-2 border-b border-slate-800 relative group-hover:bg-black/20 transition-all">
                {/* 🖼️ Live local image placeholder mapping natively */}
                <img src={screen.src} alt={screen.title} className="w-full h-auto object-contain rounded-lg shadow-inner group-hover:scale-[1.01] transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}