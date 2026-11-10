import { useShallow } from "zustand/shallow";

import { useSalesStore } from "@features/sales/stores/useSalesStore";

export const useSales = () => {
  const {
    sales,
    totalSales,
    totalPages,
    isLoading,
    error,
    getSales,
    markSalePaid,
  } = useSalesStore(
    useShallow((s) => ({
      sales: s.sales,
      totalSales: s.totalSales,
      totalPages: s.totalPages,
      isLoading: s.isLoading,
      error: s.error,
      getSales: s.getSales,
      markSalePaid: s.markSalePaid,
    })),
  );

  return {
    sales,
    totalSales,
    totalPages,
    isLoading,
    error,
    getSales,
    markSalePaid,
  };
};
