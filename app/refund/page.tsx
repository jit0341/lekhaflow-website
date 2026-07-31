import { Metadata } from "next";
import { RefreshCcw, CheckCircle2, XCircle, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund Policy | LekhaFlow",
  description: "LekhaFlow refund policy. 7-day money-back guarantee on all yearly subscriptions. No questions asked if software does not work as demonstrated.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#020617] py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-teal-500/5 border border-teal-500/20 rounded-full mb-6">
            <RefreshCcw size={14} className="text-teal-500" />
            <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.4em]">Legal</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
            Refund <span className="text-teal-500">Policy</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            Risk-free subscription with 7-day money-back guarantee
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="text-teal-500" size={24} />
              <h2 className="text-white font-black uppercase tracking-widest text-lg">Eligibility for Refund</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              You are eligible for a full refund within <strong className="text-white">7 calendar days</strong> from the date of license activation 
              if any of the following conditions are met:
            </p>
            <ul className="space-y-3 text-slate-400 text-sm leading-relaxed">
              <li className="flex items-start gap-3"><span className="text-teal-500 mt-1">•</span>The software fails to install or launch on your Windows 10/11 machine</li>
              <li className="flex items-start gap-3"><span className="text-teal-500 mt-1">•</span>AI invoice extraction accuracy is consistently below 85% on your documents</li>
              <li className="flex items-start gap-3"><span className="text-teal-500 mt-1">•</span>Bank statement auto-entry does not work with your bank's PDF format</li>
              <li className="flex items-start gap-3"><span className="text-teal-500 mt-1">•</span>The software does not perform as demonstrated in the demo video or live call</li>
            </ul>
          </section>

          <section className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10">
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="text-pink-500" size={24} />
              <h2 className="text-white font-black uppercase tracking-widest text-lg">Non-Refundable Cases</h2>
            </div>
            <ul className="space-y-3 text-slate-400 text-sm leading-relaxed">
              <li className="flex items-start gap-3"><span className="text-pink-500 mt-1">•</span>Refund request submitted after 7 days from license activation</li>
              <li className="flex items-start gap-3"><span className="text-pink-500 mt-1">•</span>License was transferred to a different machine without authorization</li>
              <li className="flex items-start gap-3"><span className="text-pink-500 mt-1">•</span>Software was modified, reverse-engineered, or used on unsupported OS</li>
              <li className="flex items-start gap-3"><span className="text-pink-500 mt-1">•</span>Change of mind after successful installation and usage beyond trial period</li>
            </ul>
          </section>

          <section className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="text-amber-500" size={24} />
              <h2 className="text-white font-black uppercase tracking-widest text-lg">Refund Process</h2>
            </div>
            <ol className="space-y-4 text-slate-400 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="bg-teal-500/10 text-teal-500 font-black text-xs px-2 py-1 rounded">1</span>
                <span>Send a refund request via WhatsApp to <strong className="text-white">+91-87708-08695</strong> or email <strong className="text-white">support@lekhaflow.in</strong> with your Razorpay payment ID.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-teal-500/10 text-teal-500 font-black text-xs px-2 py-1 rounded">2</span>
                <span>Our team will verify your license activation date and usage logs within 24 hours.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-teal-500/10 text-teal-500 font-black text-xs px-2 py-1 rounded">3</span>
                <span>Approved refunds are processed back to your original payment method (UPI, card, or bank account) within 5-7 business days.</span>
              </li>
            </ol>
          </section>

          <section className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="text-blue-500" size={24} />
              <h2 className="text-white font-black uppercase tracking-widest text-lg">Need Help Instead?</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Before requesting a refund, we encourage you to reach out. Most issues are resolved within one WhatsApp call. 
              We offer free remote support via AnyDesk to ensure the software works perfectly on your system.
            </p>
            <a
              href="https://wa.me/918770808695"
              target="_blank"
              className="inline-flex items-center gap-3 px-8 py-4 bg-teal-600 text-white font-black rounded-2xl uppercase text-xs tracking-widest hover:bg-teal-500 transition-all"
            >
              <MessageCircle size={16} /> Get Free Support
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}