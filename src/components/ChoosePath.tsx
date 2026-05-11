"use client";

import Link from "next/link";
import { useAssessment } from "@/lib/assessment-context";
import { useQuickScan } from "@/lib/quick-scan-context";
import { isComplete } from "@/lib/scoring";

export function ChoosePath() {
  const {
    answers,
    answeredCount,
    storageHydrated: assessmentHydrated,
  } = useAssessment();
  const {
    complete: quickScanComplete,
    answeredCount: quickScanAnsweredCount,
    storageHydrated: quickScanHydrated,
  } = useQuickScan();

  const assessmentComplete = assessmentHydrated && isComplete(answers);
  const assessmentInProgress =
    assessmentHydrated && !assessmentComplete && answeredCount > 0;
  const quickScanInProgress =
    quickScanHydrated && !quickScanComplete && quickScanAnsweredCount > 0;

  return (
    <section
      aria-labelledby="choose-path-heading"
      className="mt-20 sm:mt-28"
    >
      <p className="cys-eyebrow">Choose your path</p>
      <h2
        id="choose-path-heading"
        className="cys-text mt-3 max-w-3xl text-[1.5rem] font-semibold leading-tight sm:text-[2.1rem]"
      >
        Two ways to use this tool.
      </h2>

      <div className="mt-8 grid gap-10 sm:mt-12 md:grid-cols-2 md:gap-12">
        <PathBlock
          eyebrow="Path 1"
          title="Quick scan"
          copy="Five questions. Live fit direction. Useful for early orientation or a quick first discussion."
          ctaHref="/quick-scan"
          ctaLabel="Start quick scan"
          subtleLink={
            quickScanInProgress
              ? { href: "/quick-scan", label: "Continue saved quick scan" }
              : null
          }
        />
        <PathBlock
          eyebrow="Path 2"
          title="Detailed assessment"
          copy="Twelve questions. More traceable reasoning, validation points, and cost-model implications."
          ctaHref="/detailed-assessment"
          ctaLabel="Start detailed assessment"
          subtleLink={
            assessmentInProgress
              ? {
                  href: "/detailed-assessment",
                  label: "Continue saved assessment",
                }
              : assessmentComplete
                ? { href: "/result", label: "View saved result" }
                : null
          }
        />
      </div>
    </section>
  );
}

type SubtleLink = { href: string; label: string };

function PathBlock({
  eyebrow,
  title,
  copy,
  ctaHref,
  ctaLabel,
  subtleLink,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  ctaHref: string;
  ctaLabel: string;
  subtleLink: SubtleLink | null;
}) {
  return (
    <div>
      <p className="cys-eyebrow">{eyebrow}</p>
      <h3 className="cys-text mt-3 text-[1.25rem] font-semibold leading-snug sm:text-[1.5rem]">
        {title}
      </h3>
      <p className="cys-text-muted mt-3 max-w-md text-sm leading-7 sm:text-base">
        {copy}
      </p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <Link
          href={ctaHref}
          className="cys-button-primary inline-flex h-11 min-w-[14rem] items-center justify-center rounded-full px-6 text-sm font-medium sm:h-12"
        >
          {ctaLabel}
        </Link>
        {subtleLink ? (
          <Link
            href={subtleLink.href}
            className="cys-link text-sm underline-offset-4 hover:underline"
          >
            {subtleLink.label}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
