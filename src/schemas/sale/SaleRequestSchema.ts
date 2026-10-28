import z from "zod";

// el backend usa un Set para los detalles: sin productos duplicados (el carrito ya lo garantiza)
export const SaleRequestSchema = z
  .object({
    paymentMethod: z.enum(["CASH", "CARD", "TRANSFER", "CREDIT_ACCOUNT"], {
      message: "El método de pago es inválido",
    }),
    details: z
      .array(
        z.object({
          productId: z
            .number("El ID del producto debe ser un número")
            .int("El ID del producto debe ser un número entero")
            .positive("El ID del producto debe ser un número positivo"),
          quantity: z
            .number("La cantidad debe ser un número")
            .int("La cantidad debe ser un número entero")
            .min(1, "La cantidad debe ser al menos 1"),
        }),
      )
      .min(1, "Se requiere al menos un detalle"),
    // null = consumidor final
    clientId: z
      .number("El ID del cliente debe ser un número")
      .int("El ID del cliente debe ser un número entero")
      .positive("El ID del cliente debe ser un número positivo")
      .nullable()
      .optional(),
    observations: z
      .string("Las observaciones deben ser un texto")
      .max(200, "Las observaciones no pueden superar los 200 caracteres")
      .optional(),
    discountType: z
      .enum(["FIXED_AMOUNT", "PERCENTAGE"], {
        message: "El tipo de descuento es inválido",
      })
      .optional(),
    discount: z
      .number("El descuento debe ser un número")
      .gt(0, "El descuento debe ser mayor que cero")
      .optional(),
  })
  // el backend exige que el tipo y el monto vayan juntos: o ambos, o ninguno
  .refine(
    (sale) =>
      (sale.discountType !== undefined) === (sale.discount !== undefined),
    { message: "El descuento requiere su tipo, y el tipo requiere su monto" },
  );
