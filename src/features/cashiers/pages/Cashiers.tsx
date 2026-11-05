import { BuildingComplexIcon, UserPlus } from "lucide-react";
import { lazy, useEffect } from "react";
import { Button, Modal } from "@mantine/core";

import { useCashier } from "@features/cashiers/hooks/useCashier";
import { ListContainer } from "@shared/components/ListContainer";
import { CashiersList } from "@features/cashiers/components/CashiersList";
import { usePageHeader } from "@shared/layout/hooks/usePageHeader";

const CashierForm = lazy(() =>
  import("@features/cashiers/components/CashierForm").then((module) => ({
    default: module.CashierForm,
  })),
);

export const Cashiers = () => {
  const {
    totalCashiers,
    isLoading,
    error,
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

  usePageHeader({
    title: "Cajeros",
    subtitle: `${totalCashiers} cajero${totalCashiers !== 1 ? "s" : ""} registrados`,
    actions: (
      <Button
        leftSection={<UserPlus />}
        onClick={openCreate}
        className="bg-primary rounded-md p-2 text-white"
      >
        <span className="hidden sm:inline">Nuevo Cajero</span>
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
        <CashierForm
          key={formCashier?.id ?? "create"}
          cashier={formCashier}
          closeModal={closeFormModal}
        />
      </Modal>

      <main className="flex flex-col gap-6 p-6">
        <ListContainer
          isLoading={isLoading}
          error={error}
          isEmpty={totalCashiers === 0}
          icon={BuildingComplexIcon}
          emptyMessage="No hay cajeros para mostrar"
        >
          <CashiersList />
        </ListContainer>
      </main>
    </>
  );
};
