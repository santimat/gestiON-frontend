import { create } from "zustand";

import type { AppError } from "@shared/types";
import type { UseOfferStore } from "@features/offers/stores/types";
import { offerService } from "@features/offers/services/offerService";

export const useOfferStore = create<UseOfferStore>((set, get) => ({
  offers: [],
  isLoading: false,
  error: null,
  formOffer: null,
  isFormModalOpen: false,
  assignOffer: null,
  isAssignModalOpen: false,
  lastFilters: {},
  openCreate: () => set({ formOffer: null, isFormModalOpen: true }),
  openEdit: (offer) => set({ formOffer: offer, isFormModalOpen: true }),

  openAssign: (offer) => set({ assignOffer: offer, isAssignModalOpen: true }),
  closeFormModal: () => set({ isFormModalOpen: false }),
  closeAssignModal: () => set({ isAssignModalOpen: false }),

  getOffers: async (filters) => {
    set({ isLoading: true, error: null, lastFilters: filters });
    try {
      const data = await offerService.getOffers(filters);
      set({ offers: data.content, isLoading: false, error: null });
    } catch (error) {
      const appError = error as AppError;
      set({ isLoading: false, error: appError.message });
    }
  },

  createOffer: async (offer) => {
    const createdOffer = await offerService.createOffer(offer);
    await get().getOffers(get().lastFilters);
    return createdOffer;
  },

  updateOffer: async (offerId, offer) => {
    const updatedOffer = await offerService.updateOffer(offerId, offer);
    await get().getOffers(get().lastFilters);
    return updatedOffer;
  },

  assignOfferProducts: async (offerId, productIds) => {
    set({ isLoading: true, error: null });
    try {
      await offerService.assignOfferProducts(offerId, productIds);
      await get().getOffers(get().lastFilters);
    } catch (error) {
      const appError = error as AppError;
      set({ error: appError.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
