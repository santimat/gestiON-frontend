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

Arquitectura por features (`src/features/<recurso>/`) con una capa compartida (`src/shared/`):

```
src/
├── shared/        # shell reutilizable, sin lógica de un recurso
│   ├── components/    # ListContainer, Loading, ModalHeader, ModalFormActions, ImageViewer, ProductItemActions…
│   ├── pages/         # NotFoundPage, UnauthorizedPage (full-screen, fuera del layout)
│   ├── layout/        # MainLayout, PageHeader + store/hook del header, components/sidebar/
│   ├── routes/        # ProtectedRoute, GuestRoute
│   ├── hooks/         # useFilters (filtros en URL con schema zod)
│   ├── services/      # axiosConfig (backendAPI)
│   ├── utils/         # errorDictionary, handleAxiosError(s), handleZodParseError, getAvatarColor
│   ├── config/        # permissions.ts (roles/rutas/redirects) y navigation.ts (SIDEBAR_ITEMS)
│   ├── schemas/       # FiltersBaseSchema (base de filtros compartida)
│   └── types.d.ts     # tipos cross-cutting: AppError, FieldErrors, NavItem, UserRole, ZodParseResult
└── features/      # un recurso por carpeta, autosuficiente:
    ├── auth/  cashiers/  categories/  clients/  commerces/
    ├── landing/  products/  sell-points/
    └── sales/        # POS (components/sell/, Sell.tsx, useSaleStore) + historial (components/sells/, Sales.tsx, useSalesStore)
        cada uno: components/ pages/ schemas/ services/ stores/ hooks/ mappers/
                  types.ts (tipos de dominio) · constants.ts · index.ts (barrel público)
```

- **Aliases:** `@/`, `@shared/`, `@features/` → `src/`, `src/shared/`, `src/features/` (en `vite.config.ts` y `tsconfig.app.json`).
- **Reglas de import:** dentro de un feature, rutas relativas; entre features, **solo por el barrel** `@/features/<recurso>` (`index.ts`, sin deep imports); feature → `@shared/*` libre.

## Convenciones clave

- Copys, comentarios y mensajes de error en **español**.
- Flujo de datos: `pages/components (feature) → hooks/useX → stores/useXStore → services/<x>Service → backendAPI`.
- Servicios: `safeParse` → `handleZodParsingError` → request → `handleAxiosErrors` (nunca tragar errores desconocidos); los códigos y mensajes en español de `src/shared/utils/errorDictionary.ts`.
- Exportaciones nombradas en todo el repo (default solo en `App.tsx` y `main.tsx`).
- Permisos por rol: `ALLOWEDS_ROUTES_BY_ROLE` en `@shared/config/permissions.ts` es la única fuente de verdad (sidebar + `ProtectedRoute`).
- Más detalles de patrones y trampas en [`AGENTS.md`](./AGENTS.md).
