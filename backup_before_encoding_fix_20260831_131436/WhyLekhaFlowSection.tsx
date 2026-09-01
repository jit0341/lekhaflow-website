"use client";

import {
  Shield,
  Cpu,
  Split,
  Zap,
} from "lucide-react";


interface WhyLekhaFlowSectionProps {
  isHindi: boolean;
  containerClass: string;
}

export default function WhyLekhaFlowSection({
  isHindi,
  containerClass,
}: WhyLekhaFlowSectionProps) {
  return (
          <section className="py-24 bg-slate-50 border-y border-slate-200">
            <div className={containerClass}>
              <div className="text-center mb-16">
                <div className="inline-block mb-4 px-5 py-2 bg-teal-100 border border-teal-300 rounded-full">
                  <p className="text-teal-700 text-[10px] font-black uppercase tracking-[0.4em]">
                    {isHindi ? "ðŸ’ª à¤•à¥à¤¯à¥‹à¤‚ à¤šà¥à¤¨à¥‡à¤‚ à¤²à¥‡à¤–à¤¾à¤«à¥à¤²à¥‹" : "ðŸ’ª WHY CHOOSE LEKHAFLOW"}
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
                  {isHindi ? "à¤²à¥‡à¤–à¤¾à¤«à¥à¤²à¥‹ à¤•à¥à¤¯à¥‹à¤‚ à¤šà¥à¤¨à¥‡à¤‚" : "Why Choose LekhaFlow?"}
                </h2>
                <p className="text-slate-900 font-bold uppercase tracking-widest text-xs max-w-xl mx-auto">
                  {isHindi 
                    ? "AI à¤¸à¥à¤ªà¥€à¤¡ + à¤¡à¥‡à¤¸à¥à¤•à¤Ÿà¥‰à¤ª à¤•à¤‚à¤Ÿà¥à¤°à¥‹à¤² + à¤ªà¥à¤°à¤¾à¤‡à¤µà¥‡à¤¸à¥€"
                    : "AI Speed + Desktop Control + Privacy"}
                </p>
              </div>
    
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="bg-white border border-slate-200 p-10 rounded-[3rem] hover:border-teal-500/30 transition-all">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Shield className="text-teal-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-black uppercase text-sm mb-2 tracking-widest">
                        {isHindi ? "100% à¤•à¥à¤²à¤¾à¤‡à¤‚à¤Ÿ à¤¡à¥‡à¤Ÿà¤¾ à¤ªà¥à¤°à¤¾à¤‡à¤µà¥‡à¤¸à¥€" : "100% Client Data Privacy"}
                      </h3>
                      <p className="text-slate-900 text-xs leading-relaxed">
                        {isHindi 
                          ? "à¤†à¤ªà¤•à¤¾ à¤¡à¥‡à¤Ÿà¤¾ à¤†à¤ªà¤•à¥‡ à¤¸à¤¿à¤¸à¥à¤Ÿà¤® à¤ªà¤° à¤°à¤¹à¤¤à¤¾ à¤¹à¥ˆà¥¤ à¤•à¥‹à¤ˆ à¤•à¥à¤²à¤¾à¤‰à¤¡ à¤¸à¥à¤Ÿà¥‹à¤°à¥‡à¤œ à¤¨à¤¹à¥€à¤‚à¥¤ CAs à¤•à¥‡ à¤²à¤¿à¤ à¤¬à¤¿à¤²à¥à¤•à¥à¤² à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤à¥¤"
                          : "Your data stays on your system. No cloud storage. Completely safe for CAs."}
                      </p>
                    </div>
                  </div>
                </div>
    
                <div className="bg-white border border-slate-200 p-10 rounded-[3rem] hover:border-teal-500/30 transition-all">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Split className="text-amber-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-black uppercase text-sm mb-2 tracking-widest">
                        {isHindi ? "à¤¯à¥‚à¤¨à¤¿à¤• à¤¸à¥‡à¤²à¥à¤¸ à¤¸à¥à¤ªà¥à¤²à¤¿à¤Ÿ" : "Unique Sales Split"}
                      </h3>
                      <p className="text-slate-900 text-xs leading-relaxed">
                        {isHindi 
                          ? "à¤à¤• à¤¸à¥‡à¤²à¥à¤¸ à¤‡à¤¨à¤µà¥‰à¤‡à¤¸ à¤•à¥‹ à¤•à¤ˆ à¤µà¤¾à¤‰à¤šà¤° à¤®à¥‡à¤‚ à¤‘à¤Ÿà¥‹à¤®à¥ˆà¤Ÿà¤¿à¤•à¤²à¥€ à¤¸à¥à¤ªà¥à¤²à¤¿à¤Ÿ à¤•à¤°à¥‡à¤‚à¥¤ à¤•à¥‹à¤ˆ à¤”à¤° à¤¨à¤¹à¥€à¤‚ à¤¦à¥‡à¤¤à¤¾à¥¤"
                          : "Automatically split one sales invoice into multiple vouchers. Nobody else offers this."}
                      </p>
                    </div>
                  </div>
                </div>
    
                <div className="bg-white border border-slate-200 p-10 rounded-[3rem] hover:border-teal-500/30 transition-all">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Cpu className="text-purple-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-black uppercase text-sm mb-2 tracking-widest">
                        {isHindi ? "AI-à¤ªà¤¾à¤µà¤°à¥à¤¡ à¤‘à¤Ÿà¥‹à¤®à¥‡à¤¶à¤¨" : "AI-Powered Automation"}
                      </h3>
                      <p className="text-slate-900 text-xs leading-relaxed">
                        {isHindi 
                          ? "à¤‡à¤¨à¤µà¥‰à¤‡à¤¸, à¤¬à¥ˆà¤‚à¤• à¤¸à¥à¤Ÿà¥‡à¤Ÿà¤®à¥‡à¤‚à¤Ÿ, PDF â€” à¤¸à¤¬ AI à¤ªà¤¢à¤¼à¤¤à¤¾ à¤¹à¥ˆà¥¤ à¤†à¤ª à¤¸à¤¿à¤°à¥à¤« à¤°à¤¿à¤µà¥à¤¯à¥‚ à¤•à¤°à¥‡à¤‚à¥¤"
                          : "Invoices, bank statements, PDFs â€” AI reads everything. You just review."}
                      </p>
                    </div>
                  </div>
                </div>
    
                <div className="bg-white border border-slate-200 p-10 rounded-[3rem] hover:border-teal-500/30 transition-all">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Zap className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-black uppercase text-sm mb-2 tracking-widest">
                        {isHindi ? "80x à¤¤à¥‡à¤œà¤¼" : "80x Faster"}
                      </h3>
                      <p className="text-slate-900 text-xs leading-relaxed">
                        {isHindi 
                          ? "à¤®à¥ˆà¤¨à¥à¤¯à¥à¤…à¤² à¤à¤‚à¤Ÿà¥à¤°à¥€ à¤•à¥€ à¤¤à¥à¤²à¤¨à¤¾ à¤®à¥‡à¤‚ 80 à¤—à¥à¤¨à¤¾ à¤¤à¥‡à¤œà¤¼à¥¤ à¤˜à¤‚à¤Ÿà¥‹à¤‚ à¤•à¤¾ à¤•à¤¾à¤® à¤®à¤¿à¤¨à¤Ÿà¥‹à¤‚ à¤®à¥‡à¤‚à¥¤"
                          : "80 times faster than manual entry. Hours of work in minutes."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
  );
}
