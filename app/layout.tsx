import type { Metadata, Viewport } from "next"; // Viewport अलग से इम्पोर्ट करें
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

// ✅ SEO और PWA के लिए सही मेटाडेटा
export const metadata: Metadata = {
  title: "LekhaFlow | AI Accounting Automation",
  description: "Automate Tally Entries with 100% Accuracy",
  manifest: "/manifest.json", // यहाँ मेनिफेस्ट लिंक करें
};

// ✅ मोबाइल थीम कलर के लिए
export const viewport: Viewport = {
  themeColor: "#1e3a8a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}