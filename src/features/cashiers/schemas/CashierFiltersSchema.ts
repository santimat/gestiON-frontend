import { z } from "zod";

import { FiltersBaseSchema } from "@shared/schemas/FiltersBaseSchema";

export const CashierFiltersSchema = z.object({
  searchText: z.string().trim().optional(),
  ...FiltersBaseSchema.shape,
});
