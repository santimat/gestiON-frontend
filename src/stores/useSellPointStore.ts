import { create } from "zustand";

import { sellPointService } from "@/services/sellPointService";
import type { AppError, SellPoint, SellPointRequest, User } from "@/types";

type UseSellPointStore = {
  sellPoints: SellPoint[];
  totalSellPoints: number;
  formSellPoint: SellPoint | null;
  isFormModalOpen: boolean;
  isLoading: boolean;
  error: string | null;
  isPendingToggleActive: boolean;
  openEdit: (sellPoint: SellPoint) => void;
  openCreate: () => void;
  closeFormModal: () => void;
  cashiersModalSellPoint: SellPoint | null;
  isCashiersModalOpen: boolean;
  openCashiersModal: (sellPoint: SellPoint) => void;
  closeCashiersModal: () => void;
  createSellPoint: (sellPoint: SellPointRequest) => Promise<void>;
  updateSellPoint: (
    sellPointId: number,
    sellPoint: SellPointRequest,
  ) => Promise<void>;
  getSellPoints: () => Promise<void>;
  getSellPointCashiers: (sellPointId: number) => Promise<User[]>;
  toggleActive: (sellPointId: number) => Promise<void>;
};

export const useSellPointStore = create<UseSellPointStore>((set) => ({
  sellPoints: [],
  totalSellPoints: 0,
  formSellPoint: null,
  isFormModalOpen: false,
  isLoading: false,
  error: null,
  isPendingToggleActive: false,

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

  toggleActive: async (sellPointId) => {
    set({ isPendingToggleActive: true });
    const updatedSellPoint = await sellPointService.toggleActive(sellPointId);
    set((prevState) => ({
      sellPoints: prevState.sellPoints.map((sellPoint) =>
        sellPoint.id === updatedSellPoint?.id
          ? { ...sellPoint, active: updatedSellPoint.active }
          : sellPoint,
      ),
    }));
    set({ isPendingToggleActive: false });
  },
}));
