import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/programme", label: "Programme" },
  { href: "/admin/partenariats", label: "Partenariats" },
  { href: "/admin/utilisateurs", label: "Utilisateurs" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/home");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <nav className="sticky top-0 z-40 bg-[#474194] text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src="/figma-assets/logo.png"
              alt="Solimouv'"
              className="h-5 w-auto brightness-0 invert"
            />
            <span className="rounded bg-white/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider">
              Admin
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-white/15 transition"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-1 overflow-x-auto">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-medium hover:bg-white/15 transition"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/home"
            className="text-xs text-white/60 hover:text-white transition"
          >
            ← App
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {children}
      </main>
    </div>
  );
}
