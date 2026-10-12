import z from "zod";

export const ProductSchema = z.object({
  name: z
    .string("El nombre debe ser un texto")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede superar los 50 caracteres"),
  description: z
    .string("La descripción debe ser un texto")
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .max(150, "La descripción no puede superar los 150 caracteres")
    .optional()
    .or(z.literal("")),
  costPrice: z.coerce
    .number("El precio de costo debe ser un número")
    .positive("El precio de costo debe ser un número positivo"),
  salePrice: z.coerce
    .number("El precio de venta debe ser un número")
    .positive("El precio de venta debe ser un número positivo"),
  categoryId: z.coerce
    .number("El ID de la categoría debe ser un número")
    .int("El ID de la categoría debe ser un número entero")
    .positive("El ID de la categoría debe ser un número positivo"),
  minStock: z.coerce
    .number("El stock mínimo debe ser un número")
    .int("El stock mínimo debe ser un número entero")
    .nonnegative("El stock mínimo debe ser un número no negativo"),
  currentStock: z.coerce
    .number("El stock actual debe ser un número")
    .int("El stock actual debe ser un número entero")
    .nonnegative("El stock actual debe ser un número no negativo"),
  image: z
    .file("El archivo debe ser una imagen")
    .max(10 * 1024 * 1024, "La imagen no puede superar los 10MB")
    .mime(
      ["image/png", "image/jpeg", "image/webp"],
      "El archivo debe ser una imagen PNG, JPEG o WEBP",
    )
    .optional()
    .nullable(),
});
