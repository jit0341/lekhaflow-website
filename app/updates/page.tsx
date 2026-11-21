"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, RefreshCw } from "lucide-react";

type ReleaseInfo = {
  success?: boolean;
  latestVersion?: string;
  publishedAt?: string;
  releaseName?: string;
  releaseUrl?: string;
  standard?: { url?: string; name?: string; size?: number };
};

export default function UpdatesPage() {
  const [release, setRelease] = useState<ReleaseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [serviceUnavailable, setServiceUnavailable] = useState(false);

  async function loadRelease() {
    setLoading(true);
    setServiceUnavailable(false);
    try {
      const response = await fetch("/api/github-release", { cache: "no-store" });
      const data = (await response.json()) as ReleaseInfo;
      if (!response.ok || !data.success) throw new Error("Release lookup failed");
      setRelease(data);
    } catch {
      setServiceUnavailable(true);
      setRelease(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadRelease();
  }, []);

  const formatDate = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? ""
      : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-blue-700">LekhaFlow Support</p>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Updates & Release Information</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Find the latest official LekhaFlow releases, product improvements and installation packages.
          </p>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-950">Latest Standard release</h2>
              {loading ? (
                <p className="mt-2 text-slate-500">Checking official release information…</p>
              ) : serviceUnavailable ? (
                <p className="mt-2 text-rose-700">Release information is temporarily unavailable. Please try again.</p>
              ) : (
                <>
                  <p className="mt-2 text-slate-700">
                    Version <strong>{release?.latestVersion || "—"}</strong>
                    {release?.publishedAt ? " · Released " + formatDate(release.publishedAt) : ""}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    {release?.standard?.name || release?.releaseName || "Official LekhaFlow Standard package"}
                  </p>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() => void loadRelease()}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw size={17} /> Check again
            </button>
          </div>

          {!loading && !serviceUnavailable && release?.standard?.url && (
            <div className="mt-8 rounded-2xl bg-blue-50 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 text-emerald-600" size={20} />
                <div className="flex-1">
                  <h3 className="font-bold text-slate-950">Official package available</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Download the current Standard installer from the official Download Center.
                  </p>
                  <a
                    href={release.standard.url}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-600"
                  >
                    <Download size={18} /> Download Standard <ArrowRight size={17} />
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 border-t border-slate-100 pt-6">
            <Link href="/downloads" className="font-bold text-blue-700 hover:underline">
              Open the official Download Center
            </Link>
            {release?.releaseUrl && (
              <span className="ml-3 text-sm text-slate-500">
                · <a href={release.releaseUrl} target="_blank" rel="noreferrer" className="hover:underline">Release details</a>
              </span>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
