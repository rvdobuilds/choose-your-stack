import { QUESTIONS } from "./questions";
import {
  RESULT_CONTENT,
  RESULT_LABELS,
  SIGNAL_LABELS,
} from "./result-copy";
import type {
  AssessmentAnswers,
  AssessmentResult,
  Question,
  ResultType,
  ScoreBreakdownRow,
  Signal,
} from "./types";

const MENDIX_THRESHOLD = -20;
const AWS_THRESHOLD = 20;

function explainSignal(question: Question, score: Signal): string {
  if (score <= -2) {
    return `${question.title} suggests a strong Mendix signal for this workload.`;
  }
  if (score === -1) {
    return `${question.title} leans toward Mendix without being decisive.`;
  }
  if (score === 0) {
    return `${question.title} is neutral or mixed and does not push the decision in either direction.`;
  }
  if (score === 1) {
    return `${question.title} leans toward AWS-native engineering without being decisive.`;
  }
  return `${question.title} suggests a strong AWS-native signal for this workload.`;
}

function bandToType(score: number): ResultType {
  if (score <= MENDIX_THRESHOLD) return "mendix";
  if (score >= AWS_THRESHOLD) return "aws-native";
  return "hybrid";
}

type HardGate =
  | { type: ResultType; reason: string }
  | null;

function evaluateHardGates(answers: AssessmentAnswers): HardGate {
  const a = answers;

  const awsGate =
    a["ui-need"] === "no-meaningful-ui" &&
    a["volume"] === "high-spiky" &&
    a["performance"] === "performance-essential";
  if (awsGate) {
    return {
      type: "aws-native",
      reason:
        "No meaningful UI, high spiky volume, and essential performance create a strong AWS-native signal.",
    };
  }

  const mendixGate =
    a["solution-type"] === "business-process-app" &&
    a["ui-need"] === "rich-business-ui" &&
    (a["volume"] === "low-predictable" || a["volume"] === "medium-steady");
  if (mendixGate) {
    return {
      type: "mendix",
      reason:
        "A rich business-facing process app with low or medium predictable volume creates a strong Mendix signal.",
    };
  }

  const hybridGate =
    a["solution-type"] === "combined-business-technical" &&
    (a["volume"] === "high-spiky" ||
      a["integration-complexity"] === "many-event-api-orchestration");
  if (hybridGate) {
    return {
      type: "hybrid",
      reason:
        "The workload combines business-facing app needs with high-volume or integration-heavy technical needs, so the architecture boundary should be explicit.",
    };
  }

  return null;
}

export function isComplete(answers: AssessmentAnswers): boolean {
  return QUESTIONS.every((q) => Boolean(answers[q.id]));
}

export function answeredCount(answers: AssessmentAnswers): number {
  return QUESTIONS.reduce(
    (count, q) => count + (answers[q.id] ? 1 : 0),
    0
  );
}

export function calculateResult(
  answers: AssessmentAnswers
): AssessmentResult | null {
  if (!isComplete(answers)) return null;

  const breakdown: ScoreBreakdownRow[] = [];
  let total = 0;

  for (const question of QUESTIONS) {
    const selectedId = answers[question.id];
    const answer = question.answers.find((a) => a.id === selectedId);
    if (!answer) return null;
    const weighted = answer.score * question.weight;
    total += weighted;
    breakdown.push({
      questionId: question.id,
      questionTitle: question.title,
      selectedAnswerLabel: answer.label,
      score: answer.score,
      weight: question.weight,
      weightedScore: weighted,
      signalLabel: SIGNAL_LABELS[answer.score],
      explanation: explainSignal(question, answer.score),
    });
  }

  const baseType = bandToType(total);
  const gate = evaluateHardGates(answers);
  const finalType: ResultType = gate ? gate.type : baseType;
  const content = RESULT_CONTENT[finalType];

  return {
    type: finalType,
    label: RESULT_LABELS[finalType],
    score: total,
    baseType,
    hardGateApplied: Boolean(gate),
    hardGateReason: gate?.reason,
    recommendation: content.recommendation,
    closingNote: content.closingNote,
    whyItFits: content.whyItFits,
    tradeOffs: content.tradeOffs,
    validationQuestions: content.validationQuestions,
    costModelImplication: content.costModelImplication,
    breakdown,
  };
}

export function liveSignal(answers: AssessmentAnswers): {
  total: number;
  answered: number;
  leaning: "Mendix" | "AWS-native" | "Hybrid" | null;
} {
  let total = 0;
  let answered = 0;
  for (const question of QUESTIONS) {
    const selectedId = answers[question.id];
    if (!selectedId) continue;
    const answer = question.answers.find((a) => a.id === selectedId);
    if (!answer) continue;
    answered += 1;
    total += answer.score * question.weight;
  }
  if (answered === 0) {
    return { total, answered, leaning: null };
  }
  const type = bandToType(total);
  const leaning =
    type === "mendix" ? "Mendix" : type === "aws-native" ? "AWS-native" : "Hybrid";
  return { total, answered, leaning };
}
