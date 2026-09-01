export default function SupportPage() {
return (
<main className="min-h-screen bg-slate-950 px-5 py-24 text-white">
<div className="mx-auto max-w-5xl">
<a href="/" className="text-sm font-bold text-teal-400 hover:text-teal-300">
&lt;- Back to LekhaFlow
</a>
<section className="mx-auto mt-16 max-w-3xl text-center">
<p className="text-xs font-black uppercase tracking-[0.28em] text-teal-400">LekhaFlow Support</p>
<h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">How can we help?</h1>
<p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">Get help with your trial, installation, license, accounting workflow, or Tally integration.</p>
</section>
<section className="mt-14 grid gap-6 md:grid-cols-3">
<div className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
<h2 className="text-xl font-black">Trial and Setup</h2>
<p className="mt-3 text-sm leading-6 text-slate-300">Help with installing LekhaFlow or starting the free trial.</p>
</div>
<div className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
<h2 className="text-xl font-black">License Help</h2>
<p className="mt-3 text-sm leading-6 text-slate-300">Help with activation, license questions, or upgrades.</p>
</div>
<div className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
<h2 className="text-xl font-black">Workflow Support</h2>
<p className="mt-3 text-sm leading-6 text-slate-300">Help with Purchase, Sales Split, Bank Statement, or Tally Sync.</p>
</div>
</section>
<section className="mt-10 rounded-3xl border border-teal-500/30 bg-slate-900 p-8 text-center">
<h2 className="text-2xl font-black">Talk to LekhaFlow</h2>
<p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">For direct assistance, use the WhatsApp support option shown on the website.</p>
<a href="/" className="mt-6 inline-flex rounded-full bg-teal-500 px-7 py-3 text-sm font-black text-slate-950 hover:bg-teal-400">Return to LekhaFlow</a>
</section>
</div>
</main>
);
}