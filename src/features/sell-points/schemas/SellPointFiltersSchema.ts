import { z } from "zod";

import { FiltersBaseSchema } from "@shared/schemas/FiltersBaseSchema";

export const SellPointFiltersSchema = z.object({
  ...FiltersBaseSchema.shape,
});
