import { createClient } from "@/lib/supabase/server";

function StatCard({
  label,
  value,
  color,
  sub,
}: {
  label: string;
  value: number;
  color: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
      <div
        className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ background: `${color}20` }}
      >
        <div className="h-4 w-4 rounded-full" style={{ background: color }} />
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="mt-1 text-sm font-medium text-gray-500">{label}</p>
      {sub && <p className="mt-0.5 text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: totalUsers },
    { count: onboarded },
    { count: totalActivites },
    { count: totalPartenaires },
    { count: totalInscriptions },
    { data: recentUsers },
    { data: topCategories },
  ] = await Promise.all([
    supabase.from("user_profiles").select("*", { count: "exact", head: true }),
    supabase.from("user_profiles").select("*", { count: "exact", head: true }).eq("onboarded", true),
    supabase.from("activites").select("*", { count: "exact", head: true }),
    supabase.from("associations").select("*", { count: "exact", head: true }),
    supabase.from("inscriptions").select("*", { count: "exact", head: true }),
    supabase
      .from("user_profiles")
      .select("id, prenom, nom, full_name, crm_categorie, onboarded, type_sport, created_at")
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("user_profiles")
      .select("crm_categorie")
      .not("crm_categorie", "is", null),
  ]);

  // Compte les catégories CRM
  const catCount: Record<string, number> = {};
  topCategories?.forEach((u) => {
    if (u.crm_categorie) catCount[u.crm_categorie] = (catCount[u.crm_categorie] ?? 0) + 1;
  });
  const sortedCats = Object.entries(catCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const onboardRate = totalUsers ? Math.round(((onboarded ?? 0) / totalUsers) * 100) : 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Vue d&apos;ensemble du festival Solimouv&apos;</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5 mb-8">
        <StatCard label="Inscrits" value={totalUsers ?? 0} color="#474194" />
        <StatCard
          label="Onboardés"
          value={onboarded ?? 0}
          color="#2e7e33"
          sub={`${onboardRate}% du total`}
        />
        <StatCard label="Activités" value={totalActivites ?? 0} color="#1f74bb" />
        <StatCard label="Partenaires" value={totalPartenaires ?? 0} color="#d81d61" />
        <StatCard label="Inscriptions" value={totalInscriptions ?? 0} color="#c11720" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Derniers inscrits */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
          <h2 className="mb-4 font-semibold text-gray-800">Derniers inscrits</h2>
          <div className="space-y-2">
            {recentUsers?.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {u.prenom || u.nom
                      ? `${u.prenom ?? ""} ${u.nom ?? ""}`.trim()
                      : u.full_name || "—"}
                  </p>
                  <p className="text-xs text-gray-400">{u.crm_categorie ?? "Non catégorisé"}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    u.onboarded
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {u.onboarded ? "Onboardé" : "En attente"}
                </span>
              </div>
            ))}
            {!recentUsers?.length && (
              <p className="text-sm text-gray-400 text-center py-4">Aucun inscrit pour l&apos;instant</p>
            )}
          </div>
        </div>

        {/* Répartition CRM */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
          <h2 className="mb-4 font-semibold text-gray-800">Répartition CRM</h2>
          <div className="space-y-3">
            {sortedCats.length > 0 ? sortedCats.map(([cat, count]) => (
              <div key={cat}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{cat}</span>
                  <span className="text-gray-400">{count}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#474194]"
                    style={{
                      width: `${Math.round((count / (totalUsers || 1)) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            )) : (
              <p className="text-sm text-gray-400 text-center py-4">Pas encore de données</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
