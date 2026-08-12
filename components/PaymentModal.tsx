"use client";

import { useState } from "react";
import { X, CreditCard, Smartphone, Building2, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: "standard" | "gold";
  planName: string;
  price: string;
  razorpayUrl: string;
}

export default function PaymentModal({ isOpen, onClose, plan, planName, price, razorpayUrl }: PaymentModalProps) {
  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [formData, setFormData] = useState({
    name: "Jitendra Bharti",
    company: "Nexoriva Systems",
    email: "jitendrablog6@gmail.com",
    mobile: "+91 8770808695",
  });
  const [loading, setLoading] = useState(false);
  const [showSkipOption, setShowSkipOption] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/save_lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          plan,
          price,
          source: "payment_modal",
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("Lead save error:", err);
    }

    setLoading(false);
    setStep("payment");
  };

  // ✅ Founder Skip Payment Function
  const handleSkipPayment = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate_license", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          mobile: formData.mobile,
          plan: planName,
          amount: price,
          paymentId: "SKIPPED_" + Date.now(),
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStep("success");
        // Download license file
        if (data.licenseContent) {
          const blob = new Blob([data.licenseContent], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "license.dat";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }
    } catch (error) {
      console.error("Skip payment error:", error);
      alert("Failed to generate license. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-slate-900 border-2 border-teal-500 p-8 md:p-10 rounded-[3rem] max-w-lg w-full relative shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {step === "form" && (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">
                    Buy {planName}
                  </h3>
                  <p className="text-teal-500 font-black text-3xl tracking-tighter mt-2">₹{price}</p>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Yearly Subscription</p>
                </div>

                {/* ✅ Skip Payment Option - Only for Founder */}
                {showSkipOption && (
                  <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
                    <p className="text-amber-400 text-[10px] font-bold uppercase tracking-widest text-center">
                      🚀 Founder Mode: Skip Payment & Get License Instantly
                    </p>
                    <button
                      onClick={handleSkipPayment}
                      disabled={loading}
                      className="w-full mt-2 py-2 bg-amber-500 text-black font-black rounded-xl uppercase text-[10px] tracking-widest hover:bg-amber-400 transition-all disabled:opacity-50"
                    >
                      {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : "⚡ Skip Payment & Generate License"}
                    </button>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block mb-2">Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="Jitendra Bharti"
                      className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white font-bold text-xs outline-none focus:border-teal-500 transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block mb-2">Company / Firm Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="Bharti & Associates"
                      className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white font-bold text-xs outline-none focus:border-teal-500 transition-all"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block mb-2">Email *</label>
                    <input
                      required
                      type="email"
                      placeholder="you@company.com"
                      className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white font-bold text-xs outline-none focus:border-teal-500 transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block mb-2">WhatsApp Number *</label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white font-bold text-xs outline-none focus:border-teal-500 transition-all"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-black rounded-2xl uppercase text-[10px] tracking-[0.2em] shadow-xl hover:shadow-teal-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <CreditCard size={16} />}
                    {loading ? "Processing..." : "Continue to Payment"}
                  </button>
                </form>
              </>
            )}

            {step === "payment" && (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Complete Payment</h3>
                  <p className="text-slate-400 text-xs mt-2">Your details have been saved. Choose a payment method:</p>
                </div>

                <div className="space-y-4">
                  <a
                    href={razorpayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 w-full p-5 bg-slate-950 border border-slate-800 rounded-2xl hover:border-teal-500 transition-all group"
                  >
                    <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center group-hover:bg-teal-500/20">
                      <CreditCard className="text-teal-500" size={24} />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-black text-sm uppercase tracking-widest">Pay via Razorpay</p>
                      <p className="text-slate-500 text-[10px]">UPI, Card, NetBanking, Wallet</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 w-full p-5 bg-slate-950 border border-slate-800 rounded-2xl">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                      <Smartphone className="text-amber-500" size={24} />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-black text-sm uppercase tracking-widest">UPI / Bank Transfer</p>
                      <p className="text-slate-500 text-[10px]">WhatsApp us for manual payment</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full p-5 bg-slate-950 border border-slate-800 rounded-2xl">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <Building2 className="text-blue-500" size={24} />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-black text-sm uppercase tracking-widest">NEFT / IMPS</p>
                      <p className="text-slate-500 text-[10px]">For CA firms requiring GST invoice</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
                  <p className="text-amber-400 text-[10px] font-bold uppercase tracking-widest text-center">
                    After payment, share screenshot on WhatsApp for instant license delivery
                  </p>
                </div>

                <button
                  onClick={() => setStep("success")}
                  className="w-full mt-4 py-4 bg-slate-800 text-white font-black rounded-2xl uppercase text-[10px] tracking-widest hover:bg-slate-700 transition-all"
                >
                  I Have Completed Payment
                </button>
              </>
            )}

            {step === "success" && (
              <div className="text-center py-10">
                <CheckCircle2 size={64} className="text-teal-500 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-4">Payment Received!</h3>
                <p className="text-slate-400 text-sm mb-6">
                  Thank you for subscribing to {planName}. We will verify your payment and send the license.dat file to your email and WhatsApp within 10 minutes.
                </p>
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 mb-6">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Next Steps</p>
                  <ol className="text-left text-slate-400 text-xs space-y-2">
                    <li>1. Check your email for license.dat</li>
                    <li>2. Save it to D:/lekhaflow_data/ or Documents/lekhaflow_data/</li>
                    <li>3. Restart LekhaFlow — it will activate automatically</li>
                  </ol>
                </div>
                <a
                  href="https://wa.me/918770808695"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-teal-600 text-white font-black rounded-2xl uppercase text-xs tracking-widest hover:bg-teal-500 transition-all"
                >
                  <Smartphone size={16} /> Contact on WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}