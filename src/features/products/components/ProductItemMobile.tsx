import { PackageIcon, PencilIcon } from "lucide-react";
import { NumberFormatter, Switch } from "@mantine/core";

import type { Product } from "@features/products/types";
import { StatusBadge } from "@shared/components/StatusBadge";
import { useToggleActive } from "@shared/hooks/useToggleActive";
import { useProductItem } from "@features/products/hooks/useProduct";
import { ProductItemActions } from "@shared/components/ProductItemActions";

type ProductItemMobileProps = {
  product: Product;
};

export const ProductItemMobile = ({ product }: ProductItemMobileProps) => {
  const { toggleActive, openEdit } = useProductItem();
  const { isToggling, handleToggle } = useToggleActive(
    "Estado del producto actualizado con éxito",
  );

  const isLowStock = product.currentStock <= product.minStock;

  return (
    <div className="border-background-soft bg-card shadow-card rounded-xl border p-4">
      <div className="flex items-start gap-3">
        <div className="bg-primary/40 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
          <PackageIcon size={16} strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{product.name}</p>
          <p className="text-secondary-foreground truncate text-xs">
            {product.category.name} · {product.currentStock} u.
          </p>
        </div>
        <NumberFormatter
          prefix="$"
          value={product.salePrice}
          thousandSeparator
          className="shrink-0 text-sm font-semibold tabular-nums"
        />
      </div>
      <div className="border-background-soft mt-3 flex items-center justify-between border-t pt-3">
        {isLowStock ? (
          <StatusBadge label="stock bajo" tone="warning" size="xs" />
        ) : (
          <p className="text-secondary-foreground text-xs">
            Stock mínimo: {product.minStock}
          </p>
        )}
        <div className="flex items-center gap-3">
          <ProductItemActions
            actionsIcons={[{ Icon: PencilIcon, label: "Editar producto" }]}
            onEdit={() => openEdit(product)}
          />
          <Switch
            aria-label="Cambiar estado del producto"
            title="Cambiar estado del producto"
            color="green"
            checked={product.active}
            disabled={isToggling}
            onChange={() => handleToggle(() => toggleActive(product.id))}
          />
        </div>
      </div>
    </div>
  );
};
