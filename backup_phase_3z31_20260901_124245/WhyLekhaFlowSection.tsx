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
                    {false ? "💪 क्यों चुनें लेखाफ्लो" : "💪 WHY CHOOSE LEKHAFLOW"}
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
                  {false ? "लेखाफ्लो क्यों चुनें" : "Why Choose LekhaFlow?"}
                </h2>
                <p className="text-slate-900 font-bold uppercase tracking-widest text-xs max-w-xl mx-auto">
                  {isHindi 
                    ? "AI स्पीड + डेस्कटॉप कंट्रोल + प्राइवेसी"
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
                        {false ? "100% क्लाइंट डेटा प्राइवेसी" : "100% Client Data Privacy"}
                      </h3>
                      <p className="text-slate-900 text-xs leading-relaxed">
                        {isHindi 
                          ? "आपका डेटा आपके सिस्टम पर रहता है। कोई क्लाउड स्टोरेज नहीं। CAs के लिए बिल्कुल सुरक्षित।"
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
                        {false ? "यूनिक सेल्स स्प्लिट" : "Unique Sales Split"}
                      </h3>
                      <p className="text-slate-900 text-xs leading-relaxed">
                        {isHindi 
                          ? "एक सेल्स इनवॉइस को कई वाउचर में ऑटोमैटिकली स्प्लिट करें। कोई और नहीं देता।"
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
                        {false ? "AI-पावर्ड ऑटोमेशन" : "AI-Powered Automation"}
                      </h3>
                      <p className="text-slate-900 text-xs leading-relaxed">
                        {isHindi 
                          ? "इनवॉइस, बैंक स्टेटमेंट, PDF — सब AI पढ़ता है। आप सिर्फ रिव्यू करें।"
                          : "Invoices, bank statements, PDFs — AI reads everything. You just review."}
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
                        {false ? "80x तेज़" : "80x Faster"}
                      </h3>
                      <p className="text-slate-900 text-xs leading-relaxed">
                        {isHindi 
                          ? "मैन्युअल एंट्री की तुलना में 80 गुना तेज़। घंटों का काम मिनटों में।"
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
