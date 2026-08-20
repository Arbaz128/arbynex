import { MessageCircle, Mail, Globe } from "lucide-react";
import { WHATSAPP_NUMBER, EMAIL } from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-10 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <span className="grad-text font-display text-2xl font-bold tracking-[0.12em]">
              ARBYNEX
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              AI Automation Agency & Software Company. We build AI chatbots,
              business automation systems, custom software, SaaS platforms and
              enterprise solutions for modern businesses.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 text-sm text-muted">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <MessageCircle size={16} className="text-emerald-400" />
                +{WHATSAPP_NUMBER}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail size={16} className="text-cyan" />
                {EMAIL}
              </a>
              <span className="flex items-center gap-2">
                <Globe size={16} className="text-violet" />
                arbynex.com
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/60">
              Services
            </h4>
            <div className="mt-4 flex flex-col gap-2.5">
              {[
                "AI Chatbots",
                "Business Automation",
                "Custom Software",
                "Web Applications",
                "SaaS Products",
                "Enterprise Systems",
              ].map((s) => (
                <a
                  key={s}
                  href="#services"
                  className="text-sm text-muted transition-colors hover:text-white"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/60">
              Company
            </h4>
            <div className="mt-4 flex flex-col gap-2.5">
              {[
                { label: "What We Build", href: "#services" },
                { label: "AI & Automation", href: "#ai" },
                { label: "Technology", href: "#tech" },
                { label: "Our Work", href: "#work" },
                { label: "Industries", href: "#industries" },
                { label: "Process", href: "#process" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 md:flex-row">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} ARBYNEX — AI Automation Agency &
            Software Company. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-muted transition-colors hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-muted transition-colors hover:text-white"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function buildWhatsAppUrl() {
  return `https://wa.me/${WHATSAPP_NUMBER}`;
}
