"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { buildWhatsAppUrl, buildEmailUrl } from "@/lib/contact";

type QuickReply = { label: string; key: IntentKey };
type Msg = { from: "bot" | "user"; text: string };
type Stage = "chat" | "ask_business" | "ask_problem" | "finish";

type IntentKey =
  | "demo"
  | "pricing"
  | "services"
  | "custom_software"
  | "web_apps"
  | "ai"
  | "saas"
  | "ecommerce"
  | "mobile"
  | "cloud"
  | "time"
  | "work"
  | "contact"
  | "greeting"
  | "thanks"
  | "fallback";

const DEMO_QR: QuickReply = { label: "Start my project", key: "demo" };
const START_QR: QuickReply[] = [
  DEMO_QR,
  { label: "What you build", key: "services" },
  { label: "Pricing", key: "pricing" },
  { label: "Technology stack", key: "cloud" },
];

const RESPONSES: Record<
  Exclude<IntentKey, "demo">,
  { text: string; qr: QuickReply[] }
> = {
  pricing: {
    text: "Transparent project-based pricing:\n\n• MVPs & simple apps — from $500\n• Complex SaaS & enterprise — $2,000–$20,000+\n• Dedicated development — monthly plans\n\nEvery quote is fixed before we start. No hidden fees.",
    qr: [DEMO_QR, { label: "How long does it take?", key: "time" }],
  },
  services: {
    text: "We build production-grade technology:\n\n• Custom Software & Business Systems\n• Web Applications (React/Next.js)\n• Mobile Apps (iOS & Android)\n• SaaS Products (multi-tenant, billing, auth)\n• E-commerce Platforms\n• Enterprise Systems (CRM, ERP, POS)\n• AI Solutions & Intelligent Workflows\n• Cloud & DevOps\n\nWhat are you looking to build?",
    qr: [DEMO_QR, { label: "Pricing", key: "pricing" }, { label: "Our work", key: "work" }],
  },
  custom_software: {
    text: "We build purpose-built software: business management systems, internal platforms, workflow systems, operations software and custom dashboards — designed around your exact business processes.",
    qr: [DEMO_QR, { label: "Pricing", key: "pricing" }],
  },
  web_apps: {
    text: "Modern web applications with React, Next.js and TypeScript — business web apps, customer portals, admin panels, SaaS platforms and API-driven applications. Built for performance, usability and scalability.",
    qr: [DEMO_QR, { label: "Pricing", key: "pricing" }],
  },
  ai: {
    text: "AI is part of modern software, not a separate world. We build AI agents, chatbots, LLM applications and AI-powered workflows — integrated into practical business software that actually gets used.",
    qr: [DEMO_QR, { label: "What you build", key: "services" }],
  },
  saas: {
    text: "Complete SaaS product development — multi-tenant architecture, authentication & authorization, subscription systems, billing & payments, admin dashboards and analytics. From idea to production.",
    qr: [DEMO_QR, { label: "Pricing", key: "pricing" }],
  },
  ecommerce: {
    text: "E-commerce platforms with online stores, custom commerce experiences, payment integration, inventory systems and order management. Conversion-focused and scalable.",
    qr: [DEMO_QR, { label: "Pricing", key: "pricing" }],
  },
  mobile: {
    text: "iOS and Android applications, cross-platform apps, business apps and mobile-integrated systems. Designed for customers, teams and business operations.",
    qr: [DEMO_QR, { label: "Pricing", key: "pricing" }],
  },
  cloud: {
    text: "Our tech stack: React, Next.js, TypeScript, Tailwind CSS (frontend) · Node.js, NestJS, Python, Django (backend) · PostgreSQL, MongoDB, Redis (databases) · Docker, CI/CD, AWS (cloud) · LLMs, AI Agents (AI). Modern, production-grade.",
    qr: [DEMO_QR, { label: "What you build", key: "services" }],
  },
  time: {
    text: "Timelines depend on scope:\n\n• Simple web apps & MVPs — 1–3 weeks\n• Complex SaaS products — 4–8 weeks\n• Enterprise systems — 6–12 weeks\n\nWe define a clear roadmap before development starts.",
    qr: [DEMO_QR, { label: "Pricing", key: "pricing" }],
  },
  work: {
    text: "Our work includes DokanOS (POS & business management), Floww (communication platform), Toolrift (AI tools) and Zimiso (e-commerce). Different industries, one engineering mindset. Check the Our Work section above.",
    qr: [DEMO_QR, { label: "What you build", key: "services" }],
  },
  contact: {
    text: "You can reach us via WhatsApp, email or the contact form below. We work with clients worldwide — US, UK, UAE, Saudi Arabia, EU and Pakistan. Languages: English and Urdu.",
    qr: [DEMO_QR],
  },
  greeting: {
    text: "Hello! Welcome to ARBYNEX — a full-service software and technology company. We build digital products, custom software, AI solutions and enterprise systems. How can we help you?",
    qr: START_QR,
  },
  thanks: {
    text: "You're welcome! Whenever you're ready to start your project, we're here. Let's build something great together.",
    qr: [DEMO_QR],
  },
  fallback: {
    text: "Great question! For a detailed answer, the best approach is a quick project consultation. We can discuss your requirements, timeline and pricing — no obligation. Meanwhile, I can help with what we build, pricing, timelines or our technology stack. What would you like?",
    qr: START_QR,
  },
};

