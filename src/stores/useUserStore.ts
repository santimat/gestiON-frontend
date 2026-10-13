import { create } from "zustand";

import type { CashierRequest, User } from "@/types";
import { userService } from "@/services/users/userService";

type UseUserStore = {
  cashiers: User[];
  totalCashiers: number;
  isLoading: boolean;
  isPendingToggleActive: boolean;
  createCashier: (cashier: CashierRequest) => Promise<void>;
  getCashiers: () => Promise<void>;
  toggleActive: (userId: number) => Promise<void>;
};

export const useUserStore = create<UseUserStore>((set) => ({
  cashiers: [],
  totalCashiers: 0,
  isLoading: false,
  isPendingToggleActive: false,
  createCashier: async (cashier: CashierRequest) => {
    const newCashier = await userService.createCashier(cashier);
    set((prevState) => ({
      cashiers: [...prevState.cashiers, newCashier],
      totalCashiers: prevState.totalCashiers + 1,
    }));
  },
  toggleActive: async (userId: number) => {
    set({ isPendingToggleActive: true });
    try {
      const newStatus = await userService.toggleActive(userId);
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
  getCashiers: async () => {
    set({ isLoading: true });
    try {
      const data = await userService.getCashiers();
      set(() => ({
        cashiers: data?.content,
        totalCashiers: data?.page.totalElements,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
