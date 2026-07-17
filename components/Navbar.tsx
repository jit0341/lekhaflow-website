import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-[100] bg-slate-950/80 border-b border-slate-800 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black text-white italic">
          LEKHA<span className="text-teal-500">FLOW</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-slate-400">
          <Link href="/pricing" className="hover:text-white">Pricing</Link>
          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-white">
              Products <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 hidden group-hover:block bg-slate-900 border border-slate-800 p-4 w-48 rounded-xl shadow-2xl">
              <Link href="/downloads" className="block p-2 hover:bg-slate-800 rounded">Gold Version</Link>
              <Link href="/downloads" className="block p-2 hover:bg-slate-800 rounded">Standard</Link>
            </div>
          </div>
          <Link href="/blog" className="hover:text-white">Insights</Link>
          <Link href="/contact" className="hover:text-white">Support</Link>
          <Link href="/downloads" className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-500 transition-all">
            Download Trial
          </Link>
        </div>
      </div>
    </nav>
  );
}