import type { SaleDetail } from "@features/sales/types";
import { SaleDetailModalItem } from "@features/sales/components/sales/SaleDetailModalItem";

type SaleDetailModalListProps = {
  details: SaleDetail[];
};

export const SaleDetailModalList = ({ details }: SaleDetailModalListProps) => {
  const itemCount = details.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  return (
    <div className="border-background-soft bg-card overflow-hidden rounded-lg border text-sm">
      <p className="bg-background-soft p-3 text-xs font-semibold">
        Productos ({itemCount})
      </p>
      <ul className="[&>li]:not-last:border-border max-h-60 overflow-y-auto [&>li]:not-last:border-b">
        {details.map((product) => (
          <SaleDetailModalItem product={product} />
        ))}
      </ul>
    </div>
  );
};
