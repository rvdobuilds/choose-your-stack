"use client";

import { useId, useState, type ReactNode } from "react";
import { COST_MODEL_TITLE } from "@/lib/result-copy";

const INTRO =
  "Different workload profiles expose different cost models. The goal is not to prove that one platform is always cheaper. The goal is to understand which cost model matches the solution.";

const KEY_QUESTION =
  "The key question is not “which platform is cheaper?” The key question is “which cost model matches this workload?”";

const SUMMARY_ROWS = [
  {
    title: "AWS-native",
    summary: "Usage-based / elastic / architecture-sensitive",
  },
  {
    title: "Mendix",
    summary:
      "Platform-capacity-based / fast for process apps / licensing-sensitive",
  },
  {
    title: "Hybrid",
    summary: "Separate UI/process cost model from event/backend cost model",
  },
];

const AWS_TEXT =
  "AWS-native costs are usually more usage-based. You pay across the services the architecture consumes, such as compute, queues, event routing, databases, storage, observability, networking, and security services.";

const MENDIX_TEXT =
  "Mendix costs are usually more platform, environment, and capacity-oriented. Costs are influenced by runtime resources, database capacity, storage, environments, HA/fallback, scaling, and enterprise licensing agreements.";

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

const HYBRID_BOUNDARY =
  "Hybrid separates the UI/process cost model from the event/backend cost model. A clean architecture boundary lets each layer use the cost model that matches its workload shape, instead of forcing one model across the full solution.";

export function CostModel() {
  return (
    <section aria-labelledby="cost-model-heading">
      <header>
        <p className="cys-eyebrow">Cost model</p>
        <h1
          id="cost-model-heading"
          className="cys-text mt-2 text-[1.5rem] font-semibold leading-tight sm:text-[2.25rem]"
        >
          {COST_MODEL_TITLE}
        </h1>
        <p className="cys-text-muted mt-3 max-w-2xl text-sm leading-6 sm:mt-4 sm:text-base sm:leading-7">
          {INTRO}
        </p>
      </header>

      <div className="mt-10 sm:mt-12">
        <ul className="flex flex-col">
          {SUMMARY_ROWS.map((row, idx) => (
            <li
              key={row.title}
              className={`grid gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:items-baseline sm:py-6 ${
                idx === 0 ? "" : "border-t cys-border-soft"
              }`}
            >
              <p className="cys-text text-base font-semibold sm:text-lg">
                {row.title}
              </p>
              <p className="cys-text-muted text-sm leading-6 sm:text-base">
                {row.summary}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <section
        aria-labelledby="key-question-heading"
        className="mt-16 sm:mt-20"
      >
        <p className="cys-eyebrow">Key question</p>
        <h2
          id="key-question-heading"
          className="cys-text mt-3 max-w-3xl text-[1.2rem] font-semibold leading-snug sm:text-[1.6rem]"
        >
          {KEY_QUESTION}
        </h2>
      </section>

      <div className="mt-12 flex flex-col gap-3 sm:mt-16">
        <Disclosure title="AWS-native cost drivers">
          <p className="cys-text-soft text-sm leading-7">{AWS_TEXT}</p>
          <p className="cys-eyebrow mt-6">What drives cost?</p>
          <ul className="mt-3 flex flex-col gap-2">
            {AWS_DRIVERS.map((driver) => (
              <DriverRow key={driver}>{driver}</DriverRow>
            ))}
          </ul>
        </Disclosure>

        <Disclosure title="Mendix cost drivers">
          <p className="cys-text-soft text-sm leading-7">{MENDIX_TEXT}</p>
          <p className="cys-eyebrow mt-6">What drives cost?</p>
          <ul className="mt-3 flex flex-col gap-2">
            {MENDIX_DRIVERS.map((driver) => (
              <DriverRow key={driver}>{driver}</DriverRow>
            ))}
          </ul>
        </Disclosure>

        <Disclosure title="Hybrid boundary">
          <p className="cys-text-soft text-sm leading-7">{HYBRID_BOUNDARY}</p>
        </Disclosure>

        <Disclosure title="Cost caveats">
          <p className="cys-eyebrow">AWS-native caveat</p>
          <p className="cys-text-soft mt-3 text-sm leading-7">{AWS_CAUTION}</p>
          <p className="cys-eyebrow mt-6">Mendix caveat</p>
          <p className="cys-text-soft mt-3 text-sm leading-7">
            {MENDIX_CAUTION}
          </p>
        </Disclosure>
      </div>
    </section>
  );
}

function Disclosure({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <div className="cys-card-muted px-4 py-4 sm:px-6 sm:py-5">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="cys-text text-sm font-medium sm:text-base">
          {title}
        </span>
        <span aria-hidden className="cys-text-faint text-xs">
          {open ? "Hide" : "Show"}
        </span>
      </button>
      {open ? (
        <div id={id} className="mt-5">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function DriverRow({ children }: { children: ReactNode }) {
  return (
    <li className="cys-text-muted flex gap-3 text-sm leading-6">
      <span
        aria-hidden
        className="cys-text-faint mt-2 inline-block h-px w-3 flex-shrink-0 bg-current"
      />
      <span>{children}</span>
    </li>
  );
}
