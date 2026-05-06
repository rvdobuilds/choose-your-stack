# CLAUDE.md — Choose Your Stack

## Role

You are working on Choose Your Stack, an enterprise architecture decision workbench for choosing between Mendix, AWS-native engineering, and hybrid architecture.

Your job is to implement narrowly scoped changes without drifting into unrelated product, UI, or architecture work.

## Read first

Before making changes, read these files in this order:

1. `AGENTS.md`
2. `docs/brief.md`
3. `docs/sitemap.md`
4. `docs/ui-system.md`
5. `docs/ux-rules.md`
6. `docs/content-model.md`

If the user gives a newer explicit instruction, follow that instruction and keep the change narrow.

## Core product rule

Choose Your Stack does not declare a universal winner.

It produces a workload-fit recommendation:

- Mendix candidate
- AWS-native candidate
- Hybrid candidate

The output is a candidate direction that still needs architecture validation.

## Non-negotiable copy

Use this hero headline exactly:

```txt
Choose the right platform direction before you start building.
```

Use this hero subline exactly:

```txt
A practical decision tool for choosing between Mendix, AWS-native engineering, or a hybrid architecture.
```

Use this result disclaimer exactly:

```txt
This is not a platform verdict. It is a workload-fit recommendation based on the answers provided.
```

Use this cost section title exactly:

```txt
Runtime cost model
```

Use only these result labels exactly:

```txt
Mendix candidate
AWS-native candidate
Hybrid candidate
```

## UI direction

The interface must be dark + ivory.

It must not be blue-ish.

It must not use the My Workframe blue-violet palette.

Use Launchframe as the primary structural reference.

Use Rvdobuilds.com as the dark/ivory tonal reference.

Use My Workframe only as inspiration for the generated recommendation memo feel.

The UI should feel like an architecture workbench that an enterprise architect or IT manager could take seriously.

## Implementation constraints

Do not add auth.

Do not add a database.

Do not add payments.

Do not add analytics.

Do not add external APIs.

Do not add AI features.

Do not add user accounts.

Do not add a backend.

Do not add chart libraries.

Do not add animation libraries.

Do not add unnecessary dependencies.

Do not introduce a large component library.

## Coding rules

Use TypeScript.

Keep decision data typed.

Keep scoring logic pure.

Separate decision content from rendering where practical.

Prefer named constants over magic strings.

Avoid deeply nested JSX.

Avoid unrelated refactors.

Avoid clever abstractions.

Do not change behavior outside the user request.

## Decision model rules

Use `docs/content-model.md` as the source of truth for:

- questions
- answer labels
- scores
- weights
- outcome thresholds
- hard gates
- result copy
- cost model copy

Default scoring:

```txt
score <= -20 => Mendix candidate
score >= 20  => AWS-native candidate
otherwise    => Hybrid candidate
```

Hard gates override the score.

## UX rules

Mobile-first.

One question per screen on mobile.

Answer cards must be large and easy to tap.

A selected answer must be visibly selected without using blue or purple.

Progress should orient the user without dominating the page.

The result should read like an architecture memo.

The score breakdown should explain why the result happened.

The cost model section should explain cost drivers without fake precision.

## Forbidden product drift

Do not turn the app into:

- a generic cloud comparison tool
- a Mendix sales page
- an AWS sales page
- a pricing calculator
- an AI-generated architecture document tool
- a broad enterprise architecture suite
- a generic SaaS dashboard
- a playful quiz

## Validation checklist

Before finishing, check:

- The app still feels objective.
- The UI is dark + ivory, not blue-ish.
- The result labels are exact.
- The result is a candidate direction, not a verdict.
- The scoring is deterministic.
- The hard gates work.
- The app is usable on mobile.
- No forbidden dependencies or features were added.
- The change matches the requested scope.

## Required final output

End with exactly this structure:

```txt
OUTPUT:
- changed files listed
- short explanation.
```
