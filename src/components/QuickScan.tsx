"use client";

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
        <QuickScanHeader />
        <p className="cys-text-subtle mt-6 text-sm leading-6">
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
      <QuickScanHeader />

      <FitMeter summary={summary} />

      {complete ? (
        <QuickScanResult summary={summary} onReset={reset} />
      ) : (
        <>
          <div className="mt-8 sm:mt-10">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs">
              <span className="cys-text-subtle">
                Question {safeIndex + 1} of {QUICK_SCAN_TOTAL} · {answeredCount}{" "}
                of {QUICK_SCAN_TOTAL} answered
              </span>
              <span className="cys-text-faint">Quick scan in progress.</span>
            </div>
            <p className="cys-text-faint mt-1.5 text-[0.7rem] leading-5">
              Saved locally in this browser. Detailed assessment is not
              affected.
            </p>
            <div
              className="cys-progress-track mt-2 h-1.5"
              role="progressbar"
              aria-valuenow={safeIndex + 1}
              aria-valuemin={1}
              aria-valuemax={QUICK_SCAN_TOTAL}
              aria-label="Quick scan progress"
            >
              <div
                className="cys-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-end gap-x-4 gap-y-1">
              <button
                type="button"
                onClick={reset}
                className="cys-text-faint -mx-1 rounded-md px-1 py-1 text-xs underline-offset-4 hover:underline focus-visible:underline"
              >
                Start over
              </button>
            </div>
          </div>

          <div className="mt-5 sm:mt-6">
            <QuickScanQuestionCard
              question={currentQuestion}
              selectedAnswerId={selectedAnswerId}
              onSelect={select}
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 sm:mt-6">
            <button
              type="button"
              onClick={handleBack}
              disabled={isFirst}
              className="cys-button-secondary inline-flex h-11 min-w-[6rem] items-center justify-center rounded-full px-5 text-sm font-medium sm:h-12"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedAnswerId || isLast}
              className="cys-button-primary inline-flex h-11 flex-1 items-center justify-center rounded-full px-5 text-sm font-medium sm:h-12 sm:flex-none sm:min-w-[10rem]"
            >
              {isLast ? "Answered" : "Next"}
            </button>
          </div>
        </>
      )}
    </section>
  );
}

function QuickScanHeader() {
  return (
    <header>
      <p className="cys-eyebrow">Quick scan</p>
      <h1
        id="quick-scan-heading"
        className="cys-text mt-2 text-[1.5rem] font-semibold leading-tight sm:text-[2.25rem]"
      >
        Quick scan
      </h1>
      <p className="cys-text-muted mt-2 max-w-2xl text-sm leading-6 sm:mt-3 sm:text-base sm:leading-7">
        Answer five questions for a fast workload-fit direction.
      </p>
      <p className="cys-text-subtle mt-2 max-w-2xl text-sm leading-6">
        For early orientation only. Use the detailed assessment when the
        decision needs to be traceable.
      </p>
    </header>
  );
}

function FitMeter({ summary }: { summary: QuickScanSummary }) {
  const total =
    summary.counts.mendix + summary.counts["aws-native"] + summary.counts.hybrid;
  const safeTotal = total === 0 ? 1 : total;
  const leaderLabel = quickScanLeaderLabel(summary.leader);

  return (
    <section
      aria-label="Live fit direction"
      className="mt-6 sm:mt-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="cys-eyebrow">Live fit direction</p>
        <p className="cys-text-soft text-sm font-medium">{leaderLabel}</p>
      </div>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-3 sm:gap-4">
        <FitBar
          label="Mendix fit"
          count={summary.counts.mendix}
          total={safeTotal}
        />
        <FitBar
          label="AWS-native fit"
          count={summary.counts["aws-native"]}
          total={safeTotal}
        />
        <FitBar
          label="Hybrid fit"
          count={summary.counts.hybrid}
          total={safeTotal}
        />
      </div>
      {summary.unclearOverflow ? (
        <p className="cys-text-subtle mt-3 text-sm leading-6">
          Too many inputs are unclear for a reliable quick scan.
        </p>
      ) : null}
    </section>
  );
}

function FitBar({
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
      <div className="flex items-baseline justify-between gap-2">
        <span className="cys-text-soft text-sm font-medium">{label}</span>
        <span className="cys-text-faint text-xs tabular-nums">{count}</span>
      </div>
      <div className="cys-progress-track mt-2 h-1.5">
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
  const groupName = `qs-${question.id}`;
  return (
    <fieldset className="cys-card px-4 py-4 sm:px-8 sm:py-8">
      <legend className="sr-only">{question.title}</legend>

      <p className="cys-eyebrow">
        Question {question.number} of {QUICK_SCAN_TOTAL}
      </p>

      <h2 className="cys-text mt-3 text-[1.2rem] font-medium leading-snug sm:mt-4 sm:text-[1.4rem]">
        {question.title}
      </h2>
      {question.description ? (
        <p className="cys-text-subtle mt-2 max-w-2xl text-sm leading-6">
          {question.description}
        </p>
      ) : null}
      {question.examples && question.examples.length > 0 ? (
        <dl className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {question.examples.map((example) => (
            <div key={example.label} className="flex gap-2 text-sm leading-6">
              <dt className="cys-text-soft min-w-[6rem] shrink-0 font-medium">
                {example.label}
              </dt>
              <dd className="cys-text-subtle">{example.description}</dd>
            </div>
          ))}
        </dl>
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
    <article className="mt-8 sm:mt-10">
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
