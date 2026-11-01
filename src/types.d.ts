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
export type {
  CommerceWithOwner,
  CommerceWithOwnerRequest,
  CommerceStats,
  CurrentCommerce,
} from "@/features/commerces/types";

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
export type { Client, ClientRequest } from "@/features/clients/types";

// CASHIER
export type { CashierRequest, CashierUpdate } from "@/features/cashiers/types";

// SELL POINT
export type { SellPoint, SellPointRequest } from "@/features/sell-points/types";

// SALE
export type {
  CartLine,
  SaleDraft,
  SaleRequest,
  SaleStatus,
  SaleDetail,
  Sale,
  SaleSummary,
  SalesFilter,
  PaymentMethod,
  DiscountType,
} from "@/features/sales/types";
