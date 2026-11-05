import type { z } from "zod";

import { ProductSchema } from "@features/products/schemas/ProductSchema";
import { ProductFiltersSchema } from "@features/products/schemas/ProductFiltersSchema";
import type { Category } from "@features/categories";

export type ProductRequest = z.infer<typeof ProductSchema>;

export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  costPrice: number;
  salePrice: number;
  minStock: number;
  currentStock: number;
  profitMultiplier: number;
  category: Category;
  active: boolean;
  updatedAt: Date;
};

export type ProductForm = ProductRequest;

/**
 * Estado del formulario de producto: en creación parte de DEFAULT_PRODUCT_FORM
 * con null en los campos numéricos todavía no escritos, y al editar recibe
 * productMapper.toForm. ProductForm (el request) es asignable a este tipo.
 */
export type ProductFormValues = {
  name: string;
  description?: string;
  categoryId: number | null;
  costPrice: number | null;
  salePrice: number | null;
  profitMultiplier?: number | null;
  currentStock: number | null;
  minStock: number | null;
  image?: File | null;
};

export type ProductFieldErrors = Partial<
  Record<
    | "name"
    | "description"
    | "categoryId"
    | "image"
    | "costPrice"
    | "salePrice"
    | "profitMultiplier"
    | "currentStock"
    | "minStock",
    string
  >
>;

export type ProductFilters = z.infer<typeof ProductFiltersSchema>;
