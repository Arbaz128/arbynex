import "server-only";
import { SignJWT, jwtVerify } from "jose";

/**
 * Stateless admin session — a JWT signed with SESSION_SECRET (HS256).
 * Split from lib/auth.ts so proxy.ts can use `decrypt` without pulling in
 * next/headers / next/navigation.
 */

export type SessionPayload = {
  email: string;
};

const SESSION_COOKIE_NAME = "session" as const;
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set.");
  }
  return new TextEncoder().encode(secret);
}

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function decrypt(
  session: string | undefined = "",
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(session, getSecret(), {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  name: SESSION_COOKIE_NAME,
  maxAge: SESSION_MAX_AGE,
} as const;