import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t cys-border-soft py-10 sm:mt-24">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="cys-text text-sm font-semibold">Choose Your Stack</p>
          <p className="cys-text-subtle mt-1 text-xs leading-5 sm:text-sm">
            A workload-fit decision tool for Mendix, AWS-native engineering, and
            hybrid architecture.
          </p>
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-4 text-sm"
        >
          <Link href="/" className="cys-link">
            Start
          </Link>
          <Link href="/quick-scan" className="cys-link">
            Quick scan
          </Link>
          <Link href="/detailed-assessment" className="cys-link">
            Detailed assessment
          </Link>
          <Link href="/result" className="cys-link">
            Result
          </Link>
          <Link href="/cost-model" className="cys-link">
            Cost model
          </Link>
        </nav>
      </div>
    </footer>
  );
}
