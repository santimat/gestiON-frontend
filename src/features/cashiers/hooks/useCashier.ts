import { useShallow } from "zustand/shallow";

import type { CashierRequest } from "@features/cashiers/types";
import { useCashierStore } from "@features/cashiers/stores/useCashierStore";

export const useCashier = () => {
  const {
    cashiers,
    totalCashiers,
    totalPages,
    isLoading,
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
      totalPages: s.totalPages,
      isLoading: s.isLoading,
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

  // al crear refrescamos la lista para respetar el orden y el total que devuelve el backend
  const handleCreateCashier = async (cashier: CashierRequest) => {
    await createCashier(cashier);
    await getCashiers();
  };

  return {
    cashiers,
    totalCashiers,
    totalPages,
    isLoading,
    error,
    formCashier,
    isFormModalOpen,
    handleCreateCashier,
    getCashiers,
    updateCashier,
    toggleActive,
    openEdit,
    openCreate,
    closeFormModal,
  };
};

/**
 * Acciones estables para las filas de la lista: el cajero llega por props y
 * acá solo se suscribe a las acciones, así que el toggle no re-renderiza
 * todas las filas — solo la fila cuyo cajero cambió.
 */
export const useCashierItem = () => {
  const { toggleActive, openEdit } = useCashierStore(
    useShallow((s) => ({
      toggleActive: s.toggleActive,
      openEdit: s.openEdit,
    })),
  );

  return { toggleActive, openEdit };
};
