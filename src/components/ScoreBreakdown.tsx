import type { AssessmentResult } from "@/lib/types";

type Props = {
  result: AssessmentResult | null;
};

export function ScoreBreakdown({ result }: Props) {
  if (!result) return null;

  return (
    <section
      id="score-breakdown"
      aria-labelledby="score-breakdown-heading"
      className="mt-12 sm:mt-16"
    >
      <header>
        <p className="cys-eyebrow">Score breakdown</p>
        <h2
          id="score-breakdown-heading"
          className="cys-text mt-2 text-[1.5rem] font-semibold leading-tight sm:text-[1.8rem]"
        >
          How the score was built
        </h2>
        <p className="cys-text-muted mt-3 max-w-2xl text-sm leading-6 sm:text-base sm:leading-7">
          Each axis contributes a weighted signal. Strong Mendix signals are
          negative. Strong AWS-native signals are positive. Neutral signals do
          not push the result.
        </p>
      </header>

      <div className="cys-card mt-6 overflow-hidden">
        <div className="hidden grid-cols-[1.4fr_1.4fr_minmax(7rem,0.7fr)_minmax(4rem,0.4fr)_minmax(5rem,0.5fr)] gap-4 px-6 py-3 text-[0.7rem] uppercase tracking-[0.18em] cys-text-faint sm:grid">
          <span>Axis</span>
          <span>Selected answer</span>
          <span>Signal</span>
          <span className="text-right">Weight</span>
          <span className="text-right">Weighted</span>
        </div>
        <ul>
          {result.breakdown.map((row, idx) => (
            <li
              key={row.questionId}
              className={`px-5 py-4 sm:grid sm:grid-cols-[1.4fr_1.4fr_minmax(7rem,0.7fr)_minmax(4rem,0.4fr)_minmax(5rem,0.5fr)] sm:items-center sm:gap-4 sm:px-6 sm:py-4 ${
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
              <p className="cys-text mt-2 text-sm font-medium sm:mt-0 sm:text-right tabular-nums">
                <span className="cys-text-subtle font-normal sm:hidden">
                  Weighted{" "}
                </span>
                {row.weightedScore > 0
                  ? `+${row.weightedScore}`
                  : row.weightedScore}
              </p>
            </li>
          ))}
          <li className="border-t cys-border-soft px-5 py-4 sm:grid sm:grid-cols-[1.4fr_1.4fr_minmax(7rem,0.7fr)_minmax(4rem,0.4fr)_minmax(5rem,0.5fr)] sm:items-center sm:gap-4 sm:px-6 sm:py-4">
            <p className="cys-text text-sm font-semibold sm:col-span-3">
              Total weighted score
            </p>
            <span className="hidden sm:block" />
            <p className="cys-text mt-2 text-base font-semibold sm:mt-0 sm:text-right tabular-nums">
              {result.score > 0 ? `+${result.score}` : result.score}
            </p>
          </li>
        </ul>
      </div>

      <div className="cys-card-muted mt-4 px-5 py-4">
        <p className="cys-text-soft text-sm leading-6">
          Final recommendation:{" "}
          <span className="cys-text font-medium">{result.label}</span>.{" "}
          {result.hardGateApplied
            ? `Hard gate applied — ${result.hardGateReason}`
            : "No hard gate triggered. Result is derived from the weighted score bands."}
        </p>
      </div>
    </section>
  );
}
