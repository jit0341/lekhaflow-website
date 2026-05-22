"use client";

import Contact from "@/components/contact";
import ParticlesBackground from "@/components/ParticlesBackground";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#020617] overflow-x-hidden text-white selection:bg-cyan-500 selection:text-black">
      {/* 1. Background Interactive Particles */}
      <ParticlesBackground />

      {/* 2. Navigation Header */}
      <header className="relative z-50 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-zinc-800/50 backdrop-blur-sm">
        <div className="text-2xl font-bold tracking-wide">
          Lekha<span className="text-cyan-400">Flow</span>
        </div>
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-zinc-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#products" className="hover:text-white transition">Products</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition">
            Client Login
          </button>
          <button className="px-4 py-2 text-xs font-semibold rounded-lg bg-yellow-500 text-black hover:bg-yellow-400 transition">
            Download Trial
          </button>
        </div>
      </header>

      {/* 3. Hero Section (आपका पुराना मुख्य फीचर्स वाला डिज़ाइन) */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-block bg-yellow-500/10 text-yellow-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-yellow-500/20">
            MSME Registered AI Automation Platform
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            AI Accounting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Automation
            </span> <br />
            for Tally & BUSY
          </h1>
          <p className="text-zinc-400 text-lg max-w-md">
            LekhaFlow आपके इनवॉइस और एकाउंटिंग डेटा को बिना किसी गलती के सीधे आपके एकाउंटिंग सॉफ्टवेयर के अनुकूल बनाता है।
          </p>
        </div>

        {/* Dashboard Preview Component (पुराना राइट साइड वाला व्यू) */}
        <div className="bg-[#081120]/80 backdrop-blur-md border border-zinc-800 p-6 rounded-2xl shadow-2xl space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
            <div className="text-sm font-mono text-zinc-400">Live AI Processing</div>
            <span className="bg-green-500/20 text-green-400 text-xs px-2.5 py-0.5 rounded-full font-semibold">ACTIVE</span>
          </div>
          <h3 className="text-xl font-bold text-yellow-400">LekhaFlow Dashboard</h3>
          
          <div className="space-y-3 font-mono text-sm">
            <div className="flex justify-between p-3 bg-zinc-900/50 rounded-xl">
              <span className="text-zinc-400">Total Invoices Processed</span>
              <span className="text-white font-bold">12,845</span>
            </div>
            <div className="flex justify-between p-3 bg-zinc-900/50 rounded-xl">
              <span className="text-zinc-400">AI Cost Saved via Cache</span>
              <span className="text-green-400 font-bold">₹8,420</span>
            </div>
            <div className="flex justify-between p-3 bg-zinc-900/50 rounded-xl">
              <span className="text-zinc-400">Concurrent Processing</span>
              <span className="text-cyan-400 font-bold">20 Threads</span>
            </div>
          </div>
        </div>
      </main>

      {/* 4. Contact Form Section (नया इंटरैक्टिव फॉर्म जो नीचे दिखाई देगा) */}
      <div id="contact" className="border-t border-zinc-900 bg-gradient-to-b from-transparent to-[#040a14]">
        <Contact />
      </div>

      {/* 5. WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}