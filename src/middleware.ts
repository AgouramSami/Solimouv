import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Si les variables Supabase ne sont pas configurées, on laisse passer
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
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
    // Supabase injoignable → on laisse passer sans bloquer
    return supabaseResponse;
  }

  const { pathname, searchParams } = request.nextUrl;

  // Supabase renvoie parfois le code sur / au lieu de /auth/callback
  // → on intercepte et on redirige correctement
  if (pathname === "/" && searchParams.has("code")) {
    const callbackUrl = new URL("/auth/callback", request.url);
    callbackUrl.searchParams.set("code", searchParams.get("code")!);
    return NextResponse.redirect(callbackUrl);
  }

  // Onboarding nécessite d'être connecté
  if (pathname.startsWith("/onboarding") && !user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Admin nécessite d'être connecté (vérification du rôle dans le layout)
  if (pathname.startsWith("/admin") && !user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Si déjà connecté → on ne repart pas sur login
  if (pathname.startsWith("/auth/login") && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
