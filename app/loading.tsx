export default function Loading() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-5 px-6">
      <div
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-cyan"
      />
      <p className="text-sm text-muted">Loading ARBYNEX…</p>
    </main>
  );
}
