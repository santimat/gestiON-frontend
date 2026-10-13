import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import { CashiersList } from "@/components/cashiers/CashiersList";
import { NewCashierForm } from "@/components/cashiers/NewCashierForm";
import type { User } from "@/types";

export const Cashiers = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [editingCashier, setEditingCashier] = useState<User>({});

  const openEditModal = (cashier: User) => {
    setEditingCashier(cashier);
    open();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <div>
            <h3 className="text-lg font-semibold">Ingresar Nuevo Cajero</h3>
            <p className="text-sm">
              El cajero sólo va a poder acceder al punto de venta del comercio.
            </p>
          </div>
        }
        centered
      >
        <NewCashierForm onSuccess={close} onCancel={close} />
      </Modal>
      <header className="border-background-soft flex w-full items-center justify-between border-b p-4">
        <div>
          <h2 className="text-xl font-semibold">Cajeros</h2>
          <p>() activos de () usuarios</p>
        </div>
        <Button onClick={open} className="bg-primary rounded-md p-2 text-white">
          + Nuevo Cajero
        </Button>
      </header>

      <main>
        <CashiersList openModal={open} onEdit={openEditModal} />
      </main>
    </>
  );
};
