# Choose Your Stack

A practical enterprise decision workbench for choosing between **Mendix**, **AWS-native engineering**, or a **hybrid architecture**.

Choose Your Stack helps IT managers, platform owners, domain architects, solution architects, and engineering leads make a defensible first platform-direction recommendation before delivery starts.

It is not a platform verdict. It is a workload-fit assessment based on explicit trade-offs.

## Core idea

Enterprise teams often choose a solution direction too early, based on platform preference, existing capability, politics, delivery pressure, or incomplete assumptions.

Choose Your Stack makes the decision more explicit by evaluating workload fit across:

- solution type
- UI importance
- logic complexity
- data and event volume
- performance and latency requirements
- integration complexity
- operational criticality
- delivery and change pattern
- team capability
- runtime demand variability
- custom control over runtime and architecture
- observability and testability needs

The tool produces one of three candidate directions:

- **Mendix candidate**
- **AWS-native candidate**
- **Hybrid candidate**

## Positioning

Use this headline exactly:

```txt
Choose the right platform direction before you start building.
```

Use this subline exactly:

```txt
A practical decision tool for choosing between Mendix, AWS-native engineering, or a hybrid architecture.
```

## Product principles

Choose Your Stack should feel like an architecture decision workbench.

It should be:

- objective
- pragmatic
- critical
- calm
- enterprise-grade
- workload-oriented
- trade-off driven

It should not be:

- a playful quiz
- a vendor battle
- a Mendix sales page
- an AWS sales page
- a generic SaaS dashboard
- a pricing calculator
- an AI-generated architecture document tool

## Visual direction

The visual system is:

```txt
Dark ivory architecture workbench
```

Use the UI system in:

```txt
docs/ui-system.md
```

Main references:

1. Launchframe for structure
2. Rvdobuilds.com for dark/ivory tone
3. My Workframe only for the generated recommendation memo feel

Do not make the product blue-ish.

Do not use the My Workframe blue-violet palette.

## Recommended stack

This project is intended to be a small deterministic web app.

Recommended baseline:

- Next.js App Router
- TypeScript
- Tailwind
- local deterministic decision logic
- no auth
- no database
- no external APIs
- no analytics
- no AI features

## Getting started

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Run the production build:

```bash
npm run build
```

## Recommended project structure

```txt
app/
  page.tsx
components/
  page-shell.tsx
  header.tsx
  card.tsx
  button.tsx
  tabs.tsx
  progress-bar.tsx
  question-card.tsx
  answer-option.tsx
  result-memo.tsx
  score-breakdown.tsx
  cost-model-card.tsx
lib/
  decision-model.ts
  scoring.ts
  result-copy.ts
  types.ts
docs/
  brief.md
  sitemap.md
  ui-system.md
  ux-rules.md
  content-model.md
AGENTS.md
CLAUDE.md
README.md
```

Only create files that are useful. Keep the implementation simple.

## Decision model

The app uses a deterministic weighted scoring model.

Each answer has:

- a score
- a weight
- a workload-direction label (business/process, technical/platform, hybrid or mixed, or unclear)

The score scale is still used to compute a weighted total:

Scoring direction (numeric input to the model):

```txt
-2 = strong Mendix signal
-1 = lean Mendix
 0 = neutral / unclear / hybrid
+1 = lean AWS-native
+2 = strong AWS-native
```

Default outcome thresholds:

```txt
score <= -20 => Mendix candidate
score >= 20  => AWS-native candidate
otherwise    => Hybrid candidate
```

The app also surfaces **signal quality** (High, Medium, Low) based on how many answers were “Not clear yet”, without calling it confidence.

Hard gates override the score when the workload profile clearly indicates Mendix, AWS-native, or hybrid.

The content model lives in:

```txt
docs/content-model.md
```

## Runtime cost model

Choose Your Stack should explain runtime economics without pretending to be a precise pricing calculator.

Use this framing:

```txt
The key question is not “which platform is cheaper?” The key question is “which cost model matches this workload?”
```

AWS-native costs are usually more usage-based. Costs depend on the architecture and may include compute, queues, event routing, databases, storage, observability, networking, and security services.

Mendix costs are usually more platform, environment, and capacity-oriented. Costs may be influenced by runtime resources, database capacity, storage, environments, HA/fallback, scaling, and enterprise licensing agreements.

Do not imply that AWS is always cheaper.

Do not imply that Mendix is always expensive.

## Required result framing

Use this result disclaimer exactly:

```txt
This is not a platform verdict. It is a workload-fit recommendation based on the answers provided.
```

The result should read like an architecture recommendation memo, not a quiz result.

Recommended result sections:

```txt
Recommended direction
Why this direction fits
Main trade-offs
Validation questions before final decision
Cost model implication
Score breakdown
```

## Documentation

Read these files before making product, UX, content, or UI changes:

```txt
AGENTS.md
CLAUDE.md
docs/brief.md
docs/sitemap.md
docs/ui-system.md
docs/ux-rules.md
docs/content-model.md
```

## Development rules

Keep decision logic local and deterministic.

Keep scoring logic pure.

Keep the content model separate from rendering where practical.

Avoid unnecessary dependencies.

Avoid broad refactors.

Avoid product drift.

Do not add:

- authentication
- database storage
- payments
- analytics
- external APIs
- AI features
- chart libraries
- animation libraries
- a large component library

## Final output expectation for coding agents

When a coding agent changes the project, the final response should include:

```txt
OUTPUT:
- changed files listed
- short explanation.
```
