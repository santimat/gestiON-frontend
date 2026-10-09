# AGENTS.md — gestiON-frontend

React 19 + Vite 8 + TypeScript SPA (stock & sales management). UI copy, comments, and error messages are in **Spanish — keep them Spanish**.

## Commands

- Dev server: `pnpm dev`
- Typecheck: `npx tsc -b` (no dedicated script; `pnpm build` = `tsc -b && vite build`)
- Lint: `pnpm lint` (`eslint .`)
- No test framework, no CI, no format script. Prettier config exists (`.prettierrc` = defaults + `prettier-plugin-tailwindcss`); run `npx prettier --write <files>` only on files you touched — repo-wide it would reformat tab-indented files.

**Package manager:** `pnpm` (`pnpm-lock.yaml` + pnpm-layout `node_modules`). `package-lock.json` is a stale duplicate — do not run `npm install` or update it.

**Baseline is red:** `pnpm lint` and `npx tsc -b` both fail with the same 3 pre-existing unused-var errors (`ProtectedRoute.tsx` `allowedRoles`, `useUserStore.ts` `set`/`get`) before your changes. Verify by confirming you added **no new** errors, not by getting a clean run.

## Architecture

Data flow: `pages/`/`components/` → `hooks/useX.ts` → `stores/useXStore.ts` (zustand) → `services/<domain>/<x>Service.ts` → `backendAPI` (axios).

- Path alias `@/` → `src/` (wired in both `vite.config.ts` and `tsconfig.app.json`).
- Shared types live in `src/types.d.ts`; zod schemas in `src/schemas/<domain>/`.
- Backend: `http://localhost:8080/api`, hardcoded in `src/services/axios/axiosConfig.ts` with `withCredentials: true`. Auth is **HTTP-only cookie based** (no token in localStorage, no `.env` files — `import.meta.env` is unused). Backend must be running locally for anything networked.
- Routes are declared in `src/App.tsx` (lazy-loaded pages) with `ProtectedRoute`/`GuestRoute` wrappers. Note: `ProtectedRoute` takes `allowedRoles` but the role check is **commented out** — roles only filter sidebar entries via `ALLOWEDS_ROUTES_BY_ROLE` in `src/utils/constants.ts`.

## Conventions (differ from defaults)

- Import router APIs from **`react-router`** (v8). `react-router-dom` (v7) is also in `package.json` but unused — don't import it.
- `tsconfig.app.json` sets `verbatimModuleSyntax`, `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`: use `import type` for types, no enums/parameter properties, no unused anything.
- Named exports everywhere (`export const useX`, `export const XPage`); default exports only in `src/App.tsx` and `src/main.tsx`.
- Services pattern: zod `safeParse` → `handleZodParsingError` → request → catch with `createAxiosErrorHandler({ ...statusOverrides })` from `src/utils/handleAxiosError.ts`, which throws an `AppError` (`{ type, message, fieldErrors? }`). Callers catch and show `toast.error(appError.message)` (sonner).
- Zustand selectors use `useShallow` (see `src/hooks/*`).
- Tailwind v4 CSS-first config: design tokens are `@theme` variables in `src/global.css` (no `tailwind.config`). Mantine 9 coexists (`MantineProvider` in `main.tsx`) — Mantine for structure/components, Tailwind for styling.
- **React Compiler is enabled** (babel preset in `vite.config.ts`): components auto-memoize, so skip manual `useMemo`/`useCallback`/`React.memo`. When writing/reviewing React code, load the `vercel-react-best-practices` skill (registered in `skills-lock.json`).
