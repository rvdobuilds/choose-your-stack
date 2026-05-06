export function Header() {
  return (
    <header className="cys-bg-page-elevated sticky top-0 z-30 border-b cys-border-soft backdrop-blur-sm/0">
      <div className="mx-auto flex h-14 w-full max-w-[1120px] items-center justify-between gap-6 px-5 sm:h-16 sm:px-8">
        <a
          href="#top"
          className="cys-text text-[0.95rem] sm:text-base font-semibold tracking-tight"
        >
          Choose Your Stack
        </a>
        <nav
          aria-label="Primary"
          className="-mr-2 flex max-w-[60%] items-center gap-1 overflow-x-auto pr-2 text-sm sm:max-w-none sm:gap-4"
        >
          <a
            href="#framework"
            className="cys-link whitespace-nowrap px-2 py-2"
          >
            Framework
          </a>
          <a href="#result" className="cys-link whitespace-nowrap px-2 py-2">
            Result
          </a>
          <a
            href="#cost-model"
            className="cys-link whitespace-nowrap px-2 py-2"
          >
            Cost model
          </a>
        </nav>
      </div>
    </header>
  );
}
