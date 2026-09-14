import type { Metadata } from "next";
import Link from "next/link";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <span className="inline-block rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
        ARBYNEX Control Room
      </span>
      <h1 className="mt-5 font-display text-3xl font-bold tracking-tight md:text-4xl">
        Admin <span className="grad-text">Sign in</span>
      </h1>
      <p className="mt-3 max-w-sm text-center text-sm leading-relaxed text-muted">
        Private area — triggers the lead-sourcing, outreach and follow-up
        workflows, and shows your live leads.
      </p>

      <AdminLoginForm />

      <Link
        href="/"
        className="mt-8 text-sm text-muted transition-colors hover:text-white"
      >
        ← Back to arbynex.com
      </Link>
    </main>
  );
}