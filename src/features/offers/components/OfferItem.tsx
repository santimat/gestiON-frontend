import { Pencil } from "lucide-react";

import type { Offer } from "@features/offers/types";
import { useOffer } from "@features/offers/hooks/useOffer";
import { formatOfferValue } from "@features/offers/utils/offerUtils";
import { OfferStatusBadge } from "@features/offers/components/OfferStatusBadge";
import { OfferActiveRangeDate } from "@features/offers/components/OfferActiveRangeDate";

type OfferItemProps = {
  offer: Offer;
  columns: string;
};

export const OfferItem = ({ offer, columns }: OfferItemProps) => {
  const { openEdit } = useOffer();

  return (
    <li className={`p-2 ${columns} hover:bg-background-soft transition-colors`}>
      <div>
        <p className="font-semibold tabular-nums">{formatOfferValue(offer)}</p>
      </div>
      <p className="text-secondary-foreground truncate">
        {/* SE APLICA A: */}
        {/* TODO */}
        {JSON.stringify(offer.paymentMethods)}
      </p>
      <OfferActiveRangeDate offer={offer} />
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
