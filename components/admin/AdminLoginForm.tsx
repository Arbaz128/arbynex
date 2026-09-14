"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";

const field =
  "w-full rounded-xl border border-line bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-muted focus:border-violet";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(data?.error ?? "Login failed. Please try again.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
      className="mx-auto mt-8 w-full max-w-sm rounded-3xl border border-line bg-card p-7 text-left"
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-cyan/15 to-violet/15">
        <Lock className="text-cyan" size={22} />
      </div>

      <div className="space-y-3">
        <input
          type="email"
          required
          autoComplete="off"
          name="admin-email"
          className={field}
          placeholder="Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            name="admin-password"
            className={`${field} pr-11`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition-colors hover:text-white"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>

      {error && <p className="mt-3 text-xs text-pink">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="grad-bg mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-display text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {pending ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
}