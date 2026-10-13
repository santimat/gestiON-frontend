import { create } from "zustand/react";

import type { AppError, CashierRequest, User } from "@/types";
import { cashierService } from "@/services/cashier/cashierService";

type UseCashierStore = {
  totalCashiers: number;
  cashiers: User[];
  isLoading: boolean;
  error: string | null;
  createCashier: (cashier: CashierRequest) => Promise<void>;
  getCashiers: () => Promise<void>;
};

export const useCashierStore = create<UseCashierStore>((set) => ({
  totalCashiers: 0,
  cashiers: [],
  isLoading: false,
  error: null,
  createCashier: async (cashier: CashierRequest) => {
    const newCashier = await cashierService.createCashier(cashier);
    set((prevState) => ({
      cashiers: [...prevState.cashiers, newCashier],
    }));
  },
  getCashiers: async () => {
    set({ isLoading: true });
    try {
      const data = await cashierService.getCashiers();
      set(() => ({
        cashiers: data?.cashiers,
        isLoading: false,
      }));
    } catch (error) {
      const appError = error as AppError;
      set(() => ({
        error: appError.message,
        isLoading: false,
      }));
    }
  },
}));
