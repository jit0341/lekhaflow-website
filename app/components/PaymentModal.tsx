"use client";

import React, { useState } from "react";
import { X, Cpu, CreditCard, ShieldCheck } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: "STANDARD" | "GOLD";
  price: string;
  razorpayUrl: string;
}

export default function PaymentModal({ isOpen, onClose, plan, price, razorpayUrl }: PaymentModalProps) {
  const [machineId, setMachineId] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState<"form" | "confirm">("form");

  if (!isOpen) return null;

  const handleProceed = () => {
    if (!machineId.trim() || !email.trim() || !mobile.trim() || !name.trim()) {
      alert("Please fill all fields");
      return;
    }
    setStep("confirm");
  };

  const handlePayment = () => {
    // Store details in localStorage for webhook reference
    localStorage.setItem("lekhaflow_payment", JSON.stringify({
      machineId, email, mobile, name, plan, timestamp: Date.now()
    }));

    // Open Razorpay with pre-filled notes
    // Note: For Razorpay Pages, you need to pass notes via URL or use Razorpay Checkout API
    // This is a simplified flow - ideally use Razorpay Checkout API for full control
    window.open(razorpayUrl, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
      <div className="bg-slate-900 border-2 border-teal-500 p-8 rounded-[2.5rem] max-w-md w-full relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white">
          <X size={24}/>
        </button>

        {step === "form" ? (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CreditCard className="text-teal-500" size={28} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{plan} License</h3>
              <p className="text-teal-400 font-black text-3xl mt-2">₹{price}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block mb-2">Full Name</label>
                <input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name" 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white font-bold text-sm outline-none focus:border-teal-500 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block mb-2">Email</label>
                <input 
                  type="email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@company.com" 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white font-bold text-sm outline-none focus:border-teal-500 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block mb-2">WhatsApp Number</label>
                <input 
                  value={mobile} 
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91-XXXXXXXXXX" 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white font-bold text-sm outline-none focus:border-teal-500 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block mb-2 flex items-center gap-2">
                  <Cpu size={12}/> Machine Hardware ID
                </label>
                <input 
                  value={machineId} 
                  onChange={(e) => setMachineId(e.target.value)}
                  placeholder="Paste Machine ID from software" 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white font-bold text-sm outline-none focus:border-teal-500 transition-all"
                />
                <p className="text-slate-600 text-[10px] mt-2">Open LekhaFlow → Copy Hardware ID → Paste here</p>
              </div>
            </div>

            <button 
              onClick={handleProceed}
              className="w-full py-5 bg-teal-600 text-white font-black rounded-2xl uppercase text-xs tracking-widest hover:bg-teal-500 transition-all"
            >
              Proceed to Payment
            </button>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <ShieldCheck className="mx-auto text-teal-500" size={48} />
            <h3 className="text-xl font-black text-white uppercase">Confirm Details</h3>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-left space-y-3">
              <p className="text-slate-400 text-sm"><span className="text-slate-600 font-bold">Name:</span> {name}</p>
              <p className="text-slate-400 text-sm"><span className="text-slate-600 font-bold">Email:</span> {email}</p>
              <p className="text-slate-400 text-sm"><span className="text-slate-600 font-bold">Mobile:</span> {mobile}</p>
              <p className="text-slate-400 text-sm"><span className="text-slate-600 font-bold">Machine ID:</span> <span className="text-teal-400 font-mono text-xs">{machineId}</span></p>
              <p className="text-slate-400 text-sm"><span className="text-slate-600 font-bold">Plan:</span> <span className="text-amber-400 font-bold">{plan}</span></p>
            </div>

            <p className="text-slate-500 text-xs">License.dat will be emailed & WhatsApped within 2 hours of payment.</p>

            <div className="flex gap-3">
              <button onClick={() => setStep("form")} className="flex-1 py-4 bg-slate-800 text-white font-black rounded-2xl uppercase text-xs tracking-widest hover:bg-slate-700 transition-all">
                Back
              </button>
              <button onClick={handlePayment} className="flex-1 py-4 bg-teal-600 text-white font-black rounded-2xl uppercase text-xs tracking-widest hover:bg-teal-500 transition-all">
                Pay ₹{price}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}