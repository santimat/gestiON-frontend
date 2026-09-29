import z from "zod";

import { UserRequestSchema } from "@/schemas/users/UserRequestSchema";
import { CommerceRequestSchema } from "@/schemas/commerces/CommerceRequestSchema";

export const CommerceWithOwnerRequestSchema = z.object({
  ...CommerceRequestSchema.shape,
  ...UserRequestSchema.shape,
});
