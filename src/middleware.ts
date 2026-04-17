import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Routes app PWA — nécessitent d'être connecté
const APP_ROUTES = ["/home", "/compte", "/parametres", "/onboarding", "/admin", "/quiz", "/associations", "/a-propos", "/contact"];

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) return NextResponse.next({ request });

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() { return request.cookies.getAll(); },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    return supabaseResponse;
  }

  const { pathname, searchParams } = request.nextUrl;

  // Supabase OAuth callback intercepté sur /
  if (pathname === "/" && searchParams.has("code")) {
    const callbackUrl = new URL("/auth/callback", request.url);
    callbackUrl.searchParams.set("code", searchParams.get("code")!);
    return NextResponse.redirect(callbackUrl);
  }

  // Routes app → connecté obligatoire
  const isAppRoute = APP_ROUTES.some(r => pathname === r || pathname.startsWith(r + "/"));
  if (isAppRoute && !user) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Déjà connecté sur login → app
  if (pathname.startsWith("/auth/login") && user) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // PWA installée lancée depuis l'écran d'accueil (sec-fetch-site: none)
  // → si l'utilisateur atterrit sur / dans la PWA, rediriger vers l'app
  const isPwaLaunch =
    request.headers.get("sec-fetch-site") === "none" &&
    request.headers.get("sec-fetch-mode") === "navigate";
  if (pathname === "/" && isPwaLaunch) {
    return NextResponse.redirect(
      new URL(user ? "/home" : "/auth/login", request.url)
    );
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sw\\.js|workbox-.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
