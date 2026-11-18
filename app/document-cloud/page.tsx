"use client";

import { FormEvent, useState } from "react";

type Mode = "login" | "register";

export default function DocumentCloudPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setBusy(true);
    try {
      const endpoint = mode === "register"
        ? "/api/document-cloud/register"
        : "/api/document-cloud/login";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName, contactName, email, password }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || "Request could not be completed.");
      } else if (mode === "register") {
        setMessage(data.message);
        setMode("login");
        setPassword("");
      } else {
        window.location.href = "/document-cloud/workspace";
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-20 pt-32 text-slate-900">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10">
          <div className="mb-8 text-center">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-teal-700">LEKHAFlow · Secure Client Area</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Document Cloud</h1>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
              Keep purchase invoices, sales documents and bank statements ready for your LekhaFlow workflow.
            </p>
          </div>

          <div className="mb-7 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
            <button type="button" onClick={() => { setMode("login"); setError(""); setMessage(""); }} className={`rounded-lg px-4 py-3 text-sm font-bold ${mode === "login" ? "bg-white text-teal-800 shadow" : "text-slate-500"}`}>Client Login</button>
            <button type="button" onClick={() => { setMode("register"); setError(""); setMessage(""); }} className={`rounded-lg px-4 py-3 text-sm font-bold ${mode === "register" ? "bg-white text-teal-800 shadow" : "text-slate-500"}`}>Create Account</button>
          </div>

          <form onSubmit={submit} className="space-y-5">
            {mode === "register" && <>
              <label className="block">
                <span className="mb-2 block text-sm font-bold">Business / Firm Name</span>
                <input value={businessName} onChange={e => setBusinessName(e.target.value)} required minLength={2} maxLength={160} autoComplete="organization" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100" placeholder="Your business name" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold">Contact Person</span>
                <input value={contactName} onChange={e => setContactName(e.target.value)} required minLength={2} maxLength={120} autoComplete="name" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100" placeholder="Full name" />
              </label>
            </>}
            <label className="block">
              <span className="mb-2 block text-sm font-bold">Email Address</span>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100" placeholder="name@business.com" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-bold">Password</span>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={10} maxLength={128} autoComplete={mode === "register" ? "new-password" : "current-password"} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100" placeholder={mode === "register" ? "At least 10 characters" : "Your password"} />
              {mode === "register" && <span className="mt-1 block text-xs text-slate-500">Use at least 10 characters.</span>}
            </label>

            {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            {message && <p role="status" className="rounded-xl border border-teal-200 bg-teal-50 p-3 text-sm leading-6 text-teal-900">{message}</p>}

            <button disabled={busy} type="submit" className="w-full rounded-xl bg-teal-700 px-5 py-4 text-sm font-black tracking-wide text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60">
              {busy ? "PLEASE WAIT…" : mode === "register" ? "CREATE CLIENT ACCOUNT" : "SIGN IN"}
            </button>
          </form>

          <div className="mt-7 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-600">
            <strong className="text-slate-800">Account activation:</strong> After registration, verify your email. LekhaFlow will then review your purchase or license before activating Document Cloud access. Online and offline customers can both request access.
          </div>
        </div>
      </div>
    </main>
  );
}
