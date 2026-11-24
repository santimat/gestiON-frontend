import { create } from "zustand";

import type { AppError } from "@shared/types";
import type { UseOfferStore } from "@features/offers/stores/types";
import { offerService } from "@features/offers/services/offerService";
import type { OffersFilter } from "../types";

export const useOfferStore = create<UseOfferStore>((set, get) => ({
  offers: [],
  totalOffers: 0,
  totalPages: 0,
  isLoading: false,
  error: null,
  assignError: null,
  formOffer: null,
  isFormModalOpen: false,
  assignOffer: null,
  isAssignModalOpen: false,
  assignedProductIds: [],
  isLoadingAssignedProductIds: false,
  assignedProductIdsError: null,
  lastFilters: {},
  openCreate: () => set({ formOffer: null, isFormModalOpen: true }),
  openEdit: (offer) => set({ formOffer: offer, isFormModalOpen: true }),

  openAssign: (offer) =>
    set({
      assignOffer: offer,
      isAssignModalOpen: true,
      assignedProductIds: [],
      assignedProductIdsError: null,
    }),
  closeFormModal: () => set({ isFormModalOpen: false }),
  closeAssignModal: () => set({ isAssignModalOpen: false }),

  getOffers: async (filters: OffersFilter) => {
    set({ isLoading: true, error: null, lastFilters: filters });
    try {
      const data = await offerService.getOffers(filters);
      set({
        offers: data.content,
        totalOffers: data.page?.totalElements ?? 0,
        totalPages: data.page?.totalPages ?? 0,
        isLoading: false,
        error: null,
      });
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

  getOfferProductIds: async (offerId) => {
    set({ isLoadingAssignedProductIds: true, assignedProductIdsError: null });
    try {
      const productIds = await offerService.getOfferProductIds(offerId);
      set({
        assignedProductIds: productIds,
        isLoadingAssignedProductIds: false,
      });
    } catch (error) {
      const appError = error as AppError;
      set({
        isLoadingAssignedProductIds: false,
        assignedProductIdsError:
          appError.message ?? "Error al obtener los productos de la oferta",
      });
    }
  },

  assignOfferProducts: async (offerId, productIds) => {
    set({ isLoading: true, assignError: null });
    try {
      await offerService.assignOfferProducts(offerId, productIds);
      await get().getOffers(get().lastFilters);
    } catch (error) {
      const appError = error as AppError;
      set({ assignError: appError.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
