import z from "zod";
import type { LucideIcon } from "lucide-react";

import {
  LoginSchema,
  ProductSchema,
  CategorySchema,
  CommerceWithOwnerRequestSchema,
} from "@/schemas";
import type { ErrorDictionary } from "@/utils/errorDictionary";

// GENERAL TYPES
export type NavItem = {
  text: string;
  href: string;
  icon: LucideIcon;
};

export type ZodIssue = z.core.$ZodIssue;
export type ZodParseResult = z.ZodSafeParseResult<z.output<typeof schema>>;

export type AppError = {
  code: keyof typeof ErrorDictionary;
  message: string;
  fieldErrors?: FieldErrors;
};

export type FormFields =
  | "email"
  | "password"
  | "name"
  | "address"
  | "businessName"
  | "phoneNumber"
  | "cuit";
export type FieldErrors = Optional<Record<FormFields, string>>;

export type PageableSpringBootResponse = {
  content: [];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
};

// USER
export type LoginDTO = z.infer<typeof LoginSchema>;

type UserRole = "OWNER" | "CASHIER" | "SUDO";
export type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  role: UserRole;
  active: boolean;
};

export type AuthUser = Omit<User, "phoneNumber" | "createdAt"> & {
  commerceId: number;
};

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

export type ProductForm = {
  name: string;
  description: string;
  categoryId: string;
  costPrice: number;
  salePrice: number;
  currentStock: number;
  minStock: number;
  image: File | null;
};

// CATEGORY
export type CategoryRequest = z.infer<typeof CategorySchema>;

export type Category = {
  id: number;
  name: string;
  description?: string;
};
