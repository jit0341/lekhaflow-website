"use client";

import { useEffect, useState } from "react";
import { Download, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type ReleaseInfo = {
  success?: boolean;
  latestVersion?: string;
  publishedAt?: string;
  standard?: { url?: string; name?: string; size?: number };
  error?: string;
};

export default function UpdatesPage() {
  const [release, setRelease] = useState<ReleaseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function loadRelease() {
      try {
        const response = await fetch("/api/github-release", { cache: "no-store" });
        const data = (await response.json()) as ReleaseInfo;
        if (!response.ok || !data.success) {
          throw new Error(data.error || "Release information is unavailable.");
        }
        if (active) setRelease(data);
      } catch {
        if (active) setError("Release information is temporarily unavailable. Please visit the Download Center.");
      } finally {
        if (active) setLoading(false);
      }
    }
    loadRelease();
    return () => { active = false; };
  }, []);

  const downloadUrl = release?.standard?.url || "";

  return (
    <main className="min-h-screen bg-white py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-black text-slate-950 uppercase italic tracking-tighter text-center mb-4">
          Software Updates
        </h1>
        <p className="text-slate-600 text-center mb-12">
          Check the latest LekhaFlow Standard release and installer.
        </p>

        <section className="bg-white border-2 border-amber-500 p-8 rounded-3xl mb-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-black text-slate-950">
                {loading ? "Checking latest release..." : release?.latestVersion ? "Latest Standard Version: " + release.latestVersion : "Latest Standard Release"}
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                {release?.publishedAt
                  ? "Released: " + new Date(release.publishedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                  : "Release details are retrieved directly from GitHub."}
              </p>
            </div>
            <a
              href={downloadUrl || undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!downloadUrl}
              className={`px-8 py-4 rounded-2xl font-black uppercase text-sm tracking-widest transition-all flex items-center gap-3 ${downloadUrl ? "bg-amber-500 hover:bg-amber-400 text-black" : "bg-slate-200 text-slate-500 pointer-events-none"}`}
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
              Download Latest Version
            </a>
          </div>
          {error && (
            <p className="mt-6 flex items-center gap-2 text-sm text-amber-800">
              <AlertCircle size={18} /> {error}
            </p>
          )}
          {!loading && !error && !downloadUrl && (
            <p className="mt-6 text-sm text-amber-800">No Standard installer was found in the published GitHub releases. Please contact support.</p>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-black text-slate-950 flex items-center gap-2">
            <CheckCircle2 className="text-teal-600" size={22} /> Update instructions
          </h2>
          <ol className="mt-4 list-decimal pl-5 space-y-2 text-sm text-slate-600">
            <li>Download the latest Standard installer.</li>
            <li>Close LekhaFlow before running the installer.</li>
            <li>Run the installer and follow the setup instructions.</li>
            <li>Keep your existing license file and important data safe during the update.</li>
          </ol>
          <p className="mt-4 text-xs text-slate-500">LekhaFlow Gold is under development and is not currently available.</p>
        </section>
      </div>
    </main>
  );
}
