import { useShallow } from "zustand/shallow";

import { useCashierStore } from "@/stores/useCashierStore";

export const useCashier = () => {
  const {
    cashiers,
    totalCashiers,
    isLoading,
    error,
    createCashier,
    getCashiers,
  } = useCashierStore(
    useShallow((s) => ({
      cashiers: s.cashiers,
      totalCashiers: s.totalCashiers,
      isLoading: s.isLoading,
      error: s.error,
      createCashier: s.createCashier,
      getCashiers: s.getCashiers,
    })),
  );

  return {
    cashiers,
    totalCashiers,
    isLoading,
    error,
    createCashier,
    getCashiers,
  };
};
