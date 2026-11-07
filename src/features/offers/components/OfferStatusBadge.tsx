import { StatusBadge } from "@shared/components/StatusBadge";
import type { OfferStatus } from "@features/offers/types";
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
  status: OfferStatus;
};

export const OfferStatusBadge = ({ status }: OfferStatusBadgeProps) => (
  <StatusBadge
    label={OFFER_STATUS_LABELS[status]}
    tone={STATUS_TONES[status]}
  />
);