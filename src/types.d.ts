import z from "zod";
import type { LucideIcon } from "lucide-react";

import { LoginSchema } from "@/schemas/LoginSchema";
import type { UserRequestSchema } from "@/schemas/CreateUserSchema";
import type { ProductSchema } from "@/schemas/products/ProductSchema";
import type { CommerceRequestSchema } from "@/schemas/CreateCommerceSchema";

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
type UserDTO = z.infer<typeof UserRequestSchema> & { commerceId: number };

type UserRole = "OWNER" | "CASHIER" | "SUDO";
type UserStatus = "ACTIVE" | "INACTIVE";
export type User = UserDTO & { id: number };
export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

// COMMERCE
export type CommerceDTO = z.infer<typeof CommerceRequestSchema>;
export type Commerce = CommerceDTO & { id: number; logoUrl?: string };

// PRODUCT
export enum ProductStatus {
  ACTIVE,
  INACTIVE,
}
export type Product = z.infer<typeof ProductSchema> & {
  id: number;
  category: string;
  status: ProductStatus;
};

// Create commerce and user
export type RegisterDTO = CommerceDTO & Omit<UserDTO, "commerceId">;
