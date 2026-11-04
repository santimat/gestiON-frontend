import type { Offer } from "@features/offers/types";
import {
  OFFER_STATUS_LABELS,
  offerStatus,
} from "@features/offers/utils/offerUtils";

const STATUS_STYLES = {
  VIGENTE: "bg-success/30 text-success",
  PROGRAMADA: "bg-warning/30 text-warning",
  VENCIDA: "bg-destructive/30 text-destructive",
} as const;

type OfferStatusBadgeProps = {
  offer: Offer;
};

export const OfferStatusBadge = ({ offer }: OfferStatusBadgeProps) => {
  const status = offerStatus(offer);

  return (
    <span
      className={`${STATUS_STYLES[status]} w-fit rounded-full px-2 text-sm`}
    >
      {OFFER_STATUS_LABELS[status]}
    </span>
  );
};
