"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

const PROFILS = [
  { id: "famille",  label: "Famille",                emoji: "👨‍👩‍👧‍👦" },
  { id: "jeune",    label: "Jeune",                  emoji: "🧑" },
  { id: "senior",   label: "Senior",                 emoji: "👴" },
  { id: "refugie",  label: "Personne réfugiée",      emoji: "🌍" },
  { id: "lgbtqia",  label: "Communauté LGBTQIA+",    emoji: "🏳️‍🌈" },
  { id: "handicap", label: "Situation de handicap",  emoji: "♿" },
  { id: "autre",    label: "Autre",                  emoji: "👋" },
];

const SPORTS = [
  { id: "foot",          label: "Football",       emoji: "⚽" },
  { id: "basket",        label: "Basketball",     emoji: "🏀" },
  { id: "yoga",          label: "Yoga",           emoji: "🧘" },
  { id: "boxe",          label: "Boxe",           emoji: "🥊" },
  { id: "natation",      label: "Natation",       emoji: "🏊" },
  { id: "danse",         label: "Danse",          emoji: "💃" },
  { id: "athletisme",    label: "Athlétisme",     emoji: "🏃" },
  { id: "handisport",    label: "Handisport",     emoji: "🏅" },
  { id: "arts_martiaux", label: "Arts martiaux",  emoji: "🥋" },
  { id: "cyclisme",      label: "Cyclisme",       emoji: "🚴" },
];

const NIVEAUX = [
  { id: "decouverte", label: "Découverte",    emoji: "🌱", desc: "Je n'ai jamais pratiqué" },
  { id: "debutant",   label: "Débutant·e",   emoji: "🌟", desc: "Je débute, j'apprends" },
  { id: "intermediaire", label: "Intermédiaire", emoji: "💪", desc: "Je pratique régulièrement" },
  { id: "avance",     label: "Avancé·e",     emoji: "🏆", desc: "Je maîtrise bien" },
];

const DYNAMIQUES = [
  { id: "solo",    label: "Seul·e",   emoji: "🙋", desc: "Je viens découvrir à mon rythme" },
  { id: "groupe",  label: "En groupe", emoji: "👥", desc: "Avec des amis ou collègues" },
  { id: "famille", label: "En famille", emoji: "👨‍👩‍👧", desc: "Avec des enfants" },
];

