# Choose Your Stack — Content Model

## Purpose

This file defines the decision model, scoring structure, hard gates, result content, and cost model content for Choose Your Stack.

Keep this model deterministic.

Do not add AI-generated interpretation in V1.

## Result labels

Use exactly these labels:

```txt
Mendix candidate
AWS-native candidate
Hybrid candidate
```

Do not add variants such as:

```txt
Strong AWS fit
Mendix recommended
Hybrid recommended
Needs review
```

## Scoring model

Each answer has a score.

```txt
-2 = strong Mendix signal
-1 = lean Mendix
 0 = neutral / mixed / unclear
+1 = lean AWS-native
+2 = strong AWS-native
```

Each question has a weight.

Weighted score:

```txt
answer.score * question.weight
```

Final score:

```txt
sum(weighted answer scores)
```

Default result bands:

```txt
score <= -20 => Mendix candidate
score >= 20  => AWS-native candidate
otherwise    => Hybrid candidate
```

After calculating the default result, apply hard gates.

Hard gates override the score.

## Type model

Recommended TypeScript types:

```ts
export type ResultType = "mendix" | "aws-native" | "hybrid";

export type Signal = -2 | -1 | 0 | 1 | 2;

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
};

export type Question = {
  id: QuestionId;
  eyebrow?: string;
  title: string;
  description?: string;
  weight: number;
  answers: AnswerOption[];
};

export type AssessmentAnswers = Partial<Record<QuestionId, string>>;

export type ScoreBreakdownRow = {
  questionId: QuestionId;
  questionTitle: string;
  selectedAnswer: string;
  score: Signal;
  weight: number;
  weightedScore: number;
  explanation: string;
};

export type AssessmentResult = {
  type: ResultType;
  label: "Mendix candidate" | "AWS-native candidate" | "Hybrid candidate";
  score: number;
  triggeredHardGate?: string;
  recommendation: string;
  whyItFits: string[];
  tradeOffs: string[];
  validationQuestions: string[];
  costModelImplication: string;
  breakdown: ScoreBreakdownRow[];
};
```

## Questions

### 1. Solution type

Question id:

```txt
solution-type
```

Question:

```txt
What type of solution is this?
```

Weight:

```txt
3
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| business-process-app | Business process app / workflow / case management | -2 |
| internal-portal | Internal portal or CRUD-style business app | -1 |
| combined-business-technical | Combination of business app and technical backend | 0 |
| api-event-integration | API-first service, event processor, or integration layer | 2 |

### 2. UI need

Question id:

```txt
ui-need
```

Question:

```txt
How important is the UI?
```

Weight:

```txt
2
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| rich-business-ui | Rich business-facing UI is central | -2 |
| basic-ui | Basic UI is needed | -1 |
| ui-not-differentiating | UI is useful but not differentiating | 0 |
| no-meaningful-ui | No meaningful UI is needed | 2 |

### 3. Business logic

Question id:

```txt
business-logic
```

Question:

```txt
How complex is the business logic?
```

Weight:

```txt
2
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| simple-process-rules | Simple process rules | -2 |
| moderate-business-rules | Moderate business rules | -1 |
| mixed-business-technical-rules | Mixed business and technical rules | 0 |
| complex-custom-logic | Complex custom logic or technical branching | 2 |

### 4. Data or event volume

Question id:

```txt
volume
```

Question:

```txt
What is the expected data or event volume?
```

Weight:

```txt
3
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| low-predictable | Low and predictable | -2 |
| medium-steady | Medium and steady | -1 |
| high-predictable | High but predictable | 1 |
| high-spiky | High volume with clear peaks or spikes | 2 |

### 5. Performance or latency

Question id:

```txt
performance
```

Question:

```txt
How strict are performance or latency requirements?
```

Weight:

