import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";

export const metadata: Metadata = { title: "Mon compte — Solimouv'" };

const SPORT_LABELS: Record<string, string> = {
  sports_collectifs: "Sports collectifs",
  sports_individuels: "Sports individuels",
  arts_martiaux_combat: "Arts martiaux & Combat",
  danse_expression: "Danse & Expression",
  plein_air_nature: "Plein air & Nature",
  bien_etre_yoga: "Bien-être & Yoga",
};

export default async function ComptePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("full_name, role, type_sport, onboarding_done")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";
  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : user.email?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#474194] px-5 pt-10 pb-8 text-white">
        <img src="/figma-assets/logo.png" alt="Solimouv'" className="mx-auto h-6 w-auto brightness-0 invert mb-6" />
        <h1 className="font-heading text-2xl font-bold">Mon compte</h1>
        <p className="mt-1 text-sm text-white/70">Votre espace personnel</p>
      </div>

      <div className="px-4 py-6 space-y-4">
        {/* Avatar + infos */}
        <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#474194] text-xl font-bold text-white">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-[#050505] truncate">
              {profile?.full_name ?? "Utilisateur"}
            </p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
            {isAdmin && (
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#d81d61]/10 px-2 py-0.5 text-xs font-semibold text-[#d81d61]">
                Admin
              </span>
            )}
          </div>
        </div>

        {/* Admin panel entry */}
        {isAdmin && (
          <Link
            href="/admin"
            className="flex items-center justify-between rounded-2xl bg-[#474194] px-5 py-4 text-white transition active:scale-[0.98]"
          >
            <div>
              <p className="font-semibold text-sm">Espace administrateur</p>
              <p className="text-xs text-white/70 mt-0.5">Dashboard, programme, utilisateurs</p>
            </div>
            <span className="text-white/60 text-lg">→</span>
          </Link>
        )}

        {/* Préférences sportives */}
        {profile?.onboarding_done && profile?.type_sport && (
          <div className="rounded-2xl border border-gray-100 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Mon sport préféré</p>
            <span className="inline-block rounded-full bg-[#474194]/10 px-3 py-1 text-sm font-medium text-[#474194]">
              {SPORT_LABELS[profile.type_sport] ?? profile.type_sport}
            </span>
          </div>
        )}

        {/* Liens utiles */}
        <div className="rounded-2xl border border-gray-100 divide-y divide-gray-100">
          <Link href="/parametres" className="flex items-center justify-between px-4 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition">
            <span>Paramètres</span>
            <span className="text-gray-400">→</span>
          </Link>
          <Link href="/confidentialite" className="flex items-center justify-between px-4 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition">
            <span>Politique de confidentialité</span>
            <span className="text-gray-400">→</span>
          </Link>
          <Link href="/cgu" className="flex items-center justify-between px-4 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition">
            <span>CGU</span>
            <span className="text-gray-400">→</span>
          </Link>
        </div>

        {/* Déconnexion */}
        <SignOutButton />
      </div>
    </div>
  );
}
