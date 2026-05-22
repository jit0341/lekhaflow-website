"use client";

import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // रीडायरेक्ट/थैंक्यू स्टेट के लिए
  const [emailError, setEmailError] = useState(""); // ईमेल वैलिडेशन के लिए

  // ईमेल चेक करने के लिए Regex Function
  const validateEmail = (inputEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputEmail) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(inputEmail)) {
      setEmailError("कृपया एक सही ईमेल एड्रेस डालें (e.g. name@company.com)");
    } else {
      setEmailError(""); // कोई एरर नहीं
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // सबमिट करने से पहले अंतिम बार ईमेल चेक करें
    if (emailError || !email) {
      alert("कृपया फॉर्म सही से भरें");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby0dPm1lVMXOudRmNWRU4WyNhCXYYR1gYH8eqTVuVMZ2Mabe6-aN5n_Bn3mVe18rxUZ/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({ name, email, company, message }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true); // सबमिशन सफल होते ही थैंक्यू स्टेट ऑन करें
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Networking error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // अगर फॉर्म सबमिट हो गया है, तो सीधे ये सुंदर इंटरैक्टिव Thank You व्यू दिखाओ
  if (isSubmitted) {
    return (
      <section className="relative z-20 py-24 px-6 text-center bg-gradient-to-b from-transparent to-[#040a14]">
        <div className="max-w-3xl mx-auto bg-[#081120]/90 border border-green-500/30 rounded-3xl p-12 shadow-2xl space-y-6">
          <div className="w-20 h-20 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center text-4xl mx-auto border border-green-500/20 animate-bounce">
            ✓
          </div>
          <h2 className="text-4xl font-bold text-white">Thank You, {name}!</h2>
          <p className="text-zinc-300 text-lg">
            आपका अनुरोध **Nexoriva Systems** को प्राप्त हो गया है। हमारी टीम अगले 24 घंटों में आपसे संपर्क करेगी।
          </p>
          <div className="p-4 bg-[#101b2d] rounded-xl border border-cyan-500/10 text-sm text-cyan-400">
            📬 हमने आपकी ईमेल **{email}** पर एक कन्फर्मेशन नोट भेजा है।
          </div>
          <div className="pt-4">
            <button 
              onClick={() => setIsSubmitted(false)} 
              className="text-zinc-400 hover:text-white underline text-sm transition-colors cursor-pointer"
            >
              Go Back / Submit another response
            </button>
          </div>
        </div>
      </section>
    );
  }

  // पुराना फॉर्म व्यू (बस ईमेल एरर मैसेज के साथ)
  return (
    <section className="relative z-20 py-24 px-6 bg-gradient-to-b from-transparent to-[#040a14]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-cyan-400 tracking-[0.3em] text-sm uppercase font-semibold">Nexoriva Systems</p>
          <h2 className="text-5xl font-bold mt-4 leading-tight text-white">
            Let’s Build Your <br />
            <span className="text-yellow-400">Accounting Automation</span>
          </h2>
          <p className="text-zinc-400 mt-4 text-lg">
            हमारे साथ अपने एकाउंटिंग फ्लो को ऑटोमेट करें। फॉर्म भरें, हमारी टीम आपसे जल्द ही संपर्क करेगी।
          </p>
        </div>

        <div className="relative">
          <form onSubmit={handleSubmit} className="relative z-50 bg-[#081120]/80 backdrop-blur-md border border-cyan-500/20 rounded-3xl p-8 space-y-6 shadow-2xl">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#101b2d] border border-cyan-500/20 rounded-xl px-5 py-4 outline-none text-white focus:border-cyan-400 transition-colors"
              required
            />

            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value); // हर टाइप पर चेक करेगा
                }}
                className={`w-full bg-[#101b2d] border ${emailError ? 'border-red-500/50 focus:border-red-500' : 'border-cyan-500/20 focus:border-cyan-400'} rounded-xl px-5 py-4 outline-none text-white transition-colors`}
                required
              />
              {emailError && <p className="text-red-400 text-xs mt-1.5 ml-2 font-medium">{emailError}</p>}
            </div>

            <input
              type="text"
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full bg-[#101b2d] border border-cyan-500/20 rounded-xl px-5 py-4 outline-none text-white focus:border-cyan-400 transition-colors"
            />

            <textarea
              placeholder="Tell us about your workflow"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-32 bg-[#101b2d] border border-cyan-500/20 rounded-xl px-5 py-4 outline-none text-white focus:border-cyan-400 transition-colors resize-none"
            />

            <button
              type="submit"
              disabled={loading || !!emailError}
              className="w-full py-4 rounded-xl font-semibold text-black bg-gradient-to-r from-cyan-400 to-yellow-400 hover:opacity-90 active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? "Submitting..." : "Request Consultation"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}