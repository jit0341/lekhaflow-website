"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Zap, ShieldCheck, Clock, Calendar, Database, FileSpreadsheet } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

const POSTS_DATA: any = {
  "pdf-to-tally-import": {
    title: "PDF to Tally Import: How to save 3 hours every day",
    date: "June 10, 2026",
    readTime: "12 min",
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white uppercase italic">Step 1: The End of Manual Typing</h2>
        <p>In 2026, manual data entry is a tax on your growth. When a clerk spends 3 hours typing a 50-page bank statement into Tally Prime, the risk of decimal errors increases by 40%. LekhaFlow AI eliminates this bottleneck by converting PDFs to XML in under 3 minutes.</p>
        <h2 className="text-2xl font-black text-white uppercase italic">Why XML is superior to Excel for Tally</h2>
        <p>Excel imports often throw "Amount Mismatch" or "Referenced Master Missing" errors. LekhaFlow's XML structure is built on Tally's native schema, ensuring that HSN codes, GST rates, and ledgers are injected with 100% precision.</p>
        <div className="bg-teal-500/10 p-6 rounded-2xl border border-teal-500/20">
           <h3 className="font-black text-teal-400 mb-2">SEO Highlight:</h3>
           <p className="text-sm">Using LekhaFlow for PDF to Tally conversion ensures that your GSTR-2B reconciliation is audit-ready at all times.</p>
        </div>
      </div>
    )
  },
  "bank-statement-automation": {
    title: "Convert Bank PDF to Tally XML in 3 Minutes",
    date: "June 09, 2026",
    readTime: "10 min",
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white uppercase italic">UPI Transactions are Killing Manual Entry</h2>
        <p>The rise of digital payments means a single bank statement now has 500+ rows. For a Chartered Accountant, manual posting is no longer viable. Our Bank Statement Parser uses deep-learning to identify narrations and auto-suggest ledgers like 'CASH', 'UPI Payment', or specific vendors.</p>
        <h2 className="text-2xl font-black text-white uppercase italic">How it works: No more column matching</h2>
        <p>Unlike old parsers, LekhaFlow doesn't ask you to map columns. It reads the statement like a human eye would, finds the date, particulars, and amount, and produces a transaction.xml ready for Tally.</p>
      </div>
    )
  },
  "invoice-to-tally-automation": {
    title: "AI Invoice Automation for MSMEs in India",
    date: "June 08, 2026",
    readTime: "9 min",
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white uppercase italic">The Problem with Non-Standard Invoices</h2>
        <p>MSMEs receive bills in all formats. Hand-written, cluttered PDFs, or distorted images. LekhaFlow’s AI Engine is trained on thousands of Indian invoice formats to extract GSTIN, HSN, and Tax bifurcation (CGST/SGST/IGST) with zero failure.</p>
        <p>This automation allows small business owners to maintain clean books without hiring expensive full-time accountants.</p>
      </div>
    )
  },
  "bulk-voucher-import": {
    title: "Mastering Bulk Voucher Import in TallyPrime 5.0",
    date: "June 07, 2026",
    readTime: "15 min",
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white uppercase italic">TallyPrime 5.0 Data Migration</h2>
        <p>Importing 10,000 vouchers? TallyPrime's default Excel import is slow. LekhaFlow generates bulk XML files that Tally processes in high-speed mode. This article covers the technical structure of XML envelopes required for high-volume accounting.</p>
      </div>
    )
  },
  "tally-data-entry-automation": {
    title: "Tally Data Entry Automation: A Secret Weapon for CAs",
    date: "June 06, 2026",
    readTime: "8 min",
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white uppercase italic">CAs should consult, not type</h2>
        <p>By automating the clerical part of the job, CA firms can handle 5x more clients. This guide explains how Article Assistants can use LekhaFlow to finish a week's work in a single afternoon.</p>
      </div>
    )
  },
  "ai-accounting-future": {
    title: "The Future of AI Accounting: From Ledger to Analytics",
    date: "June 05, 2026",
    readTime: "11 min",
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white uppercase italic">Beyond Simple OCR</h2>
        <p>Artificial Intelligence isn't just about reading text; it's about predicting trends. In this post, we discuss how AI will soon auto-categorize expenses and alert businesses about potential GST mismatches before they file.</p>
      </div>
    )
  },
  "gst-reconciliation-gstr2b": {
    title: "Perfect GSTR-2B Reconciliation with LekhaFlow",
    date: "June 04, 2026",
    readTime: "13 min",
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white uppercase italic">Stop Losing ITC</h2>
        <p>Mismatches in purchase entry lead to lost Input Tax Credit. LekhaFlow ensures that every purchase bill is entered exactly as it was raised by the supplier, matching the portal data perfectly.</p>
      </div>
    )
  },
  "busy-accounting-automation": {
    title: "BUSY Software Automation: Native Data Entry Tool",
    date: "June 03, 2026",
    readTime: "7 min",
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white uppercase italic">Automation for BUSY Users</h2>
        <p>While Tally is popular, BUSY users also suffer from manual entry. LekhaFlow now supports direct XML generation for BUSY accounting software, ensuring high-speed data migration for manufacturers.</p>
      </div>
    )
  },
  "scaling-ca-firms": {
    title: "How to Scale your CA Firm with Zero Extra Hiring",
    date: "June 02, 2026",
    readTime: "10 min",
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white uppercase italic">Scaling without Overhead</h2>
        <p>Usually, more clients = more staff. Automation breaks this rule. Learn how firms in Chhattisgarh are using LekhaFlow to manage 500+ clients with a small team of 5.</p>
      </div>
    )
  },
  "digital-accounting-msme": {
    title: "Digital Transformation for Indian MSMEs: 2026 Roadmap",
    date: "June 01, 2026",
    readTime: "14 min",
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white uppercase italic">The Digital Mandate</h2>
        <p>Indian traders must go digital. This article explains the 2026 roadmap for MSMEs to adopt AI tools like LekhaFlow to remain competitive in the organized market.</p>
      </div>
    )
  },
  "human-error-bookkeeping": {
    title: "Zero Error Bookkeeping: The AI Advantage",
    date: "May 31, 2026",
    readTime: "6 min",
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white uppercase italic">The Cost of a Single Zero</h2>
        <p>One extra zero in an entry can lead to massive tax penalties. AI doesn't get tired and doesn't make typos. Discover why 'Human-in-the-loop' automation is the gold standard.</p>
      </div>
    )
  },
  "xml-import-tally-guide": {
    title: "Technical Guide: XML Voucher Structure for Tally Prime",
    date: "May 30, 2026",
    readTime: "18 min",
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white uppercase italic">Understanding Tally XML Tags</h2>
        <p>A deep dive into the XML hierarchy that LekhaFlow uses. From &lt;ENVELOPE&gt; to &lt;LEDGERENTRIES.LIST&gt;, learn how data is structured for perfect Tally injection.</p>
      </div>
    )
  }
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = POSTS_DATA[params.slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
        <div className="text-center space-y-4 px-4">
          <h1 className="text-2xl font-black uppercase tracking-tighter">Article under Revision</h1>
          <p className="text-slate-400 text-sm font-bold uppercase">This premium guide is being updated for TallyPrime 5.0 compatibility.</p>
          <Link href="/blog" className="inline-block py-3 px-8 bg-teal-600 rounded-xl text-white font-black text-xs uppercase tracking-widest">Back to Insights</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#020617] min-h-screen text-slate-300 selection:bg-teal-500 selection:text-white">
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-24">
        
        {/* Navigation */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-teal-500 font-black text-[10px] uppercase tracking-[0.2em] mb-12 hover:gap-4 transition-all">
          <ArrowLeft size={16} /> Knowledge Hub
        </Link>

        {/* Metadata */}
        <div className="flex gap-6 mb-10 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800 pb-8">
            <span className="flex items-center gap-2"><Calendar size={14} className="text-teal-500"/> {post.date}</span>
            <span className="flex items-center gap-2"><Clock size={14} className="text-teal-500"/> {post.readTime} Read</span>
            <span className="flex items-center gap-2 text-teal-400"><ShieldCheck size={14}/> Expert Verified</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-tight mb-12">
          {post.title}
        </h1>

        {/* Dynamic Content */}
        <div className="prose prose-invert prose-teal max-w-none prose-p:text-slate-400 prose-p:text-lg prose-p:leading-relaxed prose-strong:text-white prose-strong:font-black">
          {post.content}
        </div>

        {/* Professional Footer CTA */}
        <div className="mt-24 p-12 bg-slate-900 border-2 border-teal-500/20 rounded-[4rem] text-center shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-3xl -z-10"></div>
           <Zap className="mx-auto text-teal-500 mb-6 animate-pulse" size={48} />
           <h3 className="text-3xl font-black text-white uppercase mb-4 tracking-tighter">Ready to turn 3 hours into 3 minutes?</h3>
           <p className="text-slate-400 font-bold text-sm uppercase mb-10 max-w-md mx-auto leading-relaxed">Join 10,000+ CA Firms and MSMEs using LekhaFlow AI.</p>
           <button className="bg-teal-600 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-teal-500 transition-all shadow-xl active:scale-95 transform hover:-translate-y-1">
              🚀 Start Free Trial
           </button>
        </div>
      </div>
      
      <footer className="py-12 border-t border-slate-900 text-center uppercase no-print">
        <p className="text-slate-600 text-[10px] font-black tracking-[0.6em]">LekhaFlow AI | India&apos;s Premium Accounting Automation Suite</p>
      </footer>

      <WhatsAppButton />
    </div>
  );
}