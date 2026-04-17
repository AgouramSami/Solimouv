import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos — Solimouv'",
  description: "Découvrez Up Sport!, l'association sportive parisienne qui œuvre pour l'inclusion, et le festival Solimouv'.",
};

const valeurs = [
  { mot: "Solidarité", desc: "Agir ensemble pour un sport accessible à toutes et tous." },
  { mot: "Mixité", desc: "Croiser les genres, origines, parcours et générations." },
  { mot: "Citoyenneté", desc: "Le sport comme vecteur d'engagement et de lien social." },
  { mot: "Bienveillance", desc: "Un espace sans jugement, ouvert à tous les niveaux." },
];

const programmes = [
  { titre: "Public exilé", desc: "Accompagnement des personnes réfugiées par le sport." },
  { titre: "Public féminin", desc: "Séances dédiées pour lever les freins à la pratique féminine." },
  { titre: "Activité physique adaptée", desc: "Sport adapté aux personnes en situation de handicap ou fragilité." },
  { titre: "Insertion professionnelle", desc: "Le sport comme outil de confiance et de réinsertion." },
];

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#474194] px-5 pt-10 pb-8 text-white">
        <img src="/figma-assets/logo.png" alt="Solimouv'" className="mx-auto h-6 w-auto brightness-0 invert mb-6" />
        <h1 className="font-heading text-2xl font-bold">À propos</h1>
        <p className="mt-1 text-sm text-white/70">Up Sport! &amp; Solimouv&apos;</p>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Up Sport! */}
        <section>
          <h2 className="font-heading text-xl font-bold text-[#050505] mb-2">Up Sport! — L&apos;inclusion en mouvement</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Fondée en 2016 à Paris, Up Sport! rend le sport accessible à toutes et tous,
            quels que soient le genre, l&apos;origine sociale ou géographique, le parcours de vie.
            L&apos;association accompagne en moyenne <strong>250 personnes par semaine</strong> à travers
            une trentaine de séances hebdomadaires.
          </p>
        </section>

        {/* Valeurs */}
        <section>
          <h3 className="font-heading text-lg font-bold text-[#050505] mb-3">Nos valeurs</h3>
          <div className="grid grid-cols-2 gap-3">
            {valeurs.map((v) => (
              <div key={v.mot} className="rounded-2xl border-l-4 border-[#474194] bg-[#474194]/5 p-4">
                <p className="font-semibold text-[#050505] text-sm">{v.mot}</p>
                <p className="mt-1 text-xs text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Programmes */}
        <section>
          <h3 className="font-heading text-lg font-bold text-[#050505] mb-3">4 programmes structurants</h3>
          <div className="space-y-3">
            {programmes.map((p) => (
              <div key={p.titre} className="rounded-2xl bg-gray-50 p-4">
                <p className="font-semibold text-[#050505] text-sm">{p.titre}</p>
                <p className="mt-0.5 text-xs text-gray-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Solimouv' stats */}
        <section className="rounded-2xl bg-[#474194] p-5 text-white">
          <h3 className="font-heading text-lg font-bold mb-3">Solimouv&apos; — Édition 1</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>✓ 500+ participants · 13 associations partenaires</li>
            <li>✓ 92% souhaitent revenir l&apos;année prochaine</li>
            <li>✓ 78% se sont sentis renforcés dans leur sentiment d&apos;inclusion</li>
          </ul>
        </section>

        {/* CTAs */}
        <div className="flex gap-3">
          <Link href="/home"
            className="flex-1 rounded-full bg-[#474194] py-3 text-center text-sm font-semibold text-white transition active:scale-95">
            Voir le programme
          </Link>
          <Link href="/associations"
            className="flex-1 rounded-full border border-[#474194] py-3 text-center text-sm font-semibold text-[#474194] transition active:scale-95">
            Les associations
          </Link>
        </div>
      </div>
    </div>
  );
}
