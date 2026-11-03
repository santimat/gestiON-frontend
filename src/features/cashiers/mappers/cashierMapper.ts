import type { User } from "@features/auth";
import type { CashierRequest } from "@features/cashiers/types";

export const cashierMapper = {
  toForm: (cashier: User): CashierRequest => ({
    name: cashier.name,
    email: cashier.email,
    password: "",
    phoneNumber: cashier.phoneNumber,
  }),
};
