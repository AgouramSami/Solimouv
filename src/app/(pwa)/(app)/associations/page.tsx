import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Associations partenaires — Solimouv'",
  description: "Découvrez les associations partenaires du festival Solimouv' qui œuvrent pour le sport inclusif à Paris.",
};

const associations = [
  {
    nom: "Up Sport!",
    description: "Fondée en 2016, Up Sport! œuvre auprès de personnes en situation de vulnérabilité sociale pour rendre le sport accessible à tous.",
    site: "https://www.unispourlesport.paris/",
    instagram: "https://www.instagram.com/unispourlesport/",
    tags: ["Exilés", "Féminin", "APA", "Insertion"],
  },
  {
    nom: "Association partenaire 2",
    description: "Description à compléter par le Brand Content.",
    site: "",
    instagram: "",
    tags: ["Sport collectif"],
  },
  {
    nom: "Association partenaire 3",
    description: "Description à compléter par le Brand Content.",
    site: "",
    instagram: "",
    tags: ["Handisport"],
  },
];

export default function AssociationsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#474194] px-5 pt-10 pb-8 text-white">
        <img src="/figma-assets/logo.png" alt="Solimouv'" className="mx-auto h-6 w-auto brightness-0 invert mb-6" />
        <h1 className="font-heading text-2xl font-bold">Associations partenaires</h1>
        <p className="mt-1 text-sm text-white/70">Le réseau qui fait Solimouv&apos;</p>
      </div>

      <div className="px-4 py-6 space-y-4">
        {associations.map((asso) => (
          <div key={asso.nom} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#474194]/10 text-xl font-black text-[#474194]">
                {asso.nom.charAt(0)}
              </div>
              <h2 className="font-heading text-lg font-bold text-[#050505]">{asso.nom}</h2>
            </div>

            <p className="text-sm text-gray-600 mb-3">{asso.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {asso.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-[#474194]/10 px-2 py-0.5 text-xs font-medium text-[#474194]">
                  {tag}
                </span>
              ))}
            </div>

            {(asso.site || asso.instagram) && (
              <div className="flex gap-3 border-t border-gray-100 pt-3">
                {asso.site && (
                  <a href={asso.site} target="_blank" rel="noopener noreferrer"
                    className="text-sm font-medium text-[#474194] hover:underline">
                    Site web ↗
                  </a>
                )}
                {asso.instagram && (
                  <a href={asso.instagram} target="_blank" rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-500 hover:text-[#474194]">
                    Instagram ↗
                  </a>
                )}
              </div>
            )}
          </div>
        ))}

        {/* CTA rejoindre */}
        <div className="rounded-2xl bg-[#2e7e33] p-5 text-white">
          <h2 className="font-heading text-lg font-bold">Vous êtes une association ?</h2>
          <p className="mt-1 text-sm text-white/80">Rejoignez le réseau Solimouv&apos; pour la prochaine édition.</p>
          <Link href="/contact"
            className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#2e7e33] transition active:scale-95">
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
