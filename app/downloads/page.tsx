"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Download,
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
  sha256?: string;
  version?: string;
};

type ReleaseResponse = {
  success?: boolean;
  latestVersion?: string;
  publishedAt?: string;
  releaseUrl?: string;
  availableCount?: number;
  products?: Partial<Record<ProductKey, DownloadAsset>>;
  error?: string;
};

const cards: Array<{
  key: ProductKey;
  title: string;
  edition: string;
  description: string;
  badge: string;
  icon: typeof ShieldCheck;
  accent: "blue" | "teal" | "violet" | "amber";
  features: string[];
}> = [
  {
    key: "standardFull",
    title: "LekhaFlow Standard",
    edition: "Full Version",
    description: "Complete Standard edition for your daily invoice-to-Tally workflow.",
    badge: "Full License",
    icon: ShieldCheck,
    accent: "blue",
    features: ["Sales and Purchase processing", "Sales Split and voucher editor", "Tally Sync and Bank Intelligence"],
  },
  {
    key: "standardDemo",
    title: "LekhaFlow Standard",
    edition: "Demo Version",
    description: "Evaluate the Standard workflow before choosing a full license.",
    badge: "7-Day Free Demo",
    icon: Clock3,
    accent: "teal",
    features: ["Standard Demo features", "7-day access from installation", "No purchase required to evaluate"],
  },
  {
    key: "professionalFull",
    title: "LekhaFlow Professional",
    edition: "Full Version",
    description: "Professional accounting and automation tools with Tally connectivity.",
    badge: "Full License",
    icon: ShieldCheck,
    accent: "violet",
    features: ["Purchase and accounting workflows", "Bank Intelligence and Tally Master Hub", "Document Vault"],
  },
  {
    key: "professionalDemo",
    title: "LekhaFlow Professional",
    edition: "Demo Version",
    description: "Try the Professional workflow with a seven-day evaluation period.",
    badge: "7-Day Free Demo",
    icon: Sparkles,
    accent: "amber",
    features: ["Professional Demo features", "7-day access from installation", "Sales module remains locked"],
  },
];

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

const accents = {
  blue: {
    border: "border-blue-200",
    icon: "text-blue-600",
    button: "bg-blue-600 hover:bg-blue-700",
    badge: "bg-blue-50 text-blue-700",
  },
  teal: {
    border: "border-teal-200",
    icon: "text-teal-600",
    button: "bg-teal-600 hover:bg-teal-700",
    badge: "bg-teal-50 text-teal-700",
  },
  violet: {
    border: "border-violet-200",
    icon: "text-violet-600",
    button: "bg-violet-600 hover:bg-violet-700",
    badge: "bg-violet-50 text-violet-700",
  },
  amber: {
    border: "border-amber-200",
    icon: "text-amber-600",
    button: "bg-amber-500 hover:bg-amber-600",
    badge: "bg-amber-50 text-amber-800",
  },
};

export default function DownloadsPage() {
  const [release, setRelease] = useState<ReleaseResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadDownloads() {
      try {
        const response = await fetch("/api/github-release", { cache: "no-store" });
        const data = (await response.json()) as ReleaseResponse;
        if (!response.ok || !data.success) {
          throw new Error(data.error || "Download details could not be loaded.");
        }
        if (active) setRelease(data);
      } catch (error) {
        console.error("Failed to load official LekhaFlow downloads:", error);
        if (active) {
          setRelease({
            success: false,
            error: "Official download information is temporarily unavailable. Please try again later.",
          });
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadDownloads();
    return () => {
      active = false;
    };
  }, []);

  const availableCount = Object.values(release?.products || {}).filter(
    (asset) => asset?.available && asset?.url
  ).length;

  return (
    <main className="min-h-screen bg-white px-4 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-blue-700">
            Official LekhaFlow Release
          </p>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-slate-950 md:text-5xl">
            Download Center
          </h1>
          <p className="mt-4 text-sm text-slate-600">
            Choose the Standard or Professional edition that matches your workflow.
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-slate-500">
            Version 15.2.1{release?.publishedAt ? " · Released " + formatDate(release.publishedAt) : ""}
          </p>
        </header>

        {release?.error && (
          <p role="status" className="mx-auto mb-8 max-w-3xl rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-center text-sm text-amber-900">
            {release.error}
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const asset = release?.products?.[card.key];
            const ready = Boolean(asset?.available && asset?.url);
            const Icon = card.icon;
            const tone = accents[card.accent];

            return (
              <section
                key={card.key}
                className={"flex flex-col rounded-3xl border-2 bg-white p-6 shadow-sm " + tone.border}
              >
                <div className="mb-5 flex items-center gap-3">
                  <Icon size={26} className={tone.icon} />
                  <div>
                    <h2 className="text-lg font-black leading-tight text-slate-950">{card.title}</h2>
                    <p className="text-sm font-semibold text-slate-500">{card.edition}</p>
                  </div>
                </div>

                <span className={"mb-4 w-fit rounded-full px-3 py-1 text-xs font-bold " + tone.badge}>
                  {card.badge}
                </span>
                <p className="mb-5 min-h-12 text-sm leading-6 text-slate-600">{card.description}</p>

                <ul className="mb-6 flex-1 space-y-3 text-sm text-slate-600">
                  {card.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-teal-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-4 min-h-5 text-xs text-slate-500">
                  {loading
                    ? "Checking official release…"
                    : ready
                      ? "Version " + (asset?.version || "15.2.1") + (asset?.size ? " · " + formatBytes(asset.size) : "")
                      : "Installer is not currently available."}
                </div>

                {ready ? (
                  <a
                    href={asset?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={"flex w-full items-center justify-center gap-2 rounded-xl px-4 py-4 text-xs font-black uppercase tracking-widest text-white transition-colors " + tone.button}
                  >
                    <Download size={17} />
                    Download Installer
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-200 px-4 py-4 text-xs font-black uppercase tracking-widest text-slate-500"
                  >
                    {loading ? "Checking…" : "Coming Soon"}
                  </button>
                )}
              </section>
            );
          })}
        </div>

        <div className="mt-9 text-center text-sm text-slate-600">
          {loading
            ? "Checking the official release…"
            : availableCount === 4
              ? "All four official LekhaFlow 15.2.1 installers are available."
              : availableCount + " of 4 installers are available. Unavailable editions remain disabled until verified."}
        </div>
        {release?.releaseUrl && (
          <p className="mt-3 text-center text-xs text-slate-500">
            <a className="font-semibold text-blue-700 underline underline-offset-4" href={release.releaseUrl} target="_blank" rel="noopener noreferrer">
              View official GitHub release and SHA-256 assets
            </a>
          </p>
        )}
      </div>
    </main>
  );
}
