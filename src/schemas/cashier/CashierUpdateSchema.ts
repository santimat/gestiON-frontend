import z from "zod";

import { CashierSchema } from "@/schemas/cashier/CashierSchema";

export const CashierUpdateSchema = CashierSchema.extend({
  // en edición la contraseña es opcional: si queda vacía no se envía y el
  // cajero conserva la que ya tiene
  password: z
    .string("La contraseña debe ser un texto")
    .max(50, "La contraseña no puede superar los 50 caracteres")
    .optional(),
});
