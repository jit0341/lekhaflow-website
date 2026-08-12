// app/updates/page.tsx

"use client";

import { useState, useEffect } from "react";
import { Download, CheckCircle2, Zap, Shield, Cpu, ArrowRight } from "lucide-react";

export default function UpdatesPage() {
  const [latestVersion, setLatestVersion] = useState("v15.0");
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [changelog, setChangelog] = useState([]);

  useEffect(() => {
    async function fetchUpdates() {
      // ✅ GitHub से Latest Release Fetch करें
      const res = await fetch("/api/github_release");
      const data = await res.json();
      if (data.success) {
        setLatestVersion(data.latestVersion);
        setChangelog(data.changelog || []);
      }
    }
    fetchUpdates();
  }, []);

  const handleUpdate = async () => {
    // ✅ Update Download Trigger
    const res = await fetch("/api/update/latest");
    const data = await res.json();
    if (data.url) {
      window.open(data.url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter text-center mb-4">
          Software Updates
        </h1>
        <p className="text-slate-400 text-center mb-12">
          Keep your LekhaFlow Gold up to date with the latest features
        </p>

        {/* ✅ Update Now Button */}
        <div className="bg-slate-900 border-2 border-amber-500 p-8 rounded-3xl mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-2xl font-black text-white">
                Update Available: {latestVersion}
              </h2>
              <p className="text-slate-400 text-sm">
                New features and improvements are ready for you!
              </p>
            </div>
            <button
              onClick={handleUpdate}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black rounded-2xl font-black uppercase text-sm tracking-widest transition-all flex items-center gap-3"
            >
              <Download size={20} />
              Update Now
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* ✅ Changelog */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
            What's New
          </h2>
          {changelog.map((feature: string, index: number) => (
            <div key={index} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-teal-500 flex-shrink-0 mt-1" size={20} />
                <span className="text-slate-300">{feature}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}