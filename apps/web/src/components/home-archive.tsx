import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@claudeday/ui/components/card";
import { cn } from "@claudeday/ui/lib/utils";
import { BrainCircuit, CalendarDays, Clock3, Orbit, ScrollText, Sparkles } from "lucide-react";
import * as React from "react";

// Re-export constants and types used in home page
export const RESET_MONTH = 2;
export const RESET_DAY = 14;
export const SECOND_MS = 1000;
export const MINUTE_MS = 60 * SECOND_MS;
export const HOUR_MS = 60 * MINUTE_MS;
export const DAY_MS = 24 * HOUR_MS;

export type ClockSnapshot = {
  countdown: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  cycleDay: number;
  isHoliday: boolean;
  holidayEndsLabel: string;
  lastResetLabel: string;
  nextResetLabel: string;
  timezone: string;
};

// Lore cards data
export const loreCards = [
  {
    eyebrow: "March 2023",
    title: "First sightings",
    body: "Claude entered the public timeline in March 2023, which makes this whole holiday feel slightly fan-made and slightly inevitable.",
    icon: Sparkles,
  },
  {
    eyebrow: "March 4, 2024",
    title: "The naming canon locks in",
    body: "Claude 3 gave the family its enduring poetry: Haiku for speed, Sonnet for balance, Opus for maximum overthinking energy.",
    icon: Orbit,
  },
  {
    eyebrow: "2024 to 2025",
    title: "The Sonnet era gets weirder",
    body: "Claude 3.5 Sonnet opened a new chapter, and Claude Sonnet 3.7 added Anthropic's hybrid reasoning framing. The lore got sharper, not quieter.",
    icon: BrainCircuit,
  },
] as const;

// Source links data
export const sourceLinks = [
  {
    href: "https://www.anthropic.com/research/claude-3-family",
    label: "Claude 3 family",
  },
  {
    href: "https://www.anthropic.com/news/claude-3-5-sonnet",
    label: "Claude 3.5 Sonnet",
  },
  {
    href: "https://docs.anthropic.com/en/docs/models-overview",
    label: "Models overview",
  },
  {
    href: "https://docs.anthropic.com/en/release-notes/claude-apps",
    label: "Claude app release notes",
  },
] as const;

// Utility functions - same as in index.tsx
export function getResetForYear(year: number) {
  return new Date(year, RESET_MONTH, RESET_DAY, 0, 0, 0, 0);
}

