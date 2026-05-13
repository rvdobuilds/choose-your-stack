"use client";

import { useState } from "react";
import type { Question, QuestionId } from "@/lib/types";
import { TOTAL_QUESTIONS } from "@/lib/questions";

type Props = {
  question: Question;
  selectedAnswerId: string | undefined;
  onSelect: (questionId: QuestionId, answerId: string) => void;
};

export function QuestionCard({ question, selectedAnswerId, onSelect }: Props) {
  const [helpOpen, setHelpOpen] = useState(false);
  const groupName = `q-${question.id}`;
  const hasExamples = question.examples && question.examples.length > 0;
  const hasAnswerSubtext = question.answers.some((a) => a.description);

  return (
    <fieldset
      className={`cys-card px-4 sm:px-5 ${hasAnswerSubtext ? "py-2.5 sm:py-3" : "py-3 sm:py-4"}`}
    >
      <legend className="sr-only">{question.title}</legend>

      <p className="cys-eyebrow">
        Question {question.number} of {TOTAL_QUESTIONS}
      </p>

      <h3
        className={`cys-text text-[1.05rem] font-medium leading-snug sm:text-[1.2rem] ${hasAnswerSubtext ? "mt-1.5" : "mt-2"}`}
      >
        {question.title}
      </h3>

      {question.description ? (
        <p
          className={`cys-text-subtle max-w-2xl text-sm leading-5 ${hasAnswerSubtext ? "mt-1" : "mt-1.5"}`}
        >
          {question.description}
        </p>
      ) : null}

      {hasExamples ? (
        <div className={hasAnswerSubtext ? "mt-1.5" : "mt-2"}>
          <button
            type="button"
            aria-expanded={helpOpen}
            onClick={() => setHelpOpen(!helpOpen)}
            className="cys-text-faint text-xs underline-offset-4 hover:underline focus-visible:underline"
          >
            {helpOpen ? "Hide examples" : "Help me choose"}
          </button>
          {helpOpen ? (
            <dl className="mt-2.5 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
              {question.examples!.map((example) => (
                <div key={example.label} className="flex gap-2 text-xs leading-5">
                  <dt className="cys-text-soft min-w-[5rem] shrink-0 font-medium">
                    {example.label}
                  </dt>
                  <dd className="cys-text-subtle">{example.description}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      ) : null}

      <div
        role="radiogroup"
        aria-label={question.title}
        className={`flex flex-col ${hasAnswerSubtext ? "mt-2.5 gap-1" : "mt-3 gap-1.5"}`}
      >
        {question.answers.map((answer) => {
          const selected = selectedAnswerId === answer.id;
          const inputId = `${groupName}-${answer.id}`;
          const sub = answer.description;
          return (
            <label
              key={answer.id}
              htmlFor={inputId}
              data-selected={selected}
              className={`cys-answer flex min-h-[44px] cursor-pointer gap-3 px-3 sm:px-4 ${
                sub
                  ? "items-start py-2 sm:py-1.5"
                  : "items-center py-2.5 sm:py-2.5"
              }`}
            >
              <input
                id={inputId}
                type="radio"
                name={groupName}
                value={answer.id}
                checked={selected}
                onChange={() => onSelect(question.id, answer.id)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={`cys-answer-marker shrink-0 ${sub ? "mt-0.5" : ""}`}
              />
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="cys-text-soft text-[0.875rem] leading-snug">
                  {answer.label}
                </span>
                {sub ? (
                  <span className="cys-text-faint text-[0.72rem] leading-snug sm:text-[0.7rem]">
                    {sub}
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
