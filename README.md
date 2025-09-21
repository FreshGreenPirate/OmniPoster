# OmniPoster Monorepo

OmniPoster is a cross-platform social media scheduler that focuses on YouTube, Instagram, and TikTok while providing placeholders for upcoming networks. The repository is organised as a pnpm workspace monorepo containing the Next.js web experience, background workers, shared packages, and Prisma schema.

## Getting started

1. Install [pnpm](https://pnpm.io/installation) (version 8+).
2. Copy `.env.example` to `.env` and fill out credentials.
3. Install dependencies and generate Prisma client:

```bash
pnpm install
pnpm prisma generate
```

4. Run database migrations and seed demo data:

```bash
pnpm prisma migrate deploy
pnpm --filter prisma run seed
```

5. Start the development servers:

```bash
pnpm --filter web dev
pnpm --filter worker dev
```

## Workspace layout

- `apps/web` – Next.js (App Router) web application and API routes.
- `apps/worker` – BullMQ workers responsible for uploads, publishing, first comments, and metrics refresh.
- `packages/core` – shared domain types, utilities, validation schemas, and helpers.
- `packages/providers` – social network provider implementations (YouTube, Instagram, TikTok) and stubs for additional platforms.
- `prisma` – Prisma schema, migrations, and seed scripts.
- `scripts` – auxiliary scripts and CLIs.

## Testing & quality

- Unit tests run with Vitest: `pnpm test`
- Playwright smoke tests: `pnpm --filter web test:e2e`
- Linting via ESLint & Prettier: `pnpm lint`

## Documentation

Additional architecture and feature notes live in the `/docs` folder (to be expanded) and inline in the codebase. Each package exposes its own README with implementation details and TODOs for future work.
