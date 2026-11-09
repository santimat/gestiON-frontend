import { NumberFormatter } from "@mantine/core";

import type { ProductWithOffer } from "@features/products";
import { StatusBadge } from "@shared/components/StatusBadge";

type ProductSellCardProps = {
  product: ProductWithOffer;
  addToCart: (product: ProductWithOffer) => void;
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
      className="border-background-soft bg-surface hover:bg-background-soft flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left transition-colors hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
    >
      <div>
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-secondary-foreground truncate text-xs">
          {product.category.name} - {product.currentStock} u.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {isOutOfStock ? (
          <StatusBadge label="Sin stock" tone="destructive" size="xs" />
        ) : (
          isLowStock && (
            <StatusBadge label="Bajo stock" tone="warning" size="xs" />
          )
        )}
        <NumberFormatter
          prefix="$"
          value={product.discountedPrice}
          thousandSeparator
          className="text-sm font-semibold tabular-nums"
        />
        {product.offerDiscountType && (
          <span className="text-secondary-foreground text-xs line-through">
            ${product.salePrice}
          </span>
        )}
      </div>
    </button>
  );
};
