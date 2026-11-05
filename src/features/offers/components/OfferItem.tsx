import { Pencil } from "lucide-react";

import type { Offer } from "@features/offers/types";
import { useOffer } from "@features/offers/hooks/useOffer";
import { OfferStatusBadge } from "@features/offers/components/OfferStatusBadge";

type OfferItemProps = {
  offer: Offer;
  columns: string;
};

export const OfferItem = ({ offer, columns }: OfferItemProps) => {
  const { openEdit } = useOffer();

  return (
    <li className={`p-2 ${columns} hover:bg-background-soft transition-colors`}>
      <div>
        <p className="font-medium tabular-nums">{"10%"}</p>
        <p className="text-secondary-foreground text-xs">
          {offer.discountType === "PERCENTAGE" ? "Porcentaje" : "Monto fijo"}
        </p>
      </div>
      <p className="text-secondary-foreground truncate">
        {/*{formatOfferTargets(offer)}*/}
      </p>
      <p className="text-secondary-foreground tabular-nums">
        {/*{formatOfferPeriod(offer)}*/}
      </p>
      <OfferStatusBadge offer={offer} />
      <div className="justify-center">
        <button
          aria-label={`Editar oferta ${""}`}
          title="Editar"
          onClick={() => openEdit(offer)}
          className="hover:bg-background-soft rounded-md p-2 transition-transform hover:scale-110 hover:cursor-pointer active:scale-95"
        >
          <Pencil pointerEvents="none" size={20} />
        </button>
      </div>
    </li>
  );
};
