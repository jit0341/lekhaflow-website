"use client";

import { useState } from "react";
import { Building2, User, MapPin, Phone, Mail, Users, Loader2, CheckCircle2 } from "lucide-react";

type PartnerFormProps = {
  isHindi?: boolean;
};

export default function PartnerForm({ isHindi = false }: PartnerFormProps) {
  const [form, setForm] = useState({
    name: "",
    firmName: "",
    address: "",
    mobile: "",
    email: "",
    employees: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/save_lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "partner_page",
          timestamp: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setDone(true);
    } catch {
      setError(isHindi ? "कुछ गलत हो गया। WhatsApp पर संपर्क करें।" : "Something went wrong. Please contact us on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <section id="partner" className="py-20 bg-teal-50 border-y border-teal-200">
        <div className="max-w-xl mx-auto px-6 text-center">
          <CheckCircle2 className="mx-auto text-teal-600 mb-4" size={56} />
          <h2 className="text-3xl font-black text-slate-900 mb-3">
            {isHindi ? "धन्यवाद!" : "Thank You!"}
          </h2>
          <p className="text-slate-700 text-lg">
            {isHindi
              ? "आपका पार्टनर आवेदन मिल गया। हम जल्द संपर्क करेंगे।"
              : "Your partner application is received. We will contact you soon."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="partner" className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex rounded-full border border-teal-300 bg-teal-50 px-5 py-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-800">
              {isHindi ? "पार्टनरशिप" : "PARTNERSHIP"}
            </span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter mb-3">
            {isHindi ? "पार्टनर बनें" : "Become a Partner"}
          </h2>
          <p className="text-slate-700 text-base max-w-lg mx-auto">
            {isHindi
              ? "CA firms, resellers और consultants — LekhaFlow के साथ जुड़ें। नीचे फॉर्म भरें।"
              : "CA firms, resellers and consultants — partner with LekhaFlow. Fill the form below."}
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm space-y-5"
        >
          <div>
            <label className="flex items-center gap-2 text-[10px] font-black text-teal-700 uppercase tracking-widest mb-2">
              <User size={14} /> {isHindi ? "पूरा नाम *" : "Full Name *"}
            </label>
            <input
              required
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder={isHindi ? "आपका नाम" : "Your full name"}
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-slate-900 font-semibold text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-[10px] font-black text-teal-700 uppercase tracking-widest mb-2">
              <Building2 size={14} /> {isHindi ? "फर्म / कंपनी का नाम *" : "Firm / Company Name *"}
            </label>
            <input
              required
              name="firmName"
              value={form.firmName}
              onChange={onChange}
              placeholder={isHindi ? "फर्म का नाम" : "Firm or company name"}
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-slate-900 font-semibold text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-[10px] font-black text-teal-700 uppercase tracking-widest mb-2">
              <MapPin size={14} /> {isHindi ? "पता *" : "Address *"}
            </label>
            <textarea
              required
              name="address"
              value={form.address}
              onChange={onChange}
              rows={3}
              placeholder={isHindi ? "पूरा पता" : "Full address"}
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-slate-900 font-semibold text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black text-teal-700 uppercase tracking-widest mb-2">
                <Phone size={14} /> {isHindi ? "मोबाइल *" : "Mobile *"}
              </label>
              <input
                required
                name="mobile"
                type="tel"
                value={form.mobile}
                onChange={onChange}
                placeholder="+91 98765 43210"
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-slate-900 font-semibold text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black text-teal-700 uppercase tracking-widest mb-2">
                <Mail size={14} /> {isHindi ? "ईमेल *" : "Email *"}
              </label>
              <input
                required
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@firm.com"
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-slate-900 font-semibold text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-[10px] font-black text-teal-700 uppercase tracking-widest mb-2">
              <Users size={14} /> {isHindi ? "कर्मचारियों की संख्या *" : "Number of Employees *"}
            </label>
            <select
              required
              name="employees"
              value={form.employees}
              onChange={onChange}
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-slate-900 font-semibold text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            >
              <option value="">{isHindi ? "चयन करें" : "Select"}</option>
              <option value="1-5">1 – 5</option>
              <option value="6-15">6 – 15</option>
              <option value="16-50">16 – 50</option>
              <option value="50+">50+</option>
            </select>
          </div>

          {error && (
            <p className="text-red-600 text-sm font-medium text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl uppercase text-xs tracking-widest shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            {loading
              ? isHindi
                ? "भेज रहे हैं..."
                : "Submitting..."
              : isHindi
              ? "आवेदन भेजें"
              : "Submit Partner Application"}
          </button>
        </form>
      </div>
    </section>
  );
}
