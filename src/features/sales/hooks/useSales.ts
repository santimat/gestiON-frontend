import { useShallow } from "zustand/shallow";

import { useSalesStore } from "@features/sales/stores/useSalesStore";

export const useSales = () => {
  const { sales, totalSales, isLoading, error, getSales, markSalePaid } =
    useSalesStore(
      useShallow((s) => ({
        sales: s.sales,
        totalSales: s.totalSales,
        isLoading: s.isLoading,
        error: s.error,
        getSales: s.getSales,
        markSalePaid: s.markSalePaid,
      })),
    );

  return {
    sales,
    totalSales,
    isLoading,
    error,
    getSales,
    markSalePaid,
  };
};
