import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { FAQS, SERVICES } from "@/lib/seo-data";
import { WHATSAPP_NUMBER, EMAIL } from "@/lib/contact";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const SITE_URL = "https://arbynex.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ARBYNEX — AI Automation Agency | Your Business on Autopilot",
    template: "%s | ARBYNEX",
  },
  description:
    "ARBYNEX builds AI chatbots, business automation systems and modern websites — reply to every customer instantly 24/7, capture every lead automatically, and save 30+ hours a month.",
  keywords: [
    "AI automation agency",
    "AI chatbot for business",
    "WhatsApp chatbot",
    "Instagram automation",
    "lead capture automation",
    "Make.com expert",
    "business workflow automation",
    "AI customer support",
    "web development agency",
    "Next.js website development",
    "SaaS development",
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

// JSON-LD @graph — "triple stacking" (Organization + Person + WebSite +
// FAQPage) is a strong signal for both Google rich results and AI/generative
// engines (ChatGPT, Perplexity, AI Overviews) deciding what to cite.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: "ARBYNEX",
      alternateName: "ARBYNEX AI Automation Agency",
      url: SITE_URL,
      logo: `${SITE_URL}/icon`,
      image: `${SITE_URL}/opengraph-image`,
      description:
        "ARBYNEX is an AI automation agency that builds AI chatbots, lead-capture systems, booking automation and modern websites for businesses worldwide — with a free working demo before you pay.",
      slogan: "Your business on autopilot.",
      foundingDate: "2026",
      founder: { "@id": `${SITE_URL}/#founder` },
      areaServed: ["US", "GB", "AE", "SA", "EU", "PK", "Worldwide"],
      priceRange: "$150–$1500",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+${WHATSAPP_NUMBER}`,
        email: EMAIL,
        availableLanguage: ["English", "Urdu"],
      },
      makesOffer: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.summary,
          provider: { "@id": `${SITE_URL}/#organization` },
        },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "ARBYNEX",
      description:
        "AI chatbots, automation systems and modern websites — a free working demo for your business before you pay.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: "Muhammad Arbaz",
      jobTitle: "Founder & Developer",
      description:
        "Developer and founder of ARBYNEX who personally builds every AI chatbot, automation system and website for clients.",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      url: SITE_URL,
      image: `${SITE_URL}/arbaz-photo.jpeg`,
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
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
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
