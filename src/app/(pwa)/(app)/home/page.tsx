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

// ─── Desktop countdown box ────────────────────────────────────────────────────
function CountBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-2xl bg-white/85 px-5 py-3 text-center min-w-[78px]">
      <div className="text-3xl font-black font-heading text-[#050505] leading-none tabular-nums">{String(value).padStart(2, "0")}</div>
      <div className="mt-1.5 text-[10px] font-bold tracking-widest text-gray-600 uppercase">{label}</div>
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
          <div className="absolute flex items-center justify-center" style={{ inset: "60.28% -4.32% -13.18% 82.31%", containerType: "size" }}>
            <div className="relative flex-none" style={{ height: "hypot(69.3994cqh,10.5742cqw)", width: "hypot(89.4258cqw,30.6006cqh)", transform: "rotate(12.86deg)" }}>
              <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/card-badge.svg" />
            </div>
          </div>
        )}
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

// ─── Desktop session card ─────────────────────────────────────────────────────
function SessionCard({ time, duration, room, name, cta, img, dark, full }: {
  time: string; duration: string; room: string; name: string; cta: string;
  img: string; dark?: boolean; full?: boolean;
}) {
  return (
    <article className={`relative overflow-hidden rounded-2xl p-6 ${dark ? "bg-[#2e7e33] text-white" : "bg-[#e8c0c4] text-[#050505]"}`}>
      <img src={img} alt="" className="absolute top-4 right-4 h-14 w-14 object-contain drop-shadow-lg" />
      <div className="text-2xl font-black leading-none font-heading">{time}</div>
      <div className="mt-2 text-[11px] font-semibold tracking-wider opacity-70">{duration} · {room}</div>
      <h3 className="mt-10 text-3xl font-black font-heading">{name}</h3>
      <button className={`mt-5 inline-flex items-center rounded-full px-5 py-2 text-xs font-semibold transition ${full ? "bg-white text-[#050505]" : "bg-[#474194] text-white hover:opacity-90"}`}>{cta}</button>
    </article>
  );
}

