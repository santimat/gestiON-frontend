import { useShallow } from "zustand/shallow";

import { useCommerceStore } from "@features/commerces/stores/useCommerceStore";

export const useCommerce = () => {
  const {
    commercesWithOwner,
    commerceStats,
    currentCommerce,
    isLoading,
    error,
    formCommerce,
    isFormModalOpen,
    createCommerceWithOwner,
    getCommercesWithOwner,
    getCommerceStats,
    getCurrentCommerce,
    updateCommerceWithOwner,
    openEdit,
    openCreate,
    closeFormModal,
  } = useCommerceStore(
    useShallow((s) => ({
      commercesWithOwner: s.commercesWithOwner,
      commerceStats: s.commerceStats,
      currentCommerce: s.currentCommerce,
      isLoading: s.isLoading,
      error: s.error,
      formCommerce: s.formCommerce,
      isFormModalOpen: s.isFormModalOpen,
      createCommerceWithOwner: s.createCommerceWithOwner,
      getCommercesWithOwner: s.getCommercesWithOwner,
      getCommerceStats: s.getCommerceStats,
      getCurrentCommerce: s.getCurrentCommerce,
      updateCommerceWithOwner: s.updateCommerceWithOwner,
      openEdit: s.openEdit,
      openCreate: s.openCreate,
      closeFormModal: s.closeFormModal,
    })),
  );

  const handleCreateCommerceWithOwner = async (commerceWithOwner: FormData) => {
    await createCommerceWithOwner(commerceWithOwner);
    // al crear refrescamos la lista y las estadísticas con lo que devuelve el backend
    await getCommercesWithOwner();
    await getCommerceStats();
  };

  const handleUpdateCommerceWithOwner = async ({
    commerceId,
    userId,
    formData,
  }: {
    commerceId: number;
    userId: number;
    formData: FormData;
  }) => {
    await updateCommerceWithOwner({ commerceId, userId, formData });
  };

  return {
    commercesWithOwner,
    commerceStats,
    currentCommerce,
    isLoading,
    error,
    formCommerce,
    isFormModalOpen,
    handleUpdateCommerceWithOwner,
    handleCreateCommerceWithOwner,
    getCommercesWithOwner,
    getCommerceStats,
    getCurrentCommerce,
    openEdit,
    openCreate,
    closeFormModal,
  };
};

/**
 * Acciones estables para las filas de la lista: el comercio llega por props y
 * acá solo se suscribe a las acciones, así que el toggle no re-renderiza
 * todas las filas — solo la fila cuyo comercio cambió.
 */
export const useCommerceItem = () => {
  const { toggleCommerceActive, getCommerceStats, openEdit } = useCommerceStore(
    useShallow((s) => ({
      toggleCommerceActive: s.toggleCommerceActive,
      getCommerceStats: s.getCommerceStats,
      openEdit: s.openEdit,
    })),
  );

  const handleToggleCommerceActive = async (commerceId?: number) => {
    if (!commerceId) return;
    await toggleCommerceActive(commerceId);
    await getCommerceStats();
  };

  return { handleToggleCommerceActive, openEdit };
};
