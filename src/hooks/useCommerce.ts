import { useShallow } from "zustand/shallow";

import { useCommerceStore } from "@/stores/useCommerceStore";

export const useCommerce = () => {
  const {
    commercesWithOwner,
    commerceStats,
    currentCommerce,
    isPendingToggleActive,
    isLoading,
    error,
    formCommerce,
    isFormModalOpen,
    createCommerceWithOwner,
    getCommercesWithOwner,
    getCommerceStats,
    getCurrentCommerce,
    toggleCommerceActive,
    updateCommerceWithOwner,
    openEdit,
    openCreate,
    closeFormModal,
  } = useCommerceStore(
    useShallow((s) => ({
      commercesWithOwner: s.commercesWithOwner,
      commerceStats: s.commerceStats,
      currentCommerce: s.currentCommerce,
      isPendingToggleActive: s.isPendingToggleActive,
      isLoading: s.isLoading,
      error: s.error,
      formCommerce: s.formCommerce,
      isFormModalOpen: s.isFormModalOpen,
      createCommerceWithOwner: s.createCommerceWithOwner,
      getCommercesWithOwner: s.getCommercesWithOwner,
      getCommerceStats: s.getCommerceStats,
      getCurrentCommerce: s.getCurrentCommerce,
      toggleCommerceActive: s.toggleCommerceActive,
      updateCommerceWithOwner: s.updateCommerceWithOwner,
      openEdit: s.openEdit,
      openCreate: s.openCreate,
      closeFormModal: s.closeFormModal,
    })),
  );

  const handleCreateCommerceWithOwner = async (commerceWithOwner: FormData) => {
    await createCommerceWithOwner(commerceWithOwner);
    await getCommerceStats();
  };

  const handleToggleCommerceActive = async (commerceId?: number) => {
    if (!commerceId) return;
    await toggleCommerceActive(commerceId);
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
    isPendingToggleActive,
    isLoading,
    error,
    formCommerce,
    isFormModalOpen,
    handleUpdateCommerceWithOwner,
    handleCreateCommerceWithOwner,
    handleToggleCommerceActive,
    getCommercesWithOwner,
    getCommerceStats,
    getCurrentCommerce,
    openEdit,
    openCreate,
    closeFormModal,
  };
};
