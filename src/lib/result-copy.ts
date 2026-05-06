import type { ResultLabel, ResultType, Signal } from "./types";

export const RESULT_DISCLAIMER =
  "This is not a platform verdict. It is a workload-fit recommendation based on the answers provided.";

export const HERO_HEADLINE =
  "Choose the right platform direction before you start building.";

export const HERO_SUBLINE =
  "A practical decision tool for choosing between Mendix, AWS-native engineering, or a hybrid architecture.";

export const COST_MODEL_TITLE = "Runtime cost model";

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

export const SIGNAL_LABELS: Record<Signal, string> = {
  [-2]: "Strong Mendix signal",
  [-1]: "Lean Mendix",
  0: "Neutral or mixed",
  1: "Lean AWS-native",
  2: "Strong AWS-native signal",
};
