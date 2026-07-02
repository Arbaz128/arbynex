// Single source of truth for FAQ + service copy used both on the page and in
// structured data (JSON-LD) / llms.txt. Keeping one copy avoids the schema
// drifting away from what visitors actually see — which search engines and AI
// engines penalise.

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Do I really get a demo before paying?",
    a: "Yes — 100%. We build a working demo for your business first. You only pay when you've seen it working and want the full system. Zero risk for you.",
  },
  {
    q: "How much does it cost?",
    a: "Simple automations start from $150. AI chatbots and complete systems range from $300–$1,000+ depending on what you need. Monthly support plans are also available. Every quote is fixed before we start — no surprises.",
  },
  {
    q: "Do I need any technical knowledge?",
    a: "None at all. We build everything, test it with you, and hand it over working. If anything ever breaks, we fix it.",
  },
  {
    q: "How long does it take?",
    a: "Most systems go live within 3–7 days of approval. Simple automations can be done in 24–48 hours.",
  },
  {
    q: "What if it stops working later?",
    a: "Every project includes free fixes for the first weeks after launch, and our monthly support plans keep everything monitored, maintained and improving over time.",
  },
];

// Service names + one-line summaries for schema `makesOffer` and llms.txt.
export const SERVICES: { name: string; summary: string }[] = [
  {
    name: "Websites & Web Apps",
    summary:
      "Fast Next.js/React websites, SaaS platforms, e-commerce stores and dashboards built to convert.",
  },
  {
    name: "AI Chatbots",
    summary:
      "WhatsApp, Instagram and website bots powered by GPT/Claude that answer customers instantly in any language, 24/7.",
  },
  {
    name: "Lead Capture & Follow-up",
    summary:
      "Every form, DM and ad inquiry is saved automatically, you're notified instantly, and the lead gets an instant follow-up.",
  },
  {
    name: "Booking & Reminders",
    summary:
      "Customers self-book into your calendar; automatic WhatsApp/SMS reminders cut no-shows for clinics, salons and gyms.",
  },
  {
    name: "Email Automation",
    summary:
      "Welcome sequences, follow-ups and AI-drafted replies that turn your inbox into a sales machine.",
  },
  {
    name: "Content Pipelines",
    summary:
      "One idea in — posts written, scheduled and published across Instagram, Facebook and LinkedIn automatically.",
  },
  {
    name: "Custom Workflows",
    summary:
      "Data entry, invoices, order confirmations and reports — any repetitive weekly task, automated.",
  },
];
