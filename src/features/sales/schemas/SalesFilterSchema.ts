import z from "zod";

import { FiltersBaseSchema } from "@shared/schemas/FiltersBaseSchema";

export const SalesFilterSchema = z.object({
  searchText: z.string().trim().optional(),
  status: z.enum(["PAYED", "PENDING"]).optional(),
  paymentMethod: z
    .enum(["CASH", "CARD", "TRANSFER", "CREDIT_ACCOUNT"])
    .optional(),
  ...FiltersBaseSchema.shape,
});
