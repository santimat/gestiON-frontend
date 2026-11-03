import type { z } from "zod";

import { ClientSchema } from "@features/clients/schemas/ClientSchema";

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
