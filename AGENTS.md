# AGENTS.md — Choose Your Stack

## Project

Choose Your Stack is a practical enterprise decision workbench for choosing between:

1. Mendix
2. AWS-native engineering
3. Hybrid architecture

The product helps IT managers, platform owners, domain architects, solution architects, and engineering leads make an explicit workload-fit decision before delivery starts.

It must not feel like a platform war, quiz, vendor comparison page, or generic SaaS dashboard.

## Product thesis

The app should help a user answer:

> Which solution direction best matches this workload, operating model, capability context, and cost profile?

The app must produce a candidate direction, not a final verdict.

Valid result labels are exactly:

- Mendix candidate
- AWS-native candidate
- Hybrid candidate

Do not invent additional result types.

## Required project docs

Read these files before making product, UX, content, or UI changes:

- `docs/brief.md`
- `docs/sitemap.md`
- `docs/ui-system.md`
- `docs/ux-rules.md`
- `docs/content-model.md`

If a requested change conflicts with these docs, follow the user's latest explicit instruction and keep the change narrow.

## Technical defaults

Use the existing Next.js App Router project.

Use TypeScript.

Use Tailwind.

Prefer simple local state.

Keep all decision logic local and deterministic.

Use pure TypeScript functions for scoring, hard gates, and result generation.

Recommended structure:

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
```

Only create these files if useful. Do not over-engineer.

## Hard constraints

Do not add authentication.

Do not add a database.

Do not add payments.

Do not add analytics.

Do not add external APIs.

Do not add AI features.

Do not add user accounts.

Do not add a backend unless explicitly requested.

Do not add chart libraries.

Do not add animation libraries.

Do not add a large component library.

Do not introduce unnecessary dependencies.

Do not change the product name.

Do not rename the result labels.

Do not make the UI blue-ish.

Do not use the My Workframe color palette.

Do not make the app playful, gamified, or quiz-like.

## Visual direction

Use the UI system in `docs/ui-system.md`.

Core visual direction:

> Dark ivory architecture workbench.

The UI should feel close to Launchframe in structure and close to Rvdobuilds.com in dark/ivory tone.

Use My Workframe only as inspiration for the seriousness of the generated output/result memo.

Avoid:

- blue-violet accents
- bright blue CTAs
- neon colors
- glassmorphism
- generic SaaS dashboards
- colorful charts
- bottom mobile app navigation
- large decorative hero imagery

## Content tone

Use an objective, pragmatic, critical tone.

Treat Mendix, AWS-native, and hybrid as valid enterprise options.

Never imply that AWS is always better.

Never imply that Mendix is only for simple apps.

Never imply that Mendix is always expensive.

Never imply that AWS is always cheap.

Use these terms:

- candidate
- workload fit
- trade-off
- validation
- runtime cost model
- architecture boundary
- operational ownership
- team capability
- platform direction

Avoid these terms:

- winner
- loser
- best platform
- always
- never
- cheap
- expensive, unless contextualised
- fanboy language
- hype language

## Copy exactness

Use this hero headline exactly:

> Choose the right platform direction before you start building.

Use this hero subline exactly:

> A practical decision tool for choosing between Mendix, AWS-native engineering, or a hybrid architecture.

Use this framing copy near the result exactly:

> This is not a platform verdict. It is a workload-fit recommendation based on the answers provided.

Use this cost model title exactly:

> Runtime cost model

Use these result labels exactly:

- Mendix candidate
- AWS-native candidate
- Hybrid candidate

## Decision logic

Use the scoring model and hard-gate rules in `docs/content-model.md`.

Scoring rule:

```txt
-2 = strong Mendix signal
-1 = lean Mendix
 0 = neutral / mixed / unclear
+1 = lean AWS-native
+2 = strong AWS-native
```

Weighted score:

```txt
answer.score * question.weight
```

Default result bands:

```txt
score <= -20 => Mendix candidate
score >= 20  => AWS-native candidate
otherwise    => Hybrid candidate
```

Then apply hard-gate rules from `docs/content-model.md`.

Hard gates override the score.

## UX rules

The assessment must be mobile-first.

Use one question per screen on mobile.

Use clear answer cards.

Selected states must be clear without blue or purple.

The result must feel like an architecture recommendation memo.

The score breakdown must explain the reasoning, not just show a number.

The cost model section must explain cost drivers without fake precision.

## Accessibility rules

Use semantic buttons or radio controls for answer options.

Ensure keyboard navigation works.

Use visible focus states.

Do not rely on color alone for selected states or result meaning.

Maintain strong contrast on dark backgrounds.

Minimum tap target is 44px.

## Development workflow

Before editing:

1. Read the relevant docs.
2. Inspect the existing files.
3. Make the smallest coherent change.

During editing:

1. Keep logic deterministic.
2. Keep copy close to the docs.
3. Avoid scope creep.
4. Avoid unrelated refactors.

After editing:

1. Run TypeScript checks if available.
2. Run lint if available.
3. Run build if available.
4. Fix errors caused by the change.

## Output format

Always end implementation work with:

```txt
OUTPUT:
- changed files listed
- short explanation
```
