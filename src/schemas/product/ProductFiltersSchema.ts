import z from "zod";

// filtros de GET /products; los query params siempre llegan como strings, por eso coerce
export const ProductFiltersSchema = z.object({
  searchText: z.string().trim().optional(),
  categoryId: z.coerce
    .number("El ID de la categoría debe ser un número")
    .int("El ID de la categoría debe ser un número entero")
    .positive("El ID de la categoría debe ser un número positivo")
    .optional(),
  page: z.coerce
    .number("La página debe ser un número")
    .int("La página debe ser un número entero")
    .nonnegative("La página no puede ser negativa")
    .optional(),
  size: z.coerce
    .number("El tamaño de página debe ser un número")
    .int("El tamaño de página debe ser un número entero")
    .positive("El tamaño de página debe ser positivo")
    .optional(),
  sortBy: z.string().optional(),
  sortDir: z.enum(["asc", "desc"]).optional(),
});
