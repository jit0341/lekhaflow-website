"use client";

import Contact from "@/components/contact";
import ParticlesBackground from "@/components/ParticlesBackground";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"lite" | "standard" | "premium" | "busy">("premium");

  return (
    <div className="relative min-h-screen bg-[#020617] overflow-x-hidden text-white font-sans selection:bg-cyan-500 selection:text-black">
      {/* 1. Background Interactive Particles */}
      <ParticlesBackground />

      {/* 2. Professional Header */}
      <header className="relative z-50 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-zinc-800/50 backdrop-blur-md sticky top-0 bg-[#020617]/80">
        <div className="text-2xl font-bold tracking-wide">
          Lekha<span className="text-cyan-400">Flow</span>
          <span className="text-[10px] block text-zinc-500 font-mono tracking-normal">by Nexoriva Systems</span>
        </div>
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-zinc-400">
          <a href="#hero" className="hover:text-white transition">Home</a>
          <a href="#features" className="hover:text-white transition">Product Features</a>
          <a href="#pricing" className="hover:text-white transition">Pricing Plans</a>
          <a href="#contact" className="hover:text-white transition">Request Demo</a>
        </nav>
        <div className="flex space-x-3">
          <button className="px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition">
            Client Login
          </button>
          <a href="#contact" className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:opacity-90 transition shadow-lg shadow-cyan-500/10">
            Download Trial
          </a>
        </div>
      </header>

      {/* 3. Hero & Live Interactive GUI Dashboard Preview */}
      <section id="hero" className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-block bg-yellow-500/10 text-yellow-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-yellow-500/20">
            🛡️ Registered MSME (Udyam): UDYAM-CG-27-0013072
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            AI Accounting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500">
              Automation
            </span> <br />
            for Tally & BUSY
          </h1>
          <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
            "Automating Accuracy, Empowering Accountants" — PDF या इमेज वाले बिलों से बिना किसी गलती के डेटा सीधे आपके एकाउंटिंग सॉफ्टवेयर फॉर्मेट में एक्सट्रैक्ट करें.
          </p>
          <div className="flex space-x-4">
            <a href="#contact" className="px-6 py-3 rounded-xl font-bold bg-yellow-500 text-black hover:bg-yellow-400 transition transform hover:scale-[1.02]">
              Start Free Demo
            </a>
            <a href="#features" className="px-6 py-3 rounded-xl font-bold bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition">
              Explore Features
            </a>
          </div>
        </div>

        {/* Dynamic Interactive GUI Dashboard Component */}
        <div className="bg-[#081120]/80 backdrop-blur-md border border-cyan-500/10 p-6 rounded-3xl shadow-2xl space-y-4 relative">
          <div className="absolute -top-3 -right-3 w-24 h-24 bg-cyan-500/10 blur-2xl rounded-full"></div>
          <div className="flex justify-between items-center pb-3 border-b border-zinc-800/80">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-xs font-mono text-zinc-500 ml-2">lekhaflow_gui.exe</span>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-semibold border border-emerald-500/20 animate-pulse">
              ● AI ENGINE ACTIVE
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
              <div className="text-xs text-zinc-500 font-mono mb-1">CURRENT PROCESSING ARCHITECTURE</div>
              <div className="text-lg font-bold text-white flex justify-between">
                <span>Ultra-Fast Multi-Threading</span>
                <span className="text-cyan-400">20 Concurrent Workers</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-800/50">
                <div className="text-zinc-500 mb-1">Total Invoices</div>
                <div className="text-xl font-bold text-yellow-400">12,845</div>
              </div>
              <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-800/50">
                <div className="text-zinc-500 mb-1">AI Credits Saved</div>
                <div className="text-xl font-bold text-green-400">₹ 8,420 (Cache)</div>
              </div>
            </div>

            {/* Smart License Monitor Mock UI */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-zinc-400 px-1">
                <span>License Limit Status (Premium)</span>
                <span>4,120 / 5,000 Invoices</span>
              </div>
              <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden p-[2px] border border-zinc-800">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full" style={{ width: "82%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Deep Feature Explorer Tabs (LITE, STANDARD, PREMIUM, BUSY Features) */}
      <section id="features" className="relative z-20 max-w-7xl mx-auto px-6 py-20 border-t border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold tracking-tight">सॉफ्टवेयर के शक्तिशाली फीचर्स</h2>
          <p className="text-zinc-400 mt-2 text-sm">अपनी व्यावसायिक आवश्यकता के अनुसार सर्वोत्तम टियर एक्सप्लोर करें</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-xl mx-auto">
          {(["lite", "standard", "premium", "busy"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl font-semibold capitalize text-sm transition-all cursor-pointer ${
                activeTab === tab 
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20" 
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
              }`}
            >
              LekhaFlow {tab}
            </button>
          ))}
        </div>

        {/* Tab Content Cards */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-3xl max-w-4xl mx-auto">
          {activeTab === "lite" && (
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-cyan-400">LekhaFlow LITE (बेस प्रोडक्ट)</h3>
                <p className="text-zinc-400 text-sm">बेसिक रिपोर्टिंग और सटीक एक्सेल एक्सट्रैक्शन के लिए सर्वोत्तम टूल.</p>
              </div>
              <ul className="space-y-2 text-sm text-zinc-300 font-medium">
                <li className="flex items-center gap-2">📊 True Copy Excel (100% हूबहू डेटा)</li>
                <li className="flex items-center gap-2">📑 इनवॉइस समरी एक्सेल (टैक्स फाइलिंग रेडी)</li>
                <li className="flex items-center gap-2">🧩 यूनिवर्सल टेम्पलेट मैपर (Autofill Custom Excel)</li>
                <li className="flex items-center gap-2">🤖 AI-पावर्ड डेटा एक्सट्रैक्शन (Gemini 1.5 Flash)</li>
                <li className="flex items-center gap-2">⚙️ सिक्योर लोकल स्टोरेज और मशीन ID लॉक</li>
              </ul>
            </div>
          )}

          {activeTab === "standard" && (
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-teal-400">LekhaFlow STANDARD (मिड-टियर)</h3>
                <p className="text-zinc-400 text-sm">Tally XML ऑटोमेशन और फुल लेजर मैपिंग पावर के साथ पैक्ड.</p>
              </div>
              <ul className="space-y-2 text-sm text-zinc-300 font-medium">
                <li className="flex items-center gap-2">⚡ पर्चेस इनवॉइस ऑटोमेशन (Tally XML जनरेटर)</li>
                <li className="flex items-center gap-2">🏢 स्मार्ट मास्टर क्रिएशन (Sundry Debtors/Creditors)</li>
                <li className="flex items-center gap-2">🏦 हाइब्रिड बैंक पार्सर (Statement Automation)</li>
                <li className="flex items-center gap-2">🛡️ डुप्लीकेट लेजर प्रोटेक्शन (GSTIN नंबर वैलिडेशन)</li>
                <li className="flex items-center gap-2">🎓 Tally Edu वर्ज़न सपोर्ट (तारीख 1, 2 या 31 फिक्स)</li>
              </ul>
            </div>
          )}

          {activeTab === "premium" && (
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-yellow-400">LekhaFlow PREMIUM (टॉप-टियर)</h3>
                <p className="text-zinc-400 text-sm">एडवांस 50K ऑटो-स्प्लिटिंग और GSTR-2B रिकॉन्सिलिएशन पावरहाउस.</p>
              </div>
              <ul className="space-y-2 text-sm text-zinc-300 font-medium">
                <li className="flex items-center gap-2">🔀 50,000 लिमिट ऑटो-स्प्लिट लॉजिक (रैंडम जनरेशन)</li>
                <li className="flex items-center gap-2">🔄 GSTR-2B रिकॉन्सिलिएशन (कलर-कोडेड एक्सेल रिपोर्ट)</li>
                <li className="flex items-center gap-2">🚀 अल्ट्रा-फास्ट मल्टी-थ्रेडिंग (20 Concurrent Threads)</li>
                <li className="flex items-center gap-2">🔍 एडवांस बैंक नरेशन एनालिसिस (असली नाम खोजें)</li>
                <li className="flex items-center gap-2">🛑 एडवांस टैम्पर डिटेक्शन (लाइसेंस हैकिंग प्रोटेक्शन)</li>
              </ul>
            </div>
          )}

          {activeTab === "busy" && (
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-blue-400">LekhaFlow BUSY (डेडिकेटेड)</h3>
                <p className="text-zinc-400 text-sm">BUSY सॉफ्टवेयर एनवायरनमेंट के लिए विशेष रूप से ऑप्टिमाइज्ड.</p>
              </div>
              <ul className="space-y-2 text-sm text-zinc-300 font-medium">
                <li className="flex items-center gap-2">🗂️ Single-Sheet Split Files (नो हैंगिंग इश्यू)</li>
                <li className="flex items-center gap-2">🔄 व्यवस्थित इम्पोर्ट ऑर्डर (Accounts → Items → Vouchers)</li>
                <li className="flex items-center gap-2">📋 BUSY फ़ील्ड मैपिंग प्रेडिक्शन (A-K Column Mapping)</li>
                <li className="flex items-center gap-2">📝 ऑटो-जनरेटेड Busy_Import_Guide.txt</li>
                <li className="flex items-center gap-2">✅ ज़ीरो-टच वाउचर इम्पोर्ट गारंटी</li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 5. Clean Pricing Architecture Table */}
      <section id="pricing" className="relative z-20 max-w-7xl mx-auto px-6 py-12 border-t border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight">सरल और पारदर्शी मूल्य निर्धारण</h2>
          <p className="text-zinc-400 mt-2 text-sm">सभी प्लान्स में टैली/बिजी हेतु अनलिमिटेड बैंक स्टेटमेंट एंट्री शामिल है</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* LITE CARD */}
          <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-zinc-300">LekhaFlow LITE</h3>
              <p className="text-xs text-zinc-500 mt-1">एक्सेल समरी और बेसिक एनालिसिस</p>
              <div className="my-6">
                <span className="text-3xl font-extrabold text-white">₹ 8,000</span>
                <span className="text-zinc-500 text-xs font-mono block mt-1">5,000 Invoices / Year</span>
              </div>
              <div className="text-sm font-bold text-zinc-400 pt-2 border-t border-zinc-800/60">₹ 15,000 <span className="text-xs font-normal text-zinc-500">for 10K limit</span></div>
            </div>
            <a href="#contact" className="w-full text-center py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold transition mt-6 block">Choose Lite</a>
          </div>

          {/* STANDARD CARD */}
          <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-teal-400">LekhaFlow STANDARD</h3>
              <p className="text-xs text-zinc-500 mt-1">टैली ऑटो एंट्री + मास्टर क्रिएशन</p>
              <div className="my-6">
                <span className="text-3xl font-extrabold text-white">₹ 15,000</span>
                <span className="text-zinc-500 text-xs font-mono block mt-1">5,000 Invoices / Year</span>
              </div>
              <div className="text-sm font-bold text-teal-400 pt-2 border-t border-zinc-800/60">₹ 25,000 <span className="text-xs font-normal text-zinc-500">for 10K limit</span></div>
            </div>
            <a href="#contact" className="w-full text-center py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold transition mt-6 block">Choose Standard</a>
          </div>

          {/* PREMIUM CARD (POPULAR) */}
          <div className="bg-gradient-to-b from-cyan-950/40 to-zinc-900/30 border-2 border-cyan-500/30 p-6 rounded-3xl flex flex-col justify-between relative shadow-xl shadow-cyan-500/5">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-black font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">Most Advanced</span>
            <div>
              <h3 className="text-xl font-bold text-cyan-400">LekhaFlow PREMIUM</h3>
              <p className="text-xs text-zinc-500 mt-1">फुल ऑटोमेशन + अमाउंट स्प्लिटिंग</p>
              <div className="my-6">
                <span className="text-3xl font-extrabold text-white">₹ 18,000</span>
                <span className="text-cyan-500 text-xs font-mono block mt-1">5,000 Invoices / Year</span>
              </div>
              <div className="text-sm font-bold text-cyan-400 pt-2 border-t border-zinc-800/60">₹ 35,000 <span className="text-xs font-normal text-zinc-500">for 10K limit</span></div>
            </div>
            <a href="#contact" className="w-full text-center py-3 rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 text-sm font-bold transition mt-6 block">Get Premium</a>
          </div>

          {/* BUSY CARD */}
          <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-blue-400">LekhaFlow BUSY</h3>
              <p className="text-xs text-zinc-500 mt-1">बिजी सॉफ्टवेयर एनवायरनमेंट हेतु</p>
              <div className="my-6">
                <span className="text-3xl font-extrabold text-white">₹ 15,000</span>
                <span className="text-zinc-500 text-xs font-mono block mt-1">5,000 Invoices / Year</span>
              </div>
              <div className="text-sm font-bold text-blue-400 pt-2 border-t border-zinc-800/60">₹ 25,000 <span className="text-xs font-normal text-zinc-500">for 10K limit</span></div>
            </div>
            <a href="#contact" className="w-full text-center py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold transition mt-6 block">Choose Busy</a>
          </div>
        </div>
      </section>

      {/* 6. Contact Form Area (Active Google Sheet Form Hooked Here) */}
      <section id="contact" className="border-t border-zinc-900 bg-gradient-to-b from-transparent to-[#040a14]">
        <Contact />
      </section>

      {/* 7. Footer */}
      <footer className="bg-zinc-950 py-8 border-t border-zinc-900 text-center text-xs text-zinc-500 space-y-2">
        <p className="font-bold text-zinc-300">Nexoriva Systems © 2026</p>
        <p>Surajpur, Chhattisgarh, India | Nexoriva.systems@gmail.com</p>
        <p className="text-[10px] text-zinc-600">Made with ❤️ in India | Developed by Jitendra Bharti</p>
      </footer>

      {/* 8. WhatsApp Floating Trigger */}
      <WhatsAppButton />
    </div>
  );
}