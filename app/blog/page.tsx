"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

const blogList = [
  { slug: "pdf-to-tally-import", title: "PDF to Tally Import: Ultimate 2026 Guide" },
  { slug: "invoice-to-tally-automation", title: "Invoice to Tally Automation for MSMEs" },
  { slug: "bulk-voucher-import", title: "Bulk Voucher Import in TallyPrime 5.0" },
  { slug: "tally-data-entry-automation", title: "Save 80% Time in Tally Data Entry" },
  { slug: "ai-accounting-future", title: "The Future of AI Accounting in India" },
  { slug: "gst-reconciliation-gstr2b", title: "Automate GSTR-2B Reconciliation in Tally" },
  { slug: "bank-statement-automation", title: "Convert Bank PDF to Tally XML Instantly" },
  { slug: "busy-accounting-automation", title: "Busy Accounting Software Data Entry Tool" },
  { slug: "scaling-ca-firms", title: "How CA Firms can Scale with Automation" },
  { slug: "digital-accounting-msme", title: "Digital Transformation for Indian Traders" },
  { slug: "human-error-bookkeeping", title: "Zero Error Bookkeeping with AI" },
  { slug: "xml-import-tally-guide", title: "Technical Guide: XML Voucher Structures" },
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
                <p className="text-slate-400 text-[10px] font-bold uppercase mb-8 leading-relaxed">{post.desc}</p>
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