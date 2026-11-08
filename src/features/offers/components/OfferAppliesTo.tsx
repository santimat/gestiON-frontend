import type { PaymentMethod } from "@/features/sales";
import { PAYMENT_METHODS_LABELS } from "@features/sales";

type OfferAppliesToProps = {
  paymentMethods: PaymentMethod[];
  productIds?: number[];
};

export const OfferAppliesTo = ({
  paymentMethods,
  productIds,
}: OfferAppliesToProps) => {
  if (paymentMethods.length) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {paymentMethods.map((method, idx) => {
          const key = `${method}-${idx}`;
          return (
            <span
              key={key}
              className="bg-primary/40 text-primary rounded-full px-2"
            >
              {PAYMENT_METHODS_LABELS[method]}
            </span>
          );
        })}
      </div>
    );
  }

  if (productIds && productIds.length > 0) {
    return (
      <p className="truncate">
        {productIds.length} producto{productIds.length === 1 ? "" : "s"}{" "}
        asignado
        {productIds.length === 1 ? "" : "s"}
      </p>
    );
  }

  //TODO: falta la logica para mostrar los productos a los que pertenece esta oferta
  return <p className="truncate">Todavía falta conectar los productos</p>;
};
