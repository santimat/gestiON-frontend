import z from "zod";

import { FiltersBaseSchema } from "@shared/schemas/FiltersBaseSchema";

// campos por los que GET /categories permite ordenar (SortableProperties.CATEGORY)
export const CATEGORY_SORTABLE_FIELDS = [
  "id",
  "name",
  "active",
  "createdAt",
  "updatedAt",
] as const;

// parámetros de GET /categories: búsqueda remota por nombre + paginación.
// `active` se omite porque el backend no filtra categorías por estado.
export const CategorySearchSchema = z.object({
  categoryName: z.string().trim().optional(),
  ...FiltersBaseSchema.omit({ active: true }).shape,
  sortBy: z.enum(CATEGORY_SORTABLE_FIELDS).optional(),
});
