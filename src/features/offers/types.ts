import z from "zod";

import type { DiscountType, PaymentMethod } from "@features/sales";
import { OfferSchema } from "@features/offers/schemas/OfferSchema";
import { OffersFilterSchema } from "@features/offers/schemas/OffersFilterSchema";
import { OFFER_STATUS } from "@features/offers/constants";

export const OfferStatusSchema = z.enum(OFFER_STATUS);

export type OfferRequest = z.infer<typeof OfferSchema>;
export type OffersFilter = z.infer<typeof OffersFilterSchema>;

export type OfferStatus = z.infer<typeof OfferStatusSchema>;

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

export type OfferPaymentMethod = {
  paymentMethod: PaymentMethod;
  value: number;
  discountType: DiscountType;
};