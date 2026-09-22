import z from "zod";

export const LoginSchema = z.object({
  email: z.email("Formato inválido.").nonempty("El Email es obligatorio"),
  password: z
    .string()
    .min(3, "La contraseña debe contener al menos 6 caracteres.")
    .nonempty("Debes ingresar una contraseña"),
});
