import type { z } from "zod";

import type { DiscountType, PaymentMethod } from "@features/sales";
import { OfferSchema } from "@features/offers/schemas/OfferSchema";
import { OffersFilterSchema } from "@features/offers/schemas/OffersFilterSchema";

export type OfferRequest = z.infer<typeof OfferSchema>;

export type OffersFilter = z.infer<typeof OffersFilterSchema>;

export type OfferStatus = "VIGENTE" | "PROGRAMADA" | "VENCIDA";

export type Offer = {
  id: number;
  // puede venir null mientras el backend no exponga el campo
  discountType: DiscountType | null;
  value: number;
  // ISO "YYYY-MM-DDTHH:mm:ss" en horario local, tal cual lo devuelve el backend
  startDate: string;
  endDate: string;
  paymentMethods: PaymentMethod[];
};

// el formulario trabaja con fechas "YYYY-MM-DD" (lo que admite el input date)
// y el valor como texto, porque el input lo devuelve incompleto mientras se escribe
export type OfferFormValues = {
  discountType: DiscountType;
  value: string;
  startDate: string;
  endDate: string;
  paymentMethods: PaymentMethod[];
};
