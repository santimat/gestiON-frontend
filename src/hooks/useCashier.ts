import { useShallow } from "zustand/shallow";

import { useCashierStore } from "@/stores/useCashierStore";

export const useCashier = () => {
  const {
    cashiers,
    totalCashiers,
    isLoading,
    isPendingToggleActive,
    error,
    formCashier,
    isFormModalOpen,
    createCashier,
    getCashiers,
    updateCashier,
    toggleActive,
    openEdit,
    openCreate,
    closeFormModal,
  } = useCashierStore(
    useShallow((s) => ({
      cashiers: s.cashiers,
      totalCashiers: s.totalCashiers,
      isLoading: s.isLoading,
      isPendingToggleActive: s.isPendingToggleActive,
      error: s.error,
      formCashier: s.formCashier,
      isFormModalOpen: s.isFormModalOpen,
      createCashier: s.createCashier,
      getCashiers: s.getCashiers,
      updateCashier: s.updateCashier,
      toggleActive: s.toggleActive,
      openEdit: s.openEdit,
      openCreate: s.openCreate,
      closeFormModal: s.closeFormModal,
    })),
  );

  return {
    cashiers,
    totalCashiers,
    isLoading,
    isPendingToggleActive,
    error,
    formCashier,
    isFormModalOpen,
    createCashier,
    getCashiers,
    updateCashier,
    toggleActive,
    openEdit,
    openCreate,
    closeFormModal,
  };
};
