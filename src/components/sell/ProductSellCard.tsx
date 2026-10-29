import type { Product } from "@/types";
import { NumberFormatter } from "@mantine/core";

type ProductSellCardProps = {
  product: Product;
  addToCart: (product: Product) => void;
};

export const ProductSellCard = ({
  product,
  addToCart,
}: ProductSellCardProps) => {
  const isLowStock = product.currentStock <= product.minStock;
  const isOutOfStock = product.currentStock === 0;
  return (
    <button
      key={`product-${product.id}`}
      onClick={() => addToCart(product)}
      disabled={isOutOfStock}
      className="border-border bg-surface hover:bg-background-soft flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left transition-colors hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
    >
      <div>
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-secondary-foreground truncate text-xs">
          {product.category.name} - {product.currentStock} u.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {isOutOfStock ? (
          <span className="bg-destructive/40 text-destructive rounded-full px-2 py-0.5 text-xs font-medium">
            Sin stock
          </span>
        ) : (
          isLowStock && (
            <span className="bg-warning/40 text-warning rounded-full px-2 py-0.5 text-xs font-medium">
              Bajo stock
            </span>
          )
        )}
        <NumberFormatter
          prefix="$"
          value={product.salePrice}
          thousandSeparator
          className="text-sm font-semibold tabular-nums"
        />
      </div>
    </button>
  );
};
