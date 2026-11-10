import z from "zod";

export const DashboardTopProductsFiltersSchema = z.object({
  limit: z.number().optional(),
});
