import z from "zod";
import { CommerceRequestSchema } from "./CreateCommerceSchema";
import { UserRequestSchema } from "./CreateUserSchema";

export const RegisterSchema = z.object({
  ...CommerceRequestSchema.shape,
  ...UserRequestSchema.shape,
});
