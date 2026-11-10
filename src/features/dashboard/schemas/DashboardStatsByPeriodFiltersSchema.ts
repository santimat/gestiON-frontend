import z from "zod";
import { PERIODS } from "@features/dashboard/constants";

export const DashboardStatsByPeriodFiltersSchema = z.object({
  granularity: z.enum(PERIODS),
});
