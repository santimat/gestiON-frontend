import { create } from "zustand";

import type { AppError } from "@shared/types";
import { productService } from "@features/products/services/productService";
import type { UseProductStatsStore } from "@features/products/stores/types";

export const useProductStatsStore = create<UseProductStatsStore>((set) => ({
  lowStockProducts: [],
  isLoading: false,
  error: null,

  getLowStockProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await productService.getLowStockProducts();
      set(() => ({
        lowStockProducts: data ?? [],
        error: null,
      }));
    } catch (error) {
      const appError = error as AppError;
      set({ error: appError.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
