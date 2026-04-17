import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata: Metadata = { title: "Admin — Solimouv'" };

// Revalide toutes les 60 s en prod
export const revalidate = 60;

// ─── helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString("fr-FR");
}

function pct(part: number, total: number) {
  if (!total) return "0 %";
  return `${Math.round((part / total) * 100)} %`;
}

/** Compte les occurrences d'une valeur dans un tableau JSON column */
function countOccurrences(
  rows: Record<string, unknown>[],
  column: string,
  value: string
): number {
  return rows.filter((r) => {
    const col = r[column];
    if (Array.isArray(col)) return col.includes(value);
    return col === value;
  }).length;
}

// ─── composants ──────────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  sub,
  color = "brand-primary",
}: {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className={`mt-2 text-4xl font-black text-${color}`}>{value}</p>
      {sub && <p className="mt-1 text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

function BarChart({
  title,
  data,
  colorClass = "bg-brand-primary",
}: {
  title: string;
  data: { label: string; count: number; emoji?: string }[];
  colorClass?: string;
}) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-heading text-lg font-bold text-brand-dark">
        {title}
      </h2>
      <ul className="space-y-3">
        {data
          .sort((a, b) => b.count - a.count)
          .map((item) => (
            <li key={item.label} className="flex items-center gap-3">
              {item.emoji && (
                <span className="w-6 text-center text-base">{item.emoji}</span>
              )}
              <span className="w-28 shrink-0 text-xs text-gray-600">
                {item.label}
              </span>
              <div className="flex flex-1 items-center gap-2">
                <div
                  className={`h-5 rounded-full ${colorClass} transition-all`}
                  style={{ width: `${(item.count / max) * 100}%`, minWidth: 4 }}
                />
                <span className="text-xs font-semibold text-gray-700">
                  {item.count}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default async function AdminPage() {
  let profiles: Record<string, unknown>[] = [];
  let serviceRoleError = false;

  try {
    const admin = createAdminClient();

    const { data, error } = await admin
      .from("user_profiles")
      .select("public_cible, sports_interests, niveau, dynamique, onboarded, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;
    profiles = (data ?? []) as Record<string, unknown>[];
  } catch {
    serviceRoleError = true;
  }

  const totalUsers = profiles.length;
  const onboardedUsers = profiles.filter((p) => p.onboarded).length;
  const last7Days = profiles.filter((p) => {
    const d = new Date(p.created_at as string);
    return Date.now() - d.getTime() < 7 * 24 * 3600 * 1000;
  }).length;

  // Sports distribution
  const sportLabels: Record<string, { label: string; emoji: string }> = {
    foot: { label: "Football", emoji: "⚽" },
    basket: { label: "Basketball", emoji: "🏀" },
    yoga: { label: "Yoga", emoji: "🧘" },
    boxe: { label: "Boxe", emoji: "🥊" },
    natation: { label: "Natation", emoji: "🏊" },
    danse: { label: "Danse", emoji: "💃" },
    athletisme: { label: "Athlétisme", emoji: "🏃" },
    handisport: { label: "Handisport", emoji: "🏅" },
    arts_martiaux: { label: "Arts martiaux", emoji: "🥋" },
    cyclisme: { label: "Cyclisme", emoji: "🚴" },
  };

  const sportsData = Object.entries(sportLabels).map(([id, { label, emoji }]) => ({
    label,
    emoji,
    count: countOccurrences(profiles, "sports_interests", id),
  }));

  // Profil public distribution
  const profilLabels: Record<string, { label: string; emoji: string }> = {
    famille:  { label: "Famille",   emoji: "👨‍👩‍👧‍👦" },
    jeune:    { label: "Jeune",     emoji: "🧑" },
    senior:   { label: "Senior",    emoji: "👴" },
    refugie:  { label: "Réfugié·e", emoji: "🌍" },
    lgbtqia:  { label: "LGBTQIA+",  emoji: "🏳️‍🌈" },
    handicap: { label: "Handicap",  emoji: "♿" },
    autre:    { label: "Autre",     emoji: "👋" },
  };

  const profilData = Object.entries(profilLabels).map(([id, { label, emoji }]) => ({
    label,
    emoji,
    count: countOccurrences(profiles, "public_cible", id),
  }));

  // Niveau distribution
  const niveauLabels: Record<string, string> = {
    decouverte:    "Découverte 🌱",
    debutant:      "Débutant·e 🌟",
    intermediaire: "Intermédiaire 💪",
    avance:        "Avancé·e 🏆",
  };

  const niveauData = Object.entries(niveauLabels).map(([id, label]) => ({
    label,
    count: countOccurrences(profiles, "niveau", id),
  }));

  // Dynamique distribution
  const dynamiqueLabels: Record<string, string> = {
    solo:    "Seul·e 🙋",
    groupe:  "En groupe 👥",
    famille: "En famille 👨‍👩‍👧",
  };

  const dynamiqueData = Object.entries(dynamiqueLabels).map(([id, label]) => ({
    label,
    count: countOccurrences(profiles, "dynamique", id),
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-brand-dark">
          Tableau de bord
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Données en temps réel — Solimouv&apos; Édition 2
        </p>
      </div>

      {serviceRoleError && (
        <div className="rounded-xl border border-orange-200 bg-orange-50 px-5 py-4 text-sm text-orange-700">
          <strong>Configuration manquante :</strong> Ajoutez{" "}
          <code className="rounded bg-orange-100 px-1">SUPABASE_SERVICE_ROLE_KEY</code> et{" "}
          <code className="rounded bg-orange-100 px-1">ADMIN_EMAILS</code> dans Vercel &gt;
          Settings &gt; Environment Variables, puis redéployez.
        </div>
      )}

      {/* KPIs */}
      <section aria-labelledby="kpi-title">
        <h2 id="kpi-title" className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Indicateurs clés
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="Comptes créés"
            value={fmt(totalUsers)}
            sub="total inscrits"
          />
          <KpiCard
            label="Onboarding complété"
            value={pct(onboardedUsers, totalUsers)}
            sub={`${fmt(onboardedUsers)} / ${fmt(totalUsers)}`}
            color="brand-blue"
          />
          <KpiCard
            label="Nouveaux (7j)"
            value={fmt(last7Days)}
            sub="derniers 7 jours"
            color="green-600"
          />
          <KpiCard
            label="Taux de rétention"
            value={pct(onboardedUsers, totalUsers)}
            sub="ont terminé le parcours"
            color="brand-primary"
          />
        </div>
      </section>

      {/* Charts */}
      <section aria-labelledby="charts-title">
        <h2 id="charts-title" className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Préférences
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <BarChart
            title="Sports préférés"
            data={sportsData}
            colorClass="bg-brand-primary"
          />
          <BarChart
            title="Profils publics cibles"
            data={profilData}
            colorClass="bg-brand-blue"
          />
          <BarChart
            title="Niveau de pratique"
            data={niveauData}
            colorClass="bg-brand-secondary"
          />
          <BarChart
            title="Dynamique (solo / groupe / famille)"
            data={dynamiqueData}
            colorClass="bg-orange-400"
          />
        </div>
      </section>

      {/* Dernières inscriptions */}
      <section aria-labelledby="users-title">
        <h2 id="users-title" className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Dernières inscriptions
        </h2>
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {profiles.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-gray-400">
              {serviceRoleError
                ? "Configurez SUPABASE_SERVICE_ROLE_KEY pour voir les données."
                : "Aucun utilisateur encore inscrit."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Profil</th>
                    <th className="px-4 py-3 text-left">Niveau</th>
                    <th className="px-4 py-3 text-left">Dynamique</th>
                    <th className="px-4 py-3 text-left">Sports</th>
                    <th className="px-4 py-3 text-center">Onboardé</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {profiles.slice(0, 50).map((p, i) => {
                    const profileInfo = profilLabels[p.public_cible as string];
                    const sports = Array.isArray(p.sports_interests)
                      ? (p.sports_interests as string[])
                          .map((s) => sportLabels[s]?.emoji ?? s)
                          .join(" ")
                      : "—";
                    const date = p.created_at
                      ? new Date(p.created_at as string).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—";

                    return (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                          {date}
                        </td>
                        <td className="px-4 py-3">
                          {profileInfo
                            ? `${profileInfo.emoji} ${profileInfo.label}`
                            : (p.public_cible as string) ?? "—"}
                        </td>
                        <td className="px-4 py-3">
                          {niveauLabels[p.niveau as string] ?? "—"}
                        </td>
                        <td className="px-4 py-3">
                          {dynamiqueLabels[p.dynamique as string] ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-base">{sports || "—"}</td>
                        <td className="px-4 py-3 text-center">
                          {p.onboarded ? (
                            <span className="text-green-500">✓</span>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {profiles.length > 50 && (
                <p className="px-4 py-3 text-center text-xs text-gray-400">
                  Affichage des 50 derniers sur {fmt(totalUsers)} inscrits
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
