import { lazy } from "react";
import { ChevronRight } from "lucide-react";

import type { SaleSummary } from "@features/sales/types";
import { useIsMobile } from "@shared/hooks/useMediaQuery";

const SaleItemMobile = lazy(() =>
  import("@/features/sales/components/sales/SaleItemMobile").then((module) => ({
    default: module.SaleItemMobile,
  })),
);

type SalesListProps = {
  sales: SaleSummary[];
  onOpenDetail: (sale: SaleSummary) => void;
};

const HEADERS = ["N° venta", "Cliente", "Ítems", "Total"];
const DESKTOP_COLUMNS =
  "grid grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_0.5fr_0.8fr_0.1fr] items-center gap-x-4";

export const SalesList = ({ sales, onOpenDetail }: SalesListProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="grid gap-3">
        {sales.map((sale) => (
          <SaleItemMobile
            key={`sale-mobile-${sale.id}`}
            sale={sale}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>
    );
  }

  return (
    <section className="bg-background border-border rounded-lg border">
      <ul
        className={`border-border text-secondary-foreground ${DESKTOP_COLUMNS} border-b p-2 text-sm`}
      >
        {HEADERS.map((header) => (
          <li key={header}>{header}</li>
        ))}
      </ul>
      <ul className="[&>li]:not-first:border-border text-sm [&>li]:not-first:border-t">
        {sales.map((sale) => (
          <li
            key={`sale-${sale.id}`}
            onClick={() => onOpenDetail(sale)}
            title={`Ver detalle de la venta ${sale.id}`}
            className={`${DESKTOP_COLUMNS} hover:bg-background-soft cursor-pointer px-2 py-3 transition-colors`}
          >
            <p className="font-medium">#{sale.id}</p>
            <p>{sale.clientName ?? "Consumidor final"}</p>
            <p className="text-secondary-foreground tabular-nums">
              {sale.itemCount}
            </p>
            <p className="font-semibold tabular-nums">
              ${sale.total.toLocaleString("es-AR")}
            </p>
            <ChevronRight
              className="text-secondary-foreground size-4"
              strokeWidth={1.75}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
