import { isAxiosError } from "axios";

import { CashierSchema } from "@/schemas";
import type { CashierRequest } from "@/types";
import { backendAPI } from "@/services/axios/axiosConfig";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import { handleZodParsingError } from "@/utils/handleZodParseError";

export const userService = {
  createCashier: async (cashier: CashierRequest) => {
    const parsedData = CashierSchema.safeParse(cashier);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.post("/users/cashiers", cashier);
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
  toggleActive: async (userId: number) => {
    try {
      const { data } = await backendAPI.patch(`/users/${userId}/toggle-active`);
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
  getCashiers: async () => {
    try {
      const { data } = await backendAPI.get("/users/cashiers");
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
};
