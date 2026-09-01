"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
  ShieldCheck,
  Zap,
  MonitorCheck,
  RefreshCw,
  Upload,
  Send,
} from "lucide-react";

type ScreenshotProps = {
  src: string;
  alt: string;
  title: string;
};

function ProductScreenshot({ src, alt, title }: ScreenshotProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-slate-200 bg-slate-950 p-8 shadow-2xl">
        <div className="max-w-md text-center">
          <MonitorCheck className="mx-auto mb-5 text-teal-400" size={42} />
          <p className="text-xs font-black uppercase tracking-[0.25em] text-teal-400">
            Real LekhaFlow Interface
          </p>
          <h3 className="mt-3 text-xl font-black text-white">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Product interface screenshot will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
      <img
        src={src}
        alt={alt}
        className="block h-auto w-full"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

const content = {
  purchase: {
    eyebrow: "PURCHASE AUTOMATION",
    title: "Turn Purchase Invoices Into Tally-Ready Vouchers",
    desc:
      "Scan purchase invoices with AI, review the complete accounting result inside LekhaFlow, open the result in Excel, and sync the voucher directly to Tally.",
    screenshot: "/images/product/purchase-control-center.png",
    screenshotTitle: "Purchase AI Control Center",
    steps: [
      "Select invoice files",
      "Start AI Engine",
      "Review processed invoices",
      "Open complete voucher details",
      "Export to Excel or sync to Tally",
    ],
    benefits: [
      "AI-powered invoice processing",
      "Tally-style voucher review before export",
      "Party, GSTIN, ledger and item details visible",
      "Excel export for every processed result",
      "Direct Purchase sync to Tally",
    ],
  },

  sales: {
    eyebrow: "SALES SPLIT AUTOMATION",
    title: "Split Sales Into Tally-Ready Vouchers",
    desc:
      "Process sales invoices, apply your voucher limits, review the generated vouchers, open the result in Excel and send the final entries directly to Tally.",
    screenshot: "/images/product/sales-control-center.png",
    screenshotTitle: "Sales AI & Smart Split Hub",
    steps: [
      "Select sales files",
      "Start AI Engine",
      "Apply period and voucher limits",
      "Review generated vouchers",
      "Export to Excel or sync to Tally",
    ],
    benefits: [
      "Smart sales voucher splitting",
      "Multiple vouchers generated from sales totals",
      "Tally-style item and ledger details",
      "Complete GST and total visibility",
      "Direct Sales sync to Tally",
    ],
  },

  bank: {
    eyebrow: "BANK STATEMENT INTELLIGENCE",
    title: "From Bank PDF to Resolved Tally Entries",
    desc:
      "Import bank statements, review transactions, use SwiftAssignâ„¢ to resolve repetitive ledger assignments, export the result and send resolved entries to Tally.",
    screenshot: "/images/products/bank-intelligence.png",
    screenshotTitle: "Bank Intelligence & SwiftAssign",
    steps: [
      "Import bank statement PDF",
      "Review extracted transactions",
      "Resolve pending entries",
      "Use SwiftAssignâ„¢ for bulk grouping",
      "Export or send resolved entries to Tally",
    ],
    benefits: [
      "Bank statement import and transaction extraction",
      "Pending / resolved transaction workflow",
      "SwiftAssignâ„¢ bulk ledger assignment",
      "Transaction review before Tally",
      "Excel export and Tally sync",
    ],
  },

  reconciliation: {
    eyebrow: "GST RECONCILIATION",
    title: "Reconciliation Built Into Your Accounting Workflow",
    desc:
      "A dedicated reconciliation workspace for comparing accounting data and GST records, designed to fit naturally into the same LekhaFlow workflow.",
    screenshot: "/images/product/gstr-2b.png",
    screenshotTitle: "GSTR-2B Reconciliation",
    steps: [
      "Import reconciliation data",
      "Process and compare records",
      "Identify mismatches",
      "Review exceptions",
      "Prepare the reconciled result",
    ],
    benefits: [
      "Dedicated reconciliation workspace",
      "Exception-focused review",
      "Designed for accounting workflows",
      "Clear visibility before final action",
      "Built as part of the LekhaFlow ecosystem",
    ],
  },

  tally: {
    eyebrow: "TALLY SYNC",
    title: "Choose the Tally Company. Then Let LekhaFlow Sync.",
    desc:
      "When multiple Tally companies are open, LekhaFlow helps you identify and select the company you want to work with. Auto-Sync keeps the selected company as the working destination.",
    screenshot: "/images/product/tally-sync.png",
    screenshotTitle: "Tally Master Management Hub",
    steps: [
      "Detect open Tally companies",
      "Select the working company",
      "Fetch Tally masters",
      "Lock the working company with Auto-Sync",
      "Send Purchase, Sales or Bank results",
    ],
    benefits: [
      "Multiple open Tally companies supported",
      "Auto-Detect company workflow",
      "Fetch ledgers and stock items",
      "Auto-Sync working company",
      "Purchase, Sales and Bank workflows connect to Tally",
    ],
  },
} as const;

type ProductKey = keyof typeof content;

export default function ProductMarketingPage({
  product,
}: {
  product: ProductKey;
}) {
  const [isHindi, setIsHindi] = useState(false);
  const data = content[product];

  useEffect(() => {
    const saved = window.localStorage.getItem("lekhaflow-language");

    if (saved === "hi") {
      setIsHindi(false);
    }

    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      setIsHindi(customEvent.detail === true);
    };

    window.addEventListener("lekhaflow-language-change", handler);

    return () => {
      window.removeEventListener("lekhaflow-language-change", handler);
    };
  }, []);

  const labels = {
    review: isHindi ? "Tally à¤®à¥‡à¤‚ à¤­à¥‡à¤œà¤¨à¥‡ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤ªà¥‚à¤°à¤¾ result à¤¦à¥‡à¤–à¥‡à¤‚" : "Review before sending to Tally",
    workflow: isHindi ? "à¤¯à¤¹ à¤•à¥ˆà¤¸à¥‡ à¤•à¤¾à¤® à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ" : "How it works",
    benefits: isHindi ? "à¤®à¥à¤–à¥à¤¯ capabilities" : "Key capabilities",
    excel: isHindi ? "Excel Export à¤­à¥€ à¤‰à¤ªà¤²à¤¬à¥à¤§" : "Excel Export is included",
    cta: isHindi ? "Free Trial à¤¶à¥à¤°à¥‚ à¤•à¤°à¥‡à¤‚" : "Start Free Trial",
    talk: isHindi ? "WhatsApp à¤ªà¤° à¤¬à¤¾à¤¤ à¤•à¤°à¥‡à¤‚" : "Talk to us on WhatsApp",
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-20 text-slate-950">

      {/* HERO */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-teal-600">
              {data.eyebrow}
            </p>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
              {isHindi
                ? data.title
                : data.title}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">
              {data.desc}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/downloads"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700"
              >
                <Zap size={17} />
                {labels.cta}
                <ArrowRight size={17} />
              </Link>

              <a
                href="https://wa.me/918770808695"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-4 text-sm font-black uppercase tracking-wide text-slate-900 transition hover:border-teal-500 hover:text-teal-600"
              >
                {labels.talk}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SCREENSHOT */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-teal-600">
                Real product interface
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                See what the client actually gets.
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-500">
              <ShieldCheck size={16} className="text-teal-600" />
              Review before Tally
            </div>
          </div>

          <ProductScreenshot
            src={data.screenshot}
            alt={data.screenshotTitle}
            title={data.screenshotTitle}
          />
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-teal-600">
              {labels.workflow}
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              From file to accounting result.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-5">
            {data.steps.map((step, index) => (
              <div
                key={step}
                className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white">
                  0{index + 1}
                </div>

                <p className="text-sm font-black leading-6 text-slate-900">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEW BEFORE TALLY */}
      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-teal-400">
                {labels.review}
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                Your accounting result is visible before it reaches Tally.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">
                Clients do not have to blindly trust an export. LekhaFlow
                provides a review layer where the processed accounting result
                can be inspected before the final sync.
              </p>

              <div className="mt-8 space-y-4">
                {data.benefits.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-teal-400"
                    />
                    <span className="text-sm font-semibold leading-6 text-slate-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <FileSpreadsheet
                size={36}
                className="text-teal-400"
              />

              <h3 className="mt-6 text-2xl font-black">
                {labels.excel}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                Purchase, Sales and Bank workflows can expose the processed
                result in Excel as part of the review and export workflow.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white/5 p-4">
                  <Upload size={18} className="text-teal-400" />
                  <p className="mt-3 text-xs font-black uppercase tracking-wide">
                    Process
                  </p>
                </div>

                <div className="rounded-xl bg-white/5 p-4">
                  <Send size={18} className="text-teal-400" />
                  <p className="mt-3 text-xs font-black uppercase tracking-wide">
                    Sync
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
          <RefreshCw className="mx-auto text-teal-600" size={34} />

          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
            Ready to reduce repetitive Tally data entry?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            See the workflow with a free trial and decide from your own
            accounting files.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/downloads"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-7 py-4 text-sm font-black uppercase tracking-wide text-white hover:bg-teal-700"
            >
              {labels.cta}
              <ArrowRight size={17} />
            </Link>

            <a
              href="https://wa.me/918770808695"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-7 py-4 text-sm font-black uppercase tracking-wide text-slate-900 hover:border-teal-500 hover:text-teal-600"
            >
              {labels.talk}
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}

