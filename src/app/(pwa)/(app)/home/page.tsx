"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

// ─── Countdown (live, updates every second) ───────────────────────────────────
const FESTIVAL = new Date("2026-06-06T09:00:00");
function diffParts(t: Date) {
  const ms = Math.max(0, t.getTime() - Date.now());
  return {
    days:    Math.floor(ms / 86_400_000),
    hours:   Math.floor((ms % 86_400_000) / 3_600_000),
    minutes: Math.floor((ms % 3_600_000)  / 60_000),
    seconds: Math.floor((ms % 60_000)     / 1000),
  };
}
function useCountdown() {
  const [p, setP] = useState(diffParts(FESTIVAL));
  useEffect(() => {
    setP(diffParts(FESTIVAL));
    const id = setInterval(() => setP(diffParts(FESTIVAL)), 1000);
    return () => clearInterval(id);
  }, []);
  return p;
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Activite = {
  id: string;
  titre: string;
  lieu: string | null;
  heure_debut: string | null;
  heure_fin: string | null;
  sport: string | null;
};

function formatHeure(h: string | null): string {
  if (!h) return "";
  // "10:30:00" → "10h30"
  const [hh, mm] = h.split(":");
  return `${parseInt(hh)}h${mm}`;
}

function formatDuree(debut: string | null, fin: string | null): string {
  if (!debut || !fin) return "";
  const [h1, m1] = debut.split(":").map(Number);
  const [h2, m2] = fin.split(":").map(Number);
  const mins = (h2 * 60 + m2) - (h1 * 60 + m1);
  if (mins <= 0) return "";
  return mins >= 60 ? `${Math.floor(mins / 60)}h${mins % 60 > 0 ? mins % 60 : ""}` : `${mins} min`;
}

// ─── Sport sticker mobile (47×50, pink bg + bowling) ─────────────────────────
function SportSticker() {
  return (
    <div className="relative shrink-0" style={{ width: 47, height: 50 }}>
      <div className="absolute inset-0 bg-[#d81d61] rounded-[16px]" />
      <div className="absolute overflow-clip" style={{ top: 1.94, left: 0.57, width: 46, height: 46 }}>
        <div className="absolute flex items-center justify-center" style={{ inset: "0 4.65% 26.85% -0.01%", containerType: "size" }}>
          <div className="relative flex-none -rotate-45" style={{ height: "hypot(50cqw,50cqh)", width: "hypot(50cqw,50cqh)" }}>
            <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/sport-v1.svg" />
          </div>
        </div>
        <div className="absolute" style={{ inset: "0 11.62% 66.46% 3.95%" }}><img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/sport-v2.svg" /></div>
        <div className="absolute" style={{ inset: "15.57% 55.68% 75.1% 28.11%" }}><img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/sport-v3.svg" /></div>
        <div className="absolute" style={{ inset: "17.33% 57.25% 77.46% 35.96%" }}><img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/sport-v4.svg" /></div>
        <div className="absolute" style={{ inset: "15.57% 36.11% 75.1% 47.69%" }}><img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/sport-v5.svg" /></div>
        <div className="absolute" style={{ inset: "17.33% 37.67% 77.46% 55.54%" }}><img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/sport-v6.svg" /></div>
        <div className="absolute" style={{ inset: "26.78% 0 0.01% 62.33%" }}><img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/sport-group.svg" /></div>
      </div>
    </div>
  );
}

// ─── Sport sticker desktop (60×64) ───────────────────────────────────────────
function SportStickerDesktop() {
  return (
    <div className="relative shrink-0" style={{ width: 60, height: 64 }}>
      <div className="absolute inset-0 bg-[#d81d61] rounded-[16px]" />
      <div className="absolute overflow-clip" style={{ top: 2.5, left: 0.73, width: 59, height: 59 }}>
        <div className="absolute flex items-center justify-center" style={{ inset: "0 4.65% 26.85% -0.01%", containerType: "size" }}>
          <div className="relative flex-none -rotate-45" style={{ height: "hypot(50cqw,50cqh)", width: "hypot(50cqw,50cqh)" }}>
            <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/sport-v1.svg" />
          </div>
        </div>
        <div className="absolute" style={{ inset: "0 11.62% 66.46% 3.95%" }}><img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/sport-v2.svg" /></div>
        <div className="absolute" style={{ inset: "15.57% 55.68% 75.1% 28.11%" }}><img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/sport-v3.svg" /></div>
        <div className="absolute" style={{ inset: "17.33% 57.25% 77.46% 35.96%" }}><img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/sport-v4.svg" /></div>
        <div className="absolute" style={{ inset: "15.57% 36.11% 75.1% 47.69%" }}><img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/sport-v5.svg" /></div>
        <div className="absolute" style={{ inset: "17.33% 37.67% 77.46% 55.54%" }}><img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/sport-v6.svg" /></div>
        <div className="absolute" style={{ inset: "26.78% 0 0.01% 62.33%" }}><img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/sport-group.svg" /></div>
      </div>
    </div>
  );
}


// ─── Desktop countdown tile (109×64, white, violet text) ─────────────────────
function DesktopCountTile({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-white border border-white rounded-[16px] flex flex-col items-start"
      style={{ minWidth: 109, height: 64, padding: "12px 15px" }}>
      <div className="flex items-end gap-0 text-[#474194] whitespace-nowrap">
        <span className="font-heading font-bold tabular-nums" style={{ fontSize: 36, lineHeight: "40px" }}>
          {String(value).padStart(2, "0")}
        </span>
        <span className="font-body text-center" style={{ fontSize: 16, lineHeight: "24px" }}>
          {label}
        </span>
      </div>
    </div>
  );
}

// ─── Mobile countdown tile (compact, 2-up) ───────────────────────────────────
function MobileCountTile({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-white rounded-[14px]" style={{ padding: "10px 14px" }}>
      <div className="flex items-end gap-0 text-[#474194] whitespace-nowrap">
        <span className="font-heading font-bold tabular-nums" style={{ fontSize: 30, lineHeight: "34px" }}>
          {String(value).padStart(2, "0")}
        </span>
        <span className="font-body" style={{ fontSize: 14, lineHeight: "22px" }}>{label}</span>
      </div>
    </div>
  );
}

// ─── Desktop activity row (inscriptions) ─────────────────────────────────────
function DesktopActivityRow({ time, name, room, duration, hasBadge }: {
  time: string; name: string; room: string; duration: string; hasBadge?: boolean;
}) {
  return (
    <div className="flex items-start">
      <div className="relative shrink-0" style={{ width: 32, height: 31, marginTop: 38 }}>
        <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/check-bullet.svg" />
      </div>
      <div className="relative bg-white border border-[#cdcdcd] rounded-[16px] shadow-[0px_2px_1px_0px_rgba(0,0,0,0.05)] overflow-hidden"
        style={{ marginLeft: 18, flex: 1, minHeight: 108 }}>
        <div className="absolute flex items-start justify-between"
          style={{ left: 20, top: 24, right: 20, height: 60 }}>
          <div>
            <div className="flex items-end gap-2 text-[#050505]">
              <span className="font-heading font-bold" style={{ fontSize: 24, lineHeight: "30px" }}>{time}</span>
              <span className="font-body" style={{ fontSize: 20, lineHeight: "30px" }}>{name}</span>
            </div>
            <p className="font-body text-[#050505]" style={{ fontSize: 18, lineHeight: "30px" }}>{room}</p>
          </div>
          <span className="font-body font-bold text-black whitespace-nowrap" style={{ fontSize: 20, lineHeight: "30px" }}>{duration}</span>
        </div>
        {hasBadge && (
          <div className="absolute flex items-center justify-center"
            style={{ inset: "60.28% -4.32% -13.18% 82.31%", containerType: "size" }}>
            <div className="relative flex-none"
              style={{ height: "hypot(69.4cqh,10.6cqw)", width: "hypot(89.4cqw,30.6cqh)", transform: "rotate(12.86deg)" }}>
              <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/card-badge.svg" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Desktop "Pour vous" card ─────────────────────────────────────────────────
function PourVousCard({ name, duration, room }: { name: string; duration: string; room: string }) {
  return (
    <div className="bg-white border border-[#95989a] rounded-[16px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.05)] flex flex-col items-center"
      style={{ width: 162, height: 165, padding: "12px 11px" }}>
      <div className="flex flex-col items-center text-center flex-1">
        <span className="font-heading font-bold text-[#050505]" style={{ fontSize: 22, lineHeight: "26px" }}>{name}</span>
        <span className="font-body font-bold text-black" style={{ fontSize: 18, lineHeight: "22px" }}>{duration}</span>
        <span className="font-body text-[#050505]" style={{ fontSize: 16, lineHeight: "22px" }}>{room}</span>
      </div>
      <div className="bg-[#050505] rounded-full flex items-center justify-center w-full" style={{ height: 52 }}>
        <span className="font-body text-white" style={{ fontSize: 18 }}>Rejoindre</span>
      </div>
    </div>
  );
}

// ─── Mobile reco card ─────────────────────────────────────────────────────────
function RecoCard({ name, duration, room }: { name: string; duration: string; room: string }) {
  return (
    <div className="bg-white border border-[#95989a] rounded-[16px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.05)] shrink-0 w-[162px] px-[11px] py-[12px] flex flex-col gap-[16px]">
      <div className="flex flex-col items-center text-center mx-auto">
        <span className="font-heading font-bold text-[24px] text-[#050505]">{name}</span>
        <span className="font-body font-bold text-[20px] text-black">{duration}</span>
        <span className="font-body text-[18px] text-[#050505]">{room}</span>
      </div>
      <Link href="/home#programme" className="bg-[#050505] rounded-full h-[52px] flex items-center justify-center w-full">
        <span className="font-body text-[20px] text-white">Rejoindre</span>
      </Link>
    </div>
  );
}

// ─── Mobile activity row ──────────────────────────────────────────────────────
function ActivityRow({ time, name, room, duration, hasBadge }: {
  time: string; name: string; room: string; duration: string; hasBadge?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="relative shrink-0 mt-8" style={{ width: 26, height: 26 }}>
        <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/check-bullet.svg" />
      </div>
      <div className="relative bg-white border border-[#cdcdcd] rounded-[16px] shadow-[0px_2px_1px_0px_rgba(0,0,0,0.05)] flex-1 px-[17px] py-[20px] overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex gap-2 items-end">
              <span className="font-heading text-[24px] font-bold text-[#050505]">{time}</span>
              <span className="font-body text-[20px] text-[#050505]">{name}</span>
            </div>
            <p className="font-body text-[18px] text-[#050505]">{room}</p>
          </div>
          <span className="font-body font-bold text-[20px] text-black whitespace-nowrap">{duration}</span>
        </div>
        {hasBadge && (
          <div className="absolute flex items-center justify-center"
            style={{ inset: "60.28% -4.32% -13.18% 82.31%", containerType: "size" }}>
            <div className="relative flex-none"
              style={{ height: "hypot(69.4cqh,10.6cqw)", width: "hypot(89.4cqw,30.6cqh)", transform: "rotate(12.86deg)" }}>
              <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/card-badge.svg" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Static fallbacks ─────────────────────────────────────────────────────────
const FALLBACK_INSCRIPTIONS: Activite[] = [
  { id: "1", titre: "Crossfit", lieu: "Salle B", heure_debut: "10:30:00", heure_fin: "11:00:00", sport: "Crossfit" },
  { id: "2", titre: "Box", lieu: "Gymnase C", heure_debut: "15:30:00", heure_fin: "16:00:00", sport: "Boxe" },
];
const FALLBACK_RECO: Activite[] = [
  { id: "a", titre: "Danse", lieu: "Salle B", heure_debut: "09:00:00", heure_fin: "09:30:00", sport: "Danse" },
  { id: "b", titre: "Natation", lieu: "Piscine", heure_debut: "11:30:00", heure_fin: "13:30:00", sport: "Natation" },
  { id: "c", titre: "Yoga", lieu: "Salle C", heure_debut: "14:00:00", heure_fin: "15:00:00", sport: "Yoga" },
  { id: "d", titre: "Tennis", lieu: "Court 2", heure_debut: "18:00:00", heure_fin: "19:15:00", sport: "Tennis" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { days, hours, minutes, seconds } = useCountdown();
  const [prenom, setPrenom] = useState("");
  const [inscriptions, setInscriptions] = useState<Activite[]>(FALLBACK_INSCRIPTIONS);
  const [recommendations, setRecommendations] = useState<Activite[]>(FALLBACK_RECO);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;

      // Prénom
      const m = user.user_metadata ?? {};
      setPrenom(m.prenom ?? (m.full_name ?? m.name ?? "").trim().split(" ")[0] ?? user.email?.split("@")[0] ?? "");

      // Mes inscriptions (2 premières)
      const { data: inscs } = await supabase
        .from("inscriptions")
        .select("activite_id, activites(id, titre, lieu, heure_debut, heure_fin, sport)")
        .eq("user_id", user.id)
        .limit(2);
      if (inscs && inscs.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const acts = (inscs as any[]).map((i) => i.activites).filter(Boolean) as Activite[];
        if (acts.length > 0) setInscriptions(acts);
      }

      // Recommandations (4 activités actives)
      const { data: acts } = await supabase
        .from("activites")
        .select("id, titre, lieu, heure_debut, heure_fin, sport")
        .eq("actif", true)
        .limit(4);
      if (acts && acts.length > 0) setRecommendations(acts as Activite[]);
    });
  }, []);

  return (
    <div className="min-h-screen bg-white md:bg-[#faf9f5]">

      {/* ══════════════════════════════════════════════════════
          DESKTOP — Figma 392-4403
      ══════════════════════════════════════════════════════ */}
      <div className="hidden md:block">
        <div className="max-w-[1280px] mx-auto px-[152px] pt-[56px]">

          {/* Greeting (373×64) */}
          <div id="festival" className="flex items-center" style={{ width: 373 }}>
            <SportStickerDesktop />
            <div className="flex flex-col leading-6 text-[#050505]" style={{ marginLeft: 16, width: 209 }}>
              <span className="font-heading font-bold" style={{ fontSize: 24 }}>
                Bonjour{prenom ? ` ${prenom}` : ""},
              </span>
              <span className="font-body" style={{ fontSize: 18 }}>Bienvenue sur ton espace.</span>
            </div>
            <button className="flex items-center justify-center rounded-full bg-black/10"
              style={{ marginLeft: 45, width: 43, height: 40 }} aria-label="Notifications">
              <img alt="" width={24} height={24} src="/figma-assets/home/bell.svg" />
            </button>
          </div>

          {/* Hero card (979×421, violet) */}
          <div id="programme" className="relative bg-[#474194] mt-16 overflow-visible"
            style={{ width: "100%", height: 421, borderRadius: 32 }}>

            {/* Left badminton deco — exact Figma: x=-45, y=41, w=90.8, h=70 */}
            <div className="absolute" style={{ left: -45, top: 41 }}>
              <img alt="" width={91} height={70} className="block"
                style={{ objectFit: "contain" }}
                src="/figma-assets/home/mascot-sport.svg" />
            </div>

            {/* Left text: Le Festival + logo + description */}
            <div className="absolute flex flex-col" style={{ left: 85, top: 32 }}>
              <p className="font-body text-white" style={{ fontSize: 32, lineHeight: "32px" }}>Le Festival</p>
              <div style={{ marginTop: 8, width: 244, height: 40 }}>
                <img alt="Solimouv'" className="block h-full w-auto" src="/figma-assets/home/logo-white.svg" />
              </div>
              <p className="font-body text-white" style={{ marginTop: 8, width: 244, fontSize: 18, lineHeight: "24px" }}>
                Le sport pour toutes et tous, sans exception.
              </p>
            </div>

            {/* Countdown — 4 tiles live: Jours · Heures · Minutes · Secondes */}
            <div className="absolute" style={{ left: 97.6, top: 204 }}>
              <p className="font-body text-white" style={{ fontSize: 18, lineHeight: "24px" }}>
                Ça approche, plus que :
              </p>
              <div className="flex gap-2 mt-2">
                <DesktopCountTile value={days}  label="Jours"  />
                <DesktopCountTile value={hours} label="Heures" />
              </div>
            </div>

            {/* CTAs */}
            <div className="absolute flex gap-2 items-center" style={{ left: 24, top: 352 }}>
              <Link href="/quiz"
                className="flex items-center justify-center rounded-full bg-[#050505] text-white font-body hover:opacity-90 transition"
                style={{ width: 148, height: 40, fontSize: 18 }}>
                Trouve ton sport
              </Link>
              <Link href="#programme"
                className="flex items-center justify-center rounded-full bg-white text-[#050505] font-body hover:opacity-90 transition"
                style={{ width: 217, height: 40, fontSize: 18 }}>
                Découvrir le programme
              </Link>
            </div>

          </div>

          {/* Two-column section */}
          <div className="flex mt-8" style={{ gap: 36 }}>

            {/* LEFT — Tu es inscrit (478px) */}
            <div className="relative bg-[#2e7e33] flex-shrink-0 overflow-visible"
              style={{ width: 478, minHeight: 532, borderRadius: 32 }}>

              <div className="absolute" style={{ left: 19, top: 41, right: 19 }}>
                <p className="font-heading font-bold text-white text-center" style={{ fontSize: 32, lineHeight: "39px" }}>
                  Tu es inscrit...
                </p>
                <p className="font-body text-white text-center" style={{ fontSize: 18, lineHeight: "24px" }}>
                  Retrouve tes inscriptions
                </p>

                <div className="relative mt-8">
                  {/* Timeline dashed line */}
                  <div className="absolute" style={{
                    left: 15, top: 0, bottom: 80,
                    borderLeft: "1px dashed rgba(255,255,255,0.4)",
                    width: 1,
                  }} />

                  {inscriptions.map((act, i) => (
                    <DesktopActivityRow
                      key={act.id}
                      time={formatHeure(act.heure_debut)}
                      name={act.titre}
                      room={act.lieu ?? ""}
                      duration={formatDuree(act.heure_debut, act.heure_fin)}
                      hasBadge={i === 1}
                    />
                  ))}

                  {/* Add activity button */}
                  <div className="flex items-start" style={{ marginTop: 24 }}>
                    <div className="relative shrink-0" style={{ width: 32, height: 31, marginTop: 24 }}>
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/add-bullet.svg" />
                    </div>
                    <div className="bg-white border border-[#cdcdcd] rounded-[16px] shadow-[0px_2px_1px_0px_rgba(0,0,0,0.05)] flex items-center justify-center"
                      style={{ marginLeft: 18, flex: 1, height: 79 }}>
                      <div className="border border-dashed border-[#95989a] rounded-[16px] flex items-center justify-center px-8 py-2">
                        <span className="font-body text-[#8d8d8d]" style={{ fontSize: 18 }}>Ajouter une activité</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Pour vous (458px) */}
            <div id="pour-vous" style={{ width: 458 }}>
              <div style={{ paddingLeft: 36, paddingTop: 36, paddingRight: 36 }}>
                <h2 className="font-heading font-bold text-[#050505] text-center" style={{ fontSize: 32, lineHeight: "32px" }}>
                  Pour vous
                </h2>
                <p className="font-body text-[#050505] text-center mt-2" style={{ fontSize: 18 }}>
                  On vous propose quelques activités qui vous correspondrais
                </p>
              </div>
              {/* 2×2 grid, cards 162×165 each */}
              <div className="grid grid-cols-2" style={{ marginTop: 57, marginLeft: 57, gap: 15 }}>
                {recommendations.slice(0, 4).map((act) => (
                  <PourVousCard
                    key={act.id}
                    name={act.titre}
                    duration={formatDuree(act.heure_debut, act.heure_fin) || "30 min"}
                    room={act.lieu ?? ""}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={{ height: 80 }} />
        </div>

        {/* Desktop Footer */}
        <footer className="bg-[#1f74bb]">
          <div className="max-w-[1280px] mx-auto px-[48px] py-12 grid grid-cols-4 gap-8">
            <div>
              <div style={{ width: 143, height: 24 }}>
                <img alt="Solimouv'" className="block h-full w-auto" src="/figma-assets/home/logo-footer.svg" />
              </div>
              <p className="text-white/90 mt-4 text-sm" style={{ maxWidth: 200, fontFamily: "Barlow, sans-serif" }}>
                SoliMouv&apos; connecte les motivés de sport autour d&apos;événements sociaux et inclusifs pour toutes et tous.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-base">Navigation</h4>
              <ul className="space-y-3 text-sm" style={{ fontFamily: "Barlow, sans-serif" }}>
                {[["Contactez-nous", "/contact"], ["A l'affiche", "#programme"], ["A Propos", "/a-propos"], ["Associations", "/associations"]].map(([l, h]) => (
                  <li key={l}><a href={h} className="text-white/80 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-base">Légal</h4>
              <ul className="space-y-3 text-sm" style={{ fontFamily: "Barlow, sans-serif" }}>
                <li><Link href="/confidentialite" className="text-white/80 hover:text-white transition-colors">Politique de confidentialité</Link></li>
                <li><Link href="/cgu" className="text-white/80 hover:text-white transition-colors">Conditions d&apos;utilisation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-base">Contact</h4>
              <div className="space-y-4 text-sm" style={{ fontFamily: "Barlow, sans-serif" }}>
                <div>
                  <p className="text-white font-semibold">SoliMouv&apos;</p>
                  <p className="text-white/70">contact@solimouv.fr</p>
                </div>
                <div>
                  <p className="text-white font-semibold">UpSport!</p>
                  <p className="text-white/70">contact@unispourlesport.paris</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* ══════════════════════════════════════════════════════
          MOBILE — Figma 337-12243
      ══════════════════════════════════════════════════════ */}
      <div className="md:hidden">
        {/* Logo */}
        <div className="flex items-center justify-center pt-10 pb-3 px-4">
          <img src="/figma-assets/logo.png" alt="Solimouv'" className="h-6 w-auto" />
        </div>

        {/* Greeting */}
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-[9px]">
            <SportSticker />
            <div className="flex flex-col leading-6 text-[#1a1b19]">
              <span className="font-heading text-[24px] font-bold">Bonjour{prenom ? ` ${prenom}` : ""},</span>
              <span className="font-body text-[18px] whitespace-nowrap">Bienvenue sur ton espace.</span>
            </div>
          </div>
          <button className="bg-black/10 rounded-full w-[43px] h-[43px] flex items-center justify-center shrink-0" aria-label="Notifications">
            <img alt="" width={24} height={24} src="/figma-assets/home/bell.svg" />
          </button>
        </div>

        {/* Hero violet — mascotte droite + 2 tuiles (maquette) */}
        <div className="mx-4 relative" style={{ overflow: "visible" }}>
          {/* Volant gauche — déborde du card */}
          <div className="absolute pointer-events-none z-10" style={{ left: -22, top: 32 }}>
            <img alt="" width={52} height={40} src="/figma-assets/home/mascot-sport.svg" />
          </div>

          <div className="relative bg-[#474194] rounded-[32px] overflow-hidden" style={{ minHeight: 284 }}>
            {/* Contenu gauche */}
            <div className="absolute flex flex-col justify-between" style={{ left: 22, top: 22, right: "44%", bottom: 22 }}>
              <div className="flex flex-col gap-[6px]">
                <p className="font-body text-white" style={{ fontSize: 22, lineHeight: "26px" }}>Le Festival</p>
                <div style={{ height: 30, width: 160 }}>
                  <img alt="Solimouv'" className="block h-full w-auto" src="/figma-assets/home/logo-white.svg" />
                </div>
                <p className="font-body text-white" style={{ fontSize: 13, lineHeight: "18px" }}>
                  Le sport pour toutes et tous, sans exception.
                </p>
              </div>

              <div>
                <p className="font-body text-white mb-[6px]" style={{ fontSize: 13 }}>Ça approche, plus que :</p>
                <div className="flex gap-2">
                  <MobileCountTile value={days}  label="Jours"  />
                  <MobileCountTile value={hours} label="Heures" />
                </div>
              </div>

              <div className="flex flex-col gap-[8px]">
                <Link href="/quiz"
                  className="bg-[#050505] rounded-full flex items-center justify-center font-body text-white"
                  style={{ height: 40, fontSize: 14 }}>
                  Trouve ton sport
                </Link>
                <Link href="#programme"
                  className="bg-white rounded-full flex items-center justify-center font-body text-[#050505]"
                  style={{ height: 40, fontSize: 14 }}>
                  Découvrir le programme
                </Link>
              </div>
            </div>

          </div>

          {/* Volant droit — déborde du card */}
          <div className="absolute pointer-events-none z-10" style={{ right: -22, bottom: 20 }}>
            <img alt="" width={52} height={40} src="/figma-assets/home/mascot-sport.svg"
              style={{ transform: "scaleX(-1)" }} />
          </div>
        </div>

        {/* Green — inscriptions */}
        <section id="programme" className="mt-0">
          <div className="bg-[#2e7e33] px-4 py-[34px] relative overflow-visible">
              <div className="flex flex-col gap-2 mb-7">
              <h2 className="font-heading font-bold text-[32px] leading-8 text-white">Tu es inscrit...</h2>
              <p className="font-body text-[18px] text-white">Retrouve tes inscriptions</p>
            </div>
            <div className="flex flex-col gap-6 relative">
              <div className="absolute left-[12px] top-8 bottom-16 w-px border-l border-dashed border-white/40" />
              {inscriptions.map((act, i) => (
                <ActivityRow
                  key={act.id}
                  time={formatHeure(act.heure_debut)}
                  name={act.titre}
                  room={act.lieu ?? ""}
                  duration={formatDuree(act.heure_debut, act.heure_fin)}
                  hasBadge={i === 1}
                />
              ))}
              <div className="flex items-start justify-between gap-2">
                <div className="relative shrink-0 mt-4" style={{ width: 26, height: 26 }}>
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/add-bullet.svg" />
                </div>
                <div className="bg-white border border-[#cdcdcd] rounded-[16px] shadow-[0px_2px_1px_0px_rgba(0,0,0,0.05)] flex-1 h-[65px] flex items-center justify-center">
                  <div className="border border-dashed border-[#95989a] rounded-[16px] px-10 py-2">
                    <span className="font-body text-[20px] text-[#8d8d8d]">Ajouter une activité</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pour vous */}
        <section id="pour-vous" className="px-4 py-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center">
              <h2 className="font-heading font-bold text-[32px] text-[#050505] text-center">Pour vous</h2>
              <p className="font-body text-[18px] text-[#050505] text-center">
                On vous propose quelques activités<br />qui vous correspondrais
              </p>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4">
              {recommendations.slice(0, 3).map((act) => (
                <RecoCard
                  key={act.id}
                  name={act.titre}
                  duration={formatDuree(act.heure_debut, act.heure_fin) || "30 min"}
                  room={act.lieu ?? ""}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Mobile footer */}
        <footer className="bg-[#1f74bb] mt-4 mx-4 rounded-[32px] mb-4">
          <div className="flex flex-col gap-10 items-center px-5 py-12">
            <div className="h-6 w-[143px]">
              <img alt="Solimouv'" className="block h-full w-full object-contain" src="/figma-assets/home/logo-footer.svg" />
            </div>
            <div className="flex flex-col items-center gap-4 text-[18px] text-white text-center" style={{ fontFamily: "Barlow, sans-serif" }}>
              <Link href="/contact" className="hover:opacity-70 transition-opacity">Contactez-nous</Link>
              <a href="#programme" className="hover:opacity-70 transition-opacity">A l&apos;affiche</a>
              <Link href="/a-propos" className="hover:opacity-70 transition-opacity">A Propos</Link>
              <Link href="/associations" className="hover:opacity-70 transition-opacity">Associations</Link>
            </div>
            <div className="w-full flex flex-col gap-5 items-center">
              <div className="w-full h-px bg-white/30" />
              <div className="flex flex-col gap-3 items-center text-[18px] text-white text-center font-light" style={{ fontFamily: "Barlow, sans-serif" }}>
                <Link href="/confidentialite" className="underline hover:opacity-70">Politique de confidentialité</Link>
                <Link href="/cgu" className="underline hover:opacity-70">Conditions d&apos;utilisation</Link>
              </div>
              <p className="font-light text-[18px] text-white" style={{ fontFamily: "Barlow, sans-serif" }}>© 2026 Up Sport! Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
