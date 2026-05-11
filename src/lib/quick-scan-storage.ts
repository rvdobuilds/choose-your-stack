import {
  QUICK_SCAN_QUESTIONS,
  QUICK_SCAN_TOTAL,
  type QuickScanAnswers,
} from "./quick-scan-data";

export const QUICK_SCAN_STORAGE_KEY = "choose-your-stack:v1:quick-scan";

const QUICK_SCAN_STORAGE_VERSION = 1 as const;

export type StoredQuickScan = {
  version: typeof QUICK_SCAN_STORAGE_VERSION;
  selectedAnswers: QuickScanAnswers;
  currentQuestionIndex: number;
  updatedAt: string;
};

const ANSWER_IDS_BY_QUESTION = new Map<string, Set<string>>();
for (const q of QUICK_SCAN_QUESTIONS) {
  ANSWER_IDS_BY_QUESTION.set(q.id, new Set(q.answers.map((a) => a.id)));
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateAnswers(raw: unknown): QuickScanAnswers | null {
  if (!isPlainObject(raw)) return null;
  const out: QuickScanAnswers = {};
  for (const key of Object.keys(raw)) {
    const allowed = ANSWER_IDS_BY_QUESTION.get(key);
    if (!allowed) return null;
    const v = raw[key];
    if (typeof v !== "string" || v.length === 0) return null;
    if (!allowed.has(v)) return null;
    out[key] = v;
  }
  return out;
}

function validateIndex(raw: unknown): number | null {
  if (typeof raw !== "number" || !Number.isFinite(raw)) return null;
  const i = Math.floor(raw);
  if (i !== raw) return null;
  if (i < 0 || i >= QUICK_SCAN_TOTAL) return null;
  return i;
}

export function loadStoredQuickScan(): StoredQuickScan | null {
  if (typeof window === "undefined") return null;
  try {
    const rawJson = window.localStorage.getItem(QUICK_SCAN_STORAGE_KEY);
    if (rawJson === null) return null;
    const parsed: unknown = JSON.parse(rawJson);
    if (!isPlainObject(parsed)) return null;
    if (parsed.version !== QUICK_SCAN_STORAGE_VERSION) return null;
    const selectedAnswers = validateAnswers(parsed.selectedAnswers);
    if (selectedAnswers === null) return null;
    const idx = validateIndex(parsed.currentQuestionIndex);
    if (idx === null) return null;
    const updatedAt =
      typeof parsed.updatedAt === "string" ? parsed.updatedAt : "";
    if (!updatedAt || Number.isNaN(Date.parse(updatedAt))) return null;
    return {
      version: QUICK_SCAN_STORAGE_VERSION,
      selectedAnswers,
      currentQuestionIndex: idx,
      updatedAt,
    };
  } catch {
    return null;
  }
}

type PersistPayload = {
  selectedAnswers: QuickScanAnswers;
  currentQuestionIndex: number;
};

export function saveStoredQuickScan(payload: PersistPayload): void {
  if (typeof window === "undefined") return;
  const selectedAnswers = validateAnswers(payload.selectedAnswers);
  if (selectedAnswers === null) return;
  const idx = validateIndex(payload.currentQuestionIndex);
  if (idx === null) return;
  try {
    const toStore: StoredQuickScan = {
      version: QUICK_SCAN_STORAGE_VERSION,
      selectedAnswers,
      currentQuestionIndex: idx,
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(
      QUICK_SCAN_STORAGE_KEY,
      JSON.stringify(toStore),
    );
  } catch {
    /* ignore quota / private mode */
  }
}

export function clearStoredQuickScan(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(QUICK_SCAN_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function shouldPersistQuickScan(payload: PersistPayload): boolean {
  return (
    Object.keys(payload.selectedAnswers).length > 0 ||
    payload.currentQuestionIndex > 0
  );
}
