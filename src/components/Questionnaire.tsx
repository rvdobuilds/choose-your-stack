"use client";

import { useState } from "react";
import { QUESTIONS, TOTAL_QUESTIONS } from "@/lib/questions";
import type { AssessmentAnswers, QuestionId } from "@/lib/types";
import { QuestionCard } from "./QuestionCard";

type Props = {
  answers: AssessmentAnswers;
  onSelect: (questionId: QuestionId, answerId: string) => void;
  onReset: () => void;
  onComplete: () => void;
  answeredCount: number;
  signalLabel: string;
};

export function Questionnaire({
  answers,
  onSelect,
  onReset,
  onComplete,
  answeredCount,
  signalLabel,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = QUESTIONS[currentIndex];
  const selectedAnswerId = answers[currentQuestion.id];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === TOTAL_QUESTIONS - 1;

  const progress = Math.round(((currentIndex + 1) / TOTAL_QUESTIONS) * 100);

  const handleBack = () => {
    if (isFirst) return;
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (!selectedAnswerId) return;
    if (isLast) {
      onComplete();
      return;
    }
    setCurrentIndex((prev) => Math.min(TOTAL_QUESTIONS - 1, prev + 1));
  };

  const handleReset = () => {
    onReset();
    setCurrentIndex(0);
  };

  return (
    <section
      id="framework"
      aria-labelledby="framework-heading"
      className="mt-10 scroll-mt-20 sm:mt-20"
    >
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div>
          <p className="cys-eyebrow">Framework</p>
          <h2
            id="framework-heading"
            className="cys-text mt-2 text-[1.4rem] font-semibold leading-tight sm:text-[2rem]"
          >
            Workload-fit assessment
          </h2>
          <p className="cys-text-muted mt-2 max-w-2xl text-sm leading-6 sm:mt-3 sm:text-base sm:leading-7">
            Answer twelve workload, capability, and cost-model questions. One
            at a time. Scoring is deterministic and shown alongside the result.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="cys-button-ghost self-start rounded-full px-3 py-2 text-sm sm:self-auto"
        >
          Start over
        </button>
      </header>

      <div className="mt-5 sm:mt-6">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs">
          <span className="cys-text-subtle">
            Question {currentIndex + 1} of {TOTAL_QUESTIONS} ·{" "}
            {answeredCount} of {TOTAL_QUESTIONS} answered
          </span>
          <span className="cys-text-faint">Current signal: {signalLabel}</span>
        </div>
        <div
          className="cys-progress-track mt-2 h-1.5"
          role="progressbar"
          aria-valuenow={currentIndex + 1}
          aria-valuemin={1}
          aria-valuemax={TOTAL_QUESTIONS}
          aria-label="Assessment progress"
        >
          <div className="cys-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        {answeredCount < TOTAL_QUESTIONS ? (
          <p className="cys-text-faint mt-3 text-xs leading-5">
            Answer all questions to generate a platform-direction
            recommendation.
          </p>
        ) : null}
      </div>

      <div className="mt-5 sm:mt-6">
        <QuestionCard
          question={currentQuestion}
          selectedAnswerId={selectedAnswerId}
          onSelect={onSelect}
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 sm:mt-6">
        <button
          type="button"
          onClick={handleBack}
          disabled={isFirst}
          className="cys-button-secondary inline-flex h-11 min-w-[6rem] items-center justify-center rounded-full px-5 text-sm font-medium sm:h-12"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedAnswerId}
          className="cys-button-primary inline-flex h-11 flex-1 items-center justify-center rounded-full px-5 text-sm font-medium sm:h-12 sm:flex-none sm:min-w-[10rem]"
        >
          {isLast ? "Finish" : "Next"}
        </button>
      </div>

      <p className="cys-text-faint mt-5 text-xs leading-6">
        Answers stay on this device. Final result may change as more answers
        are added.
      </p>
    </section>
  );
}
