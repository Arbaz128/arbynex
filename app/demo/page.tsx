"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";

/**
 * Live AI chatbot demo for prospects (a med spa: "Glow Med Spa").
 * Talks to /api/chat (Groq, free). Share this page's URL with leads:
 * arbynex.vercel.app/demo — let them chat with it like a real customer.
 *
 * When a client signs up, swap the system prompt in app/api/chat/route.ts
 * for their real business details, or build a per-client version.
 */

type Msg = { role: "user" | "assistant"; content: string };

const GREETING =
  "Hi! 👋 Welcome to Glow Med Spa. I can help with our treatments, prices, or book your free consultation. What are you interested in?";

const SUGGESTIONS = [
  "How much is Botox?",
  "What treatments do you offer?",
  "Can I book an appointment?",
  "What are your hours?",
];

export default function DemoPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function send(text: string) {
    const value = text.trim();
    if (!value || loading) return;
    setDraft("");
    const next: Msg[] = [...messages, { role: "user", content: value }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col px-4 py-10">
      {/* Header */}
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
          <Sparkles size={14} /> Live AI Demo
        </span>
        <h1 className="mt-5 font-display text-3xl font-bold tracking-tight md:text-4xl">
          Glow Med Spa <span className="grad-text">AI Assistant</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          Chat with it like a customer — ask about prices, treatments, or try to
          book. It replies instantly, 24/7. This is the kind of assistant we
          build for your business.
        </p>
      </div>

      {/* Chat card */}
      <div className="glass mt-8 flex h-[min(62vh,560px)] flex-col overflow-hidden rounded-3xl border border-line shadow-2xl">
        {/* Bar */}
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <span className="grad-bg flex h-9 w-9 items-center justify-center rounded-full text-white">
            <Sparkles size={18} />
          </span>
          <div>
            <p className="font-display text-sm font-semibold text-white">
              Glow Med Spa
            </p>
            <p className="flex items-center gap-1.5 text-xs text-muted">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Online · replies instantly
            </p>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="chat-scroll flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`msg-in max-w-[82%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "grad-bg text-white"
                    : "border border-line bg-card text-white/90"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl border border-line bg-card px-4 py-3.5">
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-white/60" style={{ animationDelay: "0ms" }} />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-white/60" style={{ animationDelay: "160ms" }} />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-white/60" style={{ animationDelay: "320ms" }} />
              </div>
            </div>
          )}

          {/* Suggestions (only before the first user message) */}
          {messages.length === 1 && !loading && (
            <div className="flex flex-wrap gap-2 pt-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-violet/40 bg-violet/10 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-violet/20"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 border-t border-line px-3 py-3">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(draft)}
            placeholder="Type a message…"
            className="min-w-0 flex-1 rounded-xl border border-line bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-muted focus:border-violet"
          />
          <button
            onClick={() => send(draft)}
            disabled={loading}
            aria-label="Send"
            className="grad-bg flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-center text-xs text-muted">
        Demo built by{" "}
        <a href="/" className="text-cyan hover:underline">
          ARBYNEX
        </a>{" "}
        — AI assistants for clinics, salons & med spas.
      </p>
    </main>
  );
}
