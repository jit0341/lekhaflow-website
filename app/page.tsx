"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  BadgeCheck,
  Check,
  ChevronRight,
  ClipboardCheck,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  Laptop,
  LockKeyhole,
  MessageCircle,
  PlayCircle,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Split,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import SalesSplitSection from "@/components/home/SalesSplitSection";

const container = "mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8";

const modules = [
  {
    icon: ReceiptText,
    number: "01",
    title: "Purchase Automation",
    eyebrow: "PURCHASE",
    description:
      "Process purchase invoices, prepare the accounting result and review it before the final Tally step.",
    bullets: ["Invoice data extraction", "GST, item and ledger workflow", "Review before posting"],
    href: "/purchase",
    image: "/images/products/purchase-ai.png",
  },
  {
    icon: Split,
    number: "02",
    title: "Sales Split",
    eyebrow: "SALES CONTROL",
    description:
      "Set the maximum voucher amount and let LekhaFlow calculate the required vouchers and final remainder.",
    bullets: ["â‚¹10,000 / â‚¹30,000 / â‚¹50,000 thresholds", "Automatic voucher calculation", "Total preserved"],
    href: "/sales-split",
    image: "/images/products/sales-split-interface.png",
  },
  {
    icon: Banknote,
    number: "03",
    title: "Bank Statements",
    eyebrow: "BANK",
    description:
      "Process supported bank statements, validate the statement, review transactions and prepare the accounting result.",
    bullets: ["Supported Indian bank formats", "Balance validation", "SwiftAssign ledger workflow"],
    href: "/bank-statement",
    image: "/images/products/swiftassign.png",
  },
];

const capabilities = [
  { icon: ClipboardCheck, title: "Review before Tally", text: "See the prepared accounting result before the final Tally step â€” review, correct and approve what needs attention." },
  { icon: LockKeyhole, title: "Client-side control", text: "Work from a Windows desktop workflow designed to keep the review process in your working environment." },
  { icon: FileSpreadsheet, title: "Excel when you need it", text: "Create an Excel copy when you need a separate review, sharing or reconciliation file." },
  { icon: Zap, title: "Less repetitive entry", text: "Reduce repeated typing and manual preparation so your team can spend more time reviewing the accounting result." },
  { icon: FileText, title: "Multiple source formats", text: "Use the supported source formats for each workflow â€” including PDFs, images and Excel where applicable." },
  { icon: Laptop, title: "Built for Windows", text: "A Windows desktop application designed to work around your existing Tally setup â€” not replace it." },
];

const faqs = [
  {
    q: "Does LekhaFlow replace Tally?",
    a: "No. LekhaFlow is designed as a workflow automation layer around Tally. It processes source documents, prepares the accounting result and lets you review it before the final Tally step.",
  },
  {
    q: "Is LekhaFlow cloud software?",
    a: "LekhaFlow is Windows desktop software. Its workflow is designed around client-side processing and keeping control of accounting data in the client environment.",
  },
  {
    q: "What can I automate?",
    a: "The current product focuses on Purchase Automation, Sales Split and Bank Statement workflows, with review and Tally integration around the final accounting result.",
  },
  {
    q: "Can I review entries before they reach Tally?",
    a: "Yes. Review before Tally is a core product principle. You can inspect the processed result and resolve what needs attention before the final sync/posting step.",
  },
  {
    q: "Can I test LekhaFlow with my own data?",
    a: "Yes. A 7-day trial is available. Download the setup, install it on Windows and use the trial workflow with your accounting data before choosing a license.",
  },  {
    q: "Which workflows are available today?",
    a: "The current homepage focuses on Purchase Automation, Sales Split and Bank Statement workflows, with review and Tally integration around the final accounting result.",
  },
  {
    q: "Do I have to replace my existing Tally setup?",
    a: "No. LekhaFlow is designed to work around the Tally setup your team already uses, with the prepared result reviewed before the final accounting step.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-teal-700">
      <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
      {children}
    </div>
  );
}

