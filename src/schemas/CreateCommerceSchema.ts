import z from "zod";

export const CommerceRequestSchema = z.object({
  businessName: z
    .string("Formato inválido.")
    .min(3, "La razón social debe tener un minimo de 3 caracteres.")
    .max(100, "La razón social debe tener menos de 100 caracteres."),
  address: z
    .string("La dirección debe ser un string.")
    .min(3, "La dirección debe contener al menos 3 caracteres.")
    .max(100, "La dirección debe contener menos de 100 caracteres."),
  cuit: z
    .string("Formato inválido.")
    .min(3, "El CUIT debe contener al menos 3 caracteres."),
});
