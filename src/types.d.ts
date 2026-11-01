import z from "zod";

import {
  ClientSchema,
  CashierSchema,
  CommerceWithOwnerRequestSchema,
  CashierUpdateSchema,
  SellPointRequestSchema,
  SaleRequestSchema,
  SalesFilterSchema,
} from "@/schemas";

// GENERAL TYPES
export type {
  NavItem,
  UserRole,
  ZodParseResult,
  AppError,
  FieldErrors,
} from "@/shared/types";

// USER
export type { LoginDTO, User, AuthUser } from "@/features/auth/types";

// COMMERCE
export type CommerceWithOwner = {
  userId: number;
  commerceId: number;
  username: string;
  email: string;
  phoneNumber: string;
  name: string;
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
  id: number;
  name: string;
  businessLogoUrl: string;
  businessActive: boolean;
  profitMultiplier: number;
};

// PRODUCT
export type {
  ProductRequest,
  Product,
  ProductForm,
  ProductFieldErrors,
  ProductFilters,
} from "@/features/products/types";

// CATEGORY
export type { Category, CategoryRequest } from "@/features/categories/types";

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
  clientName: string;
  sellPointId: number;
  userName: string;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discountType: DiscountType | null;
  discount: number;
  total: number;
  createdAt: Date;
  observations: string | null;
  status: SaleStatus;
  details: SaleDetail[];
};

export type SaleSummary = {
  id: number;
  itemCount: number;
  status: SaleStatus;
  clientName: string | null;
  paymentMethod: PaymentMethod;
  createdAt: string;
  total: number;
};

export type SalesFilter = z.infer<typeof SalesFilterSchema>;

export type PaymentMethod = "CASH" | "CARD" | "TRANSFER" | "CREDIT_ACCOUNT";

export type DiscountType = "FIXED_AMOUNT" | "PERCENTAGE";
