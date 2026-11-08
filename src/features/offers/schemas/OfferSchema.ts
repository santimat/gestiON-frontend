import z from "zod";

import { DISCOUNT_TYPES, PAYMENT_METHODS } from "@features/sales";

function normalizeOfferDate(value: string): string {
  return value.trim().replace(" ", "T");
}

function isValidDate(value: string): boolean {
  return !Number.isNaN(new Date(normalizeOfferDate(value)).getTime());
}

function toUtcIso(value: string): string {
  return new Date(normalizeOfferDate(value)).toISOString();
}

export const OfferSchema = z
  .object({
    discountType: z.enum(DISCOUNT_TYPES, {
      message: "El tipo de descuento es inválido",
    }),
    value: z
      .number("El valor debe ser un número")
      .gt(0, "El valor debe ser mayor a 0"),
    startDate: z
      .string()
      .nonempty("La fecha de inicio es obligatoria")
      .refine(isValidDate, {
        message: "La fecha de inicio es inválida",
        path: ["startDate"],
      })
      .transform(toUtcIso),
    endDate: z
      .string()
      .nonempty("La fecha de fin es obligatoria")
      .refine(isValidDate, {
        message: "La fecha de fin es inválida",
        path: ["endDate"],
      })
      .transform(toUtcIso),
    paymentMethods: z.array(
      z.enum(PAYMENT_METHODS, {
        message: "El método de pago es inválido",
      }),
    ),
  })
  .refine(
    (offer) => offer.discountType !== "PERCENTAGE" || offer.value <= 100,
    {
      message: "El porcentaje no puede superar 100",
      path: ["value"],
    },
  )
  .refine((offer) => offer.endDate >= offer.startDate, {
    message: "La fecha de fin debe ser posterior a la de inicio",
    path: ["endDate"],
  });
