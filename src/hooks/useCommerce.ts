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
    useShallow(
      ({
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
      }) => ({
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
      }),
    ),
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
