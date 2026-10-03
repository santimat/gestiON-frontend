import z from "zod";
import type { LucideIcon } from "lucide-react";

import { LoginSchema } from "@/schemas/users/LoginSchema";
import { ProductSchema } from "@/schemas/products/ProductSchema";

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

export type CommerceWithOwnerForm = Omit<
  CommerceWithOwnerDTO,
  "createdAt" | "businessActive" | "businessLogoUrl" | "updatedAt"
> & { businessLogo: File | null; password?: string };

export type CommerceStats = {
  total: number;
  active: number;
  inactive: number;
};

// PRODUCT

export type ProductDTO = z.infer<typeof ProductSchema>;

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
