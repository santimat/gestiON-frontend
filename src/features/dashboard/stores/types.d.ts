import type {
  DashboardByPeriodStats,
  DashboardStatsByPeriodFilters,
  TopProductSoldResponse,
} from "@features/dashboard/types";

export type UseDashboardStore = {
  dashboardByPeriodStats: DashboardByPeriodStats | null;
  topProductsSold: TopProductSoldResponse[];
  topProductsError: string | null;
  topProductsAreLoading: boolean;
  isLoading: boolean;
  error: string | null;

  getSalesStatsByPeriod: (
    filter: DashboardStatsByPeriodFilters,
  ) => Promise<void>;
  getTopProductsSold: (filters?: DashboardTopProductsFilters) => Promise<void>;
  clearError: () => void;
  reset: () => void;
};
