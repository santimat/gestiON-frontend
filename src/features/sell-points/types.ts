import type { z } from "zod";

import { SellPointRequestSchema } from "@features/sell-points/schemas/SellPointSchema";
import { SellPointFiltersSchema } from "@features/sell-points/schemas/SellPointFiltersSchema";

export type SellPoint = {
  id: number;
  name: string;
  commerceId: number;
  active: boolean;
  cashierIds?: number[];
  updatedAt: Date;
};

export type SellPointRequest = z.infer<typeof SellPointRequestSchema>;

export type SellPointFilters = z.infer<typeof SellPointFiltersSchema>;
