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
  isEditing: boolean;
  isPendingToggleActive: boolean;
  startEditing: (commerceId: number) => void;
  endEditing: () => void;
  createCommerceWithOwner: (commercesWithOwner: FormData) => Promise<void>;
  getCommercesWithOwner: () => Promise<void>;
  getCommerceStats: () => Promise<void>;
  toggleCommerceActive: (commerceId: number) => Promise<void>;
  getEditingCommerce: () => CommerceWithOwnerForm;
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

export const useCommerceStore = create<UseCommerceStore>((set, get) => ({
  commercesWithOwner: [],
  commerceStats: null,
  editingCommerce: null,
  isEditing: false,
  isPendingToggleActive: false,
  startEditing: (commerceId: number) => {
    set(() => ({ editingCommerce: commerceId, isEditing: true }));
  },
  endEditing: () => set(() => ({ editingCommerce: null, isEditing: false })),
  getEditingCommerce: () => {
    const { editingCommerce: commerceId, commercesWithOwner } = get();
    const commerceWithOwner = commercesWithOwner.find(
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
