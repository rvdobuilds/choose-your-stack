# Choose Your Stack — UI System

## Product role

Choose Your Stack is an enterprise architecture decision workbench.

It helps IT managers, platform owners, domain architects, solution architects, and engineering leads compare Mendix, AWS-native engineering, and hybrid solution directions.

The UI must feel like a serious decision-support tool, not a quiz, dashboard, marketing page, or generic SaaS template.

## Source references

Use these references in this order:

1. Launchframe — primary structural reference
2. Rvdobuilds.com — primary tonal and brand reference
3. My Workframe — output/result structure reference only

Do not use the My Workframe color direction.

Choose Your Stack must not become blue-violet, app-like, wellness-like, or personal-productivity-like.

## Visual direction

Dark ivory architecture workbench.

The interface should feel:

- serious
- calm
- premium
- structured
- objective
- enterprise-grade
- tool-first
- decision-oriented

It should not feel:

- playful
- quiz-like
- blue SaaS
- AI-hype
- neon developer tool
- generic dashboard
- bright productivity app
- overly editorial portfolio page

## Core design thesis

The app should look like something an architect could use to prepare a defensible platform-direction recommendation.

It should communicate:

- this is not a platform verdict
- this is not Mendix vs AWS fanboyism
- this is a workload-fit assessment
- the recommendation is based on explicit trade-offs
- the result is a candidate direction that still needs architecture validation

## Color system

Use a dark neutral-ink base with warm ivory text.

The system must not read as blue.

Blue may only appear, if at all, as a barely visible cool undertone in borders or muted secondary text. Do not use blue as the main accent, button color, hero color, result color, or selected state.

### CSS variables

```css
:root {
  /* Page */
  --color-page: #090a0e;
  --color-page-elevated: #0c0d12;
  --color-page-soft: #101218;

  /* Surfaces */
  --color-surface: #15171e;
  --color-surface-muted: #181a22;
  --color-surface-elevated: #1c1f27;
  --color-surface-nested: #222631;
  --color-surface-nested-deep: #292e39;

  /* Utility */
  --color-utility: #030304;
  --color-utility-alt: #07080b;

  /* Text */
  --color-text: #f3eedf;
  --color-text-soft: #e7dfcf;
  --color-text-muted: #b6becb;
  --color-text-subtle: #8f98a8;
  --color-text-faint: #68707f;

  /* Borders */
  --color-border: #3a414d;
  --color-border-muted: rgba(58, 65, 77, 0.62);
  --color-border-strong: #4a525f;
  --color-border-ivory: rgba(243, 238, 223, 0.18);

  /* Accent */
  --color-accent: #f1ead9;
  --color-accent-muted: #c8bfae;
  --color-accent-warm: #b8945e;
  --color-accent-warm-muted: rgba(184, 148, 94, 0.18);

  /* States */
  --color-selected-bg: rgba(243, 238, 223, 0.055);
  --color-selected-border: rgba(243, 238, 223, 0.44);
  --color-hover-bg: rgba(243, 238, 223, 0.045);
  --color-focus-ring: rgba(243, 238, 223, 0.18);

  /* Semantic, restrained */
  --color-risk: #d8a36f;
  --color-positive: #a8c4a2;
  --color-warning: #c6a46b;
  --color-negative: #c9897f;
}
```

### Color role rules

Page background:

Use `--color-page` as the main field.

Use `--color-page-elevated` only for top chrome, sticky areas, or subtle page bands.

Cards:

Use `--color-surface`, `--color-surface-muted`, and `--color-surface-elevated` for primary panels.

Use nested surfaces sparingly. Nested cards should clarify structure, not create visual noise.

Text:

Use warm ivory for primary headings and important labels.

Use muted cool gray for body copy.

Do not use pure white.

Accent:

Use warm ivory as the main accent.

Use muted warm brass only for small emphasis, such as score strength, key numbers, or subtle section markers.

Do not use saturated blue, purple, cyan, green, or bright red as a primary UI color.

## Typography

Use a clean modern sans-serif for everything.

Recommended fonts:

- Geist Sans
- Inter
- system sans-serif fallback

Use monospace only for technical snippets, copied language, formulas, or generated decision text.

Do not use a serif display font for the product UI.

### Type hierarchy

Hero headline:

- large
- strong
- warm ivory
- high contrast
- compact line-height

Section heading:

- strong sans-serif
- clear and sober
- no decorative type treatment

Body:

- readable
- calm
- muted but not weak
- large enough on mobile

Eyebrows:

- uppercase
- letter-spaced
- muted
- used sparingly

Recommended sizing:

```css
--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.125rem;
--font-size-xl: 1.375rem;
--font-size-2xl: 1.75rem;
--font-size-3xl: 2.25rem;
--font-size-4xl: 3rem;

--line-height-tight: 1.08;
--line-height-heading: 1.14;
--line-height-body: 1.6;
```

