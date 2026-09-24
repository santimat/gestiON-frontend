import { isAxiosError } from "axios";

import type { CommerceDTO } from "@/types";
import { backendAPI } from "@/services/axios/axiosConfig";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import { handleZodParsingError } from "@/utils/handleZodParseError";
import { CommerceRequestSchema } from "@/schemas/CreateCommerceSchema";

export const commerceService = {
  createCommerce: async (commerce: CommerceDTO) => {
    const parsedCommerce = CommerceRequestSchema.safeParse(commerce);
    handleZodParsingError(parsedCommerce);

    try {
      const { data } = await backendAPI.post("/commerces", parsedCommerce);
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw handleAxiosErrors(error);
      }
    }
  },
};
