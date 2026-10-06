import z from "zod";
import type { LucideIcon } from "lucide-react";

import { LoginSchema } from "@/schemas/user/LoginSchema";
import type { DEFAULT_COMMERCE_WITH_OWNER } from "@/utils/constants";

// GENERAL TYPES
export type NavItem = {
  text: string;
  href: string;
  icon: LucideIcon;
};

export type ZodIssue = z.core.$ZodIssue;
export type ZodParseResult = z.ZodSafeParseResult<z.output<typeof schema>>;

export type AppError = {
  type:
    | "VALIDATION_ERROR"
    | "NETWORK_ERROR"
    | "INVALID_CREDENTIALS"
    | "FORBIDDEN"
    | "ALREADY_EXISTS"
    | "BAD_REQUEST"
    | "NOT_FOUND"
    | "DUPLICATE_RESOURCE"
    | "UNKNOWN";
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

// USER
export type LoginDTO = z.infer<typeof LoginSchema>;

type UserRole = "OWNER" | "CASHIER" | "SUDO";
export type User = {
  id: number;
  name: username;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  role: UserRole;
  active: boolean;
};

export type AuthUser = Omit<User, "phoneNumber" | "createdAt">;

// COMMERCE
export type CommerceWithOwnerDTO = {
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
  updatedAt: Date;
};

export type CommerceWithOwnerForm = typeof DEFAULT_COMMERCE_WITH_OWNER;

export type CommerceStats = {
  total: number;
  active: number;
  inactive: number;
};

// PRODUCT

export type ProductDTO = {
  name: string;
  image: File | null;
  description: string;
  costPrice: number;
  categoryId: number;
  minStock: number;
  currentStock: number;
};

export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  costPrice: number;
  salePrice: number;
  minStock: number;
  currentStock: number;
  category: string;
  active: boolean;
};

export type ProductForm = typeof DEFAULT_PRODUCT_FORM;

// CATEGORY
export type CategoryDTO = {
  name: string;
};

export type Category = {
  id: number;
  name: string;
};