export default function LekhaFlowLanding() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative border-b border-slate-200 bg-[radial-gradient(circle_at_50%_-10%,rgba(20,184,166,.16),transparent_42%)] pt-32 sm:pt-36">
        <div className={`${container} relative pb-20 lg:pb-24`}>
          <div className="mx-auto max-w-5xl text-center">
            <SectionLabel>Desktop accounting workflow automation for Tally</SectionLabel>
            <h1 className="mt-7 text-4xl font-black leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[4.7rem]">
              Keep Tally. <span className="text-teal-600">Automate the work around it.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              LekhaFlow helps Tally users turn repetitive purchase, sales and bank-entry work into a structured desktop workflow â€” process, review and then send the approved result to Tally.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/downloads" className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-teal-600">
                Start 7-Day Free Trial <ArrowRight size={16} />
              </Link>
              <Link href="/how-it-works" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-black text-slate-800 transition hover:border-teal-400 hover:text-teal-700">
                <PlayCircle size={16} /> See How It Works
              </Link>
              <a href="https://wa.me/8770808695?text=Hi%2C%20I%20want%20a%20LekhaFlow%20demo%20and%20pricing%20details." className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-black text-slate-600 transition hover:text-teal-700">
                <MessageCircle size={16} /> Talk to Us
              </a>
            </div>

            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                [Laptop, "Windows desktop"],
                [ClipboardCheck, "Review before Tally"],
                [ShieldCheck, "Client-side control"],
                [BadgeCheck, "7-day free trial"],
              ].map(([Icon, label]) => (
                <div key={label as string} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-3 text-xs font-bold text-slate-600 shadow-sm">
                  <Icon size={15} className="text-teal-600" /> {label as string}
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-2 shadow-[0_24px_80px_-35px_rgba(15,23,42,.28)]">
            <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600">One workflow. Multiple accounting inputs.</p>
                  <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950 sm:text-2xl">From source document to reviewed accounting result</h2>
                </div>
                <Link href="/how-it-works" className="inline-flex items-center gap-1 text-xs font-black text-teal-700">Explore workflow <ArrowRight size={14} /></Link>
              </div>
              <div className="mt-7 grid gap-3 md:grid-cols-4">
                {[
                  [FolderOpen, "1. Select", "Purchase invoices, sales files or bank statements"],
                  [Workflow, "2. Process", "LekhaFlow prepares structured accounting data"],
                  [ClipboardCheck, "3. Review", "Check the result before anything is posted"],
                  [ArrowRight, "4. Tally", "Send the approved result through the Tally workflow"],
                ].map(([Icon, title, text]) => (
                  <div key={title as string} className="relative rounded-2xl border border-slate-200 bg-white p-5">
                    <Icon size={20} className="text-teal-600" />
                    <h3 className="mt-4 text-sm font-black text-slate-900">{title as string}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{text as string}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM / POSITIONING */}
      <section className="border-b border-slate-200 bg-white py-20 lg:py-24">
        <div className={container}>
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <SectionLabel>The problem is not Tally</SectionLabel>
              <h2 className="mt-5 max-w-xl text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-4xl">
                Tally can stay. The repetitive work around Tally can change.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
                Accountants often spend valuable time moving information from PDFs, invoices, spreadsheets and bank statements into accounting entries. LekhaFlow is designed to reduce that repetitive layer while keeping the accounting result visible and reviewable.
              </p>
              <Link href="/how-it-works" className="mt-7 inline-flex items-center gap-2 text-sm font-black text-teal-700">Understand the workflow <ArrowRight size={16} /></Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Source files", "PDFs, images, Excel and supported bank statements"],
                ["Repetitive entry", "Reduce repeated typing, copying and manual calculations"],
                ["Review", "Keep the prepared result visible before the final accounting step"],
                ["Tally", "Continue using Tally as your accounting system"],
              ].map(([title, text], index) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="text-xs font-black text-teal-600">0{index + 1}</div>
                  <h3 className="mt-4 text-base font-black text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-slate-50 py-20 lg:py-24">
        <div className={container}>
          <div className="max-w-3xl">
            <SectionLabel>Core product workflows</SectionLabel>
            <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-4xl">The work around Tally, organised into three practical workflows.</h2>
            <p className="mt-5 text-base leading-7 text-slate-600">Keep the Tally setup your team already knows. Use LekhaFlow to handle repetitive document preparation, voucher calculation and bank-entry work around it.</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <article key={module.href} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl">
                  <div className="border-b border-slate-100 bg-white p-3">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                      <Image src={module.image} alt={module.title} width={900} height={520} className="h-52 w-full object-contain p-2 transition duration-500 group-hover:scale-[1.02]" />
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600">{module.eyebrow}</span>
                      <span className="text-xs font-black text-slate-300">{module.number}</span>
                    </div>
                    <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">{module.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{module.description}</p>
                    <ul className="mt-5 space-y-2.5">
                      {module.bullets.map((bullet) => <li key={bullet} className="flex gap-2 text-xs font-bold text-slate-600"><Check size={14} className="mt-0.5 shrink-0 text-teal-600" />{bullet}</li>)}
                    </ul>
                    <Link href={module.href} className="mt-7 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-teal-700">Explore {module.title} <ArrowRight size={15} /></Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SALES SPLIT */}
      <SalesSplitSection isHindi={false} containerClass={container} />

      {/* CAPABILITIES */}
      <section className="border-b border-slate-200 bg-white py-20 lg:py-24">
        <div className={container}>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Built for accountants</SectionLabel>
            <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-4xl">Built for the work that happens before Tally.</h2>
            <p className="mt-5 text-base leading-7 text-slate-600">The value is not just automation. It is a workflow your team can inspect, correct and approve before the final accounting step.</p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700"><Icon size={19} /></div><h3 className="mt-5 text-base font-black text-slate-950">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p></div>;
            })}
          </div>
        </div>
      </section>

      {/* PRIVACY / CONTROL */}
      <section className="bg-slate-950 py-20 text-white lg:py-24">
        <div className={container}>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-teal-300"><ShieldCheck size={14} /> Privacy-first desktop workflow</div>
              <h2 className="mt-6 max-w-2xl text-3xl font-black tracking-[-0.03em] sm:text-4xl">Your accounting data stays under your control.</h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">LekhaFlow is built as Windows desktop software with a client-side workflow. It is designed to avoid a cloud-storage workflow for your accounting documents and keep the review process in your working environment.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {["Desktop application", "No cloud-storage workflow", "Review before final Tally step", "Designed for confidential accounting work"].map((text) => <div key={text} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold text-slate-200"><Check size={14} className="text-teal-300" />{text}</div>)}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-300">The control layer</p>
              <div className="mt-6 space-y-3">
                {["Source document", "Processed accounting data", "Review & correction", "Approved result", "Tally workflow"].map((step, i) => <div key={step} className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-4"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10 text-xs font-black text-teal-300">0{i + 1}</span><span className="text-sm font-bold text-slate-200">{step}</span>{i < 4 && <ChevronRight size={15} className="ml-auto text-slate-500" />}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO */}
      <section className="bg-white py-20 lg:py-24">
        <div className={container}>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Made for real users</SectionLabel>
            <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-4xl">Built for the teams behind the books.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              [Users, "CA & accounting firms", "Handle recurring client documents with a structured workflow that keeps review and control at the centre."],
              [Laptop, "Businesses using Tally", "Reduce repetitive purchase, sales and bank-entry work while keeping the Tally system your team already uses."],
              [FileSpreadsheet, "Accountants & operators", "Spend less time on repetitive entry and more time reviewing the result that matters."],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof Users;
              return <div key={title as string} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-7"><I size={23} className="text-teal-600" /><h3 className="mt-5 text-lg font-black text-slate-950">{title as string}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text as string}</p></div>;
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-slate-200 bg-slate-50 py-20 lg:py-24">
        <div className={container}>
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionLabel>How it works</SectionLabel>
              <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-4xl">Process. Review. Approve. Tally.</h2>
              <p className="mt-5 text-base leading-7 text-slate-600">LekhaFlow creates a clear working layer between your source documents and the final accounting result â€” process, review, approve and complete the Tally step.</p>
              <Link href="/how-it-works" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-teal-600">See the full workflow <ArrowRight size={15} /></Link>
            </div>
            <div className="space-y-4">
              {[
                ["01", "Select your files", "Choose the purchase invoices, sales files or supported bank statements you need to process."],
                ["02", "Process the data", "LekhaFlow extracts and structures the relevant information for the selected workflow."],
                ["03", "Review the result", "Inspect the prepared entries, balances or voucher structure and resolve anything that needs attention."],
                ["04", "Export when needed", "Use Excel output where a separate review, sharing or reconciliation copy is useful."],
                ["05", "Complete the Tally step", "Send the approved result through the Tally workflow and keep your accounting system unchanged."],
              ].map(([number, title, text]) => <div key={number} className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-xs font-black text-teal-700">{number}</span><div><h3 className="text-base font-black text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div></div>)}
            </div>
          </div>
        </div>
      </section>

      {/* TRIAL CTA */}
      <section className="bg-white py-20 lg:py-24">
        <div className={container}>
          <div className="rounded-[2rem] bg-gradient-to-br from-teal-700 via-teal-600 to-slate-900 p-8 text-white shadow-xl sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-teal-100"><Sparkles size={13} /> Start with your own workflow</div>
                <h2 className="mt-5 max-w-2xl text-3xl font-black tracking-[-0.03em] sm:text-4xl">Start with the work that takes time â€” and see how LekhaFlow fits around your existing Tally workflow.</h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-teal-50/90">Download the Windows trial, test the workflow with your own accounting files and review the prepared result before choosing a license.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/downloads" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-slate-950 hover:bg-teal-50">Download Free Trial <ArrowRight size={15} /></Link>
                <Link href="/pricing" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-black text-white hover:bg-white/10">View Pricing</Link>
              </div>
            </div>
            <div className="mt-8 grid gap-3 border-t border-white/15 pt-7 sm:grid-cols-3">
              {["7-day trial", "Windows desktop", "No credit card to start"].map((text) => <div key={text} className="flex items-center gap-2 text-xs font-bold text-teal-50"><Check size={14} /> {text}</div>)}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200 bg-slate-50 py-20 lg:py-24">
        <div className={container}>
          <div className="mx-auto max-w-3xl text-center"><SectionLabel>Frequently asked</SectionLabel><h2 className="mt-5 text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-4xl">Questions before you start?</h2><p className="mt-4 text-sm leading-6 text-slate-600">The practical answers you need before trying LekhaFlow.</p></div>
          <div className="mx-auto mt-10 max-w-4xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-6">
            {faqs.map((faq) => <details key={faq.q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-black text-slate-900"><span>{faq.q}</span><ChevronRight size={17} className="shrink-0 text-slate-400 transition group-open:rotate-90" /></summary><p className="max-w-3xl pt-3 text-sm leading-6 text-slate-600">{faq.a}</p></details>)}
          </div>
          <div className="mt-8 text-center"><Link href="/faq" className="inline-flex items-center gap-2 text-sm font-black text-teal-700">View all FAQs <ArrowRight size={15} /></Link></div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white py-16">
        <div className={`${container} text-center`}>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-600">Ready when you are</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-4xl">Keep Tally. Modernise the work around it.</h2>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/downloads" className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-black text-white hover:bg-teal-600">Start Free Trial <ArrowRight size={15} /></Link><Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3.5 text-sm font-black text-slate-800 hover:border-teal-400 hover:text-teal-700">Contact LekhaFlow</Link></div>
        </div>
      </section>
    </main>
  );
}

