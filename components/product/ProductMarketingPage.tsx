"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, FileSpreadsheet, Building2, RefreshCw, Landmark, ListChecks, Send } from "lucide-react";

type ProductKey = "purchase" | "bank" | "tally" | "reconciliation";

type ProductData = {
  eyebrow: string;
  title: string;
  desc: string;
  screenshot?: string;
  screenshotAlt?: string;
  workflow: string[];
  benefits: string[];
};

const content: Record<ProductKey, ProductData> = {
  purchase: {
    eyebrow: "PURCHASE AUTOMATION",
    title: "Purchase invoices in. Accounting result out.",
    desc: "Process purchase invoices, review the generated voucher details, open the result in Excel when needed, and send the approved result to Tally.",
    screenshot: "/images/products/purchase-ai.png",
    screenshotAlt: "LekhaFlow Purchase AI Control Center",
    workflow: [
      "Select purchase invoices",
      "Process the documents",
      "Build the accounting result",
      "Review voucher details",
      "Export to Excel or sync to Tally",
    ],
    benefits: [
      "Purchase invoice processing",
      "Party, ledger, item and GST details in the review workflow",
      "Review before the final Tally operation",
      "Excel export for the processed result",
      "Direct purchase workflow to the selected Tally company",
    ],
  },
  bank: {
    eyebrow: "BANK STATEMENT INTELLIGENCE",
    title: "Turn bank statements into a controlled accounting workflow.",
    desc: "Import a bank statement, review extracted transactions, resolve pending entries with SwiftAssign, and send the resolved result to Tally.",
    screenshot: "/images/products/bank-intelligence.png",
    screenshotAlt: "LekhaFlow Bank Intelligence interface",
    workflow: [
      "Import the bank statement",
      "Extract and review transactions",
      "Resolve pending transactions",
      "Use SwiftAssign for repetitive assignments",
      "Export or send resolved entries to Tally",
    ],
    benefits: [
      "Bank statement transaction extraction",
      "Pending and resolved transaction workflow",
      "SwiftAssign bulk ledger assignment",
      "Review before posting to Tally",
      "Excel export and Tally sync workflow",
    ],
  },
  reconciliation: {
    eyebrow: "GSTR-2B RECONCILIATION · COMING SOON",
    title: "Reconciliation is being built into the LekhaFlow workflow.",
    desc: "A dedicated reconciliation workspace is planned for comparing accounting and GST records, with exception-focused review before final action.",
    workflow: [
      "Import reconciliation data",
      "Process and compare records",
      "Identify mismatches",
      "Review exceptions",
      "Prepare the reconciled result",
    ],
    benefits: [
      "Dedicated reconciliation workspace",
      "Exception-focused review",
      "Designed around accounting workflows",
      "Clear visibility before final action",
      "Status: Coming Soon",
    ],
  },
  tally: {
    eyebrow: "TALLY INTEGRATION",
    title: "Choose the Tally company. Keep the workflow moving.",
    desc: "LekhaFlow connects the processed accounting result with the Tally company you select, including company detection and master fetching for the working session.",
    workflow: [
      "Detect open Tally companies",
      "Select the working company",
      "Fetch Tally masters",
      "Keep the selected company as the working destination",
      "Send Purchase, Sales or Bank results",
    ],
    benefits: [
      "Multiple open Tally companies supported",
      "Company selection before the final operation",
      "Fetch ledgers and stock items from Tally",
      "Purchase, Sales Split and Bank workflows connect to Tally",
      "Review-first workflow before final sync",
    ],
  },
};

function ProductScreenshot({ data }: { data: ProductData }) {
  if (!data.screenshot) return null;
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-teal-700">Real product interface</p>
          <p className="mt-1 text-sm font-black text-slate-950">{data.screenshotAlt}</p>
        </div>
        <span className="hidden rounded-full bg-teal-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-teal-700 sm:inline-flex">
          Review before Tally
        </span>
      </div>
      <div className="bg-white p-3 sm:p-5">
        <img src={data.screenshot} alt={data.screenshotAlt} className="block h-auto w-full rounded-xl border border-slate-200" />
      </div>
    </div>
  );
}

