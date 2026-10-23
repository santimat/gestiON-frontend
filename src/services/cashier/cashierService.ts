import { isAxiosError } from "axios";

import { CashierSchema, CashierUpdateSchema } from "@/schemas";
import type { CashierRequest, CashierUpdate, User } from "@/types";
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
  updateCashier: async (userId: number, cashier: CashierUpdate) => {
    // si la contraseña quedó vacía no se envía: el backend conserva la actual
    const cashierToUpdate = Object.fromEntries(
      Object.entries(cashier).filter(([, value]) => value !== ""),
    );
    const parsedData = CashierUpdateSchema.safeParse(cashierToUpdate);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.put(
        `/cashiers/${userId}`,
        cashierToUpdate,
      );
      return data as User;
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
