"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import {
  answeredCount as countAnswered,
  calculateResult,
} from "@/lib/scoring";
import type { AssessmentAnswers, AssessmentResult, QuestionId } from "@/lib/types";

type AssessmentState = {
  answers: AssessmentAnswers;
  result: AssessmentResult | null;
  answeredCount: number;
  select: (questionId: QuestionId, answerId: string) => void;
  reset: () => void;
};

const AssessmentContext = createContext<AssessmentState | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<AssessmentAnswers>({});

  const select = useCallback(
    (questionId: QuestionId, answerId: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
    },
    [],
  );

  const reset = useCallback(() => {
    setAnswers({});
  }, []);

  const result = useMemo(() => calculateResult(answers), [answers]);
  const answeredCount = useMemo(() => countAnswered(answers), [answers]);

  const value = useMemo<AssessmentState>(
    () => ({ answers, result, answeredCount, select, reset }),
    [answers, result, answeredCount, select, reset],
  );

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment(): AssessmentState {
  const ctx = useContext(AssessmentContext);
  if (!ctx) {
    throw new Error("useAssessment must be used within AssessmentProvider");
  }
  return ctx;
}
