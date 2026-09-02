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

const features = [
{ name: "Purchase Automation", href: "/purchase" },
{ name: "Sales Split", href: "/sales-split" },
{ name: "Bank Statement", href: "/bank-statement" },
{ name: "Tally Sync", href: "/tally-sync" },
{ name: "GSTR-2B Reconciliation", href: "/reconciliation" },
];

const mainLinks = [
{ name: "How It Works", href: "/how-it-works" },
{ name: "Pricing", href: "/pricing" },
{ name: "Downloads", href: "/downloads" },
{ name: "Admin", href: "/admin" },
{ name: "Insights", href: "/blog" },
{ name: "Support", href: "/support" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
const [mobileOpen, setMobileOpen] = useState(false);
const [featuresOpen, setFeaturesOpen] = useState(false);
const closeMobile = () => {
setMobileOpen(false);
setFeaturesOpen(false);
};

return (
<header className="fixed top-0 left-0 right-0 z-[100] border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-sm">
<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
<Link
href="/"
onClick={closeMobile}
className="flex items-center gap-2 shrink-0"
>
<img
src="/logo.png"
alt="LekhaFlow"
className="h-9 w-9 object-contain"
/>
<span className="text-2xl font-black tracking-tight text-slate-950">
LEKHA
</span>
<span className="text-2xl font-black tracking-tight text-teal-600">
FLOW
</span>
</Link>

<nav className="hidden lg:flex items-center gap-7">
<div
className="relative"
onMouseEnter={() => setFeaturesOpen(true)}
onMouseLeave={() => setFeaturesOpen(false)}
>
<button
type="button"
onClick={() => setFeaturesOpen(!featuresOpen)}
className="flex items-center gap-1.5 text-sm font-bold text-slate-700 transition-colors hover:text-teal-600"
aria-expanded={featuresOpen}
aria-haspopup="true"
>
Features
<ChevronDown
size={15}
className={`transition-transform ${
featuresOpen ? "rotate-180" : ""
}`}
/>
</button>

{featuresOpen && (
<div className="absolute left-1/2 top-full -translate-x-1/2 pt-4">
<div className="w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
<div className="px-3 pb-2 pt-1">
<p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600">
LekhaFlow Capabilities
</p>
<p className="mt-1 text-[11px] font-medium text-slate-500">
Built into the LekhaFlow Standard workflow
</p>
</div>

{features.map((feature) => (
<Link
key={feature.href + feature.name}
href={feature.href}
className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-teal-600"
>
<span>{feature.name}</span>
<ArrowRight
size={14}
className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
/>
</Link>
))}

<div className="mt-2 border-t border-slate-100 px-3 pt-3">
<p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
Standard is live - Gold / Advanced are future products
</p>
</div>
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

<div className="flex items-center gap-3">

<Link
href="/downloads"
className="group flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-xs font-black uppercase tracking-wide text-white transition-all hover:bg-teal-600"
>
<Sparkles size={14} />
Free Trial
</Link>
</div>
</nav>

<button
type="button"
aria-label={mobileOpen ? "Close menu" : "Open menu"}
onClick={() => setMobileOpen(!mobileOpen)}
className="rounded-xl p-2 text-slate-900 transition-colors hover:bg-slate-100 lg:hidden"
>
{mobileOpen ? <X size={26} /> : <Menu size={26} />}
</button>
</div>

{mobileOpen && (
<div className="border-t border-slate-200 bg-white lg:hidden">
<nav className="mx-auto max-w-7xl px-5 py-5">
<button
type="button"
onClick={() => setFeaturesOpen(!featuresOpen)}
className="flex w-full items-center justify-between border-b border-slate-100 py-4 text-left text-sm font-black text-slate-900"
aria-expanded={featuresOpen}
>
Features
<ChevronDown
size={18}
className={`transition-transform ${
featuresOpen ? "rotate-180" : ""
}`}
/>
</button>

{featuresOpen && (
<div className="border-b border-slate-100 bg-slate-50 px-3 py-2">
{features.map((feature) => (
<Link
key={feature.href + feature.name}
href={feature.href}
onClick={closeMobile}
className="block rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-white hover:text-teal-600"
>
{feature.name}
</Link>
))}
</div>
)}

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

<Link
href="/downloads"
onClick={closeMobile}
className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-4 text-xs font-black uppercase tracking-wider text-white"
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

