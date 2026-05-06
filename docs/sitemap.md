# Choose Your Stack — Sitemap

## App type

Choose Your Stack is a single-page decision workbench.

Do not create a multi-page marketing site for V1.

Do not create account, dashboard, settings, admin, or saved-assessment pages.

## Primary route

```txt
/
```

Purpose:

Host the full decision flow:

1. Start
2. Assessment
3. Result
4. Runtime cost model

## Top-level navigation

Use compact top navigation.

Recommended nav items:

```txt
Start
Assessment
Result
Cost model
```

Navigation can be implemented as anchor links, tabs, or internal view state.

Do not use bottom mobile navigation.

Do not use a full dashboard sidebar.

## Page structure

```txt
/
├── Header
├── StartSection
├── AssessmentSection
├── ResultSection
├── CostModelSection
└── Footer
```

## Header

Content:

- product wordmark: Choose Your Stack
- nav items: Start, Assessment, Result, Cost model

Behavior:

- fixed or sticky is allowed
- compact height
- subtle bottom border
- dark elevated background
- mobile nav may horizontally scroll if needed

Avoid:

- large logo treatment
- colorful icons
- dropdown navigation
- bottom app navigation

## Start section

Purpose:

Explain the product and start the flow.

Required copy:

```txt
CHOOSE YOUR STACK
Choose the right platform direction before you start building.
A practical decision tool for choosing between Mendix, AWS-native engineering, or a hybrid architecture.
```

Recommended actions:

- Start assessment
- View cost model

Recommended note:

```txt
Mendix, AWS-native, or hybrid. Not a platform verdict.
```

Layout:

- one strong intro card
- no decorative image required
- no giant marketing hero

## Assessment section

Purpose:

Ask the decision questions and collect answers.

Mobile layout:

```txt
Assessment header
Progress indicator
Current question
Answer cards
Back / Next actions
```

Desktop layout:

```txt
Left column:
  current question
  answer cards
  controls

Right column:
  live snapshot
  answered count
  current leading direction
  short note that final result may change
```

Rules:

- one question per screen on mobile
- all answer cards must be tappable
- selected state must be clear without blue or purple
- progress should help orientation, not dominate
- do not show a complex score dashboard while answering

## Result section

Purpose:

Present the candidate platform direction as an architecture recommendation memo.

Required result labels:

```txt
Mendix candidate
AWS-native candidate
Hybrid candidate
```

Required disclaimer:

```txt
This is not a platform verdict. It is a workload-fit recommendation based on the answers provided.
```

Recommended structure:

```txt
RECOMMENDED DIRECTION
[Result label]
[Recommendation paragraph]

Why this direction fits
[Reason bullets or rows]

Main trade-offs
[Trade-off rows]

Validation questions before final decision
[Validation rows]

Cost model implication
[Cost model paragraph]

Score breakdown
[Axis rows]
```

Rules:

- result must not feel like a quiz result
- result must not celebrate or gamify
- result must not use winner language
- result must show reasoning, not only a label

## Runtime cost model section

Purpose:

Explain how AWS-native and Mendix expose different cost models.

Required title:

```txt
Runtime cost model
```

Required content cards:

```txt
AWS-native
Mendix
Hybrid boundary
```

Recommended subsections:

```txt
What drives cost?
When this model fits
What can make it expensive?
What to validate internally?
```

Rules:

- do not imply AWS is always cheaper
- do not imply Mendix is always expensive
- do not present fake precision
- do not use charts in V1

## Footer

Purpose:

Provide a quiet ending.

Suggested content:

```txt
Choose Your Stack
A workload-fit decision tool for Mendix, AWS-native engineering, and hybrid architecture.
```

Optional links:

- Start
- Cost model

Avoid:

- social links unless explicitly requested
- large marketing footer
- newsletter signup

## Optional future routes

Do not implement in V1 unless explicitly requested.

Possible future routes:

```txt
/examples
/about
/export
/templates
```

Future examples could include:

- UI-heavy workflow app
- event-heavy backend
- hybrid business workflow with AWS processing
- 2M events/day cost-model case

## Route rules

Do not create these in V1:

```txt
/login
/signup
/dashboard
/admin
/settings
/pricing
/account
/history
```

## URL state

For V1, storing state in local component state is enough.

Optional later:

- query param for current step
- shareable encoded assessment
- localStorage for draft recovery

Do not add this unless explicitly requested.
