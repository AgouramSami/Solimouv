import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import InscriptionButton from "@/components/InscriptionButton";

export const metadata: Metadata = {
  title: "Programme — Solimouv'",
  description: "Découvrez toutes les activités du festival Solimouv' le 6 juin 2026 au Centre Sportif Charles Moureu, Paris.",
};

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
  description: string | null;
};

const SPORT_COLORS: Record<string, string> = {
  Yoga:      "bg-[#e8f5e9] text-[#2e7e33]",
  Crossfit:  "bg-[#fff3e0] text-[#e65100]",
  Danse:     "bg-[#fce4ec] text-[#c2185b]",
  Basket:    "bg-[#e3f2fd] text-[#1565c0]",
  Boxe:      "bg-[#f3e5f5] text-[#7b1fa2]",
  Natation:  "bg-[#e0f7fa] text-[#00838f]",
  Rugby:     "bg-[#fff8e1] text-[#f57f17]",
  Badminton: "bg-[#e8eaf6] text-[#3949ab]",
  Tennis:    "bg-[#f1f8e9] text-[#558b2f]",
  Vélo:      "bg-[#fafafa] text-[#424242]",
};

const NIVEAU_LABEL: Record<string, string> = {
  calme:         "Débutant",
  intermediaire: "Intermédiaire",
  avance:        "Avancé",
};

function fmtHeure(t: string) {
  return t?.slice(0, 5).replace(":", "h");
}

function placesLabel(inscriptions: number, max: number) {
  const dispo = max - inscriptions;
  if (dispo <= 0) return { text: "Complet", cls: "text-red-600 bg-red-50" };
  if (dispo <= 3) return { text: `${dispo} place${dispo > 1 ? "s" : ""}`, cls: "text-orange-600 bg-orange-50" };
  return { text: `${dispo} places`, cls: "text-[#2e7e33] bg-[#e8f5e9]" };
}

export default async function ProgrammePage() {
  const supabase = await createClient();
  const { data: activites } = await supabase
    .from("activites")
    .select("*")
    .eq("actif", true)
    .order("heure_debut", { ascending: true });

  const list = (activites as Activite[]) ?? [];

  // Group by time slot (heure_debut)
  const byHeure: Record<string, Activite[]> = {};
  for (const a of list) {
    const key = a.heure_debut?.slice(0, 5) ?? "?";
    if (!byHeure[key]) byHeure[key] = [];
    byHeure[key].push(a);
  }
  const heures = Object.keys(byHeure).sort();

  return (
    <div className="min-h-screen bg-[#F5F4F2]">
      {/* Header violet */}
      <div className="bg-[#474194] px-5 pt-10 pb-8 text-white md:px-12 md:pt-14 md:pb-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-medium text-white/60 mb-2 uppercase tracking-widest">Festival Solimouv&apos;</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight">Programme du 6 juin 2026</h1>
          <p className="mt-2 text-white/70 text-sm md:text-base">
            📍 Centre Sportif Charles Moureu, Paris — {list.length} activité{list.length !== 1 ? "s" : ""} au programme
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 md:px-6 md:py-10 space-y-8">
        {list.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <p className="text-4xl mb-4">🗓️</p>
            <p className="font-heading text-xl font-bold text-[#050505]">Programme à venir</p>
            <p className="mt-2 text-sm text-gray-500">Les activités seront annoncées prochainement. Revenez bientôt !</p>
          </div>
        ) : (
          <>
            {heures.map((heure) => (
              <div key={heure}>
                {/* Time label */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-lg font-bold text-[#474194] font-heading">{heure.replace(":", "h")}</span>
                  <div className="flex-1 h-px bg-[#474194]/15" />
                </div>

                {/* Activity cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {byHeure[heure].map((a) => {
                    const colorCls = SPORT_COLORS[a.sport ?? ""] ?? "bg-gray-100 text-gray-600";
                    const places = placesLabel(a.inscriptions ?? 0, a.capacite_max);
                    return (
                      <div
                        key={a.id}
                        className="rounded-2xl bg-white shadow-sm border border-black/5 p-5 flex flex-col gap-3 hover:shadow-md transition"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-heading font-bold text-[#050505] text-base leading-tight">{a.titre}</h3>
                          {a.sport && (
                            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${colorCls}`}>
                              {a.sport}
                            </span>
                          )}
                        </div>

                        {a.description && (
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{a.description}</p>
                        )}

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            🕐 {fmtHeure(a.heure_debut)} – {fmtHeure(a.heure_fin)}
                          </span>
                          {a.lieu && (
                            <span className="flex items-center gap-1">📍 {a.lieu}</span>
                          )}
                          {a.niveau && (
                            <span className="flex items-center gap-1">
                              🎯 {NIVEAU_LABEL[a.niveau] ?? a.niveau}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                          <span className={`text-xs font-semibold rounded-full px-2.5 py-1 ${places.cls}`}>
                            {places.text}
                          </span>
                          <InscriptionButton
                            activiteId={a.id}
                            titre={a.titre}
                            placesDisponibles={a.capacite_max - (a.inscriptions ?? 0)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Footer CTA */}
            <div className="rounded-3xl bg-[#474194] p-8 text-center text-white">
              <p className="font-heading text-xl font-bold mb-2">Prêt à participer ?</p>
              <p className="text-sm text-white/70 mb-5">Faites le quiz et découvrez les activités qui vous correspondent.</p>
              <Link
                href="/quiz"
                className="inline-block rounded-full bg-white text-[#474194] font-semibold text-sm px-8 py-3 hover:bg-white/90 transition"
              >
                Trouve ton sport
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
