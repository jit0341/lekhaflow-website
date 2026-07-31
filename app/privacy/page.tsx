import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | LekhaFlow",
  description: "LekhaFlow privacy policy. Your invoice data never leaves your computer. Zero-retention local processing.",
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#020617] min-h-screen py-32 px-4 text-slate-300">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-teal-500 font-black text-xs uppercase flex items-center gap-2 mb-12 hover:gap-4 transition-all">
          <ArrowLeft size={16}/> Back to Home
        </Link>

        <div className="text-center mb-16">
          <ShieldCheck className="mx-auto text-teal-500 mb-6" size={48} />
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">Privacy Policy</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Last Updated: July 31, 2026</p>
        </div>

        <div className="space-y-12 text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-white font-black uppercase text-lg mb-4 tracking-widest">1. Zero Data Retention Promise</h2>
            <p className="mb-4">LekhaFlow is a desktop application that processes all invoice and bank statement data locally on your computer. <strong className="text-slate-200">We do not store, transmit, or retain any of your financial data on our servers.</strong> The only data sent to our servers is your Machine Hardware ID (for license verification) and payment information (processed securely via Razorpay).</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase text-lg mb-4 tracking-widest">2. What Data We Collect</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong className="text-slate-200">License Information:</strong> Machine Hardware ID, registered email, and mobile number for license activation.</li>
              <li><strong className="text-slate-200">Payment Data:</strong> Processed entirely by Razorpay. We do not store card details, UPI IDs, or bank information.</li>
              <li><strong className="text-slate-200">Usage Analytics:</strong> Anonymous software version and error logs (no invoice content).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-black uppercase text-lg mb-4 tracking-widest">3. AI Processing & Data Security</h2>
            <p className="mb-4">LekhaFlow uses Google Gemini AI for invoice parsing. When you process invoices, the image/PDF data is sent to Google's API for extraction. We use Gemini Flash 2.5 which does not retain your data for model training. All processing follows Google's enterprise data handling policies.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase text-lg mb-4 tracking-widest">4. Data Storage Locations</h2>
            <p className="mb-4">Your data is stored in two places only:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong className="text-slate-200">Local Computer:</strong> D:\lekhaflow_data or C:\Users\[Name]\Documents\lekhaflow_data</li>
              <li><strong className="text-slate-200">Tally Database:</strong> Your existing Tally data folder</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-black uppercase text-lg mb-4 tracking-widest">5. Contact Us</h2>
            <p>For privacy concerns, email <a href="mailto:Nexoriva.systems@gmail.com" className="text-teal-500 hover:underline">Nexoriva.systems@gmail.com</a> or WhatsApp <a href="https://wa.me/918770808695" className="text-teal-500 hover:underline">+91-8770808695</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}