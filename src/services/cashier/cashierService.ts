import { isAxiosError } from "axios";

import { CashierSchema } from "@/schemas";
import type { CashierRequest } from "@/types";
import { backendAPI } from "@/services/axios/axiosConfig";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import { handleZodParsingError } from "@/utils/handleZodParseError";

export const cashierService = {
  createCashier: async (cashier: CashierRequest) => {
    const parsedData = CashierSchema.safeParse(cashier);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.post("/users/cashiers", cashier);
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
    }
  },
  getCashiers: async () => {
    try {
      const {
        data: { content },
      } = await backendAPI.get("/cashiers");
      return { cashiers: content };
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
    }
  },
};
