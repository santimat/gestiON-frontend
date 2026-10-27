import { isAxiosError } from "axios";

import { SaleRequestSchema } from "@/schemas";
import { backendAPI } from "@/services/axiosConfig";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import { handleZodParsingError } from "@/utils/handleZodParseError";
import type { Sale, SaleRequest } from "@/types";

export const saleService = {
  createSale: async (sale: SaleRequest) => {
    const parsedData = SaleRequestSchema.safeParse(sale);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.post("/sales", parsedData.data);
      return data as Sale;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
};
