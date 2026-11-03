import type { z } from "zod";

import { SaleRequestSchema } from "@features/sales/schemas/SaleRequestSchema";
import { SalesFilterSchema } from "@features/sales/schemas/SalesFilterSchema";

export type CartLine = {
  productId: number;
  name: string;
  salePrice: number;
  // snapshot del stock al agregar: el refetch del buscador no muta el carrito
  currentStock: number;
  qty: number;
};

export type PaymentMethod = "CASH" | "CARD" | "TRANSFER" | "CREDIT_ACCOUNT";

export type DiscountType = "FIXED_AMOUNT" | "PERCENTAGE";

export type SaleDraft = {
  discount: number;
  discountType: DiscountType;
  paymentMethod: PaymentMethod;
  // null = consumidor final
  clientId: number | null;
};

export type SaleRequest = z.infer<typeof SaleRequestSchema>;

export type SaleStatus = "PAYED" | "PENDING";

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
  subtotal: number;
  discount: number;
  discountType: string;
  total: number;
};

export type SalesFilter = z.infer<typeof SalesFilterSchema>;
