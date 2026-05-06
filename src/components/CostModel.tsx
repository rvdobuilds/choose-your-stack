import { COST_MODEL_TITLE } from "@/lib/result-copy";

const AWS_TEXT =
  "AWS-native costs are usually more usage-based. You pay across the services the architecture consumes, such as compute, queues, event routing, databases, storage, observability, networking, and security services.";

const MENDIX_TEXT =
  "Mendix costs are usually more platform, environment, and capacity-oriented. Costs are influenced by runtime resources, database capacity, storage, environments, HA/fallback, scaling, and enterprise licensing agreements.";

const KEY_QUESTION =
  "The key question is not “which platform is cheaper?” The key question is “which cost model matches this workload?”";

const AWS_DRIVERS = [
  "Compute duration and request volume",
  "Queue, event, and message volume",
  "Database reads, writes, storage, and provisioned capacity",
  "API, load balancing, and data transfer",
  "Logs, metrics, traces, alarms, and retention",
  "Networking, NAT, security, KMS, secrets, and WAF",
  "High availability and disaster recovery setup",
];

const MENDIX_DRIVERS = [
  "Application runtime capacity",
  "Database size and capacity",
  "File storage",
  "Number of environments such as dev, test, acceptance, and production",
  "High availability and fallback requirements",
  "Horizontal scaling and headroom for peaks",
  "Enterprise licensing and internal chargeback model",
];

const AWS_CAUTION =
  "AWS is not automatically cheap. Poor architecture, overlogging, inefficient database access, NAT Gateway misuse, excessive data transfer, or overprovisioning can make AWS materially more expensive.";

const MENDIX_CAUTION =
  "Mendix can still be the better total-cost choice when fast delivery, business involvement, process fit, and available capability reduce build and change costs.";

export function CostModel() {
  return (
    <section
      id="cost-model"
      aria-labelledby="cost-model-heading"
      className="mt-16 sm:mt-24"
    >
      <header>
        <p className="cys-eyebrow">Cost model</p>
        <h2
          id="cost-model-heading"
          className="cys-text mt-2 text-[1.6rem] font-semibold leading-tight sm:text-[2rem]"
        >
          {COST_MODEL_TITLE}
        </h2>
        <p className="cys-text-muted mt-3 max-w-2xl text-sm leading-6 sm:text-base sm:leading-7">
          Different workload profiles expose different cost models. The goal is
          not to prove that one platform is always cheaper. The goal is to
          understand which cost model matches the solution.
        </p>
      </header>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <CostCard
          title="AWS-native"
          summary="Usage-based / elastic / architecture-sensitive"
          intro={AWS_TEXT}
          drivers={AWS_DRIVERS}
          caution={AWS_CAUTION}
        />
        <CostCard
          title="Mendix"
          summary="Platform-capacity-based / fast for process apps / licensing-sensitive"
          intro={MENDIX_TEXT}
          drivers={MENDIX_DRIVERS}
          caution={MENDIX_CAUTION}
        />
      </div>

      <div className="cys-card-muted mt-4 px-5 py-5 sm:px-6 sm:py-6">
        <p className="cys-eyebrow">Hybrid boundary</p>
        <p className="cys-text-soft mt-3 max-w-3xl text-sm leading-6">
          Hybrid: separate UI/process cost model from event/backend cost model.
          A clean architecture boundary lets each layer use the cost model that
          matches its workload shape, instead of forcing one model across the
          full solution.
        </p>
      </div>

      <div className="cys-card-elevated mt-6 px-6 py-6 sm:px-10 sm:py-8">
        <p className="cys-eyebrow">Key question</p>
        <p className="cys-text mt-3 max-w-3xl text-base leading-7 sm:text-[1.05rem] sm:leading-8">
          {KEY_QUESTION}
        </p>
      </div>
    </section>
  );
}

function CostCard({
  title,
  summary,
  intro,
  drivers,
  caution,
}: {
  title: string;
  summary: string;
  intro: string;
  drivers: string[];
  caution: string;
}) {
  return (
    <article className="cys-card px-5 py-6 sm:px-7 sm:py-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="cys-text text-lg font-semibold">{title}</h3>
        <p className="cys-text-faint text-xs">{summary}</p>
      </div>
      <p className="cys-text-soft mt-4 text-sm leading-6">{intro}</p>

      <p className="cys-eyebrow mt-6">What drives cost?</p>
      <ul className="mt-3 flex flex-col gap-2">
        {drivers.map((driver) => (
          <li
            key={driver}
            className="cys-text-muted flex gap-3 text-sm leading-6"
          >
            <span aria-hidden className="cys-text-faint mt-2 inline-block h-px w-3 flex-shrink-0 bg-current" />
            <span>{driver}</span>
          </li>
        ))}
      </ul>

      <p className="cys-eyebrow mt-6">What can make this expensive?</p>
      <p className="cys-text-soft mt-3 text-sm leading-6">{caution}</p>
    </article>
  );
}
