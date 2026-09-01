"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const products = [
  { name: "LekhaFlow Standard", href: "/standard" },
  { name: "LekhaFlow Gold", href: "/gold" },
  { name: "Bank Statement → Tally", href: "/bank-statement" },
  { name: "Invoice → Tally", href: "/invoice-to-tally" },
  { name: "Sales Split", href: "/sales-split" },
  { name: "SwiftAssign", href: "/swiftassign" },
];

const mainLinks = [
  { name: "How It Works", href: "/how-it-works" },
  { name: "Compare", href: "/compare" },
  { name: "Pricing", href: "/pricing" },
  { name: "Insights", href: "/blog" },
  { name: "Support", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const closeMobile = () => {
    setMobileOpen(false);
    setProductsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">

        {/* BRAND */}
        <Link
          href="/"
          onClick={closeMobile}
          className="flex items-center gap-1.5 shrink-0"
        >
          <span className="text-2xl font-black tracking-tight text-slate-950">
            LEKHA
          </span>
          <span className="text-2xl font-black tracking-tight text-teal-600">
            FLOW
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-7">

          {/* PRODUCTS */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setProductsOpen(!productsOpen)}
              className="flex items-center gap-1.5 text-sm font-bold text-slate-700 transition-colors hover:text-teal-600"
            >
              Products
              <ChevronDown
                size={15}
                className={`transition-transform ${
                  productsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {productsOpen && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4">
                <div className="w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">

                  <div className="px-3 pb-2 pt-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600">
                      LekhaFlow Products
                    </p>
                  </div>

                  {products.map((product) => (
                    <Link
                      key={product.href}
                      href={product.href}
                      className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-teal-600"
                    >
                      <span>{product.name}</span>
                      <ArrowRight
                        size={14}
                        className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                      />
                    </Link>
                  ))}

                </div>
              </div>
            )}
          </div>

          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-slate-700 transition-colors hover:text-teal-600"
            >
              {link.name}
            </Link>
          ))}

          {/* CTA */}
          <Link
            href="/downloads"
            className="group flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-xs font-black uppercase tracking-wide text-white transition-all hover:bg-teal-600"
          >
            <Sparkles size={14} />
            Free Trial
          </Link>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl p-2 text-slate-900 transition-colors hover:bg-slate-100 lg:hidden"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl px-5 py-5">

            {/* MOBILE PRODUCTS */}
            <button
              type="button"
              onClick={() => setProductsOpen(!productsOpen)}
              className="flex w-full items-center justify-between border-b border-slate-100 py-4 text-left text-sm font-black text-slate-900"
            >
              Products
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  productsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {productsOpen && (
              <div className="border-b border-slate-100 bg-slate-50 px-3 py-2">
                {products.map((product) => (
                  <Link
                    key={product.href}
                    href={product.href}
                    onClick={closeMobile}
                    className="block rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-white hover:text-teal-600"
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            )}

            {/* MOBILE MAIN LINKS */}
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="block border-b border-slate-100 py-4 text-sm font-black text-slate-900 transition-colors hover:text-teal-600"
              >
                {link.name}
              </Link>
            ))}

            {/* MOBILE CTA */}
            <Link
              href="/downloads"
              onClick={closeMobile}
              className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-4 text-xs font-black uppercase tracking-wider text-white"
            >
              <Sparkles size={15} />
              Download Free Trial
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
}
