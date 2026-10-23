import { NumberFormatter, Switch } from "@mantine/core";
import { PackageIcon, PencilIcon } from "lucide-react";
import { toast } from "sonner";

import type { AppError, Product } from "@/types";
import { useProduct } from "@/hooks/useProduct";

type ProductItemMobileProps = {
  product: Product;
};

export const ProductItemMobile = ({ product }: ProductItemMobileProps) => {
  const { isPendingToggleActive, toggleActive, openEdit } = useProduct();

  const handleOnChangeSwitch = async () => {
    try {
      await toggleActive(product.id);
      toast.success("Estado del producto actualizado con éxito");
    } catch (error) {
      const appError = error as AppError;
      toast.error(appError?.message ?? "No se pudo cambiar el estado.");
    }
  };

  const isLowStock = product.currentStock <= product.minStock;

  return (
    <div className="border-border bg-card shadow-card rounded-xl border p-4">
      <div className="flex items-start gap-3">
        <div className="bg-primary/40 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
          <PackageIcon size={16} strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">{product.name}</p>
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
          <span className="bg-warning/40 text-warning rounded-full px-2 py-0.5 text-xs font-medium">
            stock bajo
          </span>
        ) : (
          <p className="text-secondary-foreground text-xs">
            Stock mínimo: {product.minStock}
          </p>
        )}
        <div className="flex items-center gap-3">
          <button
            aria-label="Editar producto"
            title="Editar producto"
            onClick={() => openEdit(product)}
            className="text-secondary-foreground hover:bg-background-soft hover:text-foreground cursor-pointer rounded-md p-1.5 transition-colors"
          >
            <PencilIcon pointerEvents="none" size={18} />
          </button>
          <Switch
            aria-label="Cambiar estado del producto"
            title="Cambiar estado del producto"
            color="green"
            checked={product.active}
            disabled={isPendingToggleActive}
            onChange={handleOnChangeSwitch}
          />
        </div>
      </div>
    </div>
  );
};
