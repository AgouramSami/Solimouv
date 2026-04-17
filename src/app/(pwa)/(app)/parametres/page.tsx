"use client";

import { useState } from "react";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none ${
        checked ? "bg-[#474194]" : "bg-gray-200"
      }`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
        checked ? "translate-x-5" : "translate-x-0.5"
      }`} />
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-body text-xs font-semibold uppercase tracking-wider text-gray-400 px-1 mb-2">
        {title}
      </p>
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm divide-y divide-gray-100">
        {children}
      </div>
    </div>
  );
}

function Row({ label, sub, right }: { label: string; sub?: string; right: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <div>
        <p className="font-body text-sm text-[#050505]">{label}</p>
        {sub && <p className="font-body text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

function LinkRow({ label, sub, href }: { label: string; sub?: string; href: string }) {
  return (
    <Link href={href}
      className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition">
      <div>
        <p className="font-body text-sm text-[#050505]">{label}</p>
        {sub && <p className="font-body text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      <span className="text-gray-400 text-sm">→</span>
    </Link>
  );
}

export default function ParametresPage() {
  const [pushNotif, setPushNotif]   = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [rappels, setRappels]       = useState(true);

  return (
    <div className="min-h-screen bg-[#faf9f5]">

      {/* ── Header ── */}
      <div className="bg-white px-5 pt-10 pb-5 border-b border-gray-100">
        <img src="/figma-assets/logo.png" alt="Solimouv'" className="h-6 w-auto mb-4" />
        <h1 className="font-heading text-2xl font-bold text-[#050505]">Paramètres</h1>
        <p className="font-body text-sm text-gray-400 mt-0.5">Notifications, confidentialité, compte.</p>
      </div>

      <div className="px-4 py-5 space-y-5 md:max-w-xl md:mx-auto">

        {/* ── Notifications ── */}
        <Section title="Notifications">
          <Row
            label="Notifications push"
            sub="Alertes activités, programme, nouveautés"
            right={<Toggle checked={pushNotif} onChange={setPushNotif} />}
          />
          <Row
            label="Emails"
            sub="Confirmations, récapitulatifs"
            right={<Toggle checked={emailNotif} onChange={setEmailNotif} />}
          />
          <Row
            label="Rappels d'activités"
            sub="15 min avant le début"
            right={<Toggle checked={rappels} onChange={setRappels} />}
          />
        </Section>

        {/* ── Compte ── */}
        <Section title="Mon compte">
          <LinkRow label="Modifier mon profil"      sub="Prénom, nom, âge"         href="/compte" />
          <LinkRow label="Refaire le questionnaire" sub="Mettre à jour mes sports"  href="/onboarding" />
          <LinkRow label="Mes badges"               sub="Voir ma progression"       href="/compte" />
        </Section>

        {/* ── Application ── */}
        <Section title="Application">
          <LinkRow label="À propos de Solimouv'"  sub="Version 1.0 — Hackathon 2026" href="/a-propos" />
          <LinkRow label="Installer l'application" sub="Ajouter à l'écran d'accueil"  href="/" />
        </Section>

        {/* ── Légal ── */}
        <Section title="Légal & Confidentialité">
          <LinkRow label="Politique de confidentialité" href="/confidentialite" />
          <LinkRow label="Conditions d'utilisation"     href="/cgu" />
          <LinkRow label="Gestion des cookies"          href="/confidentialite" />
        </Section>

        {/* ── Danger zone ── */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="px-5 py-4">
            <SignOutButton />
          </div>
        </div>

        <p className="font-body text-xs text-gray-400 text-center pb-4">
          Solimouv&apos; · Up Sport! · Festival du sport inclusif · Paris 2026
        </p>
      </div>
    </div>
  );
}
