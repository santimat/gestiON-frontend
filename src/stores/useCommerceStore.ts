import { create } from "zustand";

import type { CommerceStats, CommerceWithOwner } from "@/types";
import { commerceService } from "@/services/commerce/commerceService";

type UseCommerceStore = {
  commercesWithOwner: CommerceWithOwner[];
  commerceStats?: CommerceStats | null;
  isPendingToggleActive: boolean;
  isLoading: boolean;
  createCommerceWithOwner: (commercesWithOwner: FormData) => Promise<void>;
  getCommercesWithOwner: () => Promise<void>;
  getCommerceStats: () => Promise<void>;
  toggleCommerceActive: (commerceId: number) => Promise<void>;
  updateCommerceWithOwner: ({
    commerceId,
    userId,
    formData,
  }: {
    commerceId: number;
    userId: number;
    formData: FormData;
  }) => Promise<void>;
};

export const useCommerceStore = create<UseCommerceStore>((set) => ({
  commercesWithOwner: [],
  commerceStats: null,
  isPendingToggleActive: false,
  isLoading: false,
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
    set(() => ({ isLoading: true }));
    const commercesWOwner = await commerceService.getCommercesWithOwner();
    set(() => ({
      commercesWithOwner: commercesWOwner,
      isLoading: false,
    }));
  },
  getCommerceStats: async () => {
    const stats = await commerceService.getCommerceStats();
    set(() => ({ commerceStats: stats }));
  },
  toggleCommerceActive: async (commerceId: number) => {
    set(() => ({ isPendingToggleActive: true }));
    const newStatus = await commerceService.toggleCommerceActive(commerceId);
    set((prevState) => ({
      commercesWithOwner: prevState.commercesWithOwner.map((commerce) => {
        if (commerce.commerceId !== newStatus.commerceId) return commerce;
        return { ...commerce, businessActive: newStatus.active };
      }),
    }));
    set(() => ({ isPendingToggleActive: false }));
  },
  updateCommerceWithOwner: async ({
    commerceId,
    userId,
    formData,
  }: {
    commerceId: number;
    userId: number;
    formData: FormData;
  }) => {
    const commerceWithOwnerUpdated =
      await commerceService.updateCommerceWithOwner({
        commerceId,
        userId,
        formData,
      });
    set((prevState) => ({
      commercesWithOwner: prevState.commercesWithOwner.map((commerce) =>
        commerce.commerceId === commerceWithOwnerUpdated.commerceId
          ? commerceWithOwnerUpdated
          : commerce,
      ),
    }));
  },
}));
