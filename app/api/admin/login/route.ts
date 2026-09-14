import type { NextRequest } from "next/server";
import { createSession, verifyCredentials } from "@/lib/auth";

export async function POST(request: NextRequest) {
  let email = "";
  let password = "";
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    email = body.email ?? "";
    password = body.password ?? "";
  } catch {
    // fall through to the generic error below
  }

  if (!verifyCredentials(email, password)) {
    return Response.json(
      { error: "Invalid email or password." },
      { status: 401 },
    );
  }

  await createSession(email.trim().toLowerCase());
  return Response.json({ ok: true });
}