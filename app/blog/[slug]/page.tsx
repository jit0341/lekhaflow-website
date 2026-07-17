import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Zap, Clock, CheckCircle2 } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

// डेटा को साफ़ करके स्ट्रक्चर किया गया है
const POSTS_DATA: any = {
  "gst-invoices-to-tally-manual-vs-automation": {
    title: "How to Convert GST Invoices into Tally – Manual vs Automation",
    metaTitle: "Manual vs Automated GST Invoice Entry in Tally | 2024 Guide",
    description: "Learn the right way to convert GST invoices into Tally. Compare manual data entry with automation to boost productivity.",
    content: (
      <>
        <section>
          <h2 className="text-3xl font-black text-white mb-6 uppercase italic">Manual Entry: The Productivity Killer</h2>
          <p className="mb-4">Every day, thousands of Indian MSMEs spend 6-8 hours typing invoice details into Tally. This manual process isn't just slow; it's prone to human errors that can lead to GST mismatches and penalties.</p>
          <div className="bg-slate-900 border-l-4 border-amber-500 p-6 my-8 rounded-r-2xl">
            <p className="italic text-slate-300">"Even an experienced Tally operator spends 3–5 minutes per invoice. AI does it in 20 seconds."</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-black text-white mb-6 uppercase italic">The Automated Workflow</h2>
          <div className="grid md:grid-cols-2 gap-6 my-10">
            {[
              { t: "Step 1", d: "Upload PDF/Image to LekhaFlow" },
              { t: "Step 2", d: "AI Extracts GSTIN, Date, Amount" },
              { t: "Step 3", d: "One-Click Tally XML Generation" },
              { t: "Step 4", d: "Instant Tally Import" }
            ].map((step, i) => (
              <div key={i} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <span className="text-teal-500 font-black text-xs uppercase">{step.t}</span>
                <p className="text-white font-bold mt-2">{step.d}</p>
              </div>
            ))}
          </div>
        </section>
      </>
    )
  },
  "record-gst-entries-tally-guide": {
    title: "How to Record GST Entries in Tally – CGST, SGST & IGST",
    metaTitle: "Mastering CGST, SGST & IGST Entries in Tally Prime",
    description: "Complete guide on recording GST purchase entries in Tally correctly to ensure 100% compliance.",
    content: (
      <>
        <h2 className="text-3xl font-black text-white mb-6 uppercase italic">Intra-State vs Inter-State</h2>
        <p className="mb-6">Understanding whether to apply CGST+SGST or IGST is crucial for accurate GSTR-3B filing. LekhaFlow automatically detects the State of Supply and maps the correct tax ledgers.</p>
        <ul className="space-y-4 mb-10">
          <li className="flex items-center gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <CheckCircle2 className="text-teal-500" /> <span>Same State: CGST + SGST</span>
          </li>
          <li className="flex items-center gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <CheckCircle2 className="text-teal-500" /> <span>Different State: IGST</span>
          </li>
        </ul>
      </>
    )
  }
};

// ✅ Dynamic SEO Meta Generation
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS_DATA[slug];
  return {
    title: post?.metaTitle || post?.title,
    description: post?.description,
  };
}

export default async function BlogPost({ params }: any) {
  const { slug } = await params;
  const post = POSTS_DATA[slug];

  if (!post) {
    return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">Article Not Found</div>;
  }

  return (
    <article className="bg-[#020617] min-h-screen py-32 px-4 selection:bg-teal-500">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="text-teal-500 font-black text-xs uppercase flex items-center gap-2 mb-12 hover:gap-4 transition-all">
          <ArrowLeft size={16}/> Back to Insights
        </Link>
        
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-teal-500/10 text-teal-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-teal-500/20">Accounting Guide</span>
            <span className="flex items-center gap-1 text-slate-500 text-[10px] font-bold uppercase"><Clock size={12}/> 5 Min Read</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight uppercase italic tracking-tighter">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-invert prose-teal max-w-none text-slate-300 text-lg leading-relaxed font-medium border-t border-slate-800 pt-16">
           {post.content}
        </div>
        
        {/* Professional CTA */}
        <div className="mt-24 p-12 bg-gradient-to-br from-slate-900 to-slate-950 rounded-[4rem] border border-teal-500/20 text-center shadow-2xl relative overflow-hidden">
           <Zap className="mx-auto text-teal-500 mb-8 animate-pulse" size={48} />
           <h3 className="text-3xl font-black text-white uppercase mb-4 tracking-tighter leading-none">Ready to Scale your Firm?</h3>
           <p className="text-slate-400 mb-10 font-bold uppercase text-[10px] tracking-widest">Join 100+ CAs using LekhaFlow for seamless Tally entry</p>
           <Link href="/" className="inline-block px-12 py-6 bg-teal-600 text-white font-black rounded-3xl uppercase text-xs tracking-widest hover:bg-teal-500 hover:scale-105 transition-all shadow-xl shadow-teal-600/20">
              Start 7-Days Free Trial
           </Link>
        </div>
      </div>
      <WhatsAppButton />
    </article>
  );
}