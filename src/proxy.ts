import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "./lib/supabase/middleware";

const intlProxy = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  // Admin lives outside the locale routing (single language, own auth
  // guard) — handle it separately instead of running it through next-intl.
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const { supabaseResponse, user } = await updateSession(request);

    const isLoginPage = request.nextUrl.pathname === "/admin/login";

    if (!user && !isLoginPage) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (user && isLoginPage) {
      return NextResponse.redirect(new URL("/admin/bookings", request.url));
    }

    return supabaseResponse;
  }

  return intlProxy(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
