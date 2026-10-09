import z from "zod";

export const CommerceRequestSchema = z.object({
  commerceId: z
    .number()
    .int("El ID del comercio debe ser un número entero.")
    .positive("El ID del comercio debe ser un número positivo.")
    .optional(),
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
  businessLogo: z
    .file("El archivo debe ser una imagen.")
    .max(10 * 1024 * 1024, "El tamaño máximo del archivo es de 10MB.")
    .mime(
      ["image/png", "image/jpeg", "image/webp"],
      "El archivo debe ser una imagen PNG, JPEG o WEBP.",
    )
    .optional()
    .nullable(),
});
