import type { User } from "@features/auth";
import { executeApiCall } from "@shared/utils/apiClient";
import { backendAPI } from "@shared/services/axiosConfig";
import { parseOrThrow } from "@shared/utils/parseOrThrow";
import { CashierSchema } from "@features/cashiers/schemas/CashierSchema";
import type {
  CashierFilters,
  CashierRequest,
  CashierUpdate,
} from "@features/cashiers/types";
import { CashierUpdateSchema } from "@features/cashiers/schemas/CashierUpdateSchema";
import { toPageParams } from "@shared/utils/pagination";

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
  getCashiers: async (filters?: CashierFilters) => {
    const data = await executeApiCall(() =>
      backendAPI.get("/cashiers", { params: toPageParams(filters ?? {}) }),
    );
    const cashiers: User[] = data?.content ?? [];
    const totalCashiers: number =
      data?.totalElements ?? data?.page?.totalElements ?? cashiers.length;
    const totalPages: number = data?.page?.totalPages ?? 0;

    return { cashiers, totalCashiers, totalPages };
  },
  toggleActive: async (userId: number) => {
    return executeApiCall(() =>
      backendAPI.patch(`/cashiers/${userId}/toggle-active`),
    );
  },
};
