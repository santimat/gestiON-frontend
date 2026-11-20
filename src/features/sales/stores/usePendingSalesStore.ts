import { create } from "zustand";

import type { AppError } from "@shared/types";
import { saleService } from "@features/sales/services/saleService";
import type { UsePendingSalesStore } from "@features/sales/stores/types";
import type { PendingSalesWithDetails } from "@features/sales/types";
import { useClientStore } from "@features/clients/stores/useClientStore";

export const usePendingSalesStore = create<UsePendingSalesStore>(
  (set, get) => ({
    pendingSales: [],
    pendingSalesCount: 0,
    totalPending: 0,
    isLoading: false,
    error: null,

    getPendingSalesWithDetailsByClient: async (clientId: number) => {
      set({ isLoading: true, error: null });
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

    markSalePaid: async (saleId: number, clientId: number) => {
      const data = await saleService.markSalePaid(saleId);
      // Obtener estado actual para calcular nuevos valores
      const { pendingSales } = get();
      const updatedPendingSales = pendingSales.filter(
        (sale) => sale.id !== saleId,
      );
      const updatedTotalPending = updatedPendingSales.reduce(
        (acc, sale) => acc + sale.total,
        0,
      );
      const updatedPendingSalesCount = updatedPendingSales.length;

      set({
        pendingSales: updatedPendingSales,
        pendingSalesCount: updatedPendingSalesCount,
        totalPending: updatedTotalPending,
      });

      // Actualizar store de clientes
      useClientStore.setState((prev) => ({
        clients: prev.clients.map((prevClient) =>
          prevClient.id === clientId
            ? {
                ...prevClient,
                totalPending: updatedTotalPending,
                pendingSalesCount: updatedPendingSalesCount,
              }
            : prevClient,
        ),
      }));
      return data;
    },
  }),
);
