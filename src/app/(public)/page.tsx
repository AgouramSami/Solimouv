"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import InstallPwaButton from "@/components/InstallPwaButton";

const FESTIVAL_DATE = new Date("2026-09-19T09:00:00");

function useCountdown(target: Date) {
  const calc = () => {
    const ms = target.getTime() - Date.now();
    if (ms <= 0) return { days: 0, hours: 0 };
    return {
      days: Math.floor(ms / 86400000),
      hours: Math.floor((ms % 86400000) / 3600000),
    };
  };
  const [diff, setDiff] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setDiff(calc()), 60000);
    return () => clearInterval(id);
  }, []);
  return diff;
}

const FEATURED = [
  { sport: "Danse", duration: "30 min", lieu: "Salle B", tags: ["Danse", "Femmes"] },
  { sport: "Natation", duration: "120 min", lieu: "Piscine", tags: ["Natation", "Jeunes"] },
  { sport: "Yoga", duration: "60 min", lieu: "Salle A", tags: ["Yoga", "Senior"] },
];

const TAG_BG: Record<string, string> = {
  Danse: "bg-[#474194]",
  Natation: "bg-[#474194]",
  Yoga: "bg-[#474194]",
  Femmes: "bg-[#d81d61]",
  Jeunes: "bg-[#2e7e33]",
  Senior: "bg-[#2e7e33]",
};

