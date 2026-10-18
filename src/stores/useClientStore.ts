import { create } from "zustand";

import type { AppError, Client, ClientRequest } from "@/types";
import { clientService } from "@/services/clients/clientService";

type UseClientStore = {
  clients: Client[];
  totalClients: number;
  isLoading: boolean;
  error: string | null;
  createClient: (client: ClientRequest) => Promise<void>;
  getClients: () => Promise<void>;
  updateClient: (clientId: number, client: ClientRequest) => Promise<void>;
};

export const useClientStore = create<UseClientStore>((set) => ({
  clients: [],
  totalClients: 0,
  isLoading: false,
  error: null,
  createClient: async (client: ClientRequest) => {
    const newClient = await clientService.createClient(client);
    set((prevState) => ({
      clients: [...prevState.clients, newClient],
    }));
  },
  updateClient: async (clientId: number, client: ClientRequest) => {
    const updatedClient = await clientService.updateClient(clientId, client);
    set((prevState) => ({
      clients: prevState.clients.map((client) =>
        client.id === updatedClient.id
          ? { ...client, ...updatedClient }
          : client,
      ),
    }));
  },
  getClients: async () => {
    set({ isLoading: true });
    try {
      const data = await clientService.getClients();
      set(() => ({
        clients: data?.content,
        totalClients: data?.page.totalElements,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      const appError = error as AppError;
      set({ isLoading: false, error: appError.message });
      throw error;
    }
  },
}));
