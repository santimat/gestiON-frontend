import z from "zod";
import type { LucideIcon } from "lucide-react";

import {
  LoginSchema,
  ProductSchema,
  CategorySchema,
  ClientSchema,
  CashierSchema,
  CommerceWithOwnerRequestSchema,
} from "@/schemas";
import type { ErrorDictionary } from "@/utils/errorDictionary";

// GENERAL TYPES
export type NavItem = {
  text: string;
  href: string;
  icon: LucideIcon;
};

export type ZodParseResult<T = unknown> = z.ZodSafeParseResult<T>;

export type AppError = {
  code: keyof typeof ErrorDictionary;
  message: string;
  fieldErrors?: FieldErrors;
};

export type FieldErrors = Record<string, string | undefined>;

// USER
export type LoginDTO = z.infer<typeof LoginSchema>;

export type UserRole = "OWNER" | "CASHIER" | "SUDO";

export type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  role: UserRole;
  active: boolean;
  commerceId?: number;
};

export type AuthUser = Omit<User, "phoneNumber" | "createdAt">;

// COMMERCE
export type CommerceWithOwner = {
  userId: number;
  commerceId: number;
  username: string;
  email: string;
  phoneNumber: string;
  businessName: string;
  cuit: string;
  address: string;
  businessLogoUrl: string;
  businessActive: boolean;
  profitMultiplier: number;
  updatedAt: Date;
};

export type CommerceWithOwnerRequest = z.infer<
  typeof CommerceWithOwnerRequestSchema
>;

export type CommerceStats = {
  total: number;
  active: number;
  inactive: number;
};

export type CurrentCommerce = {
  commerceId: number;
  businessName: string;
  businessLogoUrl: string;
  businessActive: boolean;
  profitMultiplier: number;
};

// PRODUCT
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

// CATEGORY
export type CategoryRequest = z.infer<typeof CategorySchema>;

export type Category = {
  id: number;
  name: string;
  description?: string;
};

// CLIENT
export type ClientRequest = z.infer<typeof ClientSchema>;

export type Client = {
  id: number;
  name: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  dni: string;
};

// CASHIER
export type CashierRequest = z.infer<typeof CashierSchema>;
export type CashierUpdate = z.infer<typeof CashierUpdateSchema>;

// SALE
export type PaymentMethod = "CASH" | "CARD" | "TRANSFER";

export type DiscountType = "monto" | "porcentaje";
