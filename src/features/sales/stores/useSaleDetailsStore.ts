import { create } from "zustand";

import { saleService } from "@features/sales/services/saleService";
import type { UseSaleDetailsStore } from "@features/sales/stores/types";
import type { AppError } from "@/shared/types";
import type { TransactionResponse } from "@features/sales/types";

export const useSaleDetailsStore = create<UseSaleDetailsStore>((set, get) => ({
  isLoading: false,
  error: null,
  saleWithDetails: null,
  isDetailModalOpen: false,
  isRegisteringPayment: false,
  openDetailModal: () => {
    set({ isDetailModalOpen: true });
  },
  closeDetailModal: () => {
    set({ isDetailModalOpen: false, saleWithDetails: null });
  },
  getSaleWithDetails: async (saleId: number) => {
    set({ isLoading: true, error: null });
    try {
      const data = await saleService.getSaleWithDetails(saleId);
      set({
        saleWithDetails: data,
        isLoading: false,
        error: null,
      });
      get().openDetailModal();
    } catch (error) {
      const appError = error as AppError;
      set({ error: appError.message });
    }
  },
  registerPayment: async (saleId: number, amount: number): Promise<TransactionResponse> => {
    set({ isRegisteringPayment: true, error: null });
    try {
      const data = await saleService.registerPayment(saleId, amount);
      set({ isRegisteringPayment: false });
      return data;
    } catch (error) {
      set({ isRegisteringPayment: false });
      throw error;
    }
  },
}));
