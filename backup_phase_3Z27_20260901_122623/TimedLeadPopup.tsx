"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, X, Zap } from "lucide-react";

export default function TimedLeadPopup({ isHindi = false }: { isHindi?: boolean }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", mobile: "", email: "" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem("lekhaflow-lead-submitted") === "1") return;

    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => setOpen(true), 90000);
    };
    schedule();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open || typeof window === "undefined") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const closeAndReschedule = () => {
    setOpen(false);
    if (typeof window === "undefined") return;
    const timer = window.setTimeout(() => setOpen(true), 90000);
    return () => window.clearTimeout(timer);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/save_lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: form.name,
          companyName: form.company,
          mobileNumber: form.mobile,
          clientEmail: form.email,
          source: "homepage_timed_popup",
        }),
      });
    } catch {}
    window.sessionStorage.setItem("lekhaflow-lead-submitted", "1");
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[180] flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-4"
          onMouseDown={(e) => { if (e.target === e.currentTarget) closeAndReschedule(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-2xl"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500" />
            <button onClick={closeAndReschedule} aria-label="Close" className="absolute right-5 top-5 z-10 rounded-full bg-slate-100 p-2 text-slate-500 hover:text-slate-900">
              <X size={18} />
            </button>

            {!submitted ? (
              <div className="p-7 sm:p-10">
                <div className="mb-7 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-600"><Zap size={22} /></div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-teal-600">LekhaFlow</p>
                    <p className="text-xs font-bold text-slate-500">{isHindi ? "à¤†à¤ªà¤•à¥‡ Tally workflow à¤•à¥‡ à¤²à¤¿à¤" : "For your Tally workflow"}</p>
                  </div>
                </div>
                <h3 className="max-w-md text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                  {isHindi ? "à¤…à¤­à¥€ à¤­à¥€ repetitive accounting work à¤•à¤° à¤°à¤¹à¥‡ à¤¹à¥ˆà¤‚?" : "Still doing repetitive accounting work manually?"}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
                  {isHindi ? "à¤…à¤ªà¤¨à¤¾ à¤•à¤¾à¤® à¤¬à¤¤à¤¾à¤‡à¤à¥¤ à¤¹à¤® à¤†à¤ªà¤•à¥‹ LekhaFlow à¤•à¤¾ à¤¸à¤¹à¥€ workflow à¤”à¤° trial à¤¸à¤®à¤à¤¾à¤à¤à¤—à¥‡à¥¤" : "Tell us about your workflow. We'll show you the right LekhaFlow setup and trial path."}
                </p>
                <form onSubmit={submit} className="mt-7 grid gap-3 sm:grid-cols-2">
                  <input required placeholder={isHindi ? "à¤ªà¥‚à¤°à¤¾ à¤¨à¤¾à¤®" : "Full name"} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-500" />
                  <input required placeholder={isHindi ? "à¤«à¤°à¥à¤® / à¤•à¤‚à¤ªà¤¨à¥€" : "Firm / Company"} value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-500" />
                  <input required placeholder={isHindi ? "WhatsApp à¤¨à¤‚à¤¬à¤°" : "WhatsApp number"} value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-500" />
                  <input required type="email" placeholder={isHindi ? "à¤ˆà¤®à¥‡à¤²" : "Email address"} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-500" />
                  <button className="sm:col-span-2 flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-4 text-xs font-black uppercase tracking-widest text-white transition hover:bg-teal-600">
                    {isHindi ? "à¤®à¥à¤à¤¸à¥‡ à¤¸à¤‚à¤ªà¤°à¥à¤• à¤•à¤°à¥‡à¤‚" : "Get LekhaFlow"}<ArrowRight size={16} />
                  </button>
                </form>
                <p className="mt-3 text-center text-[9px] font-bold uppercase tracking-widest text-slate-400">{isHindi ? "à¤•à¥‹à¤ˆ spam à¤¨à¤¹à¥€à¤‚ * à¤¸à¤¿à¤°à¥à¤« LekhaFlow à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾" : "No spam * Only LekhaFlow assistance"}</p>
              </div>
            ) : (
              <div className="px-8 py-14 text-center sm:px-12">
                <CheckCircle2 className="mx-auto text-teal-500" size={52} />
                <h3 className="mt-5 text-3xl font-black text-slate-950">{isHindi ? "à¤§à¤¨à¥à¤¯à¤µà¤¾à¤¦!" : "You're on the list."}</h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600">{isHindi ? "à¤¹à¤® à¤†à¤ªà¤•à¥‡ à¤¦à¤¿à¤ à¤—à¤ à¤µà¤¿à¤µà¤°à¤£ à¤•à¥‡ à¤†à¤§à¤¾à¤° à¤ªà¤° à¤†à¤ªà¤¸à¥‡ à¤¸à¤‚à¤ªà¤°à¥à¤• à¤•à¤°à¥‡à¤‚à¤—à¥‡à¥¤" : "We'll contact you using the details you provided."}</p>
                <button onClick={() => setOpen(false)} className="mt-7 rounded-xl bg-teal-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white">{isHindi ? "à¤ à¥€à¤• à¤¹à¥ˆ" : "Continue browsing"}</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}