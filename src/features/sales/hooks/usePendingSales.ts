import { useShallow } from "zustand/shallow";

import { usePendingSalesStore } from "@features/sales/stores/usePendingSalesStore";

export const usePendingSales = () => {
  const {
    pendingSales,
    pendingSalesCount,
    totalPending,
    isLoading,
    error,
    selectedPendingSale,
    isDetailModalOpen,
    pendingSalesClient,
    setPendingSalesClient,
    getPendingSalesWithDetailsByClient,
    openDetailModal,
    closeDetailModal,
  } = usePendingSalesStore(
    useShallow((s) => ({
      pendingSales: s.pendingSales,
      pendingSalesCount: s.pendingSalesCount,
      totalPending: s.totalPending,
      isLoading: s.isLoading,
      error: s.error,
      selectedPendingSale: s.selectedPendingSale,
      isDetailModalOpen: s.isDetailModalOpen,
      pendingSalesClient: s.pendingSalesClient,
      setPendingSalesClient: s.setPendingSalesClient,
      getPendingSalesWithDetailsByClient: s.getPendingSalesWithDetailsByClient,
      openDetailModal: s.openDetailModal,
      closeDetailModal: s.closeDetailModal,
    })),
  );

  return {
    pendingSales,
    pendingSalesCount,
    totalPending,
    isLoading,
    error,
    selectedPendingSale,
    isDetailModalOpen,
    pendingSalesClient,
    setPendingSalesClient,
    getPendingSalesWithDetailsByClient,
    openDetailModal,
    closeDetailModal,
  };
};
