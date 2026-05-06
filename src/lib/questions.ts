import type { Question } from "./types";

export const QUESTIONS: Question[] = [
  {
    id: "solution-type",
    number: 1,
    title: "What type of solution is this?",
    description:
      "Frame the workload before scoring anything else. The shape of the solution drives most of the platform fit.",
    weight: 3,
    answers: [
      {
        id: "business-process-app",
        label: "Business process app / workflow / case management",
        score: -2,
      },
      {
        id: "internal-portal",
        label: "Internal portal or CRUD-style business app",
        score: -1,
      },
      {
        id: "combined-business-technical",
        label: "Combination of business app and technical backend",
        score: 0,
      },
      {
        id: "api-event-integration",
        label: "API-first service, event processor, or integration layer",
        score: 2,
      },
    ],
  },
  {
    id: "ui-need",
    number: 2,
    title: "How important is the UI?",
    description:
      "A rich business-facing UI usually pulls toward Mendix. A minimal UI usually pulls toward AWS-native engineering.",
    weight: 2,
    answers: [
      {
        id: "rich-business-ui",
        label: "Rich business-facing UI is central",
        score: -2,
      },
      {
        id: "basic-ui",
        label: "Basic UI is needed",
        score: -1,
      },
      {
        id: "ui-not-differentiating",
        label: "UI is useful but not differentiating",
        score: 0,
      },
      {
        id: "no-meaningful-ui",
        label: "No meaningful UI is needed",
        score: 2,
      },
    ],
  },
  {
    id: "business-logic",
    number: 3,
    title: "How complex is the business logic?",
    description:
      "Process rules tend to fit a low-code delivery model. Branching technical logic tends to fit cloud-native engineering.",
    weight: 2,
    answers: [
      {
        id: "simple-process-rules",
        label: "Simple process rules",
        score: -2,
      },
      {
        id: "moderate-business-rules",
        label: "Moderate business rules",
        score: -1,
      },
      {
        id: "mixed-business-technical-rules",
        label: "Mixed business and technical rules",
        score: 0,
      },
      {
        id: "complex-custom-logic",
        label: "Complex custom logic or technical branching",
        score: 2,
      },
    ],
  },
  {
    id: "volume",
    number: 4,
    title: "What is the expected data or event volume?",
    description:
      "Volume shape and predictability are strong runtime signals. Spiky volume usually rewards elastic, usage-based design.",
    weight: 3,
    answers: [
      {
        id: "low-predictable",
        label: "Low and predictable",
        score: -2,
      },
      {
        id: "medium-steady",
        label: "Medium and steady",
        score: -1,
      },
      {
        id: "high-predictable",
        label: "High but predictable",
        score: 1,
      },
      {
        id: "high-spiky",
        label: "High volume with clear peaks or spikes",
        score: 2,
      },
    ],
  },
  {
    id: "performance",
    number: 5,
    title: "How strict are performance or latency requirements?",
    description:
      "Strict latency requirements usually need explicit architectural control over runtime, networking, and data paths.",
    weight: 3,
    answers: [
      {
        id: "normal-enterprise-performance",
        label: "Normal enterprise app performance is enough",
        score: -2,
      },
      {
        id: "some-performance-expectations",
        label: "Some performance expectations",
        score: -1,
      },
      {
        id: "performance-manageable",
        label: "Performance matters but is manageable",
        score: 1,
      },
      {
        id: "performance-essential",
        label: "Performance is essential",
        score: 2,
      },
    ],
  },
  {
    id: "integration-complexity",
    number: 6,
    title: "How complex are the integrations?",
    description:
      "Standard integrations fit business-process platforms. Many event flows, retries, and orchestration usually fit cloud-native services.",
    weight: 3,
    answers: [
      {
        id: "few-standard-integrations",
        label: "Few standard integrations",
        score: -2,
      },
      {
        id: "some-standard-integrations",
        label: "Some standard integrations",
        score: -1,
      },
      {
        id: "several-integrations",
        label: "Several integrations with some orchestration",
        score: 1,
      },
      {
        id: "many-event-api-orchestration",
        label:
          "Many integrations, event flows, retries, APIs, or orchestration",
        score: 2,
      },
    ],
  },
  {
    id: "criticality",
    number: 7,
    title: "How business-critical is the solution?",
    description:
      "Higher criticality demands tighter resilience, observability, and explicit operational ownership.",
    weight: 3,
    answers: [
      {
        id: "supporting-process",
        label: "Supporting process",
        score: -1,
      },
      {
        id: "important-internal-app",
        label: "Important internal app",
        score: 0,
      },
      {
        id: "business-critical",
        label: "Business-critical",
        score: 1,
      },
      {
        id: "mission-critical",
        label: "Mission-critical or 24/7 operationally sensitive",
        score: 2,
      },
    ],
  },
  {
    id: "speed-vs-flexibility",
    number: 8,
    title: "What matters more: speed or technical flexibility?",
    description:
      "Speed of delivery favours platform standardisation. Long-term technical flexibility favours engineered control.",
    weight: 2,
    answers: [
      {
        id: "speed-dominant",
        label: "Fast delivery is the dominant concern",
        score: -2,
      },
      {
        id: "speed-over-flexibility",
        label: "Speed matters more than technical flexibility",
        score: -1,
      },
      {
        id: "balanced",
        label: "Balanced",
        score: 0,
      },
      {
        id: "flexibility-essential",
        label: "Long-term technical flexibility is essential",
        score: 2,
      },
    ],
  },
  {
    id: "team-capability",
    number: 9,
    title: "What capability is strongest in the domain or team?",
    description:
      "Capability fit is a delivery reality, not a preference. The platform that the team can run reliably matters.",
    weight: 2,
    answers: [
      {
        id: "strong-mendix",
        label: "Strong Mendix capability",
        score: -2,
      },
      {
        id: "some-mendix",
        label: "Some Mendix capability",
        score: -1,
      },
      {
        id: "mixed-unclear",
        label: "Mixed or unclear capability",
        score: 0,
      },
      {
        id: "strong-aws-native",
        label: "Strong AWS-native engineering capability",
        score: 2,
      },
    ],
  },
  {
    id: "runtime-cost-elasticity",
    number: 10,
    title: "How important is runtime cost elasticity?",
    description:
      "Elastic runtime cost matters most when usage is high or spiky. Stable usage often fits a platform-capacity model.",
    weight: 2,
    answers: [
      {
        id: "not-important",
        label: "Not very important",
        score: -1,
      },
      {
        id: "somewhat-important",
        label: "Somewhat important",
        score: 0,
      },
      {
        id: "important",
        label: "Important",
        score: 1,
      },
      {
        id: "very-important-spiky",
        label: "Very important due to high or spiky usage",
        score: 2,
      },
    ],
  },
  {
    id: "lock-in",
    number: 11,
    title: "How much platform lock-in is acceptable?",
    description:
      "Platform standardisation reduces delivery cost. Custom control supports portability and long-term flexibility.",
    weight: 2,
    answers: [
      {
        id: "platform-standardisation-acceptable",
        label: "Platform standardisation is acceptable",
        score: -2,
      },
      {
        id: "some-lock-in-acceptable",
        label: "Some lock-in is acceptable",
        score: -1,
      },
      {
        id: "neutral",
        label: "Neutral",
        score: 0,
      },
      {
        id: "custom-control-portability",
        label: "Custom control and portability matter",
        score: 2,
      },
    ],
  },
  {
    id: "observability-testability",
    number: 12,
    title: "How deep do observability and testability need to be?",
    description:
      "Standard platform monitoring is enough for many internal apps. Deep SLOs and tracing usually need engineered runtimes.",
    weight: 2,
    answers: [
      {
        id: "standard-platform-monitoring",
        label: "Standard platform monitoring is enough",
        score: -2,
      },
      {
        id: "basic-operational-insight",
        label: "Basic operational insight is enough",
        score: -1,
      },
      {
        id: "moderate-observability-testing",
        label: "Moderate observability and testing needed",
        score: 1,
      },
      {
        id: "deep-observability-slo",
        label:
          "Deep logs, metrics, traces, alerts, automated tests, and SLOs needed",
        score: 2,
      },
    ],
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;
