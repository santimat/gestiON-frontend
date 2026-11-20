import { useShallow } from "zustand/shallow";

import { useAuth } from "@features/auth";
import { useOfferStore } from "@features/offers/stores/useOfferStore";

export const useOffer = () => {
  const { authenticatedUser } = useAuth();
  const isOwner = authenticatedUser?.role === "OWNER";

  const {
    offers,
    totalOffers,
    totalPages,
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
      totalOffers: s.totalOffers,
      totalPages: s.totalPages,
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
    totalOffers,
    totalPages,
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
    canCreate: isOwner,
    canEdit: isOwner,
  };
};
