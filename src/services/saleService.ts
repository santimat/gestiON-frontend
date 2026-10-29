import { isAxiosError } from "axios";

import { SaleRequestSchema } from "@/schemas";
import { backendAPI } from "@/services/axiosConfig";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import type { Sale, SaleRequest, SalesFilter } from "@/types";
import { handleZodParsingError } from "@/utils/handleZodParseError";

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

  getSales: async (filters: SalesFilter) => {
    try {
      const { data } = await backendAPI.get("/sales", {
        params: filters,
      });
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
};
