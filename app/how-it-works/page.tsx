import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  FileUp,
  Cpu,
  Eye,
  FileSpreadsheet,
  Send,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Select Your Files",
    label: "INPUT",
    description:
      "Choose purchase invoices, sales files, bank statements, or accounting documents from your system.",
    icon: FileUp,
    output: "Accounting files",
  },
  {
    number: "02",
    title: "AI Processes the Data",
    label: "PROCESS",
    description:
      "LekhaFlow extracts the relevant information, applies the workflow rules, and prepares the accounting result.",
    icon: Cpu,
    output: "Processed entries",
  },
  {
    number: "03",
    title: "Review the Result",
    label: "CONTROL",
    description:
      "Inspect the generated result before anything reaches Tally. Pending items can be reviewed and resolved.",
    icon: Eye,
    output: "Approved result",
  },
  {
    number: "04",
    title: "Export When Needed",
    label: "OPTIONAL",
    description:
      "Use Excel export when you want a separate review, sharing, reconciliation, or approval copy.",
    icon: FileSpreadsheet,
    output: "Excel review",
  },
  {
    number: "05",
    title: "Sync to Tally",
    label: "FINAL",
    description:
      "Send the approved accounting result to the selected Tally company and complete the workflow.",
    icon: Send,
    output: "Tally entries",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white lg:px-10 lg:py-32">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-teal-500/15 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-14 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-teal-300 transition hover:text-white"
          >
            <ArrowRight size={15} className="rotate-180" />
            Back to LekhaFlow
          </Link>

          <div className="max-w-5xl">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.32em] text-teal-300">
              THE LEKHAFLOW WORKFLOW
            </p>

            <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
              From accounting files
              <span className="block text-teal-300">to Tally.</span>
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              LekhaFlow puts a review and control layer between your source
              documents and the final Tally result.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <ShieldCheck className="mb-4 text-teal-300" size={25} />
              <p className="text-sm font-black uppercase tracking-widest">
                Client-side control
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Review the processed result before final sync.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Eye className="mb-4 text-teal-300" size={25} />
              <p className="text-sm font-black uppercase tracking-widest">
                Review before Tally
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                No blind export. Inspect what will be posted.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <CheckCircle2 className="mb-4 text-teal-300" size={25} />
              <p className="text-sm font-black uppercase tracking-widest">
                Structured workflow
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Process, resolve, approve, then sync.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-teal-600">
              FIVE CLEAR STAGES
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] sm:text-5xl">
              A workflow built around review, not guesswork.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Every stage has a clear purpose. Your accounting result becomes
              visible before it reaches Tally.
            </p>
          </div>

          <div className="space-y-5">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.number}>
                  <article className="group grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl lg:grid-cols-[110px_1fr_220px]">
                    <div className="flex items-center justify-center bg-slate-950 p-6 text-4xl font-black text-white lg:text-5xl">
                      {step.number}
                    </div>

                    <div className="p-7 lg:p-9">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-teal-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-teal-700">
                          {step.label}
                        </span>
                        <Icon
                          size={22}
                          className="text-teal-600 transition group-hover:scale-110"
                        />
                      </div>

                      <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                        {step.title}
                      </h3>

                      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                        {step.description}
                      </p>
                    </div>

                    <div className="flex items-center border-t border-slate-100 bg-slate-50 p-7 lg:border-l lg:border-t-0">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                          OUTPUT
                        </p>
                        <p className="mt-2 text-sm font-black text-slate-900">
                          {step.output}
                        </p>
                      </div>
                    </div>
                  </article>

                  {index < steps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <ArrowDown className="text-teal-500" size={22} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-teal-300">
                THE KEY DIFFERENCE
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.035em] sm:text-5xl">
                Your accounting result is visible before it reaches Tally.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
                LekhaFlow is designed around the way accountants actually work:
                process the source data, inspect the result, export when needed,
                and sync only after review.
              </p>
            </div>

            <Link
              href="/downloads"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-teal-500 px-7 py-4 text-sm font-black uppercase tracking-wide text-slate-950 transition hover:bg-teal-300"
            >
              Try LekhaFlow
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}