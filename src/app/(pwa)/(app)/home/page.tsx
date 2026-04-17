"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Search, SlidersHorizontal } from "lucide-react";

const TAG_BG: Record<string, string> = {
  Yoga: "bg-[#474194]",
  Tennis: "bg-[#474194]",
  Rugby: "bg-[#474194]",
  Danse: "bg-[#474194]",
  Natation: "bg-[#474194]",
  Vélo: "bg-[#474194]",
  Boxe: "bg-[#474194]",
  Crossfit: "bg-[#474194]",
  "Débutant.e": "bg-[#1f74bb]",
  "Avancé.e": "bg-[#1f74bb]",
  Intermédiaire: "bg-[#1f74bb]",
  Senior: "bg-[#2e7e33]",
  Jeunes: "bg-[#2e7e33]",
  "Espace safe": "bg-[#d81d61]",
  Famille: "bg-[#d81d61]",
  Femmes: "bg-[#d81d61]",
};

type Activity = {
  time: string | null;
  title: string;
  subtitle: string;
  duration: string;
  tags: string[];
  spots: number | null;
  full: boolean;
};

const ACTIVITIES: Activity[] = [
  { time: "10h00", title: "Yoga inclusif", subtitle: "À confirmer · Salle B", duration: "60 min", tags: ["Yoga", "Débutant.e", "Senior"], spots: 2, full: false },
  { time: null, title: "Tennis", subtitle: "Court 3 · Terrain", duration: "90 min", tags: ["Tennis", "Avancé.e", "Espace safe"], spots: 0, full: true },
  { time: "10h30", title: "Crossfit", subtitle: "À confirmer · Salle A", duration: "30 min", tags: ["Crossfit", "Débutant.e", "Senior"], spots: null, full: false },
  { time: null, title: "Rugby", subtitle: "Terrain principal", duration: "60 min", tags: ["Rugby", "Débutant.e", "Famille"], spots: 4, full: false },
  { time: "11h30", title: "Zumba", subtitle: "Salle de danse", duration: "30 min", tags: ["Danse", "Femmes", "Senior"], spots: 0, full: true },
  { time: "12h30", title: "Natation", subtitle: "Piscine municipale", duration: "120 min", tags: ["Natation", "Espace safe", "Jeunes"], spots: 2, full: false },
  { time: null, title: "Vélo", subtitle: "Piste cyclable", duration: "120 min", tags: ["Vélo", "Intermédiaire", "Jeunes"], spots: 1, full: false },
  { time: "15h30", title: "Box", subtitle: "Gymnase C", duration: "30 min", tags: ["Boxe", "Famille", "Avancé.e"], spots: 0, full: true },
];

function Tag({ label }: { label: string }) {
  const bg = TAG_BG[label] ?? "bg-[#474194]";
  return (
    <span className={`${bg} rounded-2xl px-2 py-1 text-[15px] text-white leading-none whitespace-nowrap`}>
      {label}
    </span>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div>
      {activity.time && (
        <p className="mb-2 text-[18px] text-[#050505]" style={{ fontFamily: "Author, sans-serif" }}>
          {activity.time}
        </p>
      )}
      <div className="relative rounded-2xl border border-[#cdcdcd] bg-white p-4 shadow-[0px_2px_1px_rgba(0,0,0,0.05)]">
        {/* Urgency badge */}
        {!activity.full && activity.spots !== null && activity.spots > 0 && (
          <div
            className="absolute -top-2 right-4 rotate-[8.63deg] rounded-lg bg-[#ffe7e8] px-2 py-0.5 text-[14px] text-[#c11720]"
            style={{ fontFamily: "Author, sans-serif" }}
          >
            {activity.spots === 1 ? "1 place restante !" : `${activity.spots} places restantes !`}
          </div>
        )}

        {/* Tags row + duration */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex flex-wrap gap-1.5">
            {activity.tags.map((t) => <Tag key={t} label={t} />)}
          </div>
          <span
            className="shrink-0 text-[18px] font-bold text-[#050505]"
            style={{ fontFamily: "Author, sans-serif" }}
          >
            {activity.duration}
          </span>
        </div>

        {/* Title + CTA */}
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="font-heading text-[22px] font-bold text-[#050505]">{activity.title}</p>
            <p className="text-[16px] text-[#40433e]" style={{ fontFamily: "Author, sans-serif" }}>
              {activity.subtitle}
            </p>
          </div>
          <button
            className={`shrink-0 rounded-full px-5 py-3 text-[17px] font-medium transition active:scale-95 ${
              activity.full
                ? "bg-[#dbdbdb] text-[#606060] cursor-default"
                : "bg-[#050505] text-white hover:bg-[#2a2a2a]"
            }`}
            style={{ fontFamily: "Author, sans-serif" }}
            disabled={activity.full}
          >
            {activity.full ? "Complet" : "Rejoindre"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PwaHomePage() {
  const [prenom, setPrenom] = useState<string>("");

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data: { user } }) => {
        if (!user) return;
        const meta = user.user_metadata ?? {};
        const p =
          meta.prenom ??
          (meta.full_name ?? meta.name ?? "").trim().split(" ")[0] ??
          user.email?.split("@")[0] ??
          "";
        setPrenom(p);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white pb-28">
      {/* Logo */}
      <div className="flex justify-center pt-12 pb-6">
        <img src="/figma-assets/logo.png" alt="Solimouv'" className="h-6 w-auto" />
      </div>

      <div className="px-4 space-y-4">
        {/* Badge gamification card */}
        <div className="relative overflow-hidden rounded-2xl bg-[#2e7e33] p-4 text-white">
          <p className="text-[16px] opacity-80" style={{ fontFamily: "Author, sans-serif" }}>
            Gagne ton prochain badge{prenom ? `, ${prenom}` : ""}
          </p>
          <p className="font-heading text-[20px] font-bold mt-1">Encore 2 inscriptions !</p>
          <div className="mt-3 h-3 rounded-full bg-[#83c787] overflow-hidden">
            <div className="h-full rounded-full bg-white" style={{ width: "33%" }} />
          </div>
          {/* Decorative circle */}
          <div
            className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-20 bg-white"
            aria-hidden
          />
        </div>

        {/* Search + Filter */}
        <div className="flex gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-full bg-black/10 px-4 py-2.5">
            <Search className="h-5 w-5 shrink-0 text-[#40433e]" strokeWidth={1.8} />
            <span className="text-[14px] text-[#40433e]" style={{ fontFamily: "Author, sans-serif" }}>
              Recherche un sport
            </span>
          </div>
          <button
            aria-label="Filtrer"
            className="flex h-11 w-12 shrink-0 items-center justify-center rounded-full bg-black/10 transition hover:bg-black/15"
          >
            <SlidersHorizontal className="h-5 w-5 text-[#40433e]" strokeWidth={1.8} />
          </button>
        </div>

        {/* Activity cards */}
        <div className="space-y-8 pt-2">
          {ACTIVITIES.map((act, i) => (
            <ActivityCard key={i} activity={act} />
          ))}
        </div>
      </div>
    </div>
  );
}
