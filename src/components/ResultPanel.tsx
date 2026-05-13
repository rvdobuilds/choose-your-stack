"use client";

import { useId, useState, type ReactNode } from "react";
import Link from "next/link";
import type { AssessmentResult } from "@/lib/types";
import { TOTAL_QUESTIONS } from "@/lib/questions";
import {
  EXECUTIVE_SUMMARY,
  LOW_SIGNAL_QUALITY_NOTE,
  NEXT_CHECKS,
  RESULT_DISCLAIMER,
  SCORE_BREAKDOWN_INTRO,
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
        <h1
          id="result-heading"
          className="cys-text text-[1.4rem] font-semibold leading-tight sm:text-[2rem]"
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
    </div>
  );
}

function ResultMemo({ result }: { result: AssessmentResult }) {
  const summary = EXECUTIVE_SUMMARY[result.type];

  return (
    <>
      {/* Compact recommendation summary */}
      <div className="cys-card-elevated px-4 py-5 sm:px-8 sm:py-7">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          <SummaryCell label="Recommended direction" emphasis>
            {result.label}
          </SummaryCell>
          <SummaryCell label="Why">{summary.reason}</SummaryCell>
          <SummaryCell label="Main validation">{summary.validation}</SummaryCell>
          <SummaryCell label="Signal quality">
            <span>{result.signalQuality}</span>
            {result.signalQuality === "Low" ? (
              <span className="cys-text-subtle mt-2 block text-xs leading-5">
                {LOW_SIGNAL_QUALITY_NOTE}
              </span>
            ) : null}
          </SummaryCell>
        </div>
        {result.hardGateApplied ? (
          <p className="cys-text-faint mt-4 text-[0.7rem] uppercase tracking-[0.16em]">
            Decisive workload signal applied
          </p>
        ) : null}
      </div>

      {/* Next checks — open by default */}
      <section aria-label="Next checks" className="mt-8 sm:mt-10">
        <h2 className="cys-eyebrow">Next checks</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {NEXT_CHECKS[result.type].map((item) => (
            <BulletItem key={item}>{item}</BulletItem>
          ))}
        </ul>
      </section>

      {/* Collapsible detail disclosures */}
      <div className="mt-8 flex flex-col gap-2 sm:mt-10">
        <Disclosure title="Why this direction fits">
          <ul className="flex flex-col gap-2.5">
            {result.whyItFits.map((item) => (
              <BulletItem key={item}>{item}</BulletItem>
            ))}
          </ul>
        </Disclosure>

        <Disclosure title="Main trade-offs">
          <ul className="flex flex-col gap-2.5">
            {result.tradeOffs.map((item) => (
              <BulletItem key={item}>{item}</BulletItem>
            ))}
          </ul>
        </Disclosure>

        <Disclosure title="Validation questions before final decision">
          <ul className="flex flex-col gap-2.5">
            {result.validationQuestions.map((item) => (
              <BulletItem key={item}>{item}</BulletItem>
            ))}
          </ul>
        </Disclosure>

        <Disclosure title="What would change this recommendation?">
          <ul className="flex flex-col gap-2.5">
            {WHAT_WOULD_CHANGE[result.type].map((item) => (
              <BulletItem key={item}>{item}</BulletItem>
            ))}
          </ul>
        </Disclosure>

        <Disclosure title="Cost model implication">
          <p className="cys-text-soft text-sm leading-7">
            {result.costModelImplication}
          </p>
        </Disclosure>

        <Disclosure title="How the recommendation was built">
          <ScoringDetails result={result} />
        </Disclosure>
      </div>

      {/* Disclaimer */}
      <p className="cys-text-subtle mt-8 max-w-2xl text-sm leading-6 sm:mt-10">
        {RESULT_DISCLAIMER}
      </p>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
        <Link
          href="/detailed-assessment"
          className="cys-button-primary inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium sm:h-12"
        >
          Retake detailed assessment
        </Link>
        <Link
          href="/quick-scan"
          className="cys-button-secondary inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium sm:h-12"
        >
          Start quick scan
        </Link>
        <Link
          href="/cost-model"
          className="cys-button-ghost inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium sm:h-12"
        >
          View cost model
        </Link>
      </div>
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

function ScoringDetails({ result }: { result: AssessmentResult }) {
  const tableId = useId();
  const indexId = useId();
  const [showTable, setShowTable] = useState(false);
  const [showIndex, setShowIndex] = useState(false);

  return (
    <div>
      <dl className="grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="cys-eyebrow">Primary fit</dt>
          <dd className="cys-text-soft mt-1 text-sm font-medium">
            {result.label}
          </dd>
        </div>
        <div>
          <dt className="cys-eyebrow">Recommendation strength</dt>
          <dd className="cys-text-soft mt-1 text-sm font-medium">
            {result.recommendationStrength}
          </dd>
        </div>
        <div>
          <dt className="cys-eyebrow">Signal quality</dt>
          <dd className="cys-text-soft mt-1 text-sm font-medium">
            {result.signalQuality}
          </dd>
        </div>
        <div>
          <dt className="cys-eyebrow">Rule-based override</dt>
          <dd className="cys-text-soft mt-1 text-sm font-medium">
            {result.hardGateApplied ? "Yes" : "No"}
          </dd>
        </div>
      </dl>

      {result.hardGateApplied && result.hardGateExplanation ? (
        <p className="cys-text-subtle mt-4 text-sm leading-6">
          {result.hardGateExplanation}
        </p>
      ) : (
        <p className="cys-text-subtle mt-4 text-sm leading-6">
          No rule-based override triggered. Result derived from the weighted
          workload signals.
        </p>
      )}

      <p className="cys-text-subtle mt-3 text-xs leading-5">
        {SCORE_BREAKDOWN_INTRO}
      </p>

      <div className="mt-4">
        <button
          type="button"
          aria-expanded={showTable}
          aria-controls={tableId}
          onClick={() => setShowTable((o) => !o)}
          className="cys-button-secondary inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium"
        >
          {showTable ? "Hide scoring details" : "View scoring details"}
        </button>
      </div>

      {showTable ? (
        <div id={tableId} className="mt-5">
          <div className="hidden grid-cols-[1.4fr_1.4fr_minmax(8rem,0.85fr)_minmax(4rem,0.4fr)] gap-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] cys-text-faint sm:grid">
            <span>Axis</span>
            <span>Selected answer</span>
            <span>Signal direction</span>
            <span className="text-right">Weight</span>
          </div>
          <ul className="border-t cys-border-soft">
            {result.breakdown.map((row, idx) => (
              <li
                key={row.questionId}
                className={`py-4 sm:grid sm:grid-cols-[1.4fr_1.4fr_minmax(8rem,0.85fr)_minmax(4rem,0.4fr)] sm:items-center sm:gap-4 ${
                  idx === 0 ? "" : "border-t cys-border-soft"
                }`}
              >
                <div>
                  <p className="cys-text-soft text-sm font-medium">
                    {row.questionTitle}
                  </p>
                  <p className="cys-text-faint mt-1 text-xs sm:hidden">
                    Weight {row.weight}
                  </p>
                </div>
                <p className="cys-text-muted mt-2 text-sm leading-6 sm:mt-0">
                  {row.selectedAnswerLabel}
                </p>
                <p className="cys-text-subtle mt-2 text-xs sm:mt-0 sm:text-sm">
                  {row.signalLabel}
                </p>
                <p className="cys-text-subtle mt-2 text-xs sm:mt-0 sm:text-right sm:text-sm tabular-nums">
                  <span className="sm:hidden">Weight </span>
                  {row.weight}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t cys-border-soft pt-4">
            <button
              type="button"
              aria-expanded={showIndex}
              aria-controls={indexId}
              onClick={() => setShowIndex((o) => !o)}
              className="cys-link inline-flex h-9 items-center text-sm underline-offset-4 hover:underline"
            >
              {showIndex
                ? "Hide internal fit index"
                : "Show internal fit index"}
            </button>
            {showIndex ? (
              <div id={indexId} className="mt-4">
                <p className="cys-text-subtle text-xs leading-6">
                  Internal fit index is an unsigned model input. It is used to
                  band the recommendation, not to rank platforms by quality.
                  Negative values reflect business/process-heavy signals;
                  positive values reflect technical/platform-heavy signals.
                </p>
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <dt className="cys-eyebrow">Internal fit index</dt>
                    <dd className="cys-text-soft mt-1 text-sm tabular-nums">
                      {result.score > 0 ? `+${result.score}` : result.score}
                    </dd>
                  </div>
                  <div>
                    <dt className="cys-eyebrow">Default band result</dt>
                    <dd className="cys-text-soft mt-1 text-sm">
                      {bandLabel(result.baseType)}
                    </dd>
                  </div>
                </dl>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function bandLabel(type: AssessmentResult["baseType"]): string {
  switch (type) {
    case "mendix":
      return "Mendix candidate";
    case "aws-native":
      return "AWS-native candidate";
    case "hybrid":
      return "Hybrid candidate";
  }
}
