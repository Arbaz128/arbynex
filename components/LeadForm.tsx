"use client";

import { useState } from "react";
import { MessageCircle, Mail } from "lucide-react";
import { buildWhatsAppUrl, buildEmailUrl } from "@/lib/contact";

export default function LeadForm() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [problem, setProblem] = useState("");
  const [touched, setTouched] = useState(false);

  const ready = name.trim() && business.trim() && problem.trim();

  const message = `Hi ARBYNEX! I'd like to discuss a project.\n\nName: ${name}\nBusiness/Product: ${business}\nProblem it solves: ${problem}`;

  function open(url: string) {
    if (!ready) {
      setTouched(true);
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const field =
    "w-full rounded-xl border border-line bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-muted focus:border-violet";

  return (
    <div className="mx-auto mt-12 max-w-lg rounded-3xl border border-line bg-card p-6 text-left md:p-8">
      <p className="font-display text-lg font-semibold text-white">
        Or tell us about your project — takes 30 seconds
      </p>
      <p className="mt-1.5 text-sm text-muted">
        Fill this in and we&apos;ll reach out with a clear scope and quote. No
        spam, no obligation.
      </p>

      <div className="mt-6 space-y-3">
        <input
          className={field}
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={field}
          placeholder="What are you building? (e.g. SaaS, mobile app, business system)"
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
        />
        <textarea
          className={`${field} min-h-[90px] resize-y`}
          placeholder="What problem does this solve?"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
        />
      </div>

      {touched && !ready && (
        <p className="mt-3 text-xs text-pink">
          Please fill in all three fields first.
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={() => open(buildWhatsAppUrl(message))}
          className="grad-bg inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 font-display text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          <MessageCircle size={18} /> Send on WhatsApp
        </button>
        <button
          onClick={() => open(buildEmailUrl("Project Inquiry", message))}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-line px-5 py-3 font-display text-sm font-semibold text-white transition-colors hover:border-violet"
        >
          <Mail size={18} /> Send by Email
        </button>
      </div>
    </div>
  );
}
