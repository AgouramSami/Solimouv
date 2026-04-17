import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Programme & Ateliers",
  description:
    "Découvrez le programme des ateliers sportifs et de sensibilisation du festival Solimouv'. Initiations, premiers secours, stands associatifs.",
};

// Brand Content : remplacer par le vrai programme
const ateliers = [
  {
    id: 1,
    heure: "10h00",
    titre: "Initiation football fauteuil",
    association: "À confirmer",
    lieu: "Terrain A",
    public: "Tout public",
    duree: "45 min",
    tag: "Handisport",
  },
  {
    id: 2,
    heure: "10h30",
    titre: "Yoga inclusif",
    association: "À confirmer",
    lieu: "Salle B",
    public: "Seniors, débutants",
    duree: "60 min",
    tag: "Bien-être",
  },
  {
    id: 3,
    heure: "11h00",
    titre: "Boxe féminine",
    association: "À confirmer",
    lieu: "Terrain C",
    public: "Public féminin",
    duree: "45 min",
    tag: "Combat",
  },
  {
    id: 4,
    heure: "11h30",
    titre: "Premiers secours",
    association: "À confirmer",
    lieu: "Stand D",
    public: "Tout public",
    duree: "30 min",
    tag: "Sensibilisation",
  },
  {
    id: 5,
    heure: "14h00",
    titre: "Basketball adapté",
    association: "À confirmer",
    lieu: "Terrain A",
    public: "Handicap moteur",
    duree: "45 min",
    tag: "Handisport",
  },
  {
    id: 6,
    heure: "15h00",
    titre: "Danse collective",
    association: "À confirmer",
    lieu: "Salle B",
    public: "Tout public",
    duree: "60 min",
    tag: "Danse",
  },
];

const tagColors: Record<string, string> = {
  Handisport: "bg-blue-100 text-blue-800",
  "Bien-être": "bg-green-100 text-green-800",
  Combat: "bg-red-100 text-red-800",
  Sensibilisation: "bg-purple-100 text-purple-800",
  Danse: "bg-pink-100 text-pink-800",
};

export default function ProgrammePage() {
  return (
    <div className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
          Programme
        </p>
        <h1 className="section-title mt-2">Ateliers & Activités</h1>
        <p className="mt-4 max-w-2xl text-gray-600">
          Une journée de sport, de rencontres et de découvertes. Tous les ateliers sont
          gratuits et ouverts à tous les niveaux.
        </p>

        {/* Note Brand Content */}
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          📅 Programme de l&apos;édition 2 à venir. En attendant, retrouvez les informations
          sur{" "}
          <a
            href="https://www.unispourlesport.paris/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-amber-900"
          >
            unispourlesport.paris
          </a>
        </div>

        {/* Liste ateliers */}
        <section className="mt-10" aria-label="Liste des ateliers">
          <ul className="space-y-4" role="list">
            {ateliers.map((atelier) => (
              <li key={atelier.id} className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                {/* Heure */}
                <div className="flex-shrink-0 text-center">
                  <time
                    dateTime={atelier.heure}
                    className="text-2xl font-black text-brand-primary"
                  >
                    {atelier.heure}
                  </time>
                </div>

                {/* Infos */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-bold text-brand-dark">{atelier.titre}</h2>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        tagColors[atelier.tag] ?? "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {atelier.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {atelier.association} · {atelier.lieu} · {atelier.duree}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    Public : {atelier.public}
                  </p>
                </div>

                {/* Action */}
                <div className="flex-shrink-0">
                  <Link
                    href="/contact"
                    className="rounded-full border border-brand-primary px-4 py-1.5 text-sm font-medium text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
                  >
                    En savoir +
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA inscription */}
        <div className="mt-16 rounded-2xl bg-brand-primary p-8 text-center text-white">
          <h2 className="text-2xl font-bold">Vous souhaitez participer ?</h2>
          <p className="mt-2 text-white/80">
            Tous les ateliers sont gratuits et ouverts à tous. Contactez-nous pour plus d&apos;infos.
          </p>
          <Link href="/contact" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-brand-primary transition-all hover:bg-brand-light">
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
