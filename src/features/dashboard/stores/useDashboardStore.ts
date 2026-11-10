import { create } from "zustand";

import type { AppError } from "@shared/types";
import type {
  DashboardStatsByPeriodFilters,
  DashboardByPeriodStats,
  DashboardTopProductsFilters,
  TopProductSoldResponse,
} from "@features/dashboard/types";

import type { UseDashboardStore } from "@features/dashboard/stores/types";
import { dashboardService } from "@features/dashboard/services/dashboardService";

const EMPTY_STATS: DashboardByPeriodStats | null = null;
const EMPTY_PRODUCTS: TopProductSoldResponse[] = [];

export const useDashboardStore = create<UseDashboardStore>((set) => ({
  dashboardByPeriodStats: EMPTY_STATS,
  isLoading: false,
  error: null,
  topProductsSold: EMPTY_PRODUCTS,
  topProductsError: null,
  topProductsAreLoading: false,
  getSalesStatsByPeriod: async (filters: DashboardStatsByPeriodFilters) => {
    set({ isLoading: true, error: null });
    try {
      const data = await dashboardService.getSalesStatsByPeriod(filters);
      set({
        dashboardByPeriodStats: data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const appError = error as AppError;
      set({ isLoading: false, error: appError.message });
      throw error;
    }
  },

  getTopProductsSold: async (filters?: DashboardTopProductsFilters) => {
    set({ topProductsAreLoading: true });
    try {
      const data = await dashboardService.getTopProductsSold(filters);
      set({
        topProductsSold: data,
        error: null,
      });
    } catch (error) {
      const appError = error as AppError;
      set({ error: appError?.message });
    } finally {
      set({ topProductsAreLoading: false });
    }
  },

  clearError: () => set({ error: null }),
  reset: () =>
    set({
      dashboardByPeriodStats: null,
      isLoading: false,
      error: null,
    }),
}));
