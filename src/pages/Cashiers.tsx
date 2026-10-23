import { UserPlus } from "lucide-react";
import { useEffect } from "react";
import { Button, Modal } from "@mantine/core";

import { useCashier } from "@/hooks/useCashier";
import { CashiersList } from "@/components/cashiers/CashiersList";
import { NewCashierForm } from "@/components/cashiers/NewCashierForm";

export const Cashiers = () => {
  const {
    totalCashiers,
    getCashiers,
    formCashier,
    isFormModalOpen,
    openCreate,
    closeFormModal,
  } = useCashier();

  useEffect(() => {
    getCashiers();
    // usamos el close para limpiar el estado
    return () => closeFormModal();
  }, [getCashiers, closeFormModal]);

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
        <NewCashierForm
          key={formCashier?.id ?? "create"}
          cashier={formCashier}
          closeModal={closeFormModal}
        />
      </Modal>

      <header className="border-border flex w-full items-center justify-between border-b p-4">
        <div>
          <h1 className="text-xl font-semibold">Cajeros</h1>
          <p>
            {totalCashiers} cajero{totalCashiers !== 1 && "s"} registrados
          </p>
        </div>
        <Button
          leftSection={<UserPlus />}
          onClick={openCreate}
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
