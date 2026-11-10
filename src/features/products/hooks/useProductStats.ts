import { useShallow } from "zustand/shallow";

import { useProductStatsStore } from "@features/products/stores/useProductStatsStore";

export const useProductStats = () => {
  const { lowStockProducts, isLoading, error, getLowStockProducts } =
    useProductStatsStore(
      useShallow((s) => ({
        lowStockProducts: s.lowStockProducts,
        isLoading: s.isLoading,
        error: s.error,
        getLowStockProducts: s.getLowStockProducts,
      })),
    );

  return {
    lowStockProducts,
    isLoading,
    error,
    getLowStockProducts,
  };
};
