import { isAxiosError } from "axios";

import { SellPointRequestSchema } from "@/schemas";
import { backendAPI } from "@/services/axiosConfig";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import type { SellPoint, SellPointRequest } from "@/types";
import { handleZodParsingError } from "@/utils/handleZodParseError";

export const sellPointService = {
  createSellPoint: async (sellPoint: SellPointRequest) => {
    const parsedData = SellPointRequestSchema.safeParse(sellPoint);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.post("/sell-points", parsedData.data);
      return data as SellPoint;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
  getSellPoints: async () => {
    try {
      const { data } = await backendAPI.get("/sell-points");
      const sellPoints: SellPoint[] = data?.content ?? [];
      const totalSellPoints: number = data?.page?.totalElements;

      return { sellPoints, totalSellPoints };
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
  toggleActive: async (sellPointId: number) => {
    try {
      const { data } = await backendAPI.patch(
        `/sell-points/${sellPointId}/toggle-active`,
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
};
