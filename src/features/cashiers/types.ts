import type { z } from "zod";

import { CashierSchema } from "@features/cashiers/schemas/CashierSchema";
import { CashierUpdateSchema } from "@features/cashiers/schemas/CashierUpdateSchema";
import { CashierFiltersSchema } from "@features/cashiers/schemas/CashierFiltersSchema";

export type CashierRequest = z.infer<typeof CashierSchema>;
export type CashierUpdate = z.infer<typeof CashierUpdateSchema>;
export type CashierFilters = z.infer<typeof CashierFiltersSchema>;
