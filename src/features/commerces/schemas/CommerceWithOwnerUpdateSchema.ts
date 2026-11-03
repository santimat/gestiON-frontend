import { CommerceWithOwnerRequestSchema } from "@features/commerces/schemas/CommerceWithOwnerRequestSchema";

export const CommerceWithOwnerUpdateSchema =
  CommerceWithOwnerRequestSchema.omit({ password: true });
