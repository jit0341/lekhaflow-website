import Link from "next/link";

export default function GlobalFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-black tracking-tight text-slate-950">Lekha<span className="text-teal-600">Flow</span></Link>
            <p className="mt-3 max-w-md text-sm leading-6">Desktop accounting workflow automation for Tally users — with review and control before the final accounting step.</p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Product</p>
            <div className="mt-4 space-y-2 text-sm">
              <Link className="block hover:text-teal-700" href="/purchase">Purchase Automation</Link>
              <Link className="block hover:text-teal-700" href="/sales-split">Sales Split</Link>
              <Link className="block hover:text-teal-700" href="/bank-statement">Bank Statement</Link>
              <Link className="block hover:text-teal-700" href="/tally-sync">Tally Integration</Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Company</p>
            <div className="mt-4 space-y-2 text-sm">
              <Link className="block hover:text-teal-700" href="/">Home</Link>
              <Link className="block hover:text-teal-700" href="/pricing">Pricing</Link>
              <Link className="block hover:text-teal-700" href="/downloads">Downloads</Link>
              <Link className="block hover:text-teal-700" href="/support">Support</Link>
              <Link className="block hover:text-teal-700" href="/contact">Contact</Link>
              <Link className="block hover:text-teal-700" href="/privacy">Privacy</Link>
              <Link className="block hover:text-teal-700" href="/refund">Refund Policy</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} LekhaFlow. All rights reserved.</span>
          <span className="font-semibold text-slate-500">Built for practical Tally workflows.</span>
        </div>
      </div>
    </footer>
  );
}
