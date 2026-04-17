import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Associations partenaires",
  description:
    "Découvrez les associations partenaires du festival Solimouv' qui œuvrent pour le sport inclusif à Paris.",
};

// Brand Content / DA : à compléter avec les vraies associations
const associations = [
  {
    nom: "Up Sport!",
    description:
      "Fondée en 2016, Up Sport! œuvre auprès de personnes en situation de vulnérabilité sociale pour rendre le sport accessible à tous.",
    site: "https://www.unispourlesport.paris/",
    instagram: "https://www.instagram.com/unispourlesport/",
    tags: ["Exilés", "Féminin", "APA", "Insertion"],
  },
  // Associations partenaires — Brand Content : à compléter avec les 12 autres associations de l'édition 1
  {
    nom: "Association partenaire 2",
    description: "Description à compléter par le Brand Content.",
    site: "#",
    instagram: "#",
    tags: ["Sport collectif"],
  },
  {
    nom: "Association partenaire 3",
    description: "Description à compléter par le Brand Content.",
    site: "#",
    instagram: "#",
    tags: ["Handisport"],
  },
];

export default function AssociationsPage() {
  return (
    <div className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
          Partenaires
        </p>
        <h1 className="section-title mt-2">Les associations du réseau Solimouv&apos;</h1>
        <p className="mt-4 max-w-2xl text-gray-600">
          Solimouv&apos; c&apos;est un collectif d&apos;associations parisiennes engagées pour un sport
          ouvert à tous. Retrouvez ici celles qui font le festival.
        </p>

        <ul
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {associations.map((asso) => (
            <li key={asso.nom} className="card flex flex-col gap-4">
              {/* Logo placeholder — DA : remplacer par les vrais logos */}
              <div
                className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-light text-2xl font-black text-brand-primary"
                aria-hidden="true"
              >
                {asso.nom.charAt(0)}
              </div>

              <div className="flex-1">
                <h2 className="font-bold text-brand-dark">{asso.nom}</h2>
                <p className="mt-1 text-sm text-gray-600">{asso.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {asso.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-brand-light px-2 py-0.5 text-xs font-medium text-brand-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 border-t border-gray-100 pt-3">
                {asso.site !== "#" && (
                  <a
                    href={asso.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-brand-primary hover:underline"
                  >
                    Site web ↗
                  </a>
                )}
                {asso.instagram !== "#" && (
                  <a
                    href={asso.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-500 hover:text-brand-primary"
                  >
                    Instagram ↗
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Rejoindre */}
        <div className="mt-16 rounded-2xl bg-brand-light p-8">
          <h2 className="text-xl font-bold text-brand-dark">
            Vous êtes une association sportive ?
          </h2>
          <p className="mt-2 text-gray-600">
            Rejoignez le réseau Solimouv&apos; et participez à la prochaine édition du festival.
          </p>
          <Link href="/contact" className="btn-primary mt-6 inline-flex">
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
