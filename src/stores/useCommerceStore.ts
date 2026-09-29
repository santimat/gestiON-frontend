import { create } from "zustand";

import type { CommerceWithOwnerDTO } from "@/types";
import { commerceService } from "@/services/commerce/commerceService";

type UseCommerceStore = {
  commercesWithOwner: CommerceWithOwnerDTO[] | [];
  createCommerceWithOwner: (commercesWithOwner: FormData) => Promise<void>;
  getCommercesWithOwner: () => Promise<void>;
};

export const useCommerceStore = create<UseCommerceStore>((set, get) => ({
  commercesWithOwner: [],
  createCommerceWithOwner: async (commercesWithOwner: FormData) => {
    const newCommerceWithOwner =
      await commerceService.createCommerceWithOwner(commercesWithOwner);
    set((prevState) => ({
      commercesWithOwner: [
        ...prevState.commercesWithOwner,
        newCommerceWithOwner,
      ],
    }));
  },
  getCommercesWithOwner: async () => {
    const commercesWOwner = await commerceService.getCommercesWithOwner();
    set(() => ({
      commercesWithOwner: commercesWOwner,
    }));
  },
}));
