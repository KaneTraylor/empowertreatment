# Repository Guidelines

## Project Structure & Module Organization
- `app/` holds App Router routes; each folder keeps its `page.tsx`, optional `layout.tsx`, and server action files.
- `components/` hosts shared UI (`ui/` primitives, `form/` workflows, feature bundles), with complementary logic in `hooks/` and utilities in `lib/`.
- `public/` stores static assets, `types/` centralizes TypeScript contracts, and `supabase/` contains SQL, migrations, and automation scripts.
- `__tests__/` mirrors the feature under test; reuse fixtures or helpers beside the related spec when possible.

## Build, Test, and Development Commands
- `npm run dev` — start the local Next server with hot reload at `http://localhost:3000`.
- `npm run build` — generate the production bundle; run before deployments or major merges.
- `npm run start` — serve the compiled build for smoke testing.
- `npm run lint` — execute the Next/ESLint ruleset; fix findings before submitting a PR.
- `npm test` / `npm run test:watch` / `npm run test:coverage` — run the Jest suite once, in watch mode, or with coverage tracking.

## Coding Style & Naming Conventions
Write new code in TypeScript. Match the repo’s 2-space indentation, use `PascalCase` for React components and component files, and `camelCase` for functions, hooks, and utility exports. Compose styling with Tailwind utilities, keeping shared tokens in `app/globals.css` or `tailwind.config.ts`. Prefer `@/` alias imports over relative paths for internal modules.

## Testing Guidelines
Jest with the `next/jest` preset and React Testing Library drives unit and component specs. Name files `*.test.tsx` inside `__tests__/`, mirroring the feature path, and mock network/Supabase calls through helpers in `jest.setup.js`. Prioritize coverage for forms, Supabase writes, and PDF exports, and ensure `npm run test:coverage` reports healthy totals before merge.

## Commit & Pull Request Guidelines
Use short, imperative commit messages (`Add calendar sync`, `Fix pass status auth`) in line with the existing history. Summaries should describe scope, list affected routes or components, and link tickets when available. Attach UI screenshots or terminal output when behavior changes. Confirm `npm run lint` and `npm test` locally before requesting review.

## Security & Configuration Tips
Store Supabase, Twilio, SendGrid, and Google AI credentials in `.env.local`; never commit secrets or tokens. Document any script or SQL updates within `supabase/` or the paired Markdown guide. Strip debugging logs before merge and verify new endpoints respect the session checks enforced by `middleware.ts` or route-level guards.
