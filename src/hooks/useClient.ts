import { useShallow } from "zustand/shallow";

import type { ClientRequest } from "@/types";
import { useClientStore } from "@/stores/client/useClientStore";

export const useClient = () => {
  const {
    clients,
    totalClients,
    isLoading,
    error,
    formClient,
    isFormModalOpen,
    createClient,
    getClients,
    updateClient,
    openEdit,
    openCreate,
    closeFormModal,
  } = useClientStore(
    useShallow((s) => ({
      clients: s.clients,
      totalClients: s.totalClients,
      isLoading: s.isLoading,
      error: s.error,
      formClient: s.formClient,
      isFormModalOpen: s.isFormModalOpen,
      createClient: s.createClient,
      getClients: s.getClients,
      updateClient: s.updateClient,
      openEdit: s.openEdit,
      openCreate: s.openCreate,
      closeFormModal: s.closeFormModal,
    })),
  );

  // al crear refrescamos la lista para respetar el orden y el total que devuelve el backend
  const handleCreateClient = async (client: ClientRequest) => {
    await createClient(client);
    await getClients();
  };

  return {
    isLoading,
    error,
    clients,
    totalClients,
    formClient,
    isFormModalOpen,
    handleCreateClient,
    getClients,
    updateClient,
    openEdit,
    openCreate,
    closeFormModal,
  };
};
