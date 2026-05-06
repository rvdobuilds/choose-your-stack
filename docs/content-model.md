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
  fitDirection:
    | "business_process"
    | "technical_platform"
    | "hybrid"
    | "unclear";
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

export type SignalQuality = "High" | "Medium" | "Low";

export type AssessmentResult = {
  type: ResultType;
  label: "Mendix candidate" | "AWS-native candidate" | "Hybrid candidate";
  score: number;
  signalQuality: SignalQuality;
  triggeredHardGate?: string;
  recommendation: string;
  whyItFits: string[];
  tradeOffs: string[];
  validationQuestions: string[];
  costModelImplication: string;
  breakdown: ScoreBreakdownRow[];
};
```

## Unclear answers ("Not clear yet")

Every question includes an answer labelled:

```txt
Not clear yet
```

With:

```txt
score = 0
weight = same as the question
fitDirection = unclear
```

This option does not push the recommendation toward Mendix, AWS-native, or hybrid by itself.

## Signal quality

Compute signal quality from the count of "Not clear yet" selections:

```txt
0–1 unclear answers => High
2–3 unclear answers => Medium
4 or more unclear answers => Low
```

Show **Signal quality** (High / Medium / Low) in the result executive summary. Do not call this “confidence” and do not use percentages.

When signal quality is Low, show:

```txt
Several inputs are not clear yet. Treat this recommendation as an early direction, not a decision-ready conclusion.
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

Helper (shown as description copy):

```txt
Frame the workload before scoring anything else. The shape of the solution drives most of the platform fit.
```

Weight:

```txt
3
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| business-workflow-case-process | A business workflow, case, approval, or process application | -2 |
| business-portal-crud-internal | A business portal or CRUD-style internal application | -1 |
| combined-business-screens-technical-backend | A solution with both business-facing screens and technical backend work | 0 |
| api-event-integration-layer | An API-first service, event processor, or integration layer | 2 |
| not-clear-yet | Not clear yet | 0 |

### 2. UI need

Question id:

```txt
ui-need
```

Question:

```txt
How important is the UI?
```

Helper:

```txt
Describe how central the user interface is to the value of the solution.
```

Weight:

```txt
2
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| ui-central-to-value | The UI is central to the value of the solution | -2 |
| ui-needed-for-business-process | The UI is needed for users to complete a business process | -1 |
| ui-useful-not-main-value | The UI is useful, but not the main value driver | 0 |
| no-meaningful-user-facing-ui | There is no meaningful user-facing UI | 2 |
| not-clear-yet | Not clear yet | 0 |

### 3. Logic complexity

Question id:

```txt
business-logic
```

Question:

```txt
How complex is the logic?
```

Helper:

```txt
Separate business-process rules from technical branching, orchestration, and custom engineering logic.
```

Weight:

```txt
2
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| simple-process-validation-rules | Mostly simple process or validation rules | -2 |
| moderate-rules-stakeholder-review | Moderate business rules that business stakeholders can review | -1 |
| mix-business-technical-rules | A mix of business rules and technical rules | 0 |
| complex-custom-orchestration-branching | Complex custom logic, orchestration, or technical branching | 2 |
| not-clear-yet | Not clear yet | 0 |

### 4. Data or event volume

Question id:

```txt
volume
```

Question:

```txt
What is the expected data or event volume?
```

Helper:

```txt
Describe volume shape and predictability rather than platform preference.
```

Weight:

```txt
3
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| low-volume-predictable | Low volume and predictable usage | -2 |
| medium-volume-steady | Medium volume and mostly steady usage | -1 |
| high-volume-mostly-predictable | High volume, but mostly predictable | 1 |
| high-volume-peaks-spikes | High volume with clear peaks or spikes | 2 |
| not-clear-yet | Not clear yet | 0 |

### 5. Performance or latency

Question id:

```txt
performance
```

Question:

```txt
How strict are performance or latency requirements?
```

Helper:

```txt
Describe the runtime requirement the solution must meet in production.
```

Weight:

```txt
3
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| normal-enterprise-app-performance | Normal enterprise application performance is sufficient | -2 |
| some-performance-no-strict-latency | Some performance expectations, but no strict latency target | -1 |
| performance-designed-explicitly | Performance matters and should be designed explicitly | 1 |
| performance-latency-critical | Performance or latency is critical to the solution | 2 |
| not-clear-yet | Not clear yet | 0 |

### 6. Integration complexity

Question id:

```txt
integration-complexity
```

Question:

```txt
How complex are the integrations?
```

Helper:

```txt
Describe the number and nature of system interactions, not the preferred implementation style.
```

Weight:

```txt
3
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| few-standard-integrations | Few standard integrations | -2 |
| some-standard-limited-orchestration | Some standard integrations with limited orchestration | -1 |
| several-integrations-orchestration-sequencing | Several integrations with some orchestration or sequencing | 1 |
| many-integrations-event-flows-retries-apis | Many integrations, event flows, retries, APIs, or orchestration concerns | 2 |
| not-clear-yet | Not clear yet | 0 |

### 7. Operational criticality

Question id:

```txt
criticality
```

Question:

```txt
How operationally critical is the solution?
```

Helper:

```txt
Describe the operational risk if the solution is unavailable, slow, or incorrect.
```

Weight:

