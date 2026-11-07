import { SaleRequestSchema } from "@features/sales/schemas/SaleRequestSchema";
import type { SaleRequest, SalesFilter } from "@features/sales/types";
import { backendAPI } from "@shared/services/axiosConfig";
import { executeApiCall } from "@shared/utils/apiClient";
import { parseOrThrow } from "@shared/utils/parseOrThrow";

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
