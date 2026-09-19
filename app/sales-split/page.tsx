"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Calculator, CheckCircle2, FileSpreadsheet, Send, ShieldCheck } from "lucide-react";

const thresholds = [10000, 30000, 50000];

function splitAmount(total: number, threshold: number) {
  const count = Math.ceil(total / threshold);
  const result = Array.from({ length: count }, () => threshold);
  const remainder = total - threshold * (count - 1);
  result[count - 1] = remainder;
  return result;
}

export default function SalesSplitPage() {
  const [total, setTotal] = useState(75000);
  const [threshold, setThreshold] = useState(50000);
  const vouchers = useMemo(() => splitAmount(total, threshold), [total, threshold]);

  return (
    <main className="min-h-screen bg-white pt-20 text-slate-950">
      <section className="bg-white text-slate-950">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-5xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-700">SALES SPLIT</p>
            <h1 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">One sales total.<br /><span className="text-amber-700">Multiple controlled vouchers.</span></h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">Choose the Maximum Voucher Amount and LekhaFlow calculates the voucher count and final remainder for the sales workflow.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/downloads" className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-4 text-sm font-black uppercase tracking-wide text-slate-950 hover:bg-amber-300">Start Free Trial <ArrowRight size={17} /></Link>
              <a href="https://wa.me/918770808695" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-slate-50 px-6 py-4 text-sm font-black uppercase tracking-wide text-slate-950 hover:border-amber-300 hover:text-amber-700">Talk to Us on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-teal-700">REAL PRODUCT INTERFACE</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">See Sales Split inside LekhaFlow.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              This is the actual Sales AI &amp; Smart Split Hub used in the LekhaFlow desktop workflow.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-2 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.35)] sm:p-3">
            <img
              src="/images/products/sales-split-interface.png"
              alt="LekhaFlow Sales AI & Smart Split Hub real product interface"
              className="block h-auto w-full rounded-[1.35rem] border border-slate-200"
            />
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-600">LIVE WORKFLOW DEMO</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">See the split calculation instantly.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">This is the rule the page communicates: each generated voucher is capped at the selected maximum amount, with the remaining balance placed in the final voucher.</p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100"><Calculator size={20} className="text-amber-700" /></div><div><p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Sales Total</p><p className="text-2xl font-black">₹{total.toLocaleString("en-IN")}</p></div></div>
              <label className="mt-8 block text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Invoice Amount</label>
              <input aria-label="Sales total" type="range" min="10000" max="250000" step="5000" value={total} onChange={e => setTotal(Number(e.target.value))} className="mt-4 w-full accent-amber-500" />
              <div className="mt-2 flex justify-between text-[10px] font-bold text-slate-600"><span>₹10,000</span><span>₹2,50,000</span></div>
              <label className="mt-8 block text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Maximum Voucher Amount</label>
              <div className="mt-3 grid grid-cols-3 gap-2">{thresholds.map(value => <button key={value} type="button" onClick={() => setThreshold(value)} className={`rounded-xl border px-3 py-3 text-xs font-black transition ${threshold === value ? "border-amber-500 bg-amber-400 text-slate-950" : "border-slate-200 bg-white text-slate-600 hover:border-amber-300"}`}>₹{value.toLocaleString("en-IN")}</button>)}</div>
              <p className="mt-3 text-xs leading-5 text-slate-600">The selected amount is the maximum value allowed in one generated voucher.</p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 text-slate-950 shadow-sm">
              <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-5"><div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">Generated Result</p><p className="mt-2 text-3xl font-black">{vouchers.length} vouchers</p></div><ShieldCheck size={26} className="text-teal-700" /></div>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">{vouchers.map((amount, index) => <div key={`${index}-${amount}`} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"><span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Voucher {index + 1}</span><span className="text-sm font-black">₹{amount.toLocaleString("en-IN")}</span></div>)}</div>
              <div className="mt-6 rounded-xl bg-slate-100 p-4"><p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Check</p><p className="mt-1 text-sm font-black">₹{vouchers.reduce((sum, amount) => sum + amount, 0).toLocaleString("en-IN")} total generated</p></div>
            </div>
          </div>

          <div className="mx-auto mt-7 max-w-6xl rounded-2xl border border-amber-200 bg-white p-5 text-center text-sm font-semibold text-slate-700">For example, <strong className="text-slate-950">₹75,000</strong> with a <strong className="text-slate-950">₹50,000</strong> Maximum Voucher Amount produces <strong className="text-amber-700">₹50,000 + ₹25,000</strong>. With ₹30,000 it produces ₹30,000 + ₹30,000 + ₹15,000; with ₹10,000 it produces ₹10,000 × 7 + ₹5,000.</div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.28em] text-teal-600">SALES WORKFLOW</p><h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Calculate. Review. Send.</h2><p className="mt-5 text-lg leading-8 text-slate-600">Sales Split is the sales workflow in LekhaFlow — not a separate automation layer. The generated vouchers can be reviewed before the final Tally operation.</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-5">{[["01","Select sales files"],["02","Process the sales data"],["03","Choose the maximum voucher amount"],["04","Review generated vouchers"],["05","Send the approved result to Tally"]].map(([number,title]) => <div key={number} className="rounded-2xl border border-slate-200 bg-slate-50 p-6"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-black text-slate-950">{number}</div><p className="mt-5 text-sm font-black leading-6">{title}</p></div>)}</div>
        </div>
      </section>

      <section className="bg-white py-20 text-slate-950 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8"><FileSpreadsheet className="text-blue-700" size={28} /><h3 className="mt-5 text-xl font-black">Excel review</h3><p className="mt-3 text-sm leading-7 text-slate-600">Open the processed result in Excel when a separate review or working copy is useful.</p></div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8"><CheckCircle2 className="text-teal-700" size={28} /><h3 className="mt-5 text-xl font-black">Review before Tally</h3><p className="mt-3 text-sm leading-7 text-slate-600">Inspect the generated voucher result before the final sync.</p></div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8"><Send className="text-amber-700" size={28} /><h3 className="mt-5 text-xl font-black">Direct Tally workflow</h3><p className="mt-3 text-sm leading-7 text-slate-600">Send the approved sales result to the selected Tally company.</p></div>
        </div>
      </section>
    </main>
  );
}
