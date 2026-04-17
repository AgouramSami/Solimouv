import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Associations partenaires — Solimouv'",
  description: "Découvrez les associations partenaires du festival Solimouv' qui œuvrent pour le sport inclusif à Paris.",
};

type Tag = { label: string; color: string; bg: string };

type Asso = {
  nom: string;
  description: string;
  tags: Tag[];
  site?: string;
};

const TAG: Record<string, Tag> = {
  sport:      { label: "Sport",      color: "white",    bg: "#474194" },
  mixite:     { label: "Mixité",     color: "white",    bg: "#474194" },
  lgbtqia:    { label: "LGBTQIA+",   color: "white",    bg: "#d81d61" },
  course:     { label: "Course",     color: "white",    bg: "#2e7e33" },
  handicape:  { label: "Handicape",  color: "white",    bg: "#1f74bb" },
  pmr:        { label: "PMR",        color: "white",    bg: "#1f74bb" },
  femme:      { label: "Femme",      color: "white",    bg: "#2e7e33" },
  insertion:  { label: "Insertion",  color: "white",    bg: "#474194" },
  apa:        { label: "APA",        color: "white",    bg: "#1f74bb" },
};

const associations: Asso[] = [
  {
    nom: "Sport Pour Tou·tes",
    tags: [TAG.sport, TAG.mixite],
    description: "Collectif militant pour la mixité et l'égalité dans le sport. Propose des entraînements ouverts et non-compétitifs.",
  },
  {
    nom: "FièreSport",
    tags: [TAG.lgbtqia, TAG.course],
    description: "Association sportive queer promouvant l'inclusion par le sport. Organise des événements sportifs fédérateurs.",
  },
  {
    nom: "Handi'Sport 93",
    tags: [TAG.handicape, TAG.pmr],
    description: "Sport adapté pour les personnes en situation de handicap. Encadrement par des professionnel·les formé·es.",
  },
  {
    nom: "BoxHer",
    tags: [TAG.lgbtqia, TAG.femme],
    description: "Self-défense et boxe dans un cadre féministe et safe. Réservé aux femmes et personnes non-binaires.",
  },
  {
    nom: "Up Sport!",
    tags: [TAG.insertion, TAG.apa],
    description: "Fondée en 2016, Up Sport! rend le sport accessible à toutes et tous, quels que soient le genre ou l'origine sociale.",
    site: "https://www.unispourlesport.paris/",
  },
];

export default function AssociationsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Header ── */}
      <div className="px-5 pt-10 pb-6 text-center border-b border-gray-100">
        <img src="/figma-assets/logo.png" alt="Solimouv'" className="mx-auto h-8 w-auto mb-1" />
      </div>

      <div className="px-4 py-6">
        <h1 className="font-heading text-2xl font-bold text-[#050505] text-center mb-6">
          Nos assos partenaire
        </h1>

        {/* ── Grid ── */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {associations.map((asso) => (
            <div key={asso.nom}
              className="rounded-3xl border border-gray-200 bg-white p-4 flex flex-col gap-3 shadow-sm">

              {/* Nom */}
              <h2 className="font-heading text-[15px] font-bold text-[#050505] text-center leading-tight">
                {asso.nom}
              </h2>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 justify-center">
                {asso.tags.map((t) => (
                  <span
                    key={t.label}
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                    style={{ background: t.bg, color: t.color }}
                  >
                    {t.label}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="font-body text-[12px] text-gray-500 leading-relaxed text-center flex-1">
                {asso.description}
              </p>

              {/* CTA */}
              <Link
                href={asso.site ?? "/contact"}
                target={asso.site ? "_blank" : undefined}
                rel={asso.site ? "noopener noreferrer" : undefined}
                className="w-full rounded-full bg-[#050505] py-2.5 text-center font-body text-[13px] font-semibold text-white transition active:scale-95 hover:opacity-90"
              >
                Rejoindre
              </Link>
            </div>
          ))}

          {/* Bloc "vous êtes une asso ?" */}
          <div className="rounded-3xl bg-[#474194]/8 border border-[#474194]/20 p-4 flex flex-col items-center justify-center gap-3 text-center">
            <p className="font-heading text-[14px] font-bold text-[#474194]">
              Vous êtes une asso&nbsp;?
            </p>
            <p className="font-body text-[11px] text-gray-500">
              Rejoignez Solimouv&apos; pour la prochaine édition.
            </p>
            <Link
              href="/contact"
              className="w-full rounded-full border border-[#474194] py-2.5 text-center font-body text-[12px] font-semibold text-[#474194] transition active:scale-95"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
