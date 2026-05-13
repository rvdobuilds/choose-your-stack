import Link from "next/link";
import { HERO_HEADLINE } from "@/lib/result-copy";

const HERO_BODY =
  "A workload-fit decision tool for Mendix, AWS-native engineering, and hybrid architecture.";

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="pt-6 sm:pt-12 lg:pt-16"
    >
      <p className="cys-eyebrow">CHOOSE YOUR STACK</p>
      <h1
        id="hero-heading"
        className="cys-text mt-4 max-w-3xl text-balance text-[1.75rem] font-semibold leading-[1.1] tracking-tight sm:mt-5 sm:text-[2.75rem] md:text-[3rem]"
      >
        {HERO_HEADLINE}
      </h1>
      <p className="cys-text-soft mt-4 max-w-2xl text-base leading-7 sm:mt-5 sm:text-lg sm:leading-8">
        {HERO_BODY}
      </p>

      <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-3">
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
