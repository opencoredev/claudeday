import { Toaster } from "@claudeday/ui/components/sonner";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";

import appCss from "../index.css?url";

export interface RouterAppContext {}

const siteTitle = "National Claude Day";
const siteDescription =
  "A tiny ceremonial site that counts down to the next March 14 midnight reset and keeps a little fan-made Claude lore on hand.";
const siteUrl = "https://claudeday.dev";
const ogImageUrl = `${siteUrl}/og-image.png`;
const ogImageAlt = "A screenshot of the National Claude Day homepage countdown.";

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: siteTitle,
      },
      {
        name: "description",
        content: siteDescription,
      },
      {
        name: "theme-color",
        content: "#262524",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:site_name",
        content: siteTitle,
      },
      {
        property: "og:url",
        content: siteUrl,
      },
      {
        property: "og:title",
        content: siteTitle,
      },
      {
        property: "og:description",
        content: siteDescription,
      },
      {
        property: "og:image",
        content: ogImageUrl,
      },
      {
        property: "og:image:secure_url",
        content: ogImageUrl,
      },
      {
        property: "og:image:type",
        content: "image/png",
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:image:alt",
        content: ogImageAlt,
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: siteTitle,
      },
      {
        name: "twitter:description",
        content: siteDescription,
      },
      {
        name: "twitter:image",
        content: ogImageUrl,
      },
      {
        name: "twitter:image:alt",
        content: ogImageAlt,
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon.png",
      },
      {
        rel: "canonical",
        href: siteUrl,
      },
    ],
  }),

  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        <script
          defer
          src="https://l.claudeday.dev/script.js"
          data-website-id="8eb3d49b-fd63-4cbc-b3b4-d34655954109"
        />
      </head>
      <body>
        <Outlet />
        <Toaster richColors />
        <Scripts />
      </body>
    </html>
  );
}
