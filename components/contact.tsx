"use client";

import { useState } from "react";

// Props Interface: page.tsx से आ रहे 'isHindi' को एक्सेप्ट करने के लिए
interface ContactProps {
  isHindi: boolean;
}

export default function Contact({ isHindi }: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [emailError, setEmailError] = useState(""); 

  // ड्युअल-लैंग्वेज डिक्शनरी (UI टेक्स्ट को सिंक करने के लिए)
  const t = {
    en: {
      heroSub: "Nexoriva Systems",
      heroTitle: <>Let’s Build Your <br /> <span className="text-yellow-400">Accounting Automation</span></>,
      heroDesc: "Automate your accounting workflow with us. Complete the form, and our team will contact you promptly.",
      placeholderName: "Your Name",
      placeholderEmail: "Email Address",
      placeholderCompany: "Company Name (Optional)",
      placeholderMessage: "Tell us about your workflow",
      btnSubmit: "Request Consultation",
      btnSubmitting: "Submitting...",
      alertError: "Please fill the form correctly.",
      alertFail: "Submission failed. Please try again.",
      alertNet: "Networking error. Please check your connection.",
      thankYouTitle: "Thank You",
      thankYouDesc: "Your request has been successfully received by **Nexoriva Systems**. Our expert deployment team will contact you within the next 24 hours.",
      thankYouNote: "📬 We have forwarded a confirmation note to your email:",
      btnBack: "Go Back / Submit another response",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email address (e.g. name@company.com)"
    },
    hi: {
      heroSub: "नेक्सोरीवा सिस्टम्स",
      heroTitle: <>अपनी <br /> <span className="text-yellow-400">अकाउंटिंग ऑटोमेशन</span> बनाएं</>,
      heroDesc: "हमारे साथ अपने एकाउंटिंग फ्लो को ऑटोमेट करें। फॉर्म भरें, हमारी टीम आपसे जल्द ही संपर्क करेगी।",
      placeholderName: "आपका नाम",
      placeholderEmail: "ईमेल एड्रेस",
      placeholderCompany: "कंपनी का नाम (वैकल्पिक)",
      placeholderMessage: "हमें अपने वर्कफ़्लो आवश्यकताओं के बारे में बताएं",
      btnSubmit: "डेमो / परामर्श का अनुरोध करें",
      btnSubmitting: "सबमिट हो रहा है...",
      alertError: "कृपया फॉर्म सही से भरें",
      alertFail: "सबमिशन विफल रहा। कृपया पुनः प्रयास करें।",
      alertNet: "नेटवर्किंग एरर। कृपया अपना इंटरनेट कनेक्शन चेक करें।",
      thankYouTitle: "धन्यवाद",
      thankYouDesc: "आपका अनुरोध **Nexoriva Systems** को प्राप्त हो गया है। हमारी टेक्निकल डिप्लॉयमेंट टीम अगले 24 घंटों में आपसे संपर्क करेगी।",
      thankYouNote: "📬 हमने आपकी ईमेल पर एक कन्फर्मेशन नोट भेजा है:",
      btnBack: "वापस जाएं / दूसरा फॉर्म भरें",
      emailRequired: "ईमेल लिखना अनिवार्य है",
      emailInvalid: "कृपया एक सही ईमेल एड्रेस डालें (e.g. name@company.com)"
    }
  };

  const current = isHindi ? t.hi : t.en;

  // ईमेल चेक करने के लिए Regex Function
  const validateEmail = (inputEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputEmail) {
      setEmailError(current.emailRequired);
    } else if (!emailRegex.test(inputEmail)) {
      setEmailError(current.emailInvalid);
    } else {
      setEmailError(""); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (emailError || !email) {
      alert(current.alertError);
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
        setIsSubmitted(true); 
      } else {
        alert(current.alertFail);
      }
    } catch (error) {
      console.error(error);
      alert(current.alertNet);
    } finally {
      setLoading(false);
    }
  };

  // इंटरैक्टिव ड्युअल-लैंग्वेज Thank You व्यू
  if (isSubmitted) {
    return (
      <section className="relative z-20 py-16 px-6 text-center bg-gradient-to-b from-transparent to-[#040a14]">
        <div className="max-w-3xl mx-auto bg-[#081120]/90 border border-green-500/30 rounded-3xl p-12 shadow-2xl space-y-6">
          <div className="w-20 h-20 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center text-4xl mx-auto border border-green-500/20 animate-bounce">
            ✓
          </div>
          <h2 className="text-4xl font-bold text-white">{current.thankYouTitle}, {name}!</h2>
          <p className="text-zinc-300 text-sm leading-relaxed max-w-xl mx-auto">
            {isHindi ? (
              <span>आपका अनुरोध <strong>Nexoriva Systems</strong> को प्राप्त हो गया है। हमारी टेक्निकल डिप्लॉयमेंट टीम अगले 24 घंटों में आपसे संपर्क करेगी।</span>
            ) : (
              <span>Your request has been successfully received by <strong>Nexoriva Systems</strong>. Our expert deployment team will contact you within the next 24 hours.</span>
            )}
          </p>
          <div className="p-4 bg-[#101b2d] rounded-xl border border-cyan-500/10 text-xs text-cyan-400 font-mono">
            {current.thankYouNote} <span className="underline text-white font-bold">{email}</span>
          </div>
          <div className="pt-4">
            <button 
              onClick={() => { setIsSubmitted(false); setName(""); setEmail(""); setCompany(""); setMessage(""); }} 
              className="text-zinc-400 hover:text-white underline text-xs transition-colors cursor-pointer"
            >
              {current.btnBack}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // डायनेमिक इनपुट फॉर्म व्यू
  return (
    <section className="relative z-20 py-12 px-6 bg-gradient-to-b from-transparent to-[#040a14]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <p className="text-cyan-400 tracking-[0.3em] text-xs uppercase font-bold">{current.heroSub}</p>
          <h2 className="text-3xl md:text-5xl font-black leading-tight text-white tracking-tight">
            {current.heroTitle}
          </h2>
          <p className="text-zinc-400 text-sm font-medium leading-relaxed max-w-md">
            {current.heroDesc}
          </p>
        </div>

        <div className="relative">
          <form onSubmit={handleSubmit} className="relative z-50 bg-[#081120]/80 backdrop-blur-md border border-cyan-500/20 rounded-3xl p-6 space-y-4 shadow-2xl">
            <input
              type="text"
              placeholder={current.placeholderName}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#101b2d] border border-cyan-500/20 rounded-xl px-4 py-3.5 outline-none text-white text-xs font-bold focus:border-cyan-400 transition-colors"
              required
            />

            <div>
              <input
                type="email"
                placeholder={current.placeholderEmail}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value); 
                }}
                className={`w-full bg-[#101b2d] border text-xs font-bold ${emailError ? 'border-red-500/50 focus:border-red-500' : 'border-cyan-500/20 focus:border-cyan-400'} rounded-xl px-4 py-3.5 outline-none text-white transition-colors`}
                required
              />
              {emailError && <p className="text-red-400 text-[10px] mt-1.5 ml-2 font-bold">{emailError}</p>}
            </div>

            <input
              type="text"
              placeholder={current.placeholderCompany}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full bg-[#101b2d] border border-cyan-500/20 rounded-xl px-4 py-3.5 outline-none text-white text-xs font-bold focus:border-cyan-400 transition-colors"
            />

            <textarea
              placeholder={current.placeholderMessage}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-28 bg-[#101b2d] border border-cyan-500/20 rounded-xl px-4 py-3.5 outline-none text-white text-xs font-bold focus:border-cyan-400 transition-colors resize-none"
            />

            <button
              type="submit"
              disabled={loading || !!emailError}
              className="w-full py-3.5 rounded-xl font-black text-black bg-gradient-to-r from-cyan-400 to-yellow-400 hover:opacity-90 active:scale-[0.99] transition-all duration-300 text-xs uppercase tracking-wider cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
            >
              {loading ? current.btnSubmitting : current.btnSubmit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}