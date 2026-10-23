import { UserPlus } from "lucide-react";
import { useEffect } from "react";
import { Button, Modal } from "@mantine/core";

import { useClient } from "@/hooks/useClient";
import { ClientList } from "@/components/clients/ClientList";
import { ClientForm } from "@/components/clients/ClientForm";

export const Clients = () => {
  const {
    getClients,
    totalClients,
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

      <header className="border-border flex w-full items-center justify-between border-b p-4">
        <div>
          <h1 className="text-xl font-semibold">Clientes</h1>
          <p>{totalClients} clientes cargados</p>
        </div>
        <Button
          leftSection={<UserPlus />}
          onClick={openCreate}
          className="bg-primary rounded-md p-2 text-white"
        >
          Nuevo Cliente
        </Button>
      </header>

      <main className="flex flex-col gap-8 p-6">
        <ClientList />
      </main>
    </>
  );
};
