"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, Download } from "lucide-react";
import Link from "next/link";

// ✅ Separate component that uses useSearchParams
function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [licenseData, setLicenseData] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const paymentId = searchParams.get("payment_id");
  const orderId = searchParams.get("order_id");
  const plan = searchParams.get("plan") || "standard";

  useEffect(() => {
    if (!paymentId) {
      setStatus("failed");
      setError("No payment ID found");
      return;
    }

    async function verifyPayment() {
      try {
        const response = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentId,
            orderId,
            plan,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setStatus("success");
          setLicenseData(data);
          
          if (data.licenseContent) {
            downloadLicense(data.licenseContent, data.filename);
          }
        } else {
          setStatus("failed");
          setError(data.error || "Payment verification failed");
        }
      } catch (err) {
        setStatus("failed");
        setError("Failed to verify payment. Please contact support.");
        console.error(err);
      }
    }

    verifyPayment();
  }, [paymentId, orderId, plan]);

  const downloadLicense = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-teal-500 animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
            Verifying Payment...
          </h2>
          <p className="text-slate-500 mt-2">Please wait while we confirm your transaction</p>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-red-500/30 p-10 rounded-[3rem] text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
            Payment Verification Failed
          </h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full py-4 bg-slate-800 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-700 transition-all"
            >
              Return to Home
            </Link>
            <a
              href="https://wa.me/918770808695"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 bg-teal-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-teal-500 transition-all"
            >
              Contact Support on WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border-2 border-teal-500 p-10 rounded-[3rem] text-center">
        <CheckCircle2 className="w-16 h-16 text-teal-500 mx-auto mb-6" />
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
          Payment Successful!
        </h2>
        <p className="text-slate-400 mb-6">
          Your license has been generated. Your license file will download automatically.
        </p>
        
        {licenseData && (
          <div className="bg-slate-800 p-6 rounded-2xl mb-6 text-left">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">
              License Details
            </p>
            <p className="text-white font-bold text-sm">Plan: {licenseData.plan}</p>
            <p className="text-white font-bold text-sm">
              Expires: {new Date(licenseData.expiryDate).toLocaleDateString()}
            </p>
            <p className="text-slate-500 text-xs mt-2">
              Machine ID: {licenseData.machineId}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => {
              if (licenseData?.licenseContent) {
                downloadLicense(licenseData.licenseContent, licenseData.filename);
              }
            }}
            className="flex items-center justify-center gap-2 w-full py-4 bg-teal-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-teal-500 transition-all"
          >
            <Download size={18} /> Download License Again
          </button>
          <Link
            href="/downloads"
            className="block w-full py-4 bg-slate-800 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-700 transition-all"
          >
            Go to Downloads
          </Link>
        </div>

        <p className="text-slate-600 text-[9px] font-bold uppercase tracking-widest mt-6">
          A copy of your license has also been sent to your email and WhatsApp.
        </p>
      </div>
    </div>
  );
}

// ✅ Main Page Component with Suspense Boundary
export default function PaymentStatusPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-teal-500 animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
            Loading...
          </h2>
        </div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}