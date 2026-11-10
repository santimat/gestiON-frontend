import z from "zod";

export const CategoryFiltersSchema = z.object({
  categoryId: z.coerce
    .number("El ID de la categoría debe ser un número")
    .int("El ID de la categoría debe ser un número entero")
    .positive("El ID de la categoría debe ser un número positivo")
    .optional(),
});
