import type { SaleSummary } from "@features/sales/types";
import { useSaleDetails } from "@features/sales/hooks/useSaleDetails";

type SaleItemMobileProps = {
  sale: SaleSummary;
};

export const SaleItemMobile = ({ sale }: SaleItemMobileProps) => {
  const { getSaleWithDetails } = useSaleDetails();
  const handleClick = async () => {
    await getSaleWithDetails(sale.id);
  };

  return (
    <li
      onClick={handleClick}
      className="bg-card border-background-soft hover:bg-background-soft flex w-full items-center justify-between gap-3 rounded-xl border p-4 text-left transition-colors"
    >
      <div className="min-w-0">
        <p className="font-medium">#{sale.id}</p>
        <p className="text-secondary-foreground truncate text-xs">
          {sale.clientName ?? "Consumidor final"}
        </p>
        <p className="text-secondary-foreground text-xs">
          {sale.itemCount} ítems
        </p>
      </div>
      <span className="shrink-0 font-semibold tabular-nums">
        ${sale.total.toLocaleString("es-AR")}
      </span>
    </li>
  );
};
