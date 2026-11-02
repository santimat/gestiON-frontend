import { lazy } from "react";

import { useIsMobile } from "@shared/hooks/useMediaQuery";
import type { SaleSummary } from "@features/sales/types";
import { PAYMENT_METHODS } from "@features/sales/dictionary";
import { StatusBadge } from "@features/sales/components/sales/StatusBadge";
import { ChevronRight } from "lucide-react";

const SaleItemMobile = lazy(() =>
  import("@/features/sales/components/sales/SaleItemMobile").then((module) => ({
    default: module.SaleItemMobile,
  })),
);

type SalesListProps = {
  sales: SaleSummary[];
  onOpenDetail: (sale: SaleSummary) => void;
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
        {sales.map((sale) => {
          const date = new Date(sale.createdAt);
          const createdDate = date.toLocaleDateString();
          const createdHour = `${date.getHours()}:${date.getMinutes()}`;
          const paymentMethod = PAYMENT_METHODS[sale.paymentMethod];
          return (
            <li
              key={`sale-${sale.id}`}
              onClick={() => onOpenDetail(sale)}
              title={`Ver detalle de la venta ${sale.id}`}
              className={`${DESKTOP_COLUMNS} hover:bg-background-soft cursor-pointer px-2 py-3 transition-colors`}
            >
              <p className="font-medium">#{sale.id}</p>
              <p>{createdDate}</p>
              <p>{createdHour}</p>
              <p className="truncate">{sale.clientName}</p>
              <p className="text-secondary-foreground">{sale.itemCount}</p>
              <p>{paymentMethod}</p>
              <StatusBadge status={sale.status} />
              <p className="font-semibold">
                ${sale.total.toLocaleString("es-AR")}
              </p>
              <ChevronRight size={20} className="text-secondary-foreground" />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
