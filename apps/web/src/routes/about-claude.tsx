import { createFileRoute } from "@tanstack/react-router";

import { aboutClaudeLines, sourceLinks } from "../components/site-content";
import { SiteShell } from "../components/site-shell";

export const Route = createFileRoute("/about-claude")({
  component: AboutClaudePage,
});

function AboutClaudePage() {
  return (
    <SiteShell>
      <main className="flex h-full items-center px-4 pb-4 pt-3 md:px-8 md:pb-7">
        <section className="mx-auto grid w-full max-w-[92rem] gap-10 px-6 py-8 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
          <div className="space-y-5">
            <p className="text-sm text-white/48">about claude</p>
            <h1
              className="max-w-md text-[clamp(3.2rem,5vw,5.6rem)] leading-[0.92] text-white/92"
              style={{ fontFamily: "var(--font-display)" }}
            >
              a short history of the house poet
            </h1>
            <p className="max-w-sm text-base leading-8 text-white/62">
              grounded in anthropic announcements and docs, then translated into a slightly more
              ceremonial dialect.
            </p>
          </div>

          <div className="space-y-4">
            {aboutClaudeLines.map((line, index) => {
              return (
                <article
                  key={line}
                  className="grid gap-4 border-b border-white/10 py-4 md:grid-cols-[110px_1fr] md:items-start"
                >
                  <p className="pt-1 text-sm text-white/38">chapter {index + 1}</p>
                  <p
                    className="max-w-3xl text-[clamp(1.35rem,1.9vw,1.7rem)] leading-[1.6] text-white/86"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {line}
                  </p>
                </article>
              );
            })}

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
        </section>
      </main>
    </SiteShell>
  );
}
