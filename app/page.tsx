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
  const [quotationData, setQuotationData] = useState<any | null>(null);
  const [showIntakeModal, setShowIntakeModal] = useState<boolean>(false);
  const [intakeTarget, setIntakeTarget] = useState<"demo" | "quotation">("demo");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [clientForm, setClientForm] = useState({ clientName: "", companyName: "", mobileNumber: "", clientEmail: "" });

  useEffect(() => {
    document.title = "LekhaFlow | Premium Tally Automation Platform";
  }, []);

  const WHATSAPP_LINK = "https://wa.me/918770808695";

  const downloadRoutes = {
    gold: "https://rzp.io/rzp/9HGERapH", // उदाहरण लिंक, आप अपने ड्रॉपबॉक्स लिंक यहाँ डाल सकते हैं
    standard: "https://rzp.io/rzp/SkJTqlgi",
    lite: "https://rzp.io/rzp/oVwLNxHT",
    erp9_premium: "https://rzp.io/rzp/BLZgsWB",
    erp9_standard: "https://rzp.io/rzp/AZMi622y"
  };

  // --- यहाँ से आपका पुराना content और logic शुरू होता है ---
  // (मैंने इसे संक्षेप में रखा है ताकि कोड पढ़ा जा सके, आप अपना पूरा content यहाँ रखें)
  const productData = { /* ... आपका पिछला पूरा productData Object यहाँ रहेगा ... */ };
  const currentContent = isHindi ? { /* hi content */ } : { /* en content */ };

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-amber-500 selection:text-slate-950 antialiased">
      
      {/* 📱 1. MOBILE DASHBOARD VIEW (Visible only on Mobile) */}
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
        {/* मोबाइल फुटर */}
        <div className="mt-auto p-8 text-center text-[10px] text-slate-400 font-bold">
            Nexoriva Systems © 2026
        </div>
      </div>

      {/* 💻 2. DESKTOP LANDING PAGE (Visible only on Desktop) */}
      <div className="hidden md:block">
        {/* 🌟 यहाँ आपका पूरा पुराना Desktop Header रहेगा */}
        <header className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center border-b border-slate-800 bg-slate-950/95 sticky top-0 z-50">
            <div className="text-xl font-black text-white tracking-wider">Lekha<span className="text-amber-500">Flow</span></div>
            <nav className="flex space-x-8 text-slate-300 font-black text-[11px]">
                <Link href="#hero" className="hover:text-amber-400">Home</Link>
                <Link href="#matrix" className="hover:text-amber-400">Software Variants</Link>
                <Link href="#pricing" className="hover:text-amber-400">Pricing</Link>
                <Link href="#contact" className="hover:text-amber-400">Contact</Link>
            </nav>
            <button className="bg-amber-500 text-slate-950 px-4 py-2 rounded-lg font-black text-[10px]">Download Installer</button>
        </header>

        {/* 🚀 यहाँ आपका पूरा पुराना Hero Section */}
        <section id="hero" className="max-w-6xl mx-auto px-4 py-20">
            <h1 className="text-6xl font-black text-white leading-tight">Automate Tally Entries <br/> in <span className="text-amber-500">Minutes</span></h1>
            <p className="text-slate-400 mt-6 max-w-2xl text-lg font-medium">Stop entering invoices manually. LekhaFlow does it with 100% precision.</p>
            <div className="mt-10 flex gap-4">
                <button className="bg-amber-500 text-slate-950 px-8 py-4 rounded-xl font-black uppercase tracking-wider">Start Free Trial</button>
                <button className="border border-slate-700 text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider">View Gallery</button>
            </div>
        </section>

        {/* 📊 यहाँ आपका पुराना Matrix, Comparison और Pricing Section रहेगा */}
        {/* (आप अपना पिछला पूरा कोड यहाँ पेस्ट करें) */}
        
        <section id="contact" className="py-20 bg-slate-900/20">
            <div className="max-w-xl mx-auto text-center mb-10">
                <h2 className="text-2xl font-black text-white uppercase tracking-widest">Submit Requirements</h2>
            </div>
            <Contact isHindi={isHindi} />
        </section>

        {/* 🛡️ डेस्कटॉप फुटर */}
        <footer className="py-10 border-t border-slate-900 text-center text-slate-500 text-[11px] font-bold">
            Engineered by Jitendra Bharti | Nexoriva Systems © 2026
        </footer>
      </div>

    </div>
  );
}