"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function ResetPasswordForm() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("Checking your recovery link…");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const token = hash.get("access_token") || "";
    const type = hash.get("type") || "";
    if (token && type === "recovery") {
      setAccessToken(token);
      setReady(true);
      setStatus("Recovery link verified. Choose a new password.");
      window.history.replaceState(null, "", window.location.pathname);
      return;
    }
    const queryError = new URLSearchParams(window.location.search).get("error_description");
    setError(queryError ? decodeURIComponent(queryError.replace(/\+/g, " ")) : "The recovery link is missing, invalid or expired. Request a fresh email and open its newest link.");
    setStatus("");
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password.length < 10 || password.length > 128) {
      setError("Password must contain 10–128 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch("/api/document-cloud/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken, password }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Password update failed.");
      setStatus(data.message || "Password updated successfully.");
      setReady(false);
      setPassword("");
      setConfirmPassword("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Password update failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 pb-16 pt-28 text-slate-100">
      <section className="mx-auto max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[.22em] text-teal-400">LekhaFlow · Secure account</p>
        <h1 className="mt-3 text-2xl font-black">Set a new password</h1>
        {status && <p role="status" className="mt-4 rounded-xl border border-teal-900 bg-teal-950/50 p-4 text-sm text-teal-200">{status}</p>}
        {error && <p role="alert" className="mt-4 rounded-xl border border-red-900 bg-red-950/50 p-4 text-sm text-red-200">{error}</p>}
        {ready && <form onSubmit={submit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400">NEW PASSWORD</label>
            <input type="password" autoComplete="new-password" minLength={10} maxLength={128} required value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400">CONFIRM NEW PASSWORD</label>
            <input type="password" autoComplete="new-password" minLength={10} maxLength={128} required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white" />
          </div>
          <button type="submit" disabled={saving} className="w-full rounded-xl bg-teal-500 px-4 py-3 text-sm font-black text-slate-950 disabled:opacity-50">{saving ? "Updating…" : "Update password"}</button>
        </form>}
        <Link href="/document-cloud/admin" className="mt-6 inline-flex text-sm font-bold text-teal-300 hover:text-teal-200">Return to Document Cloud Admin</Link>
      </section>
    </main>
  );
}

export default function ResetPasswordPage() {
  return <Suspense fallback={<main className="min-h-screen bg-slate-950 p-8 text-slate-200">Loading password reset…</main>}><ResetPasswordForm /></Suspense>;
}
