import type { Metadata } from "next";
import Link from "next/link";
import {
  FileUp,
  Cpu,
  Eye,
  FileSpreadsheet,
  Send,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How LekhaFlow Works",
  description:
    "Understand the LekhaFlow workflow from document processing to review, Excel export and Tally sync.",
};

const steps = [
  {
    icon: FileUp,
    title: "Select Your Files",
    text: "Choose purchase invoices, sales files or bank statements.",
  },
  {
    icon: Cpu,
    title: "Start the AI Engine",
    text: "LekhaFlow processes the selected accounting documents.",
  },
  {
    icon: Eye,
    title: "Review the Result",
    text: "Inspect the generated accounting result before sending it to Tally.",
  },
  {
    icon: FileSpreadsheet,
    title: "Open Excel",
    text: "Use Excel export when you want a separate view of the processed result.",
  },
  {
    icon: Send,
    title: "Sync to Tally",
    text: "Send the approved accounting result to the selected Tally company.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-20">
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-6">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-teal-600">
            THE LEKHAFlow WORKFLOW
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            From accounting documents to Tally — with a review step in between.
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">
            LekhaFlow is designed around the actual work accountants perform:
            process, inspect, export when needed, and finally sync.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-5 md:grid-cols-5">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-teal-600">
                      0{index + 1}
                    </span>
                    <Icon size={22} className="text-slate-900" />
                  </div>

                  <h2 className="mt-8 text-lg font-black">
                    {step.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/downloads"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-7 py-4 text-sm font-black uppercase tracking-wide text-white hover:bg-teal-700"
            >
              Try the Workflow
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
