"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Camera, Key, Activity, DownloadCloud, Zap, Crown, 
  Building2, CheckCircle2, ChevronDown 
} from "lucide-react";
import Contact from "@/components/contact";

export default function Home() {
  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"gold" | "standard" | "lite" | "erp9_premium" | "erp9_standard">("gold");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    document.title = "LekhaFlow | AI Accounting Automation";
  }, []);

  const downloadRoutes = {
    gold: "https://www.dropbox.com/scl/fi/tyv7sepqejvkvfn7mjvzq/Lekhaflow_Gold_setup.rar?dl=1",
    standard: "https://www.dropbox.com/scl/fi/8pqk5mvruopj1wzhmfi0d/Lekhaflow_Standard_setup.rar?dl=1",
    lite: "https://www.dropbox.com/scl/fi/i49mnsm6z2x97n3vivvs7/LekhaFlow_LITE_setup.rar?dl=1",
    erp9_premium: "https://www.dropbox.com/scl/fi/3uby3jvlhd2gcqjwkbpo2/Lekhaflow_ERP9_Premium_setup.rar?dl=1",
    erp9_standard: "https://www.dropbox.com/scl/fi/kmd3tbus1feicyt9zr5lb/LekhaFlow_ERP9_Standard_setup.rar?dl=1"
  };

  const productData = {
    gold: { title: "Gold Suite", price: "₹18,000", limit: "10,000 Invoices" },
    standard: { title: "Standard Sync", price: "₹15,000", limit: "5,000 Invoices" },
    lite: { title: "Lite Engine", price: "₹10,000", limit: "2,000 Invoices" },
    erp9_premium: { title: "ERP9 Premium", price: "₹18,000", limit: "10,000 Invoices" },
    erp9_standard: { title: "ERP9 Standard", price: "₹15,000", limit: "5,000 Invoices" }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950 antialiased">
      
      {/* 📱 1. MOBILE DASHBOARD VIEW */}
      <div className="md:hidden flex flex-col min-h-screen bg-slate-50 text-slate-900">
        <div className="bg-[#1e3a8a] p-6 text-white rounded-b-[2.5rem] shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-black tracking-tighter">LekhaFlow GO</h1>
            <button onClick={() => setIsHindi(!isHindi)} className="text-[10px] border border-white/30 px-2 py-1 rounded">
              {isHindi ? "English" : "हिंदी"}
            </button>
          </div>
          <p className="text-teal-400 text-sm font-bold italic">Scanner & Cloud Sync Active</p>
        </div>

        <div className="p-4 -mt-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center active:scale-95 transition-all">
              <div className="bg-teal-50 p-4 rounded-full mb-3 text-teal-600"><Camera /></div>
              <span className="font-bold text-slate-800 text-xs">Scan Invoice</span>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center active:scale-95 transition-all">
              <div className="bg-blue-50 p-4 rounded-full mb-3 text-blue-600"><Key /></div>
              <span className="font-bold text-slate-800 text-xs">License Key</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-md border border-blue-100">
            <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2"><Activity size={18}/> Usage Analytics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1 uppercase text-slate-500">
                  <span>Free Trial Progress</span>
                  <span>Day 3/7</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[40%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1e3a8a] p-6 rounded-[2rem] text-white flex justify-between items-center shadow-lg">
            <div>
              <p className="text-[10px] font-bold text-teal-400 uppercase">Desktop Version</p>
              <h4 className="text-sm font-black">Download EXE Setup</h4>
            </div>
            <Link href={downloadRoutes[activeTab]} className="bg-teal-500 p-3 rounded-xl shadow-lg"><DownloadCloud /></Link>
          </div>
        </div>
        <div className="mt-auto p-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Nexoriva Systems © 2026
        </div>
      </div>

      {/* 💻 2. DESKTOP VIEW */}
      <div className="hidden md:block">
        <header className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center border-b border-slate-800 bg-slate-950/95 sticky top-0 z-50">
            <div className="text-xl font-black text-white tracking-wider uppercase">Lekha<span className="text-amber-500">Flow</span></div>
            <nav className="flex space-x-8 text-slate-300 font-black text-[11px] uppercase tracking-widest">
                <Link href="/" className="hover:text-amber-400">Home</Link>
                <Link href="#pricing" className="hover:text-amber-400">Pricing</Link>
                <Link href="#contact" className="hover:text-amber-400">Contact</Link>
            </nav>
            <button className="bg-amber-500 text-slate-950 px-4 py-2 rounded-lg font-black text-[10px] uppercase">Client Login</button>
        </header>

        <section className="max-w-6xl mx-auto px-4 py-32 text-center">
            <h1 className="text-7xl font-black text-white leading-tight tracking-tighter">
                AUTOMATE TALLY <br/> IN <span className="text-amber-500">MINUTES</span>
            </h1>
            <p className="text-slate-400 mt-8 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
                Stop manual data entry. Our AI engine converts invoices and bank statements to Tally with 100% precision.
            </p>
            <div className="mt-12 flex justify-center gap-6">
                <button className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-amber-500 transition-all">Start Free Trial</button>
                <button className="border-2 border-slate-800 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 transition-all">Watch Demo</button>
            </div>
        </section>

        {/* Pricing Matrix */}
        <section id="pricing" className="max-w-6xl mx-auto px-4 py-24 border-t border-slate-900">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(productData).slice(0,3).map(([key, item]) => (
                    <div key={key} className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-amber-500 transition-all group">
                        <h3 className="text-2xl font-black mb-2">{item.title}</h3>
                        <p className="text-amber-500 font-black text-3xl mb-6">{item.price}</p>
                        <ul className="space-y-4 text-slate-400 font-bold text-sm mb-8">
                            <li className="flex items-center gap-2 text-teal-400">✔ {item.limit} Invoices</li>
                            <li>✔ Direct Tally Import</li>
                            <li>✔ HSN/GST Mapping</li>
                            <li>✔ Bank Statement Parser</li>
                        </ul>
                        <button className="w-full py-4 bg-slate-800 rounded-xl font-black uppercase text-xs group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">Select Plan</button>
                    </div>
                ))}
            </div>
        </section>

        <section id="contact" className="py-32 bg-slate-900/20 border-t border-slate-900">
            <div className="max-w-xl mx-auto text-center mb-16">
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Submit Requirements</h2>
                <p className="text-slate-500 mt-4 font-bold">Our engineering desk will contact you shortly.</p>
            </div>
            <Contact isHindi={isHindi} />
        </section>

        <footer className="py-16 border-t border-slate-900 text-center">
            <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em]">Nexoriva Systems © 2026 | Developed in India</p>
        </footer>
      </div>
    </div>
  );
}