import type { CashierRequest, CashierUpdate } from "@features/cashiers/types";
import type { User } from "@features/auth";

export type UseCashierStore = {
  // Estado de UI: modal de alta/edición de cajero
  formCashier: User | null;
  isFormModalOpen: boolean;
  openEdit: (cashier: User) => void;
  openCreate: () => void;
  closeFormModal: () => void;

  totalCashiers: number;
  cashiers: User[];
  isLoading: boolean;
  error: string | null;
  createCashier: (cashier: CashierRequest) => Promise<void>;
  getCashiers: () => Promise<void>;
  updateCashier: ({
    cashierId,
    cashier,
  }: {
    cashierId: number;
    cashier: CashierUpdate;
  }) => Promise<void>;
  toggleActive: (userId: number) => Promise<void>;
};
