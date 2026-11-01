import type { z } from "zod";

import { SellPointRequestSchema } from "./schemas/SellPointSchema";

export type SellPoint = {
  id: number;
  name: string;
  commerceId: number;
  active: boolean;
  cashierIds?: number[];
  updatedAt: Date;
};

export type SellPointRequest = z.infer<typeof SellPointRequestSchema>;
