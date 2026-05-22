import Contact from "@/components/contact";
import ParticlesBackground from "@/components/ParticlesBackground";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#020617] overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* 1. Background Interactive Particles */}
      <ParticlesBackground />

      {/* 2. Top Header / Navigation Subtle Section */}
      <header className="relative z-50 max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-white tracking-wide">
          Lekha<span className="text-cyan-400">Flow</span>
        </div>
        <div className="text-xs text-zinc-500 font-mono bg-zinc-900/50 px-3 py-1.5 rounded-full border border-zinc-800/50">
          v2.0.26 // Active
        </div>
      </header>

      {/* 3. Main Content Area */}
      <main>
        <Contact />
      </main>

      {/* 4. Floating Interaction Components */}
      <WhatsAppButton />
    </div>
  );
}