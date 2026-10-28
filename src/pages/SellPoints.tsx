import { useEffect } from "react";
import { Button, Modal } from "@mantine/core";
import { MonitorIcon, Plus, StoreIcon } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { ListContainer } from "@/components/ListContainer";
import { NewSellPointForm } from "@/components/sellPoints/NewSellPointForm";
import { SellPointCashiers } from "@/components/sellPoints/SellPointCashiers";
import { SellPointsList } from "@/components/sellPoints/SellPointsList";
import { useCommerce } from "@/hooks/useCommerce";
import { useSellPoint } from "@/hooks/useSellPoint";
import { usePageHeader } from "@/hooks/usePageHeader";

export const SellPoints = () => {
  const { authenticatedUser } = useAuth();
  const { currentCommerce, getCurrentCommerce } = useCommerce();
  const {
    sellPoints,
    totalSellPoints,
    formSellPoint,
    isFormModalOpen,
    openCreate,
    closeFormModal,
    cashiersModalSellPoint,
    isCashiersModalOpen,
    closeCashiersModal,
    isLoading,
    error,
    getSellPoints,
  } = useSellPoint();

  useEffect(() => {
    getSellPoints();
    if (authenticatedUser?.commerceId) getCurrentCommerce();
    return () => {
      closeFormModal();
      closeCashiersModal();
    };
  }, [
    getSellPoints,
    getCurrentCommerce,
    authenticatedUser,
    closeFormModal,
    closeCashiersModal,
  ]);

  const hasCommerce = Boolean(currentCommerce);

  usePageHeader({
    title: "Puntos de venta",
    subtitle: `${totalSellPoints} punto${totalSellPoints !== 1 ? "s" : ""} de venta`,
    actions: (
      <Button
        leftSection={<Plus />}
        onClick={openCreate}
        disabled={!hasCommerce}
        className="bg-primary rounded-md p-2 text-white"
      >
        <span className="hidden sm:inline">Nuevo punto de venta</span>
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
        <NewSellPointForm
          key={formSellPoint?.id ?? "create"}
          sellPoint={formSellPoint}
          closeModal={closeFormModal}
        />
      </Modal>

      <Modal
        opened={isCashiersModalOpen}
        onClose={closeCashiersModal}
        centered
        size="md"
        transitionProps={{ transition: "fade-down", duration: 300 }}
        withCloseButton={false}
      >
        <SellPointCashiers
          key={cashiersModalSellPoint?.id ?? "cashiers"}
          sellPoint={cashiersModalSellPoint}
          closeModal={closeCashiersModal}
        />
      </Modal>

      <main className="flex flex-col gap-6 p-6">
        {!hasCommerce && (
          <div className="border-border bg-card flex items-center gap-3 rounded-xl border border-dashed p-4">
            <StoreIcon
              className="text-secondary-foreground shrink-0"
              size={20}
              strokeWidth={1.75}
            />
            <p className="text-secondary-foreground text-sm">
              Tu cuenta todavía no tiene un comercio asociado. Necesitás uno
              para crear puntos de venta.
            </p>
          </div>
        )}

        <ListContainer
          isLoading={isLoading}
          error={error}
          isEmpty={totalSellPoints === 0}
          icon={MonitorIcon}
          emptyMessage="Todavía no hay puntos de venta"
        >
          <SellPointsList sellPoints={sellPoints} />
        </ListContainer>
      </main>
    </>
  );
};
