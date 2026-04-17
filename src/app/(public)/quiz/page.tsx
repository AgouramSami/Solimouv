"use client";

import { useState } from "react";
import { SportQuiz, type QuizAnswers } from "@/components/quiz/SportQuiz";
import { QuizResults } from "@/components/quiz/QuizResults";

export default function QuizPage() {
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);

  return (
    <div className="min-h-screen bg-brand-light py-8">
      {!answers ? (
        <SportQuiz onComplete={setAnswers} />
      ) : (
        <QuizResults answers={answers} onReset={() => setAnswers(null)} />
      )}
    </div>
  );
}
