"use client";

import { useId, useState } from "react";
import type { AssessmentResult } from "@/lib/types";
import { SCORE_BREAKDOWN_INTRO } from "@/lib/result-copy";

type Props = {
  result: AssessmentResult | null;
};

export function ScoreBreakdown({ result }: Props) {
  const detailsId = useId();
  const indexId = useId();
  const [open, setOpen] = useState(false);
  const [showIndex, setShowIndex] = useState(false);

  if (!result) return null;

  return (
    <section
      aria-labelledby="score-breakdown-heading"
      className="mt-10 sm:mt-16"
    >
      <header>
        <p className="cys-eyebrow">Score breakdown</p>
        <h2
          id="score-breakdown-heading"
          className="cys-text mt-2 text-[1.4rem] font-semibold leading-tight sm:text-[1.8rem]"
        >
          How the recommendation was built
        </h2>
        <p className="cys-text-muted mt-2 max-w-2xl text-sm leading-6 sm:mt-3 sm:text-base sm:leading-7">
          A compact summary first. Open the details to see how each axis
          contributed.
        </p>
      </header>

      <div className="cys-card-muted mt-5 px-5 py-5 sm:mt-6 sm:px-6 sm:py-6">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryItem label="Primary fit" value={result.label} />
          <SummaryItem
            label="Recommendation strength"
            value={result.recommendationStrength}
          />
          <SummaryItem label="Signal quality" value={result.signalQuality} />
          <SummaryItem
            label="Rule-based override"
            value={result.hardGateApplied ? "Yes" : "No"}
          />
        </dl>
        {result.hardGateApplied && result.hardGateExplanation ? (
          <p className="cys-text-subtle mt-4 text-sm leading-6">
            This recommendation is driven by a decisive workload signal.{" "}
            {result.hardGateExplanation}
          </p>
        ) : (
          <p className="cys-text-subtle mt-4 text-sm leading-6">
            No rule-based override triggered. Result derived from the weighted
            workload signals.
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={detailsId}
            onClick={() => setOpen((o) => !o)}
            className="cys-button-secondary inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium"
          >
            {open ? "Hide scoring details" : "View scoring details"}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id={detailsId}
          className="cys-card mt-4 overflow-hidden"
        >
          <p className="cys-text-subtle px-5 py-3 text-xs leading-5 sm:px-6">
            {SCORE_BREAKDOWN_INTRO}
          </p>
          <div className="hidden grid-cols-[1.4fr_1.4fr_minmax(8rem,0.85fr)_minmax(4rem,0.4fr)] gap-4 px-6 py-3 text-[0.7rem] uppercase tracking-[0.18em] cys-text-faint sm:grid">
            <span>Axis</span>
            <span>Selected answer</span>
            <span>Signal direction</span>
            <span className="text-right">Weight</span>
          </div>
          <ul>
            {result.breakdown.map((row, idx) => (
              <li
                key={row.questionId}
                className={`px-5 py-4 sm:grid sm:grid-cols-[1.4fr_1.4fr_minmax(8rem,0.85fr)_minmax(4rem,0.4fr)] sm:items-center sm:gap-4 sm:px-6 sm:py-4 ${
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

          <div className="border-t cys-border-soft px-5 py-5 sm:px-6 sm:py-6">
            <button
              type="button"
              aria-expanded={showIndex}
              aria-controls={indexId}
              onClick={() => setShowIndex((o) => !o)}
              className="cys-link inline-flex h-9 items-center text-sm underline-offset-4 hover:underline"
            >
              {showIndex
                ? "Hide internal fit index details"
                : "Show internal fit index details"}
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
    </section>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="cys-eyebrow">{label}</p>
      <p className="cys-text-soft mt-1 text-sm font-medium">{value}</p>
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
