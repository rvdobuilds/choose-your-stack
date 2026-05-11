export type QuickScanDirection =
  | "mendix"
  | "aws-native"
  | "hybrid"
  | "unclear";

export type QuickScanAnswer = {
  id: string;
  label: string;
  direction: QuickScanDirection;
};

export type QuickScanExample = {
  label: string;
  description: string;
};

export type QuickScanQuestion = {
  id: string;
  number: number;
  title: string;
  description?: string;
  examples?: QuickScanExample[];
  answers: QuickScanAnswer[];
};

export const QUICK_SCAN_QUESTIONS: QuickScanQuestion[] = [
  {
    id: "shape",
    number: 1,
    title: "What is the main shape of the solution?",
    answers: [
      {
        id: "business-workflow",
        label: "Business workflow or process app",
        direction: "mendix",
      },
      {
        id: "combined",
        label: "Both process/UI and technical backend",
        direction: "hybrid",
      },
      {
        id: "api-event",
        label: "API, event processor, or integration service",
        direction: "aws-native",
      },
      {
        id: "not-clear-yet",
        label: "Not clear yet",
        direction: "unclear",
      },
    ],
  },
  {
    id: "ui-centrality",
    number: 2,
    title: "How central is the UI or workflow?",
    answers: [
      {
        id: "central",
        label: "Central to the value",
        direction: "mendix",
      },
      {
        id: "useful-not-main",
        label: "Useful, but not the main value",
        direction: "hybrid",
      },
      {
        id: "no-ui",
        label: "No meaningful user-facing UI",
        direction: "aws-native",
      },
      {
        id: "not-clear-yet",
        label: "Not clear yet",
        direction: "unclear",
      },
    ],
  },
  {
    id: "volume",
    number: 3,
    title: "What is the expected volume or peak load?",
    examples: [
      {
        label: "Low / steady",
        description:
          "Small internal usage or predictable process volume.",
      },
      {
        label: "High / spiky",
        description:
          "Large event volumes, peak windows, or usage-based scaling concerns.",
      },
    ],
    answers: [
      {
        id: "low-steady",
        label: "Low or steady usage",
        direction: "mendix",
      },
      {
        id: "some-growth",
        label: "Some growth or variation expected",
        direction: "hybrid",
      },
      {
        id: "high-spiky",
        label: "High, spiky, or usage-dependent load",
        direction: "aws-native",
      },
      {
        id: "not-clear-yet",
        label: "Not clear yet",
        direction: "unclear",
      },
    ],
  },
  {
    id: "complexity",
    number: 4,
    title:
      "How complex are integrations, performance, or runtime behavior?",
    answers: [
      {
        id: "standard",
        label:
          "Mostly standard integrations and normal app performance",
        direction: "mendix",
      },
      {
        id: "some",
        label: "Some orchestration or performance considerations",
        direction: "hybrid",
      },
      {
        id: "strict",
        label:
          "Many integrations, strict latency, retries, resilience, or observability needs",
        direction: "aws-native",
      },
      {
        id: "not-clear-yet",
        label: "Not clear yet",
        direction: "unclear",
      },
    ],
  },
  {
    id: "capability",
    number: 5,
    title: "Which capability is realistically available?",
    answers: [
      {
        id: "mendix",
        label: "Strong Mendix capability",
        direction: "mendix",
      },
      {
        id: "mixed",
        label: "Mixed or unclear capability",
        direction: "hybrid",
      },
      {
        id: "aws",
        label: "Strong AWS-native engineering capability",
        direction: "aws-native",
      },
      {
        id: "not-clear-yet",
        label: "Not clear yet",
        direction: "unclear",
      },
    ],
  },
];

export const QUICK_SCAN_TOTAL = QUICK_SCAN_QUESTIONS.length;

export type QuickScanAnswers = Record<string, string>;
