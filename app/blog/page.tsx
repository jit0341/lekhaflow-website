import React from "react";
import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, TrendingUp, Layout, Database, FileText, BookOpen } from "lucide-react";

export const metadata = {
  title: "Accounting Insights & Tally Guides",
  description: "Learn how to automate GST accounting, improve Tally efficiency, and scale your CA firm with LekhaFlow AI guides.",
};

const blogList = [
  { 
    slug: "gst-invoices-to-tally-manual-vs-automation", 
    title: "How to Convert GST Invoices into Tally – Manual vs Automation", 
    desc: "Compare manual data entry with AI automation. Discover which method saves more time for MSMEs.",
    icon: Zap 
  },
  { 
    slug: "record-gst-entries-tally-guide", 
    title: "Complete Guide to Recording CGST, SGST & IGST in Tally", 
    desc: "A step-by-step tutorial on mastering GST bifurcation and ledger setup in Tally Prime.",
    icon: ShieldCheck 
  },
  // ... अन्य पोस्ट्स यहाँ जोड़ें
];

export default function BlogIndex() {
  return (
    <div className="bg-[#020617] min-h-screen py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-6">
              LekhaFlow <span className="text-teal-500">Insights</span>
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-sm">Professional Guides for the Modern Accountant</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogList.map((post) => (
            <article key={post.slug} className="bg-slate-900/40 border border-slate-800 p-8 rounded-[3rem] hover:border-teal-500/50 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-teal-500/20 transition-colors">
                   <post.icon className="text-teal-500" size={28} />
                </div>
                <h2 className="text-2xl font-black text-white leading-tight mb-4 group-hover:text-teal-400 transition-colors">{post.title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">{post.desc}</p>
              </div>
              <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-3 text-teal-500 font-black text-xs uppercase tracking-widest group-hover:gap-5 transition-all">
                Read Full Guide <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}