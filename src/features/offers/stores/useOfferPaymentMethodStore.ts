import { create } from "zustand";

import type { AppError } from "@shared/types";
import { offerService } from "@features/offers/services/offerService";
import type { UseOfferPaymentMethodStore } from "@features/offers/stores/types";

export const useOfferPaymentMethodStore = create<UseOfferPaymentMethodStore>(
  (set) => ({
    offerPaymentMethods: [],
    isLoading: false,
    error: null,

    getOfferPaymentMethods: async () => {
      set({ isLoading: true, error: null });
      try {
        const data = await offerService.getOfferPaymentMethods();
        set({ offerPaymentMethods: data ?? [], error: null });
      } catch (error) {
        const appError = error as AppError;
        set({ error: appError.message });
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },
  }),
);
