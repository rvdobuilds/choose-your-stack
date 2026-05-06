"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS, TOTAL_QUESTIONS } from "@/lib/questions";
import { useAssessment } from "@/lib/assessment-context";
import { QuestionCard } from "./QuestionCard";

export function Questionnaire() {
  const router = useRouter();
  const { answers, answeredCount, select, reset } = useAssessment();
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
      router.push("/result");
      return;
    }
    setCurrentIndex((prev) => Math.min(TOTAL_QUESTIONS - 1, prev + 1));
  };

  const handleReset = () => {
    reset();
    setCurrentIndex(0);
  };

  return (
    <section aria-labelledby="framework-heading">
      <header>
        <p className="cys-eyebrow">Framework</p>
        <h2
          id="framework-heading"
          className="cys-text mt-2 text-[1.4rem] font-semibold leading-tight sm:text-[2rem]"
        >
          Workload-fit assessment
        </h2>
        <p className="cys-text-muted mt-2 max-w-2xl text-sm leading-6 sm:mt-3 sm:text-base sm:leading-7">
          Answer twelve workload, capability, and cost-model questions. One
          at a time. The recommendation appears after completion.
        </p>
      </header>

      <div className="mt-5 sm:mt-6">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs">
          <span className="cys-text-subtle">
            Question {currentIndex + 1} of {TOTAL_QUESTIONS} ·{" "}
            {answeredCount} of {TOTAL_QUESTIONS} answered
          </span>
          <span className="cys-text-faint">
            {answeredCount < TOTAL_QUESTIONS
              ? "Assessment in progress"
              : "All questions answered"}
          </span>
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
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          {answeredCount < TOTAL_QUESTIONS ? (
            <p className="cys-text-faint text-xs leading-5">
              Answer all questions to generate a platform-direction
              recommendation.
            </p>
          ) : (
            <span aria-hidden />
          )}
          <button
            type="button"
            onClick={handleReset}
            className="cys-text-faint -mx-1 rounded-md px-1 py-1 text-xs underline-offset-4 hover:underline focus-visible:underline"
          >
            Start over
          </button>
        </div>
      </div>

      <div className="mt-5 sm:mt-6">
        <QuestionCard
          question={currentQuestion}
          selectedAnswerId={selectedAnswerId}
          onSelect={select}
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