## Layout principles

Use Launchframe as the primary layout reference.

The app should feel like a compact workbench with clear sections.

Use:

- mobile-first layout
- top navigation
- tab or step navigation where useful
- strong cards
- clear section boundaries
- readable answer options
- focused result sections

Avoid:

- bottom mobile app navigation
- oversized marketing hero spacing
- decorative imagery
- dashboard walls
- dense chart-heavy layouts
- excessive blue-tinted panels

## Page shell

### Header

The header should be compact and steady.

Use:

- product wordmark: `Choose Your Stack`
- optional small mark/icon only if already available
- nav items: `Start`, `Questions`, `Result`, `Cost model`
- subtle bottom border
- dark elevated background

Header should not dominate the viewport.

Mobile header may horizontally scroll navigation if needed, like Launchframe.

### Main container

Use a constrained content width.

Recommended:

```css
max-width: 1120px;
margin-inline: auto;
padding-inline: clamp(1.25rem, 4vw, 2.5rem);
padding-block: clamp(1.5rem, 4vw, 3rem);
```

### Section rhythm

Major sections should have enough spacing to breathe, but not feel like a portfolio page.

Use tighter spacing than Rvdobuilds.com.

Use less empty space than a marketing landing page.

## Core screens

### 1. Start / intro screen

Purpose:

Explain what the tool does and start the decision flow.

Structure:

- eyebrow: `CHOOSE YOUR STACK`
- headline: `Choose the right platform direction before you start building.`
- short explanation
- primary CTA: `Start assessment`
- secondary CTA: `View cost model`
- small note: `Mendix, AWS-native, or hybrid. Not a platform verdict.`

Visual treatment:

Use one large elevated card.

Do not use decorative hero imagery.

Do not use blue gradient backgrounds.

### 2. Questionnaire screen

Purpose:

Let the user answer workload-fit questions with confidence.

Structure:

- progress label: `Question 3 of 12`
- thin progress bar
- question title
- optional short explanation
- stacked answer cards
- back/next controls

One question per screen is preferred for mobile.

On desktop, a two-column layout is allowed:

- left: current question
- right: live decision snapshot

Do not show too many scores while the user is answering. The tool should feel guided, not mechanical.

### 3. Result screen

Purpose:

Present a defensible platform-direction recommendation.

The result must feel like an architecture memo, not a quiz result.

Use My Workframe's generated-manual seriousness, but with the Launchframe/Rvdobuilds color system.

Recommended structure:

- eyebrow: `RECOMMENDED DIRECTION`
- result label: `Mendix candidate`, `AWS-native candidate`, or `Hybrid candidate`
- short recommendation paragraph
- `Why this direction fits`
- `Main trade-offs`
- `Validation questions before final decision`
- `Cost model implication`
- `Score breakdown`

Use strong headings and clear panels.

Do not celebrate the result.

Do not use winner language.

Do not show confetti, badges, gamified states, or bright result colors.

### 4. Cost model screen

Purpose:

Explain why different workloads expose different cost models.

Structure:

- `Runtime cost model`
- two comparison cards: `AWS-native` and `Mendix`
- optional `Hybrid boundary` card
- `What can make this expensive?`
- `What to validate internally?`

AWS-native card should explain usage-based cost drivers.

Mendix card should explain platform, environment, capacity, HA, and resource-sizing cost drivers.

Do not imply AWS is always cheaper.

Do not imply Mendix is always expensive.

## Components

### Cards

Cards are the primary structural component.

Use them for:

- intro panels
- question groups
- answer options
- result sections
- cost model explanations
- score breakdowns

