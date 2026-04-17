"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import SportIcon, { SportName } from "@/components/icons/SportIcon";

const STEPS = [
  {
    key: "type_sport",
    question: "Quel type de sport\nte donne envie\u00a0?",
    options: [
      { id: "sports_collectifs", label: "Sports collectifs" },
      { id: "sports_individuels", label: "Sports individuels" },
      { id: "arts_martiaux_combat", label: "Arts martiaux / Combats" },
      { id: "danse_expression", label: "Danse / Expression" },
      { id: "plein_air_nature", label: "Plein air / Nature" },
      { id: "bien_etre_yoga", label: "Bien-être / Yoga" },
    ],
    multi: false,
    decorTop: "Badminton" as SportName,
    decorBottom: "Baseball" as SportName,
  },
  {
    key: "rythme",
    question: "Ton rythme idéal\u00a0?",
    options: [
      { id: "calme", label: "Calme / Doux" },
      { id: "intermediaire", label: "Intermédiaire / Modéré" },
      { id: "avance", label: "Avancé / Expert" },
    ],
    multi: false,
    decorTop: "Basket" as SportName,
    decorBottom: "Bowling" as SportName,
  },
  {
    key: "situation",
    question: "Quelle est ta situation\nactuelle\u00a0?",
    options: [
      { id: "etudiant", label: "Étudiant(e)" },
      { id: "recherche", label: "En recherche d'emploi" },
      { id: "activite", label: "En activité" },
      { id: "famille", label: "Parent / Famille" },
    ],
    multi: false,
    decorTop: "Badminton" as SportName,
    decorBottom: "Baseball" as SportName,
  },
  {
    key: "accompagnement",
    question: "Tu viens plutôt…",
    options: [
      { id: "solo", label: "Solo" },
      { id: "groupe", label: "En groupe" },
      { id: "famille", label: "En famille" },
    ],
    multi: false,
    decorTop: "Rugby" as SportName,
    decorBottom: "Bowling" as SportName,
  },
  {
    key: "communaute",
    question: "Communauté\n(optionnel)",
    options: [
      { id: "lgbtqia", label: "LGBTQIA+" },
      { id: "refugie", label: "Réfugié(e)" },
      { id: "handicap", label: "Personne en situation de handicap" },
      { id: "senior", label: "Senior" },
      { id: "aucun", label: "Je préfère ne pas préciser" },
    ],
    multi: false,
    decorTop: "Tennis" as SportName,
    decorBottom: "Basket" as SportName,
  },
] as const;

const TOTAL = STEPS.length;

function getCRMCategory(situation: string, communaute: string): string {
  const communityMap: Record<string, string> = {
    lgbtqia: "LGBTQIA+",
    refugie: "Réfugié·e",
    handicap: "Handicap",
    senior: "Senior",
  };
  if (communityMap[communaute]) return communityMap[communaute];
  const situationMap: Record<string, string> = {
    etudiant: "Jeune",
    recherche: "En insertion",
    activite: "Actif",
    famille: "Famille",
  };
  return situationMap[situation] ?? "Grand public";
}

