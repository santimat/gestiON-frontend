import { BuildingComplexIcon, UserPlus } from "lucide-react";
import { lazy, useEffect } from "react";
import { Button } from "@mantine/core";

import { useCashier } from "@features/cashiers/hooks/useCashier";
import { useFilters } from "@shared/hooks/useFilters";
import { ListContainer } from "@shared/components/ListContainer";
import { ListPagination } from "@shared/components/ListPagination";
import { EntityFormModal } from "@shared/components/EntityFormModal";
import { CashiersList } from "@features/cashiers/components/CashiersList";
import { CashiersFilterBar } from "@features/cashiers/components/CashiersFilterBar";
import { CashierFiltersSchema } from "@features/cashiers/schemas/CashierFiltersSchema";
import { usePageHeader } from "@shared/layout/hooks/usePageHeader";

const CashierForm = lazy(() =>
  import("@features/cashiers/components/CashierForm").then((module) => ({
    default: module.CashierForm,
  })),
);

export const Cashiers = () => {
  const {
    totalCashiers,
    totalPages,
    isLoading,
    error,
    getCashiers,
    formCashier,
    isFormModalOpen,
    openCreate,
    closeFormModal,
  } = useCashier();

  const { filters, setFilters, hasFilters } = useFilters(CashierFiltersSchema);

  useEffect(() => {
    getCashiers(filters);
    // usamos el close para limpiar el estado
    return () => closeFormModal();
  }, [getCashiers, closeFormModal, filters]);

  usePageHeader({
    title: "Cajeros",
    subtitle: `${totalCashiers} cajero${totalCashiers !== 1 ? "s" : ""} registrados`,
    actions: (
      <Button
        leftSection={<UserPlus />}
        onClick={openCreate}
        className="bg-primary text-primary-foreground rounded-md p-2"
      >
        <span className="hidden sm:inline">Nuevo Cajero</span>
      </Button>
    ),
  });

  return (
    <>
      <EntityFormModal
        opened={isFormModalOpen}
        closeModal={closeFormModal}
        entityKey={formCashier?.id ?? "create"}
      >
        <CashierForm cashier={formCashier} closeModal={closeFormModal} />
      </EntityFormModal>

      <main className="flex flex-col gap-6 p-4">
        <CashiersFilterBar filters={filters} setFilters={setFilters} />
        <ListContainer
          isLoading={isLoading}
          error={error}
          isEmpty={totalCashiers === 0}
          icon={BuildingComplexIcon}
          emptyMessage={
            hasFilters
              ? "No se encontraron cajeros con ese filtro"
              : "No hay cajeros para mostrar"
          }
        >
          <CashiersList />
        </ListContainer>

        <ListPagination
          filters={filters}
          setFilters={setFilters}
          totalItems={totalCashiers}
          totalPages={totalPages}
          itemLabel="cajeros"
        />
      </main>
    </>
  );
};
