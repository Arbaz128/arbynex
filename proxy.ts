import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

/**
 * Next.js 16 Proxy (formerly middleware) — optimistic /admin guard.
 *
 * This is ONLY an optimistic first line of defense: the real authorization
 * happens in the (dashboard) layout via verifySession() and in every
 * /api/admin/* route handler. See the Next.js auth guide for why.
 */

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";

  const token = request.cookies.get("session")?.value;
  const session = token ? await decrypt(token) : null;
  const authenticated =
    !!session && session.email === process.env.ADMIN_EMAIL;

  if (!isLoginPage && !authenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.nextUrl));
  }
  if (isLoginPage && authenticated) {
    return NextResponse.redirect(new URL("/admin", request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};