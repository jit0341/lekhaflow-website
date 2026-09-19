"use client";

import { useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Calculator, Split } from "lucide-react";

interface SalesSplitSectionProps { isHindi: boolean; containerClass: string; }

export default function SalesSplitSection({ isHindi, containerClass }: SalesSplitSectionProps) {
  const [total, setTotal] = useState(75000);
  const [threshold, setThreshold] = useState(50000);
  const vouchers = useMemo(() => {
    const count = Math.max(1, Math.ceil(total / threshold));
    return Array.from({ length: count }, (_, i) => i < count - 1 ? threshold : total - threshold * (count - 1));
  }, [total, threshold]);

  return (
    <section id="sales-split" className="border-y border-amber-200 bg-gradient-to-b from-amber-50/70 to-white py-24">
      <div className={containerClass}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2">
            <Split size={14} className="text-amber-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-700">{isHindi ? "Sales Split" : "A practical control for sales vouchers"}</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Sales Total <span className="text-amber-500">→</span> Multiple Vouchers</h2>
          <p className="mt-5 text-base leading-7 text-slate-600">Choose the maximum voucher amount. LekhaFlow calculates the voucher count and the final remainder automatically.</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100"><Calculator size={20} className="text-amber-600" /></div>
              <div><p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Sales Total</p><p className="text-2xl font-black text-slate-950">₹{total.toLocaleString("en-IN")}</p></div>
            </div>

            <label className="mt-8 block text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Invoice Amount</label>
            <input aria-label="Sales total" type="range" min="10000" max="250000" step="5000" value={total} onChange={e => setTotal(Number(e.target.value))} className="mt-4 w-full accent-amber-500" />

            <label className="mt-8 block text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Maximum Voucher Amount</label>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[10000, 30000, 50000].map(value => (
                <button key={value} type="button" onClick={() => setThreshold(value)} className={`rounded-xl border px-3 py-3 text-xs font-black transition ${threshold === value ? "border-amber-500 bg-amber-500 text-slate-950" : "border-slate-200 bg-white text-slate-600 hover:border-amber-300"}`}>₹{value.toLocaleString("en-IN")}</button>
              ))}
            </div>
            <p className="mt-3 text-[10px] leading-5 text-slate-400">The threshold is the maximum amount allowed in one generated voucher.</p>
          </div>

          <div className="rounded-[2rem] bg-slate-950 p-7 text-white shadow-xl">
            <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-5">
              <div><p className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-400">Generated Result</p><p className="mt-2 text-3xl font-black">{vouchers.length} vouchers</p></div>
              <BadgeCheck size={25} className="text-teal-400" />
            </div>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {vouchers.map((amount, index) => (
                <div key={index} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Voucher {index + 1}</span>
                  <span className="text-sm font-black">₹{amount.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-300"><ArrowRight size={14} className="text-amber-400" /> Total remains ₹{total.toLocaleString("en-IN")}</div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-amber-200 bg-white px-5 py-4 text-center text-xs font-semibold text-slate-600">
          Example: ₹75,000 with a ₹50,000 maximum voucher amount produces <strong className="text-slate-950">₹50,000 + ₹25,000</strong>. With ₹30,000 it produces ₹30,000 + ₹30,000 + ₹15,000; with ₹10,000 it produces ₹10,000 × 7 + ₹5,000.
        </div>
      </div>
    </section>
  );
}