```txt
3
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| normal-enterprise-performance | Normal enterprise app performance is enough | -2 |
| some-performance-expectations | Some performance expectations | -1 |
| performance-manageable | Performance matters but is manageable | 1 |
| performance-essential | Performance is essential | 2 |

### 6. Integration complexity

Question id:

```txt
integration-complexity
```

Question:

```txt
How complex are the integrations?
```

Weight:

```txt
3
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| few-standard-integrations | Few standard integrations | -2 |
| some-standard-integrations | Some standard integrations | -1 |
| several-integrations | Several integrations with some orchestration | 1 |
| many-event-api-orchestration | Many integrations, event flows, retries, APIs, or orchestration | 2 |

### 7. Criticality

Question id:

```txt
criticality
```

Question:

```txt
How business-critical is the solution?
```

Weight:

```txt
3
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| supporting-process | Supporting process | -1 |
| important-internal-app | Important internal app | 0 |
| business-critical | Business-critical | 1 |
| mission-critical | Mission-critical or 24/7 operationally sensitive | 2 |

### 8. Speed vs technical flexibility

Question id:

```txt
speed-vs-flexibility
```

Question:

```txt
What matters more: speed or technical flexibility?
```

Weight:

```txt
2
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| speed-dominant | Fast delivery is the dominant concern | -2 |
| speed-over-flexibility | Speed matters more than technical flexibility | -1 |
| balanced | Balanced | 0 |
| flexibility-essential | Long-term technical flexibility is essential | 2 |

### 9. Team capability

Question id:

```txt
team-capability
```

Question:

```txt
What capability is strongest in the domain or team?
```

Weight:

```txt
2
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| strong-mendix | Strong Mendix capability | -2 |
| some-mendix | Some Mendix capability | -1 |
| mixed-unclear | Mixed or unclear capability | 0 |
| strong-aws-native | Strong AWS-native engineering capability | 2 |

### 10. Runtime cost elasticity

Question id:

```txt
runtime-cost-elasticity
```

Question:

```txt
How important is runtime cost elasticity?
```

Weight:

```txt
2
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| not-important | Not very important | -1 |
| somewhat-important | Somewhat important | 0 |
| important | Important | 1 |
| very-important-spiky | Very important due to high or spiky usage | 2 |

### 11. Lock-in tolerance

Question id:

```txt
lock-in
```

Question:

```txt
How much platform lock-in is acceptable?
```

Weight:

```txt
2
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| platform-standardisation-acceptable | Platform standardisation is acceptable | -2 |
| some-lock-in-acceptable | Some lock-in is acceptable | -1 |
| neutral | Neutral | 0 |
| custom-control-portability | Custom control and portability matter | 2 |

### 12. Observability and testability

Question id:

```txt
observability-testability
```

Question:

```txt
How deep do observability and testability need to be?
```

Weight:

```txt
2
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| standard-platform-monitoring | Standard platform monitoring is enough | -2 |
| basic-operational-insight | Basic operational insight is enough | -1 |
| moderate-observability-testing | Moderate observability and testing needed | 1 |
| deep-observability-slo | Deep logs, metrics, traces, alerts, automated tests, and SLOs needed | 2 |

## Hard gates

Apply hard gates after the weighted score has been calculated.

### Hard gate 1 — AWS-native candidate

If all of these are true:

```txt
ui-need = no-meaningful-ui
volume = high-spiky
performance = performance-essential
```

Then force:

```txt
AWS-native candidate
```

Hard gate reason:

```txt
No meaningful UI, high spiky volume, and essential performance create a strong AWS-native signal.
```

### Hard gate 2 — Mendix candidate

If all of these are true:

```txt
solution-type = business-process-app
ui-need = rich-business-ui
volume = low-predictable OR medium-steady
```

Then force:

```txt
Mendix candidate
```

Hard gate reason:

```txt
A rich business-facing process app with low or medium predictable volume creates a strong Mendix signal.
```

### Hard gate 3 — Hybrid candidate

If this is true:

```txt
solution-type = combined-business-technical
```

And at least one of these is true:

