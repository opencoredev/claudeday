import { createFileRoute } from "@tanstack/react-router";

import { favoriteThings } from "../components/site-content";
import { SiteShell } from "../components/site-shell";

export const Route = createFileRoute("/favorite-things")({
  component: FavoriteThingsPage,
});

function FavoriteThingsPage() {
  const featuredItem = favoriteThings[0];
  const supportingItem = favoriteThings[1];

  return (
    <SiteShell>
      <main className="h-full overflow-y-auto px-4 pb-4 pt-3 md:px-8 md:pb-7">
        <section className="mx-auto w-full max-w-[92rem] px-6 py-8">
          <div className="max-w-2xl space-y-5">
            <p className="text-sm text-white/48">favorite things</p>
            <h1
              className="text-[clamp(3.2rem,5vw,5.6rem)] leading-[0.92] text-white/92"
              style={{ fontFamily: "var(--font-display)" }}
            >
              not official. still emotionally correct.
            </h1>
            <p className="text-base leading-8 text-white/62">
              a list of preferences assembled from public product history, strong inference, and one
              very specific gradient complaint.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
            <article className="border border-white/10 bg-white/[0.02] p-6">
              <div className="overflow-hidden border border-white/10">
                <div className="h-72 bg-[linear-gradient(135deg,oklch(0.72_0.12_39),oklch(0.66_0.14_300))]" />
              </div>
              <p className="mt-5 text-sm text-white/44">favorite thing no. 1</p>
              <h2
                className="mt-2 text-[clamp(2rem,3vw,3.1rem)] leading-[0.95] text-white/92"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {featuredItem.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/64">
                {featuredItem.body}
              </p>
            </article>

            <article className="border border-white/10 bg-white/[0.02] p-5">
              <div className="mb-5 overflow-hidden border border-white/10 bg-white/[0.03]">
                <div className="grid h-40 place-items-center bg-[linear-gradient(180deg,oklch(0.18_0.01_270),oklch(0.14_0.01_270))] p-5">
                  <div className="flex h-full w-full items-center justify-center border border-white/10 bg-white/[0.04] px-6 text-center">
                    <p
                      className="text-[clamp(2rem,3vw,3rem)] leading-none text-white/92"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      you&apos;re absolutely right
                    </p>
                  </div>
                </div>
              </div>

              <h2
                className="text-[clamp(1.5rem,1.8vw,1.9rem)] text-white/92"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {supportingItem.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/64">{supportingItem.body}</p>
            </article>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
