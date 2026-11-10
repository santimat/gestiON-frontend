import type z from "zod";

import type {
  DashboardTopProductsFiltersSchema,
  DashboardStatsByPeriodFiltersSchema,
} from "@features/dashboard/schemas";

export type PeriodProductCount = {
  period: string;
  quantity: number;
};

export type DashboardByPeriodStats = {
  salesCount: number;
  averageSaleValue: number;
  productsSoldByPeriod: PeriodProductCount[];
  profit: number;
};

export type DashboardStatsByPeriodFilters = z.infer<
  typeof DashboardStatsByPeriodFiltersSchema
>;

export type PeriodGranularity = "DAY" | "WEEK" | "MONTH";

export type TopProductSoldResponse = {
  productId: number;
  productName: string;
  quantity: number;
};

export type DashboardTopProductsFilters = z.infer<
  typeof DashboardTopProductsFiltersSchema
>;