```txt
volume = high-spiky
integration-complexity = many-event-api-orchestration
```

Then force:

```txt
Hybrid candidate
```

Hard gate reason:

```txt
The workload combines business-facing app needs with high-volume or integration-heavy technical needs, so the architecture boundary should be explicit.
```

## Result content

### Mendix candidate

Recommendation:

```txt
This solution appears to be primarily a business/process application. Mendix is likely a strong candidate because the value is in business-facing UI, workflow delivery, process standardisation, and speed of change.
```

Why this direction fits:

```txt
The workload appears to be business-facing rather than platform-facing.
The UI or workflow layer is important to the value of the solution.
The process can likely be modelled and changed faster in a low-code delivery model.
Mendix capability in the domain may reduce delivery friction.
```

Main trade-offs:

```txt
Runtime cost may be less directly usage-based than an AWS-native design.
High event volume or strict latency requirements can weaken the fit.
Deep custom engineering, testing, and observability needs may require additional architecture review.
Platform lock-in should be explicitly accepted rather than assumed.
```

Validation questions:

```txt
Are the expected volumes and peaks safely within the intended Mendix runtime setup?
Are integrations standard enough for the Mendix delivery model?
Is the required UI mostly business-process UI rather than a highly custom product experience?
Can the team operate and change this app reliably over time?
Are licensing, environments, HA, and capacity costs understood?
```

Cost model implication:

```txt
Mendix may be the better total-delivery choice when speed, business involvement, process fit, and available capability outweigh pure runtime elasticity. Validate platform, environment, capacity, HA, and enterprise licensing costs before final approval.
```

### AWS-native candidate

Recommendation:

```txt
This solution appears to be primarily a technical, integration-heavy, event-driven, or performance-sensitive workload. AWS-native engineering is likely a strong candidate because the value is in elasticity, technical control, resilience, observability, and long-term flexibility.
```

Why this direction fits:

```txt
The workload has strong technical or platform characteristics.
High volume, peaks, performance, or integration complexity point toward cloud-native runtime control.
Usage-based services may align better with event-driven workloads.
Custom logic, resilience, testing, and observability can be engineered directly.
```

Main trade-offs:

```txt
Build effort may be higher than a low-code process app.
Delivery speed depends strongly on engineering capacity and platform maturity.
A business-facing UI may still need a separate delivery approach.
Operational ownership must be explicit.
Poor architecture can make AWS expensive or fragile.
```

Validation questions:

```txt
Is there sufficient AWS-native engineering capability available?
Who owns support, monitoring, incident response, and change over time?
What are the actual database, networking, logging, security, and HA cost drivers?
Is a separate business UI or workflow layer needed?
Are event retries, idempotency, failure handling, and observability designed explicitly?
```

Cost model implication:

```txt
AWS-native may align better with usage-based runtime economics for event-heavy, spiky, or performance-sensitive workloads. Validate the full architecture cost, including compute, queues, event routing, database, storage, observability, networking, and security services.
```

### Hybrid candidate

Recommendation:

```txt
This solution appears to contain both business-process needs and technical platform needs. A hybrid architecture may be strongest: Mendix for the business-facing workflow or UI layer, and AWS-native engineering for event processing, integrations, APIs, and runtime-critical components.
```

Why this direction fits:

```txt
The workload does not cleanly fit one platform shape.
The business-facing UI or workflow layer may benefit from Mendix speed and process modelling.
The technical backend may benefit from AWS-native elasticity, integration control, and observability.
Separating the boundary can reduce both over-engineering and platform mismatch.
```

Main trade-offs:

```txt
Architecture boundaries must be explicit before delivery starts.
Integration between Mendix and AWS becomes part of the solution design.
Ownership can become unclear if not agreed upfront.
End-to-end testing and observability need deliberate design.
Costs can shift between platform capacity and cloud-native services.
```

Validation questions:

