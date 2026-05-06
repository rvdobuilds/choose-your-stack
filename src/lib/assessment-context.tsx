"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import {
  answeredCount as countAnswered,
  calculateResult,
} from "@/lib/scoring";
import type { AssessmentAnswers, AssessmentResult, QuestionId } from "@/lib/types";
import {
  clearStoredAssessment,
  loadStoredAssessment,
  saveStoredAssessment,
  shouldPersistProgress,
} from "@/lib/storage";

type AssessmentState = {
  answers: AssessmentAnswers;
  currentQuestionIndex: number;
  result: AssessmentResult | null;
  answeredCount: number;
  storageHydrated: boolean;
  select: (questionId: QuestionId, answerId: string) => void;
  setCurrentQuestionIndex: (index: number) => void;
  reset: () => void;
};

const AssessmentContext = createContext<AssessmentState | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [currentQuestionIndex, setCurrentQuestionIndexState] = useState(0);
  const [storageHydrated, setStorageHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const stored = loadStoredAssessment();
      if (stored) {
        setAnswers(stored.selectedAnswers);
        setCurrentQuestionIndexState(stored.currentQuestionIndex);
      }
      setStorageHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!storageHydrated) return;
    const payload = {
      selectedAnswers: answers,
      currentQuestionIndex,
    };
    if (!shouldPersistProgress(payload)) {
      clearStoredAssessment();
      return;
    }
    saveStoredAssessment(payload);
  }, [answers, currentQuestionIndex, storageHydrated]);

  const setCurrentQuestionIndex = useCallback((index: number) => {
    setCurrentQuestionIndexState(index);
  }, []);

  const select = useCallback(
    (questionId: QuestionId, answerId: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
    },
    [],
  );

  const reset = useCallback(() => {
    setAnswers({});
    setCurrentQuestionIndexState(0);
    clearStoredAssessment();
  }, []);

  const result = useMemo(() => calculateResult(answers), [answers]);
  const answeredCount = useMemo(() => countAnswered(answers), [answers]);

  const value = useMemo<AssessmentState>(
    () => ({
      answers,
      currentQuestionIndex,
      result,
      answeredCount,
      storageHydrated,
      select,
      setCurrentQuestionIndex,
      reset,
    }),
    [
      answers,
      currentQuestionIndex,
      result,
      answeredCount,
      storageHydrated,
      select,
      setCurrentQuestionIndex,
      reset,
    ],
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
