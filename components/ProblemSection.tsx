"use client";

import {
  Clock3,
  AlertTriangle,
  FileSpreadsheet,
  Calculator,
  FileText,
  ArrowDown,
} from "lucide-react";
<div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
type ProblemSectionProps = {
  isHindi: boolean;
};

export default function ProblemSection({
  isHindi,
}: ProblemSectionProps) {
  return (

<section
id="problem"
className="bg-[#07131f] py-28"
>

<div className="max-w-7xl mx-auto px-6">

{/* Heading */}

<div className="text-center max-w-3xl mx-auto">

<span className="inline-flex rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-xs uppercase tracking-[0.2em] text-red-400 font-bold">

{isHindi
? "क्या अभी भी Manual Entry कर रहे हैं?"
: "Still Doing Manual Data Entry?"
}

</span>

<h2 className="mt-8 text-4xl lg:text-5xl font-black text-white leading-tight">

{isHindi
? "रोज़ 3–4 घंटे Invoice Entry में बर्बाद हो रहे हैं?"
: "Still Spending 3–4 Hours Every Day Entering Invoices?"
}

</h2>

<p className="mt-6 text-xl text-slate-300 leading-9">

{isHindi
? "अगर आपका Accountant अभी भी PDF देखकर Tally में Manual Entry कर रहा है, तो समय, पैसे और Accuracy — तीनों का नुकसान हो रहा है।"
: "If your accountant still types invoice data manually into Tally, you're losing time, money and accuracy every single day."
}

</p>

</div>

{/* Two Columns */}

<div className="grid lg:grid-cols-2 gap-14 mt-20">

{/* LEFT */}

<div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-10">

<h3 className="text-2xl font-black text-red-400 mb-8">

{isHindi
? "Manual Process"
: "Traditional Workflow"
}

</h3>

<div className="space-y-5">
              {/* Manual Workflow */}

              <div className="flex items-center gap-4">

                <FileSpreadsheet className="text-red-400" size={26} />

                <span className="text-lg text-slate-200">

                  {isHindi
                    ? "Invoice PDF डाउनलोड करें"
                    : "Download Invoice PDF"}

                </span>

              </div>

              <ArrowDown className="text-slate-500 ml-1" />

              <div className="flex items-center gap-4">

                <Calculator className="text-red-400" size={26} />

                <span className="text-lg text-slate-200">

                  {isHindi
                    ? "Tally खोलें और Voucher चुनें"
                    : "Open Tally & Select Voucher"}

                </span>

              </div>

              <ArrowDown className="text-slate-500 ml-1" />

              <div className="flex items-center gap-4">

                <FileText className="text-red-400" size={26} />

                <span className="text-lg text-slate-200">

                  {isHindi
                    ? "Invoice देखकर Manual Entry करें"
                    : "Type Every Invoice Manually"}

                </span>

              </div>

              <ArrowDown className="text-slate-500 ml-1" />

              <div className="flex items-center gap-4">

                <AlertTriangle className="text-red-400" size={26} />

                <span className="text-lg text-slate-200">

                  {isHindi
                    ? "GST एवं Calculation दोबारा Check करें"
                    : "Recheck GST & Calculations"}

                </span>

              </div>

              <ArrowDown className="text-slate-500 ml-1" />

              <div className="flex items-center gap-4">

                <Clock3 className="text-red-400" size={26} />

                <span className="text-lg text-slate-200">

                  {isHindi
                    ? "3–4 घंटे प्रतिदिन बर्बाद"
                    : "3–4 Hours Lost Every Day"}
<div className="mt-10 grid grid-cols-3 gap-4">

  <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 text-center">
      <p className="text-red-400 text-3xl font-black">3–4h</p>
      <p className="text-slate-400 text-sm">
        Manual Work
      </p>
  </div>

  <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 text-center">
      <p className="text-red-400 text-3xl font-black">100+</p>
      <p className="text-slate-400 text-sm">
        Manual Clicks
      </p>
  </div>

  <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 text-center">
      <p className="text-red-400 text-3xl font-black">High</p>
      <p className="text-slate-400 text-sm">
        Error Risk
      </p>
  </div>

</div>

                </span>

              </div>

            </div>

          </div>

          {/* RIGHT COLUMN */}

          <div className="rounded-3xl border border-teal-500/20 bg-gradient-to-br from-teal-500/10 to-slate-900 p-10">

            <h3 className="mb-8 text-2xl font-black text-teal-400">

              {isHindi
                ? "LekhaFlow Workflow"
                : "With LekhaFlow"}

            </h3>

            <div className="space-y-5">

              <div className="rounded-2xl bg-slate-900/70 p-5 border border-slate-700">

                <p className="font-bold text-white">

                  📂 {isHindi
                    ? "Invoice Folder चुनें"
                    : "Select Invoice Folder"}

                </p>

              </div>

              <ArrowDown className="text-teal-400 ml-2" />

              <div className="rounded-2xl bg-slate-900/70 p-5 border border-slate-700">

                <p className="font-bold text-white">

                  🤖 {isHindi
                    ? "AI Invoice पढ़ता है"
                    : "AI Reads Every Invoice"}

                </p>

              </div>

              <ArrowDown className="text-teal-400 ml-2" />

              <div className="rounded-2xl bg-slate-900/70 p-5 border border-slate-700">

                <p className="font-bold text-white">

                  ⚙️ {isHindi
                    ? "XML Automatically Generate"
                    : "XML Generated Automatically"}

                </p>

              </div>

              <ArrowDown className="text-teal-400 ml-2" />

              <div className="rounded-2xl bg-teal-500 text-slate-950 p-6">

                <h4 className="text-3xl font-black">

                  {isHindi
                    ? "3 मिनट"
                    : "3 Minutes"}

                </h4>

                <p className="mt-2 font-semibold">

                  {isHindi
                    ? "Tally Import के लिए Ready"
                    : "Ready to Import into Tally"}

                </p>

              </div>

            </div>

            {/* Bottom Stats */}

            <div className="grid grid-cols-3 gap-5 mt-10">

              <div className="rounded-2xl bg-slate-900/60 p-5 text-center">

                <h4 className="text-3xl font-black text-teal-400">
                  90%
                </h4>

                <p className="text-sm text-slate-400">

                  {isHindi
                    ? "Time Saved"
                    : "Time Saved"}

                </p>

              </div>

              <div className="rounded-2xl bg-slate-900/60 p-5 text-center">

                <h4 className="text-3xl font-black text-teal-400">
                  99.9%
                </h4>

                <p className="text-sm text-slate-400">

                  {isHindi
                    ? "Accuracy"
                    : "Accuracy"}

                </p>

              </div>

              <div className="rounded-2xl bg-slate-900/60 p-5 text-center">

                <h4 className="text-3xl font-black text-teal-400">
                  AI
                </h4>

                <p className="text-sm text-slate-400">

                  {isHindi
                    ? "Automation"
                    : "Automation"}

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}