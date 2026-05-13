"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuickScan } from "@/lib/quick-scan-context";
import {
  QUICK_SCAN_QUESTIONS,
  QUICK_SCAN_TOTAL,
  type QuickScanQuestion,
} from "@/lib/quick-scan-data";
import {
  quickScanLeaderLabel,
  quickScanReason,
  quickScanValidation,
  type QuickScanSummary,
} from "@/lib/quick-scan-scoring";

export function QuickScan() {
  const {
    answers,
    answeredCount,
    summary,
    complete,
    storageHydrated,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    select,
    reset,
  } = useQuickScan();

  if (!storageHydrated) {
    return (
      <section aria-busy="true">
        <CompactHeader
          id="quick-scan-heading"
          as="h1"
          title="Quick scan"
          questionNum={1}
          total={QUICK_SCAN_TOTAL}
        />
        <p className="cys-text-subtle mt-4 text-sm leading-6">
          Restoring quick scan…
        </p>
      </section>
    );
  }

  const safeIndex = Math.min(currentQuestionIndex, QUICK_SCAN_TOTAL - 1);
  const currentQuestion = QUICK_SCAN_QUESTIONS[safeIndex];
  const selectedAnswerId = answers[currentQuestion.id];
  const isFirst = safeIndex === 0;
  const isLast = safeIndex === QUICK_SCAN_TOTAL - 1;
  const progress = Math.round(((safeIndex + 1) / QUICK_SCAN_TOTAL) * 100);

  const handleBack = () => {
    if (isFirst) return;
    setCurrentQuestionIndex(Math.max(0, safeIndex - 1));
  };

  const handleNext = () => {
    if (!selectedAnswerId) return;
    if (isLast) return;
    setCurrentQuestionIndex(Math.min(QUICK_SCAN_TOTAL - 1, safeIndex + 1));
  };

  return (
    <section aria-labelledby="quick-scan-heading">
      <CompactHeader
        id="quick-scan-heading"
        as="h1"
        title="Quick scan"
        questionNum={safeIndex + 1}
        total={QUICK_SCAN_TOTAL}
      />

      {complete ? (
        <QuickScanResult summary={summary} onReset={reset} />
      ) : (
        <>
          <CompactProgressArea
            questionNum={safeIndex + 1}
            total={QUICK_SCAN_TOTAL}
            answeredCount={answeredCount}
            progress={progress}
            statusText="Quick scan in progress."
            onReset={reset}
            progressLabel="Quick scan progress"
          />

          <div className="mt-4 sm:grid sm:grid-cols-[1fr_216px] sm:gap-5 lg:grid-cols-[1fr_236px] lg:gap-6">
            {/* Main column: question + desktop controls */}
            <div>
              <QuickScanQuestionCard
                key={currentQuestion.id}
                question={currentQuestion}
                selectedAnswerId={selectedAnswerId}
                onSelect={select}
              />

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
                  disabled={!selectedAnswerId || isLast}
                  className="cys-button-primary inline-flex h-10 min-w-[8.5rem] items-center justify-center rounded-full px-5 text-sm font-medium"
                >
                  {isLast ? "Answered" : "Next"}
                </button>
              </div>
            </div>

            {/* Right panel: live fit direction (desktop only) */}
            <aside className="hidden sm:block" aria-label="Live fit direction">
              <FitPanel summary={summary} />
            </aside>
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
              disabled={!selectedAnswerId || isLast}
              className="cys-button-primary inline-flex h-11 flex-1 items-center justify-center rounded-full px-5 text-sm font-medium"
            >
              {isLast ? "Answered" : "Next"}
            </button>
          </div>
          {/* Spacer so mobile sticky bar does not cover content */}
          <div className="h-20 sm:hidden" aria-hidden="true" />
        </>
      )}
    </section>
  );
}

function CompactHeader({
  id,
  as: Tag,
  title,
  questionNum,
  total,
}: {
  id: string;
  as: "h1" | "h2";
  title: string;
  questionNum: number;
  total: number;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
      <Tag id={id} className="cys-text text-base font-semibold">
        {title}
        <span className="cys-text-faint ml-2 text-sm font-normal">
          · Question {questionNum} of {total}
        </span>
      </Tag>
      <span className="cys-text-faint text-[0.7rem]">
        Saved locally in this browser.
      </span>
    </div>
  );
}

