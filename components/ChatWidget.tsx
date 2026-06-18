"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { buildWhatsAppUrl, buildEmailUrl } from "@/lib/contact";

/**
 * A scripted assistant — no API key, no monthly cost — that still feels smart.
 * It understands free-typed questions via keyword intent-matching (pricing,
 * websites, chatbots, automation, timing, risk, booking, greetings, etc.),
 * answers confidently, and always steers toward booking a free demo. Then it
 * collects the visitor's business + biggest time-waster and hands the whole
 * conversation to WhatsApp so a real person closes. Doubles as a live demo of
 * the kind of bot we sell.
 */

type QuickReply = { label: string; key: IntentKey };
type Msg = { from: "bot" | "user"; text: string };
type Stage = "chat" | "ask_business" | "ask_problem" | "finish";

type IntentKey =
  | "demo"
  | "pricing"
  | "services"
  | "chatbot"
  | "website"
  | "automation"
  | "booking"
  | "time"
  | "risk"
  | "work"
  | "contact"
  | "greeting"
  | "thanks"
  | "fallback";

const DEMO_QR: QuickReply = { label: "Get my free demo", key: "demo" };
const BASE_QR: QuickReply[] = [
  DEMO_QR,
  { label: "Pricing", key: "pricing" },
  { label: "What you build", key: "services" },
];
const START_QR: QuickReply[] = [
  DEMO_QR,
  { label: "How much does it cost?", key: "pricing" },
  { label: "What do you build?", key: "services" },
  { label: "How long does it take?", key: "time" },
];

const RESPONSES: Record<Exclude<IntentKey, "demo">, { text: string; qr: QuickReply[] }> = {
  pricing: {
    text:
      "Honest pricing, no games 👇\n• Simple automations — from $150\n• AI chatbots & full systems — $300–$1,000+\n• Websites — quoted to scope\nEvery quote is fixed before we start, and you only pay once you've seen a working demo. Want me to line up your free demo?",
    qr: [DEMO_QR, { label: "How long does it take?", key: "time" }],
  },
  services: {
    text:
      "We build systems that make money, not just pretty pages:\n• Websites & web apps (Next.js/React)\n• AI chatbots (WhatsApp, Instagram, website)\n• Lead capture & instant follow-up\n• Booking + reminders\n• Email & content automation\nWhich one fits your business?",
    qr: [DEMO_QR, { label: "Pricing", key: "pricing" }, { label: "AI chatbots", key: "chatbot" }],
  },
  chatbot: {
    text:
      "Our AI chatbots reply to your customers instantly, 24/7, in any language — on WhatsApp, Instagram or your website. They answer FAQs, qualify leads and book appointments, then hand over to you when it matters (a bit like I'm doing right now 🙂). Want one built for your business, free?",
    qr: [DEMO_QR, { label: "Pricing", key: "pricing" }],
  },
  website: {
    text:
      "We build lightning-fast websites & web apps with Next.js and React — landing pages, e-commerce stores, SaaS dashboards. Built to load fast and turn visitors into customers. Want a free demo page for your business?",
    qr: [DEMO_QR, { label: "Pricing", key: "pricing" }],
  },
  automation: {
    text:
      "If you do it manually every week, we can probably automate it — lead follow-ups, invoices, order updates, reports, data entry. You tell us your most boring task, we make it run itself. What eats most of your time?",
    qr: [DEMO_QR, { label: "What you build", key: "services" }],
  },
  booking: {
    text:
      "Customers book themselves straight into your calendar, and automatic WhatsApp/SMS reminders cut no-shows dramatically — perfect for clinics, salons, gyms and consultants. Want a free demo set up for your bookings?",
    qr: [DEMO_QR, { label: "Pricing", key: "pricing" }],
  },
  time: {
    text:
      "Fast ⚡ Most systems go live in 3–7 days; simple automations in 24–48 hours. We agree a fixed timeline up front so you're never left waiting. Ready to start with a free demo?",
    qr: [DEMO_QR, { label: "Pricing", key: "pricing" }],
  },
  risk: {
    text:
      "Zero risk on you. We build a working demo for your business FIRST — you only pay once you've seen it running and you're happy. Fixed price agreed up front, no hidden fees, plus free fixes after launch. Shall we set up your demo?",
    qr: [DEMO_QR, { label: "Pricing", key: "pricing" }],
  },
  work: {
    text:
      "We've shipped real products that are live right now — SaaS platforms, AI tools and online stores (scroll up to 'Our Work' and click through them). We let the work speak. Want yours to be next? It starts with a free demo.",
    qr: [DEMO_QR, { label: "What you build", key: "services" }],
  },
  contact: {
    text:
      "You'll talk to Arbaz directly — no sales reps. The fastest way is to start your free demo and he'll personally reply within 24 hours on WhatsApp. Want me to set that up?",
    qr: [DEMO_QR],
  },
  greeting: {
    text:
      "Hey! 👋 Great to have you here. I can tell you what we build, our pricing or timelines — or set up your free demo right now. What would you like?",
    qr: START_QR,
  },
  thanks: {
    text: "Anytime! 🙌 Whenever you're ready, your free demo is just a tap away.",
    qr: [DEMO_QR],
  },
  fallback: {
    text:
      "Good question! For a precise answer the best move is a quick chat with Arbaz himself — and it starts with a free demo for your business (no payment until you've seen it work). Meanwhile I can help with pricing, what we build, timelines, or how the free demo works. What would you like?",
    qr: BASE_QR,
  },
};

