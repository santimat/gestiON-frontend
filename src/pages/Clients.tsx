import { Contact, UserPlus } from "lucide-react";
import { useEffect } from "react";
import { Button, Modal } from "@mantine/core";

import { useClient } from "@/hooks/useClient";
import { ListContainer } from "@/components/ListContainer";
import { ClientList } from "@/components/clients/ClientList";
import { ClientForm } from "@/components/clients/NewClientForm";
import { usePageHeader } from "@/hooks/usePageHeader";

export const Clients = () => {
  const {
    getClients,
    totalClients,
    isLoading,
    error,
    formClient,
    isFormModalOpen,
    openCreate,
    closeFormModal,
  } = useClient();

  useEffect(() => {
    getClients().catch(() => {});
    // usamos el close para limpiar el estado
    return () => closeFormModal();
  }, [getClients, closeFormModal]);

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
      <Modal
        opened={isFormModalOpen}
        onClose={closeFormModal}
        centered
        size="xl"
        transitionProps={{ transition: "fade-down", duration: 300 }}
        withCloseButton={false}
      >
        <ClientForm
          key={formClient?.id ?? "create"}
          client={formClient}
          closeModal={closeFormModal}
        />
      </Modal>

      <main className="flex flex-col gap-6 p-6">
        <ListContainer
          isLoading={isLoading}
          error={error}
          isEmpty={totalClients === 0}
          icon={Contact}
          emptyMessage="No hay clientes para mostrar"
        >
          <ClientList />
        </ListContainer>
      </main>
    </>
  );
};
