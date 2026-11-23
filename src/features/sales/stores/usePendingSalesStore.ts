import { create } from "zustand";

import type { AppError } from "@shared/types";
import { saleService } from "@features/sales/services/saleService";
import type { UsePendingSalesStore } from "@features/sales/stores/types";
import type { PendingSalesWithDetails } from "@features/sales/types";

export const usePendingSalesStore = create<UsePendingSalesStore>(
  (set, get) => ({
    pendingSales: [],
    pendingSalesCount: 0,
    totalPending: 0,
    isLoading: false,
    error: null,
    currentClientId: null,

    getPendingSalesWithDetailsByClient: async (clientId: number) => {
      set({ isLoading: true, error: null, currentClientId: clientId });
      try {
        const data = (await saleService.getPendingSalesWithDetailsByClient(
          clientId,
        )) as PendingSalesWithDetails;
        set({
          pendingSales: data?.pendingSales?.content,
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

    registerPayment: async (saleId: number, amount: number) => {
      const data = await saleService.registerPayment(saleId, amount);
      // Refrescar lista desde backend (fuente de verdad para totalPending)
      const { currentClientId } = get();
      if (currentClientId != null) {
        await get().getPendingSalesWithDetailsByClient(currentClientId);
      }
      return data;
    },
  }),
);
