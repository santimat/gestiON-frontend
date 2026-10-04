import type { Product } from "@/types";
import { Avatar, NumberFormatter, Switch } from "@mantine/core";
import type { LucideIcon } from "lucide-react";

type ProductItemsProps = {
  product: Product;
  actionsIcons: {
    Icon: LucideIcon;
    label: string;
  }[];
  columns: string;
};

export const ProductItem = ({
  product,
  actionsIcons,
  columns,
}: ProductItemsProps) => {
  return (
    <li className={`p-2 ${columns}`}>
      <Avatar src={product.imageUrl} />
      <p>{product.name}</p>
      <p>{product.category}</p>
      <NumberFormatter prefix="$" value={product.salePrice} thousandSeparator />
      <p>{product.currentStock}</p>
      <Switch
        aria-label="Cambiar estado del producto"
        title="Cambiar estado del producto"
        color="green"
        checked={product.active}
      />
      <ul className="flex gap-1">
        {actionsIcons.map(({ Icon, label }) => {
          return (
            <li key={label}>
              <button
                aria-label={label}
                title={label}
                className="rounded-md p-2 transition-transform hover:scale-110 hover:cursor-pointer active:scale-95"
              >
                <Icon pointerEvents="none" size={20} />
              </button>
            </li>
          );
        })}
      </ul>
    </li>
  );
};
