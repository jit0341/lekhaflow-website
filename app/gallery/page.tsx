"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Gallery() {
  useEffect(() => {
    document.title = "LekhaFlow | Software GUI Dashboard Gallery";
  }, []);

  // 🚀 REAL GUI SCREENSHOTS DATA DATASTORE
  // Note: Aap apne public images folder (public/images/) me ye screenshots save karke path yahan map kar sakte hain
  const screenshots = [
    {
      id: 1,
      title: "LekhaFlow Gold Suite Dashboard",
      description: "Premium advance edition featuring interactive multi-split configuration triggers.",
      tag: "Main GUI",
      placeholderColor: "from-blue-600 to-indigo-900"
    },
    {
      id: 2,
      title: "Deterministic Split Logic Configurator",
      description: "Live threshold limiter panel to route rows safely under ₹50,000 parameter limits.",
      tag: "Split Engine",
      placeholderColor: "from-amber-600 to-amber-900"
    },
    {
      id: 3,
      title: "Tally Prime Live Injection Channel",
      description: "Real-time ledger matching matrix and background automated voucher verification terminal.",
      tag: "Tally Sync",
      placeholderColor: "from-emerald-600 to-teal-900"
    },
    {
      id: 4,
      title: "Bank Statement Auto-Entry Matrix",
      description: "Universal statement layout parser mapping entries directly into multi-currency ledgers.",
      tag: "Bank Utility",
      placeholderColor: "from-purple-600 to-purple-900"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans tracking-tight text-xs antialiased p-6">
      
      {/* HEADER SECTION */}
      <div className="max-w-6xl mx-auto flex justify-between items-center border-b border-slate-800 pb-6 mb-12">
        <div>
          <Link href="/">
            <div className="text-xl font-black text-white tracking-wider cursor-pointer mb-1">
              Lekha<span className="text-amber-500">Flow</span> <span className="text-xs text-slate-500 font-normal">| Production Lab</span>
            </div>
          </Link>
          <p className="text-slate-400 text-xs font-bold font-sans">
            Real Software Terminal Interface & GUI Production Screenshots
          </p>
        </div>
        <Link href="/">
          <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 hover:text-amber-400 font-black transition cursor-pointer text-[10px] uppercase tracking-wider">
            ← Back To Platform Main Node
          </span>
        </Link>
      </div>

      {/* GALLERY GRID CANVAS */}
      <main className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="inline-block bg-amber-500/10 text-amber-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded border border-amber-500/20 font-mono">
            Visual Telemetry Assets
          </span>
          <h1 className="text-2xl font-black text-white tracking-tight">Verified Automation Infrastructure Screens</h1>
          <p className="text-slate-400 text-xs font-medium">
            Take an inside look at the high-precision processing dashboard engine built for CAs and tax practitioners.
          </p>
        </div>

        {/* SCREENSHOT CARDS CONTAINER */}
        <div className="grid md:grid-cols-2 gap-8 pt-4">
          {screenshots.map((screen) => (
            <div key={screen.id} className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col group hover:border-amber-500/40 transition-all duration-300">
              
              {/* IMAGE CONTAINER ACCEPTS REAL IMAGE LINK */}
              <div className="relative aspect-video w-full bg-slate-900 border-b border-slate-800 flex items-center justify-center overflow-hidden">
                
                {/* 🚀 UNCOMMENTED & ACTIVATED: Real Image Rendering Engine Loop */}
                <img 
                  src={`/images/gui_screen_${screen.id}.png`} 
                  alt={screen.title} 
                  className="w-full h-full object-cover absolute inset-0 z-20 group-hover:scale-105 transition-transform duration-500" 
                  onError={(e) => {
                    // अगर /public/images/ में फ़ाइल न मिले, तो यह ब्रोकन आइकॉन छुपाकर बैकग्राउंड टर्मिनल को दिखा देगा
                    e.currentTarget.style.display = 'none';
                  }}
                /> 
                
                {/* Visual Placeholder mimicking high tech GUI window (Acts as perfect fallback) */}
                <div className={`w-full h-full bg-gradient-to-br ${screen.placeholderColor} opacity-20 absolute inset-0 group-hover:scale-105 transition-transform duration-500 z-0`} />
                
                {/* Simulated GUI Shell Framework */}
                <div className="z-10 w-[90%] h-[80%] bg-slate-950/90 border border-slate-700/60 rounded-lg shadow-2xl p-4 font-mono text-[9px] text-slate-400 flex flex-col justify-between select-none">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-1.5 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
                      <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                      <span className="ml-2 text-slate-500 font-bold text-[8px] tracking-tight">lekhaflow_core_engine_v2.0.exe</span>
                    </div>
                    <span className="text-[8px] bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 text-amber-400 font-black font-mono">{screen.tag}</span>
                  </div>
                  <div className="flex-1 font-mono text-[8px] space-y-1 text-slate-300 leading-normal">
                    <p className="text-emerald-400 font-bold font-mono">[READY] Initializing parsing layers...</p>
                    <p className="font-mono">[INFO] Mapping target database columns.</p>
                    <p className="font-mono">[DATA] Active Row Pointer: Variable Array Injections Active.</p>
                    <p className="text-amber-400 font-mono">[WARN] Cryptographic Machine Lock ID Verified.</p>
                  </div>
                  <div className="border-t border-slate-900 pt-1.5 text-right text-slate-600 text-[7px] font-mono font-bold">
                    SYSTEM STATUS: 20_THREADS_ACTIVE_OK
                  </div>
                </div>

              </div>

              {/* DETAILS FOOTER PANEL */}
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-black text-white tracking-wide group-hover:text-amber-400 transition-colors">
                      {screen.title}
                    </h3>
                    <span className="bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono text-[8px] font-black uppercase">
                      Node 0{screen.id}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] font-medium leading-relaxed font-sans">
                    {screen.description}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* CALL TO ACTION FOR CONVERSIONS */}
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl text-center max-w-2xl mx-auto space-y-4">
          <div className="text-xs font-black text-white">Want to experience these dashboard operations in realtime on your system?</div>
          <p className="text-slate-400 text-[11px] max-w-md mx-auto font-medium font-sans">
            Download our verified standalone trial package bundle to automatically configure your hardware machine signature node securely.
          </p>
          <div className="pt-2">
            <Link href="/">
              <span className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black uppercase tracking-wider text-[10px] cursor-pointer inline-block shadow-lg">
                🚀 Return to Main Hub & Get Trial
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* MINI FOOTER */}
      <footer className="max-w-6xl mx-auto border-t border-slate-900 mt-20 pt-6 text-center font-mono text-[9px] text-slate-600 font-bold">
        Nexoriva Systems © 2026 | Visual Assets Diagnostics Control
      </footer>

    </div>
  );
}