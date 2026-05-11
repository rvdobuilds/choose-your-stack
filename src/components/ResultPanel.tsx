"use client";

import { useId, useState, type ReactNode } from "react";
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
        <h1
          id="result-heading"
          className="cys-text mt-2 text-[1.4rem] font-semibold leading-tight sm:text-[2rem]"
        >
          Workload-fit recommendation
        </h1>
        {result ? (
          <p className="cys-text-faint mt-2 text-xs leading-5">
            Saved locally in this browser.
          </p>
        ) : null}
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
      <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:items-center sm:gap-3">
        <Link
          href="/detailed-assessment"
          className="cys-button-primary inline-flex h-11 min-w-[12rem] items-center justify-center rounded-full px-6 text-sm font-medium sm:h-12"
        >
          Start detailed assessment
        </Link>
        <Link
          href="/quick-scan"
          className="cys-button-secondary inline-flex h-11 min-w-[12rem] items-center justify-center rounded-full px-6 text-sm font-medium sm:h-12"
        >
          Start quick scan
        </Link>
      </div>
      <p className="cys-text-subtle mt-5 max-w-2xl text-sm leading-6 sm:mt-6">
        {RESULT_DISCLAIMER}
      </p>
    </div>
  );
}

function ResultMemo({ result }: { result: AssessmentResult }) {
  const summary = EXECUTIVE_SUMMARY[result.type];
  return (
    <>
      <section
        aria-label="Executive summary"
        className="cys-card-elevated px-4 py-5 sm:px-10 sm:py-8"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          <SummaryCell label="Recommendation" emphasis>
            {result.label}
          </SummaryCell>
          <SummaryCell label="Reason">{summary.reason}</SummaryCell>
          <SummaryCell label="Main validation">
            {summary.validation}
          </SummaryCell>
          <SummaryCell label="Signal quality">
            <span>{result.signalQuality}</span>
            {result.signalQuality === "Low" ? (
              <span className="cys-text-subtle mt-2 block text-sm leading-6">
                {LOW_SIGNAL_QUALITY_NOTE}
              </span>
            ) : null}
          </SummaryCell>
        </div>
        <p className="cys-text-soft mt-5 max-w-3xl text-sm leading-7 sm:mt-6 sm:text-base">
          Recommended direction:{" "}
          <span className="cys-text font-medium">{result.label}</span>
        </p>
      </section>

      <article className="mt-6 sm:mt-8">
        <header>
          <p className="cys-eyebrow">Recommended direction</p>
          <h2 className="cys-text mt-2 text-[1.4rem] font-semibold leading-tight sm:text-[1.9rem]">
            {result.label}
          </h2>
          {result.hardGateApplied ? (
            <p className="cys-text-faint mt-2 text-[0.7rem] uppercase tracking-[0.18em]">
              Decisive workload signal
            </p>
          ) : null}
        </header>

        <p className="cys-text-soft mt-5 max-w-3xl text-base leading-7 sm:text-[1.05rem] sm:leading-8">
          {result.recommendation}
        </p>

        {result.hardGateApplied && result.hardGateExplanation ? (
          <p className="cys-text-muted mt-3 max-w-3xl text-sm leading-6">
            {result.hardGateExplanation}
          </p>
        ) : null}

        <p className="cys-text-muted mt-3 max-w-3xl text-sm leading-6">
          {result.closingNote}
        </p>

        <p className="cys-text-subtle mt-4 max-w-3xl text-sm leading-6 sm:mt-5">
          {RESULT_DISCLAIMER}
        </p>

        <hr className="cys-divider mt-8 sm:mt-10" />

        <div className="mt-8 grid gap-8 sm:mt-10 sm:grid-cols-2 sm:gap-10">
          <MemoSection
            title="Why this direction fits"
            items={result.whyItFits}
          />
          <MemoSection
            title="Main trade-offs"
            items={result.tradeOffs}
          />
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:mt-12">
          <Disclosure title="Validation questions before final decision">
            <ul className="flex flex-col gap-2.5">
              {result.validationQuestions.map((item) => (
                <BulletItem key={item}>{item}</BulletItem>
              ))}
            </ul>
            <p className="cys-eyebrow mt-6">Cost model implication</p>
            <p className="cys-text-soft mt-3 text-sm leading-7">
              {result.costModelImplication}
            </p>
          </Disclosure>

          <Disclosure title="What would change this recommendation?">
            <ul className="flex flex-col gap-2.5">
              {WHAT_WOULD_CHANGE[result.type].map((item) => (
                <BulletItem key={item}>{item}</BulletItem>
              ))}
            </ul>
          </Disclosure>
        </div>
      </article>
    </>
  );
}

function SummaryCell({
  label,
  emphasis,
  children,
}: {
  label: string;
  emphasis?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="cys-eyebrow">{label}</p>
      <p
        className={
          emphasis
            ? "cys-text mt-2 text-lg font-semibold leading-snug sm:text-xl"
            : "cys-text-muted mt-2 text-sm leading-6"
        }
      >
        {children}
      </p>
    </div>
  );
}

function MemoSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="cys-text text-base font-semibold leading-snug sm:text-lg">
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {items.map((item) => (
          <BulletItem key={item}>{item}</BulletItem>
        ))}
      </ul>
    </div>
  );
}

function BulletItem({ children }: { children: ReactNode }) {
  return (
    <li className="cys-text-soft flex gap-3 text-sm leading-6">
      <span
        aria-hidden
        className="cys-text-faint mt-2 inline-block h-px w-3 flex-shrink-0 bg-current"
      />
      <span>{children}</span>
    </li>
  );
}

function Disclosure({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <div className="cys-card-muted px-4 py-4 sm:px-6 sm:py-5">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="cys-text text-sm font-medium sm:text-base">
          {title}
        </span>
        <span aria-hidden className="cys-text-faint text-xs">
          {open ? "Hide" : "Show"}
        </span>
      </button>
      {open ? (
        <div id={id} className="mt-5">
          {children}
        </div>
      ) : null}
    </div>
  );
}
