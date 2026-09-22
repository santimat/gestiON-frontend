import { isAxiosError } from "axios";

import type { RegisterDTO } from "@/types";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import { handleZodParsingError } from "@/utils/handleZodParseError";
import { backendAPI } from "../axios/axiosConfig";
import { CommerMapper } from "@/mappers/CommerceMapper";

export const commerceService = {
  createCommerce: async (rawData: RegisterDTO) => {
    const parsedCommerce = RegisterSchema.safeParse(rawData);
    handleZodParsingError(parsedCommerce);

    const parsedData = CommerMapper.toCommerceRequest(parsedCommerce);

    try {
      const { data } = await backendAPI.post("/commerces", parsedData);
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw handleAxiosErrors(error);
      }
    }
  },
};
