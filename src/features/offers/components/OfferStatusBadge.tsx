import { StatusBadge } from "@shared/components/StatusBadge";
import type { Offer, OfferStatus } from "@features/offers/types";
import type { StatusTone } from "@shared/components/StatusBadge";

const OFFER_STATUS_LABELS: Record<OfferStatus, string> = {
  ACTIVE: "Vigente",
  SCHEDULED: "Programada",
  EXPIRED: "Vencida",
};

const STATUS_TONES: Record<OfferStatus, StatusTone> = {
  ACTIVE: "success",
  SCHEDULED: "warning",
  EXPIRED: "destructive",
};

type OfferStatusBadgeProps = {
  offer: Offer;
};

export const OfferStatusBadge = ({ offer }: OfferStatusBadgeProps) => (
  <StatusBadge
    label={OFFER_STATUS_LABELS[offer.status]}
    tone={STATUS_TONES[offer.status]}
  />
);
