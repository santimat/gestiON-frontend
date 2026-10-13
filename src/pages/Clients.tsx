import { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import type { Client } from "@/types";
import { ClientList } from "@/components/clients/ClientList";
import { ClientForm } from "@/components/clients/ClientForm";
import { useClient } from "@/hooks/useClient";

export const Clients = () => {
  const { getClients, totalClients } = useClient();

  const [opened, { open: openModal, close }] = useDisclosure(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  useEffect(() => {
    getClients();
  }, [getClients]);

  const closeModal = () => {
    close();
    setEditingClient(null);
  };

  const openCreateModal = () => {
    setEditingClient(null);
    openModal();
  };

  const openEditModal = (client: Client) => {
    setEditingClient(client);
    openModal();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={closeModal}
        centered
        size="xl"
        transitionProps={{ transition: "fade-down", duration: 300 }}
        withCloseButton={false}
      >
        <ClientForm
          key={editingClient?.id ?? "create"}
          client={editingClient}
          closeModal={closeModal}
        />
      </Modal>

      <header className="border-border flex w-full items-center justify-between border-b p-4">
        <div>
          <h1 className="text-xl font-semibold">Clientes</h1>
          <p>{totalClients} clientes cargados</p>
        </div>
        <Button
          leftSection={<UserPlus />}
          onClick={openCreateModal}
          className="bg-primary rounded-md p-2 text-white"
        >
          Nuevo Cliente
        </Button>
      </header>

      <main className="flex flex-col gap-8 p-6">
        <ClientList onEdit={openEditModal} />
      </main>
    </>
  );
};
