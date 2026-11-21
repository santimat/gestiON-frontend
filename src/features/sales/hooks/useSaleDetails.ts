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
    isRegisteringPayment,
    registerPayment,
  } = useSaleDetailsStore(
    useShallow((s) => ({
      isLoading: s.isLoading,
      error: s.error,
      saleWithDetails: s.saleWithDetails,
      isDetailModalOpen: s.isDetailModalOpen,
      openDetailModal: s.openDetailModal,
      closeDetailModal: s.closeDetailModal,
      getSaleWithDetails: s.getSaleWithDetails,
      isRegisteringPayment: s.isRegisteringPayment,
      registerPayment: s.registerPayment,
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
    isRegisteringPayment,
    registerPayment,
  };
};
