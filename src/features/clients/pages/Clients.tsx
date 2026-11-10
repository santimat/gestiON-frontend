import { Contact, UserPlus } from "lucide-react";
import { lazy, useEffect } from "react";
import { Button } from "@mantine/core";

import { useClient } from "@features/clients/hooks/useClient";
import { ListContainer } from "@shared/components/ListContainer";
import { ListPagination } from "@shared/components/ListPagination";
import { EntityFormModal } from "@shared/components/EntityFormModal";
import { ClientList } from "@features/clients/components/ClientList";
import { ClientsSearchBar } from "@features/clients/components/ClientsSearchBar";
import { useFilters } from "@shared/hooks/useFilters";
import { ClientFiltersSchema } from "@features/clients/schemas/ClientFiltersSchema";
import { usePageHeader } from "@shared/layout/hooks/usePageHeader";
import { usePendingSales } from "@features/sales";

const ClientForm = lazy(() =>
  import("@features/clients/components/ClientForm").then((module) => ({
    default: module.ClientForm,
  })),
);

const ClientPendingSalesModal = lazy(() =>
  import("@features/clients/components/ClientPendingSalesModal").then(
    (module) => ({
      default: module.ClientPendingSalesModal,
    }),
  ),
);

export const Clients = () => {
  const {
    getClients,
    totalClients,
    totalPages,
    isLoading,
    error,
    formClient,
    isFormModalOpen,
    openCreate,
    closeFormModal,
  } = useClient();

  const { filters, setFilters } = useFilters(ClientFiltersSchema);

  const { pendingSalesClient, setPendingSalesClient } = usePendingSales();

  useEffect(() => {
    getClients(filters).catch(() => {});
  }, [getClients, filters]);

  useEffect(() => {
    // usamos el close para limpiar el estado
    return () => closeFormModal();
  }, [closeFormModal]);

  usePageHeader({
    title: "Clientes",
    subtitle: `${totalClients} clientes cargados`,
    actions: (
      <Button
        leftSection={<UserPlus />}
        onClick={openCreate}
        className="bg-primary rounded-md p-2 text-white"
      >
        <span className="hidden sm:inline">Nuevo Cliente</span>
      </Button>
    ),
  });

  return (
    <>
      <EntityFormModal
        opened={isFormModalOpen}
        closeModal={closeFormModal}
        entityKey={formClient?.id ?? "create"}
      >
        <ClientForm client={formClient} closeModal={closeFormModal} />
      </EntityFormModal>

      <ClientPendingSalesModal
        opened={pendingSalesClient !== null}
        client={pendingSalesClient}
        onClose={() => setPendingSalesClient(null)}
      />

      <main className="flex flex-col gap-6">
        <ClientsSearchBar />
        <ListContainer
          isLoading={isLoading}
          error={error}
          isEmpty={totalClients === 0}
          icon={Contact}
          emptyMessage="No hay clientes para mostrar"
        >
          <ClientList />
        </ListContainer>

        <ListPagination
          filters={filters}
          setFilters={setFilters}
          totalItems={totalClients}
          totalPages={totalPages}
          itemLabel="clientes"
        />
      </main>
    </>
  );
};
