"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <span className="inline-block rounded-full border border-pink/30 bg-pink/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-pink">
        ARBYNEX
      </span>
      <h1 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">
        Something went <span className="grad-text">wrong</span>
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
        An unexpected error occurred. Please try again — if it keeps
        happening, get in touch with us.
      </p>
      <button
        onClick={() => reset()}
        className="grad-bg mt-8 rounded-full px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Try again
      </button>
    </main>
  );
}