```txt
3
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| supporting-process-limited-impact | Supporting process with limited operational impact | -1 |
| important-internal-application | Important internal application | 0 |
| business-critical-solution | Business-critical solution | 1 |
| mission-critical-247-sensitive | Mission-critical or 24/7 operationally sensitive solution | 2 |
| not-clear-yet | Not clear yet | 0 |

### 8. Delivery and change pattern

Question id:

```txt
speed-vs-flexibility
```

Question:

```txt
What delivery and change pattern is expected?
```

Helper:

```txt
Describe how the solution is likely to change after the first release.
```

Weight:

```txt
2
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| frequent-business-process-changes | Frequent business-process changes are expected | -2 |
| fast-initial-delivery-over-control | Fast initial delivery matters more than deep technical control | -1 |
| speed-and-flexibility-both-matter | Speed and technical flexibility both matter | 0 |
| long-term-technical-flexibility-important | Long-term technical flexibility and engineered control are important | 2 |
| not-clear-yet | Not clear yet | 0 |

### 9. Delivery capability

Question id:

```txt
team-capability
```

Question:

```txt
Which delivery capability is available for this work?
```

Helper:

```txt
Describe the capability that can realistically build, run, and change this solution in the domain.
```

Weight:

```txt
2
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| strong-mendix-capability-available | Strong Mendix capability is available | -2 |
| some-mendix-capability-available | Some Mendix capability is available | -1 |
| capability-mixed-not-assigned | Capability is mixed or not yet assigned | 0 |
| strong-aws-native-capability-available | Strong AWS-native engineering capability is available | 2 |
| not-clear-yet | Not clear yet | 0 |

### 10. Runtime demand variability

Question id:

```txt
runtime-cost-elasticity
```

Question:

```txt
How variable is expected runtime demand?
```

Helper:

```txt
Describe whether usage is steady or elastic rather than whether one platform is cheaper.
```

Weight:

```txt
2
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| demand-steady-modest | Demand is expected to be steady and modest | -1 |
| demand-somewhat-variable-manageable | Demand is somewhat variable, but manageable | 0 |
| demand-may-grow-or-vary-materially | Demand may grow or vary materially over time | 1 |
| demand-high-spiky-usage-dependent | Demand is high, spiky, or strongly usage-dependent | 2 |
| not-clear-yet | Not clear yet | 0 |

### 11. Custom control over runtime and architecture

Question id:

```txt
lock-in
```

Question:

```txt
How much custom control is needed over the runtime and architecture?
```

Helper:

```txt
Describe the need for control, portability, and engineering flexibility.
```

Weight:

```txt
2
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| standard-platform-conventions-acceptable | Standard platform conventions are acceptable | -2 |
| some-platform-constraints-acceptable | Some platform constraints are acceptable | -1 |
| no-strong-preference-yet | No strong preference yet | 0 |
| custom-control-portability-flexibility-matters | Custom control, portability, or runtime flexibility matters | 2 |
| not-clear-yet | Not clear yet | 0 |

### 12. Observability and testability

Question id:

```txt
observability-testability
```

Question:

```txt
How deep do observability and testability need to be?
```

Helper:

```txt
Describe the level of production evidence, tracing, testing, and operational control required.
```

Weight:

```txt
2
```

Answers:

| Answer id | Label | Score |
|---|---|---:|
| standard-platform-monitoring-enough | Standard platform monitoring is enough | -2 |
| basic-operational-insight-enough | Basic operational insight is enough | -1 |
| moderate-observability-automated-testing | Moderate observability and automated testing are needed | 1 |
| deep-logs-metrics-traces-alerts-tests-slos | Deep logs, metrics, traces, alerts, automated tests, and SLOs are needed | 2 |
| not-clear-yet | Not clear yet | 0 |

## Hard gates

Apply hard gates after the weighted score has been calculated.

### Hard gate 1 — AWS-native candidate

If all of these are true:

```txt
ui-need = no-meaningful-user-facing-ui
volume = high-volume-peaks-spikes
performance = performance-latency-critical
```

Then force:

```txt
AWS-native candidate
```

Hard gate reason:

```txt
No meaningful user-facing UI, high volume with spikes, and critical performance or latency create a strong AWS-native signal.
```

User-facing explanation:

```txt
This case strongly matches a high-volume, performance-sensitive technical workload pattern, which creates a strong AWS-native signal.
```

### Hard gate 2 — Mendix candidate

If all of these are true:

```txt
solution-type = business-workflow-case-process
ui-need = ui-central-to-value
volume = low-volume-predictable OR medium-volume-steady
```

Then force:

```txt
Mendix candidate
```

Hard gate reason:

```txt
A business workflow-style application with UI-central value and low or medium steady volume creates a strong Mendix signal.
```

User-facing explanation:

```txt
This case strongly matches a business-facing process-app pattern, which creates a strong Mendix signal.
```

### Hard gate 3 — Hybrid candidate

If this is true:

```txt
solution-type = combined-business-screens-technical-backend
```

And at least one of these is true:

```txt
volume = high-volume-peaks-spikes
integration-complexity = many-integrations-event-flows-retries-apis
```

Then force:

```txt
Hybrid candidate
```

Hard gate reason:

```txt
Combined business-facing and technical backend needs with high volume or integration-heavy interactions create a strong hybrid signal.
```

User-facing explanation:

```txt
This case strongly combines business-facing process needs with technical backend demands, which creates a strong hybrid signal.
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

Summary framing:

```txt
Each answer contributes to a workload-fit direction. Business/process signals usually support Mendix. Technical/platform signals usually support AWS-native engineering. Mixed or unclear signals keep the result closer to hybrid.
```

In expanded scoring details, label answer direction as:

```txt
Business/process signal
Technical/platform signal
Hybrid or mixed signal
Unclear signal
```

Avoid framing Mendix as “negative” or AWS-native as “positive”, and avoid “good score” / “bad score” language.

Example breakdown row:

```txt
Axis: Data or event volume
Selected answer: High volume with clear peaks or spikes
Signal direction: Technical/platform signal
Explanation: Describe why this axis reads as technical/platform-oriented for this workload.
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
