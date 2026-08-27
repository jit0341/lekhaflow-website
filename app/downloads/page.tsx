"use client";
import { Download, CheckCircle2, Sparkles, Clock, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DownloadsPage() {
  const [downloadLinks, setDownloadLinks] = useState({
    gold: "",
    standard_full: "",
    standard_trial: "",
  });
  const [latestVersion, setLatestVersion] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [loadingDownloads, setLoadingDownloads] = useState(true);

  useEffect(() => {
    async function loadDownloads() {
      try {
        const response = await fetch("/api/github-release", {
          cache: "no-store",
        });
        const data = await response.json();

        if (data.success) {
          setDownloadLinks({
            standard_full: data.standard?.url || "",
            standard_trial: data.standardTrial?.url || "",
            gold: data.gold?.url || "",
          });
          setLatestVersion(data.latestVersion || "");
          setPublishedAt(data.publishedAt || "");
        }
      } catch (err) {
        console.error("Failed to load latest release:", err);
      } finally {
        setLoadingDownloads(false);
      }
    }

    loadDownloads();
  }, []);

  const formatDate = (date: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic">
            Download Center
          </h1>
          <p className="text-slate-500 text-sm mt-4">Choose your LekhaFlow version</p>
          {latestVersion && (
            <p className="text-slate-400 text-[10px] mt-2 font-bold uppercase tracking-widest">
              Latest Stable Build: {latestVersion}
              {publishedAt ? ` | Released: ${formatDate(publishedAt)}` : ""}
            </p>
          )}
        </div>

        {/* 3 Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* 1. Standard Full Version */}
          <div className="bg-slate-900 border-2 border-blue-500 p-8 rounded-[3rem] shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-blue-500" size={24} />
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Standard Full</h2>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1 inline-block mb-4">
              <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Full License</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 size={16} className="text-teal-500" /> 10,000 Invoices/Year</li>
              <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 size={16} className="text-teal-500" /> Bank Statement → Tally</li>
              <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 size={16} className="text-teal-500" /> Email Support</li>
            </ul>
            <a
              href={downloadLinks.standard_full || undefined}
              download
              aria-disabled={!downloadLinks.standard_full}
              className={`flex items-center justify-center gap-3 w-full py-5 text-white font-black rounded-2xl uppercase text-xs tracking-widest transition-all ${
                downloadLinks.standard_full
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-slate-700 opacity-60 pointer-events-none"
              }`}
            >
              <Download size={18} /> {loadingDownloads ? "Loading..." : "Download Full"}
            </a>
          </div>

          {/* 2. Standard Trial Version */}
          <div className="bg-slate-900 border-2 border-teal-500 p-8 rounded-[3rem] shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-teal-500" size={24} />
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Standard Trial</h2>
            </div>
            <div className="bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-1 inline-block mb-4">
              <span className="text-teal-400 text-[10px] font-black uppercase tracking-widest">7-Day Free Trial</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 size={16} className="text-teal-500" /> All Standard Features</li>
              <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 size={16} className="text-teal-500" /> No Credit Card Required</li>
              <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 size={16} className="text-teal-500" /> 7 Days Full Access</li>
            </ul>
            <a
              href={downloadLinks.standard_trial || undefined}
              download
              aria-disabled={!downloadLinks.standard_trial}
              className={`flex items-center justify-center gap-3 w-full py-5 text-white font-black rounded-2xl uppercase text-xs tracking-widest transition-all ${
                downloadLinks.standard_trial
                  ? "bg-teal-600 hover:bg-teal-500"
                  : "bg-slate-700 opacity-60 pointer-events-none"
              }`}
            >
              <Download size={18} /> {loadingDownloads ? "Loading..." : "Download Trial"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}