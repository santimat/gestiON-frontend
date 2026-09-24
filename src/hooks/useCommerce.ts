import { useCommerceStore } from "@/stores/useCommerceStore";
import type { CommerceDTO } from "@/types";
import { useShallow } from "zustand/react/shallow";

export const useCommerce = () => {
  const { createCommerce, commerces } = useCommerceStore(
    useShallow(({ commerces, createCommerce }) => ({
      commerces,
      createCommerce,
    })),
  );

  const handleCreateCommerce = async (commerce: CommerceDTO) => {
    const createdCommerce = await createCommerce(commerce);
    return createdCommerce?.id;
  };

  return { commerces, handleCreateCommerce };
};
