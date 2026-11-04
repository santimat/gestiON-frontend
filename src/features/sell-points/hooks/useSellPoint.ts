import { useShallow } from "zustand/shallow";

import { useSellPointStore } from "@features/sell-points/stores/useSellPointStore";
import type { SellPointRequest } from "@features/sell-points/types";

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

/**
 * Acciones estables para las filas de la lista: el punto de venta llega por
 * props y acá solo se suscribe a las acciones, así que el toggle no re-renderiza
 * todas las filas — solo la fila cuyo punto de venta cambió.
 */
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
