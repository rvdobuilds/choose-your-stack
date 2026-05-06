import {
  HERO_HEADLINE,
  HERO_SUBLINE,
  RESULT_DISCLAIMER,
} from "@/lib/result-copy";

export function HeroPanel() {
  return (
    <section id="top" className="scroll-mt-20 pt-6 sm:pt-14">
      <div className="cys-card-elevated px-5 py-7 sm:px-12 sm:py-14">
        <p className="cys-eyebrow">CHOOSE YOUR STACK</p>
        <h1 className="cys-text mt-4 max-w-3xl text-balance text-[1.75rem] font-semibold leading-[1.12] tracking-tight sm:mt-5 sm:text-[2.75rem] sm:leading-[1.1] md:text-[3rem]">
          {HERO_HEADLINE}
        </h1>
        <p className="cys-text-muted mt-4 max-w-2xl text-base leading-7 sm:mt-5 sm:text-lg sm:leading-8">
          {HERO_SUBLINE}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
          <a
            href="#framework"
            className="cys-button-primary inline-flex h-11 min-w-[12rem] items-center justify-center rounded-full px-6 text-sm font-medium sm:h-12"
          >
            Start assessment
          </a>
          <a
            href="#cost-model"
            className="cys-button-secondary inline-flex h-11 min-w-[12rem] items-center justify-center rounded-full px-6 text-sm font-medium sm:h-12"
          >
            View cost model
          </a>
        </div>

        <hr className="cys-divider mt-8 sm:mt-10" />

        <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-4">
          <FrameNote
            label="Mendix candidate"
            note="Business-process apps, workflow delivery, UI-driven solutions."
          />
          <FrameNote
            label="AWS-native candidate"
            note="Event-driven, integration-heavy, performance-sensitive workloads."
          />
          <FrameNote
            label="Hybrid candidate"
            note="Business-facing UI on Mendix, AWS-native for the technical backend."
          />
        </div>

        <p className="cys-text-subtle mt-6 max-w-3xl text-sm leading-6 sm:mt-8">
          {RESULT_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}

function FrameNote({ label, note }: { label: string; note: string }) {
  return (
    <div className="cys-card-muted px-4 py-3 sm:px-5 sm:py-4">
      <p className="cys-text-soft text-sm font-medium">{label}</p>
      <p className="cys-text-subtle mt-1 text-[0.85rem] leading-6 sm:mt-1.5">
        {note}
      </p>
    </div>
  );
}
