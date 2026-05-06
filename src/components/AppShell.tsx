"use client";

import type { ReactNode } from "react";
import { AssessmentProvider } from "@/lib/assessment-context";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <AssessmentProvider>
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1120px] px-5 pb-16 sm:px-8 sm:pb-24">
          {children}
        </div>
      </main>
      <Footer />
    </AssessmentProvider>
  );
}
