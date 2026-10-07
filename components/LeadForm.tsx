"use client";

import { useState } from "react";
import { MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/contact";

type FieldErrors = { name?: string; email?: string; message?: string };

const LIMITS = { name: 100, email: 200, phone: 40, message: 4000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    else if (name.trim().length > LIMITS.name) next.name = "Name is too long.";
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Please enter a valid email address.";
    else if (email.trim().length > LIMITS.email) next.email = "Email is too long.";
    if (!message.trim()) next.message = "Please tell us about your project.";
    else if (message.trim().length > LIMITS.message) next.message = "Message is too long.";
    return next;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setServerError("");

    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          website: honeypot,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setServerError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSuccess(true);
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setErrors({});
    setServerError("");
    setSuccess(false);
  }

  const field =
    "w-full rounded-xl border border-line bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-muted focus:border-violet";
  const invalid = (key: keyof FieldErrors) =>
    errors[key] ? "border-pink" : "";

  if (success) {
    return (
      <div className="mx-auto mt-12 max-w-lg rounded-3xl border border-line bg-card p-6 text-left md:p-8">
        <div className="flex items-start gap-3">
          <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-emerald" />
          <div>
            <p className="font-display text-lg font-semibold text-white">
              Message sent — thank you!
            </p>
            <p className="mt-1.5 text-sm text-muted">
              We&apos;ve received your project brief and will get back to you
              within one business day.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={buildWhatsAppUrl(
              `Hi ARBYNEX! I just sent a message via your contact form (name: ${name.trim()}).`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="grad-bg inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-display text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-xl border border-line px-5 py-3 font-display text-sm font-semibold text-white transition-colors hover:border-violet"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="mx-auto mt-12 max-w-lg rounded-3xl border border-line bg-card p-6 text-left md:p-8"
    >
      <p className="font-display text-lg font-semibold text-white">
        Or tell us about your project — takes 30 seconds
      </p>
      <p className="mt-1.5 text-sm text-muted">
        Fill this in and we&apos;ll reach out with a clear scope and quote. No
        spam, no obligation.
      </p>

      {/* Honeypot — hidden from humans, bots fill it in */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="mt-6 space-y-3">
        <div>
          <input
            className={`${field} ${invalid("name")}`}
            placeholder="Your name *"
            value={name}
            maxLength={LIMITS.name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-pink">{errors.name}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            className={`${field} ${invalid("email")}`}
            placeholder="Email *"
            value={email}
            maxLength={LIMITS.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-pink">{errors.email}</p>
          )}
        </div>
        <input
          className={field}
          placeholder="Phone / WhatsApp (optional)"
          value={phone}
          maxLength={LIMITS.phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div>
          <textarea
            className={`${field} min-h-[90px] resize-y ${invalid("message")}`}
            placeholder="What are you building, and what problem does it solve? *"
            value={message}
            maxLength={LIMITS.message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs text-pink">{errors.message}</p>
          )}
        </div>
      </div>

      {serverError && (
        <p className="mt-3 text-xs text-pink">{serverError}</p>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="grad-bg inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 font-display text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {submitting ? (
            <>
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              />
              Sending…
            </>
          ) : (
            <>
              <Send size={18} /> Send Message
            </>
          )}
        </button>
        <a
          href={buildWhatsAppUrl(
            "Hi ARBYNEX! I'd like to discuss a project (sent from your website).",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-line px-5 py-3 font-display text-sm font-semibold text-white transition-colors hover:border-violet"
        >
          <MessageCircle size={18} /> Chat on WhatsApp
        </a>
      </div>
    </form>
  );
}
