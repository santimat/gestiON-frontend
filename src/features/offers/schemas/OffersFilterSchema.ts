import z from "zod";

export const OffersFilterSchema = z.object({
  paymentMethod: z
    .enum(["CASH", "CARD", "TRANSFER", "CREDIT_ACCOUNT"])
    .optional(),
  status: z.enum(["EXPIRED", "ACTIVE", "SCHEDULED"]).optional(),
});
