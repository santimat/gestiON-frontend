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
  address: string;
  businessLogoUrl: string;
  businessActive: boolean;
  createdAt: Date;
};

// PRODUCT

export type Product = z.infer<typeof ProductSchema> & {
  id: number;
  category: string;
  active: boolean;
};
