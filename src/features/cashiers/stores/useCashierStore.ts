import { create } from "zustand";

import type { AppError } from "@shared/types";
import type { CashierRequest } from "@features/cashiers/types";
import { cashierService } from "@features/cashiers/services/cashierService";
import type { UseCashierStore } from "@features/cashiers/stores/types";

export const useCashierStore = create<UseCashierStore>((set, get) => ({
  formCashier: null,
  isFormModalOpen: false,
  openEdit: (cashier) =>
    set(() => ({ formCashier: cashier, isFormModalOpen: true })),
  openCreate: () => set(() => ({ formCashier: null, isFormModalOpen: true })),
  closeFormModal: () =>
    set(() => ({ formCashier: null, isFormModalOpen: false })),

  totalCashiers: 0,
  totalPages: 0,
  // filtros de la última búsqueda: al crear refrescamos con los mismos
  lastFilters: {},
  cashiers: [],
  isLoading: false,
  error: null,
  createCashier: async (cashier: CashierRequest) => {
    await cashierService.createCashier(cashier);
  },
  getCashiers: async (filters) => {
    const appliedFilters = filters ?? get().lastFilters;

    set({ isLoading: true, lastFilters: appliedFilters });
    try {
      const { cashiers, totalCashiers, totalPages } =
        await cashierService.getCashiers(appliedFilters);
      set(() => ({
        cashiers,
        totalCashiers,
        totalPages,
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
    const newStatus = await cashierService.toggleActive(userId);
    set((prevState) => ({
      cashiers: prevState.cashiers.map((cashier) =>
        cashier.id === newStatus.id ? { ...cashier, ...newStatus } : cashier,
      ),
    }));
  },
}));
