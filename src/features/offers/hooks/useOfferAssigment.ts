import { useShallow } from "zustand/shallow";

import { useOfferStore } from "@features/offers/stores/useOfferStore";
import { useProduct } from "@features/products/hooks/useProduct";

export const useOfferAssigment = () => {
  const {
    assignOffer,
    isAssignModalOpen,
    openAssign,
    closeAssignModal,
    assignOfferProducts,
    isLoading: isOffersLoading,
    error: offerError,
  } = useOfferStore(
    useShallow((s) => ({
      assignOffer: s.assignOffer,
      isAssignModalOpen: s.isAssignModalOpen,
      openAssign: s.openAssign,
      closeAssignModal: s.closeAssignModal,
      assignOfferProducts: s.assignOfferProducts,
      isLoading: s.isLoading,
      error: s.error,
    })),
  );

  const {
    products,
    isLoading: isLoadingProducts,
    error: productsError,
    getProducts,
  } = useProduct();

  return {
    assignOffer,
    isAssignModalOpen,
    openAssign,
    closeAssignModal,
    assignOfferProducts,
    isOffersLoading,
    offerError,
    products,
    isLoadingProducts,
    productsError,
    getProducts,
  };
};
