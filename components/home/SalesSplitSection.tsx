"use client";

import {
  Split,
  Clock,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

interface SalesSplitSectionProps {
  isHindi: boolean;
  containerClass: string;
}

export default function SalesSplitSection({
  isHindi,
  containerClass,
}: SalesSplitSectionProps) {
  return (
          <section id="features" className="py-24 bg-slate-50 border-y border-amber-500/20">
            <div className={containerClass}>
              <div className="text-center mb-16">
                <div className="inline-block mb-4 px-5 py-2 bg-amber-100 border border-amber-300 rounded-full">
                  <p className="text-amber-700 text-[10px] font-black uppercase tracking-[0.4em]">
                    ⚡ {isHindi ? "यूनिक फीचर — कोई और नहीं देता" : "UNIQUE FEATURE — NOBODY ELSE OFFERS"}
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
                  {isHindi ? "सेल्स टोटल → कई वाउचर" : "Sales Total → Multiple Vouchers"}
                </h2>
                <p className="text-slate-900 font-bold uppercase tracking-widest text-xs max-w-xl mx-auto">
                  {isHindi 
                    ? "एक सेल्स इनवॉइस को ₹10,000, ₹30,000 या ₹50,000 से कम वाउचर में ऑटोमैटिकली स्प्लिट करें"
                    : "Automatically split a single sales invoice into vouchers below ₹10,000, ₹30,000 or ₹50,000"}
                </p>
              </div>
    
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white border border-amber-500/20 p-8 rounded-[2.5rem] hover:border-amber-500/50 transition-all text-center">
                  <div className="w-16 h-16 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <Split className="text-amber-500" size={28} />
                  </div>
                  <h3 className="text-slate-900 font-black uppercase text-sm mb-3">
                    {isHindi ? "ऑटोमैटिक स्प्लिट" : "Automatic Split"}
                  </h3>
                  <p className="text-slate-900 text-xs leading-relaxed">
                    {isHindi 
                      ? "₹75,000 का इनवॉइस → ₹40,000 + ₹35,000 — बिना मैन्युअल कैलकुलेशन के"
                      : "₹75,000 Invoice → ₹40,000 + ₹35,000 — no manual calculation needed"}
                  </p>
                </div>
    
                <div className="bg-white border border-amber-500/20 p-8 rounded-[2.5rem] hover:border-amber-500/50 transition-all text-center">
                  <div className="w-16 h-16 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <Clock className="text-amber-500" size={28} />
                  </div>
                  <h3 className="text-slate-900 font-black uppercase text-sm mb-3">
                    {isHindi ? "घंटों की बचत" : "Save Hours"}
                  </h3>
                  <p className="text-slate-900 text-xs leading-relaxed">
                    {isHindi 
                      ? "CAs और accountants के लिए सबसे बड़ी टाइम-सेवर — क्लाइंट के GST कंप्लायंस के लिए"
                      : "The biggest time-saver for CAs and accountants — perfect for client GST compliance"}
                  </p>
                </div>
    
                <div className="bg-white border border-amber-500/20 p-8 rounded-[2.5rem] hover:border-amber-500/50 transition-all text-center">
                  <div className="w-16 h-16 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <BadgeCheck className="text-amber-500" size={28} />
                  </div>
                  <h3 className="text-slate-900 font-black uppercase text-sm mb-3">
                    {isHindi ? "100% सटीक" : "100% Accurate"}
                  </h3>
                  <p className="text-slate-900 text-xs leading-relaxed">
                    {isHindi 
                      ? "हर स्प्लिट एकदम सही — मैन्युअल एरर का कोई चांस नहीं"
                      : "Every split is perfectly calculated — zero chance of manual errors"}
                  </p>
                </div>
              </div>
    
              <div className="text-center mt-12">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-amber-500/30 rounded-2xl">
                  <Sparkles size={16} className="text-amber-500" />
                  <span className="text-slate-900 text-xs font-bold uppercase tracking-widest">
                    {isHindi 
                      ? "🔥 यह फीचर Vouchrit या Vyapar TaxOne में नहीं है — केवल LekhaFlow में"
                      : "🔥 This feature is NOT in Vouchrit or Vyapar TaxOne — only LekhaFlow"}
                  </span>
                </div>
              </div>
            </div>
          </section>
  );
}
