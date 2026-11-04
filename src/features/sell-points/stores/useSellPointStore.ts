import { create } from "zustand";

import type { AppError } from "@shared/types";
import type { SellPoint, SellPointRequest } from "@features/sell-points/types";
import { sellPointService } from "@features/sell-points/services/sellPointService";
import type { UseSellPointStore } from "@features/sell-points/stores/types";

export const useSellPointStore = create<UseSellPointStore>((set) => ({
  sellPoints: [],
  totalSellPoints: 0,
  formSellPoint: null,
  isFormModalOpen: false,
  isLoading: false,
  error: null,

  openEdit: (sellPoint) =>
    set(() => ({ formSellPoint: sellPoint, isFormModalOpen: true })),
  openCreate: () => set(() => ({ formSellPoint: null, isFormModalOpen: true })),
  closeFormModal: () => set(() => ({ isFormModalOpen: false })),
  cashiersModalSellPoint: null,
  isCashiersModalOpen: false,
  openCashiersModal: (sellPoint) =>
    set(() => ({
      cashiersModalSellPoint: sellPoint,
      isCashiersModalOpen: true,
    })),
  closeCashiersModal: () => set(() => ({ isCashiersModalOpen: false })),

  createSellPoint: async (sellPoint: SellPointRequest) => {
    set({ isLoading: true });
    try {
      await sellPointService.createSellPoint(sellPoint);
      set({ isLoading: false, error: null });
    } catch (error) {
      const appError = error as AppError;
      set(() => ({
        error: appError?.message ?? "No se pudo crear el punto de venta.",
        isLoading: false,
      }));
      throw error;
    }
  },
  getSellPoints: async () => {
    set({ isLoading: true });
    try {
      const { sellPoints, totalSellPoints } =
        await sellPointService.getSellPoints();
      set(() => ({
        sellPoints,
        totalSellPoints,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      const appError = error as AppError;

      set(() => ({
        error:
          appError?.message ?? "No se pudieron cargar los puntos de venta.",
        isLoading: false,
      }));
    }
  },
  updateSellPoint: async (sellPointId: number, sellPoint: SellPointRequest) => {
    const updatedSellPoint = await sellPointService.updateSellPoint(
      sellPointId,
      sellPoint,
    );

    const normalizedSellPoint: SellPoint = {
      ...updatedSellPoint,
      updatedAt: new Date(updatedSellPoint.updatedAt),
    };
    set((prevState) => ({
      sellPoints: prevState.sellPoints.map((prev) =>
        prev.id === normalizedSellPoint.id ? normalizedSellPoint : prev,
      ),
    }));
  },
  getSellPointCashiers: async (sellPointId) => {
    try {
      return await sellPointService.getSellPointCashiers(sellPointId);
    } catch (error) {
      const appError = error as AppError;
      set(() => ({
        error:
          appError?.message ?? "No se pudieron cargar los cajeros asignados.",
      }));
      throw error;
    }
  },
  toggleActive: async (sellPointId: number) => {
    const updatedSellPoint = await sellPointService.toggleActive(sellPointId);
    set((prevState) => ({
      sellPoints: prevState.sellPoints.map((sellPoint) =>
        sellPoint.id === updatedSellPoint?.id
          ? { ...sellPoint, active: updatedSellPoint.active }
          : sellPoint,
      ),
    }));
  },
}));
