import { ScrollText } from "lucide-react";

import { formatDate } from "@/shared/utils/dates";
import { formatCurrency } from "@/shared/utils/money";
import { PAYMENT_METHODS_LABELS, type Sale } from "@/features/sales";

type LastSalesListProps = {
  sales: Sale[];
};

export const LastSalesList = ({ sales }: LastSalesListProps) => {
  if (!sales.length)
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <ScrollText size={34} className="text-warning" />
        <p>No hay ventas registradas</p>
        <p className="text-secondary-foreground text-center text-sm">
          Registra alguna venta para ver el listado de ventas recientes.
        </p>
      </div>
    );

  return (
    <ul className="max-h-50 scrollbar-thin scrollbar-gutter-stable overflow-y-auto">
      {sales.map((sale: Sale) => {
        const date = new Date(sale.createdAt);
        const createdDate = formatDate(date);
        const createdHour = date.toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        const paymentMethod = PAYMENT_METHODS_LABELS[sale.paymentMethod];
        return (
          <li
            key={`${sale.clientName}-${sale.clientId}`}
            className="not-last:border-background-soft flex items-center justify-between gap-2 p-2 not-last:border-b"
          >
            <div>
              <p>#{sale.id}</p>
              <p className="text-secondary-foreground text-sm">
                <span>
                  {createdDate} - {createdHour}
                </span>
                ㆍ<span>{sale.itemCount} productos</span>ㆍ
                <span>{paymentMethod}</span>
              </p>
            </div>
            <p className="font-semibold">{formatCurrency(sale.total)}</p>
          </li>
        );
      })}
    </ul>
  );
};
