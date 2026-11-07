import { lazy } from "react";

import type { CommerceWithOwner } from "@features/commerces/types";
import { EntityListShell } from "@shared/components/EntityListShell";

const CommerceItem = lazy(() =>
  import("@features/commerces/components/CommerceItem").then((module) => ({
    default: module.CommerceItem,
  })),
);

type CommerceListProps = {
  commercesWithOwner: CommerceWithOwner[];
};

// en mobile sólo se ven logo, comercio (con dueño debajo), estado y acciones;
// a partir de lg aparecen el resto de las columnas (sin variante mobile propia)
const COLUMNS =
  "grid grid-cols-[48px_minmax(0,1fr)_auto_auto] items-center gap-x-4 lg:grid-cols-[72px_1fr_1fr_1.4fr_120px_90px_90px]";

const HEADERS = [
  { label: "Logo" },
  { label: "Comercio" },
  { label: "Dueño", className: "hidden lg:block" },
  { label: "Email", className: "hidden lg:block" },
  { label: "Modificación", className: "hidden lg:block" },
  { label: "Estado" },
  { label: "Acciones" },
];

export const CommerceList = ({ commercesWithOwner }: CommerceListProps) => (
  <EntityListShell
    items={commercesWithOwner}
    getKey={(commerce) => commerce.commerceId}
    headers={HEADERS}
    columns={COLUMNS}
    renderDesktop={(commerce) => (
      <CommerceItem commerce={commerce} columns={COLUMNS} />
    )}
  />
);
