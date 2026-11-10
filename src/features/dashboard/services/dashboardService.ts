import { backendAPI } from "@shared/services/axiosConfig";
import { executeApiCall } from "@shared/utils/apiClient";
import type {
  DashboardStatsByPeriodFilters,
  DashboardByPeriodStats,
  DashboardTopProductsFilters,
  TopProductSoldResponse,
} from "@features/dashboard/types";

export const dashboardService = {
  getSalesStatsByPeriod: async (
    filters: DashboardStatsByPeriodFilters,
  ): Promise<DashboardByPeriodStats> =>
    executeApiCall<DashboardByPeriodStats>(() =>
      backendAPI.get("/sales/stats", {
        params: filters,
      }),
    ),

  getTopProductsSold: async (
    filters?: DashboardTopProductsFilters,
  ): Promise<TopProductSoldResponse[]> =>
    executeApiCall<TopProductSoldResponse[]>(() =>
      backendAPI.get("/sales/top-products", { params: filters }),
    ),
};
