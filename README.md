# GestiON — Gestión de stock y control de ventas

GestiON es un sistema web para comercios chicos: cargás productos, controlás el stock, cobrás rápido desde el mostrador y ves cuánto ganaste, desde la PC o el celular.

Este repositorio contiene el **frontend** del sistema: una SPA con landing público, login y la app operativa de stock, ventas (POS), panel de ganancias, comercios, puntos de venta, cajeros, clientes, categorías, ofertas y configuración. El backend (Spring Boot) vive en el repo hermano `gestiON-backend`; las convenciones de desarrollo están en [`AGENTS.md`](./AGENTS.md).

## Qué incluye

| Módulo              | Qué resuelve                                                                                                                           |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Panel**           | Ventas del día, ticket promedio, productos más vendidos y alertas de stock bajo, con filtros por período.                              |
| **Punto de venta**  | Buscá o escaneá el código, armá el carrito, aplicá descuentos y cobrá en efectivo, tarjeta, transferencia o cuenta corriente.          |
| **Ventas**          | Historial con búsqueda, filtros y paginación; detalle de cada venta, estado de pago (pago/pendiente) y ticket emitido.                 |
| **Productos**       | Alta, edición y baja con precio, stock, stock mínimo y código; se marcan solos cuando están por agotarse.                              |
| **Categorías**      | Creá, renombrá y borrá categorías para ordenar el catálogo.                                                                            |
| **Ofertas**         | Descuentos por monto o porcentaje con fecha de inicio y fin; activas, programadas o vencidas, aplicables a productos o medios de pago. |
| **Clientes**        | Ficha del cliente, búsqueda y cuentas pendientes: cada cliente con su detalle de ventas y total adeudado.                              |
| **Cajeros**         | Altas, bajas, permisos y estado activo de cada cajero.                                                                                 |
| **Puntos de venta** | Terminales del comercio (nombre, activo y cajeros asignados).                                                                          |
| **Comercios**       | Alta y gestión de los comercios que usan el sistema.                                                                                   |
| **Configuración**   | Datos del comercio, logo y multiplicador de ganancia.                                                                                  |

## Quién entra y qué ve

| Rol                                | Acceso                                                                                             |
| ---------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Administrador general** (`SUDO`) | Comercios: da de alta y administra los comercios del sistema.                                      |
| **Dueño** (`OWNER`)                | Panel, productos, categorías, ofertas, clientes, cajeros, puntos de venta, ventas y configuración. |
| **Cajero** (`CASHIER`)             | Punto de venta, ventas, productos, clientes y ofertas.                                             |

El menú y las rutas se arman según quién entra: `ALLOWEDS_ROUTES_BY_ROLE` (`src/shared/config/permissions.ts`) es la única fuente de verdad para el sidebar y para `ProtectedRoute`, así que nadie ve opciones que no le sirven.

Los mismos módulos funcionan en la PC del mostrador y en el celular: cada listado renderiza la variante mobile o la desktop según el ancho de la pantalla, no hay que aprender dos formas de trabajar.

## Stack

- React 19 + Vite 8 + TypeScript 6 (React Compiler habilitado)
- Tailwind CSS v4 (CSS-first, tokens en `src/global.css`) + Mantine 9 (core, dates y charts)
- react-router v8 · zustand · zod 4 · axios · sonner
- recharts + `@mantine/charts` (gráficos) · fuse.js (búsqueda) · lucide-react (íconos) · dayjs (fechas)

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
├── App.tsx         # rutas (lazy) + ProtectedRoute/GuestRoute
├── main.tsx        # providers: Router, Mantine, Toaster
├── global.css      # tokens de diseño (@theme) de Tailwind v4
├── shared/        # shell reutilizable, sin lógica de un recurso
│   ├── components/    # ListContainer, EntityListShell, ListPagination, EntityFormModal, ModalHeader, ModalFormActions, ImageViewer, StatusBadge…
│   ├── pages/         # NotFoundPage, UnauthorizedPage (full-screen, fuera del layout)
│   ├── layout/        # MainLayout, PageHeader + store/hook del header, components/sidebar/
│   ├── routes/        # ProtectedRoute, GuestRoute
│   ├── hooks/         # useFilters (filtros en URL con schema zod), useMediaQuery (render condicional mobile/desktop), useEntityForm…
│   ├── services/      # axiosConfig (backendAPI)
│   ├── utils/         # errorDictionary, handleAxiosError(s), handleZodParseError, pagination, money, dates…
│   ├── config/        # permissions.ts (roles/rutas/redirects) y navigation.ts (SIDEBAR_ITEMS)
│   ├── schemas/       # FiltersBaseSchema (base de filtros compartida)
│   └── types.d.ts     # tipos cross-cutting: AppError, FieldErrors, NavItem, UserRole, ZodParseResult
└── features/      # un recurso por carpeta, autosuficiente:
    ├── auth/  cashiers/  categories/  clients/  commerces/
    ├── dashboard/  landing/  offers/  products/  sell-points/  settings/
    └── sales/        # POS (components/sell/, Sell.tsx, useSaleStore) + historial (components/sales/, Sales.tsx, useSalesStore)
        cada uno: components/ pages/ hooks/ schemas/ services/ stores/ mappers/
                  types.ts (tipos de dominio) · constants.ts · index.ts (barrel público; settings todavía no lo tiene)
```

- **Aliases:** `@/`, `@shared/`, `@features/` → `src/`, `src/shared/`, `src/features/` (en `vite.config.ts` y `tsconfig.app.json`).
- **Reglas de import:** todo import usa alias (sin rutas relativas); dentro de un feature se pueden usar rutas profundas `@features/<recurso>/...`, entre features **solo por el barrel** `@features/<recurso>` (`index.ts`, sin deep imports); feature → `@shared/*` libre.

## Convenciones clave

- Copys, comentarios y mensajes de error en **español**.
- Flujo de datos: `pages/components (feature) → hooks/useX → stores/useXStore → services/<x>Service → backendAPI`.
- Servicios: `safeParse` → `handleZodParsingError` → request → `handleAxiosErrors` (nunca tragar errores desconocidos); los códigos y mensajes en español de `src/shared/utils/errorDictionary.ts`.
- Exportaciones nombradas en todo el repo (default solo en `App.tsx` y `main.tsx`).
- Permisos por rol: `ALLOWEDS_ROUTES_BY_ROLE` en `@shared/config/permissions.ts` es la única fuente de verdad (sidebar + `ProtectedRoute`).
- Filtros y paginación: los filtros viven en la URL con schema zod (`@shared/hooks/useFilters`) y la paginación se resuelve en la capa compartida (`ListPagination`).
- Listados: variante mobile y desktop con `useIsMobile()`; solo se monta la variante activa.
