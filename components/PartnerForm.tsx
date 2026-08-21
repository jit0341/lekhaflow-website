"use client";
import { useState } from "react";

export default function PartnerForm({ isHindi }: { isHindi: boolean }) {
  const [formData, setFormData] = useState({
    fullName: "",
    firmName: "",
    address: "",
    phone: "",
    email: "",
    city: "",
    state: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 🔥 Google Apps Script ka Web App URL yahan daalein
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzkgLWnKF4s5VnhkVHbQ9AzB_X5BRFLy9WJNsrdGB4Oj-yQjGy5j4o2Ti97142TvFpAOA/exec

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Important for Google Sheets
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      setFormData({
        fullName: "",
        firmName: "",
        address: "",
        phone: "",
        email: "",
        city: "",
        state: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      alert("Error submitting form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const t = {
    title: isHindi ? "पार्टनर बनें" : "Become a Partner",
    name: isHindi ? "पूरा नाम" : "Full Name",
    firm: isHindi ? "फर्म / कंपनी का नाम" : "Firm / Company Name",
    address: isHindi ? "पता" : "Address",
    phone: isHindi ? "फोन नंबर" : "Phone Number",
    email: isHindi ? "ईमेल" : "Email",
    city: isHindi ? "शहर" : "City",
    state: isHindi ? "राज्य" : "State",
    submit: isHindi ? "सबमिट करें" : "Submit Application",
  };

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
            {t.title}
          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-xl">
          {submitted ? (
            <div className="text-center py-10">
              <p className="text-teal-600 font-black text-xl">
                ✅ {isHindi ? "धन्यवाद! हम जल्द ही संपर्क करेंगे।" : "Thank you! We'll get in touch soon."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                    {t.name} *
                  </label>
                  <input
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 focus:border-teal-500 outline-none"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                    {t.firm} *
                  </label>
                  <input
                    required
                    value={formData.firmName}
                    onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 focus:border-teal-500 outline-none"
                    placeholder="Firm or company name"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                    {t.address} *
                  </label>
                  <input
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 focus:border-teal-500 outline-none"
                    placeholder="Office address"
                  />
                </div>
                <div>
                  <label className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                    {t.phone} *
                  </label>
                  <input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 focus:border-teal-500 outline-none"
                    placeholder="WhatsApp number"
                  />
                </div>
                <div>
                  <label className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 focus:border-teal-500 outline-none"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                    {t.city}
                  </label>
                  <input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 focus:border-teal-500 outline-none"
                    placeholder="Your city"
                  />
                </div>
                <div>
                  <label className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                    {t.state}
                  </label>
                  <input
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 focus:border-teal-500 outline-none"
                    placeholder="Your state"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-5 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl uppercase text-xs tracking-widest transition-all disabled:opacity-50"
              >
                {submitting ? "Submitting..." : t.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}