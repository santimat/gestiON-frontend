import { useShallow } from "zustand/react/shallow";

import { useCommerceStore } from "@/stores/useCommerceStore";

export const useCommerce = () => {
  const {
    commercesWithOwner,
    commerceStats,
    isEditing,
    startEditing,
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
        startEditing,
        getEditingCommerce,
        createCommerceWithOwner,
        getCommercesWithOwner,
        getCommerceStats,
        toggleCommerceActive,
        updateCommerceWithOwner,
        isEditing,
      }) => ({
        commercesWithOwner,
        editingCommerce,
        commerceStats,
        isEditing,
        getEditingCommerce,
        startEditing,
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
    isEditing,
    startEditing,
    handleUpdateCommerceWithOwner,
    getEditingCommerce,
    handleCreateCommerceWithOwner,
    handleToggleCommerceActive,
    getCommercesWithOwner,
    getCommerceStats,
  };
};
