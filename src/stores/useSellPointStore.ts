import { create } from "zustand";

import { sellPointService } from "@/services/sellPointService";
import type { AppError, SellPoint, SellPointRequest } from "@/types";

type UseSellPointStore = {
  sellPoints: SellPoint[];
  totalSellPoints: number;
  formSellPoint: SellPoint | null;
  isFormModalOpen: boolean;
  isLoading: boolean;
  error: string | null;
  openEdit: (sellPoint: SellPoint) => void;
  openCreate: () => void;
  closeFormModal: () => void;
  createSellPoint: (sellPoint: SellPointRequest) => Promise<SellPoint>;
  getSellPoints: () => Promise<void>;
  toggleActive: (sellPointId: number) => Promise<void>;
};

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
  closeFormModal: () =>
    set(() => ({ formSellPoint: null, isFormModalOpen: false })),

  createSellPoint: async (sellPoint: SellPointRequest) => {
    set({ isLoading: true });
    try {
      const created = await sellPointService.createSellPoint(sellPoint);
      const newSellPoint: SellPoint = {
        ...created,
        updatedAt: new Date(created.updatedAt),
      };
      set({ isLoading: false, error: null });
      return newSellPoint;
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

  toggleActive: async (sellPointId) => {
    // mismo patrón que categories: el backend devuelve el punto actualizado
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
