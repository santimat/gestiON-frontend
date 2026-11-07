import { executeApiCall } from "@shared/utils/apiClient";
import { backendAPI } from "@shared/services/axiosConfig";
import { parseOrThrow } from "@shared/utils/parseOrThrow";
import type { SaleRequest, SalesFilter } from "@features/sales/types";
import { SaleRequestSchema } from "@features/sales/schemas/SaleRequestSchema";

export const saleService = {
  createSale: async (sale: SaleRequest) => {
    const parsedData = parseOrThrow(SaleRequestSchema, sale);
    return executeApiCall(() => backendAPI.post("/sales", parsedData));
  },

  getSales: async (filters: SalesFilter) => {
    return executeApiCall(() =>
      backendAPI.get("/sales", { params: { ...filters, size: 20 } }),
    );
  },

  getSaleWithDetails: async (saleId: number) => {
    return executeApiCall(() => backendAPI.get(`/sales/${saleId}`));
  },
};
