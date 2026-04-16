import type { Metadata } from "next";
import Link from "next/link";
import { FestivalMap } from "@/components/map/FestivalMap";
import { FreeBadge } from "@/components/shared/FreeBadge";
import { SafeBadge } from "@/components/shared/SafeBadge";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Solimouv' — Le festival du sport pour tous",
  description:
    "Rejoignez Solimouv', le festival du sport inclusif organisé par Up Sport! à Paris. Initiations, ateliers, rencontres — pour tous, sans exception.",
};

const stats = [
  { value: "500+", label: "participants à l'édition 1" },
  { value: "13", label: "associations partenaires" },
  { value: "92%", label: "souhaitent revenir" },
  { value: "78%", label: "se sentent plus inclus" },
];

const publics = [
  { emoji: "👨‍👩‍👧‍👦", label: "Familles" },
  { emoji: "🧑", label: "Jeunes" },
  { emoji: "👴", label: "Seniors" },
  { emoji: "🌍", label: "Personnes réfugiées" },
  { emoji: "🏳️‍🌈", label: "Communauté LGBTQIA+" },
  { emoji: "♿", label: "Personnes en situation de handicap" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-brand-dark px-4 py-20 text-white md:py-32"
        aria-labelledby="hero-title"
      >
        {/* Fond décoratif — DA : remplacer par une vraie image/vidéo */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 75% 40%, #FF2D9B 0%, transparent 50%), radial-gradient(circle at 25% 70%, #2828FF 0%, transparent 50%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-block rounded-full bg-brand-primary/20 px-4 py-1 text-sm font-semibold text-brand-primary">
            Festival du sport inclusif · Paris
          </p>
          <h1
            id="hero-title"
            className="font-heading text-5xl font-bold leading-tight md:text-7xl"
          >
            Le sport,{" "}
            <span className="text-brand-primary">pour tous.</span>
            <br />
            Sans exception.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
            Solimouv&apos; réunit familles, jeunes, seniors, personnes réfugiées et en
            situation de handicap autour du sport inclusif. Venez découvrir, pratiquer,
            et vous rencontrer.
          </p>

          {/* Date & lieu — Brand Content : à compléter */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              📅 <strong className="text-white">Date à confirmer — Édition 2</strong>
            </span>
            <span className="hidden text-gray-600 sm:block" aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              📍 <strong className="text-white">Centre Sportif Charles Moureu, Paris</strong>
            </span>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <FreeBadge />
            <SafeBadge />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/quiz" className="btn-primary flex items-center gap-2 text-base">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
              Trouve ton sport
            </Link>
            <Link href="/programme" className="btn-secondary text-base">
              Voir le programme
            </Link>
          </div>
          <p className="mt-3 text-sm text-gray-400">Pas besoin de compte pour explorer !</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-blue px-4 py-10" aria-label="Chiffres clés">
        <div className="mx-auto max-w-4xl">
          <ul
            className="grid grid-cols-2 gap-6 text-center text-white md:grid-cols-4"
            role="list"
          >
            {stats.map((stat) => (
              <li key={stat.label}>
                <p className="text-4xl font-black">{stat.value}</p>
                <p className="mt-1 text-sm opacity-90">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Carte interactive */}
      <section className="px-4 py-12 md:py-16 bg-brand-light" aria-labelledby="map-title">
        <div className="mx-auto max-w-5xl">
          <h2 id="map-title" className="section-title text-center mb-2">
            Plan du festival
          </h2>
          <p className="text-center text-gray-500 mb-8">Clique sur une zone pour voir les activités</p>
          <FestivalMap />
        </div>
      </section>

      {/* Pour qui */}
      <section className="px-4 py-16 md:py-24" aria-labelledby="publics-title">
        <div className="mx-auto max-w-5xl text-center">
          <h2 id="publics-title" className="section-title">
            Un festival pour <span className="text-brand-primary">chacun·e</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Solimouv&apos; c&apos;est un espace ouvert, bienveillant et mixte.
            Peu importe qui vous êtes, il y a une place pour vous.
          </p>
          <ul
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3"
            role="list"
          >
            {publics.map((p) => (
              <li
                key={p.label}
                className="card flex flex-col items-center gap-3 text-center"
              >
                <span className="text-3xl" role="img" aria-label={p.label}>
                  {p.emoji}
                </span>
                <span className="text-sm font-medium text-gray-700">{p.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section
        className="bg-brand-light px-4 py-16"
        aria-labelledby="cta-title"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="cta-title" className="section-title">
            Prêt·e à rejoindre le mouvement ?
          </h2>
          <p className="mt-4 text-gray-600">
            Découvrez le programme des ateliers, les associations partenaires et
            comment participer à Solimouv&apos;.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/programme" className="btn-primary">
              Voir le programme
            </Link>
            <Link href="/contact" className="btn-secondary">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Schema.org Event */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: "Solimouv' — Festival du sport pour tous",
            description:
              "Festival du sport inclusif organisé par Up Sport! et un collectif d'associations parisiennes.",
            organizer: {
              "@type": "Organization",
              name: "Up Sport!",
              url: "https://www.unispourlesport.paris/",
            },
            location: {
              "@type": "Place",
              name: "Centre Sportif Charles Moureu",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Paris",
                addressCountry: "FR",
              },
            },
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
          }),
        }}
      />
    </>
  );
}
