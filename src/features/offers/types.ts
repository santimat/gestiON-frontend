import type { z } from "zod";

import type { DiscountType, PaymentMethod } from "@features/sales";
import { OfferSchema } from "@features/offers/schemas/OfferSchema";
import { OffersFilterSchema } from "@features/offers/schemas/OffersFilterSchema";

export type OfferRequest = z.infer<typeof OfferSchema>;
export type OffersFilter = z.infer<typeof OffersFilterSchema>;

export type OfferStatus = "ACTIVE" | "EXPIRED" | "SCHEDULED";

export type Offer = {
  id: number;
  discountType: DiscountType;
  value: number;
  startDate: string;
  endDate: string;
  status: OfferStatus;
  paymentMethods: PaymentMethod[];
};

export type OfferFormValues = {
  discountType: DiscountType;
  value: number | null;
  startDate: string;
  endDate: string;
  status: OfferStatus | null;
  paymentMethods: PaymentMethod[];
};
