import { CommerceWithOwnerRequestSchema } from "@/schemas/commerce/CommerceWithOwnerRequestSchema";

export const CommerceWithOwnerUpdateSchema =
  CommerceWithOwnerRequestSchema.omit({ password: true });
