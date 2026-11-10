import { useShallow } from "zustand/shallow";

import { useDashboardStore } from "@features/dashboard/stores/useDashboardStore";

export const useDashboard = () => {
  const {
    dashboardByPeriodStats,
    isLoading,
    error,
    getSalesStatsByPeriod,
    clearError,
    reset,
    topProductsError,
    topProductsAreLoading,
    topProductsSold,
    getTopProductsSold,
  } = useDashboardStore(
    useShallow((s) => ({
      dashboardByPeriodStats: s.dashboardByPeriodStats,
      isLoading: s.isLoading,
      error: s.error,
      getTopProductsSold: s.getTopProductsSold,
      topProductsSold: s.topProductsSold,
      topProductsAreLoading: s.topProductsAreLoading,
      topProductsError: s.topProductsError,
      getSalesStatsByPeriod: s.getSalesStatsByPeriod,
      clearError: s.clearError,
      reset: s.reset,
    })),
  );

  return {
    dashboardByPeriodStats,
    isLoading,
    error,
    getSalesStatsByPeriod,
    clearError,
    reset,
    topProductsError,
    topProductsAreLoading,
    topProductsSold,
    getTopProductsSold,
  };
};