function ProgressDots({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5" aria-label={`Étape ${current + 1} sur ${TOTAL}`}>
      {Array.from({ length: TOTAL }).map((_, i) => (
        <div
          key={i}
          className={`h-[7px] rounded-full transition-all duration-300 ${
            i === current
              ? "w-8 bg-brand-green"
              : i < current
              ? "w-5 bg-brand-green/50"
              : "w-5 bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function OptionButton({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      aria-pressed={selected}
      className={`w-full rounded-full border px-8 py-4 text-left text-sm font-medium transition-all active:scale-[0.98] ${
        selected
          ? "border-brand-dark bg-brand-dark text-white"
          : "border-gray-200 bg-white text-brand-dark hover:border-gray-300"
      }`}
    >
      {label}
    </button>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const current = STEPS[step];
  const selected = answers[current.key] ?? "";

  function select(id: string) {
    setAnswers((prev) => ({ ...prev, [current.key]: id }));
  }

  function next() {
    if (step < TOTAL - 1) setStep((s) => s + 1);
    else finish();
  }

  function prev() {
    if (step > 0) setStep((s) => s - 1);
  }

  async function finish() {
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const crm = getCRMCategory(answers.situation ?? "", answers.communaute ?? "");

      // Lire prenom/nom depuis user_metadata ET user_profiles (fallback)
      const meta = user.user_metadata ?? {};
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("prenom, nom, age, email_optin")
        .eq("id", user.id)
        .single();

      const prenom = meta.prenom ?? profile?.prenom ?? meta.full_name?.split(" ")[0] ?? "";
      const nom = meta.nom ?? profile?.nom ?? meta.full_name?.split(" ").slice(1).join(" ") ?? "";
      const fullName = `${prenom} ${nom}`.trim();

      await supabase.from("user_profiles").upsert({
        id: user.id,
        prenom,
        nom,
        age: meta.age ?? profile?.age ?? null,
        full_name: fullName,
        type_sport: answers.type_sport ?? "",
        rythme: answers.rythme ?? "",
        situation: answers.situation ?? "",
        accompagnement: answers.accompagnement ?? "",
        communaute: answers.communaute ?? "",
        crm_categorie: crm,
        public_cible: answers.situation ?? "",
        sports_interests: answers.type_sport ? [answers.type_sport] : [],
        niveau: answers.rythme ?? "",
        dynamique: answers.accompagnement ?? "",
        onboarded: true,
        updated_at: new Date().toISOString(),
      });

      const webhookUrl = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;
      if (webhookUrl) {
        const slug = (prenom + nom).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 10);
        const now = new Date();
        const dateTag = `${String(now.getDate()).padStart(2, "0")}${String(now.getMonth() + 1).padStart(2, "0")}`;
        const emailOptin = meta.email_optin ?? profile?.email_optin ?? false;
        const optinDate = emailOptin
          ? `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`
          : "";
        const typeSportLabels: Record<string, string> = {
          sports_collectifs: "sports collectifs",
          sports_individuels: "sports individuels",
          arts_martiaux_combat: "arts martiaux / combats",
          danse_expression: "danse / expression",
          plein_air_nature: "plein air / nature",
          bien_etre_yoga: "bien-être / yoga",
        };

        const payload = {
          nom,
          prenom,
          id_compte: `${slug}${dateTag}`,
          age: meta.age ?? profile?.age ?? null,
          email: user.email ?? "",
          optin_email: emailOptin ? "oui" : "non",
          date_optin: optinDate,
          question_1: typeSportLabels[answers.type_sport ?? ""] ?? answers.type_sport ?? "",
          categorie_email: answers.type_sport ?? "",
          question_2: answers.rythme ?? "",
          question_3: answers.situation ?? "",
          question_4: answers.accompagnement ?? "",
          question_5: answers.communaute ?? "",
        };

        try {
          const res = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) console.error("[Make webhook] HTTP", res.status, await res.text());
        } catch (err) {
          console.error("[Make webhook] fetch error:", err);
        }
      } else {
        console.warn("[Make webhook] NEXT_PUBLIC_MAKE_WEBHOOK_URL non défini");
      }
    }

    router.push("/home");
  }

  const isLast = step === TOTAL - 1;
  const canProgress = !!selected || current.key === "communaute";

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white px-6 pt-10 pb-8">
      {/* Logo */}
      <img
        src="/figma-assets/logo.png"
        alt="SoliMouv'"
        className="mx-auto h-6 w-auto"
      />

      {/* Décor haut-droite */}
      <div className="pointer-events-none absolute right-0 top-16 w-36 opacity-90">
        <SportIcon sport={current.decorTop} />
      </div>

      {/* Question + progress */}
      <div className="mt-10 px-2 text-center">
        <h1 className="font-heading text-2xl font-bold leading-snug text-brand-dark whitespace-pre-line">
          {current.question}
        </h1>
        <div className="mt-4">
          <ProgressDots current={step} />
        </div>
      </div>

      {/* Options */}
      <div className="mt-8 space-y-3 flex-1">
        {current.options.map((opt) => (
          <OptionButton
            key={opt.id}
            label={opt.label}
            selected={selected === opt.id}
            onSelect={() => select(opt.id)}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        {step > 0 ? (
          <button
            onClick={prev}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-brand-dark transition-colors"
          >
            <span aria-hidden>&lt;</span> Précédent
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={next}
          disabled={!canProgress || saving}
          className="btn-primary px-8 py-3.5 disabled:opacity-40"
        >
          {saving ? "Chargement…" : isLast ? "Voir mes résultats" : "Suivant"}
        </button>
      </div>

      {/* Décor bas-gauche */}
      <div className="pointer-events-none absolute -bottom-4 -left-4 w-44 opacity-80">
        <SportIcon sport={current.decorBottom} />
      </div>
    </div>
  );
}
