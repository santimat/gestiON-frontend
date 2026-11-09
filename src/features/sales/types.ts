import z from "zod";

import {
  SaleRequestSchema,
  DiscountTypeSchema,
} from "@features/sales/schemas/SaleRequestSchema";
import { SalesFilterSchema } from "@features/sales/schemas/SalesFilterSchema";
import { SALE_STATUS } from "@features/sales/constants";

export const SaleStatusSchema = z.enum(SALE_STATUS);

export type CartLine = {
  productId: number;
  name: string;
  salePrice: number;
  // snapshot del stock al agregar: el refetch del buscador no muta el carrito
  currentStock: number;
  qty: number;
};

export type PaymentMethod = z.infer<
  typeof SaleRequestSchema.shape.paymentMethod
>;

export type DiscountType = z.infer<typeof DiscountTypeSchema>;

export type SaleDraft = {
  discount: number;
  discountType: DiscountType;
  paymentMethod: PaymentMethod;
  // null = consumidor final
  clientId: number | null;
};

export type SaleRequest = z.infer<typeof SaleRequestSchema>;

export type SaleStatus = z.infer<typeof SaleStatusSchema>;

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
  sellPointName: string;
  userName: string;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discountType: DiscountType | null;
  discount: number | null;
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

export type PendingSalesWithDetails = {
  pendingSalesCount: number;
  totalPending: number;
  pendingSales: Sale[];
};