function CompactProgressArea({
  questionNum,
  total,
  answeredCount,
  progress,
  statusText,
  onReset,
  progressLabel,
}: {
  questionNum: number;
  total: number;
  answeredCount: number;
  progress: number;
  statusText: string;
  onReset: () => void;
  progressLabel: string;
}) {
  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <span className="cys-text-subtle text-xs">
          Question {questionNum} of {total} &middot; {answeredCount} of {total}{" "}
          answered
        </span>
        <div className="flex items-center gap-3">
          <span className="cys-text-faint text-xs">{statusText}</span>
          <button
            type="button"
            onClick={onReset}
            className="cys-text-faint rounded-md px-0.5 text-xs underline-offset-4 hover:underline focus-visible:underline"
          >
            Reset
          </button>
        </div>
      </div>
      <div
        className="cys-progress-track mt-2 h-1"
        role="progressbar"
        aria-valuenow={questionNum}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={progressLabel}
      >
        <div className="cys-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function FitPanel({ summary }: { summary: QuickScanSummary }) {
  const total =
    summary.counts.mendix +
    summary.counts["aws-native"] +
    summary.counts.hybrid;
  const safeTotal = total === 0 ? 1 : total;
  const leaderLabel = quickScanLeaderLabel(summary.leader);

  return (
    <div className="cys-card px-4 py-4">
      <p className="cys-eyebrow mb-2">Live fit direction</p>
      <p className="cys-text-soft mb-4 text-sm font-medium">{leaderLabel}</p>
      <div className="flex flex-col gap-3">
        <CompactFitBar
          label="Mendix fit"
          count={summary.counts.mendix}
          total={safeTotal}
        />
        <CompactFitBar
          label="AWS-native fit"
          count={summary.counts["aws-native"]}
          total={safeTotal}
        />
        <CompactFitBar
          label="Hybrid fit"
          count={summary.counts.hybrid}
          total={safeTotal}
        />
      </div>
      {summary.unclearOverflow ? (
        <p className="cys-text-subtle mt-3 text-xs leading-5">
          Too many unclear inputs for a reliable direction.
        </p>
      ) : null}
    </div>
  );
}

function CompactFitBar({
  label,
  count,
  total,
}: {
  label: string;
  count: number;
  total: number;
}) {
  const pct = Math.round((count / total) * 100);
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="cys-text-subtle text-xs">{label}</span>
        <span className="cys-text-faint text-xs tabular-nums">{count}</span>
      </div>
      <div className="cys-progress-track h-1">
        <div
          className="cys-progress-fill"
          style={{ width: `${count === 0 ? 0 : Math.max(pct, 4)}%` }}
        />
      </div>
    </div>
  );
}

function QuickScanQuestionCard({
  question,
  selectedAnswerId,
  onSelect,
}: {
  question: QuickScanQuestion;
  selectedAnswerId: string | undefined;
  onSelect: (questionId: string, answerId: string) => void;
}) {
  const [helpOpen, setHelpOpen] = useState(false);
  const groupName = `qs-${question.id}`;
  const hasExamples = question.examples && question.examples.length > 0;

  return (
    <fieldset className="cys-card px-4 py-3 sm:px-5 sm:py-4">
      <legend className="sr-only">{question.title}</legend>

      <h2 className="cys-text text-[1.05rem] font-medium leading-snug sm:text-[1.15rem]">
        {question.title}
      </h2>

      {question.description ? (
        <p className="cys-text-subtle mt-1.5 text-sm leading-5">
          {question.description}
        </p>
      ) : null}

      {hasExamples ? (
        <div className="mt-2">
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
                <div
                  key={example.label}
                  className="flex gap-2 text-xs leading-5"
                >
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
        className="mt-3 flex flex-col gap-1.5"
      >
        {question.answers.map((answer) => {
          const selected = selectedAnswerId === answer.id;
          const inputId = `${groupName}-${answer.id}`;
          return (
            <label
              key={answer.id}
              htmlFor={inputId}
              data-selected={selected}
              className="cys-answer flex min-h-[44px] cursor-pointer items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3"
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
              <span aria-hidden className="cys-answer-marker shrink-0" />
              <span className="cys-text-soft flex-1 text-[0.875rem] leading-5">
                {answer.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function QuickScanResult({
  summary,
  onReset,
}: {
  summary: QuickScanSummary;
  onReset: () => void;
}) {
  const leaderLabel = quickScanLeaderLabel(summary.leader);
  const reason = quickScanReason(summary.leader);
  const validation = quickScanValidation(summary.leader);

  return (
    <article className="mt-6 sm:mt-8">
      <p className="cys-eyebrow">Quick scan result</p>
      <h2 className="cys-text mt-2 text-[1.4rem] font-semibold leading-tight sm:text-[1.8rem]">
        Likely direction
      </h2>
      <p className="cys-text mt-3 max-w-2xl text-lg font-medium sm:text-xl">
        {leaderLabel}
      </p>

      <dl className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-8">
        <div>
          <dt className="cys-eyebrow">Why</dt>
          <dd className="cys-text-soft mt-2 text-sm leading-6">{reason}</dd>
        </div>
        <div>
          <dt className="cys-eyebrow">Main validation</dt>
          <dd className="cys-text-soft mt-2 text-sm leading-6">
            {validation}
          </dd>
        </div>
      </dl>

      <p className="cys-text-subtle mt-6 max-w-2xl text-sm leading-6">
        This is an early orientation only. Run the detailed assessment when the
        decision needs to be traceable and defensible.
      </p>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
        <Link
          href="/detailed-assessment"
          className="cys-button-primary inline-flex h-11 min-w-[16rem] items-center justify-center rounded-full px-6 text-sm font-medium sm:h-12"
        >
          Continue to detailed assessment
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="cys-button-secondary inline-flex h-11 min-w-[10rem] items-center justify-center rounded-full px-6 text-sm font-medium sm:h-12"
        >
          Start quick scan again
        </button>
      </div>
    </article>
  );
}
