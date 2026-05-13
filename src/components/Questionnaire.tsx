"use client";

import { useRouter } from "next/navigation";
import { QUESTIONS, TOTAL_QUESTIONS } from "@/lib/questions";
import { useAssessment } from "@/lib/assessment-context";
import { QuestionCard } from "./QuestionCard";

export function Questionnaire() {
  const router = useRouter();
  const {
    answers,
    answeredCount,
    select,
    reset,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    storageHydrated,
  } = useAssessment();

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const selectedAnswerId = answers[currentQuestion.id];
  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === TOTAL_QUESTIONS - 1;

  const progress = Math.round(
    ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100,
  );

  const handleBack = () => {
    if (isFirst) return;
    setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
  };

  const handleNext = () => {
    if (!selectedAnswerId) return;
    if (isLast) {
      router.push("/result");
      return;
    }
    setCurrentQuestionIndex(
      Math.min(TOTAL_QUESTIONS - 1, currentQuestionIndex + 1),
    );
  };

  const handleReset = () => {
    reset();
    router.replace("/detailed-assessment");
  };

  if (!storageHydrated) {
    return (
      <section aria-labelledby="assessment-heading" aria-busy="true">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2
            id="assessment-heading"
            className="cys-text text-base font-semibold"
          >
            Detailed assessment
            <span className="cys-text-faint ml-2 text-sm font-normal">
              · Question 1 of {TOTAL_QUESTIONS}
            </span>
          </h2>
          <span className="cys-text-faint text-[0.7rem]">
            Saved locally in this browser.
          </span>
        </div>
        <p className="cys-text-subtle mt-4 text-sm leading-6">
          Restoring assessment…
        </p>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="assessment-heading"
      className="mx-auto max-w-[960px]"
    >
      {/* Compact header row */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h2 id="assessment-heading" className="cys-text text-base font-semibold">
          Detailed assessment
          <span className="cys-text-faint ml-2 text-sm font-normal">
            · Question {currentQuestionIndex + 1} of {TOTAL_QUESTIONS}
          </span>
        </h2>
        <span className="cys-text-faint text-[0.7rem]">
          Saved locally in this browser.
        </span>
      </div>

      {/* Compact progress area */}
      <div className="mt-3">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <span className="cys-text-subtle text-xs">
            Question {currentQuestionIndex + 1} of {TOTAL_QUESTIONS} &middot;{" "}
            {answeredCount} of {TOTAL_QUESTIONS} answered
          </span>
          <div className="flex items-center gap-3">
            <span className="cys-text-faint text-xs">
              Assessment in progress.
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="cys-text-faint rounded-md px-0.5 text-xs underline-offset-4 hover:underline focus-visible:underline"
            >
              Reset
            </button>
          </div>
        </div>
        <div
          className="cys-progress-track mt-2 h-1"
          role="progressbar"
          aria-valuenow={currentQuestionIndex + 1}
          aria-valuemin={1}
          aria-valuemax={TOTAL_QUESTIONS}
          aria-label="Assessment progress"
        >
          <div
            className="cys-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="mt-4">
        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          selectedAnswerId={selectedAnswerId}
          onSelect={select}
        />
      </div>

      {/* Desktop action row */}
      <div className="mt-4 hidden items-center justify-between gap-3 sm:flex">
        <button
          type="button"
          onClick={handleBack}
          disabled={isFirst}
          className="cys-button-secondary inline-flex h-10 min-w-[5.5rem] items-center justify-center rounded-full px-5 text-sm font-medium"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedAnswerId}
          className="cys-button-primary inline-flex h-10 min-w-[8.5rem] items-center justify-center rounded-full px-5 text-sm font-medium"
        >
          {isLast ? "Finish" : "Next"}
        </button>
      </div>

      {/* Mobile sticky action bar */}
      <div
        className="fixed bottom-0 inset-x-0 z-10 flex items-center gap-3 border-t px-4 py-3 sm:hidden"
        style={{
          borderColor: "var(--color-border-muted)",
          background: "var(--color-page-elevated)",
        }}
      >
        <button
          type="button"
          onClick={handleBack}
          disabled={isFirst}
          className="cys-button-secondary inline-flex h-11 min-w-[5rem] items-center justify-center rounded-full px-4 text-sm font-medium"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedAnswerId}
          className="cys-button-primary inline-flex h-11 flex-1 items-center justify-center rounded-full px-5 text-sm font-medium"
        >
          {isLast ? "Finish" : "Next"}
        </button>
      </div>
      {/* Spacer so mobile sticky bar does not cover content */}
      <div className="h-20 sm:hidden" aria-hidden="true" />
    </section>
  );
}
