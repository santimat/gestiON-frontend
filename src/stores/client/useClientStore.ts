import { create } from "zustand";

import type { AppError, ClientRequest } from "@/types";
import { clientService } from "@/services/clientService";
import type { UseClientStore } from "@/stores/client/types";

export const useClientStore = create<UseClientStore>((set) => ({
  formClient: null,
  isFormModalOpen: false,
  openEdit: (client) =>
    set(() => ({ formClient: client, isFormModalOpen: true })),
  openCreate: () => set(() => ({ formClient: null, isFormModalOpen: true })),
  closeFormModal: () =>
    set(() => ({ formClient: null, isFormModalOpen: false })),

  clients: [],
  totalClients: 0,
  isLoading: false,
  error: null,
  createClient: async (client: ClientRequest) => {
    await clientService.createClient(client);
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