const PATTERNS: {
  key: Exclude<IntentKey, "fallback">;
  words: string[];
}[] = [
  { key: "pricing", words: ["price", "pricing", "cost", "how much", "charge", "rate", "fee", "budget", "$", "expensive", "cheap", "afford"] },
  { key: "time", words: ["how long", "how much time", "duration", "days", "weeks", "deadline", "when can", "fast", "quick", "timeline", "delivery"] },
  { key: "custom_software", words: ["custom software", "business system", "internal platform", "workflow", "operations software", "dashboard"] },
  { key: "web_apps", words: ["web app", "web application", "website", "landing", "portal", "admin panel", "next.js", "react"] },
  { key: "mobile", words: ["mobile app", "ios", "android", "cross-platform", "phone app"] },
  { key: "saas", words: ["saas", "subscription", "multi-tenant", "platform", "software as a service"] },
  { key: "ecommerce", words: ["ecommerce", "e-commerce", "online store", "shop", "commerce", "shopify"] },
  { key: "ai", words: ["ai", "artificial intelligence", "chatbot", "llm", "machine learning", "intelligent", "automation", "agent"] },
  { key: "cloud", words: ["tech stack", "technology", "tech", "framework", "docker", "aws", "cloud", "devops", "database", "stack"] },
  { key: "work", words: ["your work", "portfolio", "example", "projects", "case study", "clients", "experience", "proof", "who have you", "built"] },
  { key: "contact", words: ["where are you", "location", "based", "country", "phone", "call you", "contact", "reach you", "email you", "talk to"] },
  { key: "services", words: ["what do you", "what can you", "services", "you build", "you make", "you offer", "you do", "help me with", "capabilities"] },
  { key: "demo", words: ["start", "get started", "let's start", "sign me up", "i'm in", "begin", "i want", "interested", "project", "build", "develop"] },
  { key: "greeting", words: ["hello", "hi ", "hey", "good morning", "good evening"] },
  { key: "thanks", words: ["thank", "thanks", "appreciate"] },
];

function detect(raw: string): IntentKey {
  const t = ` ${raw.toLowerCase().trim()} `;
  for (const { key, words } of PATTERNS) {
    if (words.some((w) => t.includes(w))) return key;
  }
  return "fallback";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("chat");
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: "Welcome to ARBYNEX. We build digital products, custom software, AI solutions and enterprise systems. How can I help you today?",
    },
  ]);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>(START_QR);
  const [draft, setDraft] = useState("");
  const [business, setBusiness] = useState("");
  const [problem, setProblem] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, quickReplies, stage]);

  function botSay(text: string, qr: QuickReply[] = []) {
    setMessages((m) => [...m, { from: "bot", text }]);
    setQuickReplies(qr);
  }

  function startDemo() {
    setStage("ask_business");
    botSay(
      "Let's discuss your project. First — what kind of business or product are you building?"
    );
  }

  function handleIntent(key: IntentKey) {
    if (key === "demo") {
      startDemo();
      return;
    }
    const r = RESPONSES[key];
    botSay(r.text, r.qr);
  }

  function pushUser(text: string) {
    setMessages((m) => [...m, { from: "user", text }]);
  }

  function onQuickReply(qr: QuickReply) {
    pushUser(qr.label);
    setQuickReplies([]);
    handleIntent(qr.key);
  }

  function onSend() {
    const value = draft.trim();
    if (!value) return;
    setDraft("");
    pushUser(value);

    if (stage === "ask_business") {
      setBusiness(value);
      setStage("ask_problem");
      botSay(
        "Got it. And what problem are you trying to solve with this technology?"
      );
      return;
    }
    if (stage === "ask_problem") {
      setProblem(value);
      setStage("finish");
      botSay(
        "Perfect. Tap below and we'll reach out to discuss your project in detail. We'll provide a clear scope, timeline and fixed quote."
      );
      return;
    }
    setQuickReplies([]);
    handleIntent(detect(value));
  }

  const summary = `Hi ARBYNEX! I'd like to discuss a project.\n\nBusiness/Product: ${
    business || "(not specified)"
  }\nProblem it solves: ${problem || "(not specified)"}`;

  const inputPlaceholder =
    stage === "ask_business"
      ? "e.g. SaaS platform, mobile app, business system..."
      : stage === "ask_problem"
      ? "Type your answer..."
      : "Type your question...";

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="grad-bg fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_10px_34px_rgba(139,92,246,.5)] transition-transform hover:-translate-y-1"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {open && (
        <div className="glass fixed bottom-24 right-5 z-[60] flex h-[min(70vh,560px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl border border-line shadow-2xl">
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <span className="grad-bg flex h-9 w-9 items-center justify-center rounded-full text-white">
              <MessageCircle size={18} />
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-white">
                ARBYNEX
              </p>
              <p className="flex items-center gap-1.5 text-xs text-muted">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Typically replies within 24 hours
              </p>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="chat-scroll flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "grad-bg text-white"
                      : "border border-line bg-card text-white/90"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {quickReplies.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {quickReplies.map((r) => (
                  <button
                    key={r.label}
                    onClick={() => onQuickReply(r)}
                    className="rounded-full border border-violet/40 bg-violet/10 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-violet/20"
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            )}

            {stage === "finish" && (
              <div className="flex flex-col gap-2 pt-1">
                <a
                  href={buildWhatsAppUrl(summary)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grad-bg flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
                >
                  <Send size={16} /> Send to WhatsApp
                </a>
                <a
                  href={buildEmailUrl("Project Inquiry", summary)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-line px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:border-violet"
                >
                  Send by email instead
                </a>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-line px-3 py-3">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              placeholder={inputPlaceholder}
              className="min-w-0 flex-1 rounded-xl border border-line bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-muted focus:border-violet"
            />
            <button
              onClick={onSend}
              aria-label="Send"
              className="grad-bg flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
