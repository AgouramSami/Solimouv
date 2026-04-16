import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez Up Sport!, l'association sportive parisienne qui œuvre pour l'inclusion, et le festival Solimouv' qu'elle organise.",
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
    <div className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">

        {/* Up Sport! */}
        <section aria-labelledby="upsport-title">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
            L&apos;association
          </p>
          <h1 id="upsport-title" className="section-title mt-2">
            Up Sport! — L&apos;inclusion en mouvement
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-600">
            Fondée en 2016 à Paris, Up Sport! rend le sport accessible à toutes et tous,
            quels que soient le genre, l&apos;origine sociale ou géographique, le parcours de vie.
            L&apos;association accompagne en moyenne{" "}
            <strong>250 personnes par semaine</strong> à travers une trentaine de séances
            hebdomadaires.
          </p>

          {/* 4 valeurs */}
          <h2 className="mt-12 text-xl font-bold text-brand-dark">Nos valeurs</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2" role="list">
            {valeurs.map((v) => (
              <li key={v.mot} className="card border-l-4 border-brand-primary">
                <p className="font-bold text-brand-dark">{v.mot}</p>
                <p className="mt-1 text-sm text-gray-600">{v.desc}</p>
              </li>
            ))}
          </ul>

          {/* 4 programmes */}
          <h2 className="mt-12 text-xl font-bold text-brand-dark">
            4 programmes structurants
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2" role="list">
            {programmes.map((p) => (
              <li key={p.titre} className="card">
                <p className="font-semibold text-brand-dark">{p.titre}</p>
                <p className="mt-1 text-sm text-gray-600">{p.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Solimouv' */}
        <section className="mt-20" aria-labelledby="solimouv-title">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
            Le festival
          </p>
          <h2 id="solimouv-title" className="section-title mt-2">
            Solimouv&apos; — Le sport pour tous
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-gray-600">
            Solimouv&apos; est le festival du sport pour tous, organisé par Up Sport! et un collectif
            d&apos;associations parisiennes. La 1ère édition (12 juillet 2025, Centre Sportif
            Charles Moureu) a rassemblé plus de <strong>500 participants</strong>,{" "}
            <strong>13 associations</strong> partenaires et une quarantaine de bénévoles.
          </p>

          <div className="mt-8 rounded-2xl bg-brand-dark p-8 text-white">
            <h3 className="text-lg font-bold text-brand-primary">
              Chiffres de l&apos;édition 1
            </h3>
            <ul className="mt-4 space-y-2 text-gray-300" role="list">
              <li>✓ 92% des participants souhaitent revenir l&apos;année prochaine</li>
              <li>✓ 85% ont découvert de nouvelles activités ou associations</li>
              <li>✓ 78% se sont sentis renforcés dans leur sentiment d&apos;inclusion</li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-16 flex flex-wrap gap-4">
          <Link href="/programme" className="btn-primary">
            Voir le programme
          </Link>
          <Link href="/associations" className="btn-secondary">
            Les associations partenaires
          </Link>
        </div>
      </div>
    </div>
  );
}
