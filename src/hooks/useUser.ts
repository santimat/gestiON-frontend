import { useShallow } from "zustand/shallow";

import { useUserStore } from "@/stores/useUserStore";

export const useUser = () => {
  const {
    cashiers,
    totalCashiers,
    isLoading,
    isPendingToggleActive,
    getCashiers,
    toggleActive,
  } = useUserStore(
    useShallow((s) => ({
      cashiers: s.cashiers,
      totalCashiers: s.totalCashiers,
      isLoading: s.isLoading,
      isPendingToggleActive: s.isPendingToggleActive,
      getCashiers: s.getCashiers,
      toggleActive: s.toggleActive,
    })),
  );

  return {
    cashiers,
    totalCashiers,
    isLoading,
    isPendingToggleActive,
    getCashiers,
    toggleActive,
  };
};
