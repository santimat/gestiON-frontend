import { create } from "zustand";

import type { CommerceStats, CommerceWithOwnerDTO } from "@/types";
import { commerceService } from "@/services/commerce/commerceService";

type UseCommerceStore = {
  commercesWithOwner: CommerceWithOwnerDTO[] | [];
  commerceStats: CommerceStats | null;
  createCommerceWithOwner: (commercesWithOwner: FormData) => Promise<void>;
  getCommercesWithOwner: () => Promise<void>;
  getCommerceStats: () => Promise<void>;
  toggleCommerceActive: (commerceId: number) => Promise<void>;
};

export const useCommerceStore = create<UseCommerceStore>((set) => ({
  commercesWithOwner: [],
  commerceStats: null,
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
  getCommerceStats: async () => {
    const stats = await commerceService.getCommerceStats();
    set(() => ({ commerceStats: stats }));
  },
  toggleCommerceActive: async (commerceId: number) => {
    const newStatus = await commerceService.toggleCommerceActive(commerceId);
    set((prevState) => ({
      commercesWithOwner: prevState.commercesWithOwner.map((commerce) => {
        if (commerce.commerceId != newStatus.id) return commerce;

        return { ...commerce, active: newStatus.active };
      }),
    }));
  },
}));
