"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, Info } from "lucide-react";

export interface QuizAnswers {
  sport: string;
  level: string;
  situation: string;
  dynamic: string;
  community: string;
}

interface SportQuizProps {
  onComplete: (answers: QuizAnswers) => void;
}

const TOTAL_STEPS = 5;

const steps = [
  {
    key: "sport" as const,
    title: "Quel type de sport te donne envie ?",
    options: [
      { value: "collective", label: "Sports collectifs",    emoji: "⚽" },
      { value: "individual", label: "Sports individuels",   emoji: "🏃" },
      { value: "combat",     label: "Arts martiaux / Combat", emoji: "🥋" },
      { value: "dance",      label: "Danse / Expression",   emoji: "💃" },
      { value: "outdoor",    label: "Plein air / Nature",   emoji: "🌿" },
      { value: "wellness",   label: "Bien-être / Yoga",     emoji: "🧘" },
    ],
  },
  {
    key: "level" as const,
    title: "Ton rythme idéal ?",
    options: [
      { value: "calm",     label: "Calme / Doux",             emoji: "🌊" },
      { value: "moderate", label: "Intermédiaire / Modéré",   emoji: "⚡" },
      { value: "advanced", label: "Avancé / Expert",          emoji: "🔥" },
    ],
  },
  {
    key: "situation" as const,
    title: "Quelle est ta situation actuelle ?",
    tooltip: "Ces données restent anonymes et nous permettent uniquement de vous proposer des activités adaptées à votre quotidien.",
    options: [
      { value: "student",   label: "Étudiant·e",             emoji: "🎓" },
      { value: "jobseeker", label: "En recherche d'emploi",   emoji: "🔍" },
      { value: "active",    label: "En activité",             emoji: "💼" },
      { value: "parent",    label: "Parent / Famille",        emoji: "👨‍👩‍👧" },
    ],
  },
  {
    key: "dynamic" as const,
    title: "Tu viens plutôt...",
    options: [
      { value: "solo",   label: "Solo",      emoji: "🧑" },
      { value: "group",  label: "En groupe", emoji: "👥" },
      { value: "family", label: "En famille", emoji: "👨‍👩‍👧‍👦" },
    ],
  },
  {
    key: "community" as const,
    title: "Communauté (optionnel)",
    description: "SoliMouv' est un espace sûr. Souhaitez-vous préciser si vous appartenez à l'une de ces communautés ?",
    tooltip: "Cette information est strictement confidentielle. Elle sert uniquement au matching pour vous orienter vers des associations spécialisées et bienveillantes.",
    optional: true,
    options: [
      { value: "lgbtqia",    label: "LGBTQIA+",                         emoji: "🏳️‍🌈" },
      { value: "refugee",    label: "Réfugié·e",                        emoji: "🌍" },
      { value: "disability", label: "Personne en situation de handicap", emoji: "♿" },
      { value: "senior",     label: "Senior",                           emoji: "🧓" },
      { value: "none",       label: "Je préfère ne pas préciser",       emoji: "🤝" },
    ],
  },
] as const;

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={TOTAL_STEPS}>
      {Array.from({ length: TOTAL_STEPS }, (_, i) => (
        <div key={i} className={`h-2 rounded-full transition-all ${
          i < current ? "w-8 bg-brand-primary" : i === current ? "w-8 bg-brand-primary/60" : "w-4 bg-gray-200"
        }`} />
      ))}
    </div>
  );
}

function OptionCard({ label, emoji, selected, onClick }: { label: string; emoji: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex min-h-[72px] w-full items-center gap-4 rounded-xl border-2 px-5 py-4 text-left text-base font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
        selected
          ? "border-brand-primary bg-brand-primary/10 shadow-md"
          : "border-gray-200 bg-white hover:border-brand-primary/40 hover:bg-gray-50"
      }`}
      aria-pressed={selected}
    >
      <span className="text-2xl" aria-hidden="true">{emoji}</span>
      <span className="flex-1 text-brand-dark">{label}</span>
      {selected && <Check className="h-5 w-5 text-brand-primary shrink-0" />}
    </button>
  );
}

export function SportQuiz({ onComplete }: SportQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({ sport: "", level: "", situation: "", dynamic: "", community: "" });
  const [showTooltip, setShowTooltip] = useState(false);

  const currentStep = steps[step];
  const canNext = ("optional" in currentStep && currentStep.optional) || answers[currentStep.key] !== "";

  const handleNext = () => step < TOTAL_STEPS - 1 ? setStep(step + 1) : onComplete(answers);
  const handlePrev = () => step > 0 && setStep(step - 1);
  const handleSkip = () => step < TOTAL_STEPS - 1 ? setStep(step + 1) : onComplete(answers);

  return (
    <section className="mx-auto max-w-lg px-4 py-8" aria-label="Quiz sport">
      <h2 className="font-heading text-2xl font-bold text-center text-brand-dark mb-2">
        Quel sport est fait pour toi ?
      </h2>

      <StepIndicator current={step} />

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-brand-dark flex items-center gap-2">
          {currentStep.title}
          {"tooltip" in currentStep && currentStep.tooltip && (
            <div className="relative">
              <button onClick={() => setShowTooltip(!showTooltip)} className="text-gray-400 hover:text-brand-primary" aria-label="Informations sur la confidentialité">
                <Info className="h-4 w-4" />
              </button>
              {showTooltip && (
                <div className="absolute left-0 top-6 z-10 w-64 rounded-xl bg-brand-dark p-3 text-xs text-white shadow-xl">
                  {"tooltip" in currentStep && currentStep.tooltip}
                </div>
              )}
            </div>
          )}
        </h3>
        {"description" in currentStep && currentStep.description && (
          <p className="mt-1 text-sm text-gray-500">{currentStep.description}</p>
        )}
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {currentStep.options.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            emoji={option.emoji}
            selected={answers[currentStep.key] === option.value}
            onClick={() => setAnswers({ ...answers, [currentStep.key]: option.value })}
          />
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        <button onClick={handlePrev} disabled={step === 0} className="flex items-center gap-1 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed">
          <ChevronLeft className="h-4 w-4" /> Précédent
        </button>

        <div className="flex items-center gap-2">
          {"optional" in currentStep && currentStep.optional && (
            <button onClick={handleSkip} className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-100">
              Passer
            </button>
          )}
          <button onClick={handleNext} disabled={!canNext} className="btn-primary flex items-center gap-1 disabled:opacity-40">
            {step === TOTAL_STEPS - 1 ? "Voir mes résultats" : "Suivant"}
            {step < TOTAL_STEPS - 1 && <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </section>
  );
}
