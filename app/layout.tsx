import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ SEO & Social Sharing Optimization
export const metadata: Metadata = {
  title: "LekhaFlow | AI-Powered Invoice to Tally Software for MSMEs",
  description: "GST Accounting Automation in Chhattisgarh, India. Convert PDF/Excel to Tally XML with 100% accuracy. Save 80% time on manual data entry.",
  manifest: "/manifest.json",
  keywords: ["GST Accounting Automation", "Invoice to Tally Software", "AI Accounting tool for MSMEs", "Chhattisgarh GST Software", "Automatic data entry for Tally"],
  openGraph: {
    title: "LekhaFlow | Stop Manual Data Entry",
    description: "India's fastest AI-Powered Invoice to Tally Software. Tally Prime 5.0 Ready.",
    url: "https://lekhaflow.in",
    siteName: "LekhaFlow",
    images: [{ url: "/gui_screen_1.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full bg-[#020617] text-slate-200 antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}