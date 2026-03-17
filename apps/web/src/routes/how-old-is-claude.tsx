import * as React from "react";

import { createFileRoute } from "@tanstack/react-router";

import { ageFacts, sourceLinks } from "../components/site-content";
import { SiteShell } from "../components/site-shell";

export const Route = createFileRoute("/how-old-is-claude")({
  component: HowOldIsClaudePage,
});

const CLAUDE_BIRTHDAY = new Date("2023-03-01T00:00:00Z").getTime();
const SECOND_MS = 1000;
const MINUTE_MS = 60 * SECOND_MS;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;
const YEAR_MS = 365.2425 * DAY_MS;

function useClaudeAge() {
  const [now, setNow] = React.useState(() => Date.now());

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, SECOND_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const ageMs = Math.max(now - CLAUDE_BIRTHDAY, 0);

  return {
    years: Math.floor(ageMs / YEAR_MS),
    days: Math.floor((ageMs % YEAR_MS) / DAY_MS),
    hours: Math.floor((ageMs % DAY_MS) / HOUR_MS),
    minutes: Math.floor((ageMs % HOUR_MS) / MINUTE_MS),
    seconds: Math.floor((ageMs % MINUTE_MS) / SECOND_MS),
    totalSeconds: Math.floor(ageMs / SECOND_MS).toLocaleString(),
  };
}

function HowOldIsClaudePage() {
  const age = useClaudeAge();
  const ageUnits = [
    { label: "years", value: age.years },
    { label: "days", value: age.days },
    { label: "hours", value: age.hours },
    { label: "minutes", value: age.minutes },
    { label: "seconds", value: age.seconds },
  ];

  return (
    <SiteShell>
      <main className="h-full overflow-y-auto px-4 pb-4 pt-3 md:px-8 md:pb-7">
        <section className="mx-auto w-full max-w-[92rem] px-6 py-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="space-y-5">
              <p className="text-sm text-white/48">how old is claude?</p>
              <h1
                className="max-w-md text-[clamp(3.2rem,5vw,5.6rem)] leading-[0.92] text-white/92"
                style={{ fontFamily: "var(--font-display)" }}
              >
                approximately three years old and counting in real time
              </h1>
              <p className="max-w-sm text-base leading-8 text-white/62">
                this page uses march 1, 2023 as the public starting line, because the public launch
                timing is documented as march 2023 rather than a single canonical day.
              </p>
            </div>

            <div className="space-y-6">
              <div className="border border-white/10 bg-white/[0.02] p-6">
                <p className="text-sm text-white/44">total seconds old</p>
                <p
                  className="mt-3 text-[clamp(2.8rem,6vw,5.8rem)] leading-none text-white/92"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {age.totalSeconds}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                {ageUnits.map((unit) => {
                  return (
                    <article
                      key={unit.label}
                      className="border border-white/10 bg-white/[0.02] p-5"
                    >
                      <p
                        className="text-[clamp(2.2rem,4vw,3.5rem)] leading-none text-white/92"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {unit.value}
                      </p>
                      <p className="mt-2 text-sm text-white/44">{unit.label}</p>
                    </article>
                  );
                })}
              </div>

              <div className="space-y-4 pt-2">
                {ageFacts.map((fact, index) => {
                  return (
                    <article
                      key={fact}
                      className="grid gap-4 border-b border-white/10 py-4 md:grid-cols-[110px_1fr] md:items-start"
                    >
                      <p className="pt-1 text-sm text-white/38">note {index + 1}</p>
                      <p
                        className="max-w-3xl text-[clamp(1.35rem,1.9vw,1.7rem)] leading-[1.6] text-white/86"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {fact}
                      </p>
                    </article>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                {sourceLinks.map((link) => {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/14 px-3 py-1.5 text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
