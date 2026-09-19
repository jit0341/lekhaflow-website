"use client";

import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

const faqs = [
  {
    q: "What is LekhaFlow and who is it for?",
    a: "LekhaFlow is an AI-powered desktop application that automates invoice and bank statement entry into Tally Prime. It is built specifically for Chartered Accountants, tax consultants, and MSMEs in India who process high volumes of invoices daily."
  },
  {
    q: "Is my data secure? Where is it processed?",
    a: "All invoice and bank statement processing happens locally on your Windows machine. Your PDFs and images are never uploaded to our servers. Only anonymized metadata (like invoice count) may be sent for license validation."
  },
  {
    q: "What is the difference between Standard and Gold plans?",
    a: "Standard includes Bank Statement → Tally, PDF/Image Invoice → Tally, Excel export, and Auto Ledger & Stock Creation for up to 10,000 invoices/year. Gold adds unlimited invoices, GSTR-2B Reconciliation (Coming Soon), Sales Split, Multi-Company support, and direct WhatsApp support from the founder."
  },
  {
    q: "How does the 7-day free trial work?",
    a: "Download the trial setup from our website, install it, and copy the Machine Hardware ID shown on screen. Send this ID via WhatsApp to +91-87708-08695. We will send your trial license file within 2 hours. No payment or credit card is required."
  },
  {
    q: "What happens after I pay on Razorpay?",
    a: "Once payment is confirmed, our system automatically generates your license.dat file bound to your machine ID. The license is sent to your registered email and WhatsApp number within 10 minutes with installation instructions."
  },
  {
    q: "Can I transfer my license to another computer?",
    a: "Licenses are bound to one machine ID at a time. If you need to move to a new computer, contact us on WhatsApp with your old and new machine IDs. We offer one free transfer per year."
  },
  {
    q: "What is Sales Split?",
    a: "Sales Split lets you set a Maximum Voucher Amount and calculates the resulting voucher values automatically. For example, ₹75,000 with a ₹50,000 maximum becomes ₹50,000 + ₹25,000; with a ₹30,000 maximum it becomes ₹30,000 + ₹30,000 + ₹15,000."
  },
  {
    q: "Does LekhaFlow work with Tally Prime and Tally ERP 9?",
    a: "LekhaFlow is designed to work with Tally workflows, including Tally Prime and Tally ERP 9. The workflow prepares accounting results for review and Tally integration."
  },
  {
    q: "What file formats are supported for invoice upload?",
    a: "Supported inputs include PDF invoices, scanned image files such as JPG and PNG, Excel files, and bank statements, depending on the workflow. Processing and review options are shown before the final Tally step."
  },
  {
    q: "Is there a refund policy?",
    a: "Yes. We offer a 7-day money-back guarantee from the date of license activation. If the software does not work as demonstrated or you face unsolvable technical issues, contact us for a full refund. No questions asked."
  }
];

function FAQItem({ item, isOpen, onClick }: { item: typeof faqs[0]; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border border-slate-200 rounded-[2rem] overflow-hidden bg-slate-50 hover:border-teal-500/30 transition-all">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-8 text-left"
      >
        <span className="text-slate-950 font-black text-sm uppercase tracking-widest pr-4">{item.q}</span>
        <ChevronDown
          size={20}
          className={`text-teal-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}
      >
        <p className="px-8 pb-8 text-slate-600 text-xs font-medium leading-relaxed">
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-teal-500/5 border border-teal-500/20 rounded-full mb-6">
            <MessageCircleQuestion size={14} className="text-teal-500" />
            <p className="text-teal-700 text-[10px] font-black uppercase tracking-[0.4em]">Support Center</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-950 uppercase italic tracking-tighter mb-4">
            Frequently Asked <span className="text-teal-500">Questions</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            Everything you need to know before subscribing
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <div className="mt-20 text-center bg-slate-50 border border-slate-200 rounded-[3rem] p-10">
          <h3 className="text-slate-950 font-black uppercase tracking-widest text-lg mb-3">Still have questions?</h3>
          <p className="text-slate-600 text-sm mb-6">Chat directly with the founder on WhatsApp. Average response time: 15 minutes.</p>
          <a
            href="https://wa.me/918770808695"
            target="_blank"
            className="inline-flex items-center gap-3 px-8 py-4 bg-teal-600 text-slate-950 font-black rounded-2xl uppercase text-xs tracking-widest hover:bg-teal-500 transition-all"
          >
            <MessageCircleQuestion size={16} /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}