// Lightweight intent detection. Order matters — most specific first.
const PATTERNS: { key: Exclude<IntentKey, "fallback">; words: string[] }[] = [
  { key: "pricing", words: ["price", "pricing", "cost", "how much", "charge", "rate", "fee", "budget", "kitna", "paisa", "$", "expensive", "cheap", "afford"] },
  { key: "time", words: ["how long", "how much time", "duration", "days", "weeks", "deadline", "when can", "kitna time", "fast", "quick", "timeline", "delivery"] },
  { key: "risk", words: ["refund", "guarantee", "risk", "advance", "money back", "trust you", "scam", "safe", "before pay", "pay first"] },
  { key: "booking", words: ["book", "booking", "appointment", "reminder", "calendar", "no-show", "no show", "schedule client", "slot"] },
  { key: "chatbot", words: ["chatbot", "chat bot", " bot", "whatsapp", "instagram", "messenger", "gpt", "ai agent", "ai assistant", "auto reply", "autoreply"] },
  { key: "website", words: ["website", "web site", "web app", "landing", "ecommerce", "e-commerce", "online store", "shopify", "next.js", "react", "web development", "web dev", "portfolio site"] },
  { key: "automation", words: ["automate", "automation", "workflow", "zapier", "make.com", "integrate", "integration", "crm", "data entry", "invoice", "report"] },
  { key: "work", words: ["your work", "portfolio", "example", "examples", "projects", "case study", "clients", "experience", "proof", "who have you"] },
  { key: "contact", words: ["where are you", "location", "based", "country", "phone", "call you", "contact", "reach you", "email you", "talk to"] },
  { key: "services", words: ["what do you", "what can you", "services", "service", "you build", "you make", "you offer", "you do", "kya banate", "kya karte", "help me with"] },
  { key: "demo", words: ["demo", "free trial", "get started", "let's start", "lets start", "sign me up", "i'm in", "im in", "start now", "i want", "yes", "interested", "begin"] },
  { key: "greeting", words: ["hello", "hi ", "hey", "salam", "assalam", "aoa", "good morning", "good evening", "yo "] },
  { key: "thanks", words: ["thank", "thanks", "shukria", "appreciate"] },
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
    { from: "bot", text: "Hey! 👋 I'm ARBYNEX's assistant. Ask me anything — pricing, what we build, timelines — or grab your free demo. How can I help?" },
  ]);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>(START_QR);
  const [draft, setDraft] = useState("");
  const [business, setBusiness] = useState("");
  const [problem, setProblem] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, quickReplies, stage]);

  function botSay(text: string, qr: QuickReply[] = []) {
    setMessages((m) => [...m, { from: "bot", text }]);
    setQuickReplies(qr);
  }

  function startDemo() {
    setStage("ask_business");
    botSay("Awesome — let's set up your free demo. 🚀 First: what kind of business do you run?");
  }

  function handleIntent(key: IntentKey) {
    if (key === "demo") {
      startDemo();
      return;
    }
    const r = RESPONSES[key];
    botSay(r.text, r.qr);
  }

  // A user message arrives (typed or via quick reply button).
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
      botSay("Got it 👍 And what's the #1 task eating most of your time right now?");
      return;
    }
    if (stage === "ask_problem") {
      setProblem(value);
      setStage("finish");
      botSay(
        "Perfect. Tap below and I'll send this straight to our team — you'll get your free demo within 24 hours. No payment until you've seen it working. ✅"
      );
      return;
    }
    // Normal chat — understand and respond.
    setQuickReplies([]);
    handleIntent(detect(value));
  }

  const summary = `Hi ARBYNEX! I'd like my free automation demo.\n\nBusiness: ${
    business || "(not specified)"
  }\nBiggest time-waster: ${problem || "(not specified)"}`;

  const inputPlaceholder =
    stage === "ask_business"
      ? "e.g. dental clinic, online store…"
      : stage === "ask_problem"
      ? "Type your answer…"
      : "Type your question…";

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="grad-bg fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_10px_34px_rgba(139,92,246,.5)] transition-transform hover:-translate-y-1"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Panel */}
      {open && (
        <div className="glass fixed bottom-24 right-5 z-[60] flex h-[min(70vh,560px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl border border-line shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <span className="grad-bg flex h-9 w-9 items-center justify-center rounded-full text-white">
              <MessageCircle size={18} />
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-white">ARBYNEX Assistant</p>
              <p className="flex items-center gap-1.5 text-xs text-muted">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Typically replies in minutes
              </p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[82%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.from === "user" ? "grad-bg text-white" : "border border-line bg-card text-white/90"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick replies */}
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

            {/* Finish: hand off */}
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
                  href={buildEmailUrl("Free Demo Request", summary)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-line px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:border-violet"
                >
                  Send by email instead
                </a>
              </div>
            )}
          </div>

          {/* Input — always available so visitors can type freely */}
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
