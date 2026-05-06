"use client";

import { useCallback, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { HeroPanel } from "@/components/HeroPanel";
import { Questionnaire } from "@/components/Questionnaire";
import { ResultPanel } from "@/components/ResultPanel";
import { ScoreBreakdown } from "@/components/ScoreBreakdown";
import { CostModel } from "@/components/CostModel";
import { DecisionCaveats } from "@/components/DecisionCaveats";
import { Footer } from "@/components/Footer";
import {
  answeredCount as countAnswered,
  calculateResult,
  liveSignal,
} from "@/lib/scoring";
import type { AssessmentAnswers, QuestionId } from "@/lib/types";

export default function Home() {
  const [answers, setAnswers] = useState<AssessmentAnswers>({});

  const handleSelect = useCallback(
    (questionId: QuestionId, answerId: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
    },
    []
  );

  const handleReset = useCallback(() => {
    setAnswers({});
  }, []);

  const handleComplete = useCallback(() => {
    if (typeof window === "undefined") return;
    const target = document.getElementById("result");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const result = useMemo(() => calculateResult(answers), [answers]);
  const answered = useMemo(() => countAnswered(answers), [answers]);
  const signal = useMemo(() => liveSignal(answers), [answers]);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1120px] px-5 pb-16 sm:px-8 sm:pb-24">
          <HeroPanel />
          <Questionnaire
            answers={answers}
            onSelect={handleSelect}
            onReset={handleReset}
            onComplete={handleComplete}
            answeredCount={answered}
            signalLabel={signal.label}
          />
          <ResultPanel result={result} answeredCount={answered} />
          <ScoreBreakdown result={result} />
          <CostModel />
          <DecisionCaveats />
        </div>
      </main>
      <Footer />
    </>
  );
}
