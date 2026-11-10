import type {
  Offer,
  OfferPaymentMethod,
  OfferRequest,
  OffersFilter,
} from "@features/offers/types";

export type UseOfferStore = {
  offers: Offer[];
  totalOffers: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  assignError: string | null;
  formOffer: Offer | null;
  isFormModalOpen: boolean;
  assignOffer: Offer | null;
  isAssignModalOpen: boolean;
  // filtros de la última búsqueda: al crear o editar refrescamos con los mismos
  lastFilters: OffersFilter;
  openCreate: () => void;
  openEdit: (offer: Offer) => void;
  closeFormModal: () => void;
  openAssign: (offer: Offer) => void;
  closeAssignModal: () => void;
  getOffers: (filters: OffersFilter) => Promise<void>;
  createOffer: (offer: OfferRequest) => Promise<Offer>;
  updateOffer: (offerId: number, offer: OfferRequest) => Promise<Offer>;
  assignOfferProducts: (offerId: number, productIds: number[]) => Promise<void>;
};

export type UseOfferPaymentMethodStore = {
  offerPaymentMethods: OfferPaymentMethod[];
  isLoading: boolean;
  error: string | null;
  getOfferPaymentMethods: () => Promise<void>;
};
