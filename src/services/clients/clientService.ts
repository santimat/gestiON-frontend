import { isAxiosError } from "axios";

import { ClientSchema } from "@/schemas";
import type { ClientRequest } from "@/types";
import { backendAPI } from "@/services/axios/axiosConfig";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import { handleZodParsingError } from "@/utils/handleZodParseError";

export const clientService = {
  createClient: async (client: ClientRequest) => {
    const parsedData = ClientSchema.safeParse(client);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.post("/clients", client);
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
    }
  },
  updateClient: async (clientId: number, client: ClientRequest) => {
    const parsedData = ClientSchema.safeParse(client);
    handleZodParsingError(parsedData);

    try {
      const { data } = await backendAPI.put(`/clients/${clientId}`, client);
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
    }
  },
  getClients: async () => {
    try {
      const { data } = await backendAPI.get("/clients");
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
    }
  },
};
