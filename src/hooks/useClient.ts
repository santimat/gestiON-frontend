import { useShallow } from "zustand/shallow";

import { useClientStore } from "@/stores/useClientStore";

export const useClient = () => {
  const {
    clients,
    totalClients,
    isLoading,
    createClient,
    getClients,
    updateClient,
  } = useClientStore(
    useShallow((s) => ({
      clients: s.clients,
      totalClients: s.totalClients,
      isLoading: s.isLoading,
      createClient: s.createClient,
      getClients: s.getClients,
      updateClient: s.updateClient,
    })),
  );

  return {
    isLoading,
    clients,
    totalClients,
    createClient,
    getClients,
    updateClient,
  };
};
