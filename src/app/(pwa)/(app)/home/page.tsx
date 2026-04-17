"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

// ─── Countdown ────────────────────────────────────────────────────────────────
const FESTIVAL = new Date("2026-06-06T09:00:00");
function diffParts(t: Date) {
  const ms = Math.max(0, t.getTime() - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms % 86_400_000) / 3_600_000),
    minutes: Math.floor((ms % 3_600_000) / 60_000),
    seconds: Math.floor((ms % 60_000) / 1000),
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

// ─── Sport sticker (bowling — Figma vectors) ──────────────────────────────────
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

// ─── Desktop sport sticker (slightly larger, 60×64) ───────────────────────────
function SportStickerDesktop() {
  return (
    <div className="relative shrink-0" style={{ width: 60, height: 64 }}>
      <div className="absolute inset-0 bg-[#d81d61] rounded-[16px]" />
      <div className="absolute overflow-clip" style={{ top: 2.4, left: 0.7, width: 59, height: 59 }}>
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

// ─── Green triangle mascot (hero right side) — inline SVG from Figma 403:5665 ─
function MascotTriangle() {
  return (
    <svg viewBox="0 0 424 358" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* Main triangle body */}
      <polygon points="0,358 130,0 424,280" fill="#b9d135" />
      {/* Left eye — cream oval */}
      <ellipse cx="188" cy="212" rx="44.5" ry="67" fill="#e8e8d0" />
      {/* Left pupil — red circle */}
      <circle cx="182" cy="241" r="25.4" fill="#c11720" />
      {/* Right eye — cream oval */}
      <ellipse cx="313" cy="184" rx="44.5" ry="67" fill="#e8e8d0" />
      {/* Right pupil — red circle */}
      <circle cx="307" cy="211" r="25.4" fill="#c11720" />
    </svg>
  );
}

// ─── Badminton shuttlecock deco — using existing asset ────────────────────────
function BadmintonDeco({ width, height, rotate = 0 }: { width: number; height: number; rotate?: number }) {
  return (
    <div style={{ width, height, transform: `rotate(${rotate}deg)`, overflow: "visible" }}>
      <img alt="" className="block size-full object-contain" src="/figma-assets/home/mascot-sport.svg" />
    </div>
  );
}

// ─── Mobile countdown tile ────────────────────────────────────────────────────
function CountTile({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex-1 bg-white rounded-[16px] px-[15px] py-[12px]">
      <div className="flex items-end gap-0 text-[#474194]">
        <span className="font-heading text-[36px] font-bold leading-[40px] tabular-nums">{String(value).padStart(2, "0")}</span>
        <span className="font-body text-[16px] leading-6">{label}</span>
      </div>
    </div>
  );
}

// ─── Desktop countdown tile — exact Figma (109×64, white card, violet text) ──
function DesktopCountTile({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-white border border-white rounded-[16px] flex flex-col items-start"
      style={{ width: 109, height: 64, padding: "12px 15px" }}>
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

// ─── Desktop activity row (inscriptions) ─────────────────────────────────────
function DesktopActivityRow({ time, name, room, duration, hasBadge }: {
  time: string; name: string; room: string; duration: string; hasBadge?: boolean;
}) {
  return (
    <div className="flex items-start" style={{ gap: 0 }}>
      {/* Check bullet */}
      <div className="relative shrink-0" style={{ width: 32, height: 31, marginTop: 38 }}>
        <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/check-bullet.svg" />
      </div>
      {/* Activity card */}
      <div className="relative bg-white border border-[#cdcdcd] rounded-[16px] shadow-[0px_2px_1px_0px_rgba(0,0,0,0.05)] overflow-hidden"
        style={{ marginLeft: 50, width: 389, height: 108 }}>
        <div className="absolute flex items-start justify-between"
          style={{ left: 20.65, top: 24.29, width: 347.38, height: 60 }}>
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

// ─── Desktop "Pour vous" card (162×164) ──────────────────────────────────────
function PourVousCard({ name, duration, room }: { name: string; duration: string; room: string }) {
  return (
    <div className="bg-white border border-[#95989a] rounded-[16px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.05)] flex flex-col items-start"
      style={{ width: 162.35, height: 164.58, padding: "12px 11px" }}>
      <div className="flex flex-col items-center text-center mx-auto" style={{ width: 101 }}>
        <span className="font-heading font-bold text-[#050505]" style={{ fontSize: 24, lineHeight: "24px" }}>{name}</span>
        <span className="font-body font-bold text-black" style={{ fontSize: 20, lineHeight: "24px" }}>{duration}</span>
        <span className="font-body text-[#050505]" style={{ fontSize: 18, lineHeight: "24px" }}>{room}</span>
      </div>
      <div className="bg-[#050505] rounded-full flex items-center justify-center w-full mt-auto"
        style={{ height: 52 }}>
        <span className="font-body text-white" style={{ fontSize: 20, lineHeight: "24px" }}>Rejoindre</span>
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { days, hours } = useCountdown();
  const [prenom, setPrenom] = useState("");

  useEffect(() => {
    createClient().auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      const m = user.user_metadata ?? {};
      setPrenom(m.prenom ?? (m.full_name ?? m.name ?? "").trim().split(" ")[0] ?? user.email?.split("@")[0] ?? "");
    });
  }, []);

  return (
    <div className="min-h-screen bg-white md:bg-[#faf9f5]">

      {/* ══════════════════════════════════════════════════════
          DESKTOP LAYOUT — Figma 392-4403 (hidden on mobile)
      ══════════════════════════════════════════════════════ */}
      <div className="hidden md:block">
        {/* Content container: 1280px max-width, 152px side padding */}
        <div className="max-w-[1280px] mx-auto px-[152px] pt-[56px]">

          {/* ── Greeting row (373×64) ── */}
          <div id="festival" className="flex items-center" style={{ width: 373 }}>
            <SportStickerDesktop />
            <div className="flex flex-col leading-6 text-[#050505]" style={{ marginLeft: 16, width: 209 }}>
              <span className="font-heading font-bold" style={{ fontSize: 24 }}>
                Bonjour{prenom ? ` ${prenom}` : ""},
              </span>
              <span className="font-body" style={{ fontSize: 18 }}>Bienvenue sur ton espace.</span>
            </div>
            <button
              className="flex items-center justify-center rounded-full bg-black/10"
              style={{ marginLeft: 45, width: 43, height: 40 }}
              aria-label="Notifications"
            >
              <img alt="" style={{ width: 24, height: 24 }} src="/figma-assets/home/bell.svg" />
            </button>
          </div>

          {/* ── Hero card (979×421, #474194) ── */}
          <div
            id="programme"
            className="relative bg-[#474194] overflow-visible mt-16"
            style={{ width: "100%", height: 421, borderRadius: 32 }}
          >
            {/* Left badminton deco — overflows left edge */}
            <div className="absolute overflow-hidden" style={{ left: -45, top: 41, width: 90.8, height: 70 }}>
              <img alt="" className="block size-full object-contain" src="/figma-assets/home/mascot-sport.svg" />
            </div>

            {/* Text content — left side */}
            <div className="absolute flex flex-col" style={{ left: 85, top: 32 }}>
              {/* Title */}
              <p className="font-body text-white" style={{ fontSize: 32, lineHeight: "32px" }}>Le Festival</p>
              {/* White logo */}
              <div style={{ marginTop: 8, width: 244, height: 40 }}>
                <img alt="Solimouv'" className="block h-full w-auto" src="/figma-assets/home/logo-white.svg" />
              </div>
              {/* Description */}
              <p className="font-body text-white" style={{ marginTop: 8, width: 244, fontSize: 18, lineHeight: "24px" }}>
                Le sport pour toutes et tous, sans exception.
              </p>
            </div>

            {/* Countdown — positioned at hero y=204 */}
            <div className="absolute" style={{ left: 97.6, top: 204 }}>
              <p className="font-body text-white text-center" style={{ fontSize: 18, lineHeight: "24px" }}>
                Ça approche, plus que :
              </p>
              <div className="flex gap-2 mt-2">
                <DesktopCountTile value={days} label="Jours" />
                <DesktopCountTile value={hours} label="Heures" />
              </div>
            </div>

            {/* CTA buttons — hero y=335 */}
            <div className="absolute flex gap-2 items-center" style={{ left: 24, top: 335 }}>
              <Link
                href="/quiz"
                className="flex items-center justify-center rounded-full bg-[#050505] text-white font-body hover:opacity-90 transition"
                style={{ width: 148, height: 40, fontSize: 18 }}
              >
                Trouve ton sport
              </Link>
              <Link
                href="#programme"
                className="flex items-center justify-center rounded-full bg-white text-[#050505] font-body hover:opacity-90 transition"
                style={{ width: 217, height: 40, fontSize: 18 }}
              >
                Découvrir le programme
              </Link>
            </div>

            {/* Mascot triangle — right side (x=472, y=64, 424×358) */}
            <div className="absolute overflow-hidden" style={{ left: 472, top: 0, width: 507, height: 421, borderRadius: "0 32px 32px 0" }}>
              <div style={{ position: "absolute", left: 0, top: 64, width: 424, height: 358 }}>
                <MascotTriangle />
              </div>
            </div>
          </div>

          {/* ── Two-column section (32px below hero) ── */}
          <div className="flex mt-8" style={{ gap: 36 }}>

            {/* Left: Tu es inscrit (478px wide, 532px tall) */}
            <div
              className="relative bg-[#2e7e33] flex-shrink-0 overflow-visible"
              style={{ width: 478, minHeight: 532, borderRadius: 32 }}
            >
              {/* Mascot sport deco — overflows top */}
              <div className="absolute overflow-hidden pointer-events-none"
                style={{ left: 10, top: -111, width: 160, height: 142 }}>
                <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/mascot-sport.svg" />
              </div>

              {/* Content */}
              <div className="absolute" style={{ left: 19.4, top: 41.3, width: 439 }}>
                {/* Heading */}
                <div style={{ width: "100%", marginBottom: 0 }}>
                  <p className="font-heading font-bold text-white text-center" style={{ fontSize: 32, lineHeight: "39px", width: "100%" }}>
                    Tu es inscrit...
                  </p>
                  <p className="font-body text-white text-center" style={{ fontSize: 18, lineHeight: "24px" }}>
                    Retrouve tes inscriptions
                  </p>
                </div>

                {/* Activity rows with timeline */}
                <div className="relative mt-8">
                  {/* Timeline line */}
                  <div className="absolute" style={{ left: 15.3, top: 163.94, width: 0.65, height: 288, borderLeft: "1px dashed rgba(255,255,255,0.4)" }} />

                  <DesktopActivityRow time="10h30" name="Crossfit" room="Salle B" duration="30 min" />
                  <DesktopActivityRow time="15h30" name="Box" room="Gymnase C" duration="30 min" hasBadge />

                  {/* Add activity button */}
                  <div className="flex items-start" style={{ marginTop: 24 }}>
                    <div className="relative shrink-0" style={{ width: 32, height: 31, marginTop: 23 }}>
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/add-bullet.svg" />
                    </div>
                    <div
                      className="bg-white border border-[#cdcdcd] rounded-[16px] shadow-[0px_2px_1px_0px_rgba(0,0,0,0.05)] flex items-center justify-center"
                      style={{ marginLeft: 50, width: 389, height: 79 }}
                    >
                      <div className="border border-dashed border-[#95989a] rounded-[16px] flex items-center justify-center px-16 py-2">
                        <span className="font-body text-[#8d8d8d]" style={{ fontSize: 20 }}>Ajouter une activité</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Pour vous (458px wide, 532px tall) */}
            <div id="pour-vous" style={{ width: 458 }}>
              {/* Header */}
              <div style={{ paddingLeft: 36, paddingTop: 36, paddingRight: 36 }}>
                <h2 className="font-heading font-bold text-[#050505] text-center" style={{ fontSize: 32, lineHeight: "32px", width: 386 }}>
                  Pour vous
                </h2>
                <p className="font-body text-[#050505] text-center mt-2" style={{ fontSize: 18, width: 386 }}>
                  On vous propose quelques activités qui vous correspondrais
                </p>
              </div>

              {/* 2×2 grid of activity cards (343×343 at x=57.5, y=129) */}
              <div
                className="grid grid-cols-2"
                style={{ marginTop: 57, marginLeft: 57.5, width: 343, height: 343, gap: 15 }}
              >
                <PourVousCard name="Danse" duration="30 min" room="Salle B" />
                <PourVousCard name="Danse" duration="30 min" room="Salle B" />
                <PourVousCard name="Natation" duration="120 min" room="Piscine" />
                <PourVousCard name="Natation" duration="120 min" room="Piscine" />
              </div>
            </div>
          </div>

          {/* Spacer before footer */}
          <div style={{ height: 80 }} />
        </div>

        {/* ── Desktop Footer (full width, #1f74bb) ── */}
        <footer className="bg-[#1f74bb]" style={{ width: "100%", minHeight: 352 }}>
          <div className="max-w-[1280px] mx-auto px-[48px] py-12 grid grid-cols-4 gap-8">
            {/* Col 1: Logo + description */}
            <div>
              <div style={{ width: 143, height: 24 }}>
                <img alt="Solimouv'" className="block h-full w-auto" src="/figma-assets/home/logo-footer.svg" />
              </div>
              <p className="text-white/90 mt-4" style={{ fontSize: 14, lineHeight: "20px", maxWidth: 200, fontFamily: "Barlow, sans-serif" }}>
                SoliMouv&apos; connecte les motivés de sport autour d&apos;événements sociaux et inclusifs pour toutes et tous.
              </p>
            </div>
            {/* Col 2: Navigation */}
            <div>
              <h4 className="text-white font-bold mb-4" style={{ fontSize: 16 }}>Navigation</h4>
              <ul className="space-y-3" style={{ fontFamily: "Barlow, sans-serif", fontSize: 14 }}>
                {["Contactez-nous", "A l'affiche", "Faire un Don", "Prochainement", "A Propos"].map((l) => (
                  <li key={l}><a href="#" className="text-white/80 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            {/* Col 3: Légal */}
            <div>
              <h4 className="text-white font-bold mb-4" style={{ fontSize: 16 }}>Légal</h4>
              <ul className="space-y-3" style={{ fontFamily: "Barlow, sans-serif", fontSize: 14 }}>
                <li><Link href="/confidentialite" className="text-white/80 hover:text-white transition-colors">Politiques de confidentialité</Link></li>
                <li><Link href="/cgu" className="text-white/80 hover:text-white transition-colors">Conditions d&apos;utilisation</Link></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Paramètres des cookies</a></li>
              </ul>
            </div>
            {/* Col 4: Contact */}
            <div>
              <h4 className="text-white font-bold mb-4" style={{ fontSize: 16 }}>Contact</h4>
              <div className="space-y-4" style={{ fontFamily: "Barlow, sans-serif", fontSize: 14 }}>
                <div>
                  <p className="text-white font-semibold">SoliMouv&apos;</p>
                  <p className="text-white/70">unikspourlesport@yahoo.fr</p>
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
          MOBILE LAYOUT — Figma 337-12243 (hidden on desktop)
      ══════════════════════════════════════════════════════ */}
      <div className="md:hidden">
        {/* Mobile logo */}
        <div className="flex items-center justify-center pt-10 pb-3 px-4">
          <img src="/figma-assets/logo.png" alt="Solimouv'" className="h-6 w-auto" />
        </div>

        {/* Mobile greeting + bell */}
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-[9px]">
            <SportSticker />
            <div className="flex flex-col leading-6 text-[#1a1b19]">
              <span className="font-heading text-[24px] font-bold">Bonjour{prenom ? ` ${prenom}` : ""},</span>
              <span className="font-body text-[18px] whitespace-nowrap">Bienvenue sur ton espace.</span>
            </div>
          </div>
          <button className="bg-black/10 rounded-full w-[43px] h-[43px] flex items-center justify-center shrink-0" aria-label="Notifications">
            <img alt="" className="size-6" src="/figma-assets/home/bell.svg" />
          </button>
        </div>

        {/* Mobile hero violet */}
        <div className="mx-4">
          <div className="relative bg-[#474194] rounded-[32px] overflow-hidden flex flex-col items-center gap-9 pt-[22px] pb-[22px] px-4">
            <div className="absolute" style={{ width: 60, height: 46, top: 8, right: 9 }}>
              <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/hero-deco.svg" />
            </div>
            <div className="flex flex-col gap-2 items-center w-full">
              <p className="font-body text-[36px] text-white text-center">Le festival</p>
              <div className="h-[40px] w-[244px]">
                <img alt="Solimouv'" className="block h-full w-full object-contain" src="/figma-assets/home/logo-white.svg" />
              </div>
              <p className="font-body text-[18px] text-white text-center">Le sport pour toutes et tous, sans exception.</p>
            </div>
            <div className="flex flex-col gap-2 items-center w-[226px]">
              <p className="font-body text-[18px] text-white text-center">Ça approche, plus que :</p>
              <div className="flex gap-2 w-full">
                <CountTile value={days} label="Jours" />
                <CountTile value={hours} label="Heures" />
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center w-full">
              <Link href="/quiz" className="bg-[#050505] rounded-full h-[66px] flex items-center justify-center w-[291px] font-body text-[18px] text-white text-center">
                Trouve ton sport
              </Link>
              <Link href="#programme" className="font-body text-[18px] text-white underline text-center">
                Découvrir le programme
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile green section */}
        <section id="programme" className="mt-0">
          <div className="bg-[#2e7e33] px-4 py-[34px] relative overflow-visible">
            <div className="md:hidden absolute overflow-clip pointer-events-none" style={{ width: 132, height: 117, left: 8, top: -103 }}>
              <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/mascot-sport.svg" />
            </div>
            <div className="flex flex-col gap-2 mb-7">
              <h2 className="font-heading font-bold text-[32px] leading-8 text-white">Tu es inscrit...</h2>
              <p className="font-body text-[18px] text-white">Retrouve tes inscriptions</p>
            </div>
            <div className="flex flex-col gap-6 relative">
              <div className="absolute left-[12px] top-8 bottom-16 w-px border-l border-dashed border-white/40" />
              <ActivityRow time="10h30" name="Crossfit" room="Salle B" duration="30 min" />
              <ActivityRow time="15h30" name="Box" room="Gymnase C" duration="30 min" hasBadge />
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

        {/* Mobile pour vous */}
        <section id="pour-vous" className="px-4 py-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center">
              <h2 className="font-heading font-bold text-[32px] text-[#050505] text-center">Pour vous</h2>
              <p className="font-body text-[18px] text-[#050505] text-center">On vous propose quelques activités<br />qui vous correspondrais</p>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4">
              <RecoCard name="Danse" duration="30 min" room="Salle B" />
              <RecoCard name="Natation" duration="120 min" room="Piscine" />
              <RecoCard name="Yoga" duration="60 min" room="Salle C" />
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
