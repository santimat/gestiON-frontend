import { CommerceRequestSchema } from "@/schemas/CreateCommerceSchema";
import type { CommerceDTO } from "@/types";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import { handleZodParsingError } from "@/utils/handleZodParseError";
import { isAxiosError } from "axios";

export const commerceService = {
  createCommerce: async (rawData: CommerceDTO) => {
    const parsedCommerce = CommerceRequestSchema.safeParse(rawData);
    handleZodParsingError(parsedCommerce);

    try {
    } catch (error) {
      if (isAxiosError(error)) {
        throw handleAxiosErrors(error);
      }
    }
  },
};
