import { create } from "zustand";

import type {
  CommerceStats,
  CommerceWithOwnerDTO,
  CommerceWithOwnerForm,
} from "@/types";
import { commerceService } from "@/services/commerce/commerceService";

type UseCommerceStore = {
  commercesWithOwner: CommerceWithOwnerDTO[] | [];
  commerceStats: CommerceStats | null;
  editingCommerce: number | null;
  startEditing: (commerceId: number) => void;
  createCommerceWithOwner: (commercesWithOwner: FormData) => Promise<void>;
  getCommercesWithOwner: () => Promise<void>;
  getCommerceStats: () => Promise<void>;
  toggleCommerceActive: (commerceId: number) => Promise<void>;
  getEditingCommerce: () => CommerceWithOwnerForm;
};

export const useCommerceStore = create<UseCommerceStore>((set, get) => ({
  commercesWithOwner: [],
  commerceStats: null,
  editingCommerce: null,
  startEditing: (commerceId: number) => {
    set(() => ({ editingCommerce: commerceId }));
  },
  getEditingCommerce: () => {
    const commerceId = get().editingCommerce;
    const commerceWithOwner = get().commercesWithOwner.find(
      (commerce) => commerce.commerceId === commerceId,
    );
    return {
      userId: commerceWithOwner?.userId,
      commerceId: commerceWithOwner?.commerceId,
      username: commerceWithOwner?.username,
      email: commerceWithOwner?.email,
      phoneNumber: commerceWithOwner?.phoneNumber,
      businessName: commerceWithOwner?.businessName,
      cuit: commerceWithOwner?.cuit,
      address: commerceWithOwner?.address,
      businessLogo: null,
    } as CommerceWithOwnerForm;
  },
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
