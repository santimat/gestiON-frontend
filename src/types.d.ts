import z from "zod";
import type { LucideIcon } from "lucide-react";

import {
  LoginSchema,
  ProductSchema,
  ProductFiltersSchema,
  CategorySchema,
  ClientSchema,
  CashierSchema,
  CommerceWithOwnerRequestSchema,
  CashierUpdateSchema,
  SellPointRequestSchema,
  SaleRequestSchema,
} from "@/schemas";
import type { ErrorDictionary } from "@/utils/errorDictionary";

// GENERAL TYPES
export type NavItem = {
  text: string;
  // etiqueta corta para la barra de navegación inferior en mobile
  short: string;
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
  updatedAt: Date;
  role: UserRole;
  active: boolean;
  commerceId?: number;
};

export type AuthUser = Omit<User, "phoneNumber" | "updatedAt">;

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

export type ProductFilters = z.infer<typeof ProductFiltersSchema>;

// CATEGORY
export type CategoryRequest = z.infer<typeof CategorySchema>;

export type Category = {
  id: number;
  name: string;
  description?: string;
  updatedAt: Date;
  productCount: number;
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
  updatedAt: Date;
};

// CASHIER
export type CashierRequest = z.infer<typeof CashierSchema>;
export type CashierUpdate = z.infer<typeof CashierUpdateSchema>;

// SELL POINT
export type SellPoint = {
  id: number;
  name: string;
  commerceId: number;
  active: boolean;
  cashierIds?: number[];
  updatedAt: Date;
};

export type SellPointRequest = z.infer<typeof SellPointRequestSchema>;

// SALE
export type CartLine = {
  productId: number;
  name: string;
  salePrice: number;
  // snapshot del stock al agregar: el refetch del buscador no muta el carrito
  currentStock: number;
  qty: number;
};

export type SaleDraft = {
  discount: number;
  discountType: DiscountType;
  paymentMethod: PaymentMethod;
  // null = consumidor final
  clientId: number | null;
};

export type SaleRequest = z.infer<typeof SaleRequestSchema>;

export type SaleStatus = "PAY" | "PENDING";

export type SaleDetail = {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
};

export type Sale = {
  id: number;
  clientId: number | null;
  sellPointId: number;
  userName: string;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  total: number;
  createdAt: Date;
  observations: string | null;
  status: SaleStatus;
  details: SaleDetail[];
};

export type PaymentMethod = "CASH" | "CARD" | "TRANSFER" | "CREDIT_ACCOUNT";

export type DiscountType = "monto" | "porcentaje";
