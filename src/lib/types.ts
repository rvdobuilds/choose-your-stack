export type ResultType = "mendix" | "aws-native" | "hybrid";

export type ResultLabel =
  | "Mendix candidate"
  | "AWS-native candidate"
  | "Hybrid candidate";

export type RecommendationStrength = "Strong" | "Clear" | "Balanced";

export type SignalQuality = "High" | "Medium" | "Low";

export type Signal = -2 | -1 | 0 | 1 | 2;

export type FitDirection =
  | "business_process"
  | "technical_platform"
  | "hybrid"
  | "unclear";

export type QuestionId =
  | "solution-type"
  | "ui-need"
  | "business-logic"
  | "volume"
  | "performance"
  | "integration-complexity"
  | "criticality"
  | "speed-vs-flexibility"
  | "team-capability"
  | "runtime-cost-elasticity"
  | "lock-in"
  | "observability-testability";

export type AnswerOption = {
  id: string;
  label: string;
  description?: string;
  score: Signal;
  fitDirection: FitDirection;
};

export type Question = {
  id: QuestionId;
  number: number;
  title: string;
  description?: string;
  weight: number;
  answers: AnswerOption[];
};

export type AssessmentAnswers = Partial<Record<QuestionId, string>>;

export type ScoreBreakdownRow = {
  questionId: QuestionId;
  questionTitle: string;
  selectedAnswerLabel: string;
  score: Signal;
  weight: number;
  weightedScore: number;
  signalLabel: string;
  explanation: string;
};

export type AssessmentResult = {
  type: ResultType;
  label: ResultLabel;
  score: number;
  baseType: ResultType;
  hardGateApplied: boolean;
  hardGateReason?: string;
  hardGateExplanation?: string;
  recommendationStrength: RecommendationStrength;
  signalQuality: SignalQuality;
  unclearAnswerCount: number;
  recommendation: string;
  closingNote: string;
  whyItFits: string[];
  tradeOffs: string[];
  validationQuestions: string[];
  costModelImplication: string;
  breakdown: ScoreBreakdownRow[];
};
