import { useShallow } from "zustand/shallow";

import { useOfferStore } from "@features/offers/stores/useOfferStore";

export const useOffer = () => {
  const {
    offers,
    formOffer,
    isFormModalOpen,
    isLoading,
    error,
    getOffers,
    createOffer,
    updateOffer,
    openCreate,
    openEdit,
    closeFormModal,
  } = useOfferStore(
    useShallow((s) => ({
      offers: s.offers,
      formOffer: s.formOffer,
      isFormModalOpen: s.isFormModalOpen,
      isLoading: s.isLoading,
      error: s.error,
      getOffers: s.getOffers,
      createOffer: s.createOffer,
      updateOffer: s.updateOffer,
      openCreate: s.openCreate,
      openEdit: s.openEdit,
      closeFormModal: s.closeFormModal,
    })),
  );

  return {
    offers,
    formOffer,
    isFormModalOpen,
    isLoading,
    error,
    getOffers,
    createOffer,
    updateOffer,
    openCreate,
    openEdit,
    closeFormModal,
  };
};
