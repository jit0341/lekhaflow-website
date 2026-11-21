"use client";

import { Download, CheckCircle2, Clock, Shield, Crown } from "lucide-react";
import { useEffect, useState } from "react";

type DownloadLink = { url: string; name: string; size: number };
type DownloadState = {
  standard_full: DownloadLink;
  standard_trial: DownloadLink;
  gold: DownloadLink;
};

const emptyLink: DownloadLink = { url: "", name: "", size: 0 };

export default function DownloadsPage() {
  const [downloadLinks, setDownloadLinks] = useState<DownloadState>({
    standard_full: emptyLink,
    standard_trial: emptyLink,
    gold: emptyLink,
  });
  const [latestVersion, setLatestVersion] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [loadingDownloads, setLoadingDownloads] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadDownloads() {
      try {
        const response = await fetch("/api/github-release", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error("Release lookup failed");

        if (!cancelled) {
          setDownloadLinks({
            standard_full: data.standard || emptyLink,
            standard_trial: data.standardTrial || emptyLink,
            gold: data.gold || emptyLink,
          });
          setLatestVersion(data.latestVersion || "");
          setPublishedAt(data.publishedAt || "");
        }
      } catch {
        if (!cancelled) setLoadFailed(true);
      } finally {
        if (!cancelled) setLoadingDownloads(false);
      }
    }

    void loadDownloads();
    return () => { cancelled = true; };
  }, []);

  const formatDate = (date: string) => {
    if (!date) return "";
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "";
    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const buttonClass =
    "flex w-full items-center justify-center gap-3 rounded-2xl py-5 text-xs font-black uppercase tracking-widest text-white transition-all";

  return (
    <main className="min-h-screen bg-white px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <header className="mb-14 text-center">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-slate-950 md:text-5xl">
            Download Center
          </h1>
          <p className="mt-4 text-sm text-slate-500">Choose your LekhaFlow product package</p>
          {latestVersion && (
            <p className="mt-3 text-xs font-bold uppercase tracking-widest text-slate-600">
              Latest Standard Full: {latestVersion}
              {publishedAt ? " · Released: " + formatDate(publishedAt) : ""}
            </p>
          )}
          {loadFailed && (
            <p role="status" className="mt-4 text-sm text-rose-700">
              Download information is temporarily unavailable. Please try again later.
            </p>
          )}
        </header>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 xl:grid-cols-3">
          <section className="rounded-[2.5rem] border-2 border-blue-500 bg-white p-8 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <Shield className="text-blue-600" size={25} />
              <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-950">Standard Full</h2>
            </div>
            <span className="mb-5 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-blue-700">
              Full License
            </span>
            <ul className="mb-8 space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 size={16} className="text-teal-600" /> Invoice processing</li>
              <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 size={16} className="text-teal-600" /> Bank Statement to Tally</li>
              <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 size={16} className="text-teal-600" /> Product support</li>
            </ul>
            <a
              href={downloadLinks.standard_full.url || undefined}
              target="_blank"
              rel="noreferrer"
              aria-disabled={!downloadLinks.standard_full.url}
              className={buttonClass + (downloadLinks.standard_full.url ? " bg-blue-700 hover:bg-blue-600" : " pointer-events-none bg-slate-400")}
            >
              <Download size={18} /> {loadingDownloads ? "Loading…" : "Download Full"}
            </a>
            {!loadingDownloads && !downloadLinks.standard_full.url && (
              <p className="mt-3 text-xs text-slate-500">No approved full installer is currently published.</p>
            )}
          </section>

          <section className="rounded-[2.5rem] border-2 border-teal-500 bg-white p-8 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <Clock className="text-teal-600" size={25} />
              <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-950">Standard Trial</h2>
            </div>
            <span className="mb-5 inline-block rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-teal-700">
              7-Day Trial
            </span>
            <ul className="mb-8 space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 size={16} className="text-teal-600" /> Standard product experience</li>
              <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 size={16} className="text-teal-600" /> No credit card required</li>
              <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 size={16} className="text-teal-600" /> Evaluation access</li>
            </ul>
            <a
              href={downloadLinks.standard_trial.url || undefined}
              target="_blank"
              rel="noreferrer"
              aria-disabled={!downloadLinks.standard_trial.url}
              className={buttonClass + (downloadLinks.standard_trial.url ? " bg-teal-700 hover:bg-teal-600" : " pointer-events-none bg-slate-400")}
            >
              <Download size={18} /> {loadingDownloads ? "Loading…" : "Download Trial"}
            </a>
            {!loadingDownloads && !downloadLinks.standard_trial.url && (
              <p className="mt-3 text-xs text-slate-500">No approved trial installer is currently published.</p>
            )}
          </section>

          {downloadLinks.gold.url && (
            <section className="rounded-[2.5rem] border-2 border-amber-500 bg-white p-8 shadow-xl">
              <div className="mb-4 flex items-center gap-3">
                <Crown className="text-amber-600" size={25} />
                <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-950">Gold</h2>
              </div>
              <span className="mb-5 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-amber-700">
                Full License
              </span>
              <p className="mb-8 text-sm text-slate-600">Official LekhaFlow Gold release package.</p>
              <a
                href={downloadLinks.gold.url}
                target="_blank"
                rel="noreferrer"
                className={buttonClass + " bg-amber-600 hover:bg-amber-500"}
              >
                <Download size={18} /> Download Gold
              </a>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
