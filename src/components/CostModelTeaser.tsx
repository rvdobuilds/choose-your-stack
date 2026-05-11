import Link from "next/link";

const ITEMS = [
  {
    label: "AWS-native",
    note: "Usage-based, elastic, architecture-sensitive.",
  },
  {
    label: "Mendix",
    note: "Platform, environment, capacity, and licensing-sensitive.",
  },
  {
    label: "Hybrid",
    note: "Separate process/UI costs from backend/event costs.",
  },
];

export function CostModelTeaser() {
  return (
    <section
      aria-labelledby="cost-teaser-heading"
      className="mt-20 sm:mt-28"
    >
      <p className="cys-eyebrow">Cost model matters</p>
      <h2
        id="cost-teaser-heading"
        className="cys-text mt-3 max-w-3xl text-[1.5rem] font-semibold leading-tight sm:text-[2.1rem]"
      >
        Different workloads expose different cost models.
      </h2>
      <p className="cys-text-muted mt-4 max-w-2xl text-sm leading-7 sm:mt-5 sm:text-base">
        Platform choice is not only about UI, scale, or team capability.
        Different workload profiles expose different runtime and delivery cost
        models.
      </p>

      <dl className="mt-8 grid gap-y-6 gap-x-10 sm:grid-cols-3 sm:mt-10">
        {ITEMS.map((item) => (
          <div key={item.label}>
            <dt className="cys-text text-sm font-semibold sm:text-base">
              {item.label}
            </dt>
            <dd className="cys-text-muted mt-2 text-sm leading-6">
              {item.note}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 sm:mt-10">
        <Link
          href="/cost-model"
          className="cys-button-secondary inline-flex h-11 min-w-[12rem] items-center justify-center rounded-full px-6 text-sm font-medium sm:h-12"
        >
          View cost model
        </Link>
      </div>
    </section>
  );
}
