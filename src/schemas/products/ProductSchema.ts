import z from "zod";

export const ProductSchema = z.object({
  name: z.string().min(3).max(50).nonempty(),
  description: z.string().min(3).max(150).nonempty(),
  costPrice: z.number().min(0).nonnegative(),
  salePrice: z.number().min(0).nonnegative(),
  categoryId: z.number().int().positive(),
  minStock: z.number().int().min(0).nonnegative(),
  currentStock: z.number().int().min(0).nonnegative(),
});
