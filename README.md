# OmniPoster

OmniPoster is a cross-platform social media scheduler focused on YouTube, Instagram, and TikTok with stubs for additional networks. The repository is structured as a pnpm monorepo to keep the web experience, background workers, and shared packages aligned.

## Monorepo structure

```
apps/
  web/        Next.js 14 app-router frontend + API routes
  worker/     BullMQ worker service
packages/
  core/       Shared types, helpers, and domain logic
  providers/  Platform integrations (YouTube, Instagram, TikTok + stubs)
prisma/       Prisma schema & migrations
scripts/      Development utilities (seed, mock data)
```

## Getting started

1. Install dependencies (pnpm recommended):

```bash
pnpm install
```

2. Configure environment variables based on `.env.example`.

3. Apply database migrations and seed demo data:

```bash
pnpm exec prisma migrate deploy
pnpm exec prisma db seed --preview-feature --schema prisma/schema.prisma -- --require ts-node/register scripts/seed.ts
```

4. Run the development servers:

```bash
pnpm dev:web
pnpm dev:worker
```

## Testing & linting

```bash
pnpm lint
pnpm test
```

Vitest covers unit logic (template assembly, hashtag formatting) and Playwright is available for smoke tests.

## Providers

- YouTube: resumable uploads, publish, metrics, first comments.
- Instagram (Graph API): Reels upload via container flow, optional first comment.
- TikTok: Content Posting API integration.
- Placeholders for Snapchat, Pinterest, Facebook Pages, X/Twitter, Reddit, Discord, LinkedIn, WhatsApp, Telegram, Bluesky.

## Worker queues

BullMQ drives four queues (`uploadQueue`, `publishQueue`, `commentQueue`, `metricsQueue`) with exponential backoff. Job processors coordinate with provider adapters for uploads, publish flows, and analytics collection.

## Internationalization

The frontend is wired with i18next. Locale packs live in `apps/web/public/locales/<locale>/common.json`.

## Link in Bio & analytics

The UI includes component previews for quick links, brand switching, and calendar snapshots to illustrate the experience while wiring up API handlers.

## License

MIT
