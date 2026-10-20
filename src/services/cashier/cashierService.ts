import { isAxiosError } from "axios";

import { CashierSchema } from "@/schemas";
import type { CashierRequest, User } from "@/types";
import { backendAPI } from "@/services/axios/axiosConfig";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import { handleZodParsingError } from "@/utils/handleZodParseError";

export const cashierService = {
  createCashier: async (cashier: CashierRequest) => {
    const parsedData = CashierSchema.safeParse(cashier);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.post("/cashiers", cashier);
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
  getCashiers: async () => {
    try {
      const { data } = await backendAPI.get("/cashiers");
      const cashiers: User[] = data?.content ?? [];
      const totalCashiers: number =
        data?.totalElements ?? data?.page?.totalElements ?? cashiers.length;

      return { cashiers, totalCashiers };
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
  toggleActive: async (userId: number) => {
    try {
      const { data } = await backendAPI.patch(
        `/cashiers/${userId}/toggle-active`,
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
};
