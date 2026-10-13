import z from "zod";

export const ClientSchema = z.object({
  name: z
    .string("El nombre debe ser un texto")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(20, "El nombre no puede superar los 20 caracteres"),
  lastName: z
    .string("El apellido debe ser un texto")
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(20, "El apellido no puede superar los 20 caracteres"),
  address: z
    .string("La dirección debe ser un texto")
    .min(2, "La dirección debe tener al menos 2 caracteres")
    .max(50, "La dirección no puede superar los 50 caracteres"),
  phoneNumber: z
    .string("El número de teléfono debe ser un texto")
    .min(2, "El número de teléfono debe tener al menos 2 caracteres")
    .max(20, "El número de teléfono no puede superar los 20 caracteres"),
  dni: z
    .string("El DNI debe ser un texto")
    .min(2, "El DNI debe tener al menos 2 caracteres")
    .max(20, "El DNI no puede superar los 20 caracteres")
    .regex(/^\d+$/, "El DNI solo puede contener números"),
});
