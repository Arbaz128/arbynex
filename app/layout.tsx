import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const SITE_URL = "https://arbynex.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ARBYNEX — AI Automation Agency | Your Business on Autopilot",
    template: "%s | ARBYNEX",
  },
  description:
    "ARBYNEX builds AI chatbots and business automation systems that reply to every customer instantly 24/7, capture every lead automatically, and save you 30+ hours a month.",
  keywords: [
    "AI automation agency",
    "AI chatbot for business",
    "WhatsApp chatbot",
    "Instagram automation",
    "lead capture automation",
    "Make.com expert",
    "business workflow automation",
    "AI customer support",
  ],
  authors: [{ name: "Arbaz", url: SITE_URL }],
  creator: "ARBYNEX",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "ARBYNEX",
    title: "ARBYNEX — AI Automation Agency | Your Business on Autopilot",
    description:
      "AI chatbots & automation systems that capture every lead, reply instantly 24/7, and save you 30+ hours a month. Free working demo before you pay.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARBYNEX — AI Automation Agency",
    description:
      "AI chatbots & automation that never miss a lead. Free demo before you pay.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ARBYNEX",
  url: SITE_URL,
  description:
    "AI automation agency building chatbots, lead capture systems and business workflow automation for clients worldwide.",
  founder: { "@type": "Person", name: "Arbaz" },
  areaServed: ["US", "GB", "AE", "SA", "EU", "PK"],
  serviceType: [
    "AI Chatbot Development",
    "Business Workflow Automation",
    "Lead Capture Automation",
    "AI Customer Support",
  ],
  priceRange: "$150 - $1500",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${grotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
