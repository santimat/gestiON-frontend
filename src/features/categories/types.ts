import type { z } from "zod";

import { CategorySchema } from "@features/categories/schemas/CategorySchema";

export type CategoryRequest = z.infer<typeof CategorySchema>;

export type Category = {
  id: number;
  name: string;
  description?: string;
  updatedAt: Date;
  productCount: number;
};