```txt
Which capability owns the UI or workflow layer?
Which capability owns event processing, APIs, integrations, and data services?
What is the contract between Mendix and AWS-native components?
Where does business logic live?
How are errors, retries, observability, and support handled end to end?
```

Cost model implication:

```txt
Hybrid can align each layer with the most suitable cost model: Mendix for business-facing workflow delivery and AWS-native services for usage-based event processing, integrations, APIs, and runtime-critical behavior. Validate integration, ownership, and duplicated operational costs.
```

## Required result disclaimer

Show this near every final result:

```txt
This is not a platform verdict. It is a workload-fit recommendation based on the answers provided.
```

## Cost model section

Required title:

```txt
Runtime cost model
```

Required intro:

```txt
Different workload profiles expose different cost models. The goal is not to prove that one platform is always cheaper. The goal is to understand which cost model matches the solution.
```

Required AWS-native text:

```txt
AWS-native costs are usually more usage-based. You pay across the services the architecture consumes, such as compute, queues, event routing, databases, storage, observability, networking, and security services.
```

AWS-native cost drivers:

```txt
Compute duration and request volume
Queue, event, and message volume
Database reads, writes, storage, and provisioned capacity
API, load balancing, and data transfer
Logs, metrics, traces, alarms, and retention
Networking, NAT, security, KMS, secrets, and WAF
High availability and disaster recovery setup
```

AWS-native caution:

```txt
AWS is not automatically cheap. Poor architecture, overlogging, inefficient database access, NAT Gateway misuse, excessive data transfer, or overprovisioning can make AWS materially more expensive.
```

Required Mendix text:

```txt
Mendix costs are usually more platform, environment, and capacity-oriented. Costs are influenced by runtime resources, database capacity, storage, environments, HA/fallback, scaling, and enterprise licensing agreements.
```

Mendix cost drivers:

```txt
Application runtime capacity
Database size and capacity
File storage
Number of environments such as dev, test, acceptance, and production
High availability and fallback requirements
Horizontal scaling and headroom for peaks
Enterprise licensing and internal chargeback model
```

Mendix caution:

```txt
Mendix can still be the better total-cost choice when fast delivery, business involvement, process fit, and available capability reduce build and change costs.
```

Required closing line:

```txt
The key question is not “which platform is cheaper?” The key question is “which cost model matches this workload?”
```

## Example case wording

Use this only if an example case is needed.

```txt
For a workload profile with 2 million events per day, clear peaks, business-critical behavior, performance requirements, and medium-high logic, AWS-native is likely to have substantially lower runtime costs because it aligns with a usage-based event-processing model. Mendix may require paying for provisioned platform capacity, multiple environments, HA/fallback, horizontal scaling, and peak headroom. Under reasonable midpoint assumptions, the runtime difference can be around €69k per year. This is not a universal AWS-vs-Mendix rule; it is a workload-specific run-cost estimate that still needs validation against internal pricing, architecture design, and enterprise agreements.
```

## Score breakdown explanations

Use short explanations based on selected answer signals.

Signal labels:

```txt
-2 => Strong Mendix signal
-1 => Lean Mendix
 0 => Neutral or mixed
+1 => Lean AWS-native
+2 => Strong AWS-native signal
```

Example breakdown row:

```txt
Axis: Data or event volume
Selected answer: High volume with clear peaks or spikes
Signal: Strong AWS-native signal
Explanation: Spiky event volume usually benefits from elastic, usage-based runtime design and explicit event-processing architecture.
```

## Content anti-patterns

Do not write:

```txt
AWS wins.
Mendix is too expensive.
Mendix is only good for simple apps.
AWS is always cheaper.
This is definitely the right platform.
```

Prefer:

```txt
AWS-native is likely a strong candidate for this workload profile.
Mendix may still be viable if UI/process delivery and team capability dominate.
Hybrid may be strongest if the UI/workflow layer and event-processing layer can be separated cleanly.
Validate cost, capability, and operational ownership before final approval.
```
