"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"standard" | null>(null);

  const plans = {
    standard: {
      id: "standard",
      name: "LekhaFlow Standard",
      price: 9999, // ✅ Comma hata diya, ab ye 9999 number hai
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
  };

  const handlePayment = (planKey: "standard") => {
    const plan = plans[planKey];
    setSelectedPlan(planKey);
    setLoading(true);

    // Create order
    fetch("/api/create_order", {
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
          description: `${plan.name} - Annual License`,
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
    <>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
    <div className="bg-white min-h-screen text-slate-200 font-sans py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-teal-500 font-bold text-xs uppercase mb-12 hover:gap-4 transition-all">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-slate-950 italic uppercase tracking-tighter mb-6">
            Choose Your <span className="text-teal-500">Plan</span>
          </h1>
          <p className="text-slate-600 font-bold uppercase tracking-widest text-sm">
            Introductory launch pricing •
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 max-w-xl mx-auto">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              className={`bg-white border-2 ${
                key === "standard" ? "border-amber-500" : "border-blue-500"
              } p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col`}
            >
              {key === "standard" && (
                <div className="absolute top-0 right-0 bg-amber-500 text-black px-6 py-1 text-[9px] font-black uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className="flex-1">
                <h3 className="text-slate-950 font-black text-xs uppercase tracking-[0.3em] mb-4">
                  {plan.name}
                </h3>
                <div className="py-8 border-y border-slate-200">
                  <p className="text-slate-500 font-black text-2xl tracking-tighter mb-1 line-through">
                    ₹{plan.originalPrice.toLocaleString()}
                  </p>
                  <p className={`${key === "standard" ? "text-amber-500" : "text-blue-500"} font-black text-6xl tracking-tighter mb-2`}>
                    ₹{plan.price.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    {plan.limit}
                  </p>
                </div>

                <ul className="space-y-4 py-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-[11px] font-bold text-slate-600">
                      <CheckCircle2 size={14} className="text-teal-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handlePayment("standard")}
                disabled={loading && selectedPlan === key}
                className={`w-full py-5 ${
                  key === "standard" ? "bg-amber-500 text-black hover:bg-amber-400" : "bg-teal-600 text-slate-950 hover:bg-teal-500"
                } rounded-2xl font-black uppercase text-xs text-center tracking-widest transition-all disabled:opacity-50`}
              >
                {loading && selectedPlan === key ? "Processing..." : `Buy Now — ₹${plan.price.toLocaleString()}`}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-5xl mx-auto">
          <div className="bg-white border-2 border-slate-300 p-8 md:p-10 rounded-[2.5rem] shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-teal-600 mb-3">Standalone bank statement parser</p>
              <h2 className="text-3xl font-black tracking-tight text-slate-950">LekhaFlow Bank</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">For businesses and accounting teams that need bank statement parsing as a separate product. Bank Statement → structured data for the Tally workflow.</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-500">One-time product price</p>
              <p className="text-4xl font-black text-teal-600">₹4,999</p>
              <p className="mt-2 text-xs text-slate-500">LekhaFlow Standard continues to include its existing bank statement feature.</p>
            </div>
            <a href="https://wa.me/918770808695?text=Hi%2C%20I%20am%20interested%20in%20LekhaFlow%20Bank%20at%20Rs%204999." className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-slate-950 px-8 py-5 text-xs font-black uppercase tracking-widest text-white transition hover:bg-teal-700">Enquire about LekhaFlow Bank</a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