// ─── Desktop reco card ────────────────────────────────────────────────────────
function DesktopRecoCard({ time, duration, room, name, img, bg }: {
  time: string; duration: string; room: string; name: string; img: string; bg: string;
}) {
  return (
    <article className={`relative overflow-hidden rounded-2xl p-6 ${bg}`}>
      <img src={img} alt="" className="absolute top-4 right-4 h-12 w-12 object-contain" />
      <div className="text-xl font-black font-heading">{time}</div>
      <div className="mt-1 text-[10px] font-semibold tracking-wider opacity-70">{duration} · {room}</div>
      <h3 className="mt-8 text-2xl font-black font-heading">{name}</h3>
      <button className="mt-5 inline-flex items-center rounded-full bg-[#050505] px-5 py-2 text-xs font-semibold text-white hover:opacity-90">Découvrir</button>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { days, hours, minutes, seconds } = useCountdown();
  const [prenom, setPrenom] = useState("");

  useEffect(() => {
    createClient().auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      const m = user.user_metadata ?? {};
      setPrenom(m.prenom ?? (m.full_name ?? m.name ?? "").trim().split(" ")[0] ?? user.email?.split("@")[0] ?? "");
    });
  }, []);

  return (
    <div className="min-h-screen bg-white md:bg-[#f5eedb]">

      {/* ══════════════════════════════════════
          MOBILE — Logo
      ══════════════════════════════════════ */}
      <div className="md:hidden flex items-center justify-center pt-10 pb-3 px-4">
        <img src="/figma-assets/logo.png" alt="Solimouv'" className="h-6 w-auto" />
      </div>

      {/* ══════════════════════════════════════
          MOBILE — Greeting + Bell
      ══════════════════════════════════════ */}
      <div className="md:hidden flex items-center justify-between px-4 pb-4">
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

      {/* ══════════════════════════════════════
          DESKTOP — Greeting text
      ══════════════════════════════════════ */}
      <section className="hidden md:block pt-8 pb-4">
        <div className="mx-auto max-w-7xl px-8">
          <h1 className="text-3xl md:text-4xl font-black font-heading text-[#050505]">Bonjour{prenom ? ` ${prenom}` : ""},</h1>
          <p className="mt-1 text-sm text-gray-500">Voici ce qui vous attend cette semaine sur Solimouv.</p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HERO CARD (mobile: violet | desktop: gradient)
      ══════════════════════════════════════ */}
      <section id="festival" className="px-4 md:px-8 pb-0 md:pb-10">
        <div className="mx-auto md:max-w-7xl">

          {/* Mobile hero */}
          <div className="md:hidden relative bg-[#474194] rounded-[32px] overflow-hidden flex flex-col items-center gap-9 pt-[22px] pb-[22px] px-4">
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

          {/* Desktop hero */}
          <div className="hidden md:block relative overflow-hidden rounded-[2rem] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.18)]"
            style={{ background: "linear-gradient(135deg, #e8c0c8 0%, #c8a0d0 100%)" }}>
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 p-10 md:p-14">
              <div className="relative z-10">
                <span className="inline-flex items-center rounded-full bg-white/70 px-4 py-1.5 text-[11px] font-bold tracking-widest text-[#474194]">LE FESTIVAL</span>
                <h2 className="mt-6 text-5xl md:text-6xl font-black leading-none text-[#050505] font-heading">Le festival</h2>
                <div className="mt-3">
                  <img src="/figma-assets/home/logo-desktop-dark.png" alt="Solimouv'" className="h-16 md:h-20 w-auto" />
                </div>
                <p className="mt-6 max-w-md text-[#050505]/80 text-base leading-relaxed">
                  Le rendez-vous sport, danse et culture de l&apos;année. Inscris-toi et rejoins une communauté qui bouge ensemble.
                </p>
                <div className="mt-8">
                  <div className="text-[11px] font-bold tracking-widest text-[#050505]/60 mb-3">LE FESTIVAL COMMENCE DANS</div>
                  <div className="flex gap-3">
                    <CountBox value={days} label="JOURS" />
                    <CountBox value={hours} label="HEURES" />
                    <CountBox value={minutes} label="MINUTES" />
                    <CountBox value={seconds} label="SECONDES" />
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/quiz" className="inline-flex items-center rounded-full bg-[#050505] px-7 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition">Trouve ton sport</Link>
                  <Link href="#programme" className="inline-flex items-center rounded-full bg-white/80 px-7 py-3.5 text-sm font-semibold text-[#050505] hover:opacity-90 transition">Découvrir le programme</Link>
                </div>
              </div>
              <div className="relative hidden lg:block min-h-[320px]">
                {[
                  { src: "/figma-assets/home/sports/sport-rugby.png", style: { top: 16, left: 32, width: 112 } as React.CSSProperties, rotate: "-8deg" },
                  { src: "/figma-assets/home/sports/sport-basket.png", style: { top: 8, left: 176, width: 112 } as React.CSSProperties, rotate: "6deg" },
                  { src: "/figma-assets/home/sports/sport-badminton.png", style: { top: 40, right: 16, width: 96 } as React.CSSProperties, rotate: "12deg" },
                  { src: "/figma-assets/home/sports/sport-tennis.png", style: { top: 176, left: 80, width: 128 } as React.CSSProperties, rotate: "-4deg" },
                  { src: "/figma-assets/home/sports/sport-baseball.png", style: { top: 208, right: 48, width: 144 } as React.CSSProperties, rotate: "8deg" },
                  { src: "/figma-assets/home/sports/sport-bowling.png", style: { bottom: 16, left: 128, width: 112 } as React.CSSProperties, rotate: "-10deg" },
                ].map((s, i) => (
                  <img key={i} src={s.src} alt="" className="absolute object-contain drop-shadow-lg"
                    style={{ ...s.style, transform: `rotate(${s.rotate})` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          GREEN SECTION — Inscriptions
      ══════════════════════════════════════ */}
      <section id="programme" className="mt-0 md:mt-8 md:px-8 md:pb-10">
        <div className="mx-auto md:max-w-7xl">
          <div className="bg-[#2e7e33] px-4 py-[34px] md:rounded-[2rem] md:p-12 relative overflow-visible">

            {/* Mobile: mascot decoration (overflows top) */}
            <div className="md:hidden absolute overflow-clip pointer-events-none" style={{ width: 132, height: 117, left: 8, top: -103 }}>
              <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma-assets/home/mascot-sport.svg" />
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-7">
              <div className="text-white">
                <h2 className="font-heading font-bold text-[32px] md:text-5xl leading-8 md:leading-none">Vous êtes inscrit...</h2>
                <p className="font-body text-[18px] mt-1">Retrouver vos inscriptions</p>
              </div>
              <a href="#" className="hidden md:block text-sm font-semibold text-white hover:opacity-80 transition">Voir tout l&apos;agenda →</a>
            </div>

            {/* Mobile: activity rows with timeline */}
            <div className="md:hidden flex flex-col gap-6 relative">
              {/* Timeline line */}
              <div className="absolute left-[12px] top-8 bottom-16 w-px border-l border-dashed border-white/40" />
              <ActivityRow time="10h30" name="Crossfit" room="Salle B" duration="30 min" />
              <ActivityRow time="15h30" name="Box" room="Gymnase C" duration="30 min" hasBadge />
              {/* Add activity */}
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

            {/* Desktop: sessions grid */}
            <div className="hidden md:grid gap-5 md:grid-cols-3">
              <SessionCard time="10h30" duration="60 MIN" room="SALLE B" name="CrossFit" cta="Rejoindre" img="/figma-assets/home/sports/sport-rugby.png" />
              <SessionCard time="15h30" duration="45 MIN" room="SALLE A" name="Cardio" cta="Rejoindre" img="/figma-assets/home/sports/sport-basket.png" dark />
              <SessionCard time="17h00" duration="60 MIN" room="SALLE C" name="Yoga" cta="Presque complet" img="/figma-assets/home/sports/sport-tennis.png" dark full />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          POUR VOUS
      ══════════════════════════════════════ */}
      <section id="pour-vous" className="px-4 py-8 md:px-8 md:py-10">
        <div className="mx-auto md:max-w-7xl">

          {/* Mobile */}
          <div className="md:hidden flex flex-col gap-5">
            <div className="flex flex-col items-center">
              <h2 className="font-heading font-bold text-[32px] text-[#050505] text-center">Pour vous</h2>
              <p className="font-body text-[18px] text-[#050505] text-center">
                On vous propose quelques activités<br />qui vous correspondrais
              </p>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4">
              <RecoCard name="Danse" duration="30 min" room="Salle B" />
              <RecoCard name="Natation" duration="120 min" room="Piscine" />
              <RecoCard name="Yoga" duration="60 min" room="Salle C" />
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:block rounded-[2rem] p-10 md:p-12 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.14)]"
            style={{ background: "linear-gradient(135deg, #f0d4d8 0%, #e8c8d8 100%)" }}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-2">
              <div>
                <span className="text-[11px] font-bold tracking-widest text-[#474194]">RECOMMANDATIONS</span>
                <h2 className="mt-3 text-4xl md:text-5xl font-black text-[#050505] font-heading">Pour vous</h2>
                <p className="mt-3 text-sm text-[#050505]/80">Choisis parmi ces propositions adaptées à tes envies.</p>
              </div>
              <a href="#" className="text-sm font-semibold text-[#050505] hover:opacity-70">Tout explorer →</a>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <DesktopRecoCard time="9h00" duration="50 MIN" room="SALLE B" name="Danse" img="/figma-assets/home/sports/sport-badminton.png" bg="bg-rose-100" />
              <DesktopRecoCard time="11h30" duration="45 MIN" room="PISCINE" name="Natation" img="/figma-assets/home/sports/sport-basket.png" bg="bg-purple-100" />
              <DesktopRecoCard time="14h00" duration="60 MIN" room="COURT 2" name="Tennis" img="/figma-assets/home/sports/sport-tennis.png" bg="bg-amber-100" />
              <DesktopRecoCard time="18h00" duration="75 MIN" room="STADE" name="Baseball" img="/figma-assets/home/sports/sport-baseball.png" bg="bg-pink-100" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DESKTOP — CTA signup section
      ══════════════════════════════════════ */}
      <section className="hidden md:block px-8 pb-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] p-10 lg:p-16 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.18)]"
          style={{ background: "linear-gradient(135deg, #e8c0c8 0%, #c8a0d0 100%)" }}>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#050505]/70">Inscriptions ouvertes</span>
              <h2 className="mt-3 text-4xl lg:text-5xl font-black font-heading text-[#050505]">Crée ton compte et compose ton festival sur mesure.</h2>
              <p className="mt-5 text-base text-[#050505]/80 leading-relaxed">Quelques questions, et on te propose un programme personnalisé selon ton rythme, ton niveau et tes envies.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/quiz" className="inline-flex items-center rounded-full bg-[#474194] px-6 py-3.5 text-sm font-bold text-white hover:opacity-90 transition">Trouve ton sport</Link>
                <Link href="/compte" className="inline-flex items-center rounded-full border border-[#050505]/20 bg-white/40 px-6 py-3.5 text-sm font-semibold text-[#050505] hover:bg-white/60 transition">Mon espace</Link>
              </div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-gray-500">Étape 1 — Quel type de sport te donne envie ?</div>
              <div className="mt-5 space-y-2.5">
                {["Sports collectifs", "Arts martiaux / Combats", "Danse / Expression", "Plein air / Nature", "Bien-être / Yoga"].map((opt, i) => (
                  <Link key={opt} href="/quiz"
                    className={`block w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${i === 4 ? "bg-[#474194] text-white border-[#474194]" : "border-gray-200 hover:border-gray-400 text-[#050505]"}`}>
                    {opt}
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Link href="/quiz" className="rounded-full bg-[#050505] px-5 py-2.5 text-sm font-semibold text-white">Commencer →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER (blue) — mobile + desktop
      ══════════════════════════════════════ */}
      <footer className="bg-[#1f74bb] mt-4 md:mx-8 md:mb-8 md:rounded-[32px]">
        <div className="flex flex-col gap-10 items-center px-5 py-12">
          <div className="h-6 w-[143px]">
            <img alt="Solimouv'" className="block h-full w-full object-contain" src="/figma-assets/home/logo-footer.svg" />
          </div>
          <div className="flex flex-col items-center gap-4 text-[18px] text-white text-center" style={{ fontFamily: "Barlow, sans-serif" }}>
            <Link href="/contact" className="hover:opacity-70 transition-opacity">Contactez-nous</Link>
            <Link href="#programme" className="hover:opacity-70 transition-opacity">A l&apos;affiche</Link>
            <Link href="/a-propos" className="hover:opacity-70 transition-opacity">A Propos</Link>
            <Link href="/associations" className="hover:opacity-70 transition-opacity">Associations</Link>
          </div>
          <div className="w-full flex flex-col gap-5 items-center">
            <div className="w-full h-px bg-white/30" />
            <div className="flex flex-col gap-3 items-center text-[18px] text-white text-center font-light" style={{ fontFamily: "Barlow, sans-serif" }}>
              <Link href="/confidentialite" className="underline hover:opacity-70 transition-opacity">Politique de confidentialité</Link>
              <Link href="/cgu" className="underline hover:opacity-70 transition-opacity">Conditions d&apos;utilisation</Link>
            </div>
            <p className="font-light text-[18px] text-white" style={{ fontFamily: "Barlow, sans-serif" }}>© 2026 Up Sport! Tous droits réservés.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
