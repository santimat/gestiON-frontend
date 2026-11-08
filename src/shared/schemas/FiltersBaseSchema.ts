import z from "zod";

export const SORT_DIRECTIONS = ["asc", "desc"] as const;

export const FiltersBaseSchema = z.object({
  size: z.coerce
    .number("El tamaño de página debe ser un número")
    .int("El tamaño de página debe ser un número entero")
    .positive("El tamaño de página debe ser positivo")
    .optional(),
  page: z.coerce
    .number("La página debe ser un número")
    .int("La página debe ser un número entero")
    .nonnegative("La página no puede ser negativa")
    .optional(),
  sortBy: z.string().optional(),
  sortDir: z.enum(SORT_DIRECTIONS).optional(),
  active: z.boolean("El estado debe ser un booleano").optional(),
});
