import { isAxiosError } from "axios";

import { SaleRequestSchema } from "@features/sales/schemas/SaleRequestSchema";
import { backendAPI } from "@shared/services/axiosConfig";
import { handleAxiosErrors } from "@shared/utils/handleAxiosError";
import type { SaleRequest, SalesFilter } from "@features/sales/types";
import { handleZodParsingError } from "@shared/utils/handleZodParseError";

export const saleService = {
  createSale: async (sale: SaleRequest) => {
    const parsedData = SaleRequestSchema.safeParse(sale);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.post("/sales", parsedData.data);
      return data;
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

  getSaleWithDetails: async (saleId: number) => {
    try {
      const { data } = await backendAPI.get(`/sales/${saleId}`);
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
};
