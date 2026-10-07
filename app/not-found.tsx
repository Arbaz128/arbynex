import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <span className="inline-block rounded-full border border-violet/30 bg-violet/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-violet">
        ARBYNEX
      </span>
      <h1 className="mt-5 font-display text-6xl font-bold tracking-tight md:text-7xl">
        <span className="grad-text">404</span>
      </h1>
      <p className="mt-3 font-display text-xl font-semibold text-heading">
        Page not found
      </p>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="grad-bg mt-8 rounded-full px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </main>
  );
}
