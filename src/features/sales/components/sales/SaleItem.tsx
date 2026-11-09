import { ChevronRight } from "lucide-react";

import { formatDate } from "@shared/utils/dates";
import { formatCurrency } from "@shared/utils/money";
import type { SaleSummary } from "@features/sales/types";
import { PAYMENT_METHODS_LABELS } from "@features/sales/dictionary";
import { useSaleDetails } from "@features/sales/hooks/useSaleDetails";
import { SaleStatusBadge } from "@features/sales/components/sales/SaleStatusBadge";

type SaleItemProps = {
  sale: SaleSummary;
  desktopColumns?: string;
};

export const SaleItem = ({ sale, desktopColumns }: SaleItemProps) => {
  const { getSaleWithDetails } = useSaleDetails();

  const date = new Date(sale.createdAt);
  const createdDate = formatDate(date);
  const createdHour = date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const paymentMethod = PAYMENT_METHODS_LABELS[sale.paymentMethod];

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
      <SaleStatusBadge status={sale.status} />
      <p className="font-semibold">{formatCurrency(sale.total)}</p>
      <ChevronRight size={20} className="text-secondary-foreground" />
    </li>
  );
};
