import type { z } from "zod";

import { CashierSchema } from "./schemas/CashierSchema";
import { CashierUpdateSchema } from "./schemas/CashierUpdateSchema";

export type CashierRequest = z.infer<typeof CashierSchema>;
export type CashierUpdate = z.infer<typeof CashierUpdateSchema>;
