"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, Download } from "lucide-react";
import Link from "next/link";

// ✅ Separate component that uses useSearchParams()
function PaymentStatusContent() {
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

  // Rest of your UI logic remains the same...
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

  // ... (बाकी UI वही रहेगा)
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
      <PaymentStatusContent />
    </Suspense>
  );
}