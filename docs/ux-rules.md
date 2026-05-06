# Choose Your Stack — UX Rules

## Core UX principle

Choose Your Stack must feel like an architecture decision workbench.

It must not feel like:

- a playful quiz
- a vendor battle
- a generic SaaS dashboard
- a pricing calculator
- a consulting slide turned into a form
- a developer-only tool

## UX promise

The user should be able to:

1. Understand the purpose within 5 seconds.
2. Answer the main workload-fit questions without needing definitions for every term.
3. Receive a candidate direction that feels explainable and defensible.
4. See the trade-offs and validation questions before treating the result as final.

## Interaction model

Use a guided assessment flow.

On mobile, show one question per screen.

On desktop, a two-column workbench is allowed:

- left: active question
- right: live decision snapshot

The default should be calm and focused, not dense.

## Start experience

The start screen should immediately explain:

- what the tool does
- who it is for
- what outcomes are possible
- that this is not a platform verdict

Required hero headline:

```txt
Choose the right platform direction before you start building.
```

Required hero subline:

```txt
A practical decision tool for choosing between Mendix, AWS-native engineering, or a hybrid architecture.
```

Primary CTA:

```txt
Start assessment
```

Secondary CTA:

```txt
View cost model
```

Do not use a large decorative hero image.

Do not use hype copy.

## Question UX

Each question should have:

- a question number
- a short question title
- optional short explanation
- answer cards
- back/next controls

Example:

```txt
Question 4 of 12
What is the expected data or event volume?
```

Answer cards should be written in plain enterprise language.

Avoid answer text that is too technical for IT managers.

Avoid answer text that is too vague for architects.

## Answer card rules

Answer cards must be large, clear, and tappable.

Each answer card should have:

- label
- optional short explanation if needed
- selected state

Selected state must use:

- border change
- subtle background change
- optional check indicator

Selected state must not depend on blue, purple, or saturated color.

Minimum tap target:

```txt
44px
```

## Progress rules

Progress should show orientation, not pressure.

Use:

```txt
Question X of 12
```

Use a thin progress bar.

Do not use gamified progress.

Do not show points, badges, streaks, or scores during the main questionnaire.

## Navigation rules

Allow the user to go back.

Allow the user to revise answers.

Do not trap the user.

Do not require account creation.

Do not require save/login before showing result.

Primary action should be visually obvious.

On mobile, action buttons may be full width.

On desktop, action buttons should not become unnecessarily large.

## Live snapshot rules

During the active assessment, do not show a live directional preview (for example “leaning Mendix” or a running recommendation).

On the assessment screen, use neutral copy only, for example:

```txt
Assessment in progress.
```

Show orientation with:

```txt
Question X of 12
X of 12 answered
```

and a thin progress bar.

The recommendation is shown only after the assessment is complete (for example on `/result`).

## Result UX

The result screen is the most important screen.

It must feel like an architecture recommendation memo.

It must not feel like a quiz result.

The executive summary should include **Recommendation**, **Reason**, **Main validation**, and **Signal quality** (High, Medium, or Low). If signal quality is Low, include the low-signal note from the content model (do not call it “confidence”).

Add a short **What would change this recommendation?** section to improve neutrality and practical next steps.

Required result disclaimer:

```txt
This is not a platform verdict. It is a workload-fit recommendation based on the answers provided.
```

Result structure:

```txt
RECOMMENDED DIRECTION
[Result label]
[Recommendation paragraph]

Why this direction fits
Main trade-offs
Validation questions before final decision
Cost model implication
Score breakdown
```

Result labels must be exactly:

```txt
Mendix candidate
AWS-native candidate
Hybrid candidate
```

Do not use:

- “winner”
- “best choice”
- “final decision”
- “you should definitely”
- “AWS wins”
- “Mendix wins”

## Score breakdown UX

The score breakdown should explain the recommendation.

Each row should show:

- decision axis
- selected answer
- signal direction
- short reason

Do not overemphasise the numeric score.

Do not use colorful charts.

Do not use a dashboard wall.

Use quiet structured rows.

## Cost model UX

The cost model section must be explanatory, not salesy.

Required title:

```txt
Runtime cost model
```

The section should help users understand:

- AWS-native is usually more usage-based
- Mendix is usually more platform/environment/capacity-oriented
- architecture quality and enterprise agreements can change the real outcome
- the right question is which cost model matches the workload

Use this line:

```txt
The key question is not “which platform is cheaper?” The key question is “which cost model matches this workload?”
```

Do not present universal cost claims.

Do not show fake exact estimates in V1 unless the user explicitly asks for an example case.

## Hybrid UX

Hybrid must feel like a first-class outcome, not a fallback.

When recommending hybrid, the tool should explain the boundary:

```txt
Mendix can own the business-facing workflow or UI layer.
AWS-native engineering can own event processing, integrations, APIs, and runtime-critical components.
```

Always include:

```txt
Define the architecture boundary explicitly before delivery starts.
```

## Language rules

Use clear enterprise language.

Good terms:

- workload fit
- candidate direction
- runtime cost model
- platform capacity
- event-driven workload
- business-process application
- architecture boundary
- operational ownership
- validation questions
- trade-offs

Avoid:

- fun quiz language
- “magic”
- “AI-powered”
- “10x”
- “no-brainer”
- “always”
- “never”
- platform-war phrasing

## Visual UX rules

Use the dark + ivory UI system.

Do not make the app blue-ish.

Do not use My Workframe colors.

Do not use saturated gradients.

Do not use glossy cards.

Do not use decorative images in the core tool.

Use cards to create structure, not decoration.

Use strong typography and spacing over visual effects.

## Mobile rules

Mobile is a primary experience.

Rules:

- one column
- one question per screen
- full-width answer cards
- readable body text
- no tiny controls
- no bottom app navigation
- no horizontal overflow except optional top nav tabs
- sticky bottom actions allowed only if they do not cover content

## Desktop rules

Desktop can feel more like a workbench.

Allowed:

- two-column assessment layout
- side-by-side cost cards
- wider result memo
- sticky side snapshot

Avoid:

- dense grid dashboards
- too many columns
- unnecessary empty hero space

## Accessibility rules

Answer options should use radio semantics or accessible button states.

Keyboard navigation must work.

Focus state must be visible.

Do not rely on color alone.

Use clear labels.

Do not reduce opacity so far that text becomes weak.

Ensure contrast is strong enough on dark surfaces.

## Empty and incomplete states

If no questions are answered yet, the result section should invite the user to start the assessment.

Example:

```txt
Complete the assessment to generate a workload-fit recommendation.
```

If some but not all questions are answered, allow completion before showing the final result.

Do not show a final recommendation before the required questions are answered.

## Reset behavior

If reset is added, label it plainly:

```txt
Start over
```

Ask for confirmation only if answers would be lost.

Do not make reset prominent.

## Acceptance checklist

Before considering the UX done, verify:

- The first screen explains the product quickly.
- The questionnaire is easy on mobile.
- The result feels like a memo, not a quiz answer.
- The tool treats Mendix, AWS-native, and hybrid neutrally.
- The score breakdown explains the recommendation.
- The cost model avoids fake certainty.
- The UI is dark + ivory, not blue-ish.
- No unnecessary product scope has been added.
