import { create } from "zustand";

import type { AppError } from "@shared/types";
import { commerceService } from "@features/commerces/services/commerceService";
import type { UseCommerceStore } from "@features/commerces/stores/types";

let currentCommercePromise: Promise<void> | null = null;

export const useCommerceStore = create<UseCommerceStore>((set, get) => ({
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
    if (get().currentCommerce?.name) return;

    if (currentCommercePromise) {
      return currentCommercePromise;
    }

    currentCommercePromise = (async () => {
      try {
        const currentCommerce = await commerceService.getCurrentCommerce();
        set(() => ({ currentCommerce }));
      } catch (error) {
        currentCommercePromise = null;
        throw error;
      } finally {
        currentCommercePromise = null;
      }
    })();

    return currentCommercePromise;
  },
  toggleCommerceActive: async (commerceId: number) => {
    const newStatus = await commerceService.toggleCommerceActive(commerceId);
    set((prevState) => ({
      commercesWithOwner: prevState.commercesWithOwner.map((commerce) => {
        if (commerce.commerceId !== newStatus.commerceId) return commerce;
        return { ...commerce, businessActive: newStatus.active };
      }),
    }));
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

  patchCommerce: async (formData: FormData) => {
    const updatedCommerce = await commerceService.patchCommerce(formData);
    set(() => ({ currentCommerce: updatedCommerce }));
    return updatedCommerce;
  },
}));
