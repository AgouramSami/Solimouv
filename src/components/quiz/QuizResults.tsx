"use client";

import Link from "next/link";
import { Calendar, ArrowRight, Share2 } from "lucide-react";
import { FreeBadge } from "@/components/shared/FreeBadge";
import { SafeBadge } from "@/components/shared/SafeBadge";
import type { QuizAnswers } from "./SportQuiz";

interface Activity {
  name: string;
  time: string;
  association: string;
  tags: string[];
  emoji: string;
  safe?: boolean;
}

function getRecommendations(answers: QuizAnswers): Activity[] {
  const sportMap: Record<string, Activity[]> = {
    collective: [
      { name: "Football inclusif",  time: "10h-11h30", association: "Sport Pour Tou·tes", tags: ["Tous niveaux", "Mixte"],      emoji: "⚽" },
      { name: "Basket fauteuil",    time: "14h-15h30", association: "Handi'Sport 93",      tags: ["PMR", "Inclusif"],            emoji: "🏀" },
    ],
    individual: [
      { name: "Course solidaire",   time: "9h-10h",    association: "RunForAll",           tags: ["Plein air", "Non-compétitif"], emoji: "🏃" },
      { name: "Escalade initiation",time: "11h-12h30", association: "GrimpLib",             tags: ["Débutant·e"],                 emoji: "🧗" },
    ],
    combat: [
      { name: "Self-défense féministe", time: "10h30-12h", association: "BoxHer",       tags: ["Espace safe", "Femmes/NB"], emoji: "🥊", safe: true },
      { name: "Capoeira kids & adultes",time: "14h-15h",   association: "CapoFamille",  tags: ["Famille", "Tous âges"],     emoji: "🤸" },
    ],
    dance: [
      { name: "Danse afro-contemporaine", time: "11h-12h",    association: "DanseToi",       tags: ["Expression libre", "Tous niveaux"], emoji: "💃" },
      { name: "Voguing workshop",          time: "15h-16h30", association: "BallroomParis",  tags: ["LGBTQIA+", "Espace safe"],          emoji: "✨", safe: true },
    ],
    outdoor: [
      { name: "Randonnée urbaine",       time: "9h30-11h30", association: "MarcheCité",    tags: ["Famille", "PMR partiel"], emoji: "🌿" },
      { name: "Parcours nature adapté",  time: "14h-16h",    association: "NatureAccess",  tags: ["Handicap invisible"],     emoji: "🌳" },
    ],
    wellness: [
      { name: "Yoga doux en famille",    time: "10h-11h",  association: "YogaSoli", tags: ["Famille", "Calme", "PMR"], emoji: "🧘" },
      { name: "Méditation & mouvement",  time: "16h-17h",  association: "ZenMouv",  tags: ["Bien-être", "Tous niveaux"], emoji: "🕊️" },
    ],
  };

  const activities: Activity[] = [...(sportMap[answers.sport] ?? sportMap.collective!)];

  if (answers.community === "lgbtqia") {
    activities.push({ name: "Run Pride SoliMouv'", time: "17h-18h", association: "FièreSport", tags: ["LGBTQIA+", "Espace safe"], emoji: "🏳️‍🌈", safe: true });
  }
  if (answers.dynamic === "family") {
    activities.push({ name: "Parcours aventure familial", time: "13h-15h", association: "FamilAction", tags: ["Famille", "Enfants 3+"], emoji: "👨‍👩‍👧‍👦" });
  }

  return activities;
}

export function QuizResults({ answers, onReset }: { answers: QuizAnswers; onReset: () => void }) {
  const activities = getRecommendations(answers);

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({
        title: "Mes activités SoliMouv'",
        text: `J'ai trouvé ${activities.length} activités qui me correspondent au Festival SoliMouv' ! 🏃‍♀️`,
        url: window.location.origin,
      });
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-8" aria-label="Tes recommandations">
      <div className="text-center mb-8">
        <div className="mb-4 text-5xl">🎉</div>
        <h2 className="font-heading text-2xl font-bold text-brand-dark">Tes recommandations</h2>
        <p className="mt-2 text-gray-500">Voici les activités qui te correspondent le mieux !</p>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        {activities.map((activity, i) => (
          <div key={i} className="card border-2 border-gray-100 hover:border-brand-primary/30 transition-colors">
            <div className="flex items-start gap-4">
              <span className="text-3xl" aria-hidden="true">{activity.emoji}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-brand-dark">{activity.name}</h3>
                <p className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  {activity.time}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  par <span className="font-medium text-brand-primary">{activity.association}</span>
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {activity.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <FreeBadge />
              {activity.safe && <SafeBadge />}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <button onClick={handleShare} className="btn-secondary flex items-center gap-2">
          <Share2 className="h-4 w-4" /> Partager
        </button>
        <Link href="/programme" className="btn-primary flex items-center gap-2">
          Voir tout le programme <ArrowRight className="h-4 w-4" />
        </Link>
        <button onClick={onReset} className="text-sm text-gray-400 hover:text-gray-600">
          Refaire le quiz
        </button>
      </div>
    </section>
  );
}
