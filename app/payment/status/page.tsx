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
        const response = await fetch("/api/verify_payment", {
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
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <section className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-teal-400" />
          <h1 className="mt-5 text-xl font-black text-white">Verifying Payment...</h1>
          <p className="mt-2 text-sm text-slate-400">Please wait while Razorpay confirms your transaction.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <section className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl">
        {status === "success" ? (
          <>
            <CheckCircle2 className="mx-auto h-16 w-16 text-teal-400" />
            <h1 className="mt-5 text-2xl font-black text-white">Payment Successful</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">Your LekhaFlow Standard payment has been verified.</p>
            {licenseData?.expiryDate && (
              <p className="mt-3 text-xs text-slate-400">License valid until {new Date(licenseData.expiryDate).toLocaleDateString("en-IN")}</p>
            )}
            <button
              onClick={() => licenseData?.licenseContent && downloadLicense(licenseData.licenseContent, licenseData.filename)}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 py-3 text-sm font-black text-slate-950 hover:bg-teal-400"
            >
              <Download size={17} /> Download License Again
            </button>
          </>
        ) : (
          <>
            <XCircle className="mx-auto h-16 w-16 text-rose-400" />
            <h1 className="mt-5 text-2xl font-black text-white">Payment Verification Failed</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">{error || "We could not verify this payment."}</p>
            <p className="mt-3 text-xs text-slate-400">If your account was debited, please contact LekhaFlow support with your payment ID.</p>
            <Link href="/contact" className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-black text-slate-950">Contact Support</Link>
          </>
        )}
        <p className="mt-7 text-xs text-slate-500">Payment ID: {paymentId || "Not available"}</p>
      </section>
    </main>
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
      <PaymentStatusContent />
    </Suspense>
  );
}