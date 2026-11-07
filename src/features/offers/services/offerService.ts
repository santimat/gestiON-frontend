import { OfferSchema } from "@features/offers/schemas/OfferSchema";
import type { OfferRequest, OffersFilter } from "@features/offers/types";
import { backendAPI } from "@shared/services/axiosConfig";
import { executeApiCall } from "@shared/utils/apiClient";
import { parseOrThrow } from "@shared/utils/parseOrThrow";

export const offerService = {
  getOffers: async (filters: OffersFilter) => {
    // el backend pagina en 10 por defecto y no tenemos UI de paginación
    return executeApiCall(() =>
      backendAPI.get("/offers", { params: { ...filters, size: 20 } }),
    );
  },

  createOffer: async (offer: OfferRequest) => {
    const parsedData = parseOrThrow(OfferSchema, offer);
    return executeApiCall(() => backendAPI.post("/offers", parsedData));
  },

  // el PUT lo consume apenas exista el controller en el backend
  updateOffer: async (offerId: number, offer: OfferRequest) => {
    const parsedData = parseOrThrow(OfferSchema, offer);
    return executeApiCall(() =>
      backendAPI.put(`/offers/${offerId}`, parsedData),
    );
  },
};
