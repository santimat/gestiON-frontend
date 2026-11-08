import z from "zod";

import { PAYMENT_METHODS, SALE_STATUS } from "@features/sales/constants";
import { FiltersBaseSchema } from "@shared/schemas/FiltersBaseSchema";

export const SalesFilterSchema = z.object({
  searchText: z.string().trim().optional(),
  status: z.enum(SALE_STATUS).optional(),
  paymentMethod: z.enum(PAYMENT_METHODS).optional(),
  ...FiltersBaseSchema.shape,
});
