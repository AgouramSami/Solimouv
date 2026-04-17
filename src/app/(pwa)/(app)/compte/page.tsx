import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";

export const metadata: Metadata = { title: "Mon compte — Solimouv'" };

const SPORT_LABELS: Record<string, string> = {
  sports_collectifs:    "Sports collectifs",
  sports_individuels:   "Sports individuels",
  arts_martiaux_combat: "Arts martiaux & Combat",
  danse_expression:     "Danse & Expression",
  plein_air_nature:     "Plein air & Nature",
  bien_etre_yoga:       "Bien-être & Yoga",
};

const ALL_BADGES = [
  { id: "onboarded",       emoji: "🎯", nom: "Bienvenue",       desc: "Questionnaire complété" },
  { id: "first_activity",  emoji: "⚡", nom: "Premier pas",     desc: "1ère inscription à une activité" },
  { id: "sport_explorer",  emoji: "🧭", nom: "Explorateur",     desc: "3 sports différents essayés" },
  { id: "festival_fan",    emoji: "🎉", nom: "Fan du festival",  desc: "Participation au festival" },
  { id: "inclusive",       emoji: "🤝", nom: "Inclusif",        desc: "Engagement pour l'inclusion" },
];

export default async function ComptePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const [{ data: profile }, { data: userBadges }] = await Promise.all([
    supabase
      .from("user_profiles")
      .select("full_name, prenom, role, type_sport, onboarded")
      .eq("id", user.id)
      .single(),
    supabase
      .from("user_badges")
      .select("badge_id")
      .eq("user_id", user.id),
  ]);

  const isAdmin = profile?.role === "admin";
  const displayName = profile?.prenom ?? profile?.full_name ?? user.email?.split("@")[0] ?? "Utilisateur";
  const initials = displayName.slice(0, 2).toUpperCase();
  const earnedIds = new Set((userBadges ?? []).map((b: { badge_id: string }) => b.badge_id));

  return (
    <div className="min-h-screen bg-[#faf9f5]">

      {/* ── Header violet ── */}
      <div className="bg-[#474194] px-5 pt-10 pb-10 text-white text-center relative overflow-hidden">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/5" />
        <div className="absolute -left-8 -bottom-8 h-28 w-28 rounded-full bg-[#d81d61]/20" />

        {/* Avatar */}
        <div className="relative mx-auto mb-3 h-20 w-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-black border-2 border-white/30">
          {initials}
        </div>
        <p className="font-heading text-xl font-bold">{displayName}</p>
        <p className="font-body text-sm text-white/60 mt-0.5">{user.email}</p>
        {isAdmin && (
          <span className="mt-2 inline-flex items-center rounded-full bg-[#d81d61] px-3 py-0.5 text-xs font-bold text-white">
            Admin
          </span>
        )}
      </div>

      <div className="px-4 py-5 space-y-4 md:max-w-xl md:mx-auto">

        {/* Admin panel */}
        {isAdmin && (
          <Link href="/admin"
            className="flex items-center justify-between rounded-2xl bg-[#474194] px-5 py-4 text-white transition active:scale-[0.98]">
            <div>
              <p className="font-body font-semibold text-sm">Espace administrateur</p>
              <p className="font-body text-xs text-white/60 mt-0.5">Dashboard, programme, utilisateurs</p>
            </div>
            <span className="text-white/60 text-lg">→</span>
          </Link>
        )}

        {/* Préférence sportive */}
        {profile?.type_sport && (
          <div className="rounded-2xl bg-white border border-gray-100 px-5 py-4 shadow-sm">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Mon sport préféré
            </p>
            <span className="inline-block rounded-full bg-[#474194]/10 px-3 py-1 font-body text-sm font-medium text-[#474194]">
              {SPORT_LABELS[profile.type_sport] ?? profile.type_sport}
            </span>
          </div>
        )}

        {/* ── Badges ── */}
        <div className="rounded-2xl bg-white border border-gray-100 px-5 py-4 shadow-sm">
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Mes badges
          </p>
          <div className="grid grid-cols-5 gap-2">
            {ALL_BADGES.map((badge) => {
              const earned = earnedIds.has(badge.id);
              return (
                <div key={badge.id} className="flex flex-col items-center gap-1">
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-2xl transition ${
                    earned
                      ? "bg-[#474194]/10 shadow-sm"
                      : "bg-gray-100 grayscale opacity-40"
                  }`}>
                    {badge.emoji}
                  </div>
                  <p className={`font-body text-[10px] text-center leading-tight ${
                    earned ? "text-[#474194] font-semibold" : "text-gray-400"
                  }`}>
                    {badge.nom}
                  </p>
                </div>
              );
            })}
          </div>
          {earnedIds.size === 0 && (
            <p className="font-body text-xs text-gray-400 text-center mt-3">
              Inscris-toi à une activité pour débloquer tes premiers badges !
            </p>
          )}
        </div>

        {/* Liens */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm divide-y divide-gray-100">
          <Link href="/parametres"
            className="flex items-center justify-between px-5 py-3.5 font-body text-sm text-gray-700 hover:bg-gray-50 transition">
            <span>Paramètres</span>
            <span className="text-gray-400">→</span>
          </Link>
          <Link href="/confidentialite"
            className="flex items-center justify-between px-5 py-3.5 font-body text-sm text-gray-700 hover:bg-gray-50 transition">
            <span>Politique de confidentialité</span>
            <span className="text-gray-400">→</span>
          </Link>
          <Link href="/cgu"
            className="flex items-center justify-between px-5 py-3.5 font-body text-sm text-gray-700 hover:bg-gray-50 transition">
            <span>Conditions d&apos;utilisation</span>
            <span className="text-gray-400">→</span>
          </Link>
        </div>

        {/* Déconnexion */}
        <SignOutButton />
      </div>
    </div>
  );
}
