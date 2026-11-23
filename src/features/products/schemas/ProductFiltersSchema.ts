import z from "zod";
import { FiltersBaseSchema } from "@shared/schemas/FiltersBaseSchema";
import { STOCK_STATUS } from "@features/products/constants";

export const ProductFiltersSchema = z.object({
  searchText: z.string().trim().optional(),
  categoryId: z.coerce
    .number("El ID de la categoría debe ser un número")
    .int("El ID de la categoría debe ser un número entero")
    .positive("El ID de la categoría debe ser un número positivo")
    .optional(),
  stockStatus: z.enum(STOCK_STATUS).optional(),
  ...FiltersBaseSchema.shape,
});
