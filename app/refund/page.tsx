import React from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCcw } from "lucide-react";

export const metadata = {
  title: "Refund Policy | LekhaFlow",
  description: "LekhaFlow refund policy. 7-day money-back guarantee if AI accuracy is below 95%.",
};

export default function RefundPolicy() {
  return (
    <div className="bg-[#020617] min-h-screen py-32 px-4 text-slate-300">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-teal-500 font-black text-xs uppercase flex items-center gap-2 mb-12 hover:gap-4 transition-all">
          <ArrowLeft size={16}/> Back to Home
        </Link>

        <div className="text-center mb-16">
          <RefreshCcw className="mx-auto text-teal-500 mb-6" size={48} />
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">Refund Policy</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Fair & Transparent</p>
        </div>

        <div className="space-y-12 text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-white font-black uppercase text-lg mb-4 tracking-widest">1. 7-Day Money-Back Guarantee</h2>
            <p className="mb-4">We offer a <strong className="text-slate-200">7-day full refund</strong> from the date of purchase if you are not satisfied with LekhaFlow. No questions asked. Refunds are processed within 5-7 business days to the original payment method.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase text-lg mb-4 tracking-widest">2. Accuracy Guarantee</h2>
            <p className="mb-4">If our AI extraction accuracy is below <strong className="text-slate-200">95%</strong> on your clearly scanned invoices (font size ≥10pt, no heavy watermarks), you are eligible for a full refund even after 7 days. Simply share a screen recording showing the error rate.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase text-lg mb-4 tracking-widest">3. What is Not Refundable</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Renewals after the first year (unless technical failure on our side)</li>
              <li>License activated for more than 30 days without complaint</li>
              <li>Custom development or API integration fees</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-black uppercase text-lg mb-4 tracking-widest">4. How to Request Refund</h2>
            <ol className="space-y-2 list-decimal list-inside">
              <li>Email <strong className="text-slate-200">Nexoriva.systems@gmail.com</strong> with subject "Refund Request"</li>
              <li>Include your Razorpay Payment ID and registered mobile number</li>
              <li>Refund processed within 5-7 business days</li>
            </ol>
          </section>

          <section>
            <h2 className="text-white font-black uppercase text-lg mb-4 tracking-widest">5. License Deactivation</h2>
            <p>Upon refund approval, your license.dat file will be deactivated within 24 hours. The software will revert to trial mode. You must delete the license.dat file from your lekhaflow_data folder.</p>
          </section>
        </div>
      </div>
    </div>
  );
}