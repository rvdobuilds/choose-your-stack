"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Start", href: "/" },
  { label: "Framework", href: "/framework" },
  { label: "Result", href: "/result" },
  { label: "Cost model", href: "/cost-model" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  return (
    <header className="cys-bg-page-elevated sticky top-0 z-30 border-b cys-border-soft">
      <div className="mx-auto flex h-14 w-full max-w-[1120px] items-center justify-between gap-4 px-5 sm:h-16 sm:px-8">
        <Link
          href="/"
          className="cys-text shrink-0 text-[0.95rem] font-semibold tracking-tight sm:text-base"
        >
          Choose Your Stack
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-5 text-sm md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap py-2 transition-colors duration-160 ${
                  active
                    ? "cys-text font-medium"
                    : "cys-link"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative md:hidden">
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Open navigation menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="cys-button-secondary inline-flex h-9 items-center justify-center rounded-full px-4 text-xs font-medium"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>

          {menuOpen && (
            <div
              id="mobile-menu"
              ref={menuRef}
              role="menu"
              className="absolute right-0 top-full mt-2 w-48 rounded-2xl border cys-border-soft bg-[var(--color-surface-elevated)] p-2 shadow-lg"
            >
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={closeMenu}
                    className={`block rounded-xl px-4 py-3 text-sm transition-colors duration-160 ${
                      active
                        ? "cys-text font-medium bg-[var(--color-selected-bg)]"
                        : "cys-text-muted hover:cys-text hover:bg-[var(--color-hover-bg)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
