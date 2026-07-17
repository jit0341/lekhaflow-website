"use client";
import { useEffect, useState } from 'react';
import { Download, ShieldCheck } from 'lucide-react';

export default function DownloadsPage() {
  const [releases, setReleases] = useState<any>(null);

  useEffect(() => {
    fetch('/api/github_release').then(res => res.json()).then(data => setReleases(data));
  }, []);

  const softwareList = [
    { id: 'gold', name: 'LekhaFlow Gold', icon: '🏆', desc: 'Premium AI with advanced reconciliation.' },
    { id: 'standard', name: 'LekhaFlow Standard', icon: '⚡', desc: 'Fast extraction for small firms.' },
    { id: 'demo', name: '7-Day Trial', icon: '🎁', desc: 'Test all features for free.' }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-5xl font-black text-white mb-4">Download Center</h1>
      <p className="text-slate-400 mb-16 max-w-2xl">Always get the official and latest versions of LekhaFlow tools here. All downloads are digitally signed and safe.</p>

      <div className="grid md:grid-cols-3 gap-8">
        {softwareList.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-teal-500 transition-all group">
            <span className="text-4xl mb-6 block">{item.icon}</span>
            <h2 className="text-xl font-bold text-white mb-2">{item.name}</h2>
            <p className="text-slate-500 text-sm mb-8">{item.desc}</p>
            
            <a 
              href={releases?.[item.id]?.url || '#'} 
              className="flex items-center justify-between w-full p-4 bg-slate-950 border border-slate-800 rounded-xl group-hover:bg-teal-600 group-hover:text-black transition-all"
            >
              <span className="font-bold uppercase text-[10px]">Download Now</span>
              <Download size={18} />
            </a>
            {releases?.[item.id]?.publishedAt && (
               <p className="mt-4 text-[10px] text-slate-600 uppercase font-bold">Latest Build: {new Date(releases[item.id].publishedAt).toLocaleDateString()}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}