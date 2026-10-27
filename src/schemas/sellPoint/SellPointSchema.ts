import z from "zod";

export const SellPointRequestSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre no puede superar los 100 caracteres"),
  cashierIds: z.array(z.number().int().positive()).optional().default([]),
});
