import { create } from "zustand";

import type {
  AppError,
  CommerceStats,
  CommerceWithOwner,
  CurrentCommerce,
} from "@/types";
import { commerceService } from "@/services/commerce/commerceService";

type UseCommerceStore = {
  // Estado de UI: modal de alta/edición de comercio
  formCommerce: CommerceWithOwner | null;
  isFormModalOpen: boolean;
  openEdit: (commerce: CommerceWithOwner) => void;
  openCreate: () => void;
  closeFormModal: () => void;

  commercesWithOwner: CommerceWithOwner[];
  commerceStats?: CommerceStats | null;
  currentCommerce?: CurrentCommerce | null;
  isPendingToggleActive: boolean;
  isLoading: boolean;
  error: string | null;
  createCommerceWithOwner: (commercesWithOwner: FormData) => Promise<void>;
  getCommercesWithOwner: () => Promise<void>;
  getCommerceStats: () => Promise<void>;
  getCurrentCommerce: () => Promise<void>;
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
  formCommerce: null,
  isFormModalOpen: false,
  openEdit: (commerce) =>
    set(() => ({ formCommerce: commerce, isFormModalOpen: true })),
  openCreate: () => set(() => ({ formCommerce: null, isFormModalOpen: true })),
  closeFormModal: () =>
    set(() => ({ formCommerce: null, isFormModalOpen: false })),

  commercesWithOwner: [],
  commerceStats: null,
  currentCommerce: null,
  isPendingToggleActive: false,
  isLoading: false,
  error: null,
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
    try {
      const commercesWOwner = await commerceService.getCommercesWithOwner();
      set(() => ({
        commercesWithOwner: commercesWOwner,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      const appError = error as AppError;
      set(() => ({ isLoading: false, error: appError.message }));
    }
  },
  getCommerceStats: async () => {
    const stats = await commerceService.getCommerceStats();
    set(() => ({ commerceStats: stats }));
  },
  getCurrentCommerce: async () => {
    const currentCommerce = await commerceService.getCurrentCommerce();
    set(() => ({ currentCommerce }));
  },
  toggleCommerceActive: async (commerceId: number) => {
    set(() => ({ isPendingToggleActive: true }));
    try {
      const newStatus = await commerceService.toggleCommerceActive(commerceId);
      set((prevState) => ({
        commercesWithOwner: prevState.commercesWithOwner.map((commerce) => {
          if (commerce.commerceId !== newStatus.commerceId) return commerce;
          return { ...commerce, businessActive: newStatus.active };
        }),
        isPendingToggleActive: false,
      }));
    } catch (error) {
      set(() => ({ isPendingToggleActive: false }));
      throw error;
    }
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
