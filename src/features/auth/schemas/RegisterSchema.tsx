import z from "zod";

export const RegisterSchema = z.object({
  businessName: z.string().min(3).max(100),
});