const TOTAL_STEPS = 5;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profil, setProfil] = useState("");
  const [sports, setSports] = useState<string[]>([]);
  const [niveau, setNiveau] = useState("");
  const [dynamique, setDynamique] = useState("");
  const [saving, setSaving] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setInstalled(true));
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  function toggleSport(id: string) {
    setSports((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  async function handleInstall() {
    if (!installPrompt) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (installPrompt as any).prompt();
    if (result?.outcome === "accepted") setInstalled(true);
  }

  async function finish() {
    setSaving(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // 1. Sauvegarde Supabase
      await supabase.from("user_profiles").upsert({
        id: user.id,
        public_cible: profil,
        sports_interests: sports,
        niveau,
        dynamique,
        onboarded: true,
        updated_at: new Date().toISOString(),
      });

      // 2. Envoi vers Make — newsletter personnalisée
      const webhookUrl = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;
      if (webhookUrl) {
        const meta = user.user_metadata ?? {};
        // Toutes les réponses dans une seule case, séparées par virgule
        const reponses = [profil, ...sports, niveau, dynamique]
          .filter(Boolean)
          .join(", ");

        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email ?? "",
            nom: meta.last_name ?? meta.name?.split(" ").slice(-1)[0] ?? "",
            prenom: meta.first_name ?? meta.full_name?.split(" ")[0] ?? meta.name?.split(" ")[0] ?? "",
            reponses,
          }),
        }).catch(() => {
          // Erreur webhook non bloquante
        });
      }
    }

    router.push("/");
  }

  return (
    <div className="flex min-h-screen flex-col bg-brand-dark text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <Image
          src="/logo.svg"
          alt="Solimouv'"
          width={140}
          height={24}
          className="brightness-0 invert"
        />
        {/* Barre de progression */}
        <div
          className="flex gap-1.5"
          aria-label={`Étape ${step} sur ${TOTAL_STEPS}`}
        >
          {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
            <div
              key={s}
              className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                s <= step ? "bg-brand-primary" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Étape 1 — Profil ── */}
      {step === 1 && (
        <div className="flex flex-1 flex-col px-6 py-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
            Étape 1 / {TOTAL_STEPS}
          </p>
          <h1 className="font-heading mt-3 text-3xl font-bold leading-tight">
            Qui êtes-vous ?
          </h1>
          <p className="mt-2 text-gray-400">
            Pour personnaliser votre expérience Solimouv&apos;.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-3" role="list">
            {PROFILS.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => setProfil(p.id)}
                  className={`flex w-full flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all ${
                    profil === p.id
                      ? "border-brand-primary bg-brand-primary/10"
                      : "border-white/10 bg-white/5 hover:border-white/30"
                  }`}
                  aria-pressed={profil === p.id}
                >
                  <span className="text-3xl" role="img" aria-label={p.label}>
                    {p.emoji}
                  </span>
                  <span className="text-xs font-medium leading-tight text-center">
                    {p.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setStep(2)}
            disabled={!profil}
            className="btn-primary mt-auto disabled:opacity-40"
          >
            Continuer →
          </button>
        </div>
      )}

      {/* ── Étape 2 — Sports ── */}
      {step === 2 && (
        <div className="flex flex-1 flex-col px-6 py-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
            Étape 2 / {TOTAL_STEPS}
          </p>
          <h1 className="font-heading mt-3 text-3xl font-bold leading-tight">
            Vos sports préférés ?
          </h1>
          <p className="mt-2 text-gray-400">
            Sélectionnez autant que vous voulez.
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-3" role="list">
            {SPORTS.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => toggleSport(s.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 transition-all ${
                    sports.includes(s.id)
                      ? "border-brand-secondary bg-brand-secondary/10"
                      : "border-white/10 bg-white/5 hover:border-white/30"
                  }`}
                  aria-pressed={sports.includes(s.id)}
                >
                  <span className="text-2xl" role="img" aria-label={s.label}>
                    {s.emoji}
                  </span>
                  <span className="text-sm font-medium">{s.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex gap-3 pt-4">
            <button onClick={() => setStep(1)} className="btn-secondary flex-1">
              ← Retour
            </button>
            <button onClick={() => setStep(3)} className="btn-primary flex-1">
              Continuer →
            </button>
          </div>
        </div>
      )}

      {/* ── Étape 3 — Niveau ── */}
      {step === 3 && (
        <div className="flex flex-1 flex-col px-6 py-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
            Étape 3 / {TOTAL_STEPS}
          </p>
          <h1 className="font-heading mt-3 text-3xl font-bold leading-tight">
            Votre niveau ?
          </h1>
          <p className="mt-2 text-gray-400">
            Pas de jugement — c&apos;est pour adapter les propositions.
          </p>

          <ul className="mt-8 space-y-3" role="list">
            {NIVEAUX.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => setNiveau(n.id)}
                  className={`flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all ${
                    niveau === n.id
                      ? "border-brand-primary bg-brand-primary/10"
                      : "border-white/10 bg-white/5 hover:border-white/30"
                  }`}
                  aria-pressed={niveau === n.id}
                >
                  <span className="text-3xl" role="img" aria-label={n.label}>
                    {n.emoji}
                  </span>
                  <div>
                    <p className="font-semibold">{n.label}</p>
                    <p className="text-sm text-gray-400">{n.desc}</p>
                  </div>
                  {niveau === n.id && (
                    <span className="ml-auto text-brand-primary text-xl">✓</span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex gap-3 pt-4">
            <button onClick={() => setStep(2)} className="btn-secondary flex-1">
              ← Retour
            </button>
            <button
              onClick={() => setStep(4)}
              disabled={!niveau}
              className="btn-primary flex-1 disabled:opacity-40"
            >
              Continuer →
            </button>
          </div>
        </div>
      )}

      {/* ── Étape 4 — Dynamique ── */}
      {step === 4 && (
        <div className="flex flex-1 flex-col px-6 py-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
            Étape 4 / {TOTAL_STEPS}
          </p>
          <h1 className="font-heading mt-3 text-3xl font-bold leading-tight">
            Vous venez comment ?
          </h1>
          <p className="mt-2 text-gray-400">
            Pour vous orienter vers les meilleures activités.
          </p>

          <ul className="mt-8 space-y-3" role="list">
            {DYNAMIQUES.map((d) => (
              <li key={d.id}>
                <button
                  onClick={() => setDynamique(d.id)}
                  className={`flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all ${
                    dynamique === d.id
                      ? "border-brand-secondary bg-brand-secondary/10"
                      : "border-white/10 bg-white/5 hover:border-white/30"
                  }`}
                  aria-pressed={dynamique === d.id}
                >
                  <span className="text-3xl" role="img" aria-label={d.label}>
                    {d.emoji}
                  </span>
                  <div>
                    <p className="font-semibold">{d.label}</p>
                    <p className="text-sm text-gray-400">{d.desc}</p>
                  </div>
                  {dynamique === d.id && (
                    <span className="ml-auto text-brand-secondary text-xl">✓</span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex gap-3 pt-4">
            <button onClick={() => setStep(3)} className="btn-secondary flex-1">
              ← Retour
            </button>
            <button
              onClick={() => setStep(5)}
              disabled={!dynamique}
              className="btn-primary flex-1 disabled:opacity-40"
            >
              Continuer →
            </button>
          </div>
        </div>
      )}

      {/* ── Étape 5 — Installer l'app ── */}
      {step === 5 && (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
            Étape 5 / {TOTAL_STEPS}
          </p>

          {installed ? (
            <>
              <div className="mt-6 text-6xl">🎉</div>
              <h1 className="font-heading mt-4 text-3xl font-bold">
                App installée !
              </h1>
              <p className="mt-3 text-gray-400">
                Retrouvez Solimouv&apos; directement depuis votre écran
                d&apos;accueil.
              </p>
            </>
          ) : (
            <>
              <div className="mt-6 text-6xl">📲</div>
              <h1 className="font-heading mt-4 text-3xl font-bold leading-tight">
                Installez l&apos;app sur votre téléphone
              </h1>
              <p className="mt-3 text-gray-400">
                Accédez à Solimouv&apos; en un tap, même sans connexion.
                Recevez les notifications du festival.
              </p>

              <div className="mt-8 w-full space-y-3">
                {installPrompt ? (
                  <button
                    onClick={handleInstall}
                    className="btn-primary w-full text-base"
                  >
                    Ajouter à l&apos;écran d&apos;accueil
                  </button>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-400">
                    <p className="font-medium text-white">Sur iOS Safari :</p>
                    <p className="mt-1">
                      Appuyez sur <strong>Partager</strong> puis{" "}
                      <strong>&quot;Sur l&apos;écran d&apos;accueil&quot;</strong>
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="mt-auto flex w-full gap-3 pt-8">
            {!installed && (
              <button
                onClick={() => setStep(4)}
                className="btn-secondary flex-1 text-sm"
              >
                ← Retour
              </button>
            )}
            <button
              onClick={finish}
              disabled={saving}
              className="btn-primary flex-1 disabled:opacity-60"
            >
              {saving
                ? "Chargement…"
                : installed
                ? "Allons-y ! 🎉"
                : "Passer cette étape →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
