import { createFileRoute } from "@tanstack/react-router";

import { useClaudeDayClock } from "../hooks/use-claude-day-clock";
import { SiteShell } from "../components/site-shell";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const clock = useClaudeDayClock();
  const heroLabel = clock.isHoliday ? "time left today" : "until national claude day";
  const countdownDisplay = `${clock.countdown.days}d ${clock.countdown.hours}h ${clock.countdown.minutes}m ${clock.countdown.seconds}s`;
  const resetDetail = clock.isHoliday ? clock.holidayEndsLabel : clock.nextResetLabel;

  const footerItems = [
    {
      label: "status",
      value: clock.isHoliday ? "live today" : "waiting patiently",
    },
    {
      label: "reset",
      value: resetDetail,
    },
    {
      label: "timezone",
      value: clock.timezone,
    },
  ];

  return (
    <SiteShell>
      <main className="flex h-full flex-col px-4 pb-4 pt-3 md:px-8 md:pb-7">
        <section className="mx-auto flex h-full w-full max-w-[92rem] flex-col">
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center md:px-12">
            <p className="mb-6 text-[0.82rem] font-medium tracking-[0.24em] text-white/46">
              {heroLabel}
            </p>
            <h1
              className="max-w-6xl text-[clamp(3.75rem,10vw,9.5rem)] leading-[0.9] text-white/92"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {countdownDisplay}
            </h1>
            <p
              className="mt-5 max-w-3xl text-[clamp(1.2rem,2vw,1.8rem)] text-white/68"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {clock.isHoliday
                ? "national claude day is live right now."
                : "the yearly reset lands at your local march 14 midnight."}
            </p>
          </div>

          <div className="grid gap-6 border-t border-white/12 px-6 py-6 text-white/78 md:grid-cols-3 md:px-10">
            {footerItems.map((item) => {
              return (
                <div key={item.label} className="space-y-2">
                  <p className="text-[0.72rem] tracking-[0.2em] text-white/38">{item.label}</p>
                  <p
                    className="text-[clamp(1.1rem,1.7vw,1.45rem)] text-white/88"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
