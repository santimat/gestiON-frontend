import type { z } from "zod";

import { CategorySchema } from "@features/categories/schemas/CategorySchema";
import { CategoryFiltersSchema } from "@features/categories/schemas/CategoryFiltersSchema";
import { CategorySearchSchema } from "@features/categories/schemas/CategorySearchSchema";

export type CategoryRequest = z.infer<typeof CategorySchema>;

export type CategoryFilters = z.infer<typeof CategoryFiltersSchema>;

export type CategorySearchParams = z.infer<typeof CategorySearchSchema>;

export type Category = {
  id: number;
  name: string;
  description?: string;
  active: boolean;
  updatedAt: Date;
  productCount: number;
};
