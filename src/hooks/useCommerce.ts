import { useShallow } from "zustand/react/shallow";

import { useCommerceStore } from "@/stores/useCommerceStore";

export const useCommerce = () => {
  const {
    commercesWithOwner,
    commerceStats,
    isEditing,
    isPendingToggleActive,
    startEditing,
    endEditing,
    getEditingCommerce,
    createCommerceWithOwner,
    getCommercesWithOwner,
    getCommerceStats,
    toggleCommerceActive,
    updateCommerceWithOwner,
  } = useCommerceStore(
    useShallow(
      ({
        commercesWithOwner,

        commerceStats,
        editingCommerce,
        isEditing,
        isPendingToggleActive,
        startEditing,
        endEditing,
        getEditingCommerce,
        createCommerceWithOwner,
        getCommercesWithOwner,
        getCommerceStats,
        toggleCommerceActive,
        updateCommerceWithOwner,
      }) => ({
        commercesWithOwner,
        editingCommerce,
        commerceStats,
        isEditing,
        isPendingToggleActive,
        getEditingCommerce,
        startEditing,
        endEditing,
        createCommerceWithOwner,
        getCommercesWithOwner,
        getCommerceStats,
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
    isEditing,
    isPendingToggleActive,
    startEditing,
    endEditing,
    handleUpdateCommerceWithOwner,
    getEditingCommerce,
    handleCreateCommerceWithOwner,
    handleToggleCommerceActive,
    getCommercesWithOwner,
    getCommerceStats,
  };
};
