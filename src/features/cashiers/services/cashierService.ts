import type { User } from "@features/auth";
import { executeApiCall } from "@shared/utils/apiClient";
import { backendAPI } from "@shared/services/axiosConfig";
import { parseOrThrow } from "@shared/utils/parseOrThrow";
import { CashierSchema } from "@features/cashiers/schemas/CashierSchema";
import type { CashierRequest, CashierUpdate } from "@features/cashiers/types";
import { CashierUpdateSchema } from "@features/cashiers/schemas/CashierUpdateSchema";

export const cashierService = {
  createCashier: async (cashier: CashierRequest) => {
    parseOrThrow(CashierSchema, cashier);
    return executeApiCall(() => backendAPI.post("/cashiers", cashier));
  },
  updateCashier: async (userId: number, cashier: CashierUpdate) => {
    // si la contraseña quedó vacía no se envía: el backend conserva la actual
    parseOrThrow(CashierUpdateSchema, cashier);
    const data = await executeApiCall(() =>
      backendAPI.put(`/cashiers/${userId}`, cashier),
    );
    return data as User;
  },
  getCashiers: async () => {
    const data = await executeApiCall(() => backendAPI.get("/cashiers"));
    const cashiers: User[] = data?.content ?? [];
    const totalCashiers: number =
      data?.totalElements ?? data?.page?.totalElements ?? cashiers.length;

    return { cashiers, totalCashiers };
  },
  toggleActive: async (userId: number) => {
    return executeApiCall(() =>
      backendAPI.patch(`/cashiers/${userId}/toggle-active`),
    );
  },
};
