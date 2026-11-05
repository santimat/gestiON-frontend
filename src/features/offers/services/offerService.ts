import { isAxiosError } from "axios";

import { backendAPI } from "@shared/services/axiosConfig";
import { OfferSchema } from "@features/offers/schemas/OfferSchema";
import { handleAxiosErrors } from "@shared/utils/handleAxiosError";
import type { OfferRequest, OffersFilter } from "@features/offers/types";
import { handleZodParsingError } from "@shared/utils/handleZodParseError";

export const offerService = {
  getOffers: async (filters: OffersFilter) => {
    try {
      const { data } = await backendAPI.get("/offers", {
        // el backend pagina en 10 por defecto y no tenemos UI de paginación
        params: { ...filters, size: 100 },
      });
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },

  createOffer: async (offer: OfferRequest) => {
    const parsedData = OfferSchema.safeParse(offer);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.post("/offers", parsedData.data);
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },

  // el PUT lo consume apenas exista el controller en el backend
  updateOffer: async (offerId: number, offer: OfferRequest) => {
    const parsedData = OfferSchema.safeParse(offer);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.put(
        `/offers/${offerId}`,
        parsedData.data,
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
};
