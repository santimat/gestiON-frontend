import z from "zod";

export const SalesFilterSchema = z.object({
  searchText: z.string().trim().optional(),
  status: z.enum(["PAY", "PENDING"]).optional(),
  paymentMethod: z
    .enum(["CASH", "CARD", "TRANSFER", "CREDIT_ACCOUNT"])
    .optional(),
});