Card style:

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 28px;
  box-shadow: none;
}
```

Card rules:

- use border and tonal difference over shadow
- avoid too many nested borders
- avoid large empty cards
- avoid glossy or glassmorphism effects

### Answer cards

Answer cards must be easy to scan and tap.

Default:

```css
.answer-card {
  background: var(--color-surface-muted);
  border: 1px solid var(--color-border-muted);
  border-radius: 18px;
}
```

Hover:

```css
.answer-card:hover {
  background: var(--color-hover-bg);
  border-color: var(--color-border-strong);
}
```

Selected:

```css
.answer-card[data-selected="true"] {
  background: var(--color-selected-bg);
  border-color: var(--color-selected-border);
}
```

Selected state must be clear without using blue or purple.

### Buttons

Primary button:

```css
.button-primary {
  background: var(--color-accent);
  color: #0d1322;
  border: 1px solid rgba(243, 238, 223, 0.32);
}
```

Secondary button:

```css
.button-secondary {
  background: var(--color-surface-elevated);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
```

Ghost button:

```css
.button-ghost {
  background: transparent;
  color: var(--color-text-muted);
  border: 1px solid transparent;
}
```

Button rules:

- primary action should be obvious
- do not make every button full-width on desktop
- mobile CTAs may be full-width
- avoid weak ghost buttons for important actions
- avoid blue CTA backgrounds

### Tabs

Use tabs when there are clear modes or sections.

Example:

- `Start`
- `Assessment`
- `Result`
- `Cost model`

Active tab:

- dark elevated surface
- ivory text
- visible border

Do not use blue active states.

### Progress indicator

Use a simple thin progress bar.

```css
.progress-track {
  background: rgba(243, 238, 223, 0.08);
}

.progress-fill {
  background: var(--color-accent);
}
```

Progress should support orientation, not dominate the page.

### Result label

Result labels should be calm and serious.

Do not color Mendix/AWS/Hybrid with brand-like colors.

Use one shared style for all outcomes.

```css
.result-label {
  background: rgba(243, 238, 223, 0.06);
  color: var(--color-text);
  border: 1px solid var(--color-border-ivory);
  border-radius: 999px;
}
```

The recommendation text should carry the meaning, not the badge color.

### Score breakdown

Use structured rows, not dashboard charts.

Each row should show:

- axis name
- selected answer
- signal direction
- short explanation

Optional:

- a small neutral horizontal meter

Do not create colorful bar charts.

Do not overemphasize the numeric score at the expense of reasoning.

### Cost comparison cards

Use two or three cards:

- AWS-native
- Mendix
- Hybrid boundary

Each card should include:

- cost model summary
- main cost drivers
- when this model fits
- what to validate

Use quiet headings and clear body text.

Do not present fake precision.

## Content style

Tone:

- objective
- pragmatic
- critical
- calm
- specific

Use:

- `candidate`
- `workload fit`
- `trade-off`
- `validation`
- `cost model`
- `architecture boundary`
- `operational ownership`

Avoid:

- `winner`
- `best platform`
- `always`
- `never`
- `cheap`
- `expensive` without context
- hype language
- playful quiz language

### Result wording pattern

Use this pattern:

```text
This solution appears to be a [type of workload].

[Platform direction] is likely a strong candidate because [main reasons].

This is not a platform verdict. Validate [watch-outs] before final approval.
```

### Microcopy examples

Good:

```text
Recommended direction
AWS-native candidate

Why this direction fits
High volume, clear peaks, strict performance requirements, and integration complexity point toward a usage-based, event-driven runtime model.
```

Bad:

```text
AWS wins!
You should definitely build this in AWS because Mendix will be too expensive.
```

## Responsive behavior

Mobile:

- one-column layout
- one question per screen
- large tap targets
- sticky bottom action area allowed
- answer cards full-width
- avoid bottom app navigation

Desktop:

- max-width container
- optional two-column assessment layout
- result pages can use side-by-side panels
- cost model comparison can use two or three columns

Minimum tap target:

```css
min-height: 44px;
```

## Accessibility

Use strong contrast between text and background.

Do not rely on color alone for selected states or result meaning.

Selected answer cards need:

- border change
- background change
- optional check indicator
- `aria-pressed` or radio semantics

Focus states must be visible.

```css
:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 3px;
}
```

## Implementation guidance

Use semantic components:

- `PageShell`
- `Header`
- `Section`
- `Card`
- `Button`
- `Tabs`
- `QuestionCard`
- `AnswerOption`
- `ProgressBar`
- `ResultMemo`
- `ScoreBreakdown`
- `CostModelCard`

Keep styling simple and token-based.

Do not introduce a large component library.

Do not add chart libraries.

Do not add animation libraries.

Small CSS transitions are allowed for hover, selected, and focus states.

```css
transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease;
```

## Anti-patterns

Do not do these:

- blue-violet My Workframe palette
- bright blue CTAs
- saturated gradients
- quiz-style result cards
- gamified scoring
- colorful dashboards
- generic SaaS card wall
- heavy glassmorphism
- neon developer theme
- oversized marketing imagery
- bottom mobile navigation
- too many nested bordered panels
- fake exact cost certainty
- platform-war language

## Design acceptance checklist

Before considering the UI done, check:

- Does the app read as dark + ivory, not blue?
- Does it feel like an architecture workbench?
- Is the result presented as a recommendation memo, not a quiz answer?
- Are Mendix, AWS-native, and hybrid treated neutrally?
- Are selected answer states clear without blue or purple?
- Is the questionnaire easy to use on mobile?
- Is the cost model explained without claiming universal cost truth?
- Are cards substantial but not cluttered?
- Is the typography calm, strong, and readable?
- Would an IT manager or architect take this seriously in an enterprise setting?
