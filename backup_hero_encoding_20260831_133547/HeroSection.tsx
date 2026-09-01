"use client";

import {
  Download,
  Cpu,
  CheckCircle2,
  ShieldCheck,
  Split,
  Target,
  Zap,
} from "lucide-react";

interface HeroSectionProps {
  setIntakeTarget: (target: "demo" | "quotation") => void;
  setShowIntakeModal: (show: boolean) => void;
  isHindi: boolean;
  containerClass: string;
}

export default function HeroSection({
  isHindi,
  containerClass,
  setIntakeTarget,
  setShowIntakeModal,
}: HeroSectionProps) {
  return (
          <section className="pt-36 pb-24 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.08)_0,transparent_70%)] pointer-events-none" />
            <div className={containerClass + " text-center relative z-10"}>
    
              {/* Badge â€” Small */}
              <div className="inline-block mb-6 px-4 py-1.5 bg-teal-50 border border-teal-200 rounded-full">
                  <p className="text-teal-700 text-[10px] font-black uppercase tracking-[0.3em]">
                  {isHindi ? "AI à¤…à¤•à¤¾à¤‰à¤‚à¤Ÿà¤¿à¤‚à¤— à¤‘à¤Ÿà¥‹à¤®à¥‡à¤¶à¤¨ â†’ à¤Ÿà¥ˆà¤²à¥€" : "AI-POWERED ACCOUNTING AUTOMATION â†’ TALLY"}
                </p>
              </div>
    
              {/* Headline â€” Balanced */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] uppercase tracking-tighter mb-4 max-w-4xl mx-auto">
                {isHindi ? (
                  <>AI-à¤ªà¤¾à¤µà¤°à¥à¤¡ <span className="text-teal-500 italic">à¤¡à¥‡à¤¸à¥à¤•à¤Ÿà¥‰à¤ª à¤¸à¥‰à¤«à¥à¤Ÿà¤µà¥‡à¤¯à¤°</span> à¤Ÿà¥ˆà¤²à¥€ à¤µà¤°à¥à¤•à¤«à¥à¤²à¥‹ à¤•à¥‡ à¤²à¤¿à¤</>
                ) : (
                  <>AI-Powered <span className="text-teal-500 italic">Desktop Software</span> for Tally Workflows</>
                )}
              </h1>
    
              {/* Description â€” Medium */}
              <p className="text-slate-900 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed mb-4">
                {isHindi 
                  ? "à¤ªà¤°à¥à¤šà¥‡à¤œ à¤”à¤° à¤¸à¥‡à¤²à¥à¤¸ à¤‡à¤¨à¤µà¥‰à¤‡à¤¸, à¤¬à¥ˆà¤‚à¤• à¤¸à¥à¤Ÿà¥‡à¤Ÿà¤®à¥‡à¤‚à¤Ÿ à¤”à¤° à¤…à¤•à¤¾à¤‰à¤‚à¤Ÿà¤¿à¤‚à¤— à¤¡à¥‰à¤•à¥à¤¯à¥‚à¤®à¥‡à¤‚à¤Ÿ à¤•à¥‹ AI à¤¸à¥‡ à¤ªà¥à¤°à¥‹à¤¸à¥‡à¤¸ à¤•à¤°à¥‡à¤‚, à¤°à¤¿à¤œà¤²à¥à¤Ÿ à¤•à¥‹ à¤°à¤¿à¤µà¥à¤¯à¥‚ à¤•à¤°à¥‡à¤‚ à¤”à¤° Tally à¤®à¥‡à¤‚ à¤­à¥‡à¤œà¥‡à¤‚à¥¤" 
                  : "Automate Purchase & Sales Invoices, Bank Statements and Accounting Documents â€” then review the results and send them to Tally."}
              </p>
    
              {/* Sub-message with Bullets â€” Normal Font */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
               <span className="text-slate-900 text-xs md:text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-teal-500 flex-shrink-0" />
                  {isHindi ? "à¤•à¥à¤²à¤¾à¤‡à¤‚à¤Ÿ à¤¡à¥‡à¤Ÿà¤¾ à¤†à¤ªà¤•à¥‡ à¤¸à¤¿à¤¸à¥à¤Ÿà¤® à¤ªà¤°" : "Client data stays on your system"}
                </span>
                <span className="text-slate-900 text-xs md:text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-500 flex-shrink-0" />
                  {isHindi ? "à¤¸à¥‡à¤²à¥à¤¸ à¤Ÿà¥‹à¤Ÿà¤² à¤•à¥‹ à¤•à¤ˆ à¤µà¤¾à¤‰à¤šà¤° à¤®à¥‡à¤‚ à¤¸à¥à¤ªà¥à¤²à¤¿à¤Ÿ" : "Split sales totals into multiple vouchers"}
                </span>
                <span className="text-slate-900 text-xs md:text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-teal-500 flex-shrink-0" />
                  {isHindi ? "à¤•à¥‹à¤ˆ à¤•à¥à¤²à¤¾à¤‰à¤¡ à¤¸à¥à¤Ÿà¥‹à¤°à¥‡à¤œ à¤¨à¤¹à¥€à¤‚" : "No cloud storage"}
                </span>
              </div>
    
              {/* Tags â€” Small */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <span className="flex items-center gap-1.5 text-slate-900 text-[10px] font-bold uppercase tracking-widest">
                  <Cpu size={14} className="text-teal-500" /> {isHindi ? "AI Powered" : "AI Powered"}
                </span>
                <span className="flex items-center gap-1.5 text-slate-900 text-[10px] font-bold uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-teal-500" /> {isHindi ? "à¤•à¥à¤²à¤¾à¤‡à¤‚à¤Ÿ à¤¡à¥‡à¤Ÿà¤¾ à¤•à¤‚à¤Ÿà¥à¤°à¥‹à¤²" : "Client-Side Data Control"}
                </span>
                <span className="flex items-center gap-1.5 text-slate-900 text-[10px] font-bold uppercase tracking-widest">
                  <Split size={14} className="text-amber-500" /> {isHindi ? "à¤¯à¥‚à¤¨à¤¿à¤• à¤¸à¥‡à¤²à¥à¤¸ à¤¸à¥à¤ªà¥à¤²à¤¿à¤Ÿ" : "Unique Sales Split"}
                </span>
              </div>
    
              {/* CTA Buttons â€” Normal Size */}
              <div className="flex flex-wrap justify-center gap-4 mb-14">
                <a 
                  href="/downloads" 
                  className="group flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-bold rounded-xl uppercase text-xs tracking-widest shadow-lg shadow-teal-600/20 hover:bg-teal-500 hover:-translate-y-0.5 transition-all"
                >
                  <Download size={16} /> {isHindi ? "à¤«à¥à¤°à¥€ à¤Ÿà¥à¤°à¤¾à¤¯à¤² à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ à¤•à¤°à¥‡à¤‚" : "Download Free Trial"}
                </a>
                
                <button 
                  onClick={() => { setIntakeTarget("demo"); setShowIntakeModal(true); }}
                  className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl uppercase text-xs tracking-widest hover:bg-slate-800 transition-all"
                >
                  {isHindi ? "à¤²à¤¾à¤‡à¤¸à¥‡à¤‚à¤¸ à¤²à¥‡à¤‚" : "Get License"}
                </button>
                
                <button 
                  onClick={() => window.open("https://wa.me/918770808695", "_blank")}
                  className="px-6 py-3 bg-green-50 text-green-700 font-bold rounded-xl uppercase text-xs tracking-widest border border-green-200 hover:bg-green-100 transition-all"
                >
                  ðŸ’¬ {isHindi ? "à¤µà¥à¤¹à¤¾à¤Ÿà¥à¤¸à¤à¤ª à¤ªà¤° à¤ªà¥‚à¤›à¥‡à¤‚" : "Ask on WhatsApp"}
                </button>
              </div>
    
              {/* Main Image */}
              <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-3xl p-2 shadow-2xl">
                <img 
                  src="/bank-intelligence.png" 
                  alt="LekhaFlow Bank Intelligence Dashboard" 
                  className="w-full h-full object-cover" 
                />
              </div>
    
              {/* Demo Video â€” Optional (comment out if video not ready) */}
              <div className="mt-8 max-w-4xl mx-auto">
                <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <video 
                    src="/demo.mp4" 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="w-full"
                    poster="/demo-poster.png"
                  />
                  <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 rounded-full text-[10px] text-white font-bold tracking-widest">
                    â–¶ 60 sec demo
                  </div>
                </div>
              </div>
    
              {/* Stats â€” Small */}
              <div className="mt-16 flex flex-wrap justify-center gap-8 border-t border-slate-200 pt-8">
                {[
                  { l: isHindi ? "à¤¸à¤Ÿà¥€à¤•à¤¤à¤¾" : "Accuracy", v: "100%", i: Target },
                  { l: isHindi ? "à¤—à¤¤à¤¿" : "Efficiency", v: "80x Faster", i: Zap },
                  { l: isHindi ? "à¤¡à¥‡à¤Ÿà¤¾ à¤ªà¥à¤°à¤¾à¤‡à¤µà¥‡à¤¸à¥€" : "Data Privacy", v: "100% Local", i: ShieldCheck }
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <m.i className="text-teal-500" size={18} />
                    <div className="text-left">
                      <p className="text-slate-900 font-black text-base leading-none">{m.v}</p>
                      <p className="text-slate-900 text-[9px] font-bold uppercase tracking-widest mt-0.5">{m.l}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
  );
}



