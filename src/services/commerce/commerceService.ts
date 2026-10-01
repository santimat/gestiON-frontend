import { isAxiosError } from "axios";

import { backendAPI } from "@/services/axios/axiosConfig";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import { handleZodParsingError } from "@/utils/handleZodParseError";
import { CommerceWithOwnerRequestSchema } from "@/schemas/commerces/CommerceWithOwnerRequestSchema";
import { CommerceWithOwnerUpdateSchema } from "@/schemas/commerces/CommerceWithOwnerUpdateSchema";

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
  updateCommerceWithOwner: async ({
    commerceId,
    userId,
    formData,
  }: {
    commerceId: number;
    userId: number;
    formData: FormData;
  }) => {
    const dataToparse = Object.fromEntries(formData);
    const parsedData = CommerceWithOwnerUpdateSchema.safeParse(dataToparse);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.put(
        `/commerces/${commerceId}/user/${userId}`,
        formData,
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
    }
  },
};
