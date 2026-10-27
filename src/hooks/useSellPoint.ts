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
    getSellPoints,
    toggleActive,
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
      getSellPoints: s.getSellPoints,
      toggleActive: s.toggleActive,
    })),
  );

  const handleCreateSellPoint = async (sellPoint: SellPointRequest) => {
    await createSellPoint(sellPoint);
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
    getSellPoints,
    toggleActive,
  };
};
