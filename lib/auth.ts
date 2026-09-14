import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash, timingSafeEqual } from "crypto";
import { decrypt, encrypt, sessionCookieOptions } from "@/lib/session";
import type { SessionPayload } from "@/lib/session";

/**
 * Admin auth (single hardcoded user via env vars).
 *
 * - Login: verify credentials against ADMIN_EMAIL / ADMIN_PASSWORD, then set
 *   an httpOnly JWT session cookie (signed with SESSION_SECRET).
 * - Every protected page/route calls `getSession()` (or `verifySession()` for
 *   pages) — client-side checks alone are never enough.
 */

const LOGIN_URL = "/admin/login";

/** Create the httpOnly session cookie for the given admin email. */
export async function createSession(email: string) {
  const token = await encrypt({ email });
  const store = await cookies();
  store.set(sessionCookieOptions.name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: sessionCookieOptions.maxAge,
    path: "/",
  });
}

export async function deleteSession() {
  const store = await cookies();
  store.delete(sessionCookieOptions.name);
}

/** Raw session payload, or null if absent/invalid/not the admin. */
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(sessionCookieOptions.name)?.value;
  const payload = await decrypt(token);
  if (!payload || payload.email !== process.env.ADMIN_EMAIL) {
    return null;
  }
  return payload;
}

/**
 * For pages/layouts: redirect to /admin/login when not authenticated.
 * Route handlers should use `getSession()` and return 401 themselves.
 */
export async function verifySession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    redirect(LOGIN_URL);
  }
  return session;
}

function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

/** Constant-time comparison against ADMIN_EMAIL / ADMIN_PASSWORD env vars. */
export function verifyCredentials(email: string, password: string): boolean {
  const envEmail = process.env.ADMIN_EMAIL;
  const envPassword = process.env.ADMIN_PASSWORD;
  if (!envEmail || !envPassword) return false;
  const emailOk = safeEqual(
    email.trim().toLowerCase(),
    envEmail.trim().toLowerCase(),
  );
  const passwordOk = safeEqual(password, envPassword);
  return emailOk && passwordOk;
}