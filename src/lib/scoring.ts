import { QUESTIONS } from "./questions";
import { RESULT_CONTENT, RESULT_LABELS } from "./result-copy";
import type {
  AnswerOption,
  AssessmentAnswers,
  AssessmentResult,
  FitDirection,
  Question,
  RecommendationStrength,
  ResultType,
  ScoreBreakdownRow,
  SignalQuality,
} from "./types";

const MENDIX_THRESHOLD = -20;
const AWS_THRESHOLD = 20;
const STRONG_THRESHOLD = 40;

function directionLabel(fitDirection: FitDirection): string {
  switch (fitDirection) {
    case "business_process":
      return "Business/process signal";
    case "technical_platform":
      return "Technical/platform signal";
    case "hybrid":
      return "Hybrid or mixed signal";
    case "unclear":
      return "Unclear signal";
  }
}

function explainRow(question: Question, answer: AnswerOption): string {
  if (answer.fitDirection === "unclear") {
    return `${question.title} was marked as not clear yet, so it does not shift the workload-fit direction.`;
  }
  if (answer.fitDirection === "business_process") {
    return `${question.title} reads as a business/process-oriented workload signal.`;
  }
  if (answer.fitDirection === "technical_platform") {
    return `${question.title} reads as a technical/platform-oriented workload signal.`;
  }
  return `${question.title} reads as a hybrid or mixed workload signal.`;
}

function signalQualityFromUnclearCount(count: number): SignalQuality {
  if (count <= 1) return "High";
  if (count <= 3) return "Medium";
  return "Low";
}

function bandToType(score: number): ResultType {
  if (score <= MENDIX_THRESHOLD) return "mendix";
  if (score >= AWS_THRESHOLD) return "aws-native";
  return "hybrid";
}

type HardGate = { type: ResultType; reason: string } | null;

function evaluateHardGates(answers: AssessmentAnswers): HardGate {
  const a = answers;

  const awsGate =
    a["ui-need"] === "no-meaningful-user-facing-ui" &&
    a["volume"] === "high-volume-peaks-spikes" &&
    a["performance"] === "performance-latency-critical";
  if (awsGate) {
    return {
      type: "aws-native",
      reason:
        "No meaningful user-facing UI, high volume with spikes, and critical performance or latency create a strong AWS-native signal.",
    };
  }

  const mendixGate =
    a["solution-type"] === "business-workflow-case-process" &&
    a["ui-need"] === "ui-central-to-value" &&
    (a["volume"] === "low-volume-predictable" ||
      a["volume"] === "medium-volume-steady");
  if (mendixGate) {
    return {
      type: "mendix",
      reason:
        "A business workflow-style application with UI-central value and low or medium steady volume creates a strong Mendix signal.",
    };
  }

  const hybridGate =
    a["solution-type"] === "combined-business-screens-technical-backend" &&
    (a["volume"] === "high-volume-peaks-spikes" ||
      a["integration-complexity"] ===
        "many-integrations-event-flows-retries-apis");
  if (hybridGate) {
    return {
      type: "hybrid",
      reason:
        "Combined business-facing and technical backend needs with high volume or integration-heavy interactions create a strong hybrid signal.",
    };
  }

  return null;
}

const HARD_GATE_EXPLANATIONS: Record<ResultType, string> = {
  mendix:
    "This case strongly matches a business-facing process-app pattern, which creates a strong Mendix signal.",
  "aws-native":
    "This case strongly matches a high-volume, performance-sensitive technical workload pattern, which creates a strong AWS-native signal.",
  hybrid:
    "This case strongly combines business-facing process needs with technical backend demands, which creates a strong hybrid signal.",
};

function deriveStrength(
  finalType: ResultType,
  absScore: number,
  hardGateApplied: boolean,
): RecommendationStrength {
  if (hardGateApplied) return "Strong";
  if (finalType === "hybrid") return "Balanced";
  if (absScore >= STRONG_THRESHOLD) return "Strong";
  if (absScore >= 20) return "Clear";
  return "Clear";
}

export function isComplete(answers: AssessmentAnswers): boolean {
  return QUESTIONS.every((q) => Boolean(answers[q.id]));
}

export function answeredCount(answers: AssessmentAnswers): number {
  return QUESTIONS.reduce(
    (count, q) => count + (answers[q.id] ? 1 : 0),
    0,
  );
}

export function calculateResult(
  answers: AssessmentAnswers,
): AssessmentResult | null {
  if (!isComplete(answers)) return null;

  const breakdown: ScoreBreakdownRow[] = [];
  let total = 0;
  let unclearAnswerCount = 0;

  for (const question of QUESTIONS) {
    const selectedId = answers[question.id];
    const answer = question.answers.find((a) => a.id === selectedId);
    if (!answer) return null;
    if (answer.fitDirection === "unclear") {
      unclearAnswerCount += 1;
    }
    const weighted = answer.score * question.weight;
    total += weighted;
    breakdown.push({
      questionId: question.id,
      questionTitle: question.title,
      selectedAnswerLabel: answer.label,
      score: answer.score,
      weight: question.weight,
      weightedScore: weighted,
      signalLabel: directionLabel(answer.fitDirection),
      explanation: explainRow(question, answer),
    });
  }

  const baseType = bandToType(total);
  const gate = evaluateHardGates(answers);
  const finalType: ResultType = gate ? gate.type : baseType;
  const content = RESULT_CONTENT[finalType];
  const hardGateApplied = Boolean(gate);
  const strength = deriveStrength(finalType, Math.abs(total), hardGateApplied);
  const signalQuality = signalQualityFromUnclearCount(unclearAnswerCount);

  return {
    type: finalType,
    label: RESULT_LABELS[finalType],
    score: total,
    baseType,
    hardGateApplied,
    hardGateReason: gate?.reason,
    hardGateExplanation: gate ? HARD_GATE_EXPLANATIONS[finalType] : undefined,
    recommendationStrength: strength,
    signalQuality,
    unclearAnswerCount,
    recommendation: content.recommendation,
    closingNote: content.closingNote,
    whyItFits: content.whyItFits,
    tradeOffs: content.tradeOffs,
    validationQuestions: content.validationQuestions,
    costModelImplication: content.costModelImplication,
    breakdown,
  };
}
