import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { FAQS, SERVICES } from "@/lib/seo-data";
import { WHATSAPP_NUMBER, EMAIL } from "@/lib/contact";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const SITE_URL = "https://arbynex.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "ARBYNEX — AI Automation Agency & Software Development Company | Custom Software, AI Chatbots, Automation",
    template: "%s | ARBYNEX",
  },
  description:
    "ARBYNEX is an AI automation agency and full-service software company. We build AI chatbots, business automation systems, custom software, SaaS platforms and enterprise solutions for modern businesses worldwide.",
  keywords: [
    "AI automation agency",
    "AI chatbot for business",
    "WhatsApp chatbot",
    "Instagram automation",
    "lead capture automation",
    "business workflow automation",
    "AI customer support",
    "custom software development",
    "SaaS product development",
    "web application development",
    "mobile app development",
    "enterprise software development",
    "cloud and devops",
    "digital transformation",
    "software house",
  ],
  authors: [{ name: "ARBYNEX", url: SITE_URL }],
  creator: "ARBYNEX",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "ARBYNEX",
    title: "ARBYNEX — AI Automation Agency & Software Development Company",
    description:
      "AI chatbots, business automation, custom software, SaaS platforms and enterprise solutions — built by ARBYNEX. Free working demo before you pay.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARBYNEX — AI Automation Agency & Software Company",
    description:
      "AI chatbots, automation systems, custom software and SaaS platforms — built by ARBYNEX.",
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
        "ARBYNEX is an AI automation agency and full-service software company that builds AI chatbots, business automation systems, custom software, SaaS platforms and enterprise solutions for modern businesses worldwide.",
      slogan: "Your Business on Autopilot.",
      foundingDate: "2026",
      founder: { "@id": `${SITE_URL}/#founder` },
      areaServed: ["US", "GB", "AE", "SA", "EU", "PK", "Worldwide"],
      priceRange: "$500–$20000+",
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
        "AI chatbots, business automation, custom software, SaaS platforms and enterprise solutions — ARBYNEX.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: "Muhammad Arbaz",
      jobTitle: "Founder & Developer",
      description:
        "Founder and developer of ARBYNEX, an AI automation agency and software company building AI chatbots, automation systems and custom software for businesses worldwide.",
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
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col font-sans"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
