import { ClientSchema } from "@features/clients/schemas/ClientSchema";
import type { ClientFilters, ClientRequest } from "@features/clients/types";
import { backendAPI } from "@shared/services/axiosConfig";
import { executeApiCall } from "@shared/utils/apiClient";
import { parseOrThrow } from "@shared/utils/parseOrThrow";

export const clientService = {
  createClient: async (client: ClientRequest) => {
    parseOrThrow(ClientSchema, client);
    return executeApiCall(() => backendAPI.post("/clients", client));
  },
  updateClient: async (clientId: number, client: ClientRequest) => {
    parseOrThrow(ClientSchema, client);
    return executeApiCall(() => backendAPI.put(`/clients/${clientId}`, client));
  },
  getClients: async (filters?: ClientFilters) => {
    return executeApiCall(() =>
      backendAPI.get("/clients", { params: filters }),
    );
  },
};
