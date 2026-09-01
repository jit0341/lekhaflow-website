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
    
              {/* Badge — Small */}
              <div className="inline-block mb-6 px-4 py-1.5 bg-teal-50 border border-teal-200 rounded-full">
                  <p className="text-teal-700 text-[10px] font-black uppercase tracking-[0.3em]">
                  {isHindi ? "AI अकाउंटिंग ऑटोमेशन → टैली" : "AI-POWERED ACCOUNTING AUTOMATION → TALLY"}
                </p>
              </div>
    
              {/* Headline — Balanced */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] uppercase tracking-tighter mb-4 max-w-4xl mx-auto">
                {isHindi ? (
                  <>AI-पावर्ड <span className="text-teal-500 italic">डेस्कटॉप सॉफ्टवेयर</span> टैली वर्कफ्लो के लिए</>
                ) : (
                  <>AI-Powered <span className="text-teal-500 italic">Desktop Software</span> for Tally Workflows</>
                )}
              </h1>
    
              {/* Description — Medium */}
              <p className="text-slate-900 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed mb-4">
                {isHindi 
                  ? "पर्चेज और सेल्स इनवॉइस, बैंक स्टेटमेंट और अकाउंटिंग डॉक्यूमेंट को AI से प्रोसेस करें, रिजल्ट को रिव्यू करें और Tally में भेजें।" 
                  : "Automate Purchase & Sales Invoices, Bank Statements and Accounting Documents — then review the results and send them to Tally."}
              </p>
    
              {/* Sub-message with Bullets — Normal Font */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
               <span className="text-slate-900 text-xs md:text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-teal-500 flex-shrink-0" />
                  {isHindi ? "क्लाइंट डेटा आपके सिस्टम पर" : "Client data stays on your system"}
                </span>
                <span className="text-slate-900 text-xs md:text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-500 flex-shrink-0" />
                  {isHindi ? "सेल्स टोटल को कई वाउचर में स्प्लिट" : "Split sales totals into multiple vouchers"}
                </span>
                <span className="text-slate-900 text-xs md:text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-teal-500 flex-shrink-0" />
                  {isHindi ? "कोई क्लाउड स्टोरेज नहीं" : "No cloud storage"}
                </span>
              </div>
    
              {/* Tags — Small */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <span className="flex items-center gap-1.5 text-slate-900 text-[10px] font-bold uppercase tracking-widest">
                  <Cpu size={14} className="text-teal-500" /> {isHindi ? "AI Powered" : "AI Powered"}
                </span>
                <span className="flex items-center gap-1.5 text-slate-900 text-[10px] font-bold uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-teal-500" /> {isHindi ? "क्लाइंट डेटा कंट्रोल" : "Client-Side Data Control"}
                </span>
                <span className="flex items-center gap-1.5 text-slate-900 text-[10px] font-bold uppercase tracking-widest">
                  <Split size={14} className="text-amber-500" /> {isHindi ? "यूनिक सेल्स स्प्लिट" : "Unique Sales Split"}
                </span>
              </div>
    
              {/* CTA Buttons — Normal Size */}
              <div className="flex flex-wrap justify-center gap-4 mb-14">
                <a 
                  href="/downloads" 
                  className="group flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-bold rounded-xl uppercase text-xs tracking-widest shadow-lg shadow-teal-600/20 hover:bg-teal-500 hover:-translate-y-0.5 transition-all"
                >
                  <Download size={16} /> {isHindi ? "फ्री ट्रायल डाउनलोड करें" : "Download Free Trial"}
                </a>
                
                <button 
                  onClick={() => { setIntakeTarget("demo"); setShowIntakeModal(true); }}
                  className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl uppercase text-xs tracking-widest hover:bg-slate-800 transition-all"
                >
                  {isHindi ? "लाइसेंस लें" : "Get License"}
                </button>
                
                <button 
                  onClick={() => window.open("https://wa.me/918770808695", "_blank")}
                  className="px-6 py-3 bg-green-50 text-green-700 font-bold rounded-xl uppercase text-xs tracking-widest border border-green-200 hover:bg-green-100 transition-all"
                >
                  💬 {isHindi ? "व्हाट्सएप पर पूछें" : "Ask on WhatsApp"}
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
    
              {/* Demo Video — Optional (comment out if video not ready) */}
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
                    ▶ 60 sec demo
                  </div>
                </div>
              </div>
    
              {/* Stats — Small */}
              <div className="mt-16 flex flex-wrap justify-center gap-8 border-t border-slate-200 pt-8">
                {[
                  { l: isHindi ? "सटीकता" : "Accuracy", v: "100%", i: Target },
                  { l: isHindi ? "गति" : "Efficiency", v: "80x Faster", i: Zap },
                  { l: isHindi ? "डेटा प्राइवेसी" : "Data Privacy", v: "100% Local", i: ShieldCheck }
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



