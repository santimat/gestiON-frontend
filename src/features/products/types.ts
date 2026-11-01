import type { z } from "zod";

import { ProductSchema } from "./schemas/ProductSchema";
import { ProductFiltersSchema } from "./schemas/ProductFiltersSchema";
import type { Category } from "@/features/categories";

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

export type ProductFieldErrors = Partial<
  Record<
    | "name"
    | "description"
    | "categoryId"
    | "image"
    | "costPrice"
    | "salePrice"
    | "currentStock"
    | "minStock",
    string
  >
>;

export type ProductFilters = z.infer<typeof ProductFiltersSchema>;
