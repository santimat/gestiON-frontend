import z from "zod";

import { PAYMENT_METHODS } from "@features/sales";
import { OFFER_STATUS } from "@features/offers/constants";

export const OffersFilterSchema = z.object({
  paymentMethod: z.enum(PAYMENT_METHODS).optional(),
  status: z.enum(OFFER_STATUS).optional(),
});
