import type { z } from "zod";

import type { DiscountType } from "@features/sales";
import type { Category } from "@features/categories";
import { ProductSchema } from "@features/products/schemas/ProductSchema";
import { ProductFiltersSchema } from "@features/products/schemas/ProductFiltersSchema";

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
  offerId: number | null;
  category: Category;
  active: boolean;
  updatedAt: Date;
};

export type ProductWithOffer = Product & {
  offerValue: number | null;
  offerDiscountType: DiscountType | null;
  discountedPrice: number;
};

export type ProductForm = ProductRequest;

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
