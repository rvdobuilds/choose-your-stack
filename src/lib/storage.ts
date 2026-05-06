import {
  answeredCount,
  calculateResult,
  isComplete,
} from "@/lib/scoring";
import { QUESTIONS, TOTAL_QUESTIONS } from "@/lib/questions";
import type {
  AssessmentAnswers,
  AssessmentResult,
  QuestionId,
  ResultLabel,
  ResultType,
  SignalQuality,
} from "@/lib/types";

export const STORAGE_KEY = "choose-your-stack:v1:assessment";

export const STORED_ASSESSMENT_VERSION = 1 as const;

export type StoredAssessment = {
  version: typeof STORED_ASSESSMENT_VERSION;
  selectedAnswers: AssessmentAnswers;
  currentQuestionIndex: number;
  completed: boolean;
  result: AssessmentResult | null;
  updatedAt: string;
};

const QUESTION_IDS = new Set<QuestionId>(QUESTIONS.map((q) => q.id));

const ANSWER_IDS_BY_QUESTION: Record<QuestionId, Set<string>> = {} as Record<
  QuestionId,
  Set<string>
>;
for (const q of QUESTIONS) {
  ANSWER_IDS_BY_QUESTION[q.id] = new Set(q.answers.map((a) => a.id));
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateQuestionId(key: string): key is QuestionId {
  return QUESTION_IDS.has(key as QuestionId);
}

export function validateSelectedAnswers(raw: unknown): AssessmentAnswers | null {
  if (!isPlainObject(raw)) return null;
  const out: AssessmentAnswers = {};
  for (const key of Object.keys(raw)) {
    if (!validateQuestionId(key)) return null;
    const v = raw[key];
    if (typeof v !== "string" || v.length === 0) return null;
    const allowed = ANSWER_IDS_BY_QUESTION[key];
    if (!allowed?.has(v)) return null;
    out[key] = v;
  }
  return out;
}

function validateSignalQuality(raw: unknown): raw is SignalQuality {
  return raw === "High" || raw === "Medium" || raw === "Low";
}

function validateResultType(raw: unknown): raw is ResultType {
  return raw === "mendix" || raw === "aws-native" || raw === "hybrid";
}

function validateResultLabel(raw: unknown): raw is ResultLabel {
  return (
    raw === "Mendix candidate" ||
    raw === "AWS-native candidate" ||
    raw === "Hybrid candidate"
  );
}

function validateScoreBreakdownRow(raw: unknown): boolean {
  if (!isPlainObject(raw)) return false;
  if (typeof raw.questionTitle !== "string") return false;
  if (typeof raw.selectedAnswerLabel !== "string") return false;
  if (typeof raw.weightedScore !== "number" || !Number.isFinite(raw.weightedScore))
    return false;
  if (typeof raw.signalLabel !== "string") return false;
  if (typeof raw.explanation !== "string") return false;
  if (typeof raw.questionId !== "string" || !validateQuestionId(raw.questionId))
    return false;
  const score = raw.score;
  if (
    score !== -2 &&
    score !== -1 &&
    score !== 0 &&
    score !== 1 &&
    score !== 2
  )
    return false;
  if (typeof raw.weight !== "number" || !Number.isFinite(raw.weight))
    return false;
  return true;
}

export function validateAssessmentResult(raw: unknown): AssessmentResult | null {
  if (!isPlainObject(raw)) return null;
  if (!validateResultType(raw.type)) return null;
  if (!validateResultLabel(raw.label)) return null;
  if (typeof raw.score !== "number" || !Number.isFinite(raw.score)) return null;
  if (typeof raw.baseType !== "string" || !validateResultType(raw.baseType))
    return null;
  if (typeof raw.hardGateApplied !== "boolean") return null;
  if (
    raw.hardGateReason !== undefined &&
    typeof raw.hardGateReason !== "string"
  )
    return null;
  if (
    raw.hardGateExplanation !== undefined &&
    typeof raw.hardGateExplanation !== "string"
  )
    return null;
  const rs = raw.recommendationStrength;
  if (rs !== "Strong" && rs !== "Clear" && rs !== "Balanced") return null;
  if (!validateSignalQuality(raw.signalQuality)) return null;
  if (typeof raw.unclearAnswerCount !== "number" || !Number.isInteger(raw.unclearAnswerCount))
    return null;
  if (typeof raw.recommendation !== "string") return null;
  if (typeof raw.closingNote !== "string") return null;
  if (!Array.isArray(raw.whyItFits) || !raw.whyItFits.every((x) => typeof x === "string"))
    return null;
  if (!Array.isArray(raw.tradeOffs) || !raw.tradeOffs.every((x) => typeof x === "string"))
    return null;
  if (
    !Array.isArray(raw.validationQuestions) ||
    !raw.validationQuestions.every((x) => typeof x === "string")
  )
    return null;
  if (typeof raw.costModelImplication !== "string") return null;
  if (!Array.isArray(raw.breakdown) || !raw.breakdown.every(validateScoreBreakdownRow))
    return null;

  return raw as AssessmentResult;
}

function validateCurrentQuestionIndex(raw: unknown): number | null {
  if (typeof raw !== "number" || !Number.isFinite(raw)) return null;
  const i = Math.floor(raw);
  if (i !== raw) return null;
  if (i < 0 || i >= TOTAL_QUESTIONS) return null;
  return i;
}

export function loadStoredAssessment(): StoredAssessment | null {
  if (typeof window === "undefined") return null;
  try {
    const rawJson = window.localStorage.getItem(STORAGE_KEY);
    if (rawJson === null) return null;
    const parsed: unknown = JSON.parse(rawJson);
    if (!isPlainObject(parsed)) return null;
    if (parsed.version !== STORED_ASSESSMENT_VERSION) return null;

    const selectedAnswers = validateSelectedAnswers(parsed.selectedAnswers);
    if (selectedAnswers === null) return null;

    const idx = validateCurrentQuestionIndex(parsed.currentQuestionIndex);
    if (idx === null) return null;

    if (typeof parsed.completed !== "boolean") return null;

    const completedFromAnswers = isComplete(selectedAnswers);
    if (parsed.completed !== completedFromAnswers) return null;

    if (!completedFromAnswers) {
      if (parsed.result !== null && parsed.result !== undefined) return null;
    }

    const updatedAt =
      typeof parsed.updatedAt === "string" ? parsed.updatedAt : "";
    if (!updatedAt || Number.isNaN(Date.parse(updatedAt))) return null;

    let result: AssessmentResult | null = null;
    if (completedFromAnswers) {
      result = calculateResult(selectedAnswers);
      if (result === null) {
        result = validateAssessmentResult(parsed.result);
        if (result === null) return null;
      }
    }

    return {
      version: STORED_ASSESSMENT_VERSION,
      selectedAnswers,
      currentQuestionIndex: idx,
      completed: completedFromAnswers,
      result,
      updatedAt,
    };
  } catch {
    return null;
  }
}

export type PersistPayload = {
  selectedAnswers: AssessmentAnswers;
  currentQuestionIndex: number;
};

export function buildAssessmentSnapshot(
  payload: PersistPayload,
): Omit<StoredAssessment, "version"> | null {
  const selectedAnswers = validateSelectedAnswers(payload.selectedAnswers);
  if (selectedAnswers === null) return null;

  const idx = validateCurrentQuestionIndex(payload.currentQuestionIndex);
  if (idx === null) return null;

  const completed = isComplete(selectedAnswers);
  const computed = completed ? calculateResult(selectedAnswers) : null;

  return {
    selectedAnswers,
    currentQuestionIndex: idx,
    completed,
    result: computed,
    updatedAt: new Date().toISOString(),
  };
}

export function saveStoredAssessment(payload: PersistPayload): void {
  if (typeof window === "undefined") return;
  const snapshot = buildAssessmentSnapshot(payload);
  if (snapshot === null) return;
  try {
    const toStore: StoredAssessment = {
      version: STORED_ASSESSMENT_VERSION,
      ...snapshot,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch {
    /* ignore quota / private mode */
  }
}

export function clearStoredAssessment(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function shouldPersistProgress(payload: PersistPayload): boolean {
  const n = answeredCount(payload.selectedAnswers);
  return (
    n > 0 ||
    payload.currentQuestionIndex > 0 ||
    isComplete(payload.selectedAnswers)
  );
}
