import z from "zod";

export const OfferSchema = z
  .object({
    discountType: z.enum(["FIXED_AMOUNT", "PERCENTAGE"], {
      message: "El tipo de descuento es inválido",
    }),
    value: z
      .number("El valor debe ser un número")
      .gt(0, "El valor debe ser mayor a 0"),
    startDate: z.string().nonempty("La fecha de inicio es obligatoria"),
    endDate: z.string().nonempty("La fecha de fin es obligatoria"),
    paymentMethods: z.array(
      z.enum(["CASH", "CARD", "TRANSFER", "CREDIT_ACCOUNT"], {
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
  // las fechas llegan como ISO ("YYYY-MM-DDTHH:mm:ss"): el orden lexicográfico
  // coincide con el orden cronológico, así que se pueden comparar como texto
  .refine((offer) => offer.endDate >= offer.startDate, {
    message: "La fecha de fin debe ser posterior a la de inicio",
    path: ["endDate"],
  });
