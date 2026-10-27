import { useShallow } from "zustand/shallow";

import { useSellPointStore } from "@/stores/useSellPointStore";
import type { SellPointRequest } from "@/types";

export const useSellPoint = () => {
  const {
    sellPoints,
    totalSellPoints,
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
