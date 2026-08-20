"use client";
import { useState } from "react";
import QRCode from "qrcode";

export default function AdminQRGenerator() {
  const [amount, setAmount] = useState(9999);
  const [qrImage, setQrImage] = useState("");

  const generateQR = async () => {
    const res = await fetch("/api/create-payment-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // ✅ Headers zaroori hai
      body: JSON.stringify({ 
        amount, 
        clientName: "Client", 
        clientEmail: "test@test.com", 
        clientMobile: "9876543210" 
      })
    });
    const data = await res.json();
    if (data.success) {
      const qr = await QRCode.toDataURL(data.short_url);
      setQrImage(qr);
    } else {
      alert("Error generating QR: " + data.error);
    }
  };

  return (
    <div className="p-10 bg-slate-900 rounded-3xl border border-slate-700">
      <h2 className="text-white font-black text-2xl mb-4">Generate Dynamic QR</h2>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(Number(e.target.value))} 
        className="p-3 rounded-xl text-black w-full mb-4" 
        placeholder="Enter Amount" 
      />
      <button 
        onClick={generateQR} 
        className="bg-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-500 transition-all"
      >
        Generate QR
      </button>
      {qrImage && (
        <div className="mt-6 flex justify-center">
            <img src={qrImage} alt="Payment QR" className="w-48 h-48 bg-white p-2 rounded-xl" />
        </div>
      )}
    </div>
  );
}