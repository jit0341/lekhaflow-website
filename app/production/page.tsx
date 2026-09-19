import Link from "next/link";

const checks = [
  {
    title: "Local Processing",
    text: "Accounting documents are processed on the desktop workflow, keeping the working data under the user's control.",
  },
  {
    title: "Review Before Tally",
    text: "Results can be reviewed before the final Tally step instead of treating extraction as an invisible black box.",
  },
  {
    title: "Purchase Workflow",
    text: "Purchase invoice automation covers extraction, voucher preparation and the supporting accounting workflow.",
  },
  {
    title: "Sales Split",
    text: "Sales Split supports a Maximum Voucher Amount so voucher values can be calculated from the chosen threshold.",
  },
  {
    title: "Bank Statements",
    text: "LekhaFlow includes bank-statement parsing workflows for supported Indian bank statement formats.",
  },
  {
    title: "Tally Workflow",
    text: "The product is built around Tally workflows, with company selection and a controlled final accounting step.",
  },
  {
    title: "Keyboard Calculator",
    text: "Ctrl+N opens the built-in calculator and Ctrl+N again closes it, providing a quick calculation utility inside the workflow.",
  },
  {
    title: "Excel Export",
    text: "Structured results can be exported to Excel where the selected workflow supports it.",
  },
];

export default function ProductionPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-teal-700">
            LekhaFlow capabilities
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Built around the accounting work you actually do.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            A practical overview of the desktop workflows and utilities available
            across LekhaFlow. Availability can depend on the document format and
            selected workflow.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {checks.map((item, index) => (
            <article
              id={item.title === "Keyboard Calculator" ? "calculator" : undefined}
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-xl"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-sm font-black text-teal-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="mt-2 leading-7 text-slate-600">{item.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-12 rounded-[2rem] border border-slate-200 bg-slate-50 p-5 shadow-2xl shadow-slate-200/60 sm:p-7">
          <div className="grid items-center gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-teal-700">BUILT-IN CALCULATOR · CTRL+N</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Quick calculations without leaving LekhaFlow.</h2>
              <p className="mt-4 leading-7 text-slate-600">Press <span className="font-black text-slate-950">Ctrl+N</span> to open the built-in calculator. Press Ctrl+N again to close it and return to the accounting workflow.</p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-slate-600">
                <span className="rounded-full border border-slate-300 bg-white px-3 py-2">Open · Ctrl+N</span>
                <span className="rounded-full border border-slate-300 bg-white px-3 py-2">Close · Ctrl+N</span>
                <span className="rounded-full border border-slate-300 bg-white px-3 py-2">Enter · Result</span>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white p-2">
              <img src="/images/products/calculator.png" alt="LekhaFlow built-in calculator opened with Ctrl+N" className="block h-auto w-full rounded-xl" />
            </div>
          </div>
        </section>

        <div className="mt-12 rounded-2xl border border-teal-400/20 bg-teal-400/5 p-7">
          <h2 className="text-2xl font-bold">See the workflows</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link className="rounded-xl bg-slate-950 px-5 py-3 font-bold text-white hover:bg-teal-600" href="/purchase">Purchase Automation</Link>
            <Link className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-900 hover:border-teal-400 hover:text-teal-700" href="/sales-split">Sales Split</Link>
            <Link className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-900 hover:border-teal-400 hover:text-teal-700" href="/bank-statement">Bank Statement</Link>
            <Link className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-900 hover:border-teal-400 hover:text-teal-700" href="/tally-sync">Tally Integration</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
