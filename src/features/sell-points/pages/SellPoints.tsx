import { lazy, useEffect } from "react";
import { Button } from "@mantine/core";
import { MonitorIcon, Plus, StoreIcon } from "lucide-react";

import { useAuth } from "@features/auth";
import { ListContainer } from "@shared/components/ListContainer";
import { EntityFormModal } from "@shared/components/EntityFormModal";
import { SellPointsList } from "@features/sell-points/components/SellPointsList";
import { useCommerce } from "@features/commerces";
import { useSellPoint } from "@features/sell-points/hooks/useSellPoint";
import { usePageHeader } from "@shared/layout/hooks/usePageHeader";

const SellPointForm = lazy(() =>
  import("@features/sell-points/components/SellPointForm").then((module) => ({
    default: module.SellPointForm,
  })),
);

const SellPointCashiers = lazy(() =>
  import("@features/sell-points/components/SellPointCashiers").then(
    (module) => ({
      default: module.SellPointCashiers,
    }),
  ),
);

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
      <EntityFormModal
        opened={isFormModalOpen}
        closeModal={closeFormModal}
        entityKey={formSellPoint?.id ?? "create"}
      >
        <SellPointForm sellPoint={formSellPoint} closeModal={closeFormModal} />
      </EntityFormModal>

      <EntityFormModal
        opened={isCashiersModalOpen}
        closeModal={closeCashiersModal}
        size="md"
        entityKey={cashiersModalSellPoint?.id ?? "cashiers"}
      >
        <SellPointCashiers
          sellPoint={cashiersModalSellPoint}
          closeModal={closeCashiersModal}
        />
      </EntityFormModal>

      <main className="flex flex-col gap-6 p-6">
        {!hasCommerce && (
          <div className="border-background-soft bg-card flex items-center gap-3 rounded-xl border border-dashed p-4">
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
