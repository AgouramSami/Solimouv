"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type UserProfile = {
  id: string;
  prenom: string | null;
  nom: string | null;
  full_name: string | null;
  crm_categorie: string | null;
  type_sport: string | null;
  situation: string | null;
  onboarded: boolean;
  role: string | null;
  email_optin: boolean;
  created_at: string;
};

export default function UtilisateursPage() {
  const supabase = createClient();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterOnboarded, setFilterOnboarded] = useState<"all" | "yes" | "no">("all");
  const [togglingId, setTogglingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("user_profiles")
      .select("id, prenom, nom, full_name, crm_categorie, type_sport, situation, onboarded, role, email_optin, created_at")
      .order("created_at", { ascending: false });
    setUsers((data as UserProfile[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function toggleRole(id: string, currentRole: string | null) {
    setTogglingId(id);
    const newRole = currentRole === "admin" ? "user" : "admin";
    await supabase.from("user_profiles").update({ role: newRole }).eq("id", id);
    await load();
    setTogglingId(null);
  }

  const filtered = users.filter((u) => {
    const name = `${u.prenom ?? ""} ${u.nom ?? ""} ${u.full_name ?? ""}`.toLowerCase();
    const matchSearch = !search || name.includes(search.toLowerCase());
    const matchOnboarded =
      filterOnboarded === "all" ||
      (filterOnboarded === "yes" && u.onboarded) ||
      (filterOnboarded === "no" && !u.onboarded);
    return matchSearch && matchOnboarded;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Utilisateurs</h1>
        <p className="text-sm text-gray-500 mt-1">{users.length} inscrit(s) · {users.filter((u) => u.role === "admin").length} admin(s)</p>
      </div>

      {/* Filtres */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Rechercher par nom…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#474194] transition"
        />
        <div className="flex gap-2">
          {(["all", "yes", "no"] as const).map((val) => (
            <button
              key={val}
              onClick={() => setFilterOnboarded(val)}
              className={`rounded-xl px-3 py-2 text-xs font-medium transition ${
                filterOnboarded === val
                  ? "bg-[#474194] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {val === "all" ? "Tous" : val === "yes" ? "Onboardés" : "En attente"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400 text-sm">Chargement…</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">Aucun utilisateur trouvé.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Utilisateur", "Catégorie CRM", "Sport", "Onboarding", "Opt-in", "Inscription", "Rôle", "Action"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((u) => {
                  const displayName = u.prenom || u.nom
                    ? `${u.prenom ?? ""} ${u.nom ?? ""}`.trim()
                    : u.full_name ?? "—";

                  return (
                    <tr key={u.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 shrink-0 rounded-full bg-[#474194]/15 flex items-center justify-center text-[#474194] font-bold text-xs uppercase">
                            {displayName[0] ?? "?"}
                          </div>
                          <span className="font-medium text-gray-900">{displayName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        {u.crm_categorie ? (
                          <span className="rounded-full bg-[#474194]/10 text-[#474194] px-2 py-0.5 text-xs font-medium">
                            {u.crm_categorie}
                          </span>
                        ) : "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{u.type_sport ?? "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          u.onboarded ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                        }`}>
                          {u.onboarded ? "✓ Fait" : "En attente"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={u.email_optin ? "text-green-600" : "text-gray-300"}>
                          {u.email_optin ? "✓" : "✗"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                        {new Date(u.created_at).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          u.role === "admin"
                            ? "bg-[#d81d61]/10 text-[#d81d61]"
                            : "bg-gray-100 text-gray-500"
                        }`}>
                          {u.role ?? "user"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleRole(u.id, u.role)}
                          disabled={togglingId === u.id}
                          className={`rounded-lg px-3 py-1 text-xs font-medium transition disabled:opacity-50 ${
                            u.role === "admin"
                              ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              : "bg-[#474194] text-white hover:bg-[#3a3578]"
                          }`}
                        >
                          {togglingId === u.id
                            ? "…"
                            : u.role === "admin"
                            ? "Rétrograder"
                            : "Passer admin"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
