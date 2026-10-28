import { create } from "zustand";

import type { AppError } from "@/types";
import { commerceService } from "@/services/commerceService";
import type { UseCommerceStore } from "@/stores/commerce/types";

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
    await commerceService.createCommerceWithOwner(commercesWithOwner);
  },
  getCommercesWithOwner: async () => {
    set(() => ({ isLoading: true }));
    try {
      const commercesWOwner = await commerceService.getCommercesWithOwner();
      set(() => ({
        commercesWithOwner: commercesWOwner,
        error: null,
      }));
    } catch (error) {
      const appError = error as AppError;
      set(() => ({ error: appError.message }));
    } finally {
      set(() => ({ isLoading: false }));
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
