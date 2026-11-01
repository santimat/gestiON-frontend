import type { CashierRequest, User } from "@/types";

export const cashierMapper = {
  toForm: (cashier: User): CashierRequest => ({
    name: cashier.name,
    email: cashier.email,
    password: "",
    phoneNumber: cashier.phoneNumber,
  }),
};
