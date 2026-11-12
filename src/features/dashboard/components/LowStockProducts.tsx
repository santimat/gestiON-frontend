import { PackageCheck } from "lucide-react";

import type { LowStockProduct } from "@/features/products";
import { StatusBadge } from "@/shared/components/StatusBadge";
type LowStockProductProps = {
  lowStockProducts: LowStockProduct[];
};

export const LowStockProducts = ({
  lowStockProducts,
}: LowStockProductProps) => {
  const lowStockProductsCount = lowStockProducts?.length ?? 0;

  return (
    <div className="border-background-soft scrollbar-thumb-background-soft w-full scrollbar-thin overflow-y-auto rounded-xl border">
      <div className="bg-background sticky top-0 z-10 mb-4 px-4 py-2">
        <p className="font-semibold">Productos con bajo stock</p>
        <p className="text-secondary-foreground text-sm">
          Qué productos hay que reponer
        </p>
      </div>
      {lowStockProductsCount > 0 ? (
        <ul className={`flex flex-col gap-2 p-4`}>
          {lowStockProducts.map((product: LowStockProduct) => (
            <li
              key={`${product.productName}-${product.productId}`}
              className="not-last-of-type:border-background-soft flex items-center justify-between gap-2 pb-2 not-last-of-type:border-b"
            >
              <div>
                <p className="font-semibold">{product.productName}</p>
                <p className="text-secondary-foreground text-sm">
                  {product.currentStock} en stock ㆍ {product.minStock} mínimo
                </p>
              </div>
              <StatusBadge label="● Reponer" tone="warning" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex h-full flex-col items-center">
          <PackageCheck size={32} className="text-success" />
          <p>No hay productos con bajo stock</p>
          <p className="text-secondary-foreground text-sm">
            Ningun producto se encuentra por debajo del nivel minimo
          </p>
        </div>
      )}
    </div>
  );
};
