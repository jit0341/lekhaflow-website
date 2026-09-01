"use client";

import Link from "next/link";
import { ArrowRight, Handshake, ShieldCheck, TrendingUp, Users } from "lucide-react";
import PartnerForm from "@/components/PartnerForm";

export default function PartnerPage() {
return (
<main className="min-h-screen bg-slate-950 text-white">
<section className="relative overflow-hidden border-b border-white/10 pt-28 pb-20">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,.18),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,.16),transparent_30%)]" />
<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
<Link href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-teal-300 hover:text-white"><ArrowRight className="rotate-180" size={14}/> Back to LekhaFlow</Link>
<div className="mx-auto mt-12 max-w-4xl text-center">
<div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-300"><Handshake size={28}/></div>
<p className="text-[10px] font-black uppercase tracking-[.35em] text-teal-300">LekhaFlow Partner Network</p>
<h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">Grow your practice with a smarter accounting workflow.</h1>
<p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300">For CA firms, accountants, Tally consultants and implementation partners who want to bring practical automation to their clients.</p>
</div>
<div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3">
{[[Users,"Serve more clients","Reduce repetitive entry work and handle more accounts."],[TrendingUp,"Grow recurring work","Create a stronger automation offering around your existing services."],[ShieldCheck,"Work with control","Keep client workflows structured, reviewable and professional."]].map(([Icon,title,desc]: any,i)=><div key={i} className="rounded-3xl border border-white/10 bg-white/[.04] p-7"><Icon className="text-teal-300" size={24}/><h2 className="mt-5 text-sm font-black uppercase tracking-widest">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-400">{desc}</p></div>)}
</div>
</div>
</section>
<section className="bg-white py-20 text-slate-950">
<div className="mx-auto max-w-5xl px-6 lg:px-8">
<div className="mb-10 text-center"><p className="text-[10px] font-black uppercase tracking-[.3em] text-teal-600">Partner enquiry</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Tell us about your practice.</h2></div>
<PartnerForm isHindi={false} />
</div>
</section>
</main>
);
}