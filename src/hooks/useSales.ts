import { useShallow } from "zustand/shallow";

import { useSalesStore } from "@/stores/sale/useSalesStore";

export const useSales = () => {
  const {
    sales,
    totalSales,
    isLoading,
    error,
    salesFilter,
    setSalesFilter,
    getSales,
  } = useSalesStore(
    useShallow((s) => ({
      sales: s.sales,
      totalSales: s.totalSales,
      isLoading: s.isLoading,
      error: s.error,
      salesFilter: s.salesFilter,
      setSalesFilter: s.setSalesFilter,
      getSales: s.getSales,
    })),
  );

  return {
    sales,
    totalSales,
    isLoading,
    error,
    salesFilter,
    setSalesFilter,
    getSales,
  };
};
