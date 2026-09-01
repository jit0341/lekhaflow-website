"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const products = [
  { name: "Purchase", href: "/purchase" },
  { name: "Sales Split", href: "/sales-split" },
  { name: "Bank Statement", href: "/bank-statement" },
  { name: "Reconciliation", href: "/reconciliation" },
  { name: "Tally Sync", href: "/tally-sync" },
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
  const [isHindi, setIsHindi] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("lekhaflow-language");

    if (saved === "hi") {
      setIsHindi(true);
    }
  }, []);

  const toggleLanguage = () => {
    const next = !isHindi;

    setIsHindi(next);

    window.localStorage.setItem(
      "lekhaflow-language",
      next ? "hi" : "en"
    );

    window.dispatchEvent(
      new CustomEvent("lekhaflow-language-change", {
        detail: next,
      })
    );
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setProductsOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">

        <Link
          href="/"
          onClick={closeMobile}
          className="shrink-0 text-2xl font-black tracking-tight text-slate-950"
        >
          LEKHA<span className="text-teal-600">FLOW</span>
        </Link>

        {/* DESKTOP */}
        <div className="hidden items-center gap-7 lg:flex">

          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-bold text-slate-700 transition hover:text-teal-600"
            >
              {isHindi ? "प्रोडक्ट्स" : "Products"}
              <ChevronDown size={15} />
            </button>

            <div className="invisible absolute right-0 top-full mt-4 w-64 translate-y-2 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {products.map((product) => (
                <Link
                  key={product.href}
                  href={product.href}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-teal-600"
                >
                  {product.name}
                </Link>
              ))}
            </div>
          </div>

          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-slate-700 transition hover:text-teal-600"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-lg border border-teal-500/40 px-3 py-2 text-xs font-black text-teal-700 transition hover:bg-teal-50"
            aria-label="Toggle Hindi and English"
          >
            {isHindi ? "ENGLISH" : "हिन्दी"}
          </button>

          <Link
            href="/downloads"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:bg-teal-600"
          >
            <Sparkles size={14} />
            {isHindi ? "ट्रायल लें" : "Free Trial"}
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg border border-slate-200 p-2 lg:hidden"
          aria-label="Open navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE NAV */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl px-5 py-3">

            <button
              type="button"
              onClick={() => setProductsOpen(!productsOpen)}
              className="flex w-full items-center justify-between border-b border-slate-100 py-4 text-left text-sm font-black text-slate-900"
            >
              <span>{isHindi ? "प्रोडक्ट्स" : "Products"}</span>
              <ChevronDown
                size={17}
                className={productsOpen ? "rotate-180" : ""}
              />
            </button>

            {productsOpen && (
              <div className="rounded-xl bg-slate-50 p-2">
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

            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="block border-b border-slate-100 py-4 text-sm font-black text-slate-900 hover:text-teal-600"
              >
                {link.name}
              </Link>
            ))}

            <button
              type="button"
              onClick={toggleLanguage}
              className="mt-5 flex w-full items-center justify-center rounded-xl border border-teal-500/40 px-5 py-3 text-xs font-black text-teal-700"
            >
              {isHindi ? "ENGLISH" : "हिन्दी"}
            </button>

            <Link
              href="/downloads"
              onClick={closeMobile}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-4 text-xs font-black uppercase tracking-wider text-white"
            >
              <Sparkles size={15} />
              {isHindi ? "फ्री ट्रायल डाउनलोड करें" : "Download Free Trial"}
              <ArrowRight size={15} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
