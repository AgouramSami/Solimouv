"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Activite = {
  id: string;
  titre: string;
  sport: string | null;
  niveau: string | null;
  lieu: string | null;
  date_activite: string;
  heure_debut: string;
  heure_fin: string;
  capacite_max: number;
  inscriptions: number;
  actif: boolean;
};

const NIVEAUX = ["calme", "intermediaire", "avance"];
const SPORTS = ["Yoga", "Tennis", "Basket", "Rugby", "Danse", "Natation", "Vélo", "Boxe", "Crossfit", "Badminton", "Autre"];

const EMPTY_FORM = {
  titre: "",
  sport: "",
  niveau: "calme",
  lieu: "",
  date_activite: "",
  heure_debut: "",
  heure_fin: "",
  capacite_max: 20,
  description: "",
  actif: true,
};

export default function ProgrammePage() {
  const supabase = createClient();
  const [activites, setActivites] = useState<Activite[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("activites")
      .select("*")
      .order("date_activite", { ascending: true })
      .order("heure_debut", { ascending: true });
    setActivites((data as Activite[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const { error: err } = await supabase.from("activites").insert({
      ...form,
      capacite_max: Number(form.capacite_max),
    });
    if (err) { setError(err.message); setSaving(false); return; }
    setForm(EMPTY_FORM);
    setShowForm(false);
    setSaving(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette activité ?")) return;
    await supabase.from("activites").delete().eq("id", id);
    load();
  }

  async function toggleActif(id: string, current: boolean) {
    await supabase.from("activites").update({ actif: !current }).eq("id", id);
    load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Programme</h1>
          <p className="text-sm text-gray-500 mt-1">{activites.length} activité(s) au total</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-[#474194] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3a3578] transition"
        >
          {showForm ? "Annuler" : "+ Nouvelle activité"}
        </button>
      </div>

      {/* Formulaire création */}
      {showForm && (
        <form onSubmit={handleCreate} className="mb-6 rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
          <h2 className="mb-4 font-semibold text-gray-800">Nouvelle activité</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Titre *</label>
              <input required className="input-admin" placeholder="Ex: Yoga inclusif" value={form.titre} onChange={(e) => setForm({ ...form, titre: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Sport</label>
              <select className="input-admin" value={form.sport} onChange={(e) => setForm({ ...form, sport: e.target.value })}>
                <option value="">— Choisir —</option>
                {SPORTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Niveau</label>
              <select className="input-admin" value={form.niveau} onChange={(e) => setForm({ ...form, niveau: e.target.value })}>
                {NIVEAUX.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Lieu</label>
              <input className="input-admin" placeholder="Salle A" value={form.lieu} onChange={(e) => setForm({ ...form, lieu: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Date *</label>
              <input required type="date" className="input-admin" value={form.date_activite} onChange={(e) => setForm({ ...form, date_activite: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Heure début *</label>
              <input required type="time" className="input-admin" value={form.heure_debut} onChange={(e) => setForm({ ...form, heure_debut: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Heure fin *</label>
              <input required type="time" className="input-admin" value={form.heure_fin} onChange={(e) => setForm({ ...form, heure_fin: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Capacité max</label>
              <input type="number" min="1" className="input-admin" value={form.capacite_max} onChange={(e) => setForm({ ...form, capacite_max: Number(e.target.value) })} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
              <textarea rows={2} className="input-admin resize-none" placeholder="Description de l'activité..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <div className="mt-4 flex gap-2">
            <button type="submit" disabled={saving} className="rounded-xl bg-[#2e7e33] px-4 py-2 text-sm font-semibold text-white hover:bg-[#256328] disabled:opacity-50 transition">
              {saving ? "Enregistrement…" : "Créer l'activité"}
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400 text-sm">Chargement…</div>
        ) : activites.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">Aucune activité. Créez-en une ci-dessus.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Titre", "Sport", "Date", "Horaire", "Lieu", "Capacité", "Inscrits", "Statut", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {activites.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{a.titre}</td>
                    <td className="px-4 py-3 text-gray-500">{a.sport ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{a.date_activite}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{a.heure_debut?.slice(0, 5)} – {a.heure_fin?.slice(0, 5)}</td>
                    <td className="px-4 py-3 text-gray-500">{a.lieu ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-500 text-center">{a.capacite_max}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-semibold ${a.inscriptions >= a.capacite_max ? "text-red-600" : "text-green-700"}`}>
                        {a.inscriptions}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleActif(a.id, a.actif)}
                        className={`rounded-full px-2 py-0.5 text-xs font-medium transition ${
                          a.actif ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {a.actif ? "Actif" : "Inactif"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-medium transition"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style jsx>{`
        .input-admin {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 8px 12px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s;
        }
        .input-admin:focus { border-color: #474194; }
      `}</style>
    </div>
  );
}
