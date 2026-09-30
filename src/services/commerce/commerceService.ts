import { isAxiosError } from "axios";

import { backendAPI } from "@/services/axios/axiosConfig";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import { handleZodParsingError } from "@/utils/handleZodParseError";
import { CommerceWithOwnerRequestSchema } from "@/schemas/commerces/CommerceWithOwnerRequestSchema";

export const commerceService = {
  createCommerceWithOwner: async (commerceWithOwner: FormData) => {
    const objectToParse = Object.fromEntries(commerceWithOwner.entries());
    const parsedData = CommerceWithOwnerRequestSchema.safeParse(objectToParse);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.post("/commerces", commerceWithOwner);
      return data;
    } catch (error) {
      if (isAxiosError(error))
        throw handleAxiosErrors(error, {
          401: {
            type: "FORBIDDEN",
            message: "No estás autorizado a crear comercios.",
          },
        });
    }
  },
  getCommercesWithOwner: async () => {
    try {
      const {
        data: { content },
      } = await backendAPI.get("/commerces");
      return content;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
    }
  },
  getCommerceStats: async () => {
    try {
      const { data } = await backendAPI.get("/commerces/stats");
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
    }
  },
  toggleCommerceActive: async (commerceId: number) => {
    try {
      const { data } = await backendAPI.patch(`/commerces/${commerceId}`);
      return data;
    } catch (error) {
      if (isAxiosError(error))
        throw handleAxiosErrors(error, {
          401: {
            type: "FORBIDDEN",
            message:
              "No tienes permitido actualizara el estado de un comercio.",
          },
        });
    }
  },
};
