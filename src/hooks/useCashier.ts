import { useShallow } from "zustand/shallow";

import { useCashierStore } from "@/stores/useCashierStore";

export const useCashier = () => {
  const {
    cashiers,
    totalCashiers,
    isLoading,
    isPendingToggleActive,
    error,
    createCashier,
    getCashiers,
    toggleActive,
  } = useCashierStore(
    useShallow((s) => ({
      cashiers: s.cashiers,
      totalCashiers: s.totalCashiers,
      isLoading: s.isLoading,
      isPendingToggleActive: s.isPendingToggleActive,
      error: s.error,
      createCashier: s.createCashier,
      getCashiers: s.getCashiers,
      toggleActive: s.toggleActive,
    })),
  );

  return {
    cashiers,
    totalCashiers,
    isLoading,
    isPendingToggleActive,
    error,
    createCashier,
    getCashiers,
    toggleActive,
  };
};
