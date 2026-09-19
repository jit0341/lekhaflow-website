"use client";
import AdminQRGenerator from "@/components/AdminQRGenerator";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#020617] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-8 text-center">
          Admin Panel - QR Generator
        </h1>
        <AdminQRGenerator />
      </div>
    </div>
  );
}