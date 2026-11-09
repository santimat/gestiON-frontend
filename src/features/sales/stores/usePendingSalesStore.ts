import { create } from "zustand";

import type { AppError } from "@shared/types";
import { saleService } from "@features/sales/services/saleService";
import type { UsePendingSalesStore } from "@features/sales/stores/types";
import type { PendingSalesWithDetails, Sale } from "@features/sales/types";

export const usePendingSalesStore = create<UsePendingSalesStore>((set) => ({
  pendingSales: [],
  pendingSalesCount: 0,
  totalPending: 0,
  isLoading: false,
  error: null,
  selectedPendingSale: null,
  isDetailModalOpen: false,
  pendingSalesClient: null,
  setPendingSalesClient: (client) => set({ pendingSalesClient: client }),

  getPendingSalesWithDetailsByClient: async (clientId: number) => {
    set({ isLoading: true, error: null });
    try {
      const data = (await saleService.getPendingSalesWithDetailsByClient(
        clientId,
      )) as PendingSalesWithDetails;
      set({
        pendingSales: data?.pendingSales,
        pendingSalesCount: data?.pendingSalesCount,
        totalPending: data?.totalPending,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const appError = error as AppError;
      set({ isLoading: false, error: appError.message });
      throw error;
    }
  },

  openDetailModal: (sale: Sale) => {
    set({ selectedPendingSale: sale, isDetailModalOpen: true });
  },

  closeDetailModal: () => {
    set({ isDetailModalOpen: false });
  },
}));
