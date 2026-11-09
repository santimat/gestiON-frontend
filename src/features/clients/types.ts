import type { z } from "zod";

import { ClientFiltersSchema } from "@features/clients/schemas/ClientFiltersSchema";
import { ClientSchema } from "@features/clients/schemas/ClientSchema";

export type ClientFilters = z.infer<typeof ClientFiltersSchema>;

export type ClientRequest = z.infer<typeof ClientSchema>;

export type Client = {
  id: number;
  name: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  dni: string;
  updatedAt: Date;
};
