"use client";

import { QUESTIONS, TOTAL_QUESTIONS } from "@/lib/questions";
import type { AssessmentAnswers, QuestionId } from "@/lib/types";
import { QuestionCard } from "./QuestionCard";

type Props = {
  answers: AssessmentAnswers;
  onSelect: (questionId: QuestionId, answerId: string) => void;
  onReset: () => void;
  answeredCount: number;
  leaning: "Mendix" | "AWS-native" | "Hybrid" | null;
};

export function Questionnaire({
  answers,
  onSelect,
  onReset,
  answeredCount,
  leaning,
}: Props) {
  const progress = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);

  return (
    <section
      id="framework"
      aria-labelledby="framework-heading"
      className="mt-12 sm:mt-20"
    >
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="cys-eyebrow">Framework</p>
          <h2
            id="framework-heading"
            className="cys-text mt-2 text-[1.6rem] font-semibold leading-tight sm:text-[2rem]"
          >
            Workload-fit assessment
          </h2>
          <p className="cys-text-muted mt-3 max-w-2xl text-sm leading-6 sm:text-base sm:leading-7">
            Answer the twelve workload, capability, and cost-model questions.
            Scoring is deterministic and shown alongside the result.
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="cys-button-ghost self-start rounded-full px-3 py-2 text-sm sm:self-auto"
        >
          Start over
        </button>
      </header>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-4 text-xs">
          <span className="cys-text-subtle">
            {answeredCount} of {TOTAL_QUESTIONS} answered
          </span>
          <span className="cys-text-faint">
            {leaning ? `Current signal: ${leaning} leaning` : "No signal yet"}
          </span>
        </div>
        <div
          className="cys-progress-track mt-2 h-1.5"
          role="progressbar"
          aria-valuenow={answeredCount}
          aria-valuemin={0}
          aria-valuemax={TOTAL_QUESTIONS}
          aria-label="Assessment progress"
        >
          <div className="cys-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-5">
        {QUESTIONS.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            selectedAnswerId={answers[question.id]}
            onSelect={onSelect}
          />
        ))}
      </div>

      <p className="cys-text-faint mt-6 text-xs leading-6">
        Answers stay on this device. Final result may change as more answers
        are added.
      </p>
    </section>
  );
}
