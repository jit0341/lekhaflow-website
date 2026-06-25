"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, FileText, Zap, ShieldCheck, Database, Layout, TrendingUp } from "lucide-react";

// 🚀 12 Blogs Metadata
const blogList = [
  { slug: "gst-invoices-to-tally-manual-vs-automation", title: "How to Convert GST Invoices into Tally – Manual vs Automation", icon: Zap },
  { slug: "record-gst-entries-tally-guide", title: "How to Record GST Entries in Tally – CGST, SGST & IGST", icon: ShieldCheck },
  { slug: "high-volume-invoice-processing-best-practices", title: "Best Practices for Processing High-Volume Invoices", icon: TrendingUp },
  { slug: "tallyprime-vs-tally-erp9", title: "TallyPrime vs Tally ERP 9 – Which is Right for You?", icon: Layout },
  { slug: "accounting-automation-for-msmes", title: "Why Accounting Automation is Essential for MSMEs", icon: Database },
  { slug: "pdf-invoice-data-extraction-methods", title: "PDF Invoice Extraction – Manual vs AI Methods", icon: FileText },
  { slug: "ca-role-software-implementation", title: "Role of CAs in Accounting Software Implementation", icon: BookOpen },
  { slug: "bank-reconciliation-tally-guide", title: "Bank Reconciliation in Tally – Step-by-Step Guide", icon: ShieldCheck },
  { slug: "invoice-deduplication-prevention", title: "Invoice Deduplication – Prevent Duplicate Entries", icon: Zap },
  { slug: "cloud-vs-desktop-accounting-msme", title: "Cloud vs Desktop Accounting for Indian MSMEs", icon: Layout },
  { slug: "technology-in-gst-compliance", title: "The Role of Technology in GST Compliance", icon: Database },
  { slug: "accounting-automation-roi-guide", title: "How Much Time Automation Saves? – ROI Guide", icon: TrendingUp },
];

export default function BlogIndex() {
  return (
    <div className="bg-[#020617] min-h-screen py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-4">LekhaFlow Insights</h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Professional Guides for Modern Accountants</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogList.map((post) => (
            <div key={post.slug} className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] hover:border-teal-500 transition-all flex flex-col justify-between group shadow-xl">
              <div>
                <post.icon className="text-teal-500 mb-6 group-hover:scale-110 transition-transform" />
                <h2 className="text-lg font-black text-white leading-tight mb-6">{post.title}</h2>
              </div>
              <Link href={`/blog/${post.slug}`} className="flex items-center gap-2 text-teal-500 font-black text-[10px] uppercase tracking-widest hover:gap-4 transition-all">
                Read Article <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}