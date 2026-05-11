import {
  QUICK_SCAN_QUESTIONS,
  type QuickScanAnswers,
  type QuickScanDirection,
} from "./quick-scan-data";

export type QuickScanCounts = {
  mendix: number;
  "aws-native": number;
  hybrid: number;
  unclear: number;
};

export type QuickScanLeader =
  | "mendix"
  | "aws-native"
  | "hybrid"
  | "mixed"
  | "unclear";

export type QuickScanSummary = {
  counts: QuickScanCounts;
  answeredCount: number;
  totalCount: number;
  leader: QuickScanLeader;
  unclearOverflow: boolean;
};

const UNCLEAR_OVERFLOW_THRESHOLD = 3;

const LEADER_LABELS: Record<QuickScanLeader, string> = {
  mendix: "Mendix fit",
  "aws-native": "AWS-native fit",
  hybrid: "Hybrid fit",
  mixed: "Mixed / needs detail",
  unclear: "Mixed / needs detail",
};

export function quickScanLeaderLabel(leader: QuickScanLeader): string {
  return LEADER_LABELS[leader];
}

export function isQuickScanComplete(answers: QuickScanAnswers): boolean {
  return QUICK_SCAN_QUESTIONS.every((q) => Boolean(answers[q.id]));
}

export function answeredQuickScanCount(answers: QuickScanAnswers): number {
  return QUICK_SCAN_QUESTIONS.reduce(
    (count, q) => count + (answers[q.id] ? 1 : 0),
    0,
  );
}

export function computeQuickScanSummary(
  answers: QuickScanAnswers,
): QuickScanSummary {
  const counts: QuickScanCounts = {
    mendix: 0,
    "aws-native": 0,
    hybrid: 0,
    unclear: 0,
  };
  let answeredCount = 0;
  for (const q of QUICK_SCAN_QUESTIONS) {
    const selected = answers[q.id];
    if (!selected) continue;
    const answer = q.answers.find((a) => a.id === selected);
    if (!answer) continue;
    answeredCount += 1;
    counts[answer.direction] += 1;
  }

  const unclearOverflow = counts.unclear >= UNCLEAR_OVERFLOW_THRESHOLD;

  const leader = deriveLeader(counts, answeredCount, unclearOverflow);

  return {
    counts,
    answeredCount,
    totalCount: QUICK_SCAN_QUESTIONS.length,
    leader,
    unclearOverflow,
  };
}

function deriveLeader(
  counts: QuickScanCounts,
  answeredCount: number,
  unclearOverflow: boolean,
): QuickScanLeader {
  if (answeredCount === 0) return "mixed";
  if (unclearOverflow) return "unclear";

  const directional: Array<{ key: QuickScanDirection; value: number }> = [
    { key: "mendix", value: counts.mendix },
    { key: "aws-native", value: counts["aws-native"] },
    { key: "hybrid", value: counts.hybrid },
  ];
  directional.sort((a, b) => b.value - a.value);
  const top = directional[0];
  const second = directional[1];

  if (top.value === 0) return "mixed";
  if (top.value === second.value) return "mixed";
  if (top.key === "mendix") return "mendix";
  if (top.key === "aws-native") return "aws-native";
  return "hybrid";
}

export function quickScanReason(leader: QuickScanLeader): string {
  switch (leader) {
    case "mendix":
      return "Most answers point to a business-process workload where UI, workflow, and delivery speed dominate.";
    case "aws-native":
      return "Most answers point to a technical, integration- or event-heavy workload where elasticity, latency, or runtime control dominate.";
    case "hybrid":
      return "Answers split between business-process needs and technical backend needs, so a clear architecture boundary is the likely shape.";
    case "unclear":
      return "Too many inputs are unclear to read a confident direction yet.";
    case "mixed":
      return "Signals are balanced across directions, so the shape is not yet clear.";
  }
}

export function quickScanValidation(leader: QuickScanLeader): string {
  switch (leader) {
    case "mendix":
      return "Validate volume, integration complexity, and operational risk before locking the direction.";
    case "aws-native":
      return "Validate team capability, support model, and whether a separate business UI is needed.";
    case "hybrid":
      return "Define the architecture boundary, ownership split, and end-to-end observability before delivery starts.";
    case "unclear":
      return "Re-run the quick scan once the workload shape, volume, and capability picture are clearer, or move to the detailed assessment.";
    case "mixed":
      return "Use the detailed assessment to surface trade-offs that the quick scan cannot separate.";
  }
}
