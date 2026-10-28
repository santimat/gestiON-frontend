import type { CashierRequest, CashierUpdate, User } from "@/types";

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
  isPendingToggleActive: boolean;
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
