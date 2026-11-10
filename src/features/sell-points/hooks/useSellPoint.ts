import { useShallow } from "zustand/shallow";

import { useSellPointStore } from "@features/sell-points/stores/useSellPointStore";
import type { SellPointRequest } from "@features/sell-points/types";

export const useSellPoint = () => {
  const {
    sellPoints,
    totalSellPoints,
    totalPages,
    formSellPoint,
    isFormModalOpen,
    openEdit,
    openCreate,
    closeFormModal,
    isLoading,
    error,
    createSellPoint,
    updateSellPoint,
    getSellPoints,
    getSellPointCashiers,
    toggleActive,
    cashiersModalSellPoint,
    isCashiersModalOpen,
    openCashiersModal,
    closeCashiersModal,
  } = useSellPointStore(
    useShallow((s) => ({
      sellPoints: s.sellPoints,
      totalSellPoints: s.totalSellPoints,
      totalPages: s.totalPages,
      formSellPoint: s.formSellPoint,
      isFormModalOpen: s.isFormModalOpen,
      isLoading: s.isLoading,
      error: s.error,
      openEdit: s.openEdit,
      openCreate: s.openCreate,
      closeFormModal: s.closeFormModal,
      createSellPoint: s.createSellPoint,
      updateSellPoint: s.updateSellPoint,
      getSellPoints: s.getSellPoints,
      getSellPointCashiers: s.getSellPointCashiers,
      toggleActive: s.toggleActive,
      cashiersModalSellPoint: s.cashiersModalSellPoint,
      isCashiersModalOpen: s.isCashiersModalOpen,
      openCashiersModal: s.openCashiersModal,
      closeCashiersModal: s.closeCashiersModal,
    })),
  );

  const handleCreateSellPoint = async (sellPoint: SellPointRequest) => {
    await createSellPoint(sellPoint);
    await getSellPoints();
  };

  const handleUpdateSellPoint = async (
    cashierId: number,
    sellPoint: SellPointRequest,
  ) => {
    await updateSellPoint(cashierId, sellPoint);
    await getSellPoints();
  };

  return {
    sellPoints,
    totalSellPoints,
    totalPages,
    formSellPoint,
    isFormModalOpen,
    openEdit,
    openCreate,
    closeFormModal,
    isLoading,
    error,
    handleCreateSellPoint,
    handleUpdateSellPoint,
    getSellPoints,
    getSellPointCashiers,
    toggleActive,
    cashiersModalSellPoint,
    isCashiersModalOpen,
    openCashiersModal,
    closeCashiersModal,
  };
};

export const useSellPointItem = () => {
  const { toggleActive, openEdit, openCashiersModal } = useSellPointStore(
    useShallow((s) => ({
      toggleActive: s.toggleActive,
      openEdit: s.openEdit,
      openCashiersModal: s.openCashiersModal,
    })),
  );

  return { toggleActive, openEdit, openCashiersModal };
};
