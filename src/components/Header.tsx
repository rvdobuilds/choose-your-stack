export function Header() {
  return (
    <header className="cys-bg-page-elevated sticky top-0 z-30 border-b cys-border-soft">
      <div className="mx-auto flex h-14 w-full max-w-[1120px] items-center justify-between gap-4 px-5 sm:h-16 sm:px-8">
        <a
          href="#top"
          className="cys-text shrink-0 text-[0.95rem] font-semibold tracking-tight sm:text-base"
        >
          Choose Your Stack
        </a>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-5 text-sm md:flex"
        >
          <a href="#top" className="cys-link whitespace-nowrap py-2">
            Start
          </a>
          <a href="#framework" className="cys-link whitespace-nowrap py-2">
            Framework
          </a>
          <a href="#result" className="cys-link whitespace-nowrap py-2">
            Result
          </a>
          <a href="#cost-model" className="cys-link whitespace-nowrap py-2">
            Cost model
          </a>
        </nav>
        <a
          href="#framework"
          className="cys-button-secondary inline-flex h-9 items-center justify-center rounded-full px-4 text-xs font-medium md:hidden"
        >
          Start
        </a>
      </div>
    </header>
  );
}
