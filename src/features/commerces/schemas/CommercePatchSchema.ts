import z from "zod";

// PATCH /commerces: update parcial del comercio actual (OWNER)
export const CommercePatchSchema = z.object({
  name: z
    .string("El nombre del negocio debe ser un texto.")
    .trim()
    .min(1, "El nombre del negocio no puede estar vacío.")
    .max(100, "El nombre del negocio no puede superar los 100 caracteres.")
    .optional(),
  profitMultiplier: z.coerce
    .number("El multiplicador de ganancias debe ser un número.")
    .positive("El multiplicador de ganancias debe ser un número positivo.")
    .optional(),
  image: z
    .file("El archivo debe ser una imagen.")
    .max(10 * 1024 * 1024, "El tamaño máximo del archivo es de 10MB.")
    .mime(
      ["image/png", "image/jpeg", "image/webp"],
      "El archivo debe ser una imagen PNG, JPEG o WEBP.",
    )
    .optional()
    .nullable(),
});

export type CommercePatchRequest = z.infer<typeof CommercePatchSchema>;
