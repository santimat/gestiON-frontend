import z from "zod";

import { UserRequestSchema } from "@/features/auth";
import { CommerceRequestSchema } from "./CommerceSchema";

export const CommerceWithOwnerRequestSchema = z.object({
  ...CommerceRequestSchema.shape,
  ...UserRequestSchema.shape,
});
