"use client";

import { Download, CheckCircle2, Clock, Shield } from "lucide-react";
import { useEffect, useState } from "react";

type ReleaseResponse = {
  success?: boolean;
  latestVersion?: string;
  publishedAt?: string;
  standard?: { url?: string };
  standardTrial?: { url?: string };
};

export default function DownloadsPage() {
  const [fullUrl, setFullUrl] = useState("");
  const [trialUrl, setTrialUrl] = useState("");
  const [latestVersion, setLatestVersion] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function loadDownloads() {
      try {
        const response = await fetch("/api/github-release", { cache: "no-store" });
        const data = (await response.json()) as ReleaseResponse;
        if (!response.ok || !data.success) throw new Error("Release lookup failed");
        if (!active) return;
        setFullUrl(data.standard?.url || "");
        setTrialUrl(data.standardTrial?.url || "");
        setLatestVersion(data.latestVersion || "");
        setPublishedAt(data.publishedAt || "");
        if (!data.standard?.url || !data.standardTrial?.url) {
          setError("One or more installers are not currently available. Please contact support.");
        }
      } catch (err) {
        console.error("Failed to load GitHub releases:", err);
        if (active) setError("Download information is temporarily unavailable. Please try again later.");
      } finally {
        if (active) setLoading(false);
      }
    }
    loadDownloads();
    return () => { active = false; };
  }, []);

  const formatDate = (date: string) => date
    ? new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : "";

  return (
    <main className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tighter italic">Download Center</h1>
          <p className="text-slate-500 text-sm mt-4">Choose your LekhaFlow Standard installer</p>
          {latestVersion && (
            <p className="text-slate-600 text-xs mt-3 font-bold uppercase tracking-widest">
              Latest Stable Build: {latestVersion}{publishedAt ? " | Released: " + formatDate(publishedAt) : ""}
            </p>
          )}
        </header>

        {error && <p role="status" className="mx-auto mb-8 max-w-3xl rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-center text-sm text-amber-900">{error}</p>}

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <section className="bg-white border-2 border-blue-500 p-8 rounded-[3rem] shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-blue-500" size={24} />
              <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tighter">Standard Full</h2>
            </div>
            <p className="text-blue-700 text-xs font-black uppercase tracking-widest mb-5">Full License</p>
            <ul className="space-y-3 mb-8 text-slate-600 text-sm">
              <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-teal-500" /> 10,000 Invoices/Year</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-teal-500" /> Bank Statement → Tally</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-teal-500" /> Email Support</li>
            </ul>
            <a href={fullUrl || undefined} aria-disabled={!fullUrl} className={`flex items-center justify-center gap-3 w-full py-5 text-slate-950 font-black rounded-2xl uppercase text-xs tracking-widest ${fullUrl ? "bg-blue-600 hover:bg-blue-500" : "bg-slate-200 opacity-60 pointer-events-none"}`}>
              <Download size={18} /> {loading ? "Loading..." : "Download Full"}
            </a>
          </section>

          <section className="bg-white border-2 border-teal-500 p-8 rounded-[3rem] shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-teal-500" size={24} />
              <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tighter">Standard Trial</h2>
            </div>
            <p className="text-teal-700 text-xs font-black uppercase tracking-widest mb-5">7-Day Free Trial</p>
            <ul className="space-y-3 mb-8 text-slate-600 text-sm">
              <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-teal-500" /> Standard Features</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-teal-500" /> No Credit Card Required</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-teal-500" /> 7 Days Access</li>
            </ul>
            <a href={trialUrl || undefined} aria-disabled={!trialUrl} className={`flex items-center justify-center gap-3 w-full py-5 text-slate-950 font-black rounded-2xl uppercase text-xs tracking-widest ${trialUrl ? "bg-teal-600 hover:bg-teal-500" : "bg-slate-200 opacity-60 pointer-events-none"}`}>
              <Download size={18} /> {loading ? "Loading..." : "Download Trial"}
            </a>
          </section>
        </div>
        <p className="mt-8 text-center text-xs text-slate-500">LekhaFlow Gold is under development and is not available for download.</p>
      </div>
    </main>
  );
}
