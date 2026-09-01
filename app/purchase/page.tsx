import Link from "next/link";

const workflow = [
  ["01", "Select Purchase Invoice", "Choose purchase invoices or accounting documents."],
  ["02", "Start AI Engine", "Let LekhaFlow read and process the purchase document."],
  ["03", "Build Accounting Result", "Generate the accounting result from the processed invoice."],
  ["04", "Review Before Tally", "Inspect the generated result before anything is synced."],
  ["05", "Export or Sync", "Open the result in Excel or send it directly to Tally."],
];

const reviewItems = [
  "Voucher date",
  "Supplier / party ledger",
  "Voucher number",
  "Purchase ledger",
  "Inventory / item entries",
  "GST ledger entries",
  "Debit & credit amounts",
  "Narration",
  "Final voucher total",
];

export default function PurchasePage() {
  return (
    <main className="min-h-screen bg-white text-[#020617]">

      {/* HERO */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

          <div className="max-w-5xl">

            <p className="mb-6 text-sm font-black uppercase tracking-[0.35em] text-teal-600">
              PURCHASE AUTOMATION
            </p>

            <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Turn Purchase Invoices
              <br />
              <span className="text-teal-600">
                Into Tally-Ready Vouchers.
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-600">
              Scan purchase invoices with AI, review the complete accounting
              result inside LekhaFlow, open the processed data in Excel and
              send the final voucher directly to Tally.
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
                title: "AI invoice processing",
                text: "Read purchase invoices and turn document data into accounting data.",
              },
              {
                title: "Review before Tally",
                text: "Inspect the generated accounting result before final sync.",
              },
              {
                title: "Excel + Tally",
                text: "Use Excel for review or send the final result directly to Tally.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="mb-3 h-2 w-12 rounded-full bg-teal-500" />

                <h2 className="text-lg font-black">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>


      {/* WHAT IT SOLVES */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            <div>

              <p className="text-sm font-black uppercase tracking-[0.3em] text-teal-600">
                THE PURCHASE WORKFLOW
              </p>

              <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.03em] sm:text-5xl">
                The invoice is only the beginning.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                LekhaFlow is designed to take the purchase document beyond
                simple data extraction. The processed invoice becomes a
                structured accounting result that can be checked before it
                reaches Tally.
              </p>

            </div>

            <div className="rounded-3xl bg-[#020617] p-8 text-white shadow-xl">

              <p className="text-sm font-black uppercase tracking-widest text-teal-400">
                FROM DOCUMENT TO ACCOUNTING
              </p>

              <div className="mt-7 space-y-4">

                {[
                  "Purchase invoice",
                  "AI processing",
                  "Accounting result",
                  "Review",
                  "Excel / Tally",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500 text-sm font-black text-[#020617]">
                      {index + 1}
                    </div>

                    <div className="font-bold">
                      {item}
                    </div>

                    {index < 4 && (
                      <div className="ml-auto text-slate-500">
                        →
                      </div>
                    )}
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* REAL PRODUCT INTERFACE */}
      <section className="bg-[#020617] text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <p className="text-sm font-black uppercase tracking-[0.3em] text-teal-400">
                REAL LEKHAFLOW INTERFACE
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] sm:text-5xl">
                See what the client actually gets.
              </h2>

            </div>

            <p className="max-w-md text-base leading-7 text-slate-300">
              The purchase workflow is designed around a reviewable accounting
              result — not a blind document conversion.
            </p>

          </div>


          {/* REAL SCREENSHOT SLOT */}
          <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-[#0f172a] shadow-2xl">

            <div className="border-b border-white/10 px-6 py-4">

              <div className="flex flex-wrap items-center justify-between gap-3">

                <span className="text-sm font-black">
                  Purchase AI Control Center
                </span>

                <span className="rounded-lg bg-teal-500/10 px-3 py-1.5 text-xs font-bold text-teal-300">
                  Review before Tally
                </span>

              </div>

            </div>

            <div className="bg-[#0f172a] p-4 sm:p-6">

              <div className="flex min-h-[360px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#020617]">

                <img
                  src="/images/products/purchase-ai.png"
                  alt="LekhaFlow Purchase AI Control Center"
                  className="h-auto w-full object-contain"
                />

              </div>

            </div>

          </div>

          <p className="mt-5 text-sm text-slate-400">
            Real LekhaFlow product interface — the screenshot will be used
            here to show the actual Purchase workflow to prospective clients.
          </p>

        </div>
      </section>


      {/* WORKFLOW */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-sm font-black uppercase tracking-[0.3em] text-teal-600">
              HOW PURCHASE AUTOMATION WORKS
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] sm:text-5xl">
              From purchase invoice to final accounting result.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              LekhaFlow processes the purchase document, creates the accounting
              result and gives the user an opportunity to inspect it before the
              final Tally operation.
            </p>

          </div>


          <div className="mt-14 grid gap-5 md:grid-cols-5">

            {workflow.map(([number, title, text]) => (
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
                Before the final sync, the generated purchase accounting result
                can be inspected inside LekhaFlow.
              </p>

            </div>


            <div className="grid gap-4 sm:grid-cols-2">

              {reviewItems.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <span className="mr-2 font-black text-teal-600">
                    ✓
                  </span>

                  <span className="font-bold">
                    {item}
                  </span>
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
                Open the processed result in Excel.
              </h2>

              <p className="mt-4 leading-7 text-blue-100">
                The processed purchase accounting data can also be opened in
                Excel, providing a convenient review and working format.
              </p>

            </div>


            <div className="rounded-3xl bg-emerald-600 p-8 text-white lg:p-10">

              <p className="text-sm font-black uppercase tracking-widest text-emerald-100">
                TALLY SYNC
              </p>

              <h2 className="mt-4 text-3xl font-black">
                Send the final voucher directly to Tally.
              </h2>

              <p className="mt-4 leading-7 text-emerald-100">
                Once the accounting result has been reviewed, the final
                purchase result can be sent to the selected Tally company.
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
            Stop entering purchase invoices manually.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Process a real purchase invoice, review the generated accounting
            result and see how LekhaFlow fits into your existing Tally workflow.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">

            <Link
              href="/downloads"
              className="rounded-xl bg-teal-600 px-8 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700"
            >
              Start Free Trial →
            </Link>

            <a
              href="https://wa.me/918770808695"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-300 px-8 py-4 text-sm font-black uppercase tracking-wide transition hover:border-teal-500 hover:text-teal-700"
            >
              Talk to Us on WhatsApp
            </a>

          </div>

        </div>
      </section>

    </main>
  );
}
