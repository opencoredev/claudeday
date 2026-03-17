import { Link } from "@tanstack/react-router";
import * as React from "react";

const navItems = [
  { to: "/", label: "countdown", exact: true },
  { to: "/about-claude", label: "about claude" },
  { to: "/favorite-things", label: "favorite things" },
  { to: "/holiday-protocol", label: "protocol" },
  { to: "/how-old-is-claude", label: "how old is claude?" },
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-svh overflow-hidden bg-background text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.32_0.03_270_/_0.16),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_14%,oklch(0.3_0.03_270_/_0.28),transparent_28%),radial-gradient(circle_at_84%_10%,oklch(0.28_0.02_240_/_0.22),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="relative z-10 flex h-full flex-col">
        <header className="px-4 pt-4 md:px-8 md:pt-7">
          <div className="mx-auto flex w-full max-w-[92rem] items-center justify-between gap-6">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              className="text-[clamp(1.35rem,1.8vw,1.8rem)] text-white/92 transition-opacity hover:opacity-80"
              style={{ fontFamily: "var(--font-display)" }}
            >
              national claude day
            </Link>

            <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-right md:gap-x-7">
              {navItems.map((item) => {
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    activeOptions={{ exact: item.exact }}
                    activeProps={{ className: "text-white" }}
                    className="text-[clamp(0.95rem,1.05vw,1.08rem)] text-white/66 transition-colors hover:text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
