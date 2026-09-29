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
      const { data } = await backendAPI.post(
        "/commerces-users",
        commerceWithOwner,
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw handleAxiosErrors(error);
      }
    }
  },
};
