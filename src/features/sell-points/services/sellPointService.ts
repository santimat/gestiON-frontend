import type { User } from "@features/auth";
import { executeApiCall } from "@shared/utils/apiClient";
import { backendAPI } from "@shared/services/axiosConfig";
import { parseOrThrow } from "@shared/utils/parseOrThrow";
import type { SellPoint, SellPointRequest } from "@features/sell-points/types";
import { SellPointRequestSchema } from "@features/sell-points/schemas/SellPointSchema";
import { toPageParams } from "@shared/utils/pagination";
import type { SellPointFilters } from "@features/sell-points/types";

export const sellPointService = {
  createSellPoint: async (sellPoint: SellPointRequest) => {
    const parsedData = parseOrThrow(SellPointRequestSchema, sellPoint);
    const data = await executeApiCall(() =>
      backendAPI.post("/sell-points", parsedData),
    );
    return data as SellPoint;
  },

  updateSellPoint: async (sellPointId: number, sellPoint: SellPointRequest) => {
    const parsedData = parseOrThrow(SellPointRequestSchema, sellPoint);
    const data = await executeApiCall(() =>
      backendAPI.put(`/sell-points/${sellPointId}`, parsedData),
    );
    return data as SellPoint;
  },

  getSellPoints: async (filters?: SellPointFilters) => {
    const data = await executeApiCall(() =>
      backendAPI.get("/sell-points", { params: toPageParams(filters ?? {}) }),
    );
    const sellPoints: SellPoint[] = data?.content ?? [];
    const totalSellPoints: number = data?.page?.totalElements ?? 0;
    const totalPages: number = data?.page?.totalPages ?? 0;

    return { sellPoints, totalSellPoints, totalPages };
  },

  getSellPointCashiers: async (sellPointId: number) => {
    const data = await executeApiCall(() =>
      backendAPI.get(`/sell-points/${sellPointId}/cashiers`),
    );
    return data?.content as User[];
  },

  toggleActive: async (sellPointId: number) => {
    return executeApiCall(() =>
      backendAPI.patch(`/sell-points/${sellPointId}/toggle-active`),
    );
  },
};
