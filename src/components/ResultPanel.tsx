import Link from "next/link";
import type { AssessmentResult } from "@/lib/types";
import { TOTAL_QUESTIONS } from "@/lib/questions";
import {
  EXECUTIVE_SUMMARY,
  LOW_SIGNAL_QUALITY_NOTE,
  RESULT_DISCLAIMER,
  WHAT_WOULD_CHANGE,
} from "@/lib/result-copy";

type Props = {
  result: AssessmentResult | null;
  answeredCount: number;
};

export function ResultPanel({ result, answeredCount }: Props) {
  return (
    <section aria-labelledby="result-heading">
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
    <div className="cys-card-elevated px-4 py-6 sm:px-12 sm:py-14">
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
      <div className="mt-5 sm:mt-6">
        <Link
          href="/framework"
          className="cys-button-primary inline-flex h-11 min-w-[12rem] items-center justify-center rounded-full px-6 text-sm font-medium sm:h-12"
        >
          Start assessment
        </Link>
      </div>
      <p className="cys-text-subtle mt-5 max-w-2xl text-sm leading-6 sm:mt-6">
        {RESULT_DISCLAIMER}
      </p>
    </div>
  );
}

function ExecutiveSummary({ result }: { result: AssessmentResult }) {
  const summary = EXECUTIVE_SUMMARY[result.type];
  return (
    <section
      aria-label="Executive summary"
      className="cys-card-elevated mb-4 px-4 py-5 sm:mb-5 sm:px-10 sm:py-8"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        <div>
          <p className="cys-eyebrow">Recommendation</p>
          <p className="cys-text mt-2 text-lg font-semibold leading-snug sm:text-xl">
            {result.label}
          </p>
        </div>
        <div>
          <p className="cys-eyebrow">Reason</p>
          <p className="cys-text-muted mt-2 text-sm leading-6">
            {summary.reason}
          </p>
        </div>
        <div>
          <p className="cys-eyebrow">Main validation</p>
          <p className="cys-text-muted mt-2 text-sm leading-6">
            {summary.validation}
          </p>
        </div>
        <div>
          <p className="cys-eyebrow">Signal quality</p>
          <p className="cys-text-muted mt-2 text-sm leading-6">
            {result.signalQuality}
          </p>
          {result.signalQuality === "Low" ? (
            <p className="cys-text-subtle mt-2 text-sm leading-6">
              {LOW_SIGNAL_QUALITY_NOTE}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ResultMemo({ result }: { result: AssessmentResult }) {
  return (
    <>
      <ExecutiveSummary result={result} />
      <article className="cys-card-elevated px-4 py-6 sm:px-12 sm:py-12">
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <span className="cys-pill inline-flex h-7 items-center px-3 text-xs uppercase tracking-[0.16em]">
            Recommendation
          </span>
          {result.hardGateApplied && (
            <span className="cys-text-faint text-[0.7rem] uppercase tracking-[0.18em]">
              Decisive workload signal
            </span>
          )}
        </div>

        <h3 className="cys-text mt-3 text-[1.5rem] font-semibold leading-tight sm:mt-5 sm:text-[2.25rem]">
          {result.label}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 sm:mt-4">
          <div>
            <p className="cys-eyebrow">Recommendation strength</p>
            <p className="cys-text-soft mt-1 text-sm font-medium">
              {result.recommendationStrength}
            </p>
          </div>
          <div>
            <p className="cys-eyebrow">Basis</p>
            <p className="cys-text-subtle mt-1 text-sm">
              Weighted workload signals{result.hardGateApplied ? " and decisive workload rules" : ""}.
            </p>
          </div>
        </div>

        <p className="cys-text-soft mt-3 max-w-3xl text-base leading-7 sm:mt-5 sm:text-[1.05rem] sm:leading-8">
          {result.recommendation}
        </p>

        {result.hardGateApplied && result.hardGateExplanation && (
          <p className="cys-text-muted mt-3 max-w-3xl text-sm leading-6">
            {result.hardGateExplanation}
          </p>
        )}

        <p className="cys-text-muted mt-3 max-w-3xl text-sm leading-6">
          {result.closingNote}
        </p>

        <p className="cys-text-subtle mt-4 max-w-3xl text-sm leading-6 sm:mt-5">
          {RESULT_DISCLAIMER}
        </p>

        <hr className="cys-divider mt-5 sm:mt-8" />

        <div className="mt-5 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6">
          <MemoSection title="Why this direction fits" items={result.whyItFits} />
          <MemoSection title="Main trade-offs" items={result.tradeOffs} />
        </div>

        <div className="mt-4 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6">
          <MemoSection
            title="Validation questions before final decision"
            items={result.validationQuestions}
          />
          <div className="cys-card-muted px-4 py-4 sm:px-5 sm:py-5">
            <p className="cys-eyebrow">Cost model implication</p>
            <p className="cys-text-soft mt-3 text-sm leading-6">
              {result.costModelImplication}
            </p>
          </div>
        </div>
      </article>

      <section
        aria-labelledby="what-would-change-heading"
        className="cys-card-muted mt-4 px-4 py-5 sm:mt-5 sm:px-8 sm:py-7"
      >
        <h3
          id="what-would-change-heading"
          className="cys-text text-base font-semibold leading-snug sm:text-lg"
        >
          What would change this recommendation?
        </h3>
        <ul className="mt-3 flex flex-col gap-2.5">
          {WHAT_WOULD_CHANGE[result.type].map((item) => (
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
      </section>
    </>
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
