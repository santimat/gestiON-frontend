import type {
  CashierFilters,
  CashierRequest,
  CashierUpdate,
} from "@features/cashiers/types";
import type { User } from "@features/auth";

export type UseCashierStore = {
  // Estado de UI: modal de alta/edición de cajero
  formCashier: User | null;
  isFormModalOpen: boolean;
  openEdit: (cashier: User) => void;
  openCreate: () => void;
  closeFormModal: () => void;

  totalCashiers: number;
  totalPages: number;
  // filtros de la última búsqueda: al crear refrescamos con los mismos
  lastFilters: CashierFilters;
  cashiers: User[];
  isLoading: boolean;
  error: string | null;
  createCashier: (cashier: CashierRequest) => Promise<void>;
  getCashiers: (filters?: CashierFilters) => Promise<void>;
  updateCashier: ({
    cashierId,
    cashier,
  }: {
    cashierId: number;
    cashier: CashierUpdate;
  }) => Promise<void>;
  toggleActive: (userId: number) => Promise<void>;
};
