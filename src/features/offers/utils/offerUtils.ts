import type { OfferStatus } from "@features/offers/types";

export const OFFER_STATUS_LABELS: Record<OfferStatus, string> = {
  ACTIVE: "Vigente",
  SCHEDULED: "Programada",
  EXPIRED: "Vencida",
};

export const getToday = () => new Date().toISOString();
