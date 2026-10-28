# GestiON — Gestión de stock y control de ventas

SPA frontend de gestiON: stock, ventas (POS), comercios, puntos de venta, cajeros, clientes y categorías.
El backend (Spring Boot) vive en el repo hermano `gestiON-backend`; los agentes de desarrollo trabajan según `AGENTS.md`.

## Stack

- React 19 + Vite 8 + TypeScript 6 (React Compiler habilitado)
- Tailwind CSS v4 (CSS-first, tokens en `src/global.css`) + Mantine 9
- react-router v8 · zustand · zod 4 · axios · sonner

## Requisitos

- Node 20+
- pnpm (gestor del repo; no usar `npm install` — `package-lock.json` es un duplicado obsoleto)
- El backend corriendo en `http://localhost:8080/api` (repo hermano `gestiON-backend`); `pnpm dev` solo no alcanza para nada que requiera red. Auth por cookie HTTP-only, no hay archivos `.env`.

## Arranque

```bash
pnpm install
pnpm dev        # servidor de desarrollo
```

## Scripts

| Comando        | Qué hace                     |
| -------------- | ---------------------------- |
| `pnpm dev`     | Dev server (Vite)            |
| `pnpm build`   | `tsc -b && vite build`       |
| `pnpm lint`    | ESLint sobre el repo         |
| `pnpm preview` | Sirve el build de producción |

El typecheck es `npx tsc -p tsconfig.app.json --noEmit` (o `npx tsc -b`, que además valida `tsconfig.node.json`). El baseline es **0 errores de tsc y lint** — si una corrida sale roja, es una regresión.

## Estructura

```
src/
├── components/   # vistas en componentes, DOM por dominio (commerces/, sell/, sellPoints/…) y páginas full-screen
├── pages/        # páginas de rutas (lazy-loaded en App.tsx)
├── hooks/        # useX: API ligera por dominio para los componentes (seletores zustand)
├── stores/       # zustand por dominio
├── services/     # axios por dominio: zod safeParse → request → AppError
├── schemas/      # zod por dominio (contratos de request)
├── mappers/      # domain ↔ form/lógica
├── utils/        # errorDictionary, constantes (permisos por rol), helpers
└── types.d.ts    # tipos compartidos
```

## Convenciones clave

- Copys, comentarios y mensajes de error en **español**.
- Flujo de datos: `pages/components → hooks/useX → stores/useXStore → services/<domain> → backendAPI`.
- Servicios: `safeParse` → `handleZodParsingError` → request → `handleAxiosErrors` (nunca tragar errores desconocidos); los códigos y mensajes en español de `src/utils/errorDictionary.ts`.
- Exportaciones nombradas en todo el repo (default solo en `App.tsx` y `main.tsx`).
- Permisos por rol: `ALLOWEDS_ROUTES_BY_ROLE` en `src/utils/constants.ts` es la única fuente de verdad (sidebar + `ProtectedRoute`).
- Más detalles de patrones y trampas en [`AGENTS.md`](./AGENTS.md).
