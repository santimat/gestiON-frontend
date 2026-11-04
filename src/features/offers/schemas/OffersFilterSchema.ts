import z from "zod";

// expired del backend: "true" = vencidas, "false" = no vencidas (incluye las
// programadas, solo compara la fecha de fin) y ausente = todas.
// Va como string porque es un parámetro de la URL.
export const OffersFilterSchema = z.object({
  expired: z.enum(["true", "false"]).optional(),
});
