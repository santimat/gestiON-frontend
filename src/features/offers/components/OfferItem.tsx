import { Pencil, Tags } from "lucide-react";

import {
  canAssignProducts,
  formatOfferValue,
} from "@features/offers/utils/offerUtils";
import type { Offer } from "@features/offers/types";
import { useOffer } from "@features/offers/hooks/useOffer";
import { OfferAppliesTo } from "@features/offers/components/OfferAppliesTo";
import { useOfferAssigment } from "@features/offers/hooks/useOfferAssigment";
import { OfferStatusBadge } from "@features/offers/components/OfferStatusBadge";
import { OfferActiveRangeDate } from "@features/offers/components/OfferActiveRangeDate";

type OfferItemProps = {
  offer: Offer;
  columns: string;
};

export const OfferItem = ({ offer, columns }: OfferItemProps) => {
  const { openEdit } = useOffer();
  const { openAssign } = useOfferAssigment();

  const hasAssignment = canAssignProducts(offer);

  return (
    <li className={`p-2 ${columns} `}>
      <p className="pl-2 font-semibold tabular-nums">
        {formatOfferValue(offer)}
      </p>
      <OfferAppliesTo
        paymentMethods={offer.paymentMethods}
        productIds={offer.productIds}
      />
      <OfferActiveRangeDate
        startDate={offer.startDate}
        endDate={offer.endDate}
      />
      <OfferStatusBadge status={offer.status} />
      <div className="grid grid-cols-2 place-items-center">
        {hasAssignment && (
          <button
            aria-label={`Asignar productos a oferta ${offer.id}`}
            title="Asignar productos"
            onClick={() => openAssign(offer)}
            className="hover:bg-background-soft rounded-md p-2 transition-transform hover:scale-110 hover:cursor-pointer active:scale-95"
          >
            <Tags pointerEvents="none" size={20} />
          </button>
        )}
        <button
          aria-label={`Editar oferta ${""}`}
          title="Editar"
          onClick={() => openEdit(offer)}
          className={`hover:bg-background-soft rounded-md p-2 transition-transform hover:scale-110 hover:cursor-pointer active:scale-95 ${hasAssignment ? "" : "col-start-2"}`}
        >
          <Pencil pointerEvents="none" size={20} />
        </button>
      </div>
    </li>
  );
};
