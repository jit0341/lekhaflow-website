"use client";

import { Download, CheckCircle2, Clock3, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

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

const cards = [
  {
    key: "standardFull",
    title: "LekhaFlow Standard",
    subtitle: "Full Version",
    description: "Complete Standard edition with Sales Split, voucher editor, Tally Sync, Bank Intelligence and Document Vault.",
    badge: "Full License",
    icon: ShieldCheck,
    accent: "blue",
  },
  {
    key: "standardDemo",
    title: "LekhaFlow Standard",
    subtitle: "Demo Version",
    description: "Try the full Standard feature set with the demo limits before purchasing.",
    badge: "7-Day Free Demo",
    icon: Clock3,
    accent: "teal",
  },
  {
    key: "professionalFull",
    title: "LekhaFlow Professional",
    subtitle: "Full Version",
    description: "All core accounting and automation features. Sales Split is available in Standard.",
    badge: "Full License",
    icon: ShieldCheck,
    accent: "violet",
  },
  {
    key: "professionalDemo",
    title: "LekhaFlow Professional",
    subtitle: "Demo Version",
    description: "Explore the Professional feature set with the demo limits before purchasing.",
    badge: "7-Day Free Demo",
    icon: Sparkles,
    accent: "amber",
  },
] as const;

function formatBytes(value: number) {
  if (!value || value <= 0) return "";
  if (value >= 1024 * 1024 * 1024) return (value / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  return (value / (1024 * 1024)).toFixed(1) + " MB";
}

export default function DownloadsPage() {
  const [release, setRelease] = useState<ReleaseResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadDownloads() {
      try {
        const response = await fetch("/api/github-release", { cache: "no-store" });
        const data = (await response.json()) as ReleaseResponse;
        if (active) setRelease(data);
      } catch (error) {
        console.error("Failed to load LekhaFlow release assets:", error);
        if (active) setRelease({ success: false, error: "Download details are temporarily unavailable." });
      } finally {
        if (active) setLoading(false);
      }
    }
    loadDownloads();
    return () => { active = false; };
  }, []);

  const availableCount = Object.values(release?.products || {}).filter((asset) => asset?.available).length;

  return (
    <main className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tighter italic">Download Center</h1>
          <p className="text-slate-600 text-sm mt-4">Choose the LekhaFlow edition that matches your business workflow.</p>
          {release?.latestVersion && (
            <p className="text-slate-500 text-xs mt-3 font-bold uppercase tracking-widest">
              Release {release.latestVersion}
              {release.publishedAt ? " · " + new Date(release.publishedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : ""}
            </p>
          )}
        </header>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card) => {
            const asset = release?.products?.[card.key];
            const Icon = card.icon;
            const ready = Boolean(asset?.available && asset?.url);
            const border = {
              blue: "border-blue-200",
              teal: "border-teal-200",
              violet: "border-violet-200",
              amber: "border-amber-200",
            }[card.accent];
            const iconColor = {
              blue: "text-blue-600",
              teal: "text-teal-600",
              violet: "text-violet-600",
              amber: "text-amber-600",
            }[card.accent];
            const buttonColor = {
              blue: "bg-blue-600 hover:bg-blue-700",
              teal: "bg-teal-600 hover:bg-teal-700",
              violet: "bg-violet-600 hover:bg-violet-700",
              amber: "bg-amber-500 hover:bg-amber-600",
            }[card.accent];

            return (
              <section key={card.key} className={`flex flex-col rounded-3xl border-2 ${border} bg-white p-6 shadow-sm`}>
                <div className="mb-5 flex items-center gap-3">
                  <Icon className={iconColor} size={26} />
                  <div>
                    <h2 className="text-lg font-black leading-tight text-slate-950">{card.title}</h2>
                    <p className="text-sm font-semibold text-slate-500">{card.subtitle}</p>
                  </div>
                </div>
                <p className="mb-4 inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{card.badge}</p>
                <p className="mb-6 flex-1 text-sm leading-6 text-slate-600">{card.description}</p>
                <div className="mb-4 text-xs text-slate-500">
                  {ready ? (
                    <>{asset?.version ? "Version " + asset.version : ""}{asset?.size ? " · " + formatBytes(asset.size) : ""}</>
                  ) : loading ? "Checking official release…" : "Installer will appear here after the GitHub release is published."}
                </div>
                <a
                  href={ready ? asset?.url : undefined}
                  aria-disabled={!ready}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-4 text-xs font-black uppercase tracking-widest text-white transition-colors ${ready ? buttonColor : "pointer-events-none bg-slate-300"}`}
                >
                  <Download size={17} />
                  {loading ? "Checking…" : ready ? "Download Installer" : "Coming Soon"}
                </a>
              </section>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          {availableCount === 4
            ? "All four installers are available from the official LekhaFlow GitHub release."
            : `${availableCount} of 4 installers are currently published. Unpublished editions remain disabled until their verified setup files are released.`}
        </p>
      </div>
    </main>
  );
}
