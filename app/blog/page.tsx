import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, TrendingUp, Layout, Database, FileText, BookOpen, Cpu, Landmark, Receipt, Calculator } from "lucide-react";

export const metadata: Metadata = {
  title: "Accounting Insights & Tally Guides | LekhaFlow Blog",
  description: "Learn how to automate GST accounting, improve Tally efficiency, and scale your CA firm with LekhaFlow AI guides and tutorials.",
  keywords: ["Tally automation", "GST guide", "Invoice automation India", "CA firm tips", "Bank statement to Tally"],
};

const blogList = [
  { slug: "gst-invoices-to-tally-manual-vs-automation", title: "How to Convert GST Invoices into Tally – Manual vs Automation", desc: "Compare manual data entry with AI automation. Discover which method saves more time for MSMEs.", icon: Zap },
  { slug: "record-gst-entries-tally-guide", title: "Complete Guide to Recording CGST, SGST & IGST in Tally", desc: "A step-by-step tutorial on mastering GST bifurcation and ledger setup in Tally Prime.", icon: ShieldCheck },
  { slug: "ai-invoice-extraction-accuracy", title: "Why AI Invoice Extraction Beats OCR Every Time", desc: "Understand the difference between template-based OCR and modern AI parsing for accounting.", icon: Cpu },
  { slug: "tally-xml-generator-pdf-excel", title: "How to Generate Tally XML from PDF and Excel Invoices", desc: "Technical guide on converting unstructured invoice data into structured Tally import files.", icon: FileText },
  { slug: "gstr-2b-reconciliation-tally", title: "GSTR-2B Reconciliation in Tally: A Complete Workflow", desc: "How to match your purchase register with GSTR-2B data and identify mismatches automatically.", icon: Database },
  { slug: "reduce-data-entry-costs-ca-firm", title: "How CA Firms Can Reduce Data Entry Costs by 80%", desc: "Practical strategies for chartered accountants to automate clerical work and improve margins.", icon: TrendingUp },
  { slug: "tally-prime-vs-erp9-migration", title: "Tally Prime vs Tally ERP 9: Should You Migrate?", desc: "Feature comparison and migration guide for businesses still on Tally ERP 9.", icon: Layout },
  { slug: "invoice-splitting-gst-threshold", title: "Invoice Splitting Below ₹50,000: GST Compliance Guide", desc: "Understanding the legal and technical aspects of splitting invoices for GST compliance.", icon: BookOpen },
  { slug: "bank-statement-auto-entry-tally", title: "Automated Bank Statement Entry into Tally: Setup Guide", desc: "How to configure automatic bank statement imports and reconciliation in Tally.", icon: Landmark },
  { slug: "multi-company-tally-automation", title: "Managing Multiple Companies in Tally with Automation", desc: "Best practices for CA firms handling books for multiple clients using automated tools.", icon: Layout },
  { slug: "gst-return-filing-tips-july-2026", title: "GST Return Filing Tips for July 2026: Avoid Common Errors", desc: "Latest updates and practical tips for accurate GSTR-1 and GSTR-3B filing this month.", icon: Receipt },
  { slug: "choose-invoice-automation-software", title: "How to Choose the Right Invoice Automation Software in India", desc: "Evaluation criteria for MSMEs and CA firms selecting an invoice-to-Tally solution.", icon: Calculator },
];

export default function BlogIndexPage() {
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
          {blogList.map((post) => {
            const Icon = post.icon;
            return (
              <article key={post.slug} className="bg-slate-900/40 border border-slate-800 p-8 rounded-[3rem] hover:border-teal-500/50 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-teal-500/20 transition-colors">
                    <Icon className="text-teal-500" size={28} />
                  </div>
                  <h2 className="text-2xl font-black text-white leading-tight mb-4 group-hover:text-teal-400 transition-colors">{post.title}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">{post.desc}</p>
                </div>
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-3 text-teal-500 font-black text-xs uppercase tracking-widest group-hover:gap-5 transition-all">
                  Read Full Guide <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}