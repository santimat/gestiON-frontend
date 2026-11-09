import { useShallow } from "zustand/shallow";

import { useOfferPaymentMethodStore } from "@features/offers/stores/useOfferPaymentMethodStore";

export const useOfferPaymentMethod = () => {
  const { offerPaymentMethods, isLoading, error, getOfferPaymentMethods } =
    useOfferPaymentMethodStore(
      useShallow((s) => ({
        offerPaymentMethods: s.offerPaymentMethods,
        isLoading: s.isLoading,
        error: s.error,
        getOfferPaymentMethods: s.getOfferPaymentMethods,
      })),
    );

  return {
    offerPaymentMethods,
    isLoading,
    error,
    getOfferPaymentMethods,
  };
};
