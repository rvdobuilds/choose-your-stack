const COLUMNS = [
  {
    label: "Mendix",
    items: [
      "Business apps",
      "Workflow",
      "Forms",
      "Fast delivery",
      "Business-facing UI",
      "Process change",
    ],
  },
  {
    label: "AWS-native",
    items: [
      "Events",
      "APIs",
      "High scale",
      "Custom logic",
      "Resilience",
      "Observability",
      "Runtime elasticity",
    ],
  },
  {
    label: "Hybrid",
    items: [
      "Mendix for process/UI",
      "AWS-native for backend/events/integrations",
      "Clear boundary",
      "Separate operating model",
      "Explicit ownership split",
    ],
  },
];

const RULE =
  "Use Mendix when the value is mainly in process and business-facing UI. Use AWS-native when the value is mainly in technical control, scale, and runtime flexibility. Use Hybrid when both are needed and the boundary is clear.";

export function ThreeDirections() {
  return (
    <section
      aria-labelledby="three-directions-heading"
      className="mt-16 sm:mt-24"
    >
      <p className="cys-eyebrow">Three common directions</p>
      <h2
        id="three-directions-heading"
        className="cys-text mt-3 max-w-3xl text-[1.5rem] font-semibold leading-tight sm:text-[2.1rem]"
      >
        Each direction fits a different workload shape.
      </h2>

      <hr className="cys-divider mt-8 sm:mt-10" />

      <div className="grid grid-cols-1 divide-y cys-border-soft md:grid-cols-3 md:divide-x md:divide-y-0">
        {COLUMNS.map((col, idx) => (
          <div
            key={col.label}
            className={`py-7 sm:py-8 ${
              idx === 0
                ? "md:pr-8"
                : idx === COLUMNS.length - 1
                  ? "md:pl-8"
                  : "md:px-8"
            }`}
          >
            <p className="cys-text text-base font-semibold tracking-tight sm:text-lg">
              {col.label}
            </p>
            <ul className="mt-4 flex flex-col gap-2 sm:mt-5">
              {col.items.map((item) => (
                <li
                  key={item}
                  className="cys-text-muted text-sm leading-6"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <hr className="cys-divider" />

      <p className="cys-text-soft mt-6 max-w-3xl text-sm leading-7 sm:mt-8 sm:text-base">
        {RULE}
      </p>
    </section>
  );
}
