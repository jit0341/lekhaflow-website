"use client";
import { useState } from "react";
import QRCode from "qrcode";

export default function AdminQRGenerator() {
  const [amount, setAmount] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientMobile, setClientMobile] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQR = async () => {
    if (!amount || !clientName || !clientMobile) {
      alert("Please fill Amount, Name and Mobile Number");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/create-payment-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount),
          clientName,
          clientEmail,
          clientMobile,
        }),
      });
      const data = await res.json();
      if (data.success) {
        const qr = await QRCode.toDataURL(data.short_url);
        setQrImage(qr);
      } else {
        alert("Error generating QR: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate QR. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl max-w-2xl mx-auto">
      <h2 className="text-white font-black text-3xl mb-8 text-center tracking-tighter">
        Generate Dynamic QR
      </h2>

      <div className="space-y-6">
        {/* Amount Input - Now clearly visible */}
        <div>
          <label className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-1">
            Amount (₹) *
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold text-lg outline-none focus:border-teal-500 transition-all placeholder-slate-500"
            placeholder="e.g. 9999"
          />
        </div>

        {/* Client Name */}
        <div>
          <label className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-1">
            Client Name *
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold outline-none focus:border-teal-500 transition-all placeholder-slate-500"
            placeholder="e.g. Rajesh Sharma"
          />
        </div>

        {/* Client Mobile */}
        <div>
          <label className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-1">
            WhatsApp / Mobile Number *
          </label>
          <input
            type="text"
            value={clientMobile}
            onChange={(e) => setClientMobile(e.target.value)}
            className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold outline-none focus:border-teal-500 transition-all placeholder-slate-500"
            placeholder="e.g. 9876543210"
          />
        </div>

        {/* Client Email (Optional) */}
        <div>
          <label className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-1">
            Client Email (Optional)
          </label>
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold outline-none focus:border-teal-500 transition-all placeholder-slate-500"
            placeholder="e.g. rajesh@gmail.com"
          />
        </div>

        <button
          onClick={generateQR}
          disabled={loading}
          className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-xl uppercase tracking-widest text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "Generate QR Code"}
        </button>

        {qrImage && (
          <div className="mt-8 flex flex-col items-center border-t border-slate-800 pt-8">
            <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">
              ✅ QR Code Generated for ₹{Number(amount).toLocaleString()}
            </p>
            <div className="bg-white p-4 rounded-2xl shadow-2xl">
              <img src={qrImage} alt="Payment QR" className="w-56 h-56" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}