import { executeApiCall } from "@shared/utils/apiClient";
import { backendAPI } from "@shared/services/axiosConfig";
import { parseOrThrow } from "@shared/utils/parseOrThrow";
import type {
  SaleRequest,
  SalesFilter,
  SaleStatus,
} from "@features/sales/types";
import { SaleRequestSchema } from "@features/sales/schemas/SaleRequestSchema";

export const saleService = {
  getPendingSalesWithDetailsByClient: async (clientId: number) => {
    return executeApiCall(() =>
      backendAPI.get(`/clients/${clientId}/pending-sales-with-details`),
    );
  },

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

  markSalePaid: async (saleId: number) => {
    return executeApiCall<{ id: number; status: SaleStatus }>(() =>
      backendAPI.patch(`/sales/${saleId}/mark-paid`),
    );
  },
};
