import { ChevronRight } from "lucide-react";

import type { SaleSummary } from "@features/sales/types";
import { PAYMENT_METHODS } from "@features/sales/dictionary";
import { useSaleDetails } from "@features/sales/hooks/useSaleDetails";
import { StatusBadge } from "@features/sales/components/sales/StatusBadge";

type SaleItemProps = {
  sale: SaleSummary;
  desktopColumns?: string;
};

export const SaleItem = ({ sale, desktopColumns }: SaleItemProps) => {
  const { getSaleWithDetails } = useSaleDetails();

  const date = new Date(sale.createdAt);
  const createdDate = date.toLocaleDateString();
  const createdHour = `${date.getHours()}:${date.getMinutes()}`;
  const paymentMethod = PAYMENT_METHODS[sale.paymentMethod];

  const handleClick = async () => {
    await getSaleWithDetails(sale.id);
  };
  return (
    <li
      key={`sale-${sale.id}`}
      title={`Ver detalle de la venta ${sale.id}`}
      onClick={handleClick}
      className={`${desktopColumns} hover:bg-background-soft cursor-pointer px-2 py-3 transition-colors`}
    >
      <p className="font-medium">#{sale.id}</p>
      <p>{createdDate}</p>
      <p>{createdHour}</p>
      <p className="truncate">{sale.clientName}</p>
      <p className="text-secondary-foreground">{sale.itemCount}</p>
      <p>{paymentMethod}</p>
      <StatusBadge status={sale.status} />
      <p className="font-semibold">${sale.total.toLocaleString("es-AR")}</p>
      <ChevronRight size={20} className="text-secondary-foreground" />
    </li>
  );
};
