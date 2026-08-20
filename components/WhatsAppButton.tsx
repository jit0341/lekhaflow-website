"use client";

export default function WhatsAppButton() {
  const phoneNumber = "8770808695";
  const message = "Hi, I want LekhaFlow demo and pricing details.";
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_25px_rgba(34,197,94,0.45)] hover:scale-110 transition-all duration-300">
        <span className="text-3xl text-white">💬</span>
      </div>

      <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-white border border-green-200 px-4 py-2 rounded-xl text-sm text-slate-800 font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
        Chat on WhatsApp
      </div>
    </a>
  );
}
