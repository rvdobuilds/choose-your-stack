import type { Question, QuestionId } from "@/lib/types";
import { TOTAL_QUESTIONS } from "@/lib/questions";

type Props = {
  question: Question;
  selectedAnswerId: string | undefined;
  onSelect: (questionId: QuestionId, answerId: string) => void;
};

export function QuestionCard({ question, selectedAnswerId, onSelect }: Props) {
  const groupName = `q-${question.id}`;
  return (
    <fieldset className="cys-card px-4 py-4 sm:px-8 sm:py-8">
      <legend className="sr-only">{question.title}</legend>

      <div className="flex items-baseline justify-between gap-4">
        <p className="cys-eyebrow">
          Question {question.number} of {TOTAL_QUESTIONS}
        </p>
      </div>

      <h3 className="cys-text mt-3 text-[1.2rem] font-medium leading-snug sm:mt-4 sm:text-[1.4rem]">
        {question.title}
      </h3>
      {question.description ? (
        <p className="cys-text-subtle mt-2 max-w-2xl text-sm leading-6">
          {question.description}
        </p>
      ) : null}

      <div
        role="radiogroup"
        aria-label={question.title}
        className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:gap-3"
      >
        {question.answers.map((answer) => {
          const selected = selectedAnswerId === answer.id;
          const inputId = `${groupName}-${answer.id}`;
          return (
            <label
              key={answer.id}
              htmlFor={inputId}
              data-selected={selected}
              className="cys-answer flex min-h-[56px] cursor-pointer items-start gap-3 px-4 py-3 sm:min-h-[64px] sm:items-center sm:gap-4 sm:px-5 sm:py-4"
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
              <span aria-hidden className="cys-answer-marker mt-1 sm:mt-0" />
              <span className="flex-1 text-[0.95rem] leading-6 cys-text-soft">
                {answer.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
