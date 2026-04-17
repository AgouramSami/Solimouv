"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Association = {
  id: string;
  nom: string;
  description: string | null;
  site_url: string | null;
  logo_url: string | null;
  tags: string[] | null;
  actif: boolean;
  ordre: number;
};

const TAGS_OPTIONS = ["handicap", "jeunesse", "senior", "lgbtqia", "réfugiés", "sport-collectif", "bien-être", "danse", "inclusion"];

const EMPTY_FORM = {
  nom: "",
  description: "",
  site_url: "",
  logo_url: "",
  tags: [] as string[],
  actif: true,
  ordre: 0,
};

export default function PartenariatsPage() {
  const supabase = createClient();
  const [associations, setAssociations] = useState<Association[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("associations")
      .select("*")
      .order("ordre", { ascending: true });
    setAssociations((data as Association[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function toggleTag(tag: string) {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const { error: err } = await supabase.from("associations").insert(form);
    if (err) { setError(err.message); setSaving(false); return; }
    setForm(EMPTY_FORM);
    setShowForm(false);
    setSaving(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce partenaire ?")) return;
    await supabase.from("associations").delete().eq("id", id);
    load();
  }

  async function toggleActif(id: string, current: boolean) {
    await supabase.from("associations").update({ actif: !current }).eq("id", id);
    load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partenariats</h1>
          <p className="text-sm text-gray-500 mt-1">{associations.length} association(s) partenaire(s)</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-[#474194] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3a3578] transition"
        >
          {showForm ? "Annuler" : "+ Nouveau partenaire"}
        </button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <form onSubmit={handleCreate} className="mb-6 rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
          <h2 className="mb-4 font-semibold text-gray-800">Nouveau partenaire</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Nom de l&apos;association *</label>
              <input required className="input-admin" placeholder="Ex: HandiSport Paris" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
              <textarea rows={2} className="input-admin resize-none" placeholder="Présentation courte…" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Site web</label>
              <input type="url" className="input-admin" placeholder="https://…" value={form.site_url} onChange={(e) => setForm({ ...form, site_url: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">URL logo</label>
              <input type="url" className="input-admin" placeholder="https://…/logo.png" value={form.logo_url} onChange={(e) => setForm({ ...form, logo_url: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Ordre d&apos;affichage</label>
              <input type="number" min="0" className="input-admin" value={form.ordre} onChange={(e) => setForm({ ...form, ordre: Number(e.target.value) })} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {TAGS_OPTIONS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      form.tags.includes(tag)
                        ? "bg-[#474194] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <div className="mt-4">
            <button type="submit" disabled={saving} className="rounded-xl bg-[#2e7e33] px-4 py-2 text-sm font-semibold text-white hover:bg-[#256328] disabled:opacity-50 transition">
              {saving ? "Enregistrement…" : "Créer le partenaire"}
            </button>
          </div>
        </form>
      )}

      {/* Grille partenaires */}
      {loading ? (
        <div className="text-center py-12 text-gray-400 text-sm">Chargement…</div>
      ) : associations.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-sm">Aucun partenaire. Ajoutez-en un ci-dessus.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {associations.map((a) => (
            <div key={a.id} className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {a.logo_url ? (
                    <img src={a.logo_url} alt={a.nom} className="h-10 w-10 rounded-lg object-contain" />
                  ) : (
                    <div className="h-10 w-10 rounded-lg bg-[#474194]/10 flex items-center justify-center text-[#474194] font-bold text-sm">
                      {a.nom[0]}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{a.nom}</p>
                    {a.site_url && (
                      <a href={a.site_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline">
                        Site web →
                      </a>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => toggleActif(a.id, a.actif)}
                  className={`rounded-full px-2 py-0.5 text-xs font-medium transition shrink-0 ${
                    a.actif ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {a.actif ? "Actif" : "Inactif"}
                </button>
              </div>

              {a.description && (
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{a.description}</p>
              )}

              {a.tags && a.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {a.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[#474194]/10 text-[#474194] px-2 py-0.5 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={() => handleDelete(a.id)}
                className="text-xs text-red-400 hover:text-red-600 transition"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}

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
