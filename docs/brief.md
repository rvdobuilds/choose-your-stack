# Choose Your Stack — Brief

## Product name

Choose Your Stack

## One-line description

A practical enterprise decision tool for choosing between Mendix, AWS-native engineering, or a hybrid architecture.

## Hero copy

Headline:

> Choose the right platform direction before you start building.

Subline:

> A practical decision tool for choosing between Mendix, AWS-native engineering, or a hybrid architecture.

## Target users

Primary users:

- IT managers
- platform owners
- domain architects
- solution architects
- engineering leads
- product owners involved in platform-direction decisions

Secondary users:

- business owners
- delivery managers
- enterprise architects
- technical leads

## Problem

Enterprise teams often choose a solution direction too early, based on preference, current capability, politics, historical defaults, or incomplete assumptions.

For a company with both Mendix and AWS-native engineering capability, the question is not simply which platform is better. The real question is which workload profile fits which operating model, cost model, delivery model, and technical capability.

Common failure modes:

- A business-process app is over-engineered as a custom cloud-native solution.
- An event-heavy technical workload is forced into a low-code platform shape.
- UI needs and backend runtime needs are mixed into one platform decision.
- Run costs are discussed without separating runtime economics from build economics.
- Capability fit is treated as secondary even though it determines delivery success.
- The final decision is not easy to explain or defend.

## Product goal

Help users create a defensible first platform-direction recommendation.

The product should make trade-offs explicit across:

- solution type
- UI need
- business logic complexity
- data and event volume
- performance requirements
- integration complexity
- business criticality
- time-to-market
- team capability
- runtime cost model
- lock-in tolerance
- observability and testability needs
- strategic differentiation

## Core positioning

Choose Your Stack is not a pricing calculator.

Choose Your Stack is not a cloud-vs-low-code debate tool.

Choose Your Stack is not a final architecture approval process.

Choose Your Stack is a workload-fit assessment that helps teams decide whether a solution should start from Mendix, AWS-native engineering, or a hybrid architecture.

## Product principles

### 1. Candidate direction, not verdict

The result must always be framed as a candidate recommendation.

Use this disclaimer near the result:

> This is not a platform verdict. It is a workload-fit recommendation based on the answers provided.

### 2. Both capabilities are valid

Mendix and AWS-native engineering must both be treated as legitimate enterprise capabilities.

Avoid implying that one is mature and the other is immature.

Avoid implying that one is always faster, cheaper, safer, or more scalable.

### 3. Workload fit over preference

The decision must be driven by the shape of the workload, not platform taste.

The main comparison is:

- business/process app fit
- technical/platform/event-driven fit
- hybrid boundary fit

### 4. Separate cost dimensions

The tool should separate:

- runtime economics
- build/delivery economics
- change economics
- capability/team fit
- operational risk
- strategic fit

### 5. Explain the reasoning

The result should not only show a label.

It should explain:

- why this direction fits
- what trade-offs remain
- what must be validated before final approval
- what the cost model implies

## V1 scope

V1 includes:

- one-page app
- intro section
- assessment questionnaire
- deterministic scoring
- hard-gate logic
- result memo
- score breakdown
- cost model explanation
- mobile-first UI
- local state only

## V1 out of scope

V1 does not include:

- login
- saved assessments
- database storage
- PDF export
- AI-generated recommendations
- integration with internal systems
- detailed pricing calculator
- multi-user review
- architecture approval workflow
- vendor-specific sales content
- public benchmark claims
- charts or dashboards

## Outcome labels

Use exactly these labels:

- Mendix candidate
- AWS-native candidate
- Hybrid candidate

## Suggested mental model

Mendix usually fits when the solution is primarily a business/process application.

AWS-native usually fits when the solution is primarily a technical/platform/event-driven workload.

Hybrid usually fits when the solution has a business-facing UI/process layer and a technically demanding backend/event-processing layer.

## Cost-model thesis

AWS-native costs are usually more usage-based.

Mendix costs are usually more platform, environment, and capacity-oriented.

The key question is not:

> Which platform is cheaper?

The key question is:

> Which cost model matches this workload?

## Visual direction

Dark ivory architecture workbench.

Use Launchframe as the primary structural reference.

Use Rvdobuilds.com as the dark/ivory tonal reference.

Use My Workframe only as inspiration for the seriousness of the generated result memo.

Do not use the My Workframe blue-violet color direction.

## Success criteria

A good V1 lets a user quickly:

- answer the main workload-fit questions
- see a clear candidate direction
- understand the reasoning
- understand cost-model implications
- discuss the result internally without it sounding biased

A good V1 should feel credible enough for an IT manager, platform owner, domain architect, or solution architect to use as input for a real architecture conversation.
