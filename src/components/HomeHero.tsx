"use client";

import Link from "next/link";
import {
  HERO_HEADLINE,
  HERO_SUBLINE,
} from "@/lib/result-copy";

const HERO_EXPLANATION =
  "Quickly understand whether a workload fits better with a business-process platform, a cloud-native engineering approach, or a clear split between the two.";

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="pt-6 sm:pt-16 lg:pt-20"
    >
      <p className="cys-eyebrow">CHOOSE YOUR STACK</p>
      <h1
        id="hero-heading"
        className="cys-text mt-4 max-w-3xl text-balance text-[1.85rem] font-semibold leading-[1.1] tracking-tight sm:mt-6 sm:text-[3rem] md:text-[3.3rem]"
      >
        {HERO_HEADLINE}
      </h1>
      <p className="cys-text-soft mt-4 max-w-2xl text-base leading-7 sm:mt-6 sm:text-lg sm:leading-8">
        {HERO_SUBLINE}
      </p>
      <p className="cys-text-muted mt-3 max-w-2xl text-sm leading-6 sm:mt-4 sm:text-base sm:leading-7">
        {HERO_EXPLANATION}
      </p>

      <div className="mt-6 flex flex-col gap-2.5 sm:mt-10 sm:flex-row sm:items-center sm:gap-3">
        <Link
          href="/quick-scan"
          className="cys-button-primary inline-flex h-11 min-w-[12rem] items-center justify-center rounded-full px-6 text-sm font-medium sm:h-12"
        >
          Start quick scan
        </Link>
        <Link
          href="/detailed-assessment"
          className="cys-button-secondary inline-flex h-11 min-w-[12rem] items-center justify-center rounded-full px-6 text-sm font-medium sm:h-12"
        >
          Start detailed assessment
        </Link>
        <Link
          href="/cost-model"
          className="cys-link inline-flex h-11 items-center justify-start text-sm underline-offset-4 hover:underline sm:h-12 sm:px-2"
        >
          View cost model
        </Link>
      </div>
    </section>
  );
}
