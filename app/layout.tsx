import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://lekhaflow.in"),
  title: {
    default: "LekhaFlow | AI-Powered Invoice to Tally Software for MSMEs & CAs",
    template: "%s | LekhaFlow"
  },
  description: "India's fastest AI accounting automation. Convert PDF, Image, and Excel invoices to Tally XML with 100% accuracy. Save 80% time on GST data entry.",
  keywords: ["Invoice to Tally Software", "GST Automation India", "Tally Prime XML Generator", "AI Data Entry for Accountants", "Chhattisgarh GST Software"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "LekhaFlow | Stop Manual Data Entry in Tally",
    description: "Convert 3 hours of data entry into 3 minutes. AI-powered precision for Tally Prime 5.0.",
    url: "https://lekhaflow.in",
    siteName: "LekhaFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "LekhaFlow Dashboard" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LekhaFlow AI | Invoice to Tally Automation",
    description: "Automate your Tally entries using AI. 100% accurate, 0% manual effort.",
  },
};

export const viewport: Viewport = { themeColor: "#020617" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        {/* ✅ ब्राउज़र के ऑटो-डार्क मोड को रोकने के लिए */}
        <meta name="color-scheme" content="dark" />
        
        {/* Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "LekhaFlow",
              "operatingSystem": "Windows",
              "applicationCategory": "AccountingSoftware",
              "offers": { 
                "@type": "Offer", 
                "price": "15000", 
                "priceCurrency": "INR" 
              },
              "aggregateRating": { 
                "@type": "AggregateRating", 
                "ratingValue": "4.9", 
                "ratingCount": "120" 
              }
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full bg-[#020617] text-slate-200 antialiased`}>
        {children}
      </body>
    </html>
  );
}