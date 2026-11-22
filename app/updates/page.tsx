"use client";

import { useEffect, useState } from "react";
import { Download, ShieldCheck, Clock3, Sparkles, RefreshCw } from "lucide-react";

type DownloadAsset = {
  available?: boolean;
  url?: string;
  name?: string;
  size?: number;
  version?: string;
  publishedAt?: string;
};

type ReleaseResponse = {
  success?: boolean;
  latestVersion?: string;
  publishedAt?: string;
  products?: {
    standardFull?: DownloadAsset;
    standardDemo?: DownloadAsset;
    professionalFull?: DownloadAsset;
    professionalDemo?: DownloadAsset;
  };
  error?: string;
};

const products = [
  {
    key: "standardFull",
    title: "LekhaFlow Standard",
    edition: "Full Version",
    note: "Complete Standard edition for daily accounting and Tally workflows.",
    label: "Full License",
    icon: ShieldCheck,
    tone: "blue",
  },
  {
    key: "standardDemo",
    title: "LekhaFlow Standard",
    edition: "Demo Version",
    note: "Explore the Standard workflow with demo restrictions before activation.",
    label: "7-Day Demo",
    icon: Clock3,
    tone: "teal",
  },
  {
    key: "professionalFull",
    title: "LekhaFlow Professional",
    edition: "Full Version",
    note: "Professional edition for expanded accounting and automation workflows.",
    label: "Full License",
    icon: ShieldCheck,
    tone: "violet",
  },
  {
    key: "professionalDemo",
    title: "LekhaFlow Professional",
    edition: "Demo Version",
    note: "Evaluate Professional features with demo restrictions before activation.",
    label: "7-Day Demo",
    icon: Sparkles,
    tone: "amber",
  },
] as const;

function formatBytes(value?: number) {
  if (!value || value <= 0) return "";
  if (value >= 1024 * 1024 * 1024) return (value / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  return (value / (1024 * 1024)).toFixed(1) + " MB";
}

export default function UpdatesPage() {
  const [release, setRelease] = useState<ReleaseResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadRelease(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    try {
      const response = await fetch("/api/github-release", { cache: "no-store" });
      const data = (await response.json()) as ReleaseResponse;
      setRelease(data);
    } catch (error) {
      console.error("Failed to load LekhaFlow updates:", error);
      setRelease({
        success: false,
        error: "Update information is temporarily unavailable. Please try again.",
        products: {},
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    void loadRelease();
  }, []);

  const assets = release?.products;
  const availableCount = Object.values(assets || {}).filter((asset) => asset?.available && asset?.url).length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-blue-700">LekhaFlow Release Center</p>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Software Updates</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600">
            Check the latest release and choose the correct Standard or Professional installer.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-500">
            {release?.latestVersion ? <span>Latest release: {release.latestVersion}</span> : <span>Checking the official release…</span>}
            {release?.publishedAt ? <span>· {new Date(release.publishedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span> : null}
            <button
              type="button"
              onClick={() => void loadRelease(true)}
              disabled={loading || refreshing}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-2 text-slate-700 hover:bg-slate-100 disabled:opacity-50"
            >
              <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
              Refresh status
            </button>
          </div>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => {
            const asset = assets?.[product.key];
            const ready = Boolean(asset?.available && asset?.url);
            const Icon = product.icon;
            const border = {
              blue: "border-blue-200",
              teal: "border-teal-200",
              violet: "border-violet-200",
              amber: "border-amber-200",
            }[product.tone];
            const iconColor = {
              blue: "text-blue-700",
              teal: "text-teal-700",
              violet: "text-violet-700",
              amber: "text-amber-700",
            }[product.tone];
            const button = {
              blue: "bg-blue-700 hover:bg-blue-800",
              teal: "bg-teal-700 hover:bg-teal-800",
              violet: "bg-violet-700 hover:bg-violet-800",
              amber: "bg-amber-600 hover:bg-amber-700",
            }[product.tone];

            return (
              <section key={product.key} className={"flex flex-col rounded-3xl border-2 bg-white p-6 shadow-sm " + border}>
                <div className="mb-5 flex items-center gap-3">
                  <Icon size={25} className={iconColor} />
                  <div>
                    <h2 className="text-lg font-black leading-tight text-slate-950">{product.title}</h2>
                    <p className="text-sm font-semibold text-slate-500">{product.edition}</p>
                  </div>
                </div>
                <span className="mb-4 w-fit rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-700">{product.label}</span>
                <p className="mb-6 flex-1 text-sm leading-6 text-slate-600">{product.note}</p>
                <div className="mb-4 min-h-8 text-xs text-slate-500">
                  {loading
                    ? "Checking official release…"
                    : ready
                      ? "Version " + (asset?.version || release?.latestVersion || "") + (asset?.size ? " · " + formatBytes(asset.size) : "")
                      : "Installer not published yet"}
                </div>
                {ready ? (
                  <a href={asset?.url} target="_blank" rel="noopener noreferrer" className={"flex w-full items-center justify-center gap-2 rounded-xl px-4 py-4 text-xs font-black uppercase tracking-widest text-white " + button}>
                    <Download size={16} /> Download update
                  </a>
                ) : (
                  <button type="button" disabled className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-200 px-4 py-4 text-xs font-black uppercase tracking-widest text-slate-500">
                    <Clock3 size={16} /> {loading ? "Checking…" : "Coming Soon"}
                  </button>
                )}
              </section>
            );
          })}
        </div>

        <p className="mt-9 text-center text-sm text-slate-600">
          {availableCount === 4
            ? "All four official installers are available."
            : availableCount + " of 4 installers are published. Unavailable downloads remain disabled until their official setup files are released."}
        </p>
        <p className="mt-2 text-center text-xs text-slate-400">
          Always install the edition that matches your existing LekhaFlow license.
        </p>
      </div>
    </main>
  );
}
