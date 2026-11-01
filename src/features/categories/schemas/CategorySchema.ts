import z from "zod";

export const CategorySchema = z.object({
  name: z
    .string()
    .nonempty("El nombre de la categoría es obligatorio")
    .max(50, "El nombre de la categoría no puede superar los 50 caracteres"),
  description: z
    .string()
    .max(
      200,
      "La descripción de la categoría no puede superar los 200 caracteres",
    )
    .optional(),
});
