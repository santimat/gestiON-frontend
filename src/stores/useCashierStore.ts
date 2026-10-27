import { create } from "zustand";

import type { AppError, CashierRequest, CashierUpdate, User } from "@/types";
import { cashierService } from "@/services/cashierService";

type UseCashierStore = {
  // Estado de UI: modal de alta/edición de cajero
  formCashier: User | null;
  isFormModalOpen: boolean;
  openEdit: (cashier: User) => void;
  openCreate: () => void;
  closeFormModal: () => void;

  totalCashiers: number;
  cashiers: User[];
  isLoading: boolean;
  isPendingToggleActive: boolean;
  error: string | null;
  createCashier: (cashier: CashierRequest) => Promise<void>;
  getCashiers: () => Promise<void>;
  updateCashier: ({
    cashierId,
    cashier,
  }: {
    cashierId: number;
    cashier: CashierUpdate;
  }) => Promise<void>;
  toggleActive: (userId: number) => Promise<void>;
};

export const useCashierStore = create<UseCashierStore>((set) => ({
  formCashier: null,
  isFormModalOpen: false,
  openEdit: (cashier) =>
    set(() => ({ formCashier: cashier, isFormModalOpen: true })),
  openCreate: () => set(() => ({ formCashier: null, isFormModalOpen: true })),
  closeFormModal: () =>
    set(() => ({ formCashier: null, isFormModalOpen: false })),

  totalCashiers: 0,
  cashiers: [],
  isLoading: false,
  isPendingToggleActive: false,
  error: null,
  createCashier: async (cashier: CashierRequest) => {
    await cashierService.createCashier(cashier);
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
  updateCashier: async ({ cashierId, cashier }) => {
    const cashierUpdated = await cashierService.updateCashier(
      cashierId,
      cashier,
    );
    set((prevState) => ({
      cashiers: prevState.cashiers.map((stateCashier) =>
        stateCashier.id === cashierUpdated.id ? cashierUpdated : stateCashier,
      ),
    }));
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
