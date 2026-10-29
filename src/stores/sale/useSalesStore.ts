import { create } from "zustand";

import type { AppError } from "@/types";
import { saleService } from "@/services/saleService";
import type { UseSalesStore } from "@/stores/sale/types";

export const useSalesStore = create<UseSalesStore>((set, get) => ({
  sales: [],
  totalSales: 0,
  isLoading: false,
  error: null,
  salesFilter: { searchText: "", status: undefined, paymentMethod: undefined },

  setSalesFilter: async (filter) => {
    set((prevState) => ({
      salesFilter: { ...prevState.salesFilter, ...filter },
    }));
    await get().getSales();
  },
  getSales: async () => {
    set({ isLoading: true, error: null });
    try {
      const { searchText, status, paymentMethod } = get().salesFilter;
      const data = await saleService.getSales({
        searchText: searchText || undefined,
        status: status ?? undefined,
        paymentMethod: paymentMethod ?? undefined,
      });
      set({
        sales: data.content,
        totalSales: data.page.totalElements,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const appError = error as AppError;
      set({
        error: appError?.message ?? "No se pudieron cargar las ventas.",
        isLoading: false,
      });
      throw error;
    }
  },
}));
