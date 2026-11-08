import type { Product } from "@/features/products";
import { formatCurrency } from "@/shared/utils/money";
import { Checkbox } from "@mantine/core";
import type { ChangeEvent } from "react";

type OfferAssignmentProductItem = {
  product: Product;
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
};

export const OfferAssignmentProductItem = ({
  product,
  selected,
  setSelected,
}: OfferAssignmentProductItem) => {
  const isSelected = selected.includes(product.id);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    setSelected((ids) =>
      checked
        ? [...new Set([...ids, product.id])]
        : ids.filter((id) => id !== product.id),
    );
  };

  return (
    <label
      key={product.id}
      className="hover:bg-background-soft flex cursor-pointer items-center gap-3 px-3 py-3"
    >
      <Checkbox
        aria-label={product.name}
        checked={isSelected}
        onChange={handleChange}
      />
      <div className="flex-1">
        <p className="text-sm font-semibold wrap-break-word">{product.name}</p>
        <p className="text-secondary-foreground text-xs wrap-break-word">
          {product.category.name}
        </p>
      </div>
      <p className="text-sm font-semibold tabular-nums">
        {formatCurrency(product.salePrice)}
      </p>
    </label>
  );
};
