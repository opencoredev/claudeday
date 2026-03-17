import * as React from "react";

export const RESET_MONTH = 2; // March (0-indexed)
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

  if (nowMs === null) {
    return {
      countdown: { days: "--", hours: "--", minutes: "--", seconds: "--" },
      cycleDay: 0,
      isHoliday: false,
      holidayEndsLabel: "--",
      lastResetLabel: "--",
      nextResetLabel: "--",
      timezone: "--",
    };
  }

  return buildClockSnapshot(nowMs);
}
