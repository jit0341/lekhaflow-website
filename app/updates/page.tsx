"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Download,
  ExternalLink,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type ProductKey =
  | "standardFull"
  | "standardDemo"
  | "professionalFull"
  | "professionalDemo";

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
  enabled?: boolean;
  tag?: string;
  latestVersion?: string;
  releaseName?: string;
  releaseUrl?: string;
  publishedAt?: string;
  availableCount?: number;
  products?: Partial<Record<ProductKey, DownloadAsset>>;
  error?: string;
};

const editions = [
  {
    key: "standardFull",
    product: "LekhaFlow Standard",
    edition: "Full Version",
    badge: "Full License",
    description: "The complete Standard edition for your regular accounting workflow.",
    icon: ShieldCheck,
    color: "blue",
    features: ["Standard full installer", "Stable update channel"],
  },
  {
    key: "standardDemo",
    product: "LekhaFlow Standard",
    edition: "Demo Version",
    badge: "7-Day Demo",
    description: "Try the Standard edition with its seven-day demonstration access.",
    icon: Clock3,
    color: "teal",
    features: ["Standard demo installer", "Seven-day demo channel"],
  },
  {
    key: "professionalFull",
    product: "LekhaFlow Professional",
    edition: "Full Version",
    badge: "Full License",
    description: "The complete Professional edition for your accounting workflow.",
    icon: ShieldCheck,
    color: "violet",
    features: ["Professional full installer", "Stable update channel"],
  },
  {
    key: "professionalDemo",
    product: "LekhaFlow Professional",
    edition: "Demo Version",
    badge: "7-Day Demo",
    description: "Evaluate the Professional edition with its seven-day demonstration access.",
    icon: Sparkles,
    color: "amber",
    features: ["Professional demo installer", "Seven-day demo channel"],
  },
] as const;

function formatBytes(value?: number) {
  if (!value || value <= 0) return "";
  return (value / (1024 * 1024)).toFixed(1) + " MB";
}

function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const styles = {
  blue: {
    border: "border-blue-200",
    icon: "text-blue-700",
    badge: "bg-blue-50 text-blue-800",
    button: "bg-blue-700 hover:bg-blue-800",
  },
  teal: {
    border: "border-teal-200",
    icon: "text-teal-700",
    badge: "bg-teal-50 text-teal-800",
    button: "bg-teal-700 hover:bg-teal-800",
  },
  violet: {
    border: "border-violet-200",
    icon: "text-violet-700",
    badge: "bg-violet-50 text-violet-800",
    button: "bg-violet-700 hover:bg-violet-800",
  },
  amber: {
    border: "border-amber-200",
    icon: "text-amber-700",
    badge: "bg-amber-50 text-amber-900",
    button: "bg-amber-600 hover:bg-amber-700",
  },
};

export default function UpdatesPage() {
  const [release, setRelease] = useState<ReleaseResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [lastChecked, setLastChecked] = useState("");

  const checkForUpdates = useCallback(async () => {
    setChecking(true);
    setError("");

    try {
      // This is a public release check. It never starts an installer.
      const response = await fetch("/api/github-release", {
        method: "GET",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      const data = (await response.json()) as ReleaseResponse;

      if (!response.ok || !data.success) {
        throw new Error(data.error || "The official release service is temporarily unavailable.");
      }

      setRelease(data);
      setLastChecked(new Date().toISOString());
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not check the official release.";
      setError(message);
      setRelease(null);
    } finally {
      setLoading(false);
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    void checkForUpdates();
  }, [checkForUpdates]);

  const availableCount = Object.values(release?.products || {}).filter(
    (asset) => Boolean(asset?.available && asset?.url),
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-blue-700">
            Official Release Service
          </p>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-slate-950 md:text-5xl">
            Software Updates
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600">
            Check the latest published LekhaFlow release and choose the installer that matches your product and edition.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
              {release?.latestVersion ? "Latest Version " + release.latestVersion : "Checking release"}
            </span>
            {release?.publishedAt && (
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600">
                Published {formatDate(release.publishedAt)}
              </span>
            )}
            <button
              type="button"
              onClick={() => void checkForUpdates()}
              disabled={checking}
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold text-blue-800 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw size={14} className={checking ? "animate-spin" : ""} />
              {checking ? "Checking…" : "Check for Updates"}
            </button>
          </div>

          {lastChecked && (
            <p className="mt-3 text-xs text-slate-500">
              Last checked {new Date(lastChecked).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </header>

        {error && (
          <div role="alert" className="mx-auto mb-8 max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
            {error}
          </div>
        )}

        <section aria-label="Available LekhaFlow editions" className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {editions.map((edition) => {
            const asset = release?.products?.[edition.key as ProductKey];
            const ready = Boolean(asset?.available && asset?.url);
            const Icon = edition.icon;
            const tone = styles[edition.color];

            return (
              <article
                key={edition.key}
                className={"flex min-h-[330px] flex-col rounded-3xl border-2 bg-white p-6 shadow-sm " + tone.border}
              >
                <div className="mb-5 flex items-start gap-3">
                  <Icon size={27} className={"mt-0.5 shrink-0 " + tone.icon} />
                  <div>
                    <h2 className="text-lg font-black leading-tight text-slate-950">{edition.product}</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{edition.edition}</p>
                  </div>
                </div>

                <span className={"mb-4 w-fit rounded-full px-3 py-1 text-xs font-bold " + tone.badge}>
                  {edition.badge}
                </span>

                <p className="mb-5 min-h-[60px] text-sm leading-6 text-slate-600">
                  {edition.description}
                </p>

                <ul className="mb-6 flex-1 space-y-2 text-xs text-slate-600">
                  {edition.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="shrink-0 text-emerald-600" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className="mb-3 min-h-4 text-xs text-slate-500">
                  {loading
                    ? "Checking official release…"
                    : ready
                      ? "Version " + (asset?.version || release?.latestVersion || "") +
                        (asset?.size ? " · " + formatBytes(asset.size) : "")
                      : "No verified installer is available."}
                </p>

                {ready ? (
                  <a
                    href={asset?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={"flex w-full items-center justify-center gap-2 rounded-xl px-4 py-4 text-xs font-black uppercase tracking-widest text-white transition " + tone.button}
                  >
                    <Download size={17} />
                    Download Update
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-200 px-4 py-4 text-xs font-black uppercase tracking-widest text-slate-500"
                  >
                    {loading ? "Checking…" : "Unavailable"}
                  </button>
                )}
              </article>
            );
          })}
        </section>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-center">
          {checking
            ? "Checking the official V15.2.1 release…"
            : availableCount === 4
              ? "All four LekhaFlow V15.2.1 installers are published and available."
              : availableCount + " of 4 verified installers are currently available."}
          {release?.releaseUrl && (
            <p className="mt-3">
              <a
                href={release.releaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 underline underline-offset-4"
              >
                View GitHub release details
                <ExternalLink size={14} />
              </a>
            </p>
          )}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-6 text-slate-500">
          The website check reports the latest published release. To check the version already installed on your computer, open LekhaFlow and use <strong>Updates → Check for Application Updates</strong>. The desktop updater verifies the matching product, edition, digital signature and installer checksum before asking you to install.
        </p>
      </div>
    </main>
  );
}
