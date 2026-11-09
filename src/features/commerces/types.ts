import type { z } from "zod";

import { CommerceWithOwnerRequestSchema } from "@features/commerces/schemas/CommerceWithOwnerRequestSchema";

export type CommerceWithOwner = {
  userId: number;
  commerceId: number;
  username: string;
  email: string;
  phoneNumber: string;
  name: string;
  cuit: string;
  address: string;
  businessLogoUrl: string;
  businessActive: boolean;
  profitMultiplier: number;
  updatedAt: Date;
};

export type CommerceWithOwnerRequest = z.infer<
  typeof CommerceWithOwnerRequestSchema
>;

export type CommerceStats = {
  total: number;
  active: number;
  inactive: number;
};

export type CurrentCommerce = {
  id: number;
  name: string;
  businessLogoUrl: string;
  businessImage: File | null;
  businessActive: boolean;
  profitMultiplier: number;
};
