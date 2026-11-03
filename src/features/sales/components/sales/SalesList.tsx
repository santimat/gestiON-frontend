import { lazy } from "react";

import type { SaleSummary } from "@features/sales/types";
import { useIsMobile } from "@shared/hooks/useMediaQuery";
import { SaleItem } from "@features/sales/components/sales/SaleItem";

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

export const SalesList = ({ sales }: SalesListProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <ul className="grid gap-3">
        {sales.map((sale) => (
          <SaleItemMobile key={`sale-mobile-${sale.id}`} sale={sale} />
        ))}
      </ul>
    );
  }

  return (
    <section className="bg-card border-background-soft rounded-lg border">
      <ul
        className={`border-background-soft text-secondary-foreground ${DESKTOP_COLUMNS} border-b p-2 text-sm`}
      >
        {HEADERS.map((header) => (
          <li key={header}>{header}</li>
        ))}
      </ul>
      <ul className="[&>li]:not-first:border-background-soft text-sm [&>li]:not-first:border-t">
        {sales.map((sale) => (
          <SaleItem
            key={`sale-${sale.id}`}
            sale={sale}
            desktopColumns={DESKTOP_COLUMNS}
          />
        ))}
      </ul>
    </section>
  );
};
