import type { ResultLabel, ResultType } from "./types";

export const RESULT_DISCLAIMER =
  "This is not a platform verdict. It is a workload-fit recommendation based on the answers provided.";

export const HERO_HEADLINE =
  "Choose the right platform direction before you start building.";

export const HERO_SUBLINE =
  "A practical decision tool for choosing between Mendix, AWS-native engineering, or a hybrid architecture.";

export const COST_MODEL_TITLE = "Runtime cost model";

export const LOW_SIGNAL_QUALITY_NOTE =
  "Several inputs are not clear yet. Treat this recommendation as an early direction, not a decision-ready conclusion.";

export const SCORE_BREAKDOWN_INTRO =
  "Each answer contributes to a workload-fit direction. Business/process signals usually support Mendix. Technical/platform signals usually support AWS-native engineering. Mixed or unclear signals keep the result closer to hybrid.";

export const WHAT_WOULD_CHANGE: Record<ResultType, string[]> = {
  mendix: [
    "AWS-native may become stronger if event volume, latency requirements, integration complexity, custom logic, or observability needs are higher than expected.",
    "Hybrid may become stronger if the business UI remains important but technical backend demands need to be separated from the process layer.",
  ],
  "aws-native": [
    "Mendix may become stronger if the workload is mainly a business workflow, the UI is central, delivery speed dominates, or Mendix capability is much stronger in the domain.",
    "Hybrid may become stronger if a business-facing workflow or portal should be separated from the technical backend.",
  ],
  hybrid: [
    "Mendix may become stronger if the technical backend is simpler than expected and most value sits in workflow, UI, and business-process delivery.",
    "AWS-native may become stronger if the UI or process layer is thin and the real value sits in events, APIs, integrations, performance, or resilience.",
  ],
};

export const RESULT_LABELS: Record<ResultType, ResultLabel> = {
  mendix: "Mendix candidate",
  "aws-native": "AWS-native candidate",
  hybrid: "Hybrid candidate",
};

export type ResultContent = {
  recommendation: string;
  closingNote: string;
  whyItFits: string[];
  tradeOffs: string[];
  validationQuestions: string[];
  costModelImplication: string;
};

export const EXECUTIVE_SUMMARY: Record<
  ResultType,
  { reason: string; validation: string }
> = {
  mendix: {
    reason:
      "Business/process workload with UI or workflow importance.",
    validation:
      "Volume, integrations, performance, and operational risk.",
  },
  "aws-native": {
    reason:
      "Technical, event-driven, integration-heavy, or performance-sensitive workload.",
    validation:
      "Build effort, team capability, support model, and business UI needs.",
  },
  hybrid: {
    reason:
      "Business-facing process needs and technical backend needs both matter.",
    validation:
      "Architecture boundary, ownership split, integrations, and runtime cost model.",
  },
};

export const NEXT_CHECKS: Record<ResultType, string[]> = {
  mendix: [
    "Validate expected volume and peak usage.",
    "Check integration complexity and failure handling.",
    "Confirm performance and operational risk are acceptable.",
    "Confirm Mendix capability and ownership are available.",
  ],
  "aws-native": [
    "Validate build effort and engineering capacity.",
    "Confirm operational ownership, monitoring, and incident response.",
    "Check whether a separate business UI or workflow layer is needed.",
    "Validate full runtime cost drivers, not only compute/event cost.",
  ],
  hybrid: [
    "Define the boundary between process/UI and backend/events.",
    "Confirm ownership of each layer.",
    "Validate integration points and failure handling between layers.",
    "Check whether one side clearly dominates enough to avoid hybrid complexity.",
  ],
};

