import { lazy } from "react";

import type { SaleSummary } from "@features/sales/types";
import { EntityListShell } from "@shared/components/EntityListShell";

const SaleItem = lazy(() =>
  import("@features/sales/components/sales/SaleItem").then((module) => ({
    default: module.SaleItem,
  })),
);

const SaleItemMobile = lazy(() =>
  import("@features/sales/components/sales/SaleItemMobile").then((module) => ({
    default: module.SaleItemMobile,
  })),
);

type SalesListProps = {
  sales: SaleSummary[];
};

const HEADERS = [
  "N° venta",
  "Fecha",
  "Hora",
  "Cliente",
  "Ítems",
  "Metodo de pago",
  "Estado",
  "Total",
];

const DESKTOP_COLUMNS =
  "grid grid-cols-[0.2fr_0.2fr_0.2fr_0.5fr_0.2fr_0.4fr_0.3fr_0.2fr_0.1fr] items-center gap-x-4";

export const SalesList = ({ sales }: SalesListProps) => (
  <EntityListShell
    items={sales}
    getKey={(sale) => sale.id}
    headers={HEADERS}
    columns={DESKTOP_COLUMNS}
    mobileContainer="ul"
    // renderMobile y renderDesktop son funciones que reciben un item y devuelven el TSX de la fila correspondiente
    renderMobile={(sale) => <SaleItemMobile sale={sale} />}
    renderDesktop={(sale) => (
      <SaleItem sale={sale} desktopColumns={DESKTOP_COLUMNS} />
    )}
  />
);
