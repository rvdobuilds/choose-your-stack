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
        id: "business-workflow-case-process",
        label:
          "A business workflow, case, approval, or process application",
        score: -2,
        fitDirection: "business_process",
      },
      {
        id: "business-portal-crud-internal",
        label: "A business portal or CRUD-style internal application",
        score: -1,
        fitDirection: "business_process",
      },
      {
        id: "combined-business-screens-technical-backend",
        label:
          "A solution with both business-facing screens and technical backend work",
        score: 0,
        fitDirection: "hybrid",
      },
      {
        id: "api-event-integration-layer",
        label:
          "An API-first service, event processor, or integration layer",
        score: 2,
        fitDirection: "technical_platform",
      },
      {
        id: "not-clear-yet",
        label: "Not clear yet",
        score: 0,
        fitDirection: "unclear",
      },
    ],
  },
  {
    id: "ui-need",
    number: 2,
    title: "How important is the UI?",
    description:
      "Describe how central the user interface is to the value of the solution.",
    weight: 2,
    answers: [
      {
        id: "ui-central-to-value",
        label: "The UI is central to the value of the solution",
        score: -2,
        fitDirection: "business_process",
      },
      {
        id: "ui-needed-for-business-process",
        label:
          "The UI is needed for users to complete a business process",
        score: -1,
        fitDirection: "business_process",
      },
      {
        id: "ui-useful-not-main-value",
        label: "The UI is useful, but not the main value driver",
        score: 0,
        fitDirection: "hybrid",
      },
      {
        id: "no-meaningful-user-facing-ui",
        label: "There is no meaningful user-facing UI",
        score: 2,
        fitDirection: "technical_platform",
      },
      {
        id: "not-clear-yet",
        label: "Not clear yet",
        score: 0,
        fitDirection: "unclear",
      },
    ],
  },
  {
    id: "business-logic",
    number: 3,
    title: "How complex is the logic?",
    description:
      "Separate business-process rules from technical branching, orchestration, and custom engineering logic.",
    weight: 2,
    answers: [
      {
        id: "simple-process-validation-rules",
        label: "Mostly simple process or validation rules",
        score: -2,
        fitDirection: "business_process",
      },
      {
        id: "moderate-rules-stakeholder-review",
        label:
          "Moderate business rules that business stakeholders can review",
        score: -1,
        fitDirection: "business_process",
      },
      {
        id: "mix-business-technical-rules",
        label: "A mix of business rules and technical rules",
        score: 0,
        fitDirection: "hybrid",
      },
      {
        id: "complex-custom-orchestration-branching",
        label:
          "Complex custom logic, orchestration, or technical branching",
        score: 2,
        fitDirection: "technical_platform",
      },
      {
        id: "not-clear-yet",
        label: "Not clear yet",
        score: 0,
        fitDirection: "unclear",
      },
    ],
  },
  {
    id: "volume",
    number: 4,
    title: "What is the expected data or event volume?",
    description:
      "Describe volume shape and predictability rather than platform preference.",
    weight: 3,
    answers: [
      {
        id: "low-volume-predictable",
        label: "Low volume and predictable usage",
        score: -2,
        fitDirection: "business_process",
      },
      {
        id: "medium-volume-steady",
        label: "Medium volume and mostly steady usage",
        score: -1,
        fitDirection: "business_process",
      },
      {
        id: "high-volume-mostly-predictable",
        label: "High volume, but mostly predictable",
        score: 1,
        fitDirection: "technical_platform",
      },
      {
        id: "high-volume-peaks-spikes",
        label: "High volume with clear peaks or spikes",
        score: 2,
        fitDirection: "technical_platform",
      },
      {
        id: "not-clear-yet",
        label: "Not clear yet",
        score: 0,
        fitDirection: "unclear",
      },
    ],
  },
  {
    id: "performance",
    number: 5,
    title: "How strict are performance or latency requirements?",
    description:
      "Describe the runtime requirement the solution must meet in production.",
    weight: 3,
    answers: [
      {
        id: "normal-enterprise-app-performance",
        label:
          "Normal enterprise application performance is sufficient",
        score: -2,
        fitDirection: "business_process",
      },
      {
        id: "some-performance-no-strict-latency",
        label:
          "Some performance expectations, but no strict latency target",
        score: -1,
        fitDirection: "business_process",
      },
      {
        id: "performance-designed-explicitly",
        label: "Performance matters and should be designed explicitly",
        score: 1,
        fitDirection: "technical_platform",
      },
      {
        id: "performance-latency-critical",
        label: "Performance or latency is critical to the solution",
        score: 2,
        fitDirection: "technical_platform",
      },
      {
        id: "not-clear-yet",
        label: "Not clear yet",
        score: 0,
        fitDirection: "unclear",
      },
    ],
  },
  {
    id: "integration-complexity",
    number: 6,
    title: "How complex are the integrations?",
    description:
      "Describe the number and nature of system interactions, not the preferred implementation style.",
    weight: 3,
    answers: [
      {
        id: "few-standard-integrations",
        label: "Few standard integrations",
        score: -2,
        fitDirection: "business_process",
      },
      {
        id: "some-standard-limited-orchestration",
        label:
          "Some standard integrations with limited orchestration",
        score: -1,
        fitDirection: "business_process",
      },
      {
        id: "several-integrations-orchestration-sequencing",
        label:
          "Several integrations with some orchestration or sequencing",
        score: 1,
        fitDirection: "technical_platform",
      },
      {
        id: "many-integrations-event-flows-retries-apis",
        label:
          "Many integrations, event flows, retries, APIs, or orchestration concerns",
        score: 2,
        fitDirection: "technical_platform",
      },
      {
        id: "not-clear-yet",
        label: "Not clear yet",
        score: 0,
        fitDirection: "unclear",
      },
    ],
  },
  {
    id: "criticality",
    number: 7,
    title: "How operationally critical is the solution?",
    description:
      "Describe the operational risk if the solution is unavailable, slow, or incorrect.",
    weight: 3,
    answers: [
      {
        id: "supporting-process-limited-impact",
        label: "Supporting process with limited operational impact",
        score: -1,
        fitDirection: "business_process",
      },
      {
        id: "important-internal-application",
        label: "Important internal application",
        score: 0,
        fitDirection: "hybrid",
      },
      {
        id: "business-critical-solution",
        label: "Business-critical solution",
        score: 1,
        fitDirection: "technical_platform",
      },
      {
        id: "mission-critical-247-sensitive",
        label:
          "Mission-critical or 24/7 operationally sensitive solution",
        score: 2,
        fitDirection: "technical_platform",
      },
      {
        id: "not-clear-yet",
        label: "Not clear yet",
        score: 0,
        fitDirection: "unclear",
      },
    ],
  },
  {
    id: "speed-vs-flexibility",
    number: 8,
    title: "What delivery and change pattern is expected?",
    description:
      "Describe how the solution is likely to change after the first release.",
    weight: 2,
    answers: [
      {
        id: "frequent-business-process-changes",
        label: "Frequent business-process changes are expected",
        score: -2,
        fitDirection: "business_process",
      },
      {
        id: "fast-initial-delivery-over-control",
        label:
          "Fast initial delivery matters more than deep technical control",
        score: -1,
        fitDirection: "business_process",
      },
      {
        id: "speed-and-flexibility-both-matter",
        label: "Speed and technical flexibility both matter",
        score: 0,
        fitDirection: "hybrid",
      },
      {
        id: "long-term-technical-flexibility-important",
        label:
          "Long-term technical flexibility and engineered control are important",
        score: 2,
        fitDirection: "technical_platform",
      },
      {
        id: "not-clear-yet",
        label: "Not clear yet",
        score: 0,
        fitDirection: "unclear",
      },
    ],
  },
  {
    id: "team-capability",
    number: 9,
    title: "Which delivery capability is available for this work?",
    description:
      "Describe the capability that can realistically build, run, and change this solution in the domain.",
    weight: 2,
    answers: [
      {
        id: "strong-mendix-capability-available",
        label: "Strong Mendix capability is available",
        score: -2,
        fitDirection: "business_process",
      },
      {
        id: "some-mendix-capability-available",
        label: "Some Mendix capability is available",
        score: -1,
        fitDirection: "business_process",
      },
      {
        id: "capability-mixed-not-assigned",
        label: "Capability is mixed or not yet assigned",
        score: 0,
        fitDirection: "hybrid",
      },
      {
        id: "strong-aws-native-capability-available",
        label: "Strong AWS-native engineering capability is available",
        score: 2,
        fitDirection: "technical_platform",
      },
      {
        id: "not-clear-yet",
        label: "Not clear yet",
        score: 0,
        fitDirection: "unclear",
      },
    ],
  },
  {
    id: "runtime-cost-elasticity",
    number: 10,
    title: "How variable is expected runtime demand?",
    description:
      "Describe whether usage is steady or elastic rather than whether one platform is cheaper.",
    weight: 2,
    answers: [
      {
        id: "demand-steady-modest",
        label: "Demand is expected to be steady and modest",
        score: -1,
        fitDirection: "business_process",
      },
      {
        id: "demand-somewhat-variable-manageable",
        label: "Demand is somewhat variable, but manageable",
        score: 0,
        fitDirection: "hybrid",
      },
      {
        id: "demand-may-grow-or-vary-materially",
        label: "Demand may grow or vary materially over time",
        score: 1,
        fitDirection: "technical_platform",
      },
      {
        id: "demand-high-spiky-usage-dependent",
        label: "Demand is high, spiky, or strongly usage-dependent",
        score: 2,
        fitDirection: "technical_platform",
      },
      {
        id: "not-clear-yet",
        label: "Not clear yet",
        score: 0,
        fitDirection: "unclear",
      },
    ],
  },
  {
    id: "lock-in",
    number: 11,
    title:
      "How much custom control is needed over the runtime and architecture?",
    description:
      "Describe the need for control, portability, and engineering flexibility.",
    weight: 2,
    answers: [
      {
        id: "standard-platform-conventions-acceptable",
        label: "Standard platform conventions are acceptable",
        score: -2,
        fitDirection: "business_process",
      },
      {
        id: "some-platform-constraints-acceptable",
        label: "Some platform constraints are acceptable",
        score: -1,
        fitDirection: "business_process",
      },
      {
        id: "no-strong-preference-yet",
        label: "No strong preference yet",
        score: 0,
        fitDirection: "hybrid",
      },
      {
        id: "custom-control-portability-flexibility-matters",
        label:
          "Custom control, portability, or runtime flexibility matters",
        score: 2,
        fitDirection: "technical_platform",
      },
      {
        id: "not-clear-yet",
        label: "Not clear yet",
        score: 0,
        fitDirection: "unclear",
      },
    ],
  },
  {
    id: "observability-testability",
    number: 12,
    title: "How deep do observability and testability need to be?",
    description:
      "Describe the level of production evidence, tracing, testing, and operational control required.",
    weight: 2,
    answers: [
      {
        id: "standard-platform-monitoring-enough",
        label: "Standard platform monitoring is enough",
        score: -2,
        fitDirection: "business_process",
      },
      {
        id: "basic-operational-insight-enough",
        label: "Basic operational insight is enough",
        score: -1,
        fitDirection: "business_process",
      },
      {
        id: "moderate-observability-automated-testing",
        label:
          "Moderate observability and automated testing are needed",
        score: 1,
        fitDirection: "technical_platform",
      },
      {
        id: "deep-logs-metrics-traces-alerts-tests-slos",
        label:
          "Deep logs, metrics, traces, alerts, automated tests, and SLOs are needed",
        score: 2,
        fitDirection: "technical_platform",
      },
      {
        id: "not-clear-yet",
        label: "Not clear yet",
        score: 0,
        fitDirection: "unclear",
      },
    ],
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;
