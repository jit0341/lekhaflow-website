import Link from "next/link";

export default function SalesSplitPage() {
  return (
    <main className="min-h-screen bg-white text-[#020617]">

      {/* HERO */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

          <div className="max-w-5xl">
            <p className="mb-6 text-sm font-black uppercase tracking-[0.35em] text-teal-600">
              SALES SPLIT AUTOMATION
            </p>

            <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              One Sales Invoice.
              <br />
              <span className="text-teal-600">
                Multiple Tally Vouchers.
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-600">
              Process a sales invoice with LekhaFlow, choose your voucher
              threshold, and let the system split the accounting result into
              separate Tally-ready vouchers before sending them to Tally.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/downloads"
                className="rounded-xl bg-teal-600 px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700"
              >
                Start Free Trial →
              </Link>

              <a
                href="https://wa.me/918770808695"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-300 bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-slate-900 transition hover:border-teal-500 hover:text-teal-700"
              >
                Talk to Us on WhatsApp
              </a>
            </div>
          </div>

          {/* VALUE STRIP */}
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Choose the threshold",
                text: "<10,000, <30,000 or <50,000",
              },
              {
                title: "Automatic voucher split",
                text: "Large sales totals become separate vouchers",
              },
              {
                title: "Review before Tally",
                text: "Inspect the generated result before sync",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="mb-3 h-2 w-12 rounded-full bg-teal-500" />
                <h2 className="text-lg font-black">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* THRESHOLD EXPLANATION */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-teal-600">
              THE KEY DIFFERENCE
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.03em] sm:text-5xl">
              You decide how the sales amount should be split.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              LekhaFlow does not treat Sales Split as ordinary invoice
              conversion. You select the voucher limit and the processed sales
              result is divided into separate vouchers according to that
              threshold.
            </p>
          </div>


          <div className="mt-14 grid gap-5 md:grid-cols-3">

            <div className="rounded-3xl border-2 border-teal-500 bg-white p-8 shadow-sm">
              <div className="text-sm font-black uppercase tracking-widest text-slate-500">
                Threshold
              </div>
              <div className="mt-3 text-4xl font-black text-teal-600">
                &lt;10,000
              </div>
              <p className="mt-4 text-slate-600">
                Sales are split into separate vouchers below the selected
                threshold.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <div className="text-sm font-black uppercase tracking-widest text-slate-500">
                Threshold
              </div>
              <div className="mt-3 text-4xl font-black">
                &lt;30,000
              </div>
              <p className="mt-4 text-slate-600">
                The same workflow can be used with a higher voucher limit.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <div className="text-sm font-black uppercase tracking-widest text-slate-500">
                Threshold
              </div>
              <div className="mt-3 text-4xl font-black">
                &lt;50,000
              </div>
              <p className="mt-4 text-slate-600">
                Choose the higher threshold when your accounting workflow
                requires it.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* REAL WORKFLOW */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-teal-600">
              HOW SALES SPLIT WORKS
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] sm:text-5xl">
              From one invoice to multiple vouchers.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              The important part is not simply reading the invoice. LekhaFlow
              processes the sales data, applies your selected threshold,
              creates the voucher result and lets you inspect it before the
              final Tally sync.
            </p>
          </div>


          <div className="mt-14 grid gap-5 md:grid-cols-5">

            {[
              ["01", "Select File", "Choose the sales invoice or files."],
              ["02", "Start AI Engine", "Process the sales documents."],
              ["03", "Choose Limit", "Select <10,000, <30,000 or <50,000."],
              ["04", "Review Vouchers", "Inspect the generated voucher rows."],
              ["05", "Sync to Tally", "Send the final result directly to Tally."],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#020617] text-sm font-black text-white">
                  {number}
                </div>

                <h3 className="mt-6 text-lg font-black">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {text}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>


      {/* PRODUCT INTERFACE */}
      <section className="bg-[#020617] text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-teal-400">
                REAL LEKHAFLOW INTERFACE
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] sm:text-5xl">
                See the split happen before Tally.
              </h2>
            </div>

            <div className="max-w-md text-base leading-7 text-slate-300">
              Select a voucher limit, process the sales file and review the
              generated vouchers before anything is sent to Tally.
            </div>

          </div>


          {/* Screenshot placeholder */}
          <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-[#0f172a] shadow-2xl">

            <div className="border-b border-white/10 px-6 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-black">
                  Sales AI & Smart Split Hub
                </span>

                <span className="rounded-lg bg-teal-500/10 px-3 py-1.5 text-xs font-bold text-teal-300">
                  &lt;10,000 selected
                </span>
              </div>
            </div>

            <div className="p-6">

              <div className="grid gap-4 sm:grid-cols-3">

                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Input
                  </div>
                  <div className="mt-2 text-lg font-black">
                    Sales Invoice
                  </div>
                </div>

                <div className="rounded-xl border border-teal-400/30 bg-teal-400/10 p-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-teal-300">
                    Rule
                  </div>
                  <div className="mt-2 text-lg font-black">
                    &lt;10,000
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Result
                  </div>
                  <div className="mt-2 text-lg font-black">
                    Multiple Vouchers
                  </div>
                </div>

              </div>


              <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
                <div className="grid grid-cols-5 border-b border-white/10 bg-white/5 px-4 py-3 text-xs font-black uppercase tracking-wide text-slate-400">
                  <span>Date</span>
                  <span>Particulars</span>
                  <span>Vch Type</span>
                  <span>Vch No.</span>
                  <span>Amount</span>
                </div>

                {[
                  ["2025-04-30", "Cash", "Sales", "1", "₹9,150.26"],
                  ["2025-04-24", "Cash", "Sales", "2", "₹9,750.75"],
                  ["2025-04-13", "Cash", "Sales", "3", "₹9,260.04"],
                  ["2025-04-24", "Cash", "Sales", "4", "₹9,234.71"],
                  ["2025-04-17", "Cash", "Sales", "5", "₹9,236.83"],
                ].map((row) => (
                  <div
                    key={row[3]}
                    className="grid grid-cols-5 border-b border-white/5 px-4 py-3 text-sm text-slate-200"
                  >
                    {row.map((cell, index) => (
                      <span key={index}>{cell}</span>
                    ))}
                  </div>
                ))}

              </div>


              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                <div className="rounded-xl bg-blue-600 px-6 py-4 text-center text-sm font-black uppercase tracking-wide">
                  📊 Open Excel
                </div>

                <div className="rounded-xl bg-emerald-600 px-6 py-4 text-center text-sm font-black uppercase tracking-wide">
                  Direct Sync Sales to Tally
                </div>

              </div>

            </div>
          </div>

          <p className="mt-5 text-sm text-slate-400">
            This section is intentionally designed to use the real
            LekhaFlow Sales interface screenshot. Replace the visual above
            with the actual product screenshot in the next asset step.
          </p>

        </div>
      </section>


      {/* REVIEW LAYER */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-teal-600">
                REVIEW BEFORE TALLY
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] sm:text-5xl">
                Tally-ready does not mean blind export.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                Every generated sales voucher can be reviewed inside the
                LekhaFlow interface before the final sync.
              </p>
            </div>


            <div className="grid gap-4 sm:grid-cols-2">

              {[
                "Voucher date",
                "Party / ledger",
                "Voucher number",
                "Debit & credit amounts",
                "Inventory / item entries",
                "GST ledger entries",
                "Narration",
                "Final voucher total",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <span className="mr-2 font-black text-teal-600">✓</span>
                  <span className="font-bold">{item}</span>
                </div>
              ))}

            </div>

          </div>

        </div>
      </section>


      {/* EXCEL + TALLY */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <div className="grid gap-6 md:grid-cols-2">

            <div className="rounded-3xl bg-blue-600 p-8 text-white lg:p-10">
              <p className="text-sm font-black uppercase tracking-widest text-blue-100">
                EXPORT
              </p>

              <h2 className="mt-4 text-3xl font-black">
                Open the result in Excel.
              </h2>

              <p className="mt-4 leading-7 text-blue-100">
                The processed sales result can also be opened in Excel,
                giving the client another convenient way to inspect or use
                the generated accounting data.
              </p>
            </div>


            <div className="rounded-3xl bg-emerald-600 p-8 text-white lg:p-10">
              <p className="text-sm font-black uppercase tracking-widest text-emerald-100">
                TALLY SYNC
              </p>

              <h2 className="mt-4 text-3xl font-black">
                Send the final result directly to Tally.
              </h2>

              <p className="mt-4 leading-7 text-emerald-100">
                Once the vouchers have been reviewed, the Direct Sync
                workflow sends the sales result to the currently selected
                Tally company.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* CTA */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-8">

          <p className="text-sm font-black uppercase tracking-[0.3em] text-teal-600">
            READY TO TRY IT?
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-[-0.03em] sm:text-5xl">
            Stop manually splitting sales vouchers.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Process a real sales file, choose your threshold, review the
            generated vouchers and see how the LekhaFlow workflow fits into
            your Tally process.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">

            <Link
              href="/downloads"
              className="rounded-xl bg-teal-600 px-8 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-teal-600/20 hover:bg-teal-700"
            >
              Start Free Trial →
            </Link>

            <a
              href="https://wa.me/918770808695"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-300 px-8 py-4 text-sm font-black uppercase tracking-wide hover:border-teal-500 hover:text-teal-700"
            >
              Talk to Us on WhatsApp
            </a>

          </div>

        </div>
      </section>

    </main>
  );
}
