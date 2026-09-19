"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  FileText,
  Landmark,
  Menu,
  ReceiptText,
  Sparkles,
  X,
} from "lucide-react";

const coreWorkflows = [
  { number: "01", name: "Purchase Automation", href: "/purchase", desc: "Turn purchase invoices into reviewable accounting results.", icon: ReceiptText },
  { number: "02", name: "Sales Split", href: "/sales-split", desc: "Control maximum voucher amounts and split sales accordingly.", icon: FileText },
  { number: "03", name: "Bank Statements", href: "/bank-statement", desc: "Process, validate and review supported bank statements.", icon: Landmark },
];

const controlLinks = [
  { name: "Review Before Tally", href: "/how-it-works#review", desc: "Check the prepared result before the final accounting step." },
  { name: "Tally Integration", href: "/tally-sync", desc: "Complete the approved result through the Tally workflow." },
];

const capabilities = [
  { name: "SwiftAssign", href: "/bank-statement#swiftassign" },
  { name: "Excel Export", href: "/how-it-works#export" },
  { name: "UOM / Dozen Handling", href: "/purchase#uom" },
  { name: "Built-in Calculator Â· Ctrl+N", href: "/production#calculator" },
];

const mainLinks = [
  { name: "Home", href: "/" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Pricing", href: "/pricing" },
  { name: "Partners", href: "/partner" },
  { name: "Downloads", href: "/downloads" },
  { name: "Insights", href: "/blog" },
  { name: "Support", href: "/support" },
  { name: "Contact", href: "/contact" },
  { name: "Admin", href: "/admin-login" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const closeMobile = () => { setMobileOpen(false); setProductOpen(false); };

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
        <Link href="/" onClick={closeMobile} className="flex shrink-0 items-center gap-2">
          <img src="/logo.png" alt="LekhaFlow" className="h-9 w-9 object-contain" />
          <span className="text-2xl font-black tracking-tight text-slate-950">LEKHA</span>
          <span className="text-2xl font-black tracking-tight text-teal-600">FLOW</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <div className="relative" onMouseEnter={() => setProductOpen(true)} onMouseLeave={() => setProductOpen(false)}>
            <button type="button" onClick={() => setProductOpen(!productOpen)} aria-expanded={productOpen} aria-haspopup="true" className="flex items-center gap-1.5 text-sm font-bold text-slate-700 transition-colors hover:text-teal-600">
              Product <ChevronDown size={15} className={productOpen ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>

            {productOpen && (
              <div className="absolute left-0 top-full pt-4">
                <div className="w-[760px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
                  <div className="mb-4 flex items-end justify-between gap-6 px-1">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-teal-600">The LekhaFlow Product</p>
                      <p className="mt-1 text-sm leading-5 text-slate-500">Choose a workflow first. Explore supporting capabilities only when you need them.</p>
                    </div>
                    <Link href="/how-it-works" className="hidden shrink-0 items-center gap-1 text-xs font-black text-teal-700 transition hover:text-teal-800 sm:flex">See how it works <ArrowRight size={13} /></Link>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <p className="px-1 pb-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Core workflows</p>
                    <div className="grid grid-cols-3 gap-2">
                      {coreWorkflows.map((product) => {
                        const Icon = product.icon;
                        return (
                          <Link key={product.href} href={product.href} className="group rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 transition hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50/50">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-teal-600 shadow-sm ring-1 ring-slate-100"><Icon size={16} /></div>
                              <span className="text-[9px] font-black tracking-wider text-slate-300 group-hover:text-teal-500">{product.number}</span>
                            </div>
                            <p className="mt-3 text-sm font-black text-slate-900 group-hover:text-teal-700">{product.name}</p>
                            <p className="mt-1.5 text-[10px] leading-4 text-slate-500">{product.desc}</p>
                            <div className="mt-3 flex items-center gap-1 text-[10px] font-black text-slate-400 group-hover:text-teal-600">Explore <ArrowRight size={12} className="transition group-hover:translate-x-0.5" /></div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                    <div>
                      <p className="px-1 pb-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Control & integration</p>
                      <div className="grid gap-1.5">
                        {controlLinks.map((item) => (
                          <Link key={item.href} href={item.href} className="group rounded-xl border border-transparent px-3 py-2.5 transition hover:border-slate-200 hover:bg-slate-50">
                            <div className="flex items-center justify-between gap-2"><span className="text-xs font-black text-slate-800 group-hover:text-teal-700">{item.name}</span><ArrowRight size={12} className="text-slate-300 group-hover:text-teal-600" /></div>
                            <p className="mt-0.5 text-[10px] leading-4 text-slate-500">{item.desc}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="px-1 pb-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Built-in capabilities</p>
                      <div className="grid grid-cols-2 gap-1">
                        {capabilities.map((item) => (
                          <Link key={item.href} href={item.href} className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50 hover:text-teal-600">
                            <CheckCircle2 size={12} className="shrink-0 text-teal-500" />{item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link href="/reconciliation" className="mt-4 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/70 px-3.5 py-2.5 text-xs font-bold text-blue-700 transition hover:border-blue-200 hover:bg-blue-50">
                    <span><span className="mr-2 rounded-full bg-blue-600 px-2 py-0.5 text-[8px] font-black uppercase text-white">Coming Soon</span>GSTR-2B Reconciliation</span><ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {mainLinks.map((link) => <Link key={link.href} href={link.href} className="text-sm font-bold text-slate-700 transition-colors hover:text-teal-600">{link.name}</Link>)}

          <Link href="/downloads" className="group flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-xs font-black uppercase tracking-wide text-white transition hover:bg-teal-600"><Sparkles size={14} /> Free Trial</Link>
        </nav>

        <button type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"} onClick={() => setMobileOpen(!mobileOpen)} className="rounded-xl p-2 text-slate-900 hover:bg-slate-100 lg:hidden">{mobileOpen ? <X size={26} /> : <Menu size={26} />}</button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl px-5 py-5">
            <button type="button" onClick={() => setProductOpen(!productOpen)} className="flex w-full items-center justify-between border-b border-slate-100 py-4 text-left text-sm font-black text-slate-900">Product <ChevronDown size={18} className={productOpen ? "rotate-180 transition-transform" : "transition-transform"} /></button>
            {productOpen && (
              <div className="border-b border-slate-100 bg-slate-50 px-2 py-3">
                <p className="px-3 pb-2 pt-1 text-[9px] font-black uppercase tracking-[0.2em] text-teal-600">Core workflows</p>
                {coreWorkflows.map((product) => <Link key={product.href} href={product.href} onClick={closeMobile} className="mb-1 block rounded-xl bg-white px-3 py-3 text-sm font-black text-slate-800 shadow-sm ring-1 ring-slate-100 hover:text-teal-600">{product.name}<span className="mt-0.5 block text-[10px] font-medium text-slate-500">{product.desc}</span></Link>)}
                <p className="px-3 pb-2 pt-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Control & integration</p>
                {controlLinks.map((item) => <Link key={item.href} href={item.href} onClick={closeMobile} className="block rounded-lg px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-white hover:text-teal-600">{item.name}</Link>)}
                <p className="px-3 pb-2 pt-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Built-in capabilities</p>
                {capabilities.map((item) => <Link key={item.href} href={item.href} onClick={closeMobile} className="block rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-white hover:text-teal-600">{item.name}</Link>)}
                <Link href="/reconciliation" onClick={closeMobile} className="mt-2 block rounded-lg bg-blue-50 px-3 py-3 text-xs font-bold text-blue-700">GSTR-2B Reconciliation Â· Coming Soon</Link>
              </div>
            )}
            {mainLinks.map((link) => <Link key={link.href} href={link.href} onClick={closeMobile} className="block border-b border-slate-100 py-4 text-sm font-black text-slate-900 hover:text-teal-600">{link.name}</Link>)}
            <Link href="/downloads" onClick={closeMobile} className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-4 text-xs font-black uppercase tracking-wider text-white"><Sparkles size={15} /> Download Free Trial</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

