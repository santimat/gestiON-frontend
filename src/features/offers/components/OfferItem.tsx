import { Pencil } from "lucide-react";

import type { Offer } from "@features/offers/types";
import { useOffer } from "@features/offers/hooks/useOffer";
import { formatOfferValue } from "@features/offers/utils/offerUtils";
import { OfferStatusBadge } from "@features/offers/components/OfferStatusBadge";
import { OfferActiveRangeDate } from "@features/offers/components/OfferActiveRangeDate";
import { OfferAppliesTo } from "./OfferAppliesTo";

type OfferItemProps = {
  offer: Offer;
  columns: string;
};

export const OfferItem = ({ offer, columns }: OfferItemProps) => {
  const { openEdit } = useOffer();

  return (
    <li className={`p-2 ${columns} `}>
      <p className="pl-2 font-semibold tabular-nums">
        {formatOfferValue(offer)}
      </p>
      <OfferAppliesTo paymentMethods={offer.paymentMethods} />
      <OfferActiveRangeDate
        startDate={offer.startDate}
        endDate={offer.endDate}
      />
      <OfferStatusBadge status={offer.status} />
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
