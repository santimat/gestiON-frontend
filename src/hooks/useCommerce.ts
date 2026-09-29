import { useShallow } from "zustand/react/shallow";

import { useCommerceStore } from "@/stores/useCommerceStore";

export const useCommerce = () => {
  const { commercesWithOwner, createCommerceWithOwner } = useCommerceStore(
    useShallow(({ commercesWithOwner, createCommerceWithOwner }) => ({
      commercesWithOwner,
      createCommerceWithOwner,
    })),
  );

  const handleCreateCommerceWithOwner = async (commerceWithOwner: FormData) => {
    await createCommerceWithOwner(commerceWithOwner);
  };

  return { commercesWithOwner, handleCreateCommerceWithOwner };
};
