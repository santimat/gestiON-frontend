import { useCommerceStore } from "@/stores/useCommerceStore";
import type { RegisterDTO } from "@/types";
import { useShallow } from "zustand/react/shallow";

export function useAuth() {
  const { createCommerce, commerces } = useCommerceStore(
    useShallow(({ commerces, createCommerce }) => ({
      commerces,
      createCommerce,
    })),
  );

  const handleCreateCommerce = async (rawData: RegisterDTO) => {
    await createCommerce(rawData);
  };

  return { commerces, handleCreateCommerce };
}
