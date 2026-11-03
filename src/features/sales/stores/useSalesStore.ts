import { create } from "zustand";

import type { SalesFilter } from "@features/sales/types";
import { saleService } from "@features/sales/services/saleService";
import type { UseSalesStore } from "@features/sales/stores/types";

export const useSalesStore = create<UseSalesStore>((set) => ({
  sales: [],
  totalSales: 0,
  isLoading: false,
  error: null,
  getSales: async (filters: SalesFilter) => {
    set({ isLoading: true, error: null });
    const data = await saleService.getSales(filters);
    set({
      sales: data.content,
      totalSales: data.page.totalElements,
      isLoading: false,
      error: null,
    });
  },
}));
