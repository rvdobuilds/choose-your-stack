const CAVEATS = [
  "This tool supports early architecture direction, not final approval.",
  "The recommendation should be validated against enterprise pricing, team capability, security requirements, support model, and platform governance.",
  "For business-critical workloads, review resilience, observability, testability, failover, data ownership, and operational support before committing.",
];

export function DecisionCaveats() {
  return (
    <section
      id="caveats"
      aria-labelledby="caveats-heading"
      className="mt-12 sm:mt-16"
    >
      <header>
        <p className="cys-eyebrow">Decision caveats</p>
        <h2
          id="caveats-heading"
          className="cys-text mt-2 text-[1.4rem] font-semibold leading-tight sm:text-[1.7rem]"
        >
          Next checks before final decision
        </h2>
      </header>

      <ul className="mt-5 flex flex-col gap-3">
        {CAVEATS.map((caveat) => (
          <li key={caveat} className="cys-card-muted px-4 py-3.5 sm:px-5 sm:py-4">
            <p className="cys-text-soft text-sm leading-6">{caveat}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
