# syntax=docker/dockerfile:1.7

FROM oven/bun:1.3.5-alpine AS deps
WORKDIR /app

COPY package.json bun.lock turbo.json tsconfig.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/env/package.json packages/env/package.json
COPY packages/ui/package.json packages/ui/package.json

RUN bun install --frozen-lockfile

FROM deps AS builder
WORKDIR /app

COPY . .
RUN bun run build --filter=web

FROM node:24-alpine AS runtime
ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /app/apps/web

RUN addgroup -S app && adduser -S app -G app

COPY --from=builder /app/apps/web/dist ./dist
COPY --from=builder /app/apps/web/server.mjs ./server.mjs

USER app
EXPOSE 8080

CMD ["node", "server.mjs"]
