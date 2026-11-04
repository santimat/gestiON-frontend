import type { Offer, OfferRequest, OffersFilter } from "@features/offers/types";

export type UseOfferStore = {
  offers: Offer[];
  isLoading: boolean;
  error: string | null;
  formOffer: Offer | null;
  isFormModalOpen: boolean;
  // filtros de la última búsqueda: al crear o editar refrescamos con los mismos
  lastFilters: OffersFilter;
  openCreate: () => void;
  openEdit: (offer: Offer) => void;
  closeFormModal: () => void;
  getOffers: (filters: OffersFilter) => Promise<void>;
  createOffer: (offer: OfferRequest) => Promise<Offer>;
  updateOffer: (offerId: number, offer: OfferRequest) => Promise<Offer>;
};
