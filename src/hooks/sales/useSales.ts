import { useShallow } from "zustand/shallow";

import { useSalesStore } from "@/stores/sale/useSalesStore";

export const useSales = () => {
  const { sales, totalSales, isLoading, error, getSales } = useSalesStore(
    useShallow((s) => ({
      sales: s.sales,
      totalSales: s.totalSales,
      isLoading: s.isLoading,
      error: s.error,
      getSales: s.getSales,
    })),
  );

  return {
    sales,
    totalSales,
    isLoading,
    error,
    getSales,
  };
};
