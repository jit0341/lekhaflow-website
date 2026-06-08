"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

const blogList = [
  { slug: "pdf-to-tally-import", title: "PDF to Tally Import: Ultimate 2026 Guide", desc: "Learn how to convert bank statements and invoices from PDF to Tally XML.", time: "8 min" },
  { slug: "invoice-to-tally-automation", title: "Invoice to Tally Automation for MSMEs", desc: "How AI-powered automation is helping small businesses scale.", time: "7 min" },
  { slug: "bulk-voucher-import-tallyprime", title: "Bulk Voucher Import in TallyPrime 5.0", desc: "Import thousands of entries into TallyPrime in one click.", time: "10 min" },
  { slug: "tally-data-entry-automation", title: "Tally Data Entry Automation Benefits", desc: "Eliminate staff dependency and human errors with AI.", time: "6 min" },
  { slug: "ai-accounting-automation", title: "The Future of AI Accounting in India", desc: "How AI is a game changer for Chartered Accountants.", time: "9 min" },
  { slug: "gst-invoice-import-to-tally", title: "GST Invoice Import: GSTR-2B Recon", desc: "Automate GST purchase entries for perfect reconciliation.", time: "12 min" },
];

export default function BlogIndex() {
  return (
    <div className="bg-[#020617] min-h-screen py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black text-white mb-16 italic uppercase tracking-tighter">Knowledge Hub</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogList.map((post) => (
            <div key={post.slug} className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] hover:border-teal-500 transition-all flex flex-col justify-between shadow-xl">
              <div>
                <BookOpen className="text-teal-500 mb-6" />
                <h2 className="text-xl font-black text-white mb-4 leading-tight">{post.title}</h2>
                <p className="text-slate-400 text-xs font-bold uppercase mb-8">{post.desc}</p>
              </div>
              <div className="flex justify-between items-center border-t border-slate-800 pt-6">
                 <span className="text-[10px] text-slate-500 font-black flex items-center gap-1 uppercase"><Clock size={12}/> {post.time}</span>
                 <Link href={`/blog/${post.slug}`} className="text-teal-500 font-black text-[10px] uppercase flex items-center gap-2 hover:gap-3 transition-all">Read Post <ArrowRight size={14} /></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}