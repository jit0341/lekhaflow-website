"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronDown, Menu, Sparkles, X } from "lucide-react";

const products = [
  { name: "Purchase Automation", href: "/purchase", desc: "Invoice to accounting result" },
  { name: "Sales Split", href: "/sales-split", desc: "Threshold-based voucher splitting" },
  { name: "Bank Statement", href: "/bank-statement", desc: "Statement processing & review" },
  { name: "Tally Integration", href: "/tally-sync", desc: "Connect the final result to Tally" },
];

const capabilities = [
  { name: "Review Before Tally", href: "/how-it-works#review" },
  { name: "SwiftAssign", href: "/bank-statement#swiftassign" },
  { name: "Excel Export", href: "/how-it-works#export" },
  { name: "UOM / Dozen Handling", href: "/purchase#uom" },
  { name: "Built-in Calculator · Ctrl+N", href: "/production#calculator" },
];

const mainLinks = [
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
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4">
                <div className="w-[430px] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
                  <div className="px-2 pb-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-teal-600">The LekhaFlow Product</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">The core workflows that sit around your existing Tally setup.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {products.map((product) => (
                      <Link key={product.href} href={product.href} className="group rounded-xl border border-slate-100 p-3 transition hover:border-teal-200 hover:bg-teal-50/50">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-black text-slate-800 group-hover:text-teal-700">{product.name}</span>
                          <ArrowRight size={13} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-teal-600" />
                        </div>
                        <p className="mt-1 text-[10px] leading-4 text-slate-500">{product.desc}</p>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-3 border-t border-slate-100 pt-3">
                    <p className="px-2 pb-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Built-in capabilities</p>
                    <div className="grid grid-cols-2">
                      {capabilities.map((item) => (
                        <Link key={item.href} href={item.href} className="rounded-lg px-2 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-teal-600">{item.name}</Link>
                      ))}
                    </div>
                  </div>

                  <Link href="/reconciliation" className="mt-2 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 px-3 py-2.5 text-xs font-bold text-blue-700">
                    <span><span className="mr-2 rounded-full bg-blue-600 px-2 py-0.5 text-[8px] font-black uppercase text-white">Coming Soon</span>GSTR-2B Reconciliation</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-bold text-slate-700 transition-colors hover:text-teal-600">{link.name}</Link>
          ))}

          <Link href="/downloads" className="group flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-xs font-black uppercase tracking-wide text-white transition hover:bg-teal-600">
            <Sparkles size={14} /> Free Trial
          </Link>
        </nav>

        <button type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"} onClick={() => setMobileOpen(!mobileOpen)} className="rounded-xl p-2 text-slate-900 hover:bg-slate-100 lg:hidden">
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl px-5 py-5">
            <button type="button" onClick={() => setProductOpen(!productOpen)} className="flex w-full items-center justify-between border-b border-slate-100 py-4 text-left text-sm font-black text-slate-900">
              Product <ChevronDown size={18} className={productOpen ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
            {productOpen && (
              <div className="border-b border-slate-100 bg-slate-50 px-2 py-2">
                {products.map((product) => <Link key={product.href} href={product.href} onClick={closeMobile} className="block rounded-lg px-3 py-3 text-sm font-bold text-slate-700 hover:bg-white hover:text-teal-600">{product.name}</Link>)}
                {capabilities.map((item) => <Link key={item.href} href={item.href} onClick={closeMobile} className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-500 hover:bg-white hover:text-teal-600">{item.name}</Link>)}
                <Link href="/reconciliation" onClick={closeMobile} className="mt-1 block rounded-lg bg-blue-50 px-3 py-3 text-xs font-bold text-blue-700">GSTR-2B Reconciliation · Coming Soon</Link>
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
