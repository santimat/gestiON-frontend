import { useShallow } from "zustand/react/shallow";

import { useCommerceStore } from "@/stores/useCommerceStore";

export const useCommerce = () => {
  const {
    commercesWithOwner,
    commerceStats,
    createCommerceWithOwner,
    getCommercesWithOwner,
    getCommerceStats,
    toggleCommerceActive,
  } = useCommerceStore(
    useShallow(
      ({
        commercesWithOwner,
        commerceStats,
        createCommerceWithOwner,
        getCommercesWithOwner,
        getCommerceStats,
        toggleCommerceActive,
      }) => ({
        commercesWithOwner,
        commerceStats,
        createCommerceWithOwner,
        getCommercesWithOwner,
        getCommerceStats,
        toggleCommerceActive,
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

  return {
    commercesWithOwner,
    commerceStats,
    handleCreateCommerceWithOwner,
    handleToggleCommerceActive,
    getCommercesWithOwner,
    getCommerceStats,
  };
};
