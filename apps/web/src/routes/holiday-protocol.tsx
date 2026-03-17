import { createFileRoute } from "@tanstack/react-router";

import { holidayProtocol } from "../components/site-content";
import { SiteShell } from "../components/site-shell";

export const Route = createFileRoute("/holiday-protocol")({
  component: HolidayProtocolPage,
});

function HolidayProtocolPage() {
  return (
    <SiteShell>
      <main className="flex h-full items-center px-4 pb-4 pt-3 md:px-8 md:pb-7">
        <section className="mx-auto w-full max-w-[92rem] px-6 py-8">
          <div className="max-w-2xl space-y-5">
            <p className="text-sm text-white/48">holiday protocol</p>
            <h1
              className="text-[clamp(3.2rem,5vw,5.6rem)] leading-[0.92] text-white/92"
              style={{ fontFamily: "var(--font-display)" }}
            >
              four ways to observe national claude day correctly
            </h1>
            <p className="text-base leading-8 text-white/62">
              entirely unofficial guidance for participating in a holiday that remains gloriously
              unofficial.
            </p>
          </div>

          <div className="mt-10 grid gap-4">
            {holidayProtocol.map((line, index) => {
              return (
                <article
                  key={line}
                  className="grid gap-4 border-b border-white/10 py-5 md:grid-cols-[130px_1fr] md:items-start"
                >
                  <p className="text-sm text-white/38">step {index + 1}</p>
                <p
                  className="text-[clamp(1.55rem,2vw,2rem)] leading-[1.45] text-white/92"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {line}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