export function formatCountdown(durationMs: number) {
  const safeDuration = Math.max(durationMs, 0);
  const days = Math.floor(safeDuration / DAY_MS);
  const hours = Math.floor((safeDuration % DAY_MS) / HOUR_MS);
  const minutes = Math.floor((safeDuration % HOUR_MS) / MINUTE_MS);
  const seconds = Math.floor((safeDuration % MINUTE_MS) / SECOND_MS);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export function buildClockSnapshot(nowMs: number): ClockSnapshot {
  const now = new Date(nowMs);
  const thisYearReset = getResetForYear(now.getFullYear());
  const holidayEnd = new Date(now.getFullYear(), RESET_MONTH, RESET_DAY + 1, 0, 0, 0, 0);
  const lastReset =
    nowMs >= thisYearReset.getTime() ? thisYearReset : getResetForYear(now.getFullYear() - 1);
  const nextReset = getResetForYear(lastReset.getFullYear() + 1);
  const isHoliday = now.getMonth() === RESET_MONTH && now.getDate() === RESET_DAY;
  const activeCountdownTarget = isHoliday ? holidayEnd : nextReset;
  const formatter = new Intl.DateTimeFormat(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return {
    countdown: formatCountdown(activeCountdownTarget.getTime() - nowMs),
    cycleDay: Math.floor((nowMs - lastReset.getTime()) / DAY_MS) + 1,
    isHoliday,
    holidayEndsLabel: formatter.format(holidayEnd),
    lastResetLabel: formatter.format(lastReset),
    nextResetLabel: formatter.format(nextReset),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

export function useClaudeDayClock() {
  const [nowMs, setNowMs] = React.useState<number | null>(null);

  React.useEffect(() => {
    setNowMs(Date.now());

    const intervalId = window.setInterval(() => {
      setNowMs(Date.now());
    }, SECOND_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return nowMs === null ? null : buildClockSnapshot(nowMs);
}

export interface HomeArchiveProps {
  className?: string;
}

/**
 * HomeArchive - Extracted clock and lore components from the home page
 * This component can be reused in the sidebar or other layouts
 */
export const HomeArchive = React.forwardRef<HTMLDivElement, HomeArchiveProps>(
  ({ className }, ref) => {
    const clock = useClaudeDayClock();
    const countdownTitle = clock?.isHoliday
      ? "National Claude Day is live right now"
      : "Time until the next March 14 reset";
    const countdownUnits = [
      { label: "days", value: clock?.countdown.days ?? "--" },
      { label: "hours", value: clock?.countdown.hours ?? "--" },
      { label: "minutes", value: clock?.countdown.minutes ?? "--" },
      { label: "seconds", value: clock?.countdown.seconds ?? "--" },
    ];

    return (
      <div ref={ref} className={cn("flex flex-col gap-6", className)}>
        {/* Countdown Clock Card */}
        <Card
          id="countdown"
          className="rounded-[2rem] border border-foreground/10 bg-[color-mix(in_oklch,var(--background)_88%,var(--primary)_12%)] py-0 shadow-[0_24px_80px_oklch(0.48_0.06_68_/_0.08)]"
        >
          <CardHeader className="border-b border-foreground/10 px-6 py-6 md:px-7">
            <CardDescription className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase">
              <Clock3 className="size-3.5" />
              {clock?.isHoliday ? "holiday clock" : "reset clock"}
            </CardDescription>
            <CardTitle className="text-xl">{countdownTitle}</CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-6 md:px-7 md:py-7">
            <div className="grid grid-cols-2 gap-3">
              {countdownUnits.map((unit) => {
                return (
                  <div
                    key={unit.label}
                    className="rounded-[1.5rem] border border-foreground/10 bg-background/70 px-4 py-5"
                  >
                    <p className="text-3xl font-semibold tabular-nums text-foreground sm:text-4xl">
                      {unit.value}
                    </p>
                    <p className="mt-2 text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                      {unit.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 space-y-4 border-t border-foreground/10 pt-5 text-sm text-foreground/75">
              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 size-4 shrink-0 text-foreground/60" />
                <div>
                  <p className="font-medium text-foreground">
                    {clock?.isHoliday ? "Today began at" : "Last reset"}
                  </p>
                  <p>{clock?.lastResetLabel ?? "Waiting for your browser clock"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ScrollText className="mt-0.5 size-4 shrink-0 text-foreground/60" />
                <div>
                  <p className="font-medium text-foreground">
                    {clock?.isHoliday ? "Holiday closes at" : "Next reset"}
                  </p>
                  <p>
                    {clock?.isHoliday
                      ? clock.holidayEndsLabel
                      : (clock?.nextResetLabel ?? "Waiting for your browser clock")}
                  </p>
                </div>
              </div>
              <p className="rounded-[1.5rem] border border-dashed border-foreground/10 px-4 py-3 text-xs leading-6 text-foreground/65">
                {clock?.isHoliday
                  ? `The annual reset already happened at midnight. The next yearly rollover is ${clock.nextResetLabel}.`
                  : "March 14 does not appear to be official Anthropic canon. That makes it perfect fan canon."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Lore Section */}
        <div className="space-y-4">
          <Card className="rounded-[2rem] border border-foreground/10 bg-background/70 py-0">
            <CardHeader className="px-6 py-6 md:px-7">
              <CardDescription className="text-[11px] tracking-[0.2em] uppercase">
                observance notes
              </CardDescription>
              <CardTitle
                className="text-3xl leading-none tracking-[-0.03em]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What resets here?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-7 text-sm leading-7 text-foreground/75 md:px-7">
              <p>
                The countdown, the cycle day, and the overall sense of ceremony all snap back to
                zero at your next local March 14 midnight.
              </p>
              <p>
                It is intentionally a small website: one holiday, one clock, one tiny archive of
                Claude mythology.
              </p>
            </CardContent>
          </Card>

          <div id="lore" className="grid gap-4">
            {loreCards.map(({ eyebrow, title, body, icon: Icon }) => {
              return (
                <Card
                  key={title}
                  className="rounded-[2rem] border border-foreground/10 bg-background/70 py-0"
                >
                  <CardHeader className="px-6 py-6">
                    <div className="mb-2 flex size-10 items-center justify-center rounded-full border border-foreground/10 bg-background/80">
                      <Icon className="size-4" />
                    </div>
                    <CardDescription className="text-[11px] tracking-[0.18em] uppercase">
                      {eyebrow}
                    </CardDescription>
                    <CardTitle className="text-lg">{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-7 text-sm leading-7 text-foreground/75">
                    {body}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Source Links Section */}
        <section className="rounded-[2rem] border border-foreground/10 bg-background/75 px-6 py-6 shadow-[0_16px_48px_oklch(0.42_0.04_65_/_0.06)]">
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                source scroll
              </p>
              <h2
                className="mt-2 text-3xl leading-none tracking-[-0.03em] text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Canon-adjacent reading
              </h2>
              <p className="mt-3 text-sm leading-7 text-foreground/75">
                Lore on this page is based on Anthropic model announcements and docs, then dressed
                up a little for the holiday.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {sourceLinks.map(({ href, label }) => {
                return (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-foreground/10 bg-background px-4 py-2 text-[11px] font-medium tracking-[0.16em] text-foreground/75 uppercase transition-colors hover:bg-foreground hover:text-background"
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  },
);

HomeArchive.displayName = "HomeArchive";
