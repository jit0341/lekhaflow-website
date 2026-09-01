import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "LekhaFlow vs Manual Tally Data Entry",
  description:
    "Compare a manual accounting workflow with the LekhaFlow review-and-sync workflow.",
};

const rows = [
  ["Document processing", "Manual entry", "AI-assisted processing"],
  ["Voucher review before Tally", "Depends on workflow", "Built into workflow"],
  ["Excel result", "Separate manual work", "Available in workflow"],
  ["Sales splitting", "Manual", "Smart split workflow"],
  ["Bank transaction grouping", "Manual", "SwiftAssign™"],
  ["Tally destination", "Manual selection", "Tally Sync workflow"],
];

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-20">
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-6">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-teal-600">
            COMPARE THE WORKFLOW
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Less repetitive entry. More review. Faster Tally workflows.
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">
            The important difference is not just automation. It is what
            happens between receiving the document and sending the final
            accounting result to Tally.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="bg-slate-950 text-white">
                  <th className="px-6 py-5 text-sm font-black">Workflow</th>
                  <th className="px-6 py-5 text-sm font-black">Traditional</th>
                  <th className="px-6 py-5 text-sm font-black">
                    LekhaFlow
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map(([name, traditional, lekhaflow]) => (
                  <tr key={name} className="border-t border-slate-200">
                    <td className="px-6 py-5 text-sm font-black text-slate-900">
                      {name}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600">
                      {traditional}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-teal-700">
                      <span className="inline-flex items-center gap-2">
                        <Check size={16} />
                        {lekhaflow}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl px-5 text-center sm:px-6">
          <Link
            href="/downloads"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-7 py-4 text-sm font-black uppercase tracking-wide text-white hover:bg-teal-700"
          >
            Start Free Trial
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
