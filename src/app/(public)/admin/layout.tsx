import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

async function getAdminUser() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

function isAdmin(email: string | undefined): boolean {
  if (!email) return false;
  const adminList = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return adminList.includes(email.toLowerCase());
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAdminUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (!isAdmin(user.email)) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar admin */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white px-6 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-brand-primary px-2 py-0.5 text-xs font-bold text-white">
              ADMIN
            </span>
            <span className="font-heading text-lg font-bold text-brand-dark">
              Solimouv&apos; Dashboard
            </span>
          </div>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
