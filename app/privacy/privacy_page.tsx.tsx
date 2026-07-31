import { Metadata } from "next";
import { ShieldCheck, Database, Eye, Trash2, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | LekhaFlow",
  description: "LekhaFlow privacy policy. Learn how we handle your data, invoice information, and machine identifiers with zero-retention local processing.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#020617] py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-teal-500/5 border border-teal-500/20 rounded-full mb-6">
            <ShieldCheck size={14} className="text-teal-500" />
            <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.4em]">Legal</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
            Privacy <span className="text-teal-500">Policy</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            Last updated: 1st August 2026
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10">
            <div className="flex items-center gap-3 mb-6">
              <Database className="text-teal-500" size={24} />
              <h2 className="text-white font-black uppercase tracking-widest text-lg">1. Data Processing Philosophy</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              LekhaFlow is designed with a <strong className="text-white">local-first architecture</strong>. All invoice PDFs, bank statements, 
              and images are processed entirely on your Windows computer. No invoice data, bank details, or financial records are ever uploaded 
              to LekhaFlow servers or cloud storage.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              The only data transmitted to our servers is anonymized license validation metadata (machine ID, license key) and payment 
              confirmation details (name, email, phone) required for subscription management.
            </p>
          </section>

          <section className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="text-blue-500" size={24} />
              <h2 className="text-white font-black uppercase tracking-widest text-lg">2. Information We Collect</h2>
            </div>
            <ul className="space-y-3 text-slate-400 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-teal-500 mt-1">•</span>
                <span><strong className="text-white">Payment Information:</strong> Name, email, phone number, company name, and Razorpay payment ID collected during checkout.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-500 mt-1">•</span>
                <span><strong className="text-white">Machine Identifier:</strong> A unique hardware ID generated from your computer's components, used solely for license binding.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-500 mt-1">•</span>
                <span><strong className="text-white">Usage Analytics:</strong> Optional anonymized crash reports and feature usage statistics to improve the software.</span>
              </li>
            </ul>
          </section>

          <section className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-amber-500" size={24} />
              <h2 className="text-white font-black uppercase tracking-widest text-lg">3. How We Use Your Information</h2>
            </div>
            <ul className="space-y-3 text-slate-400 text-sm leading-relaxed">
              <li className="flex items-start gap-3"><span className="text-teal-500 mt-1">•</span>To generate and deliver your software license file</li>
              <li className="flex items-start gap-3"><span className="text-teal-500 mt-1">•</span>To send payment receipts and subscription renewal reminders</li>
              <li className="flex items-start gap-3"><span className="text-teal-500 mt-1">•</span>To provide technical support via WhatsApp and email</li>
              <li className="flex items-start gap-3"><span className="text-teal-500 mt-1">•</span>To comply with Indian tax and accounting regulations</li>
            </ul>
          </section>

          <section className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10">
            <div className="flex items-center gap-3 mb-6">
              <Trash2 className="text-pink-500" size={24} />
              <h2 className="text-white font-black uppercase tracking-widest text-lg">4. Data Retention & Deletion</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Payment and license records are retained for 7 years as required by Indian tax law. If you request account deletion, 
              we will anonymize your personal details within 30 days while retaining anonymized transaction records for compliance. 
              To request deletion, email <strong className="text-white">support@lekhaflow.in</strong> or WhatsApp <strong className="text-white">+91-87708-08695</strong>.
            </p>
          </section>

          <section className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10">
            <h2 className="text-white font-black uppercase tracking-widest text-lg mb-4">5. Contact</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              For privacy-related queries, contact:<br />
              <strong className="text-white">Jitendra Bharti</strong>, Founder<br />
              Email: support@lekhaflow.in<br />
              WhatsApp: +91-87708-08695<br />
              Address: Ambikapur, Surguja, Chhattisgarh, India — 497001
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}