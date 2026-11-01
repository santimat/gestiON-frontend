import z from "zod";

import { UserRequestSchema } from "@/features/auth";
import { CommerceRequestSchema } from "@/schemas/commerce/CommerceSchema";

export const CommerceWithOwnerRequestSchema = z.object({
  ...CommerceRequestSchema.shape,
  ...UserRequestSchema.shape,
});