export const RESULT_CONTENT: Record<ResultType, ResultContent> = {
  mendix: {
    recommendation:
      "This solution appears to be primarily a business/process application. Mendix is likely a strong fit because the value is in business-facing UI, workflow delivery, process standardisation, and speed of change.",
    closingNote:
      "Validate volume, integration complexity, performance requirements, and operational risk before final approval.",
    whyItFits: [
      "The workload appears to be business-facing rather than platform-facing.",
      "The UI or workflow layer is important to the value of the solution.",
      "The process can likely be modelled and changed faster in a low-code delivery model.",
      "Mendix capability in the domain may reduce delivery friction.",
    ],
    tradeOffs: [
      "Runtime cost may be less directly usage-based than an AWS-native design.",
      "High event volume or strict latency requirements can weaken the fit.",
      "Deep custom engineering, testing, and observability needs may require additional architecture review.",
      "Platform lock-in should be explicitly accepted rather than assumed.",
    ],
    validationQuestions: [
      "Are the expected volumes and peaks safely within the intended Mendix runtime setup?",
      "Are integrations standard enough for the Mendix delivery model?",
      "Is the required UI mostly business-process UI rather than a highly custom product experience?",
      "Can the team operate and change this app reliably over time?",
      "Are licensing, environments, HA, and capacity costs understood?",
    ],
    costModelImplication:
      "Mendix may be the better total-delivery choice when speed, business involvement, process fit, and available capability outweigh pure runtime elasticity. Validate platform, environment, capacity, HA, and enterprise licensing costs before final approval.",
  },
  "aws-native": {
    recommendation:
      "This solution appears to be primarily a technical, integration-heavy, event-driven, or performance-sensitive workload. AWS-native engineering is likely a strong fit because the value is in elasticity, technical control, resilience, observability, and long-term flexibility.",
    closingNote:
      "Validate build effort, team capability, support model, and whether a separate business UI layer is needed.",
    whyItFits: [
      "The workload has strong technical or platform characteristics.",
      "High volume, peaks, performance, or integration complexity point toward cloud-native runtime control.",
      "Usage-based services may align better with event-driven workloads.",
      "Custom logic, resilience, testing, and observability can be engineered directly.",
    ],
    tradeOffs: [
      "Build effort may be higher than a low-code process app.",
      "Delivery speed depends strongly on engineering capacity and platform maturity.",
      "A business-facing UI may still need a separate delivery approach.",
      "Operational ownership must be explicit.",
      "Poor architecture can make AWS expensive or fragile.",
    ],
    validationQuestions: [
      "Is there sufficient AWS-native engineering capability available?",
      "Who owns support, monitoring, incident response, and change over time?",
      "What are the actual database, networking, logging, security, and HA cost drivers?",
      "Is a separate business UI or workflow layer needed?",
      "Are event retries, idempotency, failure handling, and observability designed explicitly?",
    ],
    costModelImplication:
      "AWS-native may align better with usage-based runtime economics for event-heavy, spiky, or performance-sensitive workloads. Validate the full architecture cost, including compute, queues, event routing, database, storage, observability, networking, and security services.",
  },
  hybrid: {
    recommendation:
      "This solution appears to contain both business-process needs and technical platform needs. A hybrid architecture may be strongest: Mendix for the business-facing workflow or UI layer, and AWS-native engineering for event processing, integrations, APIs, and runtime-critical components.",
    closingNote: "Define the architecture boundary explicitly before delivery starts.",
    whyItFits: [
      "The workload does not cleanly fit one platform shape.",
      "The business-facing UI or workflow layer may benefit from Mendix speed and process modelling.",
      "The technical backend may benefit from AWS-native elasticity, integration control, and observability.",
      "Separating the boundary can reduce both over-engineering and platform mismatch.",
    ],
    tradeOffs: [
      "Architecture boundaries must be explicit before delivery starts.",
      "Integration between Mendix and AWS becomes part of the solution design.",
      "Ownership can become unclear if not agreed upfront.",
      "End-to-end testing and observability need deliberate design.",
      "Costs can shift between platform capacity and cloud-native services.",
    ],
    validationQuestions: [
      "Which capability owns the UI or workflow layer?",
      "Which capability owns event processing, APIs, integrations, and data services?",
      "What is the contract between Mendix and AWS-native components?",
      "Where does business logic live?",
      "How are errors, retries, observability, and support handled end to end?",
    ],
    costModelImplication:
      "Hybrid can align each layer with the most suitable cost model: Mendix for business-facing workflow delivery and AWS-native services for usage-based event processing, integrations, APIs, and runtime-critical behavior. Validate integration, ownership, and duplicated operational costs.",
  },
};
