import z from "zod";

// Convierte un string de fecha en formato Mantine ("YYYY-MM-DD HH:mm:ss")
// u otro ISO válido a un ISO-8601 absoluto en UTC puro. No se aplica ninguna
// conversión de zona horaria: el valor se interpreta directamente como UTC.
function toUtcIso(value: string): string {
  return new Date(value).toISOString();
}

function isValidDate(value: string): boolean {
  const normalized = value.trim().replace(" ", "T");
  const withOffset = /[zZ]|[+-]\d{2}:?\d{2}$/.test(normalized)
    ? normalized
    : `${normalized}Z`;
  return !Number.isNaN(new Date(withOffset).getTime());
}

export const OfferSchema = z
  .object({
    discountType: z.enum(["FIXED_AMOUNT", "PERCENTAGE"], {
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
  );
