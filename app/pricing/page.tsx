"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"standard" | "gold" | null>(null);

  const plans = {
    standard: {
      id: "standard",
      name: "LekhaFlow Standard",
      price: 7999,
      originalPrice: 15000,
      limit: "10,000 Invoices/Year",
      razorpayKey: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      features: [
        "Bank Statement → Tally (Unlimited)",
        "PDF / Image Invoice → Tally",
        "Excel True Copy Export",
        "Auto Ledger & Stock Creation",
        "Email Support",
      ],
    },
    gold: {
      id: "gold",
      name: "LekhaFlow Gold",
      price: 7999,
      originalPrice: 25000,
      limit: "Unlimited Invoices/Year",
      razorpayKey: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      features: [
        "Everything in Standard",
        "GSTR-2B Reconciliation",
        "Sales Split Below ₹50,000",
        "Multi-Company Support",
        "Direct WhatsApp Support from Founder",
      ],
    },
  };

  const handlePayment = (planKey: "standard" | "gold") => {
    const plan = plans[planKey];
    setSelectedPlan(planKey);
    setLoading(true);

    // Create order
    fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan: planKey,
        amount: plan.price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          throw new Error(data.error || "Failed to create order");
        }

        // Initialize Razorpay
        const options = {
          key: plan.razorpayKey,
          amount: data.amount,
          currency: "INR",
          name: "LekhaFlow",
          description: `${plan.name} - Lifetime License`,
          order_id: data.orderId,
          prefill: {
            name: "",
            email: "",
            contact: "",
          },
          notes: {
            plan: planKey,
          },
          handler: function (response: any) {
            // Redirect to payment status page
            router.push(
              `/payment/status?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&plan=${planKey}`
            );
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      })
      .catch((error) => {
        console.error("Payment error:", error);
        alert("Failed to initiate payment. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 font-sans py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-teal-500 font-bold text-xs uppercase mb-12 hover:gap-4 transition-all">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-6">
            Choose Your <span className="text-teal-500">Plan</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
            Special pricing for first 50 clients only • Valid till 31st August 2026
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              className={`bg-slate-900 border-2 ${
                key === "gold" ? "border-amber-500" : "border-blue-500"
              } p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col`}
            >
              {key === "gold" && (
                <div className="absolute top-0 right-0 bg-amber-500 text-black px-6 py-1 text-[9px] font-black uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className="flex-1">
                <h3 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-4">
                  {plan.name}
                </h3>
                <div className="py-8 border-y border-slate-800">
                  <p className="text-slate-500 font-black text-2xl tracking-tighter mb-1 line-through">
                    ₹{plan.originalPrice.toLocaleString()}
                  </p>
                  <p className={`${key === "gold" ? "text-amber-500" : "text-blue-500"} font-black text-6xl tracking-tighter mb-2`}>
                    ₹{plan.price.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    {plan.limit}
                  </p>
                </div>

                <ul className="space-y-4 py-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-[11px] font-bold text-slate-300">
                      <CheckCircle2 size={14} className="text-teal-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handlePayment(key as "standard" | "gold")}
                disabled={loading && selectedPlan === key}
                className={`w-full py-5 ${
                  key === "gold" ? "bg-amber-500 text-black hover:bg-amber-400" : "bg-teal-600 text-white hover:bg-teal-500"
                } rounded-2xl font-black uppercase text-xs text-center tracking-widest transition-all disabled:opacity-50`}
              >
                {loading && selectedPlan === key ? "Processing..." : `Buy Now — ₹${plan.price.toLocaleString()}`}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 max-w-2xl mx-auto">
          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
            First 50 clients lock this price for life. From 1st Sept, Gold becomes ₹14,999 and Standard ₹9,999.
          </p>
        </div>
      </div>
    </div>
  );
}