import {
  HERO_HEADLINE,
  HERO_SUBLINE,
  RESULT_DISCLAIMER,
} from "@/lib/result-copy";

export function HeroPanel() {
  return (
    <section id="top" className="pt-8 sm:pt-14">
      <div className="cys-card-elevated px-6 py-8 sm:px-12 sm:py-14">
        <p className="cys-eyebrow">CHOOSE YOUR STACK</p>
        <h1 className="cys-text mt-5 max-w-3xl text-balance text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.75rem] md:text-[3rem]">
          {HERO_HEADLINE}
        </h1>
        <p className="cys-text-muted mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8">
          {HERO_SUBLINE}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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

        <hr className="cys-divider mt-10" />

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
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

        <p className="cys-text-subtle mt-8 max-w-3xl text-sm leading-6">
          {RESULT_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}

function FrameNote({ label, note }: { label: string; note: string }) {
  return (
    <div className="cys-card-muted px-5 py-4">
      <p className="cys-text-soft text-sm font-medium">{label}</p>
      <p className="cys-text-subtle mt-1.5 text-[0.85rem] leading-6">{note}</p>
    </div>
  );
}
