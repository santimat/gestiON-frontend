import { create } from "zustand";

import type { AppError } from "@shared/types";
import { offerService } from "@features/offers/services/offerService";
import type { UseOfferStore } from "@features/offers/stores/types";

export const useOfferStore = create<UseOfferStore>((set, get) => ({
  offers: [],
  isLoading: false,
  error: null,
  formOffer: null,
  isFormModalOpen: false,
  lastFilters: {},
  openCreate: () => set({ formOffer: null, isFormModalOpen: true }),
  openEdit: (offer) => set({ formOffer: offer, isFormModalOpen: true }),
  // el modal sigue montado durante el fade de salida: solo apagamos el flag
  closeFormModal: () => set({ isFormModalOpen: false }),

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
    // refrescamos para respetar el orden por fecha de fin y el filtro activo
    await get().getOffers(get().lastFilters);
    return createdOffer;
  },

  updateOffer: async (offerId, offer) => {
    const updatedOffer = await offerService.updateOffer(offerId, offer);
    await get().getOffers(get().lastFilters);
    return updatedOffer;
  },
}));
