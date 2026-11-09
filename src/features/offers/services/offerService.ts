import { OfferSchema } from "@features/offers/schemas/OfferSchema";
import type { OfferRequest, OffersFilter } from "@features/offers/types";
import { backendAPI } from "@shared/services/axiosConfig";
import { executeApiCall } from "@shared/utils/apiClient";
import { parseOrThrow } from "@shared/utils/parseOrThrow";

export const offerService = {
  getOffers: async (filters: OffersFilter) => {
    return executeApiCall(() =>
      backendAPI.get("/offers", { params: { ...filters, size: 20 } }),
    );
  },

  createOffer: async (offer: OfferRequest) => {
    const parsedData = parseOrThrow(OfferSchema, offer);

    return executeApiCall(() => backendAPI.post("/offers", parsedData));
  },

  updateOffer: async (offerId: number, offer: OfferRequest) => {
    const parsedData = parseOrThrow(OfferSchema, offer);
    return executeApiCall(() =>
      backendAPI.put(`/offers/${offerId}`, parsedData),
    );
  },

  assignOfferProducts: async (offerId: number, productIds: number[]) => {
    return executeApiCall(() =>
      backendAPI.put(`/offers/${offerId}/products`, { productIds }),
    );
  },

  getOfferPaymentMethods: async () => {
    return executeApiCall(() => backendAPI.get("/offers/payment-methods"));
  },
};
