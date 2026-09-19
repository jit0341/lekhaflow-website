import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import GlobalFooter from "@/components/layout/GlobalFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://lekhaflow.in"),
  title: {
    default: "LekhaFlow | AI-Powered Invoice to Tally Software for MSMEs & CAs",
    template: "%s | LekhaFlow",
  },
  description:
    "Desktop accounting workflow automation for Tally users. Process Purchase Invoices, Sales Split and Bank Statements, review the result and send final entries to Tally.",
  keywords: [
    "Invoice to Tally Software",
    "GST Automation India",
    "Tally Accounting Automation",
    "AI Data Entry for Accountants",
    "Chhattisgarh GST Software",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LekhaFlow | Stop Manual Data Entry in Tally",
    description:
      "Process accounting documents around Tally with a review-first workflow.",
    url: "https://lekhaflow.in",
    siteName: "LekhaFlow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LekhaFlow Dashboard",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LekhaFlow AI | Invoice to Tally Automation",
    description:
      "Process accounting documents around Tally with review and control.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <meta name="color-scheme" content="light" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "LekhaFlow",
              operatingSystem: "Windows",
              applicationCategory: "AccountingSoftware",
              offers: {
                "@type": "Offer",
                price: "15000",
                priceCurrency: "INR",
              },
            }),
          }}
        />
      </head>

      <body
        className="min-h-full bg-white text-slate-950 antialiased"
      >
        <Navbar />
        {children}
        <GlobalFooter />
      </body>
    </html>
  );
}
