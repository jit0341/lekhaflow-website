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
                    âš¡ {isHindi ? "à¤¯à¥‚à¤¨à¤¿à¤• à¤«à¥€à¤šà¤° â€” à¤•à¥‹à¤ˆ à¤”à¤° à¤¨à¤¹à¥€à¤‚ à¤¦à¥‡à¤¤à¤¾" : "UNIQUE FEATURE â€” NOBODY ELSE OFFERS"}
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
                  {isHindi ? "à¤¸à¥‡à¤²à¥à¤¸ à¤Ÿà¥‹à¤Ÿà¤² â†’ à¤•à¤ˆ à¤µà¤¾à¤‰à¤šà¤°" : "Sales Total â†’ Multiple Vouchers"}
                </h2>
                <p className="text-slate-900 font-bold uppercase tracking-widest text-xs max-w-xl mx-auto">
                  {isHindi 
                    ? "à¤à¤• à¤¸à¥‡à¤²à¥à¤¸ à¤‡à¤¨à¤µà¥‰à¤‡à¤¸ à¤•à¥‹ â‚¹10,000, â‚¹30,000 à¤¯à¤¾ â‚¹50,000 à¤¸à¥‡ à¤•à¤® à¤µà¤¾à¤‰à¤šà¤° à¤®à¥‡à¤‚ à¤‘à¤Ÿà¥‹à¤®à¥ˆà¤Ÿà¤¿à¤•à¤²à¥€ à¤¸à¥à¤ªà¥à¤²à¤¿à¤Ÿ à¤•à¤°à¥‡à¤‚"
                    : "Automatically split a single sales invoice into vouchers below â‚¹10,000, â‚¹30,000 or â‚¹50,000"}
                </p>
              </div>
    
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white border border-amber-500/20 p-8 rounded-[2.5rem] hover:border-amber-500/50 transition-all text-center">
                  <div className="w-16 h-16 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <Split className="text-amber-500" size={28} />
                  </div>
                  <h3 className="text-slate-900 font-black uppercase text-sm mb-3">
                    {isHindi ? "à¤‘à¤Ÿà¥‹à¤®à¥ˆà¤Ÿà¤¿à¤• à¤¸à¥à¤ªà¥à¤²à¤¿à¤Ÿ" : "Automatic Split"}
                  </h3>
                  <p className="text-slate-900 text-xs leading-relaxed">
                    {isHindi 
                      ? "â‚¹75,000 à¤•à¤¾ à¤‡à¤¨à¤µà¥‰à¤‡à¤¸ â†’ â‚¹40,000 + â‚¹35,000 â€” à¤¬à¤¿à¤¨à¤¾ à¤®à¥ˆà¤¨à¥à¤¯à¥à¤…à¤² à¤•à¥ˆà¤²à¤•à¥à¤²à¥‡à¤¶à¤¨ à¤•à¥‡"
                      : "â‚¹75,000 Invoice â†’ â‚¹40,000 + â‚¹35,000 â€” no manual calculation needed"}
                  </p>
                </div>
    
                <div className="bg-white border border-amber-500/20 p-8 rounded-[2.5rem] hover:border-amber-500/50 transition-all text-center">
                  <div className="w-16 h-16 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <Clock className="text-amber-500" size={28} />
                  </div>
                  <h3 className="text-slate-900 font-black uppercase text-sm mb-3">
                    {isHindi ? "à¤˜à¤‚à¤Ÿà¥‹à¤‚ à¤•à¥€ à¤¬à¤šà¤¤" : "Save Hours"}
                  </h3>
                  <p className="text-slate-900 text-xs leading-relaxed">
                    {isHindi 
                      ? "CAs à¤”à¤° accountants à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¤¬à¤¸à¥‡ à¤¬à¤¡à¤¼à¥€ à¤Ÿà¤¾à¤‡à¤®-à¤¸à¥‡à¤µà¤° â€” à¤•à¥à¤²à¤¾à¤‡à¤‚à¤Ÿ à¤•à¥‡ GST à¤•à¤‚à¤ªà¥à¤²à¤¾à¤¯à¤‚à¤¸ à¤•à¥‡ à¤²à¤¿à¤"
                      : "The biggest time-saver for CAs and accountants â€” perfect for client GST compliance"}
                  </p>
                </div>
    
                <div className="bg-white border border-amber-500/20 p-8 rounded-[2.5rem] hover:border-amber-500/50 transition-all text-center">
                  <div className="w-16 h-16 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <BadgeCheck className="text-amber-500" size={28} />
                  </div>
                  <h3 className="text-slate-900 font-black uppercase text-sm mb-3">
                    {isHindi ? "100% à¤¸à¤Ÿà¥€à¤•" : "100% Accurate"}
                  </h3>
                  <p className="text-slate-900 text-xs leading-relaxed">
                    {isHindi 
                      ? "à¤¹à¤° à¤¸à¥à¤ªà¥à¤²à¤¿à¤Ÿ à¤à¤•à¤¦à¤® à¤¸à¤¹à¥€ â€” à¤®à¥ˆà¤¨à¥à¤¯à¥à¤…à¤² à¤à¤°à¤° à¤•à¤¾ à¤•à¥‹à¤ˆ à¤šà¤¾à¤‚à¤¸ à¤¨à¤¹à¥€à¤‚"
                      : "Every split is perfectly calculated â€” zero chance of manual errors"}
                  </p>
                </div>
              </div>
    
              <div className="text-center mt-12">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-amber-500/30 rounded-2xl">
                  <Sparkles size={16} className="text-amber-500" />
                  <span className="text-slate-900 text-xs font-bold uppercase tracking-widest">
                    {isHindi 
                      ? "ðŸ”¥ à¤¯à¤¹ à¤«à¥€à¤šà¤° Vouchrit à¤¯à¤¾ Vyapar TaxOne à¤®à¥‡à¤‚ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆ â€” à¤•à¥‡à¤µà¤² LekhaFlow à¤®à¥‡à¤‚"
                      : "ðŸ”¥ This feature is NOT in Vouchrit or Vyapar TaxOne â€” only LekhaFlow"}
                  </span>
                </div>
              </div>
            </div>
          </section>
  );
}
