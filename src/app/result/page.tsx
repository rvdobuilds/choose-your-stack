"use client";

import { useAssessment } from "@/lib/assessment-context";
import { ResultPanel } from "@/components/ResultPanel";
import { ScoreBreakdown } from "@/components/ScoreBreakdown";

export default function ResultPage() {
  const { result, answeredCount, storageHydrated } = useAssessment();

  if (!storageHydrated) {
    return (
      <div className="pt-4 sm:pt-10">
        <p className="cys-text-subtle text-sm leading-6">
          Restoring assessment…
        </p>
      </div>
    );
  }

  return (
    <div className="pt-4 sm:pt-10">
      <ResultPanel result={result} answeredCount={answeredCount} />
      <ScoreBreakdown result={result} />
    </div>
  );
}
