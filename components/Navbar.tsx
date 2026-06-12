"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "How It Works" },
  { href: "#usecases", label: "Use Cases" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="glass fixed inset-x-0 top-0 z-50 border-b border-line">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="grad-text font-display text-2xl font-bold tracking-[0.12em]"
        >
          ARBYNEX
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="grad-bg rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(139,92,246,.35)] transition-transform hover:-translate-y-0.5"
          >
            Get Free Demo
          </a>
        </div>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="glass flex flex-col gap-5 border-t border-line px-6 py-6 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-muted transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="grad-bg rounded-xl px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Get Free Demo
          </a>
        </div>
      )}
    </nav>
  );
}
