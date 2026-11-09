import { create } from "zustand";

import type { AppError } from "@shared/types";
import { productService } from "@features/products/services/productService";
import type { UseProductWithOfferStore } from "@features/products/stores/types";

export const useProductWithOfferStore = create<UseProductWithOfferStore>((set) => ({
  products: [],
  totalProducts: 0,
  isLoading: false,
  error: null,

  getProductsWithOffer: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const data = await productService.getProductsWithOffer(filters);
      set(() => ({
        products: data?.content ?? [],
        totalProducts: data?.page.totalElements ?? 0,
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