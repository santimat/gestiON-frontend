import { useShallow } from "zustand/react/shallow";

import { useCommerceStore } from "@/stores/useCommerceStore";

export const useCommerce = () => {
  const {
    commercesWithOwner,
    commerceStats,
    currentCommerce,
    isPendingToggleActive,
    isLoading,
    createCommerceWithOwner,
    getCommercesWithOwner,
    getCommerceStats,
    getCurrentCommerce,
    toggleCommerceActive,
    updateCommerceWithOwner,
  } = useCommerceStore(
    useShallow((s) => ({
      commercesWithOwner: s.commercesWithOwner,
      commerceStats: s.commerceStats,
      currentCommerce: s.currentCommerce,
      isPendingToggleActive: s.isPendingToggleActive,
      isLoading: s.isLoading,
      createCommerceWithOwner: s.createCommerceWithOwner,
      getCommercesWithOwner: s.getCommercesWithOwner,
      getCommerceStats: s.getCommerceStats,
      getCurrentCommerce: s.getCurrentCommerce,
      toggleCommerceActive: s.toggleCommerceActive,
      updateCommerceWithOwner: s.updateCommerceWithOwner,
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
    handleUpdateCommerceWithOwner,
    handleCreateCommerceWithOwner,
    handleToggleCommerceActive,
    getCommercesWithOwner,
    getCommerceStats,
    getCurrentCommerce,
  };
};
