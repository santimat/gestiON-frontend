import { useShallow } from "zustand/shallow";

import { useClientStore } from "@/stores/useClientStore";

export const useClient = () => {
  const {
    clients,
    totalClients,
    isLoading,
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

  return {
    isLoading,
    clients,
    totalClients,
    formClient,
    isFormModalOpen,
    createClient,
    getClients,
    updateClient,
    openEdit,
    openCreate,
    closeFormModal,
  };
};
