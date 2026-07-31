"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Minus } from "lucide-react";

export const metadata = {
  title: "FAQ | LekhaFlow",
  description: "Frequently asked questions about LekhaFlow invoice automation, pricing, installation, and support.",
};

const faqs = [
  {
    q: "What is LekhaFlow and who is it for?",
    a: "LekhaFlow is an AI-powered desktop application that automates invoice and bank statement entry into Tally Prime. It is built for Chartered Accountants, tax consultants, and MSMEs in India who process large volumes of invoices daily."
  },
  {
    q: "Does LekhaFlow work with Tally ERP 9 or only Tally Prime?",
    a: "LekhaFlow primarily supports Tally Prime. Tally ERP 9 support is available in our legacy editions. Contact us on WhatsApp if you need ERP 9 compatibility."
  },
  {
    q: "Is my data safe? Does it go to the cloud?",
    a: "Your invoice and bank statement data is processed locally on your computer. Only the AI parsing step sends image data to Google Gemini API for extraction. We do not store your financial data on our servers. Your data folder is created at D:\\lekhaflow_data or C:\\Users\\[Name]\\Documents\\lekhaflow_data."
  },
  {
    q: "What is the Machine Hardware ID and why do you need it?",
    a: "The Machine Hardware ID is a unique code generated from your computer's hardware configuration. We use it to create a cryptographically signed license.dat file that binds the software to your specific machine. This prevents unauthorized sharing."
  },
  {
    q: "How do I install the software after purchase?",
    a: "After payment, you will receive license.dat via email and WhatsApp within 2 hours. Download the setup from our website, install it, create the lekhaflow_data folder, place license.dat inside, and launch the application."
  },
  {
    q: "What happens after the 1-year subscription ends?",
    a: "The software will stop working after the license expiry date. You can renew your subscription at the prevailing rate. First 50 founding members lock their ₹7,999 price for life."
  },
  {
    q: "Can I upgrade from Standard to Gold later?",
    a: "Yes. You can upgrade anytime by paying the difference. Contact us on WhatsApp with your existing license details and we will generate a new Gold license for you."
  },
  {
    q: "What file formats are supported for invoice upload?",
    a: "LekhaFlow supports PDF, JPG, PNG, and Excel files. For bank statements, we support PDFs from all major Indian banks including SBI, HDFC, ICICI, Axis, PNB, and Bank of Baroda."
  },
  {
    q: "Does it work on Mac or Linux?",
    a: "Currently, LekhaFlow is available for Windows 10 and Windows 11 only. Mac and Linux versions are on our 2027 roadmap."
  },
  {
    q: "What if the AI makes a mistake?",
    a: "LekhaFlow generates a True Copy Excel export before pushing to Tally. You can review and edit every field. Our accuracy is 99%+ on clean scans. For handwritten or heavily distorted invoices, we recommend manual verification."
  },
  {
    q: "How is LekhaFlow different from Vyapar TaxOne?",
    a: "Vyapar TaxOne only automates bank statement entry. LekhaFlow does bank statements PLUS PDF invoice extraction, sales split, GSTR-2B reconciliation, and multi-company support — all in one tool."
  },
  {
    q: "Do you provide training or demo?",
    a: "Yes. Every new user gets a free 15-minute screen-share demo via AnyDesk or Google Meet. We also provide a 7-day free trial so you can test with your own data before buying."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-[#020617] min-h-screen py-32 px-4 text-slate-300">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-teal-500 font-black text-xs uppercase flex items-center gap-2 mb-12 hover:gap-4 transition-all">
          <ArrowLeft size={16}/> Back to Home
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">Frequently Asked Questions</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Everything you need to know before buying</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-900/60 transition-all"
              >
                <span className="text-white font-black text-sm uppercase tracking-widest pr-4">{faq.q}</span>
                {openIndex === i ? <Minus className="text-teal-500 shrink-0" size={20}/> : <Plus className="text-teal-500 shrink-0" size={20}/>}
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm mb-4">Still have questions?</p>
          <a href="https://wa.me/918770808695" className="inline-block px-8 py-4 bg-teal-600 text-white font-black rounded-2xl uppercase text-xs tracking-widest hover:bg-teal-500 transition-all">
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}