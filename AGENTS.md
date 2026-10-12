# AGENTS.md — gestiON-frontend

React 19 + Vite 8 + TypeScript SPA (stock & sales management). UI copy, comments, and error messages are in **Spanish — keep them Spanish**.

## Commands

- Dev server: `pnpm dev`
- Typecheck: `npx tsc -b` (no dedicated script; `pnpm build` = `tsc -b && vite build`)
- Lint: `pnpm lint` (`eslint .`)
- No test framework, no CI, no format script. Prettier config exists (`.prettierrc` = defaults + `prettier-plugin-tailwindcss`); run `npx prettier --write <files>` only on files you touched — repo-wide it would reformat tab-indented files.

**Package manager:** `pnpm` (`pnpm-lock.yaml` + pnpm-layout `node_modules`). `package-lock.json` is a stale duplicate — do not run `npm install` or update it.

**Baseline is red** — verify you added **no new** errors, not that the run comes out clean:

- `pnpm lint`: 3 pre-existing unused-var errors (`ProtectedRoute.tsx` `allowedRoles`, `useUserStore.ts` `set`/`get`).
- `npx tsc -b`: those same 3 **plus** `src/utils/handleZodParseError.ts(20,7)` TS2353 (it throws `{ type, ... }` while `AppError` expects `code` — broken at HEAD), **plus** currently `productMapper.ts(7)` / `utils/constants.ts(72)` TS2322 `string` vs `number`, which come from in-progress uncommitted edits to `ProductForm` in `src/types.d.ts` and may disappear once that work lands.

## Architecture

Data flow: `pages/`/`components/` → `hooks/useX.ts` → `stores/useXStore.ts` (zustand) → `services/<domain>/<x>Service.ts` → `backendAPI` (axios).

- Path alias `@/` → `src/` (wired in both `vite.config.ts` and `tsconfig.app.json`).
- Shared types live in `src/types.d.ts`; zod schemas in `src/schemas/<domain>/`.
- Backend: `http://localhost:8080/api`, hardcoded in `src/services/axios/axiosConfig.ts` with `withCredentials: true`. Auth is **HTTP-only cookie based** (no token in localStorage, no `.env` files — `import.meta.env` is unused). Backend must be running locally for anything networked.
- Routes are declared in `src/App.tsx` (lazy-loaded pages) with `ProtectedRoute`/`GuestRoute` wrappers. Note: `ProtectedRoute` takes `allowedRoles` but the role check is **commented out** — roles only filter sidebar entries via `ALLOWEDS_ROUTES_BY_ROLE` in `src/utils/constants.ts`. The catch-all `<Route path="*" element={<NotFoundPage />} />` sits at the end of `<Routes>`, **outside** both wrappers (full-screen 404 from `src/components/NotFoundPage.tsx`, lazy-imported like the pages).

## Conventions (differ from defaults)

- Import router APIs from **`react-router`** (v8). `react-router-dom` (v7) is also in `package.json` but unused — don't import it.
- `tsconfig.app.json` sets `verbatimModuleSyntax`, `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`: use `import type` for types, no enums/parameter properties, no unused anything.
- Named exports everywhere (`export const useX`, `export const XPage`); default exports only in `src/App.tsx` and `src/main.tsx`.
- Services pattern: zod `safeParse` → `handleZodParsingError` → request → catch with `if (isAxiosError(error)) throw handleAxiosErrors(error)` (`handleAxiosErrors` from `src/utils/handleAxiosError.ts`), which throws an `AppError` = `{ code: keyof typeof ErrorDictionary, message, fieldErrors? }` (codes and Spanish messages live in `src/utils/errorDictionary.ts`). Callers catch and show `toast.error(appError.message)` (sonner).
- Zustand selectors use `useShallow` (see `src/hooks/*`).
- Tailwind v4 CSS-first config: design tokens are `@theme` variables in `src/global.css` (no `tailwind.config`). Mantine 9 coexists (`MantineProvider` in `main.tsx`) — Mantine for structure/components, Tailwind for styling. Color tokens that actually exist: `background`, `background-soft`, `card`, `surface`, `border`, `input`, `foreground`, `secondary-foreground`, `primary`, `primary-soft`, `success`, `warning`, `destructive` (plus `font-display`, `shadow-card`, `shadow-raised`). **Trap:** shadcn-style names such as `text-muted-foreground`, `bg-accent`, `text-accent-foreground`, `text-primary-foreground` have no `--color-*` variable, so Tailwind emits nothing and the class silently no-ops — `text-primary-foreground` is already dead in `landing/Header.tsx`, `landing/Footer.tsx` and `landing/PreviewPanel.tsx` (verified against the built CSS). Map to an existing token (`text-secondary-foreground`, `hover:bg-background-soft`, Mantine sets a button's own foreground) or add the token to `@theme` first.
- Mantine `Button` with icons: `leftSection={<Icon />}`. For a link styled as a button use `<Button component={Link} to="...">` (type-checks fine with react-router 8) — avoid `<Button><Link …></Button>`, which nests an `<a>` inside a `<button>`; `landing/Hero.tsx`, `landing/CTASection.tsx` and `landing/Header.tsx` still do it, don't copy it into new code.
- **React Compiler is enabled** (babel preset in `vite.config.ts`): components auto-memoize, so skip manual `useMemo`/`useCallback`/`React.memo`. When writing/reviewing React code, load the `vercel-react-best-practices` skill (registered in `skills-lock.json`).
- Skills live in `.agents/skills/` (registered in `skills-lock.json`): `vercel-react-best-practices` and `lovable-mcp` (how to drive the Lovable MCP). The Lovable project **Swift Stock** (`f20db5cf-bbb4-4695-aa42-e486aa2a9ef5`, workspace "santi's Lovable") is the design source this repo implements — read designs from it with `lovable.read_file` before building a view from scratch.
