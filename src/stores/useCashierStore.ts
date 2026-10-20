import { create } from "zustand";

import type { AppError, CashierRequest, User } from "@/types";
import { cashierService } from "@/services/cashier/cashierService";

type UseCashierStore = {
  totalCashiers: number;
  cashiers: User[];
  isLoading: boolean;
  isPendingToggleActive: boolean;
  error: string | null;
  createCashier: (cashier: CashierRequest) => Promise<void>;
  getCashiers: () => Promise<void>;
  toggleActive: (userId: number) => Promise<void>;
};

export const useCashierStore = create<UseCashierStore>((set) => ({
  totalCashiers: 0,
  cashiers: [],
  isLoading: false,
  isPendingToggleActive: false,
  error: null,
  createCashier: async (cashier: CashierRequest) => {
    const newCashier = await cashierService.createCashier(cashier);
    set((prevState) => ({
      error: null,
      cashiers: [...prevState.cashiers, newCashier],
      totalCashiers: prevState.totalCashiers + 1,
    }));
  },
  getCashiers: async () => {
    set({ isLoading: true });
    try {
      const { cashiers, totalCashiers } = await cashierService.getCashiers();
      set(() => ({
        cashiers,
        totalCashiers,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      const appError = error as AppError;
      set(() => ({
        error: appError?.message ?? "No se pudieron cargar los cajeros.",
        isLoading: false,
      }));
    }
  },
  toggleActive: async (userId: number) => {
    set({ isPendingToggleActive: true });
    try {
      const newStatus = await cashierService.toggleActive(userId);
      set((prevState) => ({
        cashiers: prevState.cashiers.map((cashier) =>
          cashier.id === newStatus.id ? { ...cashier, ...newStatus } : cashier,
        ),
        isPendingToggleActive: false,
      }));
    } catch (error) {
      set({ isPendingToggleActive: false });
      throw error;
    }
  },
}));
