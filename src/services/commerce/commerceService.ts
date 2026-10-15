import { isAxiosError } from "axios";

import {
  CommerceWithOwnerUpdateSchema,
  CommerceWithOwnerRequestSchema,
} from "@/schemas";
import { backendAPI } from "@/services/axios/axiosConfig";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import { handleZodParsingError } from "@/utils/handleZodParseError";

export const commerceService = {
  createCommerceWithOwner: async (commerceWithOwner: FormData) => {
    const objectToParse = Object.fromEntries(commerceWithOwner.entries());
    const parsedData = CommerceWithOwnerRequestSchema.safeParse(objectToParse);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.post("/commerces", commerceWithOwner);
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
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
      throw error;
    }
  },
  getCommerceStats: async () => {
    try {
      const { data } = await backendAPI.get("/commerces/stats");
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
  getCurrentCommerce: async () => {
    try {
      const { data } = await backendAPI.get("/commerces/current");
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
  toggleCommerceActive: async (commerceId: number) => {
    try {
      const { data } = await backendAPI.patch(
        `/commerces/${commerceId}/toggle-active`,
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
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
    const dataToparse = { ...Object.fromEntries(formData), commerceId, userId };
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
      throw error;
    }
  },
};
