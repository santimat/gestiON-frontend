import type { SaleDetail } from "@/features/sales/types";

type SaleDetailModalItemProps = {
  product: SaleDetail;
};
export const SaleDetailModalItem = ({ product }: SaleDetailModalItemProps) => {
  const totalPerProduct = (product.quantity * product.price).toLocaleString(
    "es-AR",
  );
  return (
    <li className="flex items-center justify-between gap-3 p-2">
      <div>
        <p className="font-semibold">{product.productName}</p>
        <p className="text-secondary-foreground text-sm">
          {product.quantity} x ${product.price}
        </p>
      </div>
      <p className="text-[17px] font-semibold">${totalPerProduct}</p>
    </li>
  );
};
