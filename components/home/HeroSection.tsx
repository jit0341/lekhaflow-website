"use client";

import { ArrowRight, CheckCircle2, Cpu, Download, ShieldCheck, Split } from "lucide-react";

interface HeroSectionProps {
  setIntakeTarget: (target: "demo" | "quotation") => void;
  setShowIntakeModal: (show: boolean) => void;
  isHindi: boolean;
  containerClass: string;
}

export default function HeroSection({ isHindi, containerClass, setIntakeTarget, setShowIntakeModal }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pb-20 pt-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_50%_15%,rgba(20,184,166,0.11),transparent_62%)]" />
      <div className={containerClass + " relative z-10"}>
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-teal-700">{isHindi ? "टैली के आसपास स्मार्ट अकाउंटिंग वर्कफ़्लो" : "SMART ACCOUNTING AUTOMATION FOR TALLY"}</span>
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-7xl">
            {isHindi ? <>टैली वही। <span className="italic text-teal-600">दोहराया जाने वाला काम</span> ऑटोमेटेड।</> : <>Tally stays. <span className="italic text-teal-600">Manual accounting work</span> gets automated.</>}
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            {isHindi ? "Purchase invoices, Sales Split और Bank Statements को process करें, result को review करें और final entries Tally तक पहुँचाएँ।" : "Process Purchase Invoices, Sales Split and Bank Statements, review the result, then send the final accounting work to Tally."}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-bold text-slate-600">
            <span className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-teal-600" /> Client-side data control</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-teal-600" /> Review before Tally</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-amber-500" /> Threshold-based Sales Split</span>
          </div>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/downloads" className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-7 py-4 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-teal-600/20 transition hover:-translate-y-0.5 hover:bg-teal-700">
              <Download size={16} /> Download Free Trial
            </a>
            <a href="#sales-split" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 text-xs font-black uppercase tracking-wider text-slate-900 transition hover:border-teal-400 hover:text-teal-700">
              See Sales Split <ArrowRight size={16} />
            </a>
            <button onClick={() => { setIntakeTarget("demo"); setShowIntakeModal(true); }} className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-7 py-4 text-xs font-black uppercase tracking-wider text-white transition hover:bg-slate-800">Get a Demo</button>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-6xl">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-2 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.45)]">
            <img src="/bank-intelligence.png" alt="LekhaFlow Bank Intelligence Dashboard" className="h-auto w-full rounded-[1.5rem] object-cover" />
          </div>
          <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Bank Statement Intelligence · Real product interface</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-4">
          {[
            ["01", "Purchase", "Invoice processing"],
            ["02", "Sales Split", "Voucher control"],
            ["03", "Bank", "Statement intelligence"],
            ["04", "Tally", "Final sync"],
          ].map(([n, title, desc]) => (
            <div key={n} className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-left">
              <span className="text-[9px] font-black tracking-[0.2em] text-teal-600">{n}</span>
              <p className="mt-2 text-sm font-black text-slate-900">{title}</p>
              <p className="mt-1 text-[10px] font-medium text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
