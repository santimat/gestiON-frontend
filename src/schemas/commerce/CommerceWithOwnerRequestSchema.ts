import z from "zod";

import { UserRequestSchema } from "@/schemas/user/UserSchema";
import { CommerceRequestSchema } from "@/schemas/commerce/CommerceSchema";

export const CommerceWithOwnerRequestSchema = z.object({
  ...CommerceRequestSchema.shape,
  ...UserRequestSchema.shape,
});
