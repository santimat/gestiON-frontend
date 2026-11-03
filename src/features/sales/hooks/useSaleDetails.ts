import { useShallow } from "zustand/shallow";
import { useSaleDetailsStore } from "@features/sales/stores/useSaleDetailsStore";

export const useSaleDetails = () => {
  const {
    isDetailModalOpen,
    isLoading,
    error,
    saleWithDetails,
    getSaleWithDetails,
    closeDetailModal,
    openDetailModal,
  } = useSaleDetailsStore(
    useShallow((s) => ({
      isLoading: s.isLoading,
      error: s.error,
      saleWithDetails: s.saleWithDetails,
      isDetailModalOpen: s.isDetailModalOpen,
      openDetailModal: s.openDetailModal,
      closeDetailModal: s.closeDetailModal,
      getSaleWithDetails: s.getSaleWithDetails,
    })),
  );

  return {
    isDetailModalOpen,
    isLoading,
    error,
    saleWithDetails,
    getSaleWithDetails,
    closeDetailModal,
    openDetailModal,
  };
};
