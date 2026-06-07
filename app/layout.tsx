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

// ✅ COMPREHENSIVE SEO METADATA FOR LEKHAFLOW - FINAL OPTIMIZED VERSION
export const metadata: Metadata = {
  title: "LekhaFlow | AI-Powered Tally & BUSY Accounting Automation",
  description: "Convert Invoices to Tally XML with 100% accuracy. Save 80% accounting time. India's fastest GST automation software for MSMEs.",
  
  // ✅ Keywords for SEO
  keywords: [
    "GST accounting automation",
    "Invoice to Tally software",
    "AI accounting tool for MSMEs",
    "Tally XML generation",
    "Automatic data entry for Tally",
    "GST automation in India",
    "GSTR-2B reconciliation",
    "Bank statement automation",
    "Accounting software India",
    "LekhaFlow",
    "Tally automation",
    "BUSY ERP9 support",
    "Chhattisgarh accounting software"
  ].join(", "),

  authors: [
    {
      name: "Jitendra Bharti",
      url: "https://lekhaflow.in",
    },
  ],

  creator: "Jitendra Bharti | LekhaFlow AI Systems",
  publisher: "LekhaFlow AI Systems",
  
  metadataBase: new URL("https://lekhaflow.in"),
  
  alternates: {
    canonical: "https://lekhaflow.in",
  },

  // ✅ ENHANCED Open Graph for Social Sharing
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://lekhaflow.in",
    title: "LekhaFlow | Stop Manual Data Entry - AI Accounting Automation",
    description: "The ultimate AI bridge for Tally Prime and ERP9. Convert invoices to XML in seconds. 100% accuracy. Zero manual entry. Free demo available.",
    siteName: "LekhaFlow",
    images: [
      {
        url: "https://lekhaflow.in/gui_screen_1.png",
        width: 1200,
        height: 630,
        alt: "LekhaFlow - AI Accounting Automation Dashboard for Tally",
        type: "image/png",
      },
      {
        url: "https://lekhaflow.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "LekhaFlow - GST Accounting Software India",
        type: "image/png",
      }
    ],
  },

  // ✅ ENHANCED Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "LekhaFlow | Stop Manual Data Entry",
    description: "AI-powered Tally automation for Indian accountants. Save 80% time. 100% accuracy. Free trial available.",
    images: ["https://lekhaflow.in/gui_screen_1.png"],
    creator: "@LekhaFlow",
    site: "@LekhaFlow",
  },

  // ✅ Robots and Verification
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ✅ Category and Rating
  category: "Business & Finance",
  
  // ✅ PWA Manifest
  manifest: "/manifest.json",

  // ✅ Apple Meta Tags
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LekhaFlow",
  },

  // ✅ Format Detection
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  // ✅ Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // ✅ Google Search Console Verification
  verification: {
    google: "7sE7N5KU97y2Smf-yL134cohpzckYWzYrNpkIZ_Hlzw",
  },
};

// ✅ VIEWPORT CONFIGURATION
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        {/* ✅ DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://rzp.io" />
        
        {/* ✅ Preconnect for External Resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ✅ Canonical Link */}
        <link rel="canonical" href="https://lekhaflow.in" />

        {/* ✅ Mobile Web App Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="LekhaFlow" />

        {/* ✅ Google Analytics Ready (Uncomment when GA ID is available) */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-GA-ID"></script>
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YOUR-GA-ID');`
        }} /> */}

        {/* ✅ Microsoft Clarity (Optional) */}
        {/* <script type="text/javascript">
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "YOUR-CLARITY-ID");
        </script> */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased bg-[#020617]`}>
        {children}
      </body>
    </html>
  );
}
