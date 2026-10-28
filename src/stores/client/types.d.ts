import type { Client, ClientRequest } from "@/types";

export type UseClientStore = {
  // Estado de UI: modal de alta/edición de cliente
  formClient: Client | null;
  isFormModalOpen: boolean;
  openEdit: (client: Client) => void;
  openCreate: () => void;
  closeFormModal: () => void;

  clients: Client[];
  totalClients: number;
  isLoading: boolean;
  error: string | null;
  createClient: (client: ClientRequest) => Promise<void>;
  getClients: () => Promise<void>;
  updateClient: (clientId: number, client: ClientRequest) => Promise<void>;
};
