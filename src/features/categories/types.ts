import type { z } from "zod";

import { CategorySchema } from "@features/categories/schemas/CategorySchema";
import { CategoryFiltersSchema } from "@features/categories/schemas/CategoryFiltersSchema";

export type CategoryRequest = z.infer<typeof CategorySchema>;

export type CategoryFilters = z.infer<typeof CategoryFiltersSchema>;

export type Category = {
  id: number;
  name: string;
  description?: string;
  updatedAt: Date;
  productCount: number;
};
