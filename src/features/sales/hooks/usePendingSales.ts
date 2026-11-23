import { useShallow } from "zustand/shallow";

import { usePendingSalesStore } from "@features/sales/stores/usePendingSalesStore";

export const usePendingSales = () => {
  const {
    pendingSales,
    pendingSalesCount,
    totalPending,
    isLoading,
    error,
    getPendingSalesWithDetailsByClient,
    registerPayment,
  } = usePendingSalesStore(
    useShallow((s) => ({
      pendingSales: s.pendingSales,
      pendingSalesCount: s.pendingSalesCount,
      totalPending: s.totalPending,
      isLoading: s.isLoading,
      error: s.error,
      getPendingSalesWithDetailsByClient: s.getPendingSalesWithDetailsByClient,
      registerPayment: s.registerPayment,
    })),
  );

  return {
    pendingSales,
    pendingSalesCount,
    totalPending,
    isLoading,
    error,
    getPendingSalesWithDetailsByClient,
    registerPayment,
  };
};
