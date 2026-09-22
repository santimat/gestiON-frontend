import z from "zod";

export const UserRequestSchema = z.object({
  name: z
    .string("Formato inválido")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres")
    .nonempty("El nombre es obligatorio"),
  email: z
    .email("Formato de email inválido")
    .nonempty("El email es obligatorio"),
  password: z
    .string("Formato inválido")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .nonempty("La contraseña es obligatoria"),
  phoneNumber: z
    .string("Formato inválido")
    .min(10, "El número de teléfono debe tener al menos 10 caracteres")
    .max(20, "El número de teléfono no puede tener más de 20 caracteres"),
});
