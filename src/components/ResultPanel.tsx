import type { AssessmentResult } from "@/lib/types";
import { TOTAL_QUESTIONS } from "@/lib/questions";
import { RESULT_DISCLAIMER } from "@/lib/result-copy";

type Props = {
  result: AssessmentResult | null;
  answeredCount: number;
};

export function ResultPanel({ result, answeredCount }: Props) {
  return (
    <section
      id="result"
      aria-labelledby="result-heading"
      className="mt-12 scroll-mt-20 sm:mt-24"
    >
      <header>
        <p className="cys-eyebrow">Recommended direction</p>
        <h2
          id="result-heading"
          className="cys-text mt-2 text-[1.4rem] font-semibold leading-tight sm:text-[2rem]"
        >
          Workload-fit recommendation
        </h2>
      </header>

      <div className="mt-5 sm:mt-6">
        {result ? (
          <ResultMemo result={result} />
        ) : (
          <ResultPlaceholder answeredCount={answeredCount} />
        )}
      </div>
    </section>
  );
}

function ResultPlaceholder({ answeredCount }: { answeredCount: number }) {
  return (
    <div className="cys-card-elevated px-5 py-8 sm:px-12 sm:py-14">
      <span className="cys-pill inline-flex h-7 items-center px-3 text-xs">
        Awaiting answers
      </span>
      <p className="cys-text mt-4 max-w-2xl text-base leading-7 sm:mt-5 sm:text-xl sm:leading-8">
        Answer all questions to generate a platform-direction recommendation.
      </p>
      <p className="cys-text-muted mt-3 max-w-2xl text-sm leading-6">
        {answeredCount} of {TOTAL_QUESTIONS} answered. The result appears once
        all questions are complete.
      </p>
      <p className="cys-text-subtle mt-5 max-w-2xl text-sm leading-6 sm:mt-6">
        {RESULT_DISCLAIMER}
      </p>
    </div>
  );
}

function ResultMemo({ result }: { result: AssessmentResult }) {
  return (
    <article className="cys-card-elevated px-5 py-7 sm:px-12 sm:py-12">
      <div className="flex flex-wrap items-center gap-3">
        <span className="cys-pill inline-flex h-7 items-center px-3 text-xs uppercase tracking-[0.16em]">
          Recommendation
        </span>
        {result.hardGateApplied ? (
          <span className="cys-text-faint text-[0.7rem] uppercase tracking-[0.18em]">
            Hard gate applied
          </span>
        ) : null}
      </div>

      <h3 className="cys-text mt-4 text-[1.6rem] font-semibold leading-tight sm:mt-5 sm:text-[2.25rem]">
        {result.label}
      </h3>

      <p className="cys-text-soft mt-4 max-w-3xl text-base leading-7 sm:mt-5 sm:text-[1.05rem] sm:leading-8">
        {result.recommendation}
      </p>

      <p className="cys-text-muted mt-3 max-w-3xl text-sm leading-6">
        {result.closingNote}
      </p>

      <p className="cys-text-subtle mt-4 max-w-3xl text-sm leading-6 sm:mt-5">
        {RESULT_DISCLAIMER}
      </p>

      <hr className="cys-divider mt-6 sm:mt-8" />

      <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6">
        <MemoSection title="Why this direction fits" items={result.whyItFits} />
        <MemoSection title="Main trade-offs" items={result.tradeOffs} />
      </div>

      <div className="mt-4 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6">
        <MemoSection
          title="Validation questions before final decision"
          items={result.validationQuestions}
        />
        <div className="flex flex-col gap-4">
          <div className="cys-card-muted px-4 py-4 sm:px-5 sm:py-5">
            <p className="cys-eyebrow">Cost model implication</p>
            <p className="cys-text-soft mt-3 text-sm leading-6">
              {result.costModelImplication}
            </p>
          </div>
          <div className="cys-card-muted px-4 py-4 sm:px-5 sm:py-5">
            <p className="cys-eyebrow">Score</p>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="cys-text text-3xl font-semibold tabular-nums">
                {result.score > 0 ? `+${result.score}` : result.score}
              </span>
              <span className="cys-text-subtle text-xs">
                Bands: ≤ −20 Mendix · ≥ +20 AWS-native · between Hybrid
              </span>
            </div>
            {result.hardGateApplied ? (
              <p className="cys-text-muted mt-3 text-sm leading-6">
                <span className="cys-text-warm">Hard gate applied.</span>{" "}
                {result.hardGateReason}
              </p>
            ) : (
              <p className="cys-text-subtle mt-3 text-sm leading-6">
                No hard gate triggered. Result derived from the weighted score.
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function MemoSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="cys-card-muted px-4 py-4 sm:px-5 sm:py-5">
      <p className="cys-eyebrow">{title}</p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="cys-text-soft flex gap-3 text-sm leading-6"
          >
            <span
              aria-hidden
              className="cys-text-faint mt-2 inline-block h-px w-3 flex-shrink-0 bg-current"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
