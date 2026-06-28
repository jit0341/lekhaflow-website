"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  Cpu,
  FileCode2,
  Clock3,
} from "lucide-react";

type HeroProps = {
  isHindi: boolean;
  triggerIntake: (type: "demo" | "quotation") => void;
};

export default function Hero({ isHindi, triggerIntake }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#020617] pt-40 pb-32">
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#061522] to-[#04111b]" />
      <div className="absolute right-0 top-0 h-[650px] w-[650px] rounded-full bg-teal-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
          {/* LEFT CONTENT */}
          <div className="relative z-20">
            <div className="inline-flex items-center rounded-full border border-teal-500/30 bg-teal-500/10 px-5 py-2">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-400">
                AI Powered Invoice Automation
              </span>
            </div>
            <h1 className="mt-8 text-5xl font-black uppercase italic leading-[1.05] text-white lg:text-6xl">
              {isHindi ? "Invoice से" : "Invoice To"}
              <span className="block text-teal-400">Tally</span>
              <span className="block">{isHindi ? "3 मिनट में" : "In 3 Minutes"}</span>
            </h1>
            <p className="mt-8 max-w-xl text-xl leading-9 text-slate-300">
              {isHindi
                ? "PDF, Image और Excel Invoice को AI की मदद से Tally XML में बदलें। Manual Data Entry, GST Calculation और Repetitive Accounting Work से छुटकारा पाएं।"
                : "Convert PDF, Image and Excel invoices into Tally XML automatically using AI. Eliminate manual data entry, GST mistakes and repetitive accounting work."}
            </p>
            <div className="mt-10 flex flex-wrap gap-5">
              <button
                onClick={() => triggerIntake("demo")}
                className="inline-flex items-center gap-3 rounded-2xl bg-teal-500 px-8 py-5 font-black uppercase text-white transition hover:bg-teal-400"
              >
                {isHindi ? "Free Demo Download" : "Download Free Demo"}
                <ArrowRight size={20} />
              </button>
              <Link
                href="#process"
                className="inline-flex items-center gap-3 rounded-2xl border border-slate-700 px-8 py-5 font-black uppercase text-white transition hover:border-teal-500"
              >
                <PlayCircle size={20} />
                {isHindi ? "कैसे काम करता है" : "Watch Process"}
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex items-center justify-center">
            <div className="relative z-20 w-full max-w-[560px] my-24">
              
              {/* Vertical Stack of Cards - Positioned Further Left and Reduced Size */}
              <div className="absolute -left-40 top-0 flex flex-col gap-4">
                <div className="flex items-center gap-2 rounded-xl border border-teal-500/30 bg-slate-900/90 px-3 py-2 backdrop-blur-xl shadow-2xl w-36">
                  <ShieldCheck className="text-teal-400 shrink-0" size={16} />
                  <p className="font-bold text-white text-[10px]">GST Ready</p>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 backdrop-blur-xl shadow-2xl w-36">
                  <Cpu className="text-violet-400 shrink-0" size={16} />
                  <p className="font-bold text-white text-[10px]">AI Processing</p>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 backdrop-blur-xl shadow-2xl w-36">
                  <FileCode2 className="text-blue-400 shrink-0" size={16} />
                  <p className="font-bold text-white text-[10px]">XML Generated</p>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-teal-500/30 bg-slate-900/90 px-3 py-2 backdrop-blur-xl shadow-2xl w-36">
                  <Clock3 className="text-teal-400 shrink-0" size={16} />
                  <p className="font-bold text-white text-[10px]">~3 Minutes</p>
                </div>
              </div>

              {/* Dashboard Image */}
              <div className="overflow-hidden rounded-[28px] border border-slate-700 bg-slate-900 shadow-[0_40px_90px_rgba(0,0,0,.45)]">
                <Image
                  src="/images/hero/abc.png"
                  alt="LekhaFlow Dashboard"
                  width={900}
                  height={650}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
<div className="absolute bottom-0 h-24 w-full bg-gradient-to-t from-[#020617] to-transparent" />