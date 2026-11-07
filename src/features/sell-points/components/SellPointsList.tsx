import { lazy } from "react";

import type { SellPoint } from "@features/sell-points/types";
import { EntityListShell } from "@shared/components/EntityListShell";

const SellPointItem = lazy(() =>
  import("@features/sell-points/components/SellPointItem").then((module) => ({
    default: module.SellPointItem,
  })),
);

const SellPointItemMobile = lazy(() =>
  import("@features/sell-points/components/SellPointItemMobile").then(
    (module) => ({
      default: module.SellPointItemMobile,
    }),
  ),
);

type SellPointsListProps = {
  sellPoints: SellPoint[];
};

const HEADERS = [
  "Punto de venta",
  "Cajeros",
  "Actualizado",
  "Estado",
  "Acciones",
];

const COLUMNS =
  "grid grid-cols-[1fr_1.2fr_0.6fr_0.5fr_0.3fr] items-center gap-x-4";

export const SellPointsList = ({ sellPoints }: SellPointsListProps) => (
  <EntityListShell
    items={sellPoints}
    getKey={(sellPoint) => sellPoint.id}
    headers={HEADERS}
    columns={COLUMNS}
    renderMobile={(sellPoint) => <SellPointItemMobile sellPoint={sellPoint} />}
    renderDesktop={(sellPoint) => (
      <SellPointItem sellPoint={sellPoint} columns={COLUMNS} />
    )}
  />
);
