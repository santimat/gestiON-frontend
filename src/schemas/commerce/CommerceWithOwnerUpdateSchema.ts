import { CommerceWithOwnerRequestSchema } from "./CommerceWithOwnerRequestSchema";

export const CommerceWithOwnerUpdateSchema =
  CommerceWithOwnerRequestSchema.omit({ password: true });
