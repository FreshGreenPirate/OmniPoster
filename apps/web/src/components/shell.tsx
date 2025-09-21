"use client";

import { PropsWithChildren } from "react";
import { AppSidebar } from "./sidebar";

export function Shell({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100">
      <AppSidebar />
      <main className="flex-1 overflow-hidden rounded-tl-3xl bg-slate-900/60 backdrop-blur">
        {children}
      </main>
    </div>
  );
}
