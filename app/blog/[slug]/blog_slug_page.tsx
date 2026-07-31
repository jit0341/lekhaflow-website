import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Zap, ShieldCheck, TrendingUp, Layout, Database, FileText, BookOpen, Cpu, Landmark, Receipt, Calculator } from "lucide-react";

interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

const posts: Record<string, BlogPost> = {
  "gst-invoices-to-tally-manual-vs-automation": {
    title: "How to Convert GST Invoices into Tally – Manual vs Automation",
    description: "Compare manual data entry with AI automation. Discover which method saves more time for MSMEs.",
    date: "15 July 2026",
    readTime: "6 min read",
    icon: Zap,
    content: (
      <>
        <p className="mb-4">Manual GST invoice entry into Tally Prime is one of the most time-consuming tasks for Indian accountants. A typical CA firm processing 500 invoices per month spends approximately 40-50 hours on data entry alone.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">The Manual Process</h3>
        <p className="mb-4">Traditionally, accountants follow these steps: open each PDF invoice, read party name, GST number, item details, tax amounts, then manually create purchase/sales vouchers in Tally. For a single invoice with 5 items, this takes 3-5 minutes.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">The AI Automation Advantage</h3>
        <p className="mb-4">With LekhaFlow, you simply upload the PDF batch. The AI reads all invoices simultaneously, extracts GST numbers, item-wise bifurcation, and tax amounts, then generates ready-to-import Tally XML. What took 3 hours now takes 3 minutes.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">Cost Comparison</h3>
        <p>At ₹15,000/month staff cost, manual entry costs ₹3.75 per invoice. LekhaFlow brings this down to under ₹0.10 per invoice at scale — a 97% cost reduction.</p>
      </>
    ),
  },
  "record-gst-entries-tally-guide": {
    title: "Complete Guide to Recording CGST, SGST & IGST in Tally",
    description: "A step-by-step tutorial on mastering GST bifurcation and ledger setup in Tally Prime.",
    date: "18 July 2026",
    readTime: "8 min read",
    icon: ShieldCheck,
    content: (
      <>
        <p className="mb-4">Correct GST ledger setup is the foundation of accurate return filing. This guide covers CGST, SGST, and IGST recording in Tally Prime with practical examples.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">Setting Up GST Ledgers</h3>
        <p className="mb-4">Create ledgers under Duties & Taxes: CGST @ 9%, SGST @ 9%, and IGST @ 18%. For interstate purchases, use IGST. For intrastate, split equally between CGST and SGST.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">Common Mistakes to Avoid</h3>
        <p className="mb-4">Never record IGST as CGST+SGST combined. Never use the same ledger for input and output tax. Always verify HSN codes match between invoice and Tally masters.</p>
        <p>LekhaFlow automatically creates the correct tax ledgers and maps them per invoice type — eliminating human error in GST classification.</p>
      </>
    ),
  },
  "ai-invoice-extraction-accuracy": {
    title: "Why AI Invoice Extraction Beats OCR Every Time",
    description: "Understand the difference between template-based OCR and modern AI parsing for accounting.",
    date: "20 July 2026",
    readTime: "5 min read",
    icon: Cpu,
    content: (
      <>
        <p className="mb-4">Traditional OCR (Optical Character Recognition) relies on fixed templates and coordinates. If your supplier changes their invoice format even slightly, OCR breaks. AI parsing understands context.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">Template OCR Limitations</h3>
        <p className="mb-4">Template-based systems require you to define zones: "GST number is at coordinates (120, 450)." When a supplier adds a logo or changes font, extraction fails completely.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">AI Understanding Context</h3>
        <p className="mb-4">Modern AI (like Gemini Flash) reads invoices like a human. It recognizes "GSTIN" regardless of position, understands tables even without borders, and handles handwritten annotations.</p>
        <p>LekhaFlow uses AI that adapts to any invoice format without template setup — achieving 99%+ accuracy on unseen invoice layouts.</p>
      </>
    ),
  },
  "tally-xml-generator-pdf-excel": {
    title: "How to Generate Tally XML from PDF and Excel Invoices",
    description: "Technical guide on converting unstructured invoice data into structured Tally import files.",
    date: "22 July 2026",
    readTime: "7 min read",
    icon: FileText,
    content: (
      <>
        <p className="mb-4">Tally Prime accepts data via XML import format. Understanding this format helps you appreciate how automation bridges the gap between unstructured PDFs and structured accounting entries.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">The Tally XML Structure</h3>
        <p className="mb-4">Each voucher in Tally XML contains: VoucherType (Purchase/Sales), VoucherDate, PartyName, LedgerEntries (with tax splits), and InventoryEntries (item details). The XML must strictly follow Tally's schema.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">From PDF to XML Pipeline</h3>
        <p className="mb-4">LekhaFlow's pipeline: PDF → AI Text Extraction → JSON Structuring → Ledger Mapping → XML Generation → Tally Import. Each step includes validation to ensure debit equals credit.</p>
        <p>The entire process is local — your PDF never leaves your computer, and the generated XML imports directly into Tally without internet.</p>
      </>
    ),
  },
  "gstr-2b-reconciliation-tally": {
    title: "GSTR-2B Reconciliation in Tally: A Complete Workflow",
    description: "How to match your purchase register with GSTR-2B data and identify mismatches automatically.",
    date: "25 July 2026",
    readTime: "9 min read",
    icon: Database,
    content: (
      <>
        <p className="mb-4">GSTR-2B reconciliation is mandatory for claiming accurate input tax credit. Mismatches between your Tally purchase register and GST portal data can lead to denied ITC and penalties.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">The Reconciliation Challenge</h3>
        <p className="mb-4">Accountants download GSTR-2B JSON from the GST portal, then manually compare each invoice against Tally entries. A firm with 200 vendors may spend 2-3 days monthly on this task.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">Automated Reconciliation</h3>
        <p className="mb-4">LekhaFlow Gold imports your GSTR-2B JSON and automatically matches it with Tally vouchers by GSTIN, invoice number, and amount. Unmatched entries are flagged instantly with reason codes.</p>
        <p>This reduces reconciliation time from days to minutes, ensuring you never miss input credit due to data entry errors.</p>
      </>
    ),
  },
  "reduce-data-entry-costs-ca-firm": {
    title: "How CA Firms Can Reduce Data Entry Costs by 80%",
    description: "Practical strategies for chartered accountants to automate clerical work and improve margins.",
    date: "28 July 2026",
    readTime: "6 min read",
    icon: TrendingUp,
    content: (
      <>
        <p className="mb-4">Data entry is the silent profit killer in CA firms. While you charge clients for advisory and compliance, your staff spends 60% of their time on mechanical data punching.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">The True Cost of Manual Entry</h3>
        <p className="mb-4">A data entry operator costing ₹12,000/month processes ~1,500 invoices. That's ₹8 per invoice in labor cost alone. Add review time, correction time, and delayed filing penalties — the real cost exceeds ₹15 per invoice.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">Automation Strategy</h3>
        <p className="mb-4">Phase 1: Automate bank statement entry (saves 30% time). Phase 2: Automate purchase invoice entry (saves 40% time). Phase 3: Add reconciliation automation (saves 20% time).</p>
        <p>LekhaFlow handles all three phases in one tool, reducing per-invoice cost from ₹15 to under ₹1 — directly improving your firm's bottom line.</p>
      </>
    ),
  },
  "tally-prime-vs-erp9-migration": {
    title: "Tally Prime vs Tally ERP 9: Should You Migrate?",
    description: "Feature comparison and migration guide for businesses still on Tally ERP 9.",
    date: "30 July 2026",
    readTime: "5 min read",
    icon: Layout,
    content: (
      <>
        <p className="mb-4">Tally Solutions ended active support for Tally ERP 9 in 2021. While it still works, businesses on ERP 9 miss critical GST updates and security patches.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">Key Differences</h3>
        <p className="mb-4">Tally Prime offers: GoTo search, enhanced GST reports, multi-tasking, better data security, and improved XML import/export. The user interface is significantly faster.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">Migration Considerations</h3>
        <p className="mb-4">Migration is one-way and irreversible. Backup your ERP 9 data completely before migrating. Custom TDL modifications may need rewriting for Prime compatibility.</p>
        <p>LekhaFlow works with both ERP 9 and Prime, generating compatible XML for each. When you migrate, simply update your Tally version setting in LekhaFlow — no reconfiguration needed.</p>
      </>
    ),
  },
  "invoice-splitting-gst-threshold": {
    title: "Invoice Splitting Below ₹50,000: GST Compliance Guide",
    description: "Understanding the legal and technical aspects of splitting invoices for GST compliance.",
    date: "1 August 2026",
    readTime: "7 min read",
    icon: BookOpen,
    content: (
      <>
        <p className="mb-4">The ₹50,000 threshold in GST has specific implications for cash transactions and e-way bills. Understanding when and how to split invoices is crucial for compliance.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">When is Splitting Required?</h3>
        <p className="mb-4">For unregistered dealers, payments above ₹10,000 per day in cash are disallowed under Section 40A(3). For registered dealers, single invoices above ₹50,000 require e-way bills for interstate movement.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">Technical Implementation</h3>
        <p className="mb-4">LekhaFlow's Sales Split feature automatically divides large invoices into mathematically correct vouchers. A ₹75,000 invoice becomes two vouchers: ₹40,000 and ₹35,000. Tax is proportionally split, maintaining exact decimal precision.</p>
        <p>Always consult your CA before implementing splitting strategies. LekhaFlow provides the tool; your advisor provides the compliance guidance.</p>
      </>
    ),
  },
  "bank-statement-auto-entry-tally": {
    title: "Automated Bank Statement Entry into Tally: Setup Guide",
    description: "How to configure automatic bank statement imports and reconciliation in Tally.",
    date: "3 August 2026",
    readTime: "8 min read",
    icon: Landmark,
    content: (
      <>
        <p className="mb-4">Bank reconciliation is the most repetitive task in accounting. Every month, accountants manually type hundreds of transactions from PDF statements into Tally payment and receipt vouchers.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">The Traditional Workflow</h3>
        <p className="mb-4">Download PDF from net banking → Open in Adobe → Read each row → Create receipt/payment/contra voucher in Tally → Verify opening/closing balance matches. For 500 transactions, this takes 6-8 hours.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">Automated Workflow with LekhaFlow</h3>
        <p className="mb-4">Upload PDF → AI detects bank format automatically → Transactions appear in smart grid with auto-classification (Dr/Cr) → Opening/closing balance auto-validated → One-click push to Tally creates all vouchers instantly.</p>
        <p>LekhaFlow supports SBI, HDFC, ICICI, Axis, PNB, and 40+ other Indian banks with auto-format detection. New bank formats are added within 48 hours of request.</p>
      </>
    ),
  },
  "multi-company-tally-automation": {
    title: "Managing Multiple Companies in Tally with Automation",
    description: "Best practices for CA firms handling books for multiple clients using automated tools.",
    date: "5 August 2026",
    readTime: "6 min read",
    icon: Layout,
    content: (
      <>
        <p className="mb-4">CA firms managing 20-50 clients face unique challenges: different Tally companies, varying invoice formats, and client-specific ledger naming conventions.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">Company-Specific Configuration</h3>
        <p className="mb-4">LekhaFlow Gold supports multi-company profiles. Each client gets independent settings: Tally company path, ledger mapping rules, tax configurations, and invoice templates.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">Switching Between Clients</h3>
        <p className="mb-4">Switch companies in one click. All historical mappings, custom rules, and preferences are preserved per company. No need to reconfigure when switching from Client A to Client B.</p>
        <p>This feature alone saves 30 minutes per client per day for firms handling multiple Tally companies.</p>
      </>
    ),
  },
  "gst-return-filing-tips-july-2026": {
    title: "GST Return Filing Tips for July 2026: Avoid Common Errors",
    description: "Latest updates and practical tips for accurate GSTR-1 and GSTR-3B filing this month.",
    date: "7 August 2026",
    readTime: "5 min read",
    icon: Receipt,
    content: (
      <>
        <p className="mb-4">July 2026 brings updated GSTR-1 filing requirements and stricter validation on the GST portal. Here are the critical changes and how to avoid rejection.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">New Validation Rules</h3>
        <p className="mb-4">The portal now validates HSN codes at 6 digits for all B2B invoices. Invoice value mismatches between GSTR-1 and GSTR-3B now trigger automatic notices.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">Pre-Filing Checklist</h3>
        <p className="mb-4">Before filing: reconcile GSTR-2B with purchase register, verify all e-invoices are uploaded, check for missing credit notes, and validate POS for interstate B2C supplies.</p>
        <p>LekhaFlow's reconciliation module flags mismatches before you file, preventing notices and ensuring 100% compliant returns.</p>
      </>
    ),
  },
  "choose-invoice-automation-software": {
    title: "How to Choose the Right Invoice Automation Software in India",
    description: "Evaluation criteria for MSMEs and CA firms selecting an invoice-to-Tally solution.",
    date: "10 August 2026",
    readTime: "7 min read",
    icon: Calculator,
    content: (
      <>
        <p className="mb-4">With multiple invoice automation tools now available in India, choosing the right one requires evaluating beyond just price. Here is the definitive checklist.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">1. Accuracy on Your Invoices</h3>
        <p className="mb-4">Demand a trial with your actual supplier invoices. Generic accuracy claims mean nothing if the AI fails on your specific formats. LekhaFlow offers free trial with your own documents.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">2. Tally Integration Depth</h3>
        <p className="mb-4">Does the tool create vouchers directly or just export Excel? True automation pushes directly to Tally with proper ledger mapping, stock items, and tax bifurcation.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">3. Data Privacy</h3>
        <p className="mb-4">Your client data is sensitive. Ensure processing happens locally, not on cloud servers. LekhaFlow processes everything on your machine — zero cloud upload.</p>
        <h3 className="text-white font-black uppercase tracking-widest text-sm mt-8 mb-4">4. Support Quality</h3>
        <p>When the software fails during filing deadline, will you get a ticket response in 48 hours or a WhatsApp call in 15 minutes? Choose tools with founder-direct support.</p>
      </>
    ),
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) {
    return { title: "Not Found | LekhaFlow Blog" };
  }
  return {
    title: `${post.title} | LekhaFlow Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-teal-500 font-black uppercase text-xs tracking-widest hover:underline">
            ← Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  const Icon = post.icon;

  return (
    <div className="min-h-screen bg-[#020617] py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-teal-500 font-black text-xs uppercase tracking-widest mb-10 hover:gap-4 transition-all">
          <ArrowLeft size={16} /> Back to All Guides
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center">
            <Icon className="text-teal-500" size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{post.date} • {post.readTime}</p>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="prose prose-invert prose-slate max-w-none">
          <div className="text-slate-300 text-sm leading-relaxed space-y-4">
            {post.content}
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-800">
          <h3 className="text-white font-black uppercase tracking-widest text-sm mb-4">Ready to automate your accounting?</h3>
          <p className="text-slate-400 text-sm mb-6">Download LekhaFlow and process your first 50 invoices free.</p>
          <Link href="/downloads" className="inline-flex items-center gap-3 px-8 py-4 bg-teal-600 text-white font-black rounded-2xl uppercase text-xs tracking-widest hover:bg-teal-500 transition-all">
            Start Free Trial <ArrowLeft size={16} className="rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}