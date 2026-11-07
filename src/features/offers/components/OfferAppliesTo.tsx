import type { PaymentMethod } from "@/features/sales";
import { PAYMENT_METHODS } from "@/features/sales";
type OfferAppliesToProps = {
  paymentMethods: PaymentMethod[];
};

export const OfferAppliesTo = ({ paymentMethods }: OfferAppliesToProps) => {
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
              {PAYMENT_METHODS[method]}
            </span>
          );
        })}
      </div>
    );
  }

  //TODO: falta la logica para mostrar los productos a los que pertenece esta oferta
  return <p className="truncate">Todavía falta conectar los productos</p>;
};