export default function PublicHomePage() {
  const { days, hours } = useCountdown(FESTIVAL_DATE);

  return (
    <div className="bg-white">
      {/* Greeting */}
      <div className="px-4 pt-6 pb-2">
        <h1 className="font-heading text-[22px] font-bold text-[#1a1b19]">
          Bienvenue&nbsp;!
        </h1>
        <p className="text-[16px] text-[#1a1b19]" style={{ fontFamily: "Author, sans-serif" }}>
          Découvrez le festival du sport inclusif.
        </p>
      </div>

      {/* Hero card — violet */}
      <div className="mx-4 mt-4 overflow-hidden rounded-[32px] bg-[#474194] px-6 py-8 text-white relative">
        {/* Decorative circle */}
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white opacity-10"
          aria-hidden
        />

        <div className="text-center space-y-4">
          {/* Festival label */}
          <p className="text-[34px] leading-none" style={{ fontFamily: "Author, sans-serif" }}>
            Le festival
          </p>

          {/* Logo */}
          <img
            src="/figma-assets/logo.png"
            alt="Solimouv'"
            className="mx-auto h-10 w-auto brightness-0 invert"
          />

          <p className="text-[16px] opacity-80 max-w-[240px] mx-auto leading-snug" style={{ fontFamily: "Author, sans-serif" }}>
            Le sport pour toutes et tous, sans exception.
          </p>

          {/* Countdown */}
          <div className="space-y-2">
            <p className="text-[16px] opacity-80" style={{ fontFamily: "Author, sans-serif" }}>
              Ça approche, plus que&nbsp;:
            </p>
            <div className="flex justify-center gap-4">
              <div className="flex flex-col items-center rounded-2xl bg-white px-6 py-3 min-w-[100px]">
                <span className="font-heading text-[32px] font-bold text-[#474194] leading-none">{days}</span>
                <span className="text-[14px] text-[#474194] mt-0.5" style={{ fontFamily: "Author, sans-serif" }}>Jours</span>
              </div>
              <div className="flex flex-col items-center rounded-2xl bg-white px-6 py-3 min-w-[100px]">
                <span className="font-heading text-[32px] font-bold text-[#474194] leading-none">{hours}</span>
                <span className="text-[14px] text-[#474194] mt-0.5" style={{ fontFamily: "Author, sans-serif" }}>Heures</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3 pt-2">
            <Link
              href="/auth/login"
              className="block w-full rounded-full bg-[#050505] py-4 text-center text-[17px] text-white transition active:scale-95"
              style={{ fontFamily: "Author, sans-serif" }}
            >
              Trouve ton sport
            </Link>
            <Link
              href="/programme"
              className="block text-center text-[16px] text-white underline underline-offset-4 opacity-80 hover:opacity-100"
              style={{ fontFamily: "Author, sans-serif" }}
            >
              Découvrir le programme
            </Link>
          </div>
        </div>
      </div>

      {/* Green section — Rejoindre */}
      <div className="mt-4 bg-[#2e7e33] px-4 py-8 text-white">
        <h2 className="font-heading text-[28px] font-bold text-center">
          Rejoignez le festival&nbsp;!
        </h2>
        <p className="mt-2 text-[16px] text-center opacity-80" style={{ fontFamily: "Author, sans-serif" }}>
          Créez votre compte gratuitement et accédez au programme personnalisé.
        </p>

        {/* Activités inscriptions visuelles */}
        <div className="mt-6 space-y-3">
          {[
            { time: "10h30", title: "Crossfit", lieu: "Salle B · 30 min" },
            { time: "15h30", title: "Box", lieu: "Gymnase C · 30 min" },
          ].map((a) => (
            <div
              key={a.title}
              className="flex items-center gap-4 rounded-2xl bg-white/15 px-4 py-3"
            >
              <span className="shrink-0 rounded-xl bg-[#d81d61] px-3 py-1 text-[14px] font-semibold text-white">
                {a.time}
              </span>
              <div>
                <p className="font-heading text-[16px] font-bold">{a.title}</p>
                <p className="text-[14px] opacity-70" style={{ fontFamily: "Author, sans-serif" }}>{a.lieu}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-white/40 px-4 py-4">
            <Link
              href="/auth/login"
              className="text-[15px] text-white underline underline-offset-2"
              style={{ fontFamily: "Author, sans-serif" }}
            >
              + Créer mon compte pour m&apos;inscrire
            </Link>
          </div>
        </div>
      </div>

      {/* Pour vous — activités à découvrir */}
      <div className="px-4 py-8">
        <h2 className="font-heading text-[28px] font-bold text-[#050505]">Pour vous</h2>
        <p className="mt-1 text-[16px] text-[#050505] opacity-80" style={{ fontFamily: "Author, sans-serif" }}>
          Quelques activités qui pourraient vous correspondre
        </p>

        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {FEATURED.map((act) => (
            <div
              key={act.sport}
              className="shrink-0 w-44 rounded-2xl border border-[#95989a] bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap gap-1 mb-3">
                {act.tags.map((t) => (
                  <span
                    key={t}
                    className={`${TAG_BG[t] ?? "bg-[#474194]"} rounded-xl px-2 py-0.5 text-[12px] text-white`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="font-heading text-[17px] font-bold text-[#050505]">{act.sport}</p>
              <p className="text-[13px] text-[#40433e] mt-0.5" style={{ fontFamily: "Author, sans-serif" }}>
                {act.duration} · {act.lieu}
              </p>
              <Link
                href="/auth/login"
                className="mt-3 block w-full rounded-full bg-[#050505] py-2 text-center text-[13px] text-white"
              >
                Rejoindre
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Install PWA CTA */}
      <div className="bg-[#1f74bb] px-4 py-8 text-white text-center">
        <p className="font-heading text-[22px] font-bold mb-2">Installez l&apos;app</p>
        <p className="text-[15px] opacity-80 mb-5" style={{ fontFamily: "Author, sans-serif" }}>
          Programme en temps réel, badges, notifications push.
        </p>
        <div className="flex flex-col items-center gap-3">
          <InstallPwaButton />
          <Link href="/auth/login" className="text-sm text-white/70 underline underline-offset-2">
            Déjà inscrit·e ? Se connecter
          </Link>
        </div>
      </div>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: "Solimouv' — Festival du sport pour tous",
            description: "Festival du sport inclusif organisé par Up Sport! à Paris.",
            organizer: { "@type": "Organization", name: "Up Sport!" },
            location: {
              "@type": "Place",
              name: "Centre Sportif Charles Moureu",
              address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
            },
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
          }),
        }}
      />
    </div>
  );
}
