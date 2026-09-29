import { useShallow } from "zustand/react/shallow";

import { useCommerceStore } from "@/stores/useCommerceStore";

export const useCommerce = () => {
  const { commercesWithOwner, createCommerceWithOwner, getCommercesWithOwner } =
    useCommerceStore(
      useShallow(
        ({
          commercesWithOwner,
          createCommerceWithOwner,
          getCommercesWithOwner,
        }) => ({
          commercesWithOwner,
          createCommerceWithOwner,
          getCommercesWithOwner,
        }),
      ),
    );

  const handleCreateCommerceWithOwner = async (commerceWithOwner: FormData) => {
    await createCommerceWithOwner(commerceWithOwner);
  };

  return {
    commercesWithOwner,
    handleCreateCommerceWithOwner,
    getCommercesWithOwner,
  };
};