function TallyPreview() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/60 sm:p-6">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-teal-600">Tally connection</p>
            <h3 className="mt-1 text-xl font-black text-slate-950">Company Selection</h3>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-emerald-700">Connected</span>
        </div>
        <div className="mt-5 space-y-3">
          {[
            ["Rajesh Mittal Rice Mills", "Working company"],
            ["Manoj Mittal Rice Mills", "Available"],
            ["Demo Company", "Available"],
          ].map(([name, status], index) => (
            <div key={name} className={`flex items-center justify-between rounded-xl border p-4 ${index === 0 ? "border-teal-300 bg-teal-50" : "border-slate-200 bg-white"}`}>
              <div className="flex items-center gap-3">
                <Building2 size={18} className={index === 0 ? "text-teal-600" : "text-slate-600"} />
                <span className="text-sm font-black text-slate-900">{name}</span>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-wide ${index === 0 ? "text-teal-700" : "text-slate-600"}`}>{status}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Masters</p>
            <p className="mt-1 text-sm font-black text-slate-900">Ledgers + Stock Items</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Destination</p>
            <p className="mt-1 text-sm font-black text-slate-900">Selected Tally Company</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductMarketingPage({ product }: { product: ProductKey }) {
  const data = content[product];
  const isTally = product === "tally";

  return (
    <main className="min-h-screen bg-white pt-20 text-slate-950">
      <section className="relative overflow-hidden bg-white text-slate-950">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-5xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-teal-700">{data.eyebrow}</p>
            <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">{data.title}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">{data.desc}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/downloads" className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 py-4 text-sm font-black uppercase tracking-wide text-slate-950 transition hover:bg-teal-300">Start Free Trial <ArrowRight size={17} /></Link>
              <a href="https://wa.me/918770808695" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-slate-50 px-6 py-4 text-sm font-black uppercase tracking-wide text-slate-950 transition hover:border-teal-300 hover:text-teal-700">Talk to Us on WhatsApp</a>
            </div>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {[
              [ShieldCheck, "Review-first", "See the accounting result before the final Tally operation."],
              [ListChecks, "Structured workflow", "Move from source file to resolved accounting data in clear stages."],
              [Send, "Tally connected", "Send the approved result to the selected Tally company."],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof ShieldCheck;
              return <div key={title as string} className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><I size={23} className="text-teal-700" /><p className="mt-4 text-sm font-black uppercase tracking-wide">{title as string}</p><p className="mt-2 text-sm leading-6 text-slate-600">{text as string}</p></div>;
            })}
          </div>
        </div>
      </section>

      {isTally ? (
        <section className="bg-slate-50 py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-teal-600">TALLY WORKING SESSION</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">The destination is explicit.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">When more than one Tally company is open, the workflow makes the working company visible before the final result is sent.</p>
              <div className="mt-7 space-y-3">
                {["Detect open companies", "Select the working company", "Fetch masters", "Keep the selected company as destination"].map(item => <div key={item} className="flex items-center gap-3 text-sm font-bold text-slate-800"><CheckCircle2 size={18} className="text-teal-600" />{item}</div>)}
              </div>
            </div>
            <TallyPreview />
          </div>
        </section>
      ) : (
        <>
          {product === "bank" && (
            <section id="swiftassign" className="bg-white py-20 sm:py-28">
              <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-600">SWIFTASSIGN™</p>
                    <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">Resolve repetitive bank entries in bulk.</h2>
                    <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">SwiftAssign groups similar bank transactions so repeated ledger assignments can be handled together, with the result still visible for review before the final Tally step.</p>
                    <div className="mt-7 space-y-3">
                      {["Group similar bank transactions", "Assign ledgers in bulk", "Review pending and resolved entries", "Apply the approved assignment to the group"].map(item => <div key={item} className="flex items-center gap-3 text-sm font-bold text-slate-800"><CheckCircle2 size={18} className="text-purple-600" />{item}</div>)}
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-200/70">
                    <img src="/images/products/swiftassign.png" alt="LekhaFlow SwiftAssign bulk ledger assignment window" className="block h-auto w-full rounded-[1.5rem]" />
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
              <ProductScreenshot data={data} />
            </div>
          </section>
        </>
      )}

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-teal-600">HOW IT WORKS</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] sm:text-5xl">A clear path from input to final result.</h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {data.workflow.map((item, index) => <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-6"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-black text-slate-950">{String(index + 1).padStart(2, "0")}</div><p className="mt-5 text-sm font-black leading-6 text-slate-900">{item}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:px-8 lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-teal-600">REVIEW BEFORE TALLY</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] sm:text-5xl">Automation with a visible control layer.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">LekhaFlow is built so the user can inspect the processed accounting result before the final sync. That keeps the workflow practical for accountants who want automation without losing control.</p>
            <Link href="/how-it-works#review" className="mt-7 inline-flex items-center gap-2 text-sm font-black text-teal-700 hover:text-teal-900">See the review workflow <ArrowRight size={16} /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {data.benefits.map(item => <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><CheckCircle2 size={19} className="text-teal-600" /><p className="mt-3 text-sm font-black leading-6 text-slate-900">{item}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><FileSpreadsheet className="text-blue-600" size={28} /><h3 className="mt-5 text-xl font-black">Excel when you need it</h3><p className="mt-3 text-sm leading-7 text-slate-600">Use the processed result in Excel as an additional review or working format.</p></div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><Landmark className="text-teal-600" size={28} /><h3 className="mt-5 text-xl font-black">Tally at the end</h3><p className="mt-3 text-sm leading-7 text-slate-600">Keep the final Tally operation after the result has been checked.</p></div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><RefreshCw className="text-amber-600" size={28} /><h3 className="mt-5 text-xl font-black">Repeatable workflow</h3><p className="mt-3 text-sm leading-7 text-slate-600">Use the same structured approach across the supported accounting workflows.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-slate-950 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-teal-700">TRY THE WORKFLOW</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">See how LekhaFlow fits around your Tally work.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">Start with the free trial and test the workflow with your own accounting files.</p>
          <Link href="/downloads" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-teal-500 px-7 py-4 text-sm font-black uppercase tracking-wide text-slate-950 hover:bg-teal-300">Start Free Trial <ArrowRight size={17} /></Link>
        </div>
      </section>
    </main>
  );
}
