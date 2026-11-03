import type { z } from "zod";

import { LoginSchema } from "@features/auth/schemas/LoginSchema";
import type { UserRole } from "@shared/types";

export type LoginDTO = z.infer<typeof LoginSchema>;

export type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  updatedAt: Date;
  role: UserRole;
  active: boolean;
  commerceId?: number;
};

export type AuthUser = Omit<User, "phoneNumber" | "updatedAt">;
