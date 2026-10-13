import { useEffect } from "react";
import { UserPlus } from "lucide-react";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { CashiersList } from "@/components/cashiers/CashiersList";
import { CashierForm } from "@/components/cashiers/CashierForm";
import { useUser } from "@/hooks/useUser";

export const Cashiers = () => {
  const { cashiers, totalCashiers, getCashiers } = useUser();

  const [opened, { open: openModal, close }] = useDisclosure(false);

  useEffect(() => {
    getCashiers();
  }, [getCashiers]);

  const activeCashiers = cashiers.filter((cashier) => cashier.active).length;

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        size="xl"
        transitionProps={{ transition: "fade-down", duration: 300 }}
        withCloseButton={false}
      >
        <CashierForm closeModal={close} />
      </Modal>

      <header className="border-border flex w-full items-center justify-between border-b p-4">
        <div>
          <h1 className="text-xl font-semibold">Cajeros</h1>
          <p>
            {activeCashiers} activos de {totalCashiers} usuarios
          </p>
        </div>
        <Button
          leftSection={<UserPlus />}
          onClick={openModal}
          className="bg-primary rounded-md p-2 text-white"
        >
          Nuevo Cajero
        </Button>
      </header>

      <main className="flex flex-col gap-8 p-6">
        <CashiersList />
      </main>
    </>
  );
};
