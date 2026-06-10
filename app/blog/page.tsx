"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Globe } from "lucide-react";

// ✅ Type Definition to stop Vercel Errors
interface BlogPost {
  slug: string;
  title: string;
  desc: string;
  time: string;
}

const blogList: BlogPost[] = [
  { slug: "pdf-to-tally-import", title: "PDF to Tally Import: Ultimate 2026 Guide", desc: "Convert bank statements & invoices from PDF to Tally XML.", time: "12 min" },
  { slug: "invoice-to-tally-automation", title: "Invoice to Tally Automation for MSMEs", desc: "How AI-powered automation is helping small businesses scale.", time: "10 min" },
  { slug: "bulk-voucher-import", title: "Bulk Voucher Import in TallyPrime 5.0", desc: "Import thousands of entries into TallyPrime in one click.", time: "15 min" },
  { slug: "tally-data-entry-automation", title: "Tally Data Entry Automation Benefits", desc: "Eliminate staff dependency and human errors with AI.", time: "8 min" },
  { slug: "ai-accounting-future", title: "The Future of AI Accounting in India", desc: "How AI is a game changer for Chartered Accountants.", time: "11 min" },
  { slug: "gst-reconciliation-gstr2b", title: "Automate GSTR-2B Reconciliation in Tally", desc: "Automate GST purchase entries for perfect reconciliation.", time: "13 min" },
  { slug: "bank-statement-automation", title: "Convert Bank PDF to Tally XML Instantly", desc: "No more manual mapping of complex bank statements.", time: "9 min" },
  { slug: "busy-accounting-automation", title: "Busy Accounting Software Data Entry Tool", desc: "Automate entries for BUSY software users easily.", time: "7 min" },
  { slug: "scaling-ca-firms", title: "How CA Firms can Scale with Automation", desc: "Manage more clients with the same small team.", time: "10 min" },
  { slug: "digital-accounting-msme", title: "Digital Transformation for Indian Traders", desc: "Why going digital is mandatory for MSMEs in 2026.", time: "14 min" },
  { slug: "human-error-bookkeeping", title: "Zero Error Bookkeeping with AI", desc: "The cost of a single zero error and how to avoid it.", time: "6 min" },
  { slug: "xml-import-tally-guide", title: "Technical Guide: XML Voucher Structures", desc: "Understand the hierarchy of Tally XML import data.", time: "18 min" }
];

export default function BlogIndex() {
  const [isHindi, setIsHindi] = useState(false);

  return (
    <div className="bg-[#020617] min-h-screen text-slate-200">
      <nav className="fixed top-0 w-full z-[100] bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-black text-white italic">LEKHA<span className="text-teal-500">FLOW</span></Link>
          <button onClick={() => setIsHindi(!isHindi)} className="text-teal-500 border border-teal-500/30 px-3 py-1 rounded font-black text-xs">
            {isHindi ? "ENGLISH" : "हिंदी"}
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 pt-32 pb-24">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-16 italic uppercase tracking-tighter">
          {isHindi ? "नॉलेज हब" : "Knowledge Hub"}
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogList.map((post) => (
            <div key={post.slug} className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] hover:border-teal-500 transition-all flex flex-col justify-between shadow-xl group">
              <div>
                <BookOpen className="text-teal-500 mb-6 group-hover:scale-110 transition-transform" />
                <h2 className="text-xl font-black text-white mb-4 leading-tight">{post.title}</h2>
                <p className="text-slate-400 text-[10px] font-bold uppercase mb-8 leading-relaxed tracking-wider">{post.desc}</p>
              </div>
              <div className="flex justify-between items-center border-t border-slate-800 pt-6">
                 <span className="text-[10px] text-slate-500 font-black flex items-center gap-1 uppercase"><Clock size={12}/> {post.time}</span>
                 <Link href={`/blog/${post.slug}`} className="text-teal-500 font-black text-[10px] uppercase flex items-center gap-2 hover:gap-3 transition-all underline underline-offset-4">Read Article <ArrowRight size={14} /></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}