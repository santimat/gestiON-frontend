import z from "zod";

export const CashierSchema = z.object({
  name: z
    .string("El nombre debe ser un texto")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede superar los 50 caracteres"),
  email: z
    .email("El formato del email es inválido")
    .nonempty("El email es obligatorio"),
  password: z
    .string("La contraseña debe ser un texto")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(50, "La contraseña no puede superar los 50 caracteres"),
  phoneNumber: z
    .string("El número de teléfono debe ser un texto")
    .min(10, "El número de teléfono debe tener al menos 10 caracteres")
    .max(20, "El número de teléfono no puede superar los 20 caracteres"),
});
