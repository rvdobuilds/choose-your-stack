"use client";

import { useId, useState } from "react";
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

const HYBRID_BOUNDARY =
  "Hybrid: separate UI/process cost model from event/backend cost model. A clean architecture boundary lets each layer use the cost model that matches its workload shape, instead of forcing one model across the full solution.";

export function CostModel() {
  return (
    <section
      id="cost-model"
      aria-labelledby="cost-model-heading"
      className="mt-14 scroll-mt-20 sm:mt-24"
    >
      <header>
        <p className="cys-eyebrow">Cost model</p>
        <h2
          id="cost-model-heading"
          className="cys-text mt-2 text-[1.4rem] font-semibold leading-tight sm:text-[2rem]"
        >
          {COST_MODEL_TITLE}
        </h2>
        <p className="cys-text-muted mt-2 max-w-2xl text-sm leading-6 sm:mt-3 sm:text-base sm:leading-7">
          Different workload profiles expose different cost models. The goal is
          not to prove that one platform is always cheaper. The goal is to
          understand which cost model matches the solution.
        </p>
      </header>

      <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-4 md:grid-cols-3">
        <SummaryCard
          title="AWS-native"
          summary="Usage-based / elastic / architecture-sensitive"
        />
        <SummaryCard
          title="Mendix"
          summary="Platform-capacity-based / fast for process apps / licensing-sensitive"
        />
        <SummaryCard
          title="Hybrid"
          summary="Separate UI/process cost model from event/backend cost model"
        />
      </div>

      <div className="cys-card-elevated mt-5 px-4 py-5 sm:mt-6 sm:px-10 sm:py-8">
        <p className="cys-eyebrow">Key question</p>
        <p className="cys-text mt-3 max-w-3xl text-base leading-7 sm:text-[1.05rem] sm:leading-8">
          {KEY_QUESTION}
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:mt-6">
        <Disclosure title="Read AWS-native cost drivers">
          <p className="cys-text-soft text-sm leading-6">{AWS_TEXT}</p>
          <p className="cys-eyebrow mt-5">What drives cost?</p>
          <ul className="mt-3 flex flex-col gap-2">
            {AWS_DRIVERS.map((driver) => (
              <DriverRow key={driver}>{driver}</DriverRow>
            ))}
          </ul>
          <p className="cys-eyebrow mt-5">What can make this expensive?</p>
          <p className="cys-text-soft mt-3 text-sm leading-6">{AWS_CAUTION}</p>
        </Disclosure>

        <Disclosure title="Read Mendix cost drivers">
          <p className="cys-text-soft text-sm leading-6">{MENDIX_TEXT}</p>
          <p className="cys-eyebrow mt-5">What drives cost?</p>
          <ul className="mt-3 flex flex-col gap-2">
            {MENDIX_DRIVERS.map((driver) => (
              <DriverRow key={driver}>{driver}</DriverRow>
            ))}
          </ul>
          <p className="cys-eyebrow mt-5">What can make this expensive?</p>
          <p className="cys-text-soft mt-3 text-sm leading-6">
            {MENDIX_CAUTION}
          </p>
        </Disclosure>

        <Disclosure title="Read hybrid boundary note">
          <p className="cys-text-soft text-sm leading-6">{HYBRID_BOUNDARY}</p>
        </Disclosure>
      </div>
    </section>
  );
}

function SummaryCard({
  title,
  summary,
}: {
  title: string;
  summary: string;
}) {
  return (
    <article className="cys-card px-3.5 py-3.5 sm:px-5 sm:py-5">
      <h3 className="cys-text text-base font-semibold sm:text-lg">{title}</h3>
      <p className="cys-text-subtle mt-2 text-[0.85rem] leading-6">
        {summary}
      </p>
    </article>
  );
}

function Disclosure({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <div className="cys-card-muted px-3.5 py-3 sm:px-5 sm:py-4">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="cys-text-soft text-sm font-medium">{title}</span>
        <span aria-hidden className="cys-text-faint text-xs">
          {open ? "Hide" : "Show"}
        </span>
      </button>
      {open ? (
        <div id={id} className="mt-4">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function DriverRow({ children }: { children: React.ReactNode }) {
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
