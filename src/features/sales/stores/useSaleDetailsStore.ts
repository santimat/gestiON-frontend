import { create } from "zustand";

import { saleService } from "@features/sales/services/saleService";
import type { UseSaleDetailsStore } from "@features/sales/stores/types";

export const useSaleDetailsStore = create<UseSaleDetailsStore>((set, get) => ({
  isLoading: false,
  error: null,
  saleWithDetails: null,
  isDetailModalOpen: false,
  openDetailModal: () => {
    set({ isDetailModalOpen: true });
  },
  closeDetailModal: () => {
    set({ isDetailModalOpen: false });
  },
  getSaleWithDetails: async (saleId: number) => {
    set({ isLoading: true, error: null });
    const data = await saleService.getSaleWithDetails(saleId);
    set({
      saleWithDetails: data,
      isLoading: false,
      error: null,
    });
    get().openDetailModal();
  },
}));
