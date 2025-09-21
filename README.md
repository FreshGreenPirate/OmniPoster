# OmniPoster

OmniPoster is a cross-platform social media scheduler designed for modern short-form creators. This monorepo ships with a production-grade architecture featuring a Next.js web application, dedicated BullMQ worker processes, strongly-typed shared packages, and Prisma-managed PostgreSQL storage.

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm 8+
- PostgreSQL 14+
- Redis 7+
- An S3-compatible object store (for development you can use `localstack` or `minio`).

### Installation

```bash
pnpm install
cp .env.example .env
pnpm prisma:setup
```

### Useful Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the Next.js development server. |
| `pnpm worker` | Starts the BullMQ worker. |
| `pnpm test` | Runs Vitest unit tests across packages. |
| `pnpm lint` | Runs ESLint. |
| `pnpm e2e` | Runs Playwright smoke tests. |

### Structure

- `apps/web`: Next.js app router application exposing UI and API routes.
- `apps/worker`: BullMQ worker processes for upload/publish/comment/metrics jobs.
- `packages/core`: Shared domain logic, schema validation, and utilities.
- `packages/providers`: Platform integrations for YouTube, Instagram, TikTok, plus typed stubs for other networks.
- `prisma`: Prisma schema, migrations, and database seed scripts.
- `scripts`: Development helpers and mock-data generators.

Refer to inline documentation and TODOs for guidance on completing provider secrets and production configuration.
