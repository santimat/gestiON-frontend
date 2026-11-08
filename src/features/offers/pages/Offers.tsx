import { Button } from "@mantine/core";
import { lazy, useEffect } from "react";
import { BadgePercent, Plus } from "lucide-react";

import { useAuth } from "@features/auth";
import { useOffer } from "@features/offers/hooks/useOffer";
import { ListContainer } from "@shared/components/ListContainer";
import { OfferList } from "@features/offers/components/OfferList";
import { usePageHeader } from "@shared/layout/hooks/usePageHeader";
import { EntityFormModal } from "@shared/components/EntityFormModal";
import { useOfferSearch } from "@features/offers/hooks/useOfferSearch";
import { useOfferAssigment } from "@features/offers/hooks/useOfferAssigment";
import { OffersFilterBar } from "@features/offers/components/OffersFilterBar";

const OfferForm = lazy(() =>
  import("@features/offers/components/OfferForm").then((module) => ({
    default: module.OfferForm,
  })),
);

const OfferAssignmentDialog = lazy(() =>
  import("@features/offers/components/OfferAssignmentDialog").then(
    (module) => ({
      default: module.OfferAssignmentDialog,
    }),
  ),
);

export const Offers = () => {
  const { authenticatedUser } = useAuth();
  const {
    offers,
    isLoading,
    error,
    formOffer,
    isFormModalOpen,
    openCreate,
    closeFormModal,
  } = useOffer();
  const { assignOffer, isAssignModalOpen, closeAssignModal } =
    useOfferAssigment();
  const { filters, setFilters, isFiltered } = useOfferSearch();

  const canCreate = authenticatedUser?.role === "OWNER";

  useEffect(() => {
    return () => closeFormModal();
  }, [closeFormModal]);

  useEffect(() => {
    return () => closeAssignModal();
  }, [closeAssignModal]);

  usePageHeader({
    title: "Ofertas",
    subtitle: `${offers.length} ${offers.length === 1 ? "oferta" : "ofertas"}`,
    actions: canCreate ? (
      <Button
        leftSection={<Plus />}
        onClick={openCreate}
        className="bg-primary rounded-md p-2 text-white"
      >
        <span className="hidden sm:inline">Nueva oferta</span>
      </Button>
    ) : null,
  });

  return (
    <>
      <EntityFormModal
        opened={isFormModalOpen}
        closeModal={closeFormModal}
        size="md"
        entityKey={formOffer?.id ?? "create"}
      >
        <OfferForm offer={formOffer} closeModal={closeFormModal} />
      </EntityFormModal>

      <EntityFormModal
        opened={isAssignModalOpen}
        closeModal={closeAssignModal}
        size="md"
        entityKey={assignOffer?.id ?? "assign"}
      >
        {assignOffer ? (
          <OfferAssignmentDialog
            offer={assignOffer}
            closeModal={closeAssignModal}
          />
        ) : null}
      </EntityFormModal>

      <main className="flex flex-col gap-6 p-6">
        <OffersFilterBar filters={filters} setFilters={setFilters} />

        <ListContainer
          isLoading={isLoading}
          error={error}
          isEmpty={offers.length === 0}
          emptyMessage={
            isFiltered
              ? "No hay ofertas para mostrar"
              : "Todavía no hay ofertas"
          }
          icon={BadgePercent}
        >
          <OfferList offers={offers} />
        </ListContainer>
      </main>
    </>
  );
};
