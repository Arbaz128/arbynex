"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AtSign, LayoutDashboard, LogOut, Table2 } from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Table2 },
  { href: "/admin/instagram", label: "Instagram", icon: AtSign },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    if (busy) return;
    setBusy(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  }

  return (
    <nav className="glass fixed inset-x-0 top-0 z-50 border-b border-line">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <a href="/admin" className="flex items-baseline gap-2">
          <span className="grad-text font-display text-xl font-bold tracking-[0.12em]">
            ARBYNEX
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
            Admin
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  active ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                <l.icon size={15} />
                {l.label}
              </a>
            );
          })}
        </div>

        <button
          onClick={logout}
          disabled={busy}
          className="flex items-center gap-1.5 rounded-xl border border-line px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-violet disabled:opacity-60"
        >
          <LogOut size={15} /> Log out
        </button>
      </div>

      <div className="flex gap-5 overflow-x-auto border-t border-line px-4 py-3 sm:px-6 md:hidden">
        {LINKS.map((l) => {
          const active = pathname === l.href;
          return (
            <a
              key={l.href}
              href={l.href}
              className={`flex items-center gap-1.5 text-sm font-medium ${
                active ? "text-white" : "text-muted"
              }`}
            >
              <l.icon size={15} />
              {l.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}