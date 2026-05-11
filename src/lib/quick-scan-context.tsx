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
  QUICK_SCAN_QUESTIONS,
  type QuickScanAnswers,
} from "./quick-scan-data";
import {
  answeredQuickScanCount,
  computeQuickScanSummary,
  isQuickScanComplete,
  type QuickScanSummary,
} from "./quick-scan-scoring";
import {
  clearStoredQuickScan,
  loadStoredQuickScan,
  saveStoredQuickScan,
  shouldPersistQuickScan,
} from "./quick-scan-storage";

type QuickScanState = {
  answers: QuickScanAnswers;
  currentQuestionIndex: number;
  answeredCount: number;
  complete: boolean;
  summary: QuickScanSummary;
  storageHydrated: boolean;
  select: (questionId: string, answerId: string) => void;
  setCurrentQuestionIndex: (index: number) => void;
  reset: () => void;
};

const QuickScanContext = createContext<QuickScanState | null>(null);

export function QuickScanProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<QuickScanAnswers>({});
  const [currentQuestionIndex, setCurrentQuestionIndexState] = useState(0);
  const [storageHydrated, setStorageHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const stored = loadStoredQuickScan();
      if (stored) {
        setAnswers(stored.selectedAnswers);
        setCurrentQuestionIndexState(stored.currentQuestionIndex);
      }
      setStorageHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!storageHydrated) return;
    const payload = { selectedAnswers: answers, currentQuestionIndex };
    if (!shouldPersistQuickScan(payload)) {
      clearStoredQuickScan();
      return;
    }
    saveStoredQuickScan(payload);
  }, [answers, currentQuestionIndex, storageHydrated]);

  const setCurrentQuestionIndex = useCallback((index: number) => {
    setCurrentQuestionIndexState(index);
  }, []);

  const select = useCallback((questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  }, []);

  const reset = useCallback(() => {
    setAnswers({});
    setCurrentQuestionIndexState(0);
    clearStoredQuickScan();
  }, []);

  const answeredCount = useMemo(
    () => answeredQuickScanCount(answers),
    [answers],
  );
  const complete = useMemo(() => isQuickScanComplete(answers), [answers]);
  const summary = useMemo(() => computeQuickScanSummary(answers), [answers]);

  const value = useMemo<QuickScanState>(
    () => ({
      answers,
      currentQuestionIndex,
      answeredCount,
      complete,
      summary,
      storageHydrated,
      select,
      setCurrentQuestionIndex,
      reset,
    }),
    [
      answers,
      currentQuestionIndex,
      answeredCount,
      complete,
      summary,
      storageHydrated,
      select,
      setCurrentQuestionIndex,
      reset,
    ],
  );

  return (
    <QuickScanContext.Provider value={value}>
      {children}
    </QuickScanContext.Provider>
  );
}

export function useQuickScan(): QuickScanState {
  const ctx = useContext(QuickScanContext);
  if (!ctx) {
    throw new Error(
      "useQuickScan must be used within QuickScanProvider",
    );
  }
  return ctx;
}

export { QUICK_SCAN_QUESTIONS };